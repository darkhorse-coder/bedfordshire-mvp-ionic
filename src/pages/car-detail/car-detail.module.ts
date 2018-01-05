import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarDetailPage } from './car-detail';

@NgModule({
  declarations: [
    CarDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CarDetailPage),
  ],
})
export class CarDetailPageModule {}
