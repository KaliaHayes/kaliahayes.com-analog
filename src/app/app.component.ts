import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
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
        min-height: calc(100vh - 375px);
      }
    `,
  ],
  imports: [RouterOutlet, RouterModule, NavbarComponent, FooterComponent],
})
export class AppComponent {}
