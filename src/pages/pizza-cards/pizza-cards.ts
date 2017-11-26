import { Component } from '@angular/core';
import { PizzaProvider } from '../../providers/pizza/pizza';
import { Pizza } from '../../models/pizza';
import { PizzaDetailPage } from '../pizza-detail/pizza-detail';
import { NavParams } from 'ionic-angular';

@Component({
  selector   : 'page-pizza-cards',
  templateUrl: 'pizza-cards.html'
})
export class PizzaCardsPage {
  pizzas: Pizza[];
  pizzaDetailPage = PizzaDetailPage;
  inAdmin: boolean;

  constructor(private pizzaProvider: PizzaProvider,
              private navParams: NavParams) {
    this.pizzaProvider.getAll().subscribe(
      res => this.pizzas = res
    );

    this.inAdmin = this.navParams.data.admin ? this.navParams.data.admin : false;
  }
}
