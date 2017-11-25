import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pizza } from '../../models/pizza';

@Component({
  selector   : 'page-pizza-detail',
  templateUrl: 'pizza-detail.html'
})
export class PizzaDetailPage {
  pizza: Pizza;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.pizza = this.navParams.data;
  }

}
