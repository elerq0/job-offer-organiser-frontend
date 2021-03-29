import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AccountRoutingModule} from './account-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  exports: []
})
export class AccountModule {
}
