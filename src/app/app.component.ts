import { Component } from '@angular/core';
import { ISelectOptionModel } from '../shared/types/select-option.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly _defaultOptions: ISelectOptionModel[] = [
    {
      id: 1,
      label: 'Option 1',
    },
    {
      id: 2,
      label: 'Option 2',
    },
    {
      id: 3,
      label: 'Option 3',
    },
    {
      id: 4,
      label: 'Option 4',
    },
    {
      id: 5,
      label: 'Option 5',
    },
    {
      id: 6,
      label: 'Option 6',
    },
    {
      id: 7,
      label: 'Option 7',
    },
    {
      id: 8,
      label: 'Option 8',
    },
    {
      id: 9,
      label: 'Option 9',
    },
  ];
  private _shorterDefaultOptions: ISelectOptionModel[] = [
    {
      id: 1,
      label: 'Option 1',
    },
    {
      id: 2,
      label: 'Option 2',
    },
    {
      id: 3,
      label: 'Option 3',
    },
    {
      id: 4,
      label: 'Option 4',
    },
    {
      id: 5,
      label: 'Option 5',
    },
  ]
  private readonly _defaultPlaceholder = 'Select an option';
  private readonly _changedPlaceholder = 'Please select an option';

  placeholder = this._defaultPlaceholder;
  dropdownOptions: ISelectOptionModel[] = [];
  selectedOption: ISelectOptionModel | undefined;

  changePlaceholder() {
    this.placeholder = this._changedPlaceholder;
  }

  resetPlaceholder() {
    this.placeholder = this._defaultPlaceholder;
  }

  populateOptions() {
    this.dropdownOptions = this._defaultOptions;
  }

  populateShorterOptions() {
    this.dropdownOptions = this._shorterDefaultOptions;
  }

  selectOption3() {
    this.selectedOption = this._defaultOptions[2];
  }
}
