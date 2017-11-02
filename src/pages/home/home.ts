import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PizzaProvider } from "../../providers/pizza/pizza";
import { Pizza } from "../../models/pizza";
import { PizzaPage } from "../pizza/pizza";

@Component({
  selector   : 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pizzas: Pizza[];
  pizzaPage: typeof PizzaPage;

  constructor(public navCtrl: NavController,
              private pizzaProvider: PizzaProvider) {
    this.pizzaPage = PizzaPage;
    this.pizzaProvider.getAll().subscribe(
      res => this.pizzas = res,
      err => console.log(err)
    );
  }
}
