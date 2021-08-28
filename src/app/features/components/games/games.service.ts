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

  // public getGames(): Observable<Game[]> {
  //   return this.db.list('games').valueChanges()    
  //     .pipe(map((res: {[key: string]: any}) => {
  //       return Object
  //         .keys(res)
  //         .map(key => ({
  //           ...res[key],
  //           id: key,
  //           tag: res[key].tag,
  //           library: res[key].library
  //         }))
  //     }))
  // }

  public getGames(): Observable<Game[]> {
    return this.db.list('games').snapshotChanges()
      .pipe(
        map((games: any[]) => 
          games.map(game => ({
            id: game.key, ...game.payload.val() 
          })
          )))
  }

  addToLibrary(key: any, value: Game) {
    return this.db.list('games').update(key, value)
  }
}
