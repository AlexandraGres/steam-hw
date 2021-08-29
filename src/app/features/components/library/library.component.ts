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
  message = ''
  uSub: Subscription
  users: User[] = []

  constructor(
    public authService: AuthService,
    public profileService: ProfileService
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

  getGames() {
    const id = this.authService.currentUserId  
    const user = this.users.find(user => user.uid === id) 
    if(user) {
      if(user.library) {
        this.games = user.library
        return this.games
      }      
    } 
    return   
  }

  download(name: string) {
    this.message = `Do you want to download ${name}?`
    confirm(this.message)  
  }

  share(name: string) {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.value = name
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }

}
