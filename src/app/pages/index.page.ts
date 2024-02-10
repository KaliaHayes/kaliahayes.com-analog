import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { ProjectAttributes } from '../routes/projects/projects.model';
import { CardComponent } from '../components/layout/card/card.component';
import { ContactPageComponent } from '../components/layout/contact/contact.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';

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
        opportunities, so let’s chat! 💻🤝
      </p>
      <br />
      <p>If you’re interested in learning more about me, I ramble on here.</p>
      <br />
      <p>
        <span class="blue bold">Interests</span>: #web dev #ui/ux #automation
        #product ideation #emerging tech #learning french #gaming #retrofuturism
        #design trends #dallas cowboys
      </p>
      <br />
      <p>
        <span class="purple bold">Tools & Tech</span>: #angular #typescript
        #vercel #node #vscode #figma #adobe cc #photoshop #firebase #mongodb
        #git #ionic #chart.js #analog #chrome api
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
  ],
})
export default class HomeComponent implements OnInit, AfterViewInit {
  colors: string[] = ['#8FB6F2', '#C490FA', '#F48FDD', '#FEBB8E'];

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getContentMetadata();
    console.log(this.featuredBlogs);
  }

  ngAfterViewInit(): void {
    this.router.onSameUrlNavigation = 'reload';
    this.router.events.subscribe((s) => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          setTimeout(() => {
            const element = document.querySelector('#' + tree.fragment);
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              });
            }
          }, 300);
        }
      }
    });
  }

  getContentMetadata() {
    this.featuredProjects = this.featuredProjects.map(
      (project: any, index: number) => {
        return {
          ...project,
          route: 'projects',
        };
      }
    );

    this.featuredBlogs = this.featuredBlogs.map((blog, index) => {
      return {
        ...blog,
        route: 'blog',
      };
    });
  }
}
