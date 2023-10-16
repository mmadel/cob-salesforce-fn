import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KcAuthService } from 'src/app/modules/security/service/kc/kc-auth.service';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: User[] = new Array();
  isLoggedIn: boolean;
  constructor(private router: Router, 
    private userService: UserService , 
    private kcAuthServiceService :KcAuthService) { }

  ngOnInit(): void {
    this.userService.list().subscribe((response)=>{
      this.users = response;
    })
  }
  isLoggedInUser(id: string | null | undefined) {
    var userId: string | undefined = this.kcAuthServiceService.getLoggedUser()?.sub;
    this.isLoggedIn= userId == id ? true : false;
    return this.isLoggedIn;
  }
  create(){
    
  }
}
