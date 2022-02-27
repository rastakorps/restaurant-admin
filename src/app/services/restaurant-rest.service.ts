import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Saucer } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class RestaurantRestService {

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addSaucer(saucer: Saucer): Observable<any> {
    return this.http.post<Saucer>('http://127.0.0.1:8000/api/saucers', saucer, this.httpHeader)
      .pipe(
        catchError(this.handleError<Saucer>('Add Saucer'))
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
