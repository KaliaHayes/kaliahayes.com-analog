import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private readonly location = inject(Location);

  generateTableOfContents(content: any, type: string) {
    const regex = /(#{2,6}) (.*)/g;
    let match;
    let toc = '';

    while ((match = regex.exec(content.content)) !== null) {
      const indentation = '  '.repeat(match[1].length - 2);
      const id = match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-');
      toc += `${indentation}- [${match[2]}](${type}/${content.slug}#${id})\n`;
    }

    return toc;
  }

  back() {
    this.location.back();
  }
}
