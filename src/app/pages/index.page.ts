import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { ProjectAttributes } from '../routes/projects/projects.model';
import { CardComponent } from '../core/layout/card/card.component';
import { ContactPageComponent } from '../core/layout/contact/contact.component';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ScrollService } from '../core/services/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <!-- About Me -->
    <div class="card intro">
      <p>
        👋 Hello! I’m <span class="pink bold">Kalia Hayes</span>. I’m a Dallas,
        TX based Software Developer &#64;Citi focused on crafting an AI/ML
        Automation Platform we like to call
        <span class="peach bold">PUMA</span>. 🐆
      </p>
      <br />
      <p>
        Feel free to check out my little corners of the internet & other
        projects below! Definitely reach out if you’d like to connect or
        collaborate – I’m currently on the lookout for new open-source
        opportunities, so
        <a
          [routerLink]="['/']"
          fragment="contact"
          routerLinkActive="router-link-active"
          >let’s chat</a
        >! 💻🤝
      </p>
      <br />
      <p>
        <span class="blue bold">Interests</span>: #web dev #ui/ux #automation
        #product ideation #emerging tech #learning french #gaming #retrofuturism
        #design trends #dallas cowboys
      </p>
      <br />
      <p>
        <span class="purple bold">Tools & Tech</span>: #angular #react #typescript #javascript #vercel #node #vscode #figma #adobe cc #photoshop #supabase #firebase #mongodb #git #ionic #analog #chrome api
      </p>
    </div>

    <p class="shimmer section-heading">featured projects</p>
    <app-card
      *ngFor="let project of featuredProjects; let i = index"
      [index]="i"
      [content]="project"
    ></app-card>

    <p class="shimmer section-heading">latest blogs</p>
    <app-card
      *ngFor="let blog of featuredBlogs; let i = index"
      [index]="i"
      [content]="blog"
    ></app-card>

    <p class="shimmer section-heading" id="contact">contact</p>
    <app-contact></app-contact>
  `,
  styles: [``],
  imports: [
    CommonModule,
    NgForOf,
    CardComponent,
    ContactPageComponent,
    RouterOutlet,
    RouterModule,
  ],
})
export default class HomeComponent implements OnInit {
  private scrollService = inject(ScrollService);
  router = inject(Router);

  private readonly projectsFilterFn: InjectContentFilesFilterFunction<ProjectAttributes> =
    (contentFile) =>
      !!contentFile.filename.includes('/src/content/projects/') &&
      !!contentFile.attributes.featured;

  featuredProjects = injectContentFiles<ProjectAttributes>(
    this.projectsFilterFn
  );

  private readonly blogsFilterFn: InjectContentFilesFilterFunction<ProjectAttributes> =
    (contentFile) =>
      !!contentFile.filename.includes('/src/content/blogs/') &&
      !!contentFile.attributes.featured;

  featuredBlogs = injectContentFiles<ProjectAttributes>(this.blogsFilterFn);
  ngOnInit() {
    this.getContentMetadata();

    console.log(this.featuredBlogs);
  }

  getContentMetadata() {
    this.featuredProjects = this.featuredProjects
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

    this.featuredBlogs = this.featuredBlogs
      .map((blog: any, index: any) => {
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
