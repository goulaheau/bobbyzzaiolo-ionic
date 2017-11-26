import { Component } from '@angular/core';
import { PizzaCardsPage } from '../pizza-cards/pizza-cards';

@Component({
  selector   : 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  pizzaCardsRoot = PizzaCardsPage;
  rootParams = { admin: true };

  constructor() {
  }
}
