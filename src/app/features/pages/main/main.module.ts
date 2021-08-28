import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { FriendsComponent } from '../../components/friends/friends.component';
import { GamesComponent } from '../../components/games/games.component';
import { LibraryComponent } from '../../components/library/library.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { MainRoutingModule } from './main-routing.module';
import { searchFilter } from '../../pipes/searchFilter.pipe';
import { tagFilter } from '../../pipes/tagFilter.pipe';


@NgModule({
  declarations: [
    MainComponent,
    FriendsComponent,
    GamesComponent,
    LibraryComponent,
    ProfileComponent,
    searchFilter,
    tagFilter
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
