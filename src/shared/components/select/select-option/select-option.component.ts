import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISelectOptionModel } from '../../../types/select-option.model';

@Component({
  selector: 'shared-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: [ './select-option.component.scss' ],
})
export class SelectOptionComponent {
  @Input() option!: ISelectOptionModel;
  @Output() select = new EventEmitter<ISelectOptionModel>();

  constructor() {}
}
