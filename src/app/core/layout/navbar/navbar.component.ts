import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { createLogger } from 'vite';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgForOf, RouterModule, RouterOutlet],
  template: `<div class="nav-wrapper">
    <div [ngClass]="navbarClass()">
      <div class="desktop-nav-items">
        <div class="img-container">
          <a
            aria-label="Home"
            routerLink="/"
            routerLinkActive="router-link-active"
          >
            <img src="/imgs/Memoji-Smol.png" alt="Kalia Hayes's Memoji'" />
          </a>
        </div>

        <div class="flex nav-items">
          <!-- <a [routerLink]="['/about']" routerLinkActive="router-link-active">
                  <button type="button">
                      <p title="About">About</p>
                  </button>
              </a> -->
          <a [routerLink]="['/projects']" routerLinkActive="router-link-active">
            <button type="button">
              <p title="Projects">Projects</p>
            </button>
          </a>
          <a [routerLink]="['/blog']" routerLinkActive="router-link-active">
            <button type="button">
              <p title="Blog">Blog</p>
            </button>
          </a>
          <a [routerLink]="['/uses']" routerLinkActive="router-link-active">
            <button type="button">
              <p title="Fun Stuff">Uses</p>
            </button>
          </a>
          <!-- <a [routerLink]="['/funstuff']" routerLinkActive="router-link-active">
          <button type="button">
            <p title="Fun Stuff">Fun Stuff</p>
          </button>
        </a> -->
          <a
            [routerLink]="['/']"
            fragment="contact"
            routerLinkActive="router-link-active"
          >
            <button type="button">
              <p title="Contact">Contact</p>
            </button>
          </a>
        </div>
        <div class="hamburger">
          <button class="hamburger-btn" type="button" (click)="expandNavbar()">
            <p>☰</p>
          </button>
        </div>
      </div>

      <div *ngIf="this.expanded()" class="mobile-nav-items">
        <a [routerLink]="['/projects']" routerLinkActive="router-link-active">
          <button type="button">
            <p title="Projects">Projects</p>
          </button>
        </a>
        <a [routerLink]="['/funstuff']" routerLinkActive="router-link-active">
          <button type="button">
            <p title="Fun Stuff">Fun Stuff</p>
          </button>
        </a>
        <a [routerLink]="['/blog']" routerLinkActive="router-link-active">
          <button type="button">
            <p title="Blog">Blog</p>
          </button>
        </a>
        <a
          [routerLink]="['/']"
          fragment="contact"
          routerLinkActive="router-link-active"
        >
          <button type="button">
            <p title="Contact">Contact</p>
          </button>
        </a>
      </div>
    </div>
  </div> `,
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

      .desktop-nav-items {
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
export class NavbarComponent implements OnInit {
  router = inject(Router);
  expanded = signal(false);

  navbarClass = computed(() => {
    return this.expanded() ? 'nav expanded' : 'nav';
  });

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.expanded.set(false);
        // if (typeof window !== 'undefined')
        //   if (this.router.url !== '/#contact') window.scrollTo(0, 0);
      }
    });
  }

  expandNavbar() {
    this.expanded.set(!this.expanded());
  }
}
