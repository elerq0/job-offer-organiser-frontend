import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../style/account.scss', '../../../../shared/style/global.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public registrationInvalid: boolean;
  public errorMessage: string;
  public hidePassword: boolean;
  public hideConfirmation: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.hidePassword = true;
    this.hideConfirmation = true;

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmation: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    }, {validators: this.mustMatch('password', 'confirmation')});
  }

  public async onSubmit(): Promise<void> {
    this.registrationInvalid = false;
    if (this.form.valid) {
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;
      const email = this.form.get('email').value;
      try {
        await this.accountService.register(username, password, email);

        await this.router.navigate(['account/login']);
      } catch (err) {
        this.registrationInvalid = true;
        this.errorMessage = err.message;
      }
    }
  }

  public mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
