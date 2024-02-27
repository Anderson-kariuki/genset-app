import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  showDashboard: number = 0;
  data: any;

  constructor(
    private router: Router,
  ) { }

  goToHome() {
    this.showDashboard = 0;
    this.router.navigate(['']);
  }

  goToDashboard() {
    this.showDashboard = 0;
    this.router.navigate(['client/dashboard']);
  }
  goToMenu() {
    // Getting the logged in user info .
    const currentJson = localStorage.getItem('userInfo');
    const current: any = currentJson ? JSON.parse(currentJson) : null;
    console.log("current:", current);
    this.data = current;

    this.showDashboard++
    if (this.showDashboard >= 2) {
      this.showDashboard = 0;
    }
  }
  onDashboardClick() {
    this.showDashboard = 0;
    this.router.navigate(['client/dashboard']);
  }

  onDetailsClick() {
    this.showDashboard = 0;
    this.router.navigate(['details']);
  }

  onAlertsClick() {
    this.showDashboard = 0;
    this.router.navigate(['alerts']);
  }

  onLogoutClick() {
    this.showDashboard = 0;
    this.router.navigate(['']);
  }

}
