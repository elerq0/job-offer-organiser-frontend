import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss']
})
export class MultiSelectDropdownComponent implements OnChanges {
  @Input() title: string;
  @Input() values: string[];
  @Input() error: boolean;
  @Input() disabled: boolean;
  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();

  stateValues: any[];
  checkedList: any[];
  showDropDown: boolean;

  constructor() {
    this.checkedList = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.values && changes.values.currentValue) {
      this.stateValues = [];
      for (const item of changes.values.currentValue) {
        this.stateValues.push({name: item, checked: false});
      }
    }
  }

  public getSelectedValue(status: boolean, value: string): void {
    if (status) {
      this.checkedList.push(value);
    } else {
      this.checkedList.splice(this.checkedList.indexOf(value), 1);
    }

    this.shareCheckedList.emit(this.checkedList);
  }

  public clear(): void {
    this.checkedList = [];
    for (const item of this.stateValues) {
      item.checked = false;
    }
  }
}

