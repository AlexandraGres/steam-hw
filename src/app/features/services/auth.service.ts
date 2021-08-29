import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authState: any = null;
  public error: string

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.angularFireAuth.authState.subscribe(authState => {
      this.authState = authState
    })
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  public get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }

  signUp(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are Successfully signed up!', res)
      })
      .catch(error => {
        this.handleError(error.message)
        console.log('Something is wrong:', error.message)
      })
  }

  login(email: string, password: string) {
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

  logout() {
    this.angularFireAuth.signOut()
  }

  private handleError(error: string) {
    this.error = error
    return this.error
  }
}