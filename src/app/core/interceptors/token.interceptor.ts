import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, map } from 'rxjs';
import { UtilityService } from '../services/utility.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { BroadcastService } from '../services/broadcast.service';
import { ProgressBarService } from '../services/progress-bar.service';
import { useErrorHandler } from '../tokens/httpsContext.token';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _utility: UtilityService,
    private _errorHandler: ErrorHandlerService,
    private _progressBar: ProgressBarService,
    private _broadcastService: BroadcastService

  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token = localStorage.getItem('dev_token');
    
    if (!token) {
      return next.handle(request);
    }
    if (token) {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          Authorization: token
        }
      });
      // SHOW PROGRESS BAR WHEN REQUEST HAS REPORT PROGRESS KEY SET TO TRUE
      if (request.reportProgress) {
        this._progressBar.showProgressBar.next(true);
      }
    } else {
      
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    //  else {
    //   if (request.reportProgress) {
    //     this._progressBar.showProgressBar.next(true);
    //   }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        
        if (request.method != 'GET') {
          this._broadcastService.postMessage();
        }
        return event;
      }),
      catchError((httpErrorResponse: HttpErrorResponse) => {
        if (request.context.get(useErrorHandler)) {
          this._errorHandler.routeAccordingToError(httpErrorResponse);
        }
        throw (httpErrorResponse);
      }),
      finalize(() => {
        
        if (request.reportProgress) {
          // HIDE PROGRESS BAR IN ANY CASE SUCCESS/ERROR
          this._progressBar.showProgressBar.next(false);
        }
      })
    );
  }
}

