import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private db: AngularFireDatabase) { }

  public getFriends(): Observable<User[]> {
    return this.db.list('users').snapshotChanges()
      .pipe(
        map((users: any[]) =>
          users.map(user => ({
            id: user.key, ...user.payload.val()
          })
          )))
  }
}

