import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MarkdownComponent, injectContent } from '@analogjs/content';
import { BlogAttributes } from './blog.model';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf, JsonPipe],
  template: `
    <div *ngIf="blogs$ | async as blog" class="card blog long-form">
      <ng-container>
        <h1>{{ blog.attributes.name }}</h1>
        <hr />
        <analog-markdown [content]="blog.content"></analog-markdown>
      </ng-container>
    </div>
  `,
})
export default class BlogPostPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly routId$ = this.route.paramMap.pipe(
    map((params) => params.get('productId'))
  );
  readonly blogs$ = injectContent<BlogAttributes>({
    param: 'slug',
    subdirectory: 'blogs',
  });

  ngOnInit(): void {
    this.blogs$.subscribe((blog) => {
      console.log('blog', blog);
    });
  }
}
