import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authState: any = null;
  error: string

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.angularFireAuth.authState.subscribe(authState => {
      this.authState = authState
    })
  }

  get isAuthenticated(): boolean {
    return !!this.authState;
  }

  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }

  signUp(email: string, password: string): void {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are Successfully signed up!', res)
      })
      .catch(error => {
        this.handleError(error.message)
        console.log('Something is wrong:', error.message)
      })
  }

  login(email: string, password: string): void {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are Successfully logged in!')
        this.router.navigate(['/games'])
      })
      .catch(err => {
        this.handleError(err.message)
        console.log('Something went wrong:', err.message);
      })
  }

  logout(): void {
    this.angularFireAuth.signOut()
  }

  handleError(error: string): string {
    this.error = error
    return this.error
  }
}