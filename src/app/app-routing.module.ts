import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guard/auth.guard';

const accountModule = () => import('./feature/account/account-routing.module').then(x => x.AccountRoutingModule);
const offerOrganiserModule = () => import('./feature/offer-organiser/offer-organiser-routing.module')
  .then(x => x.OfferOrganiserRoutingModule);

const routes: Routes = [
  {path: '', loadChildren: offerOrganiserModule, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'account', loadChildren: accountModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
