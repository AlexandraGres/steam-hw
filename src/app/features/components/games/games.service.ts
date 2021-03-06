import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Game } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private db: AngularFireDatabase) {
  }

  getGames(): Observable<Game[]> {
    return this.db.list('games').snapshotChanges()
      .pipe(
        map((games: any[]) => 
          games.map(game => ({
            id: game.key, ...game.payload.val() 
          })
          )))
  }

  addToLibrary(key: string, value: Game) {
    return this.db.list('games').update(key, value)
  }
}
