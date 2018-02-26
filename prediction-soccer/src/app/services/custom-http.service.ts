import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class CustomHttpService {

  private apiUrl = 'api';

  constructor(private http: HttpClient) { }

  get(url: string, options?: {}): Observable<any> {
    return this.http.get(`${this.apiUrl}/${url}`, this.optionsArgs(options))
      .pipe(
        tap(_ => console.log(`Listando datos de la url ${url}`)),
        catchError(this.handleError)
      );
  }

  post(url: string, body: any, options?: {}): Observable<any> {
    return this.http.post(`${this.apiUrl}/${url}`, body, this.optionsArgs(options))
      .pipe(
        tap(_ => console.log(`Agregando el registro ${body}`)),
        catchError(this.handleError)
      );
  }

  put(url: string, body: any, options?: {}): Observable<any> {
    return this.http.put(`${this.apiUrl}/${url}`, body, this.optionsArgs(options)).pipe(
      tap(_ => console.log(`Actualizando el registro ${body}`)),
      catchError(this.handleError)
    );
  }

  delete(url: string, options?: {}): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${url}`, this.optionsArgs(options)).pipe(
      tap(_ => console.log(`Eliminando el registro de la url ${url}`)),
      catchError(this.handleError)
    );
  }

  private optionsArgs(opts?: any): any {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const responseType = 'json';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.access_token) {
      httpHeaders.set('Authorization', 'Bearer ' + currentUser.access_token);
    }

    const options = {
      headers: httpHeaders,
      responseType: responseType
    };

    return options;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }
}
