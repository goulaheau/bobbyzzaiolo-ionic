import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PizzaProvider } from "../../providers/pizza/pizza";
import { Pizza } from "../../models/pizza";
import { PizzaDetailPage } from "../pizza-detail/pizza-detail";

@Component({
  selector   : 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pizzas: Pizza[];
  pizzaDetailPage: typeof PizzaDetailPage;

  constructor(public navCtrl: NavController,
              private pizzaProvider: PizzaProvider) {
    this.pizzaDetailPage = PizzaDetailPage;
    this.pizzaProvider.getAll().subscribe(
      res => this.pizzas = res
    );
  }
}
