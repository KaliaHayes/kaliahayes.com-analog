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
        <button class="btn">
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

      .btn input {
        cursor: pointer;
      }

      .btn {
        padding: 10px 20px;
        border-color: none;
        outline: none;
        position: relative;
        z-index: 1;
        border-radius: 50px;
        background: linear-gradient(
          to right,
          #8fb6f2,
          #c490fa,
          #f48fdd,
          #febb8e
        );
        cursor: pointer;
        color: white;
      }

      .btn::before {
        content: '';
        position: absolute;
        left: 1px;
        right: 1px;
        top: 1px;
        bottom: 1px;
        border-radius: 50px;
        background-color: black;
        z-index: -1;
        transition: 200ms;
      }

      .btn::after {
        content: attr(data);
        font-size: 16px;
        background: linear-gradient(
          to right,
          #8fb6f2,
          #c490fa,
          #f48fdd,
          #febb8e
        );
        color: transparent;
        transition: 200ms;
      }

      .btn:hover::before {
        opacity: 0%;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
      }

      .btn:hover::after {
        color: white;
      }

      .btn:hover {
        background-color: transparent;
        color: black;
      }
    `,
  ],
})
export class ContactPageComponent {}
