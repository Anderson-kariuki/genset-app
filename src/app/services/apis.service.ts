import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private URL = "https://api.genset.lectrotel.com/";

  constructor(
    private http: HttpClient,
  ) {
  }

  login(user: any) {
    return this.http.post(`${this.URL}adduser/login`, user)
  }

  createUser(create_user: any) {
    return this.http.post<any>(`${this.URL}addUser`, create_user);
  }


}
