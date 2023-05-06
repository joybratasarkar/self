import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  baseUrl: string = 'http://127.0.0.1:8000/';
  // 
  
  constructor(
    private _http: HttpClient,
    private _router:Router
  ) { }


  login(data: any) {
    
    return this._http.post(`${this.baseUrl}api/login/`, data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        observe: 'response'
      }
    );
  }

  checkLogin():boolean
  {
    if (localStorage.getItem('dev_token') ) {
      // this._router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }

  /**
   * Function to remove data saved in browser's local storage
   */
  removeLocalStorageData(): void {
    localStorage.removeItem('showProtips');
    localStorage.removeItem('dev_token');
    localStorage.removeItem('userData');
    this.isLoggedIn.next(false);
  }
}
