import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BallotDataServiceProvider } from '../../providers/ballot-data-service/ballot-data-service';
import { Candidate } from '../../models/candidate-model';
import { Race } from '../../models/race-model';
import { User } from '../../models/user-model';
/**
 * Generated class for the CandidateDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate-detail',
  templateUrl: 'candidate-detail.html',
})
export class CandidateDetailPage {

  private candidate: Candidate;
  private objectKeys = Object.keys;
  private race: Race;
  private user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ballotDataService: BallotDataServiceProvider) {
    let candidateKey = this.navParams.get("candidateKey");
    this.candidate = this.ballotDataService.getCandidateByKey(candidateKey);
    this.race = this.ballotDataService.getRaceByKey(this.candidate.getRaceKey());
    this.user = this.ballotDataService.getActiveUser();
  }

  private parsePolicies() {
    let policiesList = [];
    let policiesObject = this.candidate.getCandidatePolicies();
    for (let policy in policiesObject) {
      policiesList.push(policiesObject[policy]);
    }
    return policiesList;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidateDetailPage');
  }

}
