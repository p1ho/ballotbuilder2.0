import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BallotDataServiceProvider } from '../../providers/ballot-data-service/ballot-data-service';
import { User } from '../../models/user-model';
import { Ballot } from '../../models/ballot-model';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private ballotDataService: BallotDataServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
