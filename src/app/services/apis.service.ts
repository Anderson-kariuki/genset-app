import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { ClientDashboard, ListGenerator, ListAccount, UserResponse } from '../models';

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

  // Service Function to get if a generator is online
  getGenetorOnlineStatus(generator_id: number) {
    return this.http.get<ClientDashboard>(`${this.URL}updateGeneratorOnlineStatus/${generator_id}`, this.pasetoHeader());
  }

  listAccountGenerators1(account_id: number) {
    return this.http.get<ListGenerator>(`${this.URL}listGeneratorsOne/${account_id}`, this.pasetoHeader());
  }

  // service to get a specified user given the ID 
  getUserData(user_id: number) {
    return this.http.get<any>(`${this.URL}getUser/${user_id}`, this.pasetoHeader());
  }

  // Function to query the account_users table and get the account ID
  getAccountID(account_id: number) {
    return this.http.get<ListAccount>(`${this.URL}getAccountUser/${account_id}`, this.pasetoHeader());
  }

  getUserToken(): string {
    // Getting the logged in user ID.
    const currentUserJson = localStorage.getItem('currentUser');
    const currentUser: UserResponse = currentUserJson ? JSON.parse(currentUserJson) : null;

    return currentUser.access_token;
  }

  pasetoHeader() {
    // Initialize httpOptions with a default value
    let httpOptions: { headers: HttpHeaders; } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // Initialize without Authorization header if token is not available
      })
    };

    const token = this.getUserToken();
    if (token) {
      // If token exists, overwrite httpOptions with Authorization header
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        })
      };
    }
    console.log(httpOptions);
    return httpOptions;
  }
}
