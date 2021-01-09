import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor, ErrorInterceptor} from './core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {AccountModule} from './feature/account/account.module';
import {OfferOrganiserModule} from './feature/offer-organiser/offer-organiser.module';
import {MultiSelectDropdownComponent} from './shared/component/multi-select-dropdown/multi-select-dropdown.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AccountModule,
    OfferOrganiserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    MultiSelectDropdownComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
