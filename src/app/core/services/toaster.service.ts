import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    private tostar:  ToastrService

  ) { }


  toastSuccess(title?: string, details?: string) {
    this.tostar.success(details, title, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 4000
    });
  }

  // tost Info
  toastInfo(title?: string, details?: string) {
    this.tostar.info(details, title, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 4000
    });
  }

  // tost Warning
  toastWarning(title?: string, details?: string) {
    this.tostar.warning(details, title, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 4000
    })
  }

  // tost Error
  toastError(title?: string, details?: string) {
    this.tostar.error(details, title, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 4000
    })
  }
}
