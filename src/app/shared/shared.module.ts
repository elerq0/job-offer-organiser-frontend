import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultiSelectDropdownComponent} from './component/multi-select-dropdown/multi-select-dropdown.component';
import {FormsModule} from '@angular/forms';
import {SelectDropdownComponent} from './component/select-dropdown/select-dropdown.component';
import {MatButtonModule} from '@angular/material/button';
import {TriStateCheckboxComponent} from './component/tri-state-checkbox/tri-state-checkbox.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    MultiSelectDropdownComponent,
    SelectDropdownComponent,
    TriStateCheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  exports: [
    MultiSelectDropdownComponent,
    SelectDropdownComponent,
    TriStateCheckboxComponent,
  ]
})
export class SharedModule {
}
