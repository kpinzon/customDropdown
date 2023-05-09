import { SelectComponent } from './select.component';
import { Injectable } from '@angular/core';

@Injectable()
export class SelectService {
  private _select!: SelectComponent;

  register(select: SelectComponent): void {
    this._select = select;
  }

  getSelect(): SelectComponent {
    return this._select;
  }
}
