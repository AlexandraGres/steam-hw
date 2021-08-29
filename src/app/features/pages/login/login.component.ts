import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  message: string

  constructor(
    public auth: AuthService
  ) { }

  public ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  public submit() {
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    this.auth.login(email, password)
  }
}
