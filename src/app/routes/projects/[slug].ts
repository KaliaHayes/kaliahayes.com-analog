import { Component, OnInit, inject } from '@angular/core';
import {
  AsyncPipe,
  JsonPipe,
  NgFor,
  NgIf,
  DatePipe,
  CommonModule,
} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MarkdownComponent,
  injectContent,
  ContentRenderer,
} from '@analogjs/content';
import { ProjectAttributes } from './projects.model';
import { Location } from '@angular/common';
import { GlobalService } from '../../core/services/global-service.service';
import { BackToTopDirective } from '../../core/directives/back-to-top.directive';
import { ScrollService } from '../../core/services/scroll.service';
import { BehaviorSubject, tap } from 'rxjs';
import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { PostNavigationComponent } from '../../core/layout/post-navigation/post-navigation.component';
import { PostInfoComponent } from '../../core/layout/post-info/post-info.component';

@Component({
  standalone: true,
  imports: [
    MarkdownComponent,
    AsyncPipe,
    NgIf,
    NgFor,
    JsonPipe,
    DatePipe,
    BackToTopDirective,
    PostNavigationComponent,
    PostInfoComponent,
    CommonModule,
  ],
  template: `
    <div class="toc" *ngIf="toc$ | async">
      <p>Content</p>
      <analog-markdown
        [content]="toc$ | async"
        *ngIf="toc$ | async"
      ></analog-markdown>
      <hr />
      <p backToTop class="backToTop link">Back to Top</p>
    </div>

    <div *ngIf="project$ | async as project" class="card blog-post">
      <ng-container>
        <div class="top-bar">
          <p (click)="goToProjects()" class="link">← Projects</p>

          <div class="status" *ngIf="project.attributes.status">
            <div
              class="indicator"
              [ngClass]="
                project.attributes.status === 'In Development'
                  ? 'in-dev'
                  : project.attributes.status === 'In Beta'
                  ? 'in-beta'
                  : 'live'
              "
            ></div>
            <span>{{ project.attributes.status }}</span>
          </div>
        </div>

        <h1>{{ project.attributes.name }}</h1>

        <img
          *ngIf="project.attributes.imageUrl"
          [src]="project.attributes.imageUrl"
          alt=""
        />

        <h4>{{ project.attributes.description }}</h4>

        <div class="info-row">
          <div class="techstack" *ngIf="showTechstack">
            <span *ngIf="project.attributes?.techstack" class="bold"
              >Techstack:</span
            >
            <span *ngFor="let tool of project.attributes?.techstack">
              #{{ tool }}</span
            >
          </div>

          <div
            *ngIf="project.attributes?.link || project.attributes?.source"
            class="action-btns"
          >
            <button class="pretty-btn" *ngIf="project.attributes.link">
              <a
                [href]="project.attributes.link"
                target="_blank"
                class="small white"
                >Live
              </a>
            </button>
            <button class="pretty-btn" *ngIf="project.attributes.source">
              <a
                [href]="project.attributes.source"
                target="_blank"
                class="small white"
                >Source
              </a>
            </button>
          </div>
        </div>

        <br />
        <hr style="border-color: #232323" />

        <div class="expandable-toc" (click)="toggleContent()">
          <p class="shimmer">Table of Contents</p>
          <span [ngClass]="showContent ? 'arrow open' : 'arrow'">&#9662;</span>
        </div>

        <div *ngIf="showContent">
          <div class="toc-mobile" *ngIf="toc$ | async">
            <analog-markdown
              [content]="toc$ | async"
              *ngIf="toc$ | async"
            ></analog-markdown>
          </div>
        </div>

        <analog-markdown [content]="project.content"></analog-markdown>
      </ng-container>

      <br />
      <br />

      <app-post-info [post]="project" />

      <br />
      <br />
      <br />

      <app-post-navigation
        [previousPost]="projects[index - 1]"
        [nextPost]="projects[index + 1]"
        [type]="'projects'"
      />
    </div>
  `,
})
export default class ProjectDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  public readonly router = inject(Router);
  private globalService = inject(GlobalService);
  private scrollService = inject(ScrollService);
  showTechstack: boolean = false;
  toc$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly projectsFilterFn: InjectContentFilesFilterFunction<ProjectAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/projects/');

  projects = injectContentFiles<ProjectAttributes>(this.projectsFilterFn);

  readonly project$ = injectContent<ProjectAttributes>({
    param: 'slug',
    subdirectory: 'projects',
  });
  index!: number;
  colors: string[] = ['#8FB6F2', '#C490FA', '#F48FDD', '#FEBB8E'];
  showContent = false;

  ngOnInit(): void {
    this.projects = this.projects.sort((a: any, b: any) => {
      const priorityA = a.attributes.priority || Infinity;
      const priorityB = b.attributes.priority || Infinity;
      return priorityA - priorityB;
    });

    this.projects = this.projects.map((project, index) => {
      return {
        ...project,
        accentColor: this.colors[index % this.colors.length],
      };
    });

    this.project$
      .pipe(
        tap((project) => {
          console.log('project', project);

          if (project.content) {
            const toc = this.globalService.generateTableOfContents(
              project,
              'projects'
            );
            this.toc$.next(toc);
          }

          this.index = this.projects.findIndex((p) => p.slug === project.slug);
        })
      )
      .subscribe();
  }

  goToProjects() {
    this.router.navigateByUrl('/projects');
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }
}
