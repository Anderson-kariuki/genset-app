import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private apiUrl = 'http://localhost:3000/sendSMS'; // URL to your backend

  constructor( private http: HttpClient ) { }

  sendSMS(username: string, to: string, message: string): Observable<any> {
    return this.http.post(this.apiUrl, {username, to, message });
  }
}
