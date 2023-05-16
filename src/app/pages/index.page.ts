import { Component, OnInit } from '@angular/core';
import { ProjectPreviewComponent } from '../components/projects/project-preview/project-preview.component';
import { NgForOf } from '@angular/common';
import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { ProjectAttributes } from '../routes/projects/projects.model';
import { BlogAttributes } from '../routes/blog/blog.model';
import { BlogPreviewComponent } from '../components/blogs/blog-preview/blog-preview.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <!-- About Me -->
    <div class="card intro">
      <p>
        👋 Hey there! I’m Kalia Hayes. I’m a Dallas, TX based Software Developer
        @ Citi focused on engineering an AI/ML Automation Platform we like to
        call PUMA. 🐆
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
        Interests: #frontend #ui design #automation #dallas cowboys #product
        ideation #emerging tech #learning french #gaming #retrofuturism #twitch
        #design trends #VS Code themes
      </p>
      <br />
      <p>
        Tools & Tech: #angular #typescript #node #cheerio #figma #adobe xd
        #firebase #mongodb #notion #ionic #chart.js #scully
      </p>
    </div>

    <p class="shimmer section-heading">featured projects</p>
    <app-project-preview
      [project]="project"
      *ngFor="let project of featuredProjects"
    ></app-project-preview>

    <p class="shimmer section-heading">latest blogs</p>
    <app-blog-preview
      [blog]="blog"
      *ngFor="let blog of featuredBlogs"
    ></app-blog-preview>
  `,
  styles: [``],
  imports: [ProjectPreviewComponent, BlogPreviewComponent, NgForOf],
})
export default class HomeComponent implements OnInit {
  colors: string[] = ['#F48FDD', '#8FB6F2', '#C490FA', '#FEBB8E'];

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
    // console.log(this.featuredProjects);
    // console.log(this.featuredBlogs);
    this.getContentMetadata();
  }

  getContentMetadata() {
    // continously loop through the colors array
    // and assign the color to the project as 'accentColor'
    this.featuredProjects = this.featuredProjects.map(
      (project: any, index: number) => {
        return {
          ...project,
          accentColor: this.colors[index % this.colors.length],
          route: 'projects',
        };
      }
    );

    this.featuredBlogs = this.featuredBlogs.map((blog, index) => {
      return {
        ...blog,
        accentColor: this.colors[index % this.colors.length],
        route: 'blog',
      };
    });
  }
}
