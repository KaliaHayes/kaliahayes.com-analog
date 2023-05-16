
import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MarkdownComponent, injectContent } from '@analogjs/content';
import { ProjectAttributes } from './projects.model';

@Component({
    standalone: true,
    imports: [MarkdownComponent, AsyncPipe, NgIf, JsonPipe],
    template: `
      <div *ngIf="project$ | async as project" class="card long-form">
        <ng-container>
          <h1>{{ project.attributes.name }}</h1>
          <hr />
          <analog-markdown [content]="project.content"></analog-markdown>
        </ng-container>
      </div>
    `,
  })
  export default class ProjectDetailsComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);

    readonly project$ = injectContent<ProjectAttributes>({
      param: 'slug',
      subdirectory: 'projects',
    });
  
    ngOnInit(): void {
      this.project$.subscribe((project) => {
        // console.log('project', project);
      });
    }
  }
  