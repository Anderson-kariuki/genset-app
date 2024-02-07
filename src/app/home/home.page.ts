import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApisService } from '../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any;
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    user_password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  constructor( private Login: ApisService, private router: Router) {}

  get eMail() {
    return this.signinForm.get('email')
  }

  get pWord() {
    return this.signinForm.get('user_password')
  }

  signIn(){
    console.log(this.signinForm.value);
    this.Login.login(this.signinForm.value).subscribe((result) => {
      console.log(result);
      this.data = result;
      // where we load the access token to the interceptor
      localStorage.setItem('token', this.data.access_token)
      console.log("token", this.data.access_token)
      this.router.navigateByUrl('dashboard');
    })
  }
}
