import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'http://127.0.0.1:8000/';
  // 
  constructor(
    private _http: HttpClient,

  ) { }


  login(data: any) {
    debugger;
    return this._http.post(`${this.baseUrl}api/login/`, data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        observe: 'response'
      }
    );
  }
}
