import { Component, ViewEncapsulation } from '@angular/core';
import { APP_ROUTES } from './app.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

type LinkItem = {
  link: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'accounts-project';
  links: LinkItem[] = [
    {
      link: APP_ROUTES.ACCOUNTS,
      title: 'Accounts'
    },
    {
      link: APP_ROUTES.ABOUT_US,
      title: 'About Us'
    }
  ];
  activeLink: string = APP_ROUTES.ACCOUNTS;
  type = APP_ROUTES;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
    this.router.events.subscribe((event) => {
      const url = location.path();
      switch(true) {
        case url.includes(APP_ROUTES.ACCOUNTS):
          this.activeLink = APP_ROUTES.ACCOUNTS;
          break;
        case url.includes(APP_ROUTES.ABOUT_US):
          this.activeLink = APP_ROUTES.ABOUT_US;
          break;
        default:
          this.activeLink = APP_ROUTES.PROFILE;
          break;
      }
    })
  }
  navigateToSelected(link: LinkItem) {
    this.navigate(link.link as APP_ROUTES);
  }
  navigate(link: APP_ROUTES) {
    this.activeLink = link;
    this.router.navigate([link]);
  }
}
