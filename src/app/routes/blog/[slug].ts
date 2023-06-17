import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router'; // import RouterModule
import { map } from 'rxjs';
import {
  ContentRenderer,
  MarkdownComponent,
  injectContent,
} from '@analogjs/content';
import { BlogAttributes } from './blog.model';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf, JsonPipe, RouterModule], // add RouterModule to imports
  template: `
    <div *ngIf="blogs$ | async as blog" class="blog long-form">
      <p>← Home</p>
      <p>
        <a
          [routerLink]="['/blog/markdown-cheatsheet']"
          fragment="blockquotes"
          routerLinkActive="router-link-active"
          >Go To Blockquotes</a
        >
      </p>
      <!-- <p (click)="log()">log content or doc or something</p> -->

      <ng-container>
        <h1>{{ blog.attributes.name }}</h1>
        <hr />
        <analog-markdown [content]="blog.content"></analog-markdown>
      </ng-container>
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
export default class BlogPostPageComponent implements OnInit, AfterViewInit {
  private readonly route = inject(ActivatedRoute);

  readonly routId$ = this.route.paramMap.pipe(
    map((params) => params.get('productId'))
  );
  readonly blogs$ = injectContent<BlogAttributes>({
    param: 'slug',
    subdirectory: 'blogs',
  });

  private router = inject(Router);

  ngOnInit(): void {
    this.blogs$.subscribe((blog) => {
      console.log('blog', blog);
      // console.log(blog.content);
    });

    // get all unique ids from document
    const ids = Array.from(document.querySelectorAll('[id]')).map(
      (el) => el.id
    );
    // console.log('ids', ids);
  }

  ngAfterViewInit(): void {
    // this.router.onSameUrlNavigation = 'reload';
    this.router.events.subscribe((s) => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          setTimeout(() => {
            const element = document.querySelector('#' + tree.fragment);
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest',
              });
            }
          }, 300);
        }
      }
    });
  }

  //   // get all unique ids from document
  //   const ids = Array.from(document.querySelectorAll('[id]')).map(
  //     (el) => el.id
  //   );
  //   // console.log('ids', ids);
  // }

  // log() {
  //   const blogs = document.getElementsByClassName('blog');
  //   const ids = Array.from(blogs).flatMap((blog) =>
  //     Array.from(blog.querySelectorAll('[id]')).map((el) => el.id)
  //   );
  //   console.log('ids', ids);

  //   const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  //   console.log('headings: ', headings);
  //   const ids2 = Array.from(headings).map((heading) =>
  //     heading.getAttribute('id')
  //   );
  //   console.log('ids2: ', ids2);

  //   const toc = document.createElement('ul');
  //   toc.classList.add('toc');

  //   const prevLi: HTMLLIElement[] = [];

  //   headings.forEach((heading) => {
  //     const level = parseInt(heading.tagName.charAt(1));
  //     const li = document.createElement('li');
  //     const a = document.createElement('a');
  //     const text = document.createTextNode(heading.textContent || '');
  //     const id = heading.getAttribute('id');

  //     a.appendChild(text);
  //     a.href = `#${id?.toString()}`;
  //     li.appendChild(a);

  //     if (level > 1) {
  //       const parentLi = prevLi[level - 2];
  //       if (parentLi instanceof HTMLLIElement) {
  //         const ul = parentLi.querySelector('ul');
  //         if (ul instanceof HTMLUListElement) {
  //           ul.appendChild(li);
  //         } else {
  //           const newUl = document.createElement('ul');
  //           newUl.appendChild(li);
  //           parentLi.appendChild(newUl);
  //         }
  //       }
  //     } else {
  //       toc.appendChild(li);
  //     }

  //     prevLi[level - 1] = li;
  //   });

  //   document.body.appendChild(toc);
  // }
}
