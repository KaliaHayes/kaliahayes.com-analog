import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[backToTop]',
  standalone: true,
})
export class BackToTopDirective {
  @HostListener('click')
  onClick() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
