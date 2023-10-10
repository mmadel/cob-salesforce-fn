import { Component, OnInit } from '@angular/core';
import { IColumn, IColumnFilterValue, ISorterValue } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, Subject } from 'rxjs';
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

  constructor() { }
  usersData$!: Observable<[]>;
  readonly columns: (string | IColumn)[] = [
    {
      key: 'doctorName',
      label: 'Doctor Name'
    },
    {
      key: 'doctorNPI',
      label: 'Doctor NPI'
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
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
  handleActivePageChange(page: number) {
    this.setActivePage(page);
  }
  setActivePage(page: number) {
    page = page > 0 && this.totalPages$.value + 1 > page ? page : 1;
    this.activePage$.next(page);
  }
}
