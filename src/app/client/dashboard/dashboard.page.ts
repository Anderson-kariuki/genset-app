import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { ListGenerator, UserResponse, ListAccount, ClientDashboard, ClientDashboardTable } from 'src/app/models';

export interface ClientDashboardTable1 {
  generator_id: number;
  generator_name: string;
  fuel: number;
  coolant: number;
  charger_ac_failure: number;
  load: number;
  failed_to_start: number;
  common_alarm: number;
  online: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterContentInit {
  online: string[] = [""];

  dataAlerts: ClientDashboardTable1[] = [];
  clientDashTable1: any[] = [];
  dataLoading: boolean = true;

  account_id: number = 0;
  generator_tally: number = 0;
  online_generator_tally: number = 0;
  offline_generator_tally: number = 0;
  low_fuel_level: number[] = []; // bit 0
  low_coolant_level: number[] = []; //bit 1
  fail_to_start: number[] = []; // bit 8
  charger_AC_failure: number[] = []; // bit 9
  generator_supplying_load: number[] = []; // bit 14
  common_alarm: number[] = []; // bit 15
  current_generator_id: number[] = [];
  current_generator_name: string[] = [];
  generator_online_status: string[] = [];
  j = 0;

  constructor(
    private generatorService: ApisService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Get a list of all the generators ssigned to the client's view
    this.getLoggedinUser();
  }

  getLoggedinUser() {
    // Getting the logged in user ID.
    const currentUserJson = localStorage.getItem('currentUser');
    const currentUser: UserResponse = currentUserJson ? JSON.parse(currentUserJson) : null;

    console.log("the logged user is:", currentUser.user.user_id)

    // searching the account-users table
    this.getAccountID(currentUser.user.user_id);
  }

  getAccountID(user_id: number) {
    return this.generatorService.getAccountID(user_id).subscribe(
      (accountData: ListAccount) => this.handleData2(accountData));
  }

  private handleData2(accountData: ListAccount) {
    this.account_id = accountData.account_id;

    // Use the obtained account ID info to query generators under the account.
    this.getAccountGeneratorslist(this.account_id);
  }

  // Function to get a list of generators under a particular account
  getAccountGeneratorslist(account_id: number) {
    this.generatorService.listAccountGenerators1(account_id).subscribe(
      (accountGeneratorData: ListGenerator) => this.handleData(accountGeneratorData) // wrap the array
    );
  }

  private handleData(meterData1: any) {

    //this.generatorList = new MatTableDataSource(meterData1);
    // console.log(meterData1 )
    var i = 0;

    while ( meterData1[i] ) {
      // Find if this Generator is online or offline
      this.getOnlineStatus( meterData1[i].generator_id ) ;
      i++;
    }
    // Get the number of generators under the account linked to the user
    this.generator_tally = i;

    // this.dataLoading = false;

  }

  // Function to get the online status of a generator 
  getOnlineStatus(generator_id: number) {
    this.generatorService.getGenetorOnlineStatus(generator_id).subscribe({
      next: (data) => {
        // console.log("online data:", data);
        // populating the table
        ///**
        console.log(data.online_status);
        if(data.online_status >= 0 && data.online_status <= 5){
          this.online [this.j] = "online";
        }else{
          this.online [this.j] = "offline";
        }
        
        this.low_fuel_level[this.j] = data.genset_pannel[0]; // bit 0
        this.low_coolant_level[this.j] = data.genset_pannel[1]; //bit 1
        this.fail_to_start[this.j] = data.genset_pannel[8]; // bit 9
        this.charger_AC_failure[this.j] = data.genset_pannel[9]; // bit 9
        this.generator_supplying_load[this.j] = data.genset_pannel[14]; // bit 14 
        this.common_alarm[this.j] = data.genset_pannel[15]; // bit 15
        this.current_generator_id[this.j] = data.generator_id;
        this.current_generator_name[this.j] = data.generator_name;
        this.generator_online_status[this.j] = this.online[this.j];

        this.dataAlerts[this.j] =
        {
          generator_id: this.current_generator_id[this.j],
          generator_name: this.current_generator_name[this.j],
          fuel: this.low_fuel_level[this.j],
          coolant: this.low_coolant_level[this.j],
          charger_ac_failure: this.charger_AC_failure[this.j],
          load: this.generator_supplying_load[this.j],
          failed_to_start: this.fail_to_start[this.j],
          common_alarm: this.common_alarm[this.j],
          online: this.generator_online_status[this.j],
        };

        // this.clientDashTable1[this.j] = this.dataAlerts[this.j];
        this.clientDashTable1 = this.dataAlerts;
        console.log("clientDashTable1", this.clientDashTable1);
        this.j++;

      },
      error: (error) => {
        console.log(error);
        return
      },
      complete: () => {
        this.dataLoading = false;
        // console.log(this.clientDashTable1);
        // this.j = 0;
      },
    })
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();

  }
}
