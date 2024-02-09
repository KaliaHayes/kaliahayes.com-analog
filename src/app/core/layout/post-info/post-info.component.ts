import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="post-info">
      <p class="published" *ngIf="post.attributes.published">
        Originally published
        {{ post.attributes.published | date : 'MMM d, y' }}
      </p>
      <div class="share">
        <span>share: </span>
        <a
          href="https://twitter.com/intent/tweet?url=https://kaliahayes.com{{
            router.url
          }}&text=Check%20this%20out!"
          target="_blank"
          >twitter</a
        >
        <a
          href="https://www.linkedin.com/shareArticle?mini=true&url=https://kaliahayes.com{{
            router.url
          }}"
          target="_blank"
          >linkedin</a
        >
      </div>
    </div>

    <hr style="border-color: #232323" />

    <div class="tags" style="text-align: left">
      <span class="tag" *ngFor="let tag of post.attributes?.tags">
        #{{ tag | lowercase }}
      </span>
    </div>
  `,
})
export class PostInfoComponent {
  @Input() post!: any;
  router = inject(Router);
}
