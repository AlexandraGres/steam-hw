import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from '../../components/friends/friends.component';
import { GamesComponent } from '../../components/games/games.component';
import { LibraryComponent } from '../../components/library/library.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { MainComponent } from './main.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorized = () => redirectUnauthorizedTo(['/login']);


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
    children: [
      {path: '', 
      component: GamesComponent,}
    ],
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorized}    
  },
  {
    path: 'games',
    component: MainComponent,
    children: [
      {path: '', 
      component: GamesComponent,}
    ],
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorized} 
  },
  {
    path: 'library',
    component: MainComponent,
    children: [
      {path: '', 
      component: LibraryComponent,}
    ],
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorized} 
  },
  {
    path: 'friends',
    component: MainComponent,
    children: [
      {path: '', 
      component: FriendsComponent,}
    ],
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorized} 
  },
  {
    path: 'profile',
    component: MainComponent,
    children: [
      {path: '', 
      component: ProfileComponent,}
    ],
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorized} 
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
