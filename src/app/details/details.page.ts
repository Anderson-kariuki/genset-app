import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListGeneratorData } from '../models';
import { ApisService } from '../services/apis.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  showDashboard: number = 0;
  data: any;
  genNames: any;
  genSelect: any;
  page_id = 1;
  page_size = 100;
  dataLoading: boolean = true;

  gaugeValueBulkDay: number = 0;
  gaugeValueBulk: number = 0;
  gaugeValue: number = 0;
  gaugeValueTemp: number = 0;
  gaugeValueBatt: number = 0;
  operation_mode: string= "";
  genState: string= "";
  e_stop_status: string = "";
  active_fault_type: string = "";
  active_fault_code: number = 0;
  n0_of_starts: number = 0;
  gaugeValueFrequency: number = 0;

  constructor(
    private router: Router,
    private generatorService: ApisService,
    private loadingCtrl: LoadingController
  ) { }

ngOnInit(): void {
  // Getting the logged in generator data
  const cGenerators = localStorage.getItem('generators');
  const generators: any = cGenerators ? JSON.parse(cGenerators) : null;
  this.genNames = generators;

  this.showLoading();

   //this.listGeneratorData3hrs()

   setInterval(() => {
     this.listGeneratorData();
   }, 5 * 1000 * 60);
}
  goToHome() {
    this.showDashboard = 0;
    this.showLoading();
    this.router.navigate(['']);
  }

  goToDashboard() {
    this.showDashboard = 0;
    this.showLoading();
    this.router.navigate(['client/dashboard']);
  }
  goToMenu() {
    // Getting the logged in user info .
    const currentJson = localStorage.getItem('userInfo');
    const current: any = currentJson ? JSON.parse(currentJson) : null;
    // console.log("current:", current);
    this.data = current;

    this.showDashboard++
    if (this.showDashboard >= 2) {
      this.showDashboard = 0;
    }
  }
  onDashboardClick() {
    this.showDashboard = 0;
    this.showLoading();
    this.router.navigate(['client/dashboard']);
  }

  onDetailsClick() {
    this.showDashboard = 0;
    this.showLoading();
    this.router.navigate(['details']);
  }

  onAlertsClick() {
    this.showDashboard = 0;
    this.showLoading();
    this.router.navigate(['alerts']);
  }

  onLogoutClick() {
    this.showDashboard = 0;
    this.showLoading();
    this.router.navigate(['']);
  }

  handleChange(gen: any) {
    this.showLoading();
    // console.log('ionChange fired with value: ' + gen.detail.value);
    this.genSelect = gen.detail.value;
    // List Generator Data corresponding to a given id
   this.listGeneratorData();
  }

  // Table functions
  listGeneratorData() {
    this.generatorService.listTransmittedGeneratorData(this.page_id,this.page_size,this.genSelect).subscribe(
      (generatormeterData1: ListGeneratorData) => this.handleData(generatormeterData1)
    );
  }

  private handleData(meterData1: any) {
    this.dataLoading = false;
    this.gen_data_update(meterData1[0])
  }

  gen_data_update(gen_update: ListGeneratorData){
    // console.log(gen_update);
    this.gaugeValueBulk = gen_update.bulk_fuel_tank_volume;
    this.gaugeValueBulkDay = gen_update.day_fuel_volume;
    this.gaugeValue = gen_update.engine_speed;
    this.gaugeValueTemp = gen_update.coolant_temperature;
    this.gaugeValueBatt = gen_update.battery_voltage;
    // this.operation_mode = gen_update.operation_mode;
  
    // switch case to handle the operation mode logic
    switch(gen_update.operation_mode){
      case (0):{
        this.operation_mode = "OFF";
        break;
      }
  
      case (1):{
        this.operation_mode = "AUTO";
        break;
      }
  
      case (2):{
        this.operation_mode = "MANUAL";
        break;
      }
    }
    // this.genState = gen_update.generator_state;
  
    // switch case to update the genState
    switch(gen_update.generator_state){
      case (0):{
        this.genState = "READY";
        break;
      }
  
      case (1):{
        this.genState = "PRE-CRANKING";
        break;
      }
  
      case (2):{
        this.genState = "RAMP";
        break;
      }
  
      
      case (3):{
        this.genState = "RUNNING";
        break;
      }
    }
    // this.e_stop_status = gen_update.emergency_stop_status;
  
    // switch case to update the E-stop status
    switch(gen_update.emergency_stop_status){
      case (0):{
        this.e_stop_status = "INACTIVE";
        break;
      }
  
      case (1):{
        this.e_stop_status = "ACTIVE";
        break;
      }
  
    }  
    //this.active_fault_type = gen_update.active_fault_type;
  
      // switch case to update the active fault type
      switch(gen_update.active_fault_type){
        case (1):{
          this.active_fault_type = "WARNING";
          break;
        }
    
        case (4):{
          this.active_fault_type = "SHUT DOWN";
          break;
        }
        default:{
          this.active_fault_type = "NO ERROR";
          break;
        }
    
      }
    this.active_fault_code = gen_update.recent_fault_code;
    this.n0_of_starts = gen_update.no_of_engine_starts;
    this.gaugeValueFrequency = gen_update.frequency;
  }
  
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 2000,
    });

    loading.present();
  }
}
