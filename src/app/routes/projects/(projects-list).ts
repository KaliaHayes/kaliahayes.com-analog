import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectAttributes } from './projects.model';
import { CardComponent } from '../../components/layout/card/card.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  template: `
    <div class="card">Projects Li$$$t</div>
    <div class="spacer-40"></div>
    <app-card *ngFor="let project of projects" [content]="project"></app-card>
  `,
  imports: [RouterOutlet, CardComponent, NgForOf],
})
export default class ProjectsListComponent implements OnInit {
  colors: string[] = ['#F48FDD', '#8FB6F2', '#C490FA', '#FEBB8E'];

  private readonly projectsFilterFn: InjectContentFilesFilterFunction<ProjectAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/projects/');

  projects = injectContentFiles<ProjectAttributes>(this.projectsFilterFn);

  ngOnInit() {
    this.getContentMetadata();
    // console.log(this.projects);
  }

  getContentMetadata() {
    this.projects = this.projects.map((project: any, index: number) => {
      return {
        ...project,
        accentColor: this.colors[index % this.colors.length],
        route: 'projects',
      };
    });
  }
}
