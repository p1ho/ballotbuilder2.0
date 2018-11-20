import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BallotDataServiceProvider } from '../../providers/ballot-data-service/ballot-data-service';
import { Race } from '../../models/race-model';
import { Candidate } from '../../models/candidate-model';
import { Measure } from '../../models/measure-model';
import { CandidateDetailPage } from '../candidate-detail/candidate-detail';
import { MeasureDetailPage } from '../measure-detail/measure-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private races: Race[] = [];
  private candidates: Candidate[] = [];
  private measures: Measure[] = [];

  constructor(public navCtrl: NavController, private ballotDataService: BallotDataServiceProvider) {
    this.ballotDataService.getObservable().subscribe(() => {
      this.races = this.ballotDataService.getRaces();
      this.candidates = this.ballotDataService.getCandidates();
      this.measures = this.ballotDataService.getMeasures();
    });
  }

  private viewCandidate(candidateKey: string) {
    this.navCtrl.push(CandidateDetailPage, {"candidateKey": candidateKey})
  }

  private viewMeasure(measureKey: string) {
    this.navCtrl.push(MeasureDetailPage, {"measureKey": measureKey})
  }

}
