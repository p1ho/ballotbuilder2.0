import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BallotDataServiceProvider } from '../../providers/ballot-data-service/ballot-data-service';
import { Candidate } from '../../models/candidate-model';
import { Race } from '../../models/race-model';
import { User } from '../../models/user-model';
import { CandidateComment } from '../../models/comment-model';
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
  private comments: CandidateComment[];
  private newCommentText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ballotDataService: BallotDataServiceProvider) {
    let candidateKey = this.navParams.get("candidateKey");
    this.candidate = this.ballotDataService.getCandidateByKey(candidateKey);
    this.race = this.ballotDataService.getRaceByKey(this.candidate.getRaceKey());
    this.user = this.ballotDataService.getActiveUser();
    this.comments = this.ballotDataService.getCandidateCommentsByCandidateKey(candidateKey);
    this.ballotDataService.getObservable().subscribe(() => {
      this.candidate = this.ballotDataService.getCandidateByKey(candidateKey);
      this.comments = this.ballotDataService.getCandidateCommentsByCandidateKey(candidateKey);
    });
  }

  private parsePolicies() {
    let policiesList = [];
    let policiesObject = this.candidate.getCandidatePolicies();
    for (let policy in policiesObject) {
      policiesList.push(policiesObject[policy]);
    }
    return policiesList;
  }

  public voteFor() {
    let userRaces = this.user.getRaces();
    for (let race of userRaces) {
      if (race["raceKey"] === this.race.getRaceKey()) {
        if (race["vote"] === "") {
          race["vote"] = this.candidate.getCandidateKey();
          this.ballotDataService.updateCandidateVotes(this.candidate.getCandidateKey(), "up");
        } else if (race["vote"] === this.candidate.getCandidateKey()) {
          console.log("repeat vote");
        } else {
          let previousVote = race["vote"];
          race["vote"] = this.candidate.getCandidateKey();
          this.ballotDataService.updateCandidateVotes(this.candidate.getCandidateKey(), "up");
          this.ballotDataService.updateCandidateVotes(previousVote, "down");
        }
      }
    }
    this.user.setRaces(userRaces);
    this.ballotDataService.updateUserRaces(this.user.getRaces());
  }

  public backToBallot() {
    this.navCtrl.pop();
  }

  public addComment() {
    if (this.newCommentText != '') {
      let comment = new CandidateComment('', this.user.getUserName(), this.user.getUserKey(), this.newCommentText, 0, this.candidate.getCandidateKey());
      this.ballotDataService.addCandidateComment(comment);
      this.newCommentText = '';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidateDetailPage');
  }

}
