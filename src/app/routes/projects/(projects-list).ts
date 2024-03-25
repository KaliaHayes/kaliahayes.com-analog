import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectAttributes } from './projects.model';
import { CardComponent } from '../../core/layout/card/card.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  template: `
    <div class="spacer-40"></div>
    <app-card
      *ngFor="let project of projects; let i = index"
      [index]="i"
      [content]="project"
    ></app-card>
  `,
  imports: [RouterOutlet, CardComponent, NgForOf],
})
export default class ProjectsListComponent implements OnInit {
  private readonly projectsFilterFn: InjectContentFilesFilterFunction<ProjectAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/projects/');

  projects = injectContentFiles<ProjectAttributes>(this.projectsFilterFn);

  ngOnInit() {
    this.getContentMetadata();
    console.log(this.projects);
  }

  getContentMetadata() {
    this.projects = this.projects
      .map((project: any, index: number) => {
        return {
          ...project,
          route: 'projects',
        };
      })
      .sort((a: any, b: any) => {
        const priorityA = a.attributes.priority || Infinity;
        const priorityB = b.attributes.priority || Infinity;
        return priorityA - priorityB;
      });
  }
}
