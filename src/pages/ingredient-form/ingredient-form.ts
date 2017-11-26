import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Ingredient } from '../../models/ingredient';
import { Observable } from 'rxjs/Observable';
import { IngredientProvider } from '../../providers/ingredient';
import { AdminPage } from '../admin/admin';

@Component({
  selector   : 'page-ingredient-form',
  templateUrl: 'ingredient-form.html'
})
export class IngredientFormPage {
  ingredient: Ingredient;
  ingredients$: Observable<Ingredient[]>;
  adminPage = AdminPage;

  constructor(private navCtrl: NavController,
              private toastCtrl: ToastController,
              private navParams: NavParams,
              private ingredientProvider: IngredientProvider) {
    this.ingredient = this.navParams.data;

    if (Object.keys(this.ingredient).length === 0
      && this.ingredient.constructor === Object) {
      this.ingredient = {
        name  : '',
        weight: '',
        price : ''
      };
    }

    this.ingredients$ = this.ingredientProvider.getAll();
  }

  onSubmit(): void {
    const ingredient: Ingredient = {
      name  : this.ingredient.name,
      weight: this.ingredient.weight,
      price : this.ingredient.price
    };

    if (this.ingredient._id) {
      this.ingredientProvider.put(this.ingredient._id, ingredient).subscribe(
        (ingredient) => {
          this.navCtrl.push(this.adminPage, { tab: 1 });

          this.toastCtrl.create({
            message : `L'ingredient ${ingredient.name} a été modifié.`,
            duration: 5000,
            position: 'top'
          }).present();
        },
        () => this.toastCtrl.create({
          message : 'Une erreur s\'est produite lors de la modification de l\' ingredient.',
          duration: 5000,
          position: 'top'
        }).present());
    } else {
      this.ingredientProvider.post(ingredient).subscribe(
        (ingredient) => {
          this.navCtrl.push(this.adminPage, { tab: 1 });

          this.toastCtrl.create({
            message : `L'ingredient ${ingredient.name} a été créé.`,
            duration: 5000,
            position: 'top'
          }).present();
        },
        () => this.toastCtrl.create({
          message : 'Une erreur s\'est produite lors de la création de l\' ingredient.',
          duration: 5000,
          position: 'top'
        }).present());
    }
  }
}
