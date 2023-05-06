import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BroadcastService } from '../services/broadcast.service';

@Injectable()
export class BroadcastInterceptor implements HttpInterceptor {

  broadcastChannel: BroadcastChannel = new BroadcastChannel('reload');

  constructor(
    private _broadcastService: BroadcastService
  ) { }

  requestMethod = ['POST', 'PUT', 'PATCH', 'DELETE'];
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._broadcastService.getMessage();
    return next.handle(request);
  }
}
