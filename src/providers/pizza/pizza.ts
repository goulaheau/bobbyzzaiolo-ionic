import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the PizzaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PizzaProvider {

  private readonly url = 'http://10.13.2.167:8080/pizza';

  constructor(public http: Http) {
  }

  get(): Observable<Response> {
    return this.http.get(this.url).map(res => res.json());
  }

}
