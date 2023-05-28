import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="small shimmer footer">
      <p>goodbye world</p>
    </div>
  `,
  styles: [
    `
      .footer {
        text-align: center;
        width: 600px;
        margin: 50px auto;
      }
    `,
  ],
})
export class FooterComponent {}
