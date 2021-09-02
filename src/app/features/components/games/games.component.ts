import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Game, User } from '../../models';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../profile/profile.service';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  public form: FormGroup
  games: Game[] = []
  users: User[] = []
  gSub: Subscription
  uSub: Subscription
  search = ''
  price = ''
  tagFilter = ''
  tags: string[]
  maxPrice: number

  constructor(
    public gamesService: GamesService,
    public authService: AuthService,
    public profileService: ProfileService
    ) {
  }

  ngOnInit(): void {
    this.gSub = this.gamesService.getGames().subscribe(games => {
      this.games = games
      this.getTags(this.games) 
      this.getMaxPrice(this.games)     
    })
    this.uSub = this.profileService.getUsers().subscribe(users => {
      this.users = users     
    })
    this.initForm()
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe()
    }
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  private initForm() {
    this.form = new FormGroup({
      checkbox: new FormControl(),
    })
  }

  changeFilter(event: any) {
    if (event.target.checked) {
      this.tagFilter = event.target.value
      return
    }
    this.tagFilter = this.tagFilter.replace(event.target.value, '')
  }

  getMaxPrice(games: Game[]) {
    let maxPrice = Math.max(...games.map(o => +o.price))
    this.maxPrice = maxPrice    
  }

  getTags(games: Game[]) {
    let tags: any = []
    for (let game of games) {
      let arr = (game.tag as any).replace(/[^a-zA-Z, ]/g, '').split(', ')
      tags = tags.concat(arr)
    }
    const set = new Set(tags)
    tags = [...set]
    this.tags = tags
    return this.tags
  }

  addToLibrary(game: Game) {
    const id = this.authService.currentUserId  
    const user = this.users.find(user => user.uid === id) 
    if(user) {
      if(!user.library) {
        user.library = []
      }
      user.library.push(game)  
      this.profileService.updateUser(user.id, user)
    }       
  }
}
