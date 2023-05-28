import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { ProjectAttributes } from '../routes/projects/projects.model';
import { CardComponent } from "../components/layout/card/card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <!-- About Me -->
    <div class="card intro">
      <!-- <p>
        Consequat exercitation amet duis ea non id duis officia ex. Enim
        consectetur quis laborum reprehenderit aliqua mollit veniam laborum
        irure laborum pariatur pariatur nostrud. Nostrud adipisicing esse qui
        magna labore cupidatat magna ex nostrud nulla laboris minim. Aliquip
        fugiat mollit culpa enim exercitation ad.
      </p>
      <br />
      <p>
        Consequat exercitation amet duis ea non id duis officia ex. Enim
        consectetur quis laborum reprehenderit aliqua mollit veniam laborum
        irure laborum pariatur pariatur nostrud. Nostrud adipisicing esse qui
        magna labore cupidatat magna ex nostrud nulla laboris minim. Aliquip
        fugiat mollit culpa enim exercitation ad.
      </p> -->

      <p>
        👋 Hello! I’m <span class="pink bold">Kalia Hayes</span>. I’m a Dallas, TX based Software Developer
        @Citi focused on crafting an AI/ML Automation Platform we like to
        call <span class="peach bold">PUMA</span>. 🐆
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
        <span class="blue bold">Interests</span>: #web dev #ui/ux #automation #product
        ideation #emerging tech #learning french #gaming #retrofuturism
        #design trends #dallas cowboys
      </p>
      <br />
      <p>
        <span class="purple bold">Tools & Tech</span>: #angular #typescript #vercel #node #vscode #figma #adobe cc #photoshop
        #firebase #mongodb #git #ionic #chart.js #analog #chrome api
      </p>

    </div>

    

    <p class="shimmer section-heading">featured projects</p>
    <app-card *ngFor="let project of featuredProjects" [content]="project"></app-card>


    <p class="shimmer section-heading">latest blogs</p>
    <app-card *ngFor="let blog of featuredBlogs" [content]="blog"></app-card>

  `,
  styles: [``],
  imports: [CommonModule, NgForOf, CardComponent]
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
    this.getContentMetadata();
  }

  getContentMetadata() {
    // continously loop through the colors array
    // and assign the color to the project as 'accentColor'
    // minimize, condense + move this to a service... eventually :)
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
