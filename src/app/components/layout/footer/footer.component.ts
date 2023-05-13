import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="small shimmer" style="text-align: center; margin-bottom: 50px;">
      <p>goodbye world</p>
    </div>
  `,
  styles: [],
})
export class FooterComponent {}
