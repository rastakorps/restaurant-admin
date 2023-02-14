import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Saucer, Order, SingleOrder } from '../interfaces';
import { environment } from '../../environments/environment.prod';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RestaurantRestService {

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /* Saucers requests */

  addSaucer(saucer: Saucer): Observable<any> {
    return this.http.post<Saucer>(`${ apiUrl }saucers`, saucer, this.httpHeader)
      .pipe(
        catchError(this.handleError<Saucer>('Add Saucer'))
      );
  }

  addImage(data: any): Observable<any> {
    return this.http.post<any>(`${ apiUrl }saucers/images`, data, this.httpHeader)
      .pipe(
        catchError(this.handleError<Saucer>('Add Saucer Image'))
      );
  }

  getSaucers(): Observable<Saucer[]> {
    return this.http.get<Saucer[]>(`${ apiUrl }saucers`)
      .pipe(
        tap(Saucer => console.log('Saucer fetched!')),
        catchError(this.handleError<Saucer[]>('Get Saucers', []))
      );
  }

  deleteSaucer(id): Observable<any> {    
    return this.http.delete<any>(`${ apiUrl }saucers/${id}`, this.httpHeader)
      .pipe(
        tap(_ => console.log(`Saucer deleted: ${id}`)),
        catchError(this.handleError<any>('Delete saucer'))
      );
  }
  
  /* Orders requests */

  addOrder(order: Order): Observable<any> {
    return this.http.post<Order>(`${ apiUrl }orders`, order, this.httpHeader)
      .pipe(
        catchError(this.handleError<any>('Add Order'))
      );
  }

  getOrder(id): Observable<Order> {
    return this.http.get<any>(`${ apiUrl }orders/${id}`)
      .pipe(
        tap(_ => console.log(`Order fetched: ${id}`)),
        catchError(this.handleError<Order>(`Get order id=${id}`))
      );
  }

  getOrders(): Observable<SingleOrder[]> {
    return this.http.get<SingleOrder[]>(`${ apiUrl }orders`)
      .pipe(
        tap(Order => console.log('Orders fetched!')),
        catchError(this.handleError<SingleOrder[]>('Get Orders', []))
      );
  }

  deleteOrder(id): Observable<any> {    
    return this.http.delete<any>(`${ apiUrl }orders/${id}`, this.httpHeader)
      .pipe(
        tap(_ => console.log(`Order deleted: ${id}`)),
        catchError(this.handleError<any>('Delete order'))
      );
  }

  updateOrder(id, data: any): Observable<any> {
    data._method = 'put';
    return this.http.post(`${ apiUrl }orders/${id}`, data, this.httpHeader)
      .pipe(
        tap(_ => console.log(`order updated: ${id}`)),
        catchError(this.handleError<any[]>('Update task'))
      );
  }

  finishOrder(id): Observable<any> {
    return this.http.put(`${ apiUrl }orders/finish-order/${id}`, this.httpHeader)
      .pipe(
        tap(_ => console.log(`order finished: ${id}`)),
        catchError(this.handleError<any[]>('Update task'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
