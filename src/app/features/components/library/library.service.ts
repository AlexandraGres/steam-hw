import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private db: AngularFireDatabase) { }

   
}
