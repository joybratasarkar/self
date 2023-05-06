import { Injectable } from '@angular/core';
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
}
