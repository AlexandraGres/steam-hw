import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy {

  friends: string[] = []
  uniqUsers: User[] = []
  search: string = ''
  private users: User[] = []
  private gSub: Subscription
  private currentUser: User

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
    this.gSub = this.profileService.getUsers().subscribe(users => {
      this.users = users
      this.getCurrentUser()
      this.getFriends()
      this.getUniqUsers()
    })
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe()
    }
  }

  getCurrentUser(): void {
    const id: string = this.authService.currentUserId
    this.currentUser = this.users.find(user => user.uid === id)!
  }

  getFriends(): void {
    if (this.currentUser && this.currentUser.friends) {
      this.friends = this.currentUser.friends
    }
  }

  addFriend(friend: string): void {
    if (!this.currentUser.friends) {
      this.currentUser.friends = []
    }
    this.currentUser.friends.push(friend)
    this.profileService.updateUser(this.currentUser.id!, this.currentUser)
  }

  getUniqUsers(): void{
    this.uniqUsers = this.users.filter(item => !this.friends.includes(String(item.username)) 
    && item.username !== this.currentUser.username)
  }
}
