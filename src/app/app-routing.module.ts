import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/pages/login/login.component';
import { AuthGuard } from './features/services/auth.guard';
import { MainComponent } from './features/pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/pages/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }