import {NgModule} from '@angular/core';
import {MatCardModule, MatGridListModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class AppMaterialModule {

}
