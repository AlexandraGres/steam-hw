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

  form: FormGroup
  games: Game[] = []
  search = ''
  price = ''
  tagFilter = ''
  tags: string[]
  maxPrice: number
  private users: User[] = []
  private gSub: Subscription[] = []

  constructor(
    private gamesService: GamesService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
    this.gSub.push(
      this.gamesService.getGames().subscribe(games => {
        this.games = games
        this.getTags(this.games)
        this.getMaxPrice(this.games)
      })
    )

    this.gSub.push(
      this.profileService.getUsers().subscribe(users => {
        this.users = users
      })
    )

    this.initForm()
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.forEach(sub => sub.unsubscribe())
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      checkbox: new FormControl(),
    })
  }

  changeFilter(event: any): void {
    if (event.target.checked) {
      this.tagFilter = event.target.value
    } else {
      this.tagFilter = this.tagFilter.replace(event.target.value, '')
    }
  }

  getMaxPrice(games: Game[]): void {
    let maxPrice = Math.max(...games.map(o => +o.price))
    this.maxPrice = maxPrice
  }

  getTags(games: Game[]): void {
    let tags: string[] = []
    for (let game of games) {
      const arr = (game.tag as any).replace(/[^a-zA-Z, -]/g, '').split(', ')
      tags = tags.concat(arr)
    }
    const set = new Set(tags)
    tags = [...set]
    this.tags = tags
  }

  addToLibrary(game: Game): void {
    const id: string = this.authService.currentUserId
    const user: User = this.users.find(user => user.uid === id)!
    if (!user.library) {
      user.library = []
      user.library.push(game)
      this.profileService.updateUser(user.id!, user)
    }
    if (user.library.every(g => g.id !== game.id)) {
      user.library.push(game)
      this.profileService.updateUser(user.id!, user)
    }
  }
}
