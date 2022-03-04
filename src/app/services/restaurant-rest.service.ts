import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Saucer, Order } from '../interfaces';
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

  getSaucers(): Observable<Saucer[]> {
    return this.http.get<Saucer[]>(`${ apiUrl }saucers`)
      .pipe(
        tap(Saucer => console.log('Saucer fetched!')),
        catchError(this.handleError<Saucer[]>('Get Saucers', []))
      );
  }
  
  /* Orders requests */

  addOrder(order: Order): Observable<any> {
    return this.http.post<Order>(`${ apiUrl }orders`, order, this.httpHeader)
      .pipe(
        catchError(this.handleError<any>('Add Order'))
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
