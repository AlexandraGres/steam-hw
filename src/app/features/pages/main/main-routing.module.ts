import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from '../../components/friends/friends.component';
import { GamesComponent } from '../../components/games/games.component';
import { LibraryComponent } from '../../components/library/library.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { AuthGuard } from '../../services/auth.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
    children: [
      {path: '', 
      component: GamesComponent,}
    ],
    canActivate: [AuthGuard],    
  },
  {
    path: 'games',
    component: MainComponent,
    children: [
      {path: '', 
      component: GamesComponent,}
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'library',
    component: MainComponent,
    children: [
      {path: '', 
      component: LibraryComponent,}
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'friends',
    component: MainComponent,
    children: [
      {path: '', 
      component: FriendsComponent,}
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: MainComponent,
    children: [
      {path: '', 
      component: ProfileComponent,}
    ],
    canActivate: [AuthGuard],
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
