import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CandidateDetailPage } from '../pages/candidate-detail/candidate-detail';
import { MeasureDetailPage } from '../pages/measure-detail/measure-detail';
import { LoginPage } from '../pages/login/login';
import { BallotDataServiceProvider } from '../providers/ballot-data-service/ballot-data-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CandidateDetailPage,
    MeasureDetailPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CandidateDetailPage,
    MeasureDetailPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BallotDataServiceProvider
  ]
})
export class AppModule {}
