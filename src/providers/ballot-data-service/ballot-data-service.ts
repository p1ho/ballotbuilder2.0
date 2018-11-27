import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

import { Race } from '../../models/race-model';
import { Candidate } from '../../models/candidate-model';
import { Measure } from '../../models/measure-model';

import firebase from 'firebase';

import { User } from '../../mmodels/user-model';

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
  private users: User[] = [];
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
    let usersRef = this.db.ref('/Users');
    usersRef.on('value', snapshot => {
      this.users = [];
      snapshot.forEach(childSnapshot => {
        let user = new User(childSnapshot.val().userName, childSnapshot.val().password, childSnapshot.key);
        this.users.push(user);
      });
    });
  }

  public addUser(newUser: User) {
    let userRef = this.db.ref('/Users');
    let childRef = userRef.push();
    dataRecord = {
      username: user.getUserName(),
      password: user.getPassword()
    }
    childref.set(dataRecord);

    for (let user of this.users) {
      if (user.getUserName() === newUser.getUserName() && user.getPassword() === newUser.getPassword()){
        this.activeUser = user;
      }
    }
    this.notifySubscribers();
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
