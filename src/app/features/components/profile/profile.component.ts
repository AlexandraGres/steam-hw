import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../models';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup
  gSub: Subscription
  users: User[] = []
  user: User
  message: string = ''

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.gSub = this.profileService.getUsers().subscribe(users => {
      this.users = users
      this.getUser()
      this.initForm()
    })
  }

  private initForm() {
    const {username, email, age} = this.user
    this.profileForm = new FormGroup({
      username: new FormControl(username, [Validators.required]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      age: new FormControl(age, [Validators.required])
    })
  }

  public submit(): void {
    this.profileService.updateUser(this.user.id!, this.profileForm.value)
    this.message = 'Profile has been updated'
    setTimeout(() => {
      this.message = ''
    }, 2000);
  }

  getUser(): void {
    const id: string = this.authService.currentUserId
    this.user = this.users.find(user => user.uid === id)!
  }
}
