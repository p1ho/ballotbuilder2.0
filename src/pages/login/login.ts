import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BallotDataServiceProvider } from '../../providers/ballot-data-service/ballot-data-service';
import { User } from '../../models/user-model';
import { Ballot } from '../../models/ballot-model';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private userName: string;
  private password: string;
  private user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ballotDataService: BallotDataServiceProvider) {
    this.ballotDataService.getObservable().subscribe();
  }

  public createUser() {
    this.ballotDataService.addUser(this.userName, this.password);
    this.ballotDataService.setActiveUser(this.userName, this.password).then(() => {
      this.user = this.ballotDataService.getActiveUser();
      this.ballotDataService.addBallot(this.user.getUserKey());
      this.navCtrl.push(HomePage);
    });
  }

  public userLogin() {
    this.ballotDataService.setActiveUser(this.userName, this.password).then(() => {
      if (this.ballotDataService.getActiveUser() != undefined) {
        this.navCtrl.push(HomePage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
