import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { SelectOptionComponent } from './select-option/select-option.component';
import { CommonModule } from '@angular/common';

const components = [
  SelectComponent,
  SelectOptionComponent,
]

@NgModule({
  imports: [
    PortalModule,
    OverlayModule,
    CommonModule
  ],
  exports: [...components],
  declarations: [...components],
  providers: [],
})
export class SelectModule {
}
