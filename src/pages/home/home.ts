import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pizzas: Array<any>;

  constructor(public navCtrl: NavController,
              private http: HttpClient) {
    this.http.get('http://10.13.2.167:8080/pizza').subscribe(
      (res: any) => this.pizzas = res,
      err => console.log(err)
    );
  }

}
