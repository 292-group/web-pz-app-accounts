import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './app.constants';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountComponent } from './account/account.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {
    path: APP_ROUTES.ACCOUNTS,
    component: AccountListComponent,
},
{
    path: `${APP_ROUTES.PROFILE}/:id`,
    component: AccountComponent,
},
{
    path: APP_ROUTES.ABOUT_US,
    component: AboutUsComponent
},
{
  path: '**',
  redirectTo: APP_ROUTES.ACCOUNTS
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
