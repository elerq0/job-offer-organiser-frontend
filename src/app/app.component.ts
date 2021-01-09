import {Component} from '@angular/core';
import {AccountService} from './feature/account/service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./shared/style/global.scss']
})
export class AppComponent {
  title = 'job-offer-organiser';

  constructor(public accountService: AccountService) {
  }
}
