import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, CreateOrder } from '../models/order';
import { BASE_API_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = '/order/all';
  private baseUrlCreate = '/order/create';
  private UrlFindByCustomerId = '/order/customer-id/';
  private baseUrlItem = '/inventory/all';


  constructor(private http: HttpClient) { }

  createOrder(createOrder:CreateOrder) : void {

    const headerInfo = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '.concat(localStorage.getItem('swagjwt'))
    };

    const requestOptions = {
      headers: new HttpHeaders(headerInfo)
    };
    console.log(localStorage.getItem('swagjwt'));
    let create = this.http.post<Order>(BASE_API_URL.concat(this.baseUrlCreate), createOrder, requestOptions);
    create.subscribe();
  }

  getOrders(pageSize:number = 25, pageNumber:number = 0):Promise<any>{

    const headerInfo = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '.concat(localStorage.getItem('swagjwt'))
    };

    const requestOptions = {
      headers: new HttpHeaders(headerInfo)
    };

    return this.http.get<any>(BASE_API_URL.concat(`/order/all?offset=${pageSize}&page=${pageNumber}`), requestOptions).toPromise();
  }

  // getCustomers(): Promise<any> {

  //   const headerInfo = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '.concat(localStorage.getItem('swagjwt'))
  //   };

  //   const requestOptions = {
  //     headers: new HttpHeaders(headerInfo)
  //   };

  //   return this.http.get<Customer[]>(BASE_API_URL.concat(this.baseUrl), requestOptions).toPromise();
  // }

  // getOrdersByCustomerService(customerId:number):Promise<any> {
  //   const headerInfo = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '.concat(localStorage.getItem('swagjwt'))
  //   };

  //   const requestOptions = {
  //     headers: new HttpHeaders(headerInfo)
  //   };

  //   return this.http.get<Order[]>(BASE_API_URL.concat(this.UrlFindByCustomerId)+customerId, requestOptions).toPromise();
  // }
}




