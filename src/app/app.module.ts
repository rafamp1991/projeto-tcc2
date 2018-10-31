import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import 'rxjs/add/operator/map';
import { ConfigPage } from '../pages/config/config';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContactProvider } from '../providers/contact/contact';

export const firebaseConfig = {
  apiKey: "AIzaSyAIgM5HP90j0pTnKmgJl-JD8WfNMli4cWw",
  authDomain: "project-tcc-4e4be.firebaseapp.com",
  databaseURL: "https://project-tcc-4e4be.firebaseio.com",
  projectId: "project-tcc-4e4be",
  storageBucket: "project-tcc-4e4be.appspot.com",
  messagingSenderId: "924161875158"
};

@NgModule({
  declarations: [
    MyApp,
    ConfigPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConfigPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactProvider
  ]
})
export class AppModule {}
