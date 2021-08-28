import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../../models';
import { GamesService } from '../games/games.service';
import { LibraryService } from './library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
  games: Game[] = []
  myGames: Game[] = []
  gSub: Subscription
  message = ''

  constructor(
    public libService: LibraryService,
    public gamesService: GamesService
    ) { }

  ngOnInit(): void {
    this.gSub = this.gamesService.getGames().subscribe(games => {
      this.games = games
      this.filterGames(this.games)
    })
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe()
    }
  } 

  filterGames(games: Game[]): void | Game[] {
    for(let i = 0; i < games.length; i++) {
      if(games[i].library === true) {
        this.myGames.push(games[i])
      } 
    }
    return this.myGames
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
