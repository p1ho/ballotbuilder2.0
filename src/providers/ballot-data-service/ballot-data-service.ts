import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

import { Race } from '../../models/race-model';
import { Candidate } from '../../models/candidate-model';
import { Measure } from '../../models/measure-model';
import { Ballot } from '../../models/ballot-model';

import firebase from 'firebase';

import { User } from '../../models/user-model';

const firebaseConfig = {
    apiKey: "AIzaSyAeceMNxKdLCOEA99OkX9DwpBv6Yl87FyY",
    authDomain: "ballotbuilder-bc9ac.firebaseapp.com",
    databaseURL: "https://ballotbuilder-bc9ac.firebaseio.com",
    projectId: "ballotbuilder-bc9ac",
    storageBucket: "ballotbuilder-bc9ac.appspot.com",
    messagingSenderId: "805016191781"
  };

/*
  Generated class for the BallotDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BallotDataServiceProvider {
  private db: any;
  private serviceObserver: Observer<any[]>;
  private clientObservable: Observable<any[]>;
  private races: Race[] = [];
  private candidates: Candidate[] =[];
  private measures: Measure[] = [];
  private activeUser: User;

  constructor() {
    this.clientObservable = Observable.create(observerThatWasCreated => {
      this.serviceObserver = observerThatWasCreated;
    });
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();
    let racesRef = this.db.ref('/Races');
    racesRef.on('value', snapshot => {
      this.races = [];
      snapshot.forEach(childSnapshot => {
        let race = new Race(childSnapshot.val().name, childSnapshot.val().duties, childSnapshot.key);
        this.races.push(race);
      });
      this.notifySubscribers();
    });
    let candidatesRef = this.db.ref('/Candidates');
    candidatesRef.on('value', snapshot => {
      this.candidates = [];
      snapshot.forEach(childSnapshot => {
        let candidate = new Candidate(childSnapshot.val().name, childSnapshot.val().party, childSnapshot.val().bio, childSnapshot.val().policies, childSnapshot.val().raceKey, childSnapshot.key);
        this.candidates.push(candidate);
      });
      this.notifySubscribers();
    });
    let measuresRef = this.db.ref('/Measures');
    measuresRef.on('value', snapshot => {
      this.measures = [];
      snapshot.forEach(childSnapshot => {
        let measure = new Measure(childSnapshot.val().name, childSnapshot.val().summary, childSnapshot.val().details, childSnapshot.key);
        this.measures.push(measure);
      });
      this.notifySubscribers();
    });
  }

  public addUser(userName: string, password: string) {
    let userRef = this.db.ref('/Users');
    let childRef = userRef.push();
    let dataRecord = {
      username: userName,
      password: password
    }
    childRef.set(dataRecord);
  }

  public setActiveUser(userName: string, password: string) {
    let usersRef = this.db.ref('/Users');
    this.activeUser = undefined;
    return usersRef.once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        if (childSnapshot.val().username === userName && childSnapshot.val().password === password) {
          this.activeUser = new User(childSnapshot.val().username, childSnapshot.key);
        }
      });
    });
  }

  public getActiveUser() {
    return this.activeUser;
  }

  public addBallot(userKey: string) {
    let userRaces = [];
    for (let r of this.races) {
      userRaces.push({"raceKey": r.getRaceKey(), "vote": ""});
    }
    let userMeasures = [];
    for (let m of this.measures) {
      userMeasures.push({"measureKey": m.getMeasureKey(), "vote": ""});
    }
    let newBallot = new Ballot(userKey, userRaces, userMeasures, "");
    let ballotRef = this.db.ref("/Ballots");
    let childRef = ballotRef.push();
    let dataRecord = {
      userKey: newBallot.getUserKey(),
      races: newBallot.getBallotRaces(),
      measures: newBallot.getBallotMeasures()
    }
    childRef.set(dataRecord);
  }

  public getObservable() {
    return this.clientObservable;
  }

  private notifySubscribers() {
    this.serviceObserver.next(undefined);
  }

  public getRaces() {
    let entriesClone = this.races;
    return entriesClone;
  }

  public getCandidates() {
    let entriesClone = this.candidates;
    return entriesClone;
  }

  public getMeasures() {
    let entriesClone = this.measures;
    return entriesClone;
  }

  public getCandidateByKey(candidateKey: string) {
    for (let c of this.candidates) {
      if (c.getCandidateKey() === candidateKey) {
        let clone = c;
        return clone;
      }
    }
    return undefined;
  }

  public getMeasureByKey(measureKey: string) {
    for (let m of this.measures) {
      if (m.getMeasureKey() === measureKey) {
        let clone = m;
        return clone;
      }
    }
    return undefined;
  }

}
