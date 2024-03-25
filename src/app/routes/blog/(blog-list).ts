import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '../../core/layout/card/card.component';
import { NgForOf } from '@angular/common';
import { ProjectAttributes } from '../projects/projects.model';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  template: `
    <div class="spacer-40"></div>
    <app-card
      *ngFor="let blog of blogs; let i = index"
      [index]="i"
      [content]="blog"
    ></app-card>
  `,
  imports: [RouterOutlet, CardComponent, NgForOf],
})
export default class BlogListComponent implements OnInit {
  private readonly blogsFilterFn: InjectContentFilesFilterFunction<ProjectAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/blogs/');

  blogs = injectContentFiles<ProjectAttributes>(this.blogsFilterFn);

  ngOnInit() {
    this.getContentMetadata();
    console.log('this.blogs', this.blogs);
  }

  getContentMetadata() {
    this.blogs = this.blogs
      .map((blog: any, index: number) => {
        return {
          ...blog,
          route: 'blog',
        };
      })
      .sort((a: any, b: any) => {
        const dateA = new Date(a.attributes.published);
        const dateB = new Date(b.attributes.published);
        return dateB.getTime() - dateA.getTime();
      });
  }
}
