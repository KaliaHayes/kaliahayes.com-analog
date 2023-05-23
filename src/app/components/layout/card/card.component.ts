import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgForOf, RouterModule, NgIf],
  template: `
    <div
      class="card-container"
      (mouseenter)="toggleHoverState()"
      (mouseleave)="toggleHoverState()"
    >
      <div
        class="card"
        [style.cursor]="'pointer'"
        [style.border-color]="onHover ? content.accentColor : ''"
        [routerLink]="['/' + content.route + '/' + content.slug]"
      >
        <img
          *ngIf="content.route === 'projects'"
          [src]="content.attributes?.imageUrl"
          alt=""
        />
        <h5 class="card-title">
          {{ content.attributes?.name }}
        </h5>
        <p>
          {{ content.attributes?.description }}
        </p>
        <p class="more">
          <a
            [style.color]="content.accentColor"
            [routerLink]="['/' + content.route + '/' + content.slug]"
            routerLinkActive="router-link-active"
          >
            <i class="fa fa-external-link"></i>
            <span>
              {{
                content.route === 'projects' ? 'View Project' : 'Read More'
              }}</span
            >
          </a>
        </p>
      </div>
      <div class="spacer-5"></div>
      <div class="tags" [style.opacity]="onHover ? '1' : '0'">
        <span class="tag" *ngFor="let tag of content.attributes?.tags">
          #{{ tag }}
        </span>
      </div>
      <div class="spacer-40"></div>
    </div>
  `,
  styles: [],
})
export class CardComponent implements OnInit {
  @Input() content: any;

  onHover = false;

  toggleHoverState() {
    this.onHover = !this.onHover;
  }

  ngOnInit(): void {
    // console.log('card-component', this.content);
  }
}
