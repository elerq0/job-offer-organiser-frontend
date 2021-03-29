import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnInit {
  @Input() title: string;
  @Input() class: string;
  @Input() values: any[];

  @Output() newValue = new EventEmitter();

  showDropDown: boolean;


  constructor() {
    this.showDropDown = false;
  }

  ngOnInit(): void {
  }

  onChange(obj: any): void {
    this.showDropDown = false;
    this.newValue.emit(obj);
  }
}
