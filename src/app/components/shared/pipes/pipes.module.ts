import { NgModule } from '@angular/core';
import { TimeStatusPipe } from './timeStatusPipe';

const PIPES = [
  TimeStatusPipe
]

@NgModule({
  declarations: [ ... PIPES],
  providers: [ ...PIPES],
  exports: [ ...PIPES]
})
export class PipesModule { }
