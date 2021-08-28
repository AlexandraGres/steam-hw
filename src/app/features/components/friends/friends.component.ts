import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models';
import { FriendsService } from './friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy {

  users: User[] = []
  gSub: Subscription
  search = ''
  
  constructor(public friendsService: FriendsService) {
  }
  
  ngOnInit(): void {
    this.gSub = this.friendsService.getFriends().subscribe(users => {
      this.users = users
      console.log(this.users);
            
    })  
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe()
    }
  }
}
