import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BallotDataServiceProvider } from '../../providers/ballot-data-service/ballot-data-service';
import { Measure } from '../../models/measure-model';
import { MeasureComment } from '../../models/comment-model';
import { User } from '../../models/user-model';

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
  private comments: MeasureComment[];
  private yesComments: MeasureComment[];
  private noComments: MeasureComment[];
  private user: User;
  private newCommentText: string;
  private newCommentYesOrNo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ballotDataService: BallotDataServiceProvider) {
    let measureKey = this.navParams.get("measureKey");
    this.user = this.ballotDataService.getActiveUser();
    this.measure = this.ballotDataService.getMeasureByKey(measureKey);
    this.comments = this.ballotDataService.getMeasureCommentsByMeasureKey(measureKey);
    this.yesComments = [];
    this.noComments = [];
    for (let comment of this.comments) {
      if (comment.getYesOrNo() === "Yes") {
        this.yesComments.push(comment);
      } else {
        this.noComments.push(comment);
      }
    }
    this.ballotDataService.getObservable().subscribe(() => {
      this.measure = this.ballotDataService.getMeasureByKey(measureKey);
      this.comments = this.ballotDataService.getMeasureCommentsByMeasureKey(measureKey);
      this.yesComments = [];
      this.noComments = [];
      for (let comment of this.comments) {
        if (comment.getYesOrNo() === "Yes") {
          this.yesComments.push(comment);
        } else {
          this.noComments.push(comment);
        }
      }
    });
  }

  private parseDetails() {
    let detailsList = [];
    let detailsObject = this.measure.getMeasureDetails();
    for (let detail in detailsObject) {
      detailsList.push(detailsObject[detail]);
    }
    return detailsList;
  }

  private addComment() {
    let comment = new MeasureComment('', this.user.getUserName(), this.user.getUserKey(), this.newCommentText, 0, this.measure.getMeasureKey(), this.newCommentYesOrNo);
    this.ballotDataService.addMeasureComment(comment);
    this.newCommentText = '';
    this.newCommentYesOrNo = '';
  }

  private voteYes() {
    let userMeasures = this.user.getMeasures();
    for (let measure of userMeasures) {
      if (measure["measureKey"] === this.measure.getMeasureKey()) {
        measure["vote"] = "yes";
        this.ballotDataService.updateMeasureYesVotes(this.measure.getMeasureKey());
      }
    }
    this.user.setMeasures(userMeasures);
    this.ballotDataService.updateUserMeasures(this.user.getMeasures());

  }

  private voteNo() {
    let userMeasures = this.user.getMeasures();
    for (let measure of userMeasures) {
      if (measure["measureKey"] === this.measure.getMeasureKey()) {
        measure["vote"] = "no";
        this.ballotDataService.updateMeasureNoVotes(this.measure.getMeasureKey());
      }
    }
    this.user.setMeasures(userMeasures);
    this.ballotDataService.updateUserMeasures(this.user.getMeasures());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeasureDetailPage');
  }

}
