import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  autoAuthenticate(logindetails): Observable<any> {
    return this.httpClient.post(environment.endpoint_url+'/api/autoAuthenticate',logindetails, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  authenticateEmployee(logindetails): Observable<any> {
    return this.httpClient.post(environment.endpoint_url+'/api/authenticateEmployee',logindetails, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  setNewPassword(passwordDetails): Observable<any> {
    return this.httpClient.post(environment.endpoint_url+'/api/setNewPassword',passwordDetails, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
