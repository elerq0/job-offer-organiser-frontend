import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountService} from '../../feature/account/service/account.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.accountService.getValue();
    const isLoggedIn = user.username !== '' && user.token !== '';
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }
    return next.handle(request)
      .pipe(
        map((res: any) => {
          if (res instanceof HttpResponse && res.status === 200 && res.headers.has('Authorization')) {
            this.accountService.updateToken(res.headers.get('Authorization'));
          }

          return res;
        })
      );
  }
}
