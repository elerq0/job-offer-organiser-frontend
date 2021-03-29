import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AccountRoutingModule} from '../account/account-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './component/home/home.component';
import {OfferViewerComponent} from './component/offer-viewer/offer-viewer.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {SharedModule} from '../../shared/shared.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableFilterModule} from 'mat-table-filter';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableFilterModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    OfferViewerComponent,
  ],
})
export class OfferOrganiserModule {
}
