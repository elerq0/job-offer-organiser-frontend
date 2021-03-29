import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AccountService} from '../../feature/account/service/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.accountService.logout();
      }

      return throwError(err);
    }));
  }
}
