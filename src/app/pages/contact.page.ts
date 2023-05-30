import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="card">
      <form
        action="mailto:kaliahayes@yahoo.com"
        method="get"
        enctype="text/plain"
      >
        <input
          class="blue-hover"
          type="text"
          name="subject"
          placeholder="Subject"
        /><br />
        <input
          class="peach-hover"
          type="email"
          name="email"
          cols="30"
          placeholder="Email"
        /><br />
        <textarea
          class="purple-hover" 
          name="body"
          rows="5"
          cols="30"
          placeholder="Message"
        ></textarea
        ><br />
        <button class="pink-hover">
          <input type="submit" value="Send" />
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .pink-hover:hover {
        border: 1px solid #f48fdd;
      }
      .blue-hover:hover {
        border: 1px solid #8fb6f2;
      }
      .purple-hover:hover {
        border: 1px solid #c490fa;
      }
      .peach-hover:hover {
        border: 1px solid #febb8e;
        cursor: pointer;
      }

      .pink-hover input {
        cursor: pointer;
      }
    `,
  ],
})
export default class ContactPageComponent {}
