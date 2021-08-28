import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Game } from '../../models';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  public form: FormGroup
  games: Game[] = []
  gSub: Subscription
  search = ''
  tagFilter = ''
  tags: string[]

  constructor(public gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.gSub = this.gamesService.getGames().subscribe(games => {
      this.games = games
      this.getTags(this.games)      
    })
    this.initForm()
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe()
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
      console.log(this.tagFilter);
      return
    }
    this.tagFilter = this.tagFilter.replace(event.target.value, '')
    console.log(this.tagFilter);
  }

  getTags(games: any) {
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
    game.library = true
    this.gamesService.addToLibrary(game.id, game)    
  }
}
