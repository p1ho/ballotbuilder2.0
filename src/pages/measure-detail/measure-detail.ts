import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BallotDataServiceProvider } from '../../providers/ballot-data-service/ballot-data-service';

/**
 * Generated class for the MeasureDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-measure-detail',
  templateUrl: 'measure-detail.html',
})
export class MeasureDetailPage {

  private measure: Measure;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ballotDataService: BallotDataServiceProvider) {
    let measureKey = this.navParams.get("measureKey");
    this.measure = this.ballotDataService.getMeasureByKey(measureKey);
  }

  private parseDetails() {
    let detailsList = [];
    for (let detail in this.measure.measureDetails) {
      detailsList.push(this.measure.measureDetails[detail]);
    }
    return detailsList;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeasureDetailPage');
  }

}
