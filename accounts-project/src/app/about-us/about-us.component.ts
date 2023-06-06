import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../app.constants';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  constructor(private router: Router, private el: ElementRef) {}
  onClick($event: MouseEvent, link: string) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    this.router.navigate([APP_ROUTES.ABOUT_US], {fragment: link});
    const element = this.el.nativeElement.querySelector('#' + link);
    if(element) {
      element.scrollIntoView({block: 'start',  behavior: 'smooth', inline: 'nearest'});
    }
  }
}
