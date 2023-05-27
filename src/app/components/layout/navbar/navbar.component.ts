import {
  Component,
  Inject,
  Input,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgForOf, RouterModule, RouterOutlet],
  templateUrl: 'navbar.component.html',
  styles: [
    `
      .hamburger {
        display: none;
      }

      .hamburger-btn {
        padding: 24px 30px;
      }

      .nav-wrapper {
        position: fixed;
        width: 100%;
        width: -moz-available;
        width: -webkit-stretch;
        width: -webkit-fill-available;
        width: stretch;
        width: -webkit-stretch;
        z-index: 10000;
        top: 50px;
        display: flex;
        justify-content: center;
      }

      .nav img {
        height: 60px;
        border-radius: 100px;
      }

      .nav-items {
        justify-content: space-around;
        width: 100%;
        width: -moz-available;
        width: -webkit-stretch;
        width: stretch;
        width: -webkit-stretch;
      }

      .nav-items a,
      .mobile-nav-items a {
        color: #fff;
      }

      .nav-items p {
        text-transform: lowercase;
        font-weight: 700;
        font-size: 0.75rem !important;
        cursor: pointer;
      }

      .row-1 {
        align-items: center;
        display: flex;
        /* height: 100%; */
        width: inherit;
        max-width: 600px;
      }

      .mobile-nav-items button:hover {
        border-color: #00000000;
        background-color: #6262625e;
      }
    `,
  ],
})
export class NavbarComponent {
  expanded = signal(false);

  navbarClass = computed(() => {
    return this.expanded() ? 'nav expanded' : 'nav';
  });


  expandNavbar() {
    this.expanded.set(!this.expanded());
  }
}
