import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-preview',
  standalone: true,
  imports: [CommonModule, NgForOf, RouterModule],
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.css']
})
export class BlogPreviewComponent  implements OnInit {
  @Input() blog: any;

  onHover = false;

  ngOnInit(): void {
  }
  
  toggleHoverState() {
    this.onHover = !this.onHover;
  }
}