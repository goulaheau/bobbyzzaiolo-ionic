import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PizzaCardsPage } from '../pages/pizza-cards/pizza-cards';
import { PizzaProvider } from '../providers/pizza/pizza';
import { PizzaDetailPage } from '../pages/pizza-detail/pizza-detail';
import { HttpClientModule } from '@angular/common/http';
import { AdminPage } from '../pages/admin/admin';

const pages = [
  MyApp,
  AdminPage,
  PizzaCardsPage,
  PizzaDetailPage
];

@NgModule({
  declarations   : pages,
  imports        : [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap      : [IonicApp],
  entryComponents: pages,
  providers      : [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PizzaProvider
  ]
})
export class AppModule {}
