import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-project-preview',
  standalone: true,
  imports: [CommonModule, NgForOf],
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css'],
})
export class ProjectPreviewComponent implements OnInit {
  @Input() project: any;

  onHover = false;

  ngOnInit(): void {
    console.log(this.project);
  }
  
  toggleHoverState() {
    this.onHover = !this.onHover;
  }
}
