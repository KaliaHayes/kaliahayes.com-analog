import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '../../components/layout/card/card.component';
import { NgForOf } from '@angular/common';
import { ProjectAttributes } from '../projects/projects.model';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  template: `
    <div class="card">Blog Li$$$t</div>
    <div class="spacer-40"></div>
    <app-card *ngFor="let blog of blogs" [content]="blog"></app-card>
  `,
  imports: [RouterOutlet, CardComponent, NgForOf],
})
export default class BlogListComponent implements OnInit {
  colors: string[] = ['#F48FDD', '#8FB6F2', '#C490FA', '#FEBB8E'];

  private readonly blogsFilterFn: InjectContentFilesFilterFunction<ProjectAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/blogs/');

  blogs = injectContentFiles<ProjectAttributes>(this.blogsFilterFn);

  ngOnInit() {
    this.getContentMetadata();
    console.log(this.blogs);
  }

  getContentMetadata() {
    this.blogs = this.blogs.map((blog: any, index: number) => {
      return {
        ...blog,
        accentColor: this.colors[index % this.colors.length],
        route: 'blog'
      };
    });
  }
}
