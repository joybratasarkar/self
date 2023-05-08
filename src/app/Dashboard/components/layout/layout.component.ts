import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

private _unsubscribe$=new Subject<boolean>

constructor(
  private _auth:AuthService,
  private _router:Router
)
{

}


  logout(): void {
    debugger;
    this._auth.logout().pipe(takeUntil(this._unsubscribe$)).subscribe({
      next: (res: any) => {
        debugger;
        this._auth.removeLocalStorageData();
        this._router.navigate(['/auth/login']);
        
        
        
        setTimeout(() => {
          // this._storeService.resetStoreOnLogout();
        }, 500);
      },
      error(err) {
        
      },
    });
  }
}
