import { BlogAttributes } from './routes/blog/blog.model';
import { Component, OnInit, signal } from '@angular/core';
import {
  RouterOutlet,
  RouterModule,
  Router,
  NavigationEnd,
} from '@angular/router';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <!-- <div class="blob"></div> -->
    <app-navbar></app-navbar>

    <div class="router-outlet">
      <router-outlet></router-outlet>
    </div>

    <app-footer></app-footer>
  `,
  styles: [
    `
      :host {
        max-width: 600px;
        margin: 0 auto;
      }

      .router-outlet {
        top: 150px;
        position: relative;
        display: flex;
        justify-content: center;
        margin-bottom: 300px;
        min-height: calc(100vh - 420px);
      }

      .blob {
        max-width: 1000px;
        margin: 0 auto;
        width: -webkit-fill-available;
        height: 200px;
        border-radius: 25rem;
        background: radial-gradient(
            63.44% 82.03% at 55.58% -15.63%,
            #5adde6 0%,
            rgba(90, 221, 230, 0.26) 53.72%,
            rgba(90, 221, 230, 0) 100%
          ),
          linear-gradient(
            26.62deg,
            rgba(249, 124, 89, 0.8) 20.64%,
            rgba(249, 124, 89, 0) 49.82%
          ),
          linear-gradient(
            56.79deg,
            #b95be6 33.79%,
            rgba(185, 91, 230, 0) 72.67%
          ),
          linear-gradient(
            301.08deg,
            rgba(252, 178, 91, 0.91) 20.42%,
            rgba(252, 178, 91, 0) 60.38%
          ),
          linear-gradient(
            141.57deg,
            rgba(78, 173, 235, 0.85) 19.08%,
            rgba(78, 173, 235, 0) 98.72%,
            #d3e4ff
          );
        background-blend-mode: normal, normal, darken, normal, normal, normal;
        filter: blur(77px);
        opacity: 0.25;
        position: absolute;
        margin-left: 25vw;
        top: -50px;
      }
    `,
  ],
  imports: [RouterOutlet, RouterModule, NavbarComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
