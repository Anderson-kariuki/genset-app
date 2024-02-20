import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { ListGenerator, UserResponse, ListAccount, ClientDashboard, ClientDashboardTable } from 'src/app/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  alarmStatus: string = "ok"
  fuelH: string = "ok"
  online: string = "online"
  coolantS: string = "not"
  loadS: string = "ok"
  chargerS: string = "not"
  fuelS: string = "ok"

  constructor() { }

  ngOnInit(): void {
    // Get a list of all the generators ssigned to the client's view
    this.getLoggedinUser();
  }

  getLoggedinUser() {
    // Getting the logged in user ID.
    // const currentUser: UserResponse = JSON.parse(localStorage.getItem('currentUser'));

    // searching the account-users table
    // this.getAccountID(currentUser.user.user_id);
  }

  getAccountID(user_id: number) {
    // return this.accountService.getAccountID(user_id).subscribe(
    //   (accountData: ListAccount) => this.handleData2(accountData));
  }
}