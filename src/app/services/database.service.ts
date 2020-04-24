import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  addProduct(product) {
    let headers = new HttpHeaders().append("Content-Type", "application/json");
    return this.http
      .post("https://trashit.azurewebsites.net/api/object/add", product, {
        headers: headers,
      });
      
  }

  getBasketByLocation(location) {
    let url = `https://trashit.azurewebsites.net/api/basket/getByLocation?Location=${location}`;
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(url, {headers: headers});
  }

  getProductTypeByBarcode(barcode) {
    let url = `https://trashit.azurewebsites.net/api/object/getByBarcode?Barcode=${barcode}`;
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(url, {headers: headers});
  }

}
