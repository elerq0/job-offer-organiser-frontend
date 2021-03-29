import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../service/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../style/account.scss', '../../../../shared/style/global.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loginInvalid: boolean;
  public errorMessage: string;
  public hide: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private accountService: AccountService) {
  }

  async ngOnInit(): Promise<void> {
    this.hide = true;
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (await this.accountService.checkAuthenticated()) {
      await this.router.navigate(['']);
    }
  }

  public async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    if (this.form.valid) {
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;
      try {
        await this.accountService.login(username, password);

        await this.router.navigate(['']);
      } catch (err) {
        this.loginInvalid = true;
        this.errorMessage = err.message;
      }
    }
  }
}
