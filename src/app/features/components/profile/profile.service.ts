import { Injectable } from '@angular/core';
import { User } from '../../models';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  updateUser(key: any, value: User) {
    return this.db.list('users').update(key, value)
  }

  public getUsers(): Observable<User[]> {
    return this.db.list('users').snapshotChanges()
      .pipe(
        map((users: any[]) =>
          users.map(user => ({
            id: user.key, ...user.payload.val()
          })
          )))
  }  
}
