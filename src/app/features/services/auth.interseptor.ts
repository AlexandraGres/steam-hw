import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterseptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token as string
        }
      })
    }
    return next.handle(req)
      .pipe(
        tap(() => {
          console.log('Intercept')
          
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('[Interceptor Error]: ', error)
          if(error.status === 401) {
            this.auth.logout()
            this.router.navigate(['/login'], {
              queryParams: {
                authFailed: true
              }
            })
          }          
          return throwError(error)
        })
      )
  }
}
