import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Pizza } from "../../models/pizza";

/*
  Generated class for the PizzaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PizzaProvider {
  /**
   * Base URL
   *
   * @type {string}
   */
  private readonly url = 'http://localhost:3000/pizzas';

  /**
   * Constructor
   *
   * @param {Http} http
   */
  constructor(public http: Http) {
  }

  /**
   * Get all Pizzas
   *
   * @returns {Observable<Pizza[]>}
   */
  getAll(): Observable<Pizza[]> {
    return this.http.get(this.url).map(res => res.json());
  }

  /**
   * Get the pizza with the given ID
   *
   * @param {number} id
   * @returns {Observable<Pizza>}
   */
  get(id: number): Observable<Pizza> {
    return this.http.get(`${this.url}/${id}`).map(res => res.json());
  }

  /**
   * Save the pizza
   *
   * @param {Pizza} body
   * @returns {Observable<Pizza>}
   */
  post(body: Pizza): Observable<Pizza> {
    return this.http.post(this.url, body).map(res => res.json());
  }

  /**
   * Modify the pizza with the given ID
   *
   * @param {number} id
   * @param {Pizza} body
   * @returns {Observable<Pizza>}
   */
  put(id: number, body: Pizza): Observable<Pizza> {
    return this.http.put(`${this.url}/${id}`, body).map(res => res.json());
  }

  /**
   * Delete the pizza with the given ID
   *
   * @param {number} id
   * @returns {Observable<Pizza>}
   */
  delete(id: number): Observable<Pizza> {
    return this.http.delete(`${this.url}/${id}`).map(res => res.json());
  }
}
