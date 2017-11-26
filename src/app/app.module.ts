import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PizzaCardsPage } from '../pages/pizza-cards/pizza-cards';
import { PizzaProvider } from '../providers/pizza';
import { PizzaDetailPage } from '../pages/pizza-detail/pizza-detail';
import { HttpClientModule } from '@angular/common/http';
import { AdminPage } from '../pages/admin/admin';
import { PizzaFormPage } from '../pages/pizza-form/pizza-form';
import { IngredientProvider } from '../providers/ingredient';
import { SocketProvider } from '../providers/socket';
import { IngredientCardsPage } from '../pages/ingredient-cards/ingredient-cards';
import { IngredientFormPage } from '../pages/ingredient-form/ingredient-form';
import { BasketProvider } from '../providers/basket';
import { BasketPage } from '../pages/basket/basket';

const pages = [
  MyApp,
  AdminPage,
  PizzaCardsPage,
  PizzaDetailPage,
  PizzaFormPage,
  IngredientCardsPage,
  IngredientFormPage,
  BasketPage
];

@NgModule({
  declarations   : pages,
  imports        : [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap      : [IonicApp],
  entryComponents: pages,
  providers      : [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PizzaProvider,
    IngredientProvider,
    SocketProvider,
    BasketProvider
  ]
})
export class AppModule {}
