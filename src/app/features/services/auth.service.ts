import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from "../models";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public error$: Subject<string> = new Subject<string>()
  constructor(private http: HttpClient) { }

  get token(): string | null {
    const lsExpDate = localStorage.getItem('fb-token-exp')
    if (lsExpDate) {
      const expDate = new Date(lsExpDate)
      if (new Date() > expDate) {
        this.logout()
        return null
      }
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
            
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email or password')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid email or password')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('User not found')
        break
    }
    return throwError(error)
  }

  private setToken(response: any) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}