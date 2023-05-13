import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectAttributes } from 'src/app/routes/projects/projects.model';
import { injectContent } from '@analogjs/content';

@Component({
  selector: 'app-project-preview',
  standalone: true,
  imports: [CommonModule, NgForOf, RouterModule],
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css'],
})
export class ProjectPreviewComponent implements OnInit {
  @Input() project: any;

  onHover = false;

  toggleHoverState() {
    this.onHover = !this.onHover;
  }

  ngOnInit(): void {
  }
}
