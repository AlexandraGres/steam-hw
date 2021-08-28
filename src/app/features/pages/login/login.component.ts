import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../models';
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
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']) {
        this.message = 'Please login'
      } else if (params['authFailed']) {
        this.message = 'Session expired, please login again'
      }
    })

    this.initForm()
  }

  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  public submit() {
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    
    this.auth.login(user).subscribe(() => {
      this.loginForm.reset()
      this.router.navigate(['/'])
    })
  }
}
