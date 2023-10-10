import { Component, OnInit, ViewChild } from '@angular/core';
import { IColumn, IColumnFilterValue, ISorterValue } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable, retry, Subject, takeUntil, tap } from 'rxjs';
import { PotentialDoctor } from '../models/potential.doctor';
import { PotentialService } from '../services/potential.service';
import { FollowupCreationComponent } from './followup.create/followup-creation.component';
export interface IParams {
  activePage?: number;
  columnFilterValue?: IColumnFilterValue;
  itemsPerPage?: number;
  sorterValue: ISorterValue;
  totalPages?: number;
}
export interface IApiParams {
  currentPage?: number;
  pageSize?: number;
  clinicId?: number
  columnFilter?: string;
  columnSorter?: string;
  sort?: string;
}
@Component({
  selector: 'app-list-potential-doctor',
  templateUrl: './list-potential-doctor.component.html',
  styleUrls: ['./list-potential-doctor.component.css']
})
export class ListPotentialDoctorComponent implements OnInit {
  @ViewChild(FollowupCreationComponent) followupCreationComponent: FollowupCreationComponent;
  constructor(private potentialService: PotentialService) { }
  public followupVisible = false;
  potentialDoctorData$!: Observable<[PotentialDoctor]>;
  readonly #destroy$ = new Subject<boolean>();
  readonly columns: (string | IColumn)[] = [
    {
      key: 'name',
      label: 'Doctor Name',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'npi',
      label: 'Doctor NPI',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'action',
      label: 'Action',
      _style: { width: '5%' },
      filter: false,
      sorter: false,
    },
  ]
  readonly activePage$ = new BehaviorSubject(0);
  readonly columnFilterValue$ = new BehaviorSubject({});
  readonly itemsPerPage$ = new BehaviorSubject(5);
  readonly loadingData$ = new BehaviorSubject<boolean>(true);
  readonly totalPages$ = new BehaviorSubject<number>(1);
  readonly sorterValue$ = new BehaviorSubject({});
  readonly totalItems$ = new BehaviorSubject(0);
  readonly apiParams$ = new BehaviorSubject<IApiParams>({ pageSize: this.itemsPerPage$.value, currentPage: 0 });
  readonly errorMessage$ = new Subject<string>();
  readonly retry$ = new Subject<boolean>();
  readonly props$: Observable<IParams> = combineLatest([
    this.activePage$,
    this.columnFilterValue$,
    this.itemsPerPage$,
    this.sorterValue$,
    this.totalPages$
  ]).pipe(
    debounceTime(100),
    map(([activePage, columnFilterValue, itemsPerPage, sorterValue, totalPages]) => ({
      activePage,
      columnFilterValue,
      itemsPerPage,
      sorterValue,
      totalPages
    }))
  );
  private _apiParams: IApiParams = {};
  set apiParams(value: any) {
    const params = {
      ...this._apiParams,
      ...value
    };

    const entries = new Map(Object.entries(params));
    entries.forEach((value, key, map) => {
      if (value === '' || value === undefined || value === null) {
        map.delete(key);
      }
    });

    const apiParams = Object.fromEntries(entries);
    this.loadingData$.next(true);
    this._apiParams = { ...apiParams };
    this.retry$.next(true);
    this.apiParams$.next({ ...apiParams });
  }
  ngOnInit(): void {
    this.activePage$.pipe(
      takeUntil(this.#destroy$)
    ).subscribe((page) => {
      const limit = this.itemsPerPage$.value;
      const offset = page - 1;
      this.apiParams = { offset, limit };
    });
    this.itemsPerPage$.pipe(
      distinctUntilChanged(),
      takeUntil(this.#destroy$)
    ).subscribe((limit) => {
      const totalPages = Math.ceil(this.totalItems$.value / limit) ?? 1;
      this.totalPages$.next(totalPages);
    });
    this.totalItems$.pipe(
      distinctUntilChanged(),
      takeUntil(this.#destroy$)
    ).subscribe((totalItems) => {
      const totalPages = Math.ceil(totalItems / this.itemsPerPage$.value) ?? 1;
      this.totalPages$.next(totalPages);
    });

    this.totalPages$.pipe(
      takeUntil(this.#destroy$)
    ).subscribe((totalPages) => {
      const activePage = this.activePage$.value > totalPages ? totalPages : this.activePage$.value;
      this.setActivePage(activePage);
    });

    this.potentialDoctorData$ = this.potentialService.getPotentialDoctors(this.apiParams$).pipe(
      retry({
        delay: (error) => {
          console.warn('Retry: ', error);
          this.errorMessage$.next(error.message ?? `Error: ${JSON.stringify(error)}`);
          this.loadingData$.next(false);
          return this.retry$;
        }
      }),
      tap((response) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response) => {
        return response.records;
      })
    );
  }
  handleItemsPerPageChange(limit: number) {
    this.itemsPerPage$.next(limit);
  }
  handleSorterValueChange(sorterValue: ISorterValue) {
    this.sorterValue$.next(!!sorterValue.state ? sorterValue : {});
    const sort = !!sorterValue.state ? `${sorterValue.column}%${sorterValue.state}` : '';
    this.apiParams = { sort };
  }
  details_visible = Object.create({});
  startFollowup(item: any) {
    this.followupVisible = !this.followupVisible;
  }
  handleActivePageChange(page: number) {
    this.setActivePage(page);
  }
  setActivePage(page: number) {
    page = page > 0 && this.totalPages$.value + 1 > page ? page : 1;
    this.activePage$.next(page);
  }
  handleLiveDemoChange(event: any) {
    this.followupVisible = event;
  }
  closeModal(){
    this.followupCreationComponent.followupCreateForm.resetForm();
    this.followupCreationComponent.errorMessage = null;
    this.followupVisible = !this.followupVisible;
  }
}
