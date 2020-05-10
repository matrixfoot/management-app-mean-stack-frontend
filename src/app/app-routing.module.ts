import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PartThreeComponent } from './part-three/part-three.component';
import { PartFourComponent } from './part-four/part-four.component';
import { DefaultComponent } from './default/default.component';

import { LoginComponent } from './part-three/auth/login/login.component';
import { SignupComponent } from './part-three/auth/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { ProjetListComponent } from './projet-list/projet-list.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { ModifyProjectComponent } from './modify-project/modify-project.component';
const routes: Routes = [
  
  { path: 'part-three', component: PartThreeComponent,
    children: [
      
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: '**', redirectTo: 'all-projet' }
    ]
  },
  { path: 'part-four', component: PartFourComponent,
    children: [
     
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: '**', redirectTo: 'all-projet' }
    ]
  },
  { path: 'default', component: DefaultComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'all-projet', component: ProjetListComponent, canActivate: [AuthGuard] },
  { path: 'new-project', component: NewProjectComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: ViewProjectComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: ModifyProjectComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', component: DefaultComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}
