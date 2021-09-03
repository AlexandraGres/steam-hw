import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game, User } from '../../models';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
  games: Game[] = []
  uSub: Subscription
  users: User[] = []

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
    ) { }

  ngOnInit(): void {
    this.uSub = this.profileService.getUsers().subscribe(users => {
      this.users = users  
      this.getGames()   
    })    
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  } 

  getGames(): void {
    const id: string = this.authService.currentUserId  
    const user: User = this.users.find(user => user.uid === id)! 
    if(user && user.library) {
      this.games = user.library  
    }  
  }

  download(name: string): void {
    confirm(`Do you want to download ${name}?`)  
  }

  share(name: string): void {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.value = name
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }

}
