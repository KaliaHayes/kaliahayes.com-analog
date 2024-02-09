import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor(private router: Router) {
    this.router.onSameUrlNavigation = 'reload';
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (!this.router.url.includes('#')) {
          this.scrollToTop();
        }

        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          this.scrollToElement(tree.fragment);
        }
      });
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  scrollToElement(fragment: string, delay = 300) {
    setTimeout(() => {
      const element = document.querySelector('#' + fragment);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    }, delay);
  }
}
