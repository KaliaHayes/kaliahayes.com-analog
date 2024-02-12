import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgFor, NgIf, DatePipe } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import {
  MarkdownComponent,
  injectContent,
  ContentRenderer,
  injectContentFiles,
} from '@analogjs/content';
import { Location } from '@angular/common';
import { GlobalService } from '../../core/services/global-service.service';
import { BackToTopDirective } from '../../core/directives/back-to-top.directive';
import { ScrollService } from '../../core/services/scroll.service';
import { BehaviorSubject, tap } from 'rxjs';
import { BlogAttributes } from './blog.model';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { ProjectAttributes } from '../projects/projects.model';
import { PostNavigationComponent } from '../../core/layout/post-navigation/post-navigation.component';
import { PostInfoComponent } from '../../core/layout/post-info/post-info.component';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    MarkdownComponent,
    AsyncPipe,
    NgIf,
    NgFor,
    JsonPipe,
    RouterModule,
    DatePipe,
    DatePipe,
    BackToTopDirective,
    PostNavigationComponent,
    PostInfoComponent,
  ],
  template: `
    <div class="toc" *ngIf="toc$ | async">
      <p>Content</p>
      <analog-markdown
        class="toc-md"
        [content]="toc$ | async"
        *ngIf="toc$ | async"
      ></analog-markdown>
      <hr />
      <p backToTop class="backToTop link">Back to Top</p>
    </div>

    <div *ngIf="blog$ | async as blog" class="card blog-post">
      <p (click)="goToBlog()" class="link">← Blog</p>

      <ng-container>
        <h1>{{ blog.attributes.name }}</h1>

        <img
          *ngIf="blog.attributes.imageUrl"
          [src]="blog.attributes.imageUrl"
          alt=""
        />

        <h4>{{ blog.attributes.description }}</h4>

        <p>{{ blog.attributes.published | date : 'MMM d, y' }}</p>
        <hr style="border-color: #232323" />
        <analog-markdown [content]="blog.content"></analog-markdown>
      </ng-container>

      <br />
      <br />

      <app-post-info [post]="blog" />

      <br />
      <br />
      <br />

      <app-post-navigation
        [previousPost]="blogs[index - 1]"
        [nextPost]="blogs[index + 1]"
        [type]="'blog'"
      />
    </div>
  `,
  styles: [
    `
      .blog {
        max-width: 600px;
      }
    `,
  ],
})
export default class BlogPostPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  public readonly router = inject(Router);
  private globalService = inject(GlobalService);
  private scrollService = inject(ScrollService);
  toc$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly blogsFilterFn: InjectContentFilesFilterFunction<ProjectAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/blogs/');
  blogs = injectContentFiles<ProjectAttributes>(this.blogsFilterFn);

  readonly blog$ = injectContent<BlogAttributes>({
    param: 'slug',
    subdirectory: 'blogs',
  });
  index!: number;

  colors: string[] = ['#8FB6F2', '#C490FA', '#F48FDD', '#FEBB8E'];

  ngOnInit(): void {
    this.blogs = this.blogs
      .map((blog, index) => {
        return {
          ...blog,
          accentColor: this.colors[index % this.colors.length],
        };
      })
      .sort((a: any, b: any) => {
        const dateA = new Date(a.attributes.published);
        const dateB = new Date(b.attributes.published);
        return dateB.getTime() - dateA.getTime();
      });

    this.blog$
      .pipe(
        tap((blog) => {
          console.log('blog', blog);

          if (blog.content) {
            const toc = this.globalService.generateTableOfContents(
              blog,
              'blog'
            );
            this.toc$.next(toc);
          }

          this.index = this.blogs.findIndex((b) => b.slug === blog.slug);
        })
      )
      .subscribe();

    console.log('blogs', this.blogs);
  }

  goToBlog() {
    this.router.navigateByUrl('/blog');
  }
}
