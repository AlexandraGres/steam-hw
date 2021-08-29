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

  users: User[] = []
  friends: User[] = []
  gSub: Subscription
  search = ''
    
  constructor(
    public authService: AuthService,
    public profileService: ProfileService
    ) {
  }
  
  ngOnInit(): void {
    this.gSub = this.profileService.getUsers().subscribe(users => {
      this.users = users      
      this.getFriends()      
    })  
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe()
    }
  }

  getFriends() {
    const id = this.authService.currentUserId  
    const user = this.users.find(user => user.uid === id) 
    if(user) {
      if(user.friends) {
        this.friends = user.friends
        return this.friends
      }      
    } 
    return   
  }

  addFriend(friend: string) {
    const id = this.authService.currentUserId  
    const user: any = this.users.find(user => user.uid === id)        
    if(user) {
      if(!user.friends) {
        user.friends = []
      }
      user.friends.push(friend)
      this.profileService.updateUser(user.id, user)
    }
  }
}
