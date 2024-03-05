import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit  {
  showDashboard: number = 0;
  data: any;
  genNames: any;
  genSelect: any;
  emails: any;

  constructor(
    private router: Router,
    private alertService: ApisService,
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit(): void {
    // Getting the logged in generator data
    const cGenerators = localStorage.getItem('generators');
    const generators: any = cGenerators ? JSON.parse(cGenerators) : null;
    this.genNames = generators;

    this.http.get<any[]>('./assets/dataa.json').subscribe(res => {
      // console.log(res);
      this.emails = res.map(email => {
        email.color = this.intToRGB(this.hashCode(email.account_name));
        return email;
      });
      // console.log(this.emails);
    });

    this.showLoading();
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

  private intToRGB(i: any) {
    var c = (i & 0x00FFFFFF).toString(16).toUpperCase();

    return '#' + '00000'.substring(0, 6 - c.length) + c;
  }

  private hashCode(str1: any) {
    let str = str1.toString();
    // console.log(str);
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    // console.log(hash);
    return hash;
  }

  // get allerts for a partucular generator 
  handleChange(data: any) {
    this.showLoading();
    // console.log('Current value:', JSON.stringify(data.target.value));

    this.alertService.listGeneratorAlertsInfo(data.target.value).subscribe(result => {
    //  console.log(result);
     this.emails = result.map((email: { color: string; alert_id: any; }) => {
       email.color = this.intToRGB(this.hashCode(email.alert_id));
       return email;
     });
     console.log("date", this.emails);
   });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 2000,
    });

    loading.present();
  }
}
