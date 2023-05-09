import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from './components/select/select.module';


@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    ReactiveFormsModule,
  ],
  declarations: [],
  exports: [ SelectModule ],
  providers: [],
})
export class SharedModule {
}
