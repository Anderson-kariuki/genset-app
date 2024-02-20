import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApisService } from '../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any;
  loading: boolean = false;
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    user_password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  constructor(private Login: ApisService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  get eMail() {
    return this.signinForm.get('email')
  }

  get pWord() {
    return this.signinForm.get('user_password')
  }

  signIn() {
    console.log(this.signinForm.value);
    this.Login.login(this.signinForm.value).subscribe({
      next: result => {
        this.data = result;
        // where we load the access token to the interceptor
        localStorage.setItem('token', this.data.access_token)
        console.log("token", this.data.access_token)
        // storing the data for later use 
        localStorage.setItem('currentUser', this.data)

        if (this.data.access_token) {
          this.toastr.success('sucessfully logged in user', 'Success!!!', {
            closeButton: true,
            positionClass: 'toast-top-right'
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
          positionClass: 'toast-top-right'
        });
        // this.loading = false;
      },
    })
  }
}
