import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from '../model/user';
import {environment} from '../../../../environments/environment';
import {ResponseInfoError} from '../../../core/error/response-info-error';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;

  constructor(private router: Router,
              private httpClient: HttpClient) {
    if (localStorage.getItem('user')) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    } else {
      this.userSubject = new BehaviorSubject<User>(new User());
    }
  }

  public async login(username, password): Promise<void> {
    await this.httpClient
      .post(environment.apiUrl + 'user/login', {username, password}, {observe: 'response'})
      .toPromise()
      .then(
        (res: HttpResponse<object>) => {
          const user = this.userSubject.value;
          user.username = username;
          user.token = res.headers.get('Authorization');
          this.setValue(user);
          localStorage.setItem('user', JSON.stringify(user));
        },
        (err: any) => {
          throw new ResponseInfoError(err);
        }
      );
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(new User());
    this.router.navigate(['/account/login']);
  }

  public async register(username, password, email): Promise<void> {
    await this.httpClient
      .post(`${environment.apiUrl}user/register`, {username, password, email}, {observe: 'response'})
      .toPromise()
      .catch(
        (err: any) => {
          throw new ResponseInfoError(err);
        }
      );
  }

  public checkAuthenticated(): boolean {
    return Boolean(this.getValue().token);
  }

  public getValue(): User {
    return this.userSubject.value;
  }

  public setValue(user: User): void {
    this.userSubject.next(user);
  }

  public updateToken(token: string): void {
    const user = this.userSubject.value;
    user.token = token;
    this.setValue(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
