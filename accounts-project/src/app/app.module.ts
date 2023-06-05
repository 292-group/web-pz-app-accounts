import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountComponent } from './account/account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AccountDialogueComponent } from './account-dialogue/account-dialogue.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent,
    AccountComponent,
    AboutUsComponent,
    AccountDialogueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
