import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
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
          name="name"
          placeholder="Name"
        /><br />

        <input
          class="purple-hover"
          type="email"
          name="email"
          cols="30"
          placeholder="Email"
        /><br />
        <input
          class="pink-hover"
          type="text"
          name="subject"
          placeholder="Subject"
        /><br />
        <textarea
          class="peach-hover"
          name="body"
          rows="5"
          cols="30"
          placeholder="Message"
        ></textarea
        ><br />
        <button class="pretty-btn">
          <input
            class="small"
            style="font-size: small"
            type="submit"
            value="Send"
          />
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
      }
    `,
  ],
})
export class ContactPageComponent {}
