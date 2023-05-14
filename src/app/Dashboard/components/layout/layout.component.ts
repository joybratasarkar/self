import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { WebSoketService } from 'src/app/core/services/web-soket.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
inputForm!:FormGroup
private _unsubscribe$=new Subject<boolean>
title = 'socketrv';
content = '';
received:any = [];
sent:any = [];
constructor(
  private _auth:AuthService,
  private _router:Router,
  private WebsocketService: WebSoketService,
  private _formBuilder: FormBuilder,

)
{
  this.inputForm=this._formBuilder.group({})

  WebsocketService.messages.subscribe((msg:any) => {
    debugger;
    this.received.push(msg);
    debugger;
    console.log("Response from websocket: " + msg.message);
  });
}


  logout(): void {
    
    this._auth.logout().pipe(takeUntil(this._unsubscribe$)).subscribe({
      next: (res: any) => {
        
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
  sendMsg() {
    let message = {
      message: '',
      username: ''
    };
    message.message = this.content;
    message.username = this.content;
    var sent ={
      'message': message.message,
      'username': message.username,
  }
  
    this.sent.push(sent);
    console.log('this.sent',this.sent);
    
    this.WebsocketService.messages.next(message);
  }
}
