import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  matDialogRefId!: string;

  constructor(
    private _matDialog: MatDialog,
    private _router:Router
  ) { }



   /**
   * Function to open Material Dialog Box
   * @param template Angular component that should behave as a dialog box
   * @param data Data that needs to be injected into dialog box component
   */
   openDialogBox(template: any, data?: any) {
    this.closeDialogBox();
    const dialogRef = this._matDialog.open(template, { panelClass: 'custom-dialog', data: data, hasBackdrop: false });
    this.matDialogRefId = dialogRef?.id;
    return dialogRef;
  }


  /**
   * Closes all Popups that are currently in open state
   */
  closeDialogBox(): void {
    this._matDialog.closeAll();
  }

   /**
   * Function that waits for some time before hiding the dialog box
   * @param {number} delay Time to delay in milliseconds
   * @param {string} url Destination route url
   */
   autoHideDialogBox(delay: number, url?: string, dialogRef?: any): void {
    setTimeout(() => {
      if (dialogRef?.id == this.matDialogRefId) {
        this.closeDialogBox();
        if (url?.trim() != '') {
          this._router.navigate([url]);
        }
      }
    }, delay);
  }


    /**
   * Function to allow only String in input field
   * @param event Key event
   * @returns True if String is input
   */
    stringOnly(event: any) {
      let userInput = event.key;
      return userInput.match(/^[a-zA-Z ]*$/) !== null;
    }
  
    numbersOnly(event: any) {
      let userInput = event.key;
      return userInput.match(/^\d+$/) !== null;
    }
  /**
* Function to delete null/empty keys from an object
* @param data type `Object`
* @returns `Object`
*/
deleteUndefinedKeysInObject(data: any) {
  Object.keys(data).map(function (key) {
    if (data[key] == null || data[key] == 'null' || data[key] == undefined) {
      delete data[key];
    }
  });
  return data;
}
  /**
  * Function to add commas to number value
  * @param event Input event
  * @param formControl Form control whose value is to be changed
  */
  addCommas(event: any, formControl: AbstractControl): void {
    let value = event.target.value.toString().replace(/,/g, '');
    if (!(+value)) {
      return;
    }
    formControl.setValue((+value).toLocaleString('en-IN'));
  }
  // (keydown)="_utility.stringOnly($event)"
  capitilizeFirstLetter(event: any, formControl: AbstractControl): void {
    var value = event.target.value.toString()?.replace(' ', '  ');
    value = value.replace(/\b\w/g, (char:any) => char.toUpperCase());

    if (value === '') {
      return;
    }

    formControl.setValue(value);
    
  }  
}
