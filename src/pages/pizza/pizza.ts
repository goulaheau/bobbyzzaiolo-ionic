import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pizza } from "../../models/pizza";

/**
 * Generated class for the PizzaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pizza',
  templateUrl: 'pizza.html',
})
export class PizzaPage {
  pizza: Pizza;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.pizza = this.navParams.data;
  }

}
