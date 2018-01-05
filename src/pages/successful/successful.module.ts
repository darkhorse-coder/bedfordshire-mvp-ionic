import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuccessfulPage } from './successful';

@NgModule({
  declarations: [
    SuccessfulPage,
  ],
  imports: [
    IonicPageModule.forChild(SuccessfulPage),
  ],
})
export class SuccessfulPageModule {}
