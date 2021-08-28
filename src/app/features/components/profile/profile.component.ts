import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../models';
import { FriendsService } from '../friends/friends.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup
  gSub: Subscription
  users: User[] = []
  uId = 'O0xPlgF3pFREWev0oOqdg3RTz2e2'
  user:User
  message = ''

  constructor(
    private profileService: ProfileService,
    private userService: FriendsService
    ) { }

  public ngOnInit(): void {
    this.gSub = this.userService.getFriends().subscribe(users => {
      this.users = users
      this.getUser(this.uId, this.users)       
      this.initForm()     
    })
  }

  private initForm() {
    this.profileForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      age: new FormControl(this.user.age, [Validators.required])
    })
  }

  public submit() {
    const user: User = {
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
      age: this.profileForm.value.age
    } 
    this.profileService.updateUser(this.user.id, user)
    this.message = 'Profile has been updated'
    setTimeout(() => {
      this.message = ''
    }, 2000);
  }

  getUser(id: string, users: User[]): void | User {
    for(let i = 0; i < users.length; i++) {
      if(users[i].uId === id) {
        this.user = users[i]
        return this.user
      } 
    }
  }
}
