import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="navigation">
      <p *ngIf="previousPost; else blank">
        <span
          [ngStyle]="{
            color: previousPostHover ? previousPost.accentColor : '',
            fontStyle: previousPostHover ? 'italic' : 'normal'
          }"
          (mouseenter)="previousPostHover = true"
          (mouseleave)="previousPostHover = false"
          class="link"
          (click)="navigateToPost(previousPost.slug)"
        >
          ← {{ previousPost.attributes.name || '' }}
        </span>
      </p>
      <ng-template #blank> <p></p> </ng-template>

      <p *ngIf="nextPost">
        <span
          [ngStyle]="{
            color: nextPostHover ? nextPost.accentColor : '',
            fontStyle: nextPostHover ? 'italic' : 'normal'
          }"
          (mouseenter)="nextPostHover = true"
          (mouseleave)="nextPostHover = false"
          class="next-project link"
          (click)="navigateToPost(nextPost.slug)"
        >
          {{ nextPost.attributes.name }}
        </span>
      </p>
    </div>
  `,
})
export class PostNavigationComponent {
  public readonly router = inject(Router);

  @Input() previousPost: any;
  @Input() nextPost: any;
  @Input()
  type!: string;
  previousPostHover: boolean = false;
  nextPostHover: boolean = false;

  navigateToPost(slug: string) {
    this.router.navigate([this.type, slug]);
  }
}
