import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApisService } from '../services/apis.service';
import { Router } from '@angular/router';
import { SmsService } from '../services/sms.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {
  data: any;
  value1: string = '';
  value2: string = '';
  loading: boolean = false;
  type: string = 'password';
  count: number = 0;
  hid: boolean = false;
  hide: boolean = true;

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    user_password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  constructor(private Login: ApisService,
    private router: Router,
    private toastr: ToastrService,
    private smsService: SmsService
  ) { }

  ngOnInit(): void {
    this.count = 0;
    this.type = 'password';
    this.count = 0;
    this.hid = false;
    this.hide = true;
    // this.sendSMS();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.count = 0;
    this.type = 'password';
    this.count = 0;
    this.hid = false;
    this.hide = true;

    // Getting the logged in user. This data was stored after login in my homepage. The details entered
    const currentJson = localStorage.getItem('loggedUser');
    const current: any = currentJson ? JSON.parse(currentJson) : null;
    this.value1 = current.email;
    this.value2 = current.user_password;
  }

  sendSMS() {
    const username = 'AndersonK'
    const to = '+254742394144'; // The recipient's number
    const message = 'Lectrotel about to talk';
    this.smsService.sendSMS(username, to, message).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }

  toggleShowPassword() {
    this.count++;

    if (this.count === 1) {
      this.type = 'text';
    } if (this.count > 1) {
      this.count = 0;
    } if (this.count === 0) {
      this.type = 'password';
    }
    this.hide = !this.hide;
    this.hid = !this.hid;
  }

  get eMail() {
    return this.signinForm.get('email')
  }

  get pWord() {
    return this.signinForm.get('user_password')
  }

  signIn() {
    console.log(this.signinForm.value);
    // storing the form values for access on the DashboardPage 
    localStorage.setItem('loggedUser', JSON.stringify(this.signinForm.value));
    // accessing the api calls for making the login query to the database 
    this.Login.login(this.signinForm.value).subscribe({
      next: result => {
        this.data = result;
        // where we load the access token to the interceptor
        localStorage.setItem('token', this.data.access_token)
        console.log("token", this.data.access_token)
        // storing the data for later use 
        localStorage.setItem('currentUser', JSON.stringify(this.data))

        // toast is like a popup alert message to notify you of something and this is how it is set 
        if (this.data.access_token) {
          this.toastr.success('sucessfully logged in user', 'Success!!!', {
            closeButton: true,
            positionClass: 'toast-bottom-right'
          });

          if (this.data.user.role_id === 'Client') {
            this.router.navigate(['client/dashboard']);
          }

          if (this.data.user.role_id === 'Admin') {
            this.router.navigate(['admin/dashboard']);
          }
        }
      },
      error: (error) => {
        this.loading = false;
        this.toastr.warning('Invalid Credentials.', 'Error!', {
          closeButton: true,
          positionClass: 'toast-bottom-right'
        });
        // this.loading = false;
      },
    })
  }
}
