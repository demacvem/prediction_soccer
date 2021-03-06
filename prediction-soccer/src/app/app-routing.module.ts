import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { StatusComponent } from './components/status/status/status.component';
import { StatusFormComponent } from './components/status/status-form/status-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'status', component: StatusComponent },
      { path: 'status/editor', component: StatusFormComponent },
      { path: 'status/editor/:id', component: StatusFormComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
