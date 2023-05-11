import { Component, OnInit } from '@angular/core';
import { ProjectPreviewComponent } from '../components/projects/project-preview/project-preview.component';
import { BlogPreviewComponent } from '../components/blog/blog-preview/blog-preview.component';
import { NgForOf } from '@angular/common';

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
      *ngFor="let project of projects"
    ></app-project-preview>

    <p class="shimmer section-heading">latest blogs</p>
    <app-blog-preview
      [blog]="blog"
      *ngFor="let blog of blogs"
    ></app-blog-preview>
  `,
  styles: [``],
  imports: [ProjectPreviewComponent, BlogPreviewComponent, NgForOf],
})
export default class HomeComponent implements OnInit {
  count = 0;

  projects = [
    {
      name: 'Dual-tier sidebar navigation — Untitled UI',
      description: 'A dual-tier sidebar navigation bar in dark mode.',
      source: 'https://angular.io',
      imageUrl:
        'https://cdn.dribbble.com/userupload/2960435/file/original-c09bff272226cce8ce14238cf5e27bb9.jpg?compress=1&resize=1504x1128',
      tags: ['angular', 'navigation', 'sidebar', 'dark mode'],
    },
    {
      name: 'Brainwave - AI Landing Page KitI',
      description:
        'Introducing Brainwave, a fully-featured AI landing page kit that comes with design files and stunning illustrations with alpha (transparent background) in Figma.',
      source: 'https://cli.angular.io/',
      imageUrl:
        'https://cdn.dribbble.com/userupload/6837855/file/original-84e6ad84f61898d244fbbb27952865d1.png?compress=1&resize=2048x1536',
      tags: ['angular', 'landing page', 'ai', 'figma'],
    },
    {
      name: 'Polybox Email Templates',
      description:
        'Working on email campaigns? Discover our bestselling Email HTML constructor — Polybox.',
      source: 'https://material.angular.io/',
      imageUrl:
        'https://cdn.dribbble.com/userupload/6841822/file/original-bba217e4075a54f46e0880842dcd09c4.png?compress=1&resize=2048x1536',
      tags: ['angular', 'email', 'templates', 'html'],
    },
    {
      name: 'Dual-tier sidebar navigation — Untitled UI',
      description: 'A dual-tier sidebar navigation bar in dark mode.',
      source: 'https://angular.io',
      imageUrl:
        'https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?auto=compress&cs=tinysrgb&w=1600',
      tags: ['angular', 'navigation', 'sidebar', 'dark mode'],
    },
    {
      name: 'Dual-tier sidebar navigation — Untitled UI',
      description: 'A dual-tier sidebar navigation bar in dark mode.',
      source: 'https://angular.io',
      imageUrl:
        'https://cdn.dribbble.com/users/2564256/screenshots/15963414/media/e5845ce54c6fe92643074a643d604b5a.png?compress=1&resize=1600x1200&vertical=top',
      tags: ['angular', 'navigation', 'sidebar', 'dark mode'],
    },
    {
      name: 'Dual-tier sidebar navigation — Untitled UI',
      description: 'A dual-tier sidebar navigation bar in dark mode.',
      source: 'https://angular.io',
      imageUrl:
        'https://images.pexels.com/photos/7992270/pexels-photo-7992270.jpeg?auto=compress&cs=tinysrgb&w=1600',
      tags: ['angular', 'navigation', 'sidebar', 'dark mode'],
    },
  ];

  blogs = [
    {
      name: 'Blog about Angular',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet, ipsum vitae semper scelerisque, ipsum enim aliquet eros, vitae luctus nisi nisl nec nunc.',
      source: 'https://angular.io',
      imageUrl:
        'https://cdn.dribbble.com/userupload/2960435/file/original-c09bff272226cce8ce14238cf5e27bb9.jpg?compress=1&resize=1504x1128',
      tags: ['angular', 'navigation', 'sidebar', 'dark mode'],
    },
    {
      name: 'Blog about Material',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet, ipsum vitae semper scelerisque, ipsum enim aliquet eros, vitae luctus nisi nisl nec nunc.',
      source: 'https://angular.io',
      imageUrl:
        'https://cdn.dribbble.com/users/2564256/screenshots/15963414/media/e5845ce54c6fe92643074a643d604b5a.png?compress=1&resize=1600x1200&vertical=top',
      tags: ['angular', 'navigation', 'sidebar', 'dark mode'],
    },
    {
      name: 'Blog about RXJS',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet, ipsum vitae semper scelerisque, ipsum enim aliquet eros, vitae luctus nisi nisl nec nunc.',
      source: 'https://angular.io',
      imageUrl:
        'https://cdn.dribbble.com/userupload/2960435/file/original-c09bff272226cce8ce14238cf5e27bb9.jpg?compress=1&resize=1504x1128',
      tags: ['angular', 'navigation', 'sidebar', 'dark mode'],
    },
  ];

  colors: string[] = ['#F48FDD', '#8FB6F2', '#C490FA', '#FEBB8E'];

  ngOnInit() {
    this.getAccentColors();
  }

  increment() {
    this.count++;
  }

  getAccentColors() {
    // continously loop through the colors array
    // and assign the color to the project as 'accentColor'
    this.projects = this.projects.map((project, index) => {
      return {
        ...project,
        accentColor: this.colors[index % this.colors.length],
      };
    });

    this.blogs = this.blogs.map((blog, index) => {
      return {
        ...blog,
        accentColor: this.colors[index % this.colors.length],
      };
    });
  }
}
