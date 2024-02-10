import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="small footer">
      <p class="shimmer">© 2024 Kalia Hayes</p>
      <p>Powered by Analog & Vercel</p>
      <div class="social-icons flex">
        <a href="https://github.com/KaliaHayes" target="_blank">
          <img src="github-svgrepo-com.svg" alt="" />
        </a>
        <a href="https://www.linkedin.com/in/kaliahayes/" target="_blank">
          <img src="linkedin-svgrepo-com.svg" alt="" />
        </a>
        <a href="https://twitter.com/KaliaHayes" target="_blank">
          <img src="twitter-svgrepo-com.svg" alt="" />
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .footer {
        text-align: center;
        max-width: 600px;
        margin: 50px auto;
      }

      .footer p:nth-child(2) {
        color: #b9b9b9;
      }

      .social-icons {
        justify-content: center;
        margin-top: 10px;
      }

      .social-icons img {
        filter: invert(0.4);
        width: 25px;
        margin-left: 10px;
      }

      .social-icons img:hover {
        cursor: pointer;
        filter: invert(1);
        transition: all 0.2s ease-in-out;
      }
    `,
  ],
})
export class FooterComponent implements OnInit {
  router = inject(Router);
  currentUrl?: string;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }
}
