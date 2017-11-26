import { Component } from '@angular/core';
import { PizzaCardsPage } from '../pizza-cards/pizza-cards';
import { IngredientCardsPage } from '../ingredient-cards/ingredient-cards';
import { NavParams } from 'ionic-angular';

@Component({
  selector   : 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  pizzaCardsRoot = PizzaCardsPage;
  ingredientCardsRoot = IngredientCardsPage;
  rootParams = { admin: true };
  tab: any;

  constructor(private navParams: NavParams) {
    this.tab = this.navParams.data.tab ? this.navParams.data.tab : 0;
  }
}
