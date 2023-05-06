import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

   /**
   * Function that saves auth token in localstorage of browser
   * @param token Auth Token recieved from back end
   */
   setAuthToken(token: string): void {
    
    localStorage.setItem('dev_token', token);
  }


   /**
   * Getter function to check if token is present
   */
   get devToken(): boolean {
    return localStorage.getItem('dev_token') != undefined;
  }

}
