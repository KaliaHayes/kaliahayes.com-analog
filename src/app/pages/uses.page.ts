import { injectContentFiles } from '@analogjs/content';
import { InjectContentFilesFilterFunction } from '@analogjs/content/lib/inject-content-files';
import { Component, OnInit } from '@angular/core';
import { ProjectAttributes } from '../routes/projects/projects.model';

@Component({
  selector: 'app-uses',
  standalone: true,
  template: `
    <div class="card">
      <h1>Uses</h1>
      <p>
        A brief overview of all the tools and tech that power my day to day!
      </p>
      <i>Inspired by Wes Bos</i>
    </div>
    <p class="shimmer section-heading">battlestation</p>
    <div class="card">
      <!-- <img
        src="https://preview.redd.it/xbu6grwpjks91.jpg?width=960&crop=smart&auto=webp&v=enabled&s=d247bcdba2d15fbd98e9e7ad999ff9f9d0db7898"
        alt="not my desk"
      />
      <br /> -->
      <b>💻 Computer</b>
      <ul>
        <li>16" MacBook Pro 2021 M1 Max 64GB</li>
        <li>Lenovo Thinkpad</li>
      </ul>
      <b>🗄️ Desk</b>
      <ul>
        <li>2 Ikea Micke Drawers with Wheels</li>
        <li>Fully Jarvis Standing Frame <span class="grey">(white)</span></li>
        <li>Ikea Karlby tabletop</li>
      </ul>
      <b>💺 Chair </b>
      <ul>
        <li>Steelcase Leap</li>
      </ul>
      <b>🖥️ Peripherals</b>
      <ul>
        <li>Dell UltraSharp 27" 4K USB-C Hub Monitor - U2723QE (horizontal)</li>
        <li>
          LG 27UP850N-B 27" 4K UHD <span class="grey">(vertical - right)</span>
        </li>
      </ul>
      <b>🖱️ Mouse</b>
      <ul>
        <li>Logitech MX Master 3</li>
        <li>
          Apple Magic Mouse
          <span class="grey"
            >(love/hate - half the cause of my wrist problems)</span
          >
        </li>
      </ul>
      <b>⌨️ Keyboard</b>
      <ul>
        <li>
          Aula F68 <span class="grey">(99% transparent - very cool)</span>
        </li>
      </ul>
      <b>📱 Tech</b>
      <ul>
        <li>iPhone 12 Pro</li>
        <li>Apple Watch Series 6</li>
        <li>AirPods Pro v2</li>
        <li>Nintendo Switch OLED</li>
        <li>Playstation 5</li>
        <li>
          Custom transparent PSP <span class="grey">(my first love)</span>
        </li>
      </ul>
    </div>

    <p class="shimmer section-heading">tech stack</p>
    <div class="card">
      <img src="/imgs/Kolada-Theme.png" alt="" />
      <b>Software & Tools</b>
      <ul>
        <li>Personal Development</li>
        <ul>
          <li>
            <span>VS Code - Insiders</span>
            <span class="grey">
              (I switch it up between Hyper Term Black & my own Kolada Theme -
              shoutout #000)</span
            >
          </li>
          <li>
            GitHub
            <span class="grey"
              >(GH for my personal learning & development)</span
            >
          </li>
          <li>Git</li>
          <li>HyperX Terminal</li>
          <li>Firebase</li>
          <li>Supabase</li>
          <li>Figma</li>
          <li>Adobe XD</li>
          <li>Vercel</li>
          <li>Screen Studio</li>
          <li>Raindrop</li>
        </ul>

        <li>Profesional Development</li>
        <ul>
          <li>
            BitBucket <span class="grey">(BB for my work development)</span>
          </li>
          <li>MongoDB</li>
          <li>Java/Spring Boot</li>
        </ul>
      </ul>
    </div>

    <!-- <p class="shimmer section-heading">"productivity" tools</p>
    <div class="card"></div>

    <p class="shimmer section-heading">cool tools</p>
    <div class="card"></div> -->
  `,
  styles: [
    `
      .grey {
        color: #666;
      }
    `,
  ],
})
export default class UsesPageComponent implements OnInit {
  private readonly usesFilterFn: InjectContentFilesFilterFunction<ProjectAttributes> =
    (contentFile) => !!contentFile.filename.includes('/src/content/uses/');

  uses = injectContentFiles<ProjectAttributes>(this.usesFilterFn);

  ngOnInit(): void {
    console.log(this.uses);
  }
}
