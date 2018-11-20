import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeasureDetailPage } from './measure-detail';

@NgModule({
  declarations: [
    MeasureDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MeasureDetailPage),
  ],
})
export class MeasureDetailPageModule {}
