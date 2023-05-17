import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgForOf, RouterModule],
  template: `
    <div class="nav-wrapper">
      <div class="nav">
        <div class="img-container">
          <a
            aria-label="Home"
            routerLink="/"
            routerLinkActive="router-link-active"
          >
            <img src="/imgs/Memoji.png" alt="Kalia Hayes's Memoji'" />
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
          <a [routerLink]="['/contact']" routerLinkActive="router-link-active">
            <button type="button">
              <p title="Contact">Contact</p>
            </button>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.nav {
      height: 80px;
      color: #fff;
      display: flex;
      border-radius: 20px;
      max-width: 600px;
      align-items: center;
      width: inherit;
      border: 1px solid #151515;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(1px);
    }
    
    .nav-wrapper {
      position: fixed;
      width: -webkit-fill-available;
      z-index: 10000;
      top: 100px;
      display: flex;
      justify-content: center;
    }
    
    .nav img {
      height: 60px;
      border-radius: 100px;
    }
    
    .img-container {
      height: 100%;
      padding: 10px 15px;
      border-right: 1px solid #151515;
      width: 105px;
    }
    
    .nav-items {
      justify-content: space-around;
      width: -webkit-fill-available;
    }

    .nav-items a {
      color: #fff;
    }
    
    .nav-items p {
      text-transform: lowercase;
      font-weight: 700;
      font-size: 0.75rem !important;
      cursor: pointer;
    }
    `
  ],
})
export class NavbarComponent {}
