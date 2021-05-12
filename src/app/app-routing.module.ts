import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddmomentsComponent } from './components/addmoments/addmoments.component';
import { MomentslistComponent } from './components/momentslist/momentslist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { LoginGuardService } from './services/login-guard.service';


const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: '',
    component: MomentslistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddmomentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
