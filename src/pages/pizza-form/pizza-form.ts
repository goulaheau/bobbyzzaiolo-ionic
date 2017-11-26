import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Pizza } from '../../models/pizza';
import { Ingredient } from '../../models/ingredient';
import { IngredientProvider } from '../../providers/ingredient';
import { Observable } from 'rxjs/Observable';
import { PizzaProvider } from '../../providers/pizza';
import { AdminPage } from '../admin/admin';

@Component({
  selector   : 'page-pizza-form',
  templateUrl: 'pizza-form.html'
})
export class PizzaFormPage {
  pizza: Pizza;
  ingredients$: Observable<Ingredient[]>;
  pizzaImage              = '';
  pizzaIngredients: any[] = [];
  adminPage               = AdminPage;

  constructor(private navCtrl: NavController,
              private toastCtrl: ToastController,
              private navParams: NavParams,
              private pizzaProvider: PizzaProvider,
              private ingredientProvider: IngredientProvider) {
    this.pizza = this.navParams.data;

    if (Object.keys(this.pizza).length !== 0
      && this.pizza.constructor === Object) {
      this.pizzaIngredients = this.pizza.ingredients;
      this.pizzaImage       = this.pizza.image;
    } else {
      this.pizza = {
        name       : '',
        description: '',
        price      : '',
        image      : '',
        ingredients: []
      };
    }

    this.ingredients$ = this.ingredientProvider.getAll();
  }

  onSubmit(): void {
    const pizza: Pizza = {
      name       : this.pizza.name,
      description: this.pizza.description,
      price      : this.pizza.price,
      image      : this.pizzaImage,
      ingredients: []
    };

    this.pizzaIngredients.forEach((ingredient: Ingredient) => pizza.ingredients.push(ingredient._id));

    if (this.pizza._id) {
      this.pizzaProvider.put(this.pizza._id, pizza).subscribe(
        (pizza) => {
          this.navCtrl.push(this.adminPage);

          this.toastCtrl.create({
            message : `La pizza ${pizza.name} a été modifiée.`,
            duration: 5000,
            position: 'top'
          }).present();
        },
        () => this.toastCtrl.create({
            message : 'Une erreur s\'est produite lors de la modification de la pizza.',
            duration: 5000,
            position: 'top'
          }).present());
    } else {
      this.pizzaProvider.post(pizza).subscribe(
        () => this.navCtrl.push(this.adminPage),
        () => this.toastCtrl.create({
          message : 'Une erreur s\'est produite lors de la création de la pizza.',
          duration: 5000,
          position: 'top'
        }).present());
    }
  }

  onClickIngredient(ingredient: Ingredient): void {
    let found = false;

    for (const i in this.pizzaIngredients) {
      if (this.pizzaIngredients[i]._id === ingredient._id) {
        found = true;
        this.pizzaIngredients.splice(+i, 1);
        break;
      }
    }

    if (!found) {
      this.pizzaIngredients.push(ingredient);
    }
  }

  onChangeImage(event): void {
    const myReader = new FileReader();

    myReader.readAsDataURL(event.target.files[0]);

    myReader.onloadend = () => {
      this.pizzaImage = myReader.result;
    };
  }

  isClicked(ingredient: Ingredient): boolean {
    for (const i in this.pizzaIngredients) {
      if (this.pizzaIngredients[i]._id === ingredient._id) {
        return false;
      }
    }
    return true;
  }
}
