---
name: Your All in One Markdown Cheatsheet
date: 2023-05-12
description: A markdown cheatsheet for all your markdown needs. Use this cheatsheet as a guide to help you write markdown.
slug: markdown-cheatsheet
featured: true
tags: ["markdown", "cheatsheet", "resource"]
---

# Markdown Cheatsheet<a name="TOP"></a>

---

# <mark>Links</mark>

- [uno](https://hugo-paper.vercel.app/post/markdown-syntax/)
- [Dos](https://github.com/tchapi/markdown-cheatsheet)

# Test <a name="test"></a>

## [Test 2](#test2)

```typescript
import { Component, OnInit, inject } from "@angular/core";
import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { MarkdownComponent, injectContent } from "@analogjs/content";
import { BlogAttributes } from "./blog.model";

@Component({
  selector: "app-blog-post",
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf, JsonPipe],
  template: `
    <div *ngIf="blogs$ | async as blog" class="card blog long-form">
      <ng-container>
        <h1>{{ blog.attributes.name }}</h1>
        <hr />
        <analog-markdown [content]="blog.content"></analog-markdown>
      </ng-container>
    </div>
  `,
})
export default class BlogPostPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly routId$ = this.route.paramMap.pipe(map((params) => params.get("productId")));
  readonly blogs$ = injectContent<BlogAttributes>({
    param: "slug",
    subdirectory: "blogs",
  });

  ngOnInit(): void {
    this.blogs$.subscribe((blog) => {
      // console.log('blog', blog);
    });
  }
}
```

```html
<div class="card-container" (mouseenter)="toggleHoverState()" (mouseleave)="toggleHoverState()">
  <div class="card" [style.border-color]="onHover ? blog.accentColor : ''">
    <!-- <img [src]="blog.imageUrl" alt=""> -->
    <h5>{{ blog.attributes.name }}</h5>
    <p>{{ blog.attributes.description }}</p>
    <p class="more">
      <a [style.color]=" blog.accentColor" [routerLink]="['/blog/' + blog.slug]">
        <i class="fa fa-external-link"></i>
        <span>Read More</span>
      </a>
    </p>
  </div>
  <div class="spacer-5"></div>
  <div class="tags" [style.opacity]="onHover ? '1' : '0'">
    <span *ngFor="let tag of blog.attributes.tags"> #{{ tag }} </span>
  </div>
  <div class="spacer-40"></div>
</div>
```

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

    Markup :  # Heading 1 #
              ## Heading 2 ##
              ### Heading 3 ###
              #### Heading 4 ####
              ##### Heading 5 #####
              ###### Heading 6 ######

Common text

    Markup :  Common text

_Emphasized text_

    Markup :  _Emphasized text_ or *Emphasized text*

~~Strikethrough text~~

    Markup :  ~~Strikethrough text~~

**Strong text**

    Markup :  __Strong text__ or **Strong text**

**_Strong emphasized text_**

    Markup :  ___Strong emphasized text___ or ***Strong emphasized text***

[Named Link](http://www.google.fr/ "Named link title") and http://www.google.fr/ or <http://example.com/>

    Markup :  [Named Link](http://www.google.fr/ "Named link title") and http://www.google.fr/ or <http://example.com/>

[heading-1](#heading-1 "Goto heading-1")

    Markup: [heading-1](#heading-1 "Goto heading-1")

Table, like this one :

| First Header | Second Header |
| ------------ | ------------- |
| Content Cell | Content Cell  |
| Content Cell | Content Cell  |

```
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
```

Adding a pipe `|` in a cell :

| First Header | Second Header |
| ------------ | ------------- |
| Content Cell | Content Cell  |
| Content Cell | \|            |

```
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  |  \|
```

Left, right and center aligned table

| Left aligned Header | Right aligned Header | Center aligned Header |
| :------------------ | -------------------: | :-------------------: |
| Content Cell        |         Content Cell |     Content Cell      |
| Content Cell        |         Content Cell |     Content Cell      |

```
Left aligned Header | Right aligned Header | Center aligned Header
| :--- | ---: | :---:
Content Cell  | Content Cell | Content Cell
Content Cell  | Content Cell | Content Cell
```

`code()`

    Markup :  `code()`

```javascript
var specificLanguage_code = {
  data: {
    lookedUpPlatform: 1,
    query: "Kasabian+Test+Transmission",
    lookedUpItem: {
      name: "Test Transmission",
      artist: "Kasabian",
      album: "Kasabian",
      picture: null,
      link: "http://open.spotify.com/track/5jhJur5n4fasblLSCOcrTp",
    },
  },
};
```

    Markup : ```javascript
             ```

- Bullet list
  - Nested bullet
    - Sub-nested bullet etc
- Bullet list item 2

```
 Markup : * Bullet list
              * Nested bullet
                  * Sub-nested bullet etc
          * Bullet list item 2

-OR-

 Markup : - Bullet list
              - Nested bullet
                  - Sub-nested bullet etc
          - Bullet list item 2
```

1. A numbered list
   1. A nested numbered list
   2. Which is numbered
2. Which is numbered

```
 Markup : 1. A numbered list
              1. A nested numbered list
              2. Which is numbered
          2. Which is numbered
```

- [ ] An uncompleted task
- [x] A completed task

```
 Markup : - [ ] An uncompleted task
          - [x] A completed task
```

- [ ] An uncompleted task
  - [ ] A subtask

```
 Markup : - [ ] An uncompleted task
              - [ ] A subtask
```

> Blockquote
>
> > Nested blockquote

    Markup :  > Blockquote
              >> Nested Blockquote

_Horizontal line :_

---

    Markup :  - - - -

_Image with alt :_

![picture alt](http://via.placeholder.com/200x150 "Title is optional")

    Markup : ![picture alt](http://via.placeholder.com/200x150 "Title is optional")

Foldable text:

<details>
  <summary>Title 1</summary>
  <p>Content 1 Content 1 Content 1 Content 1 Content 1</p>
</details>
<details>
  <summary>Title 2</summary>
  <p>Content 2 Content 2 Content 2 Content 2 Content 2</p>
</details>

    Markup : <details>
               <summary>Title 1</summary>
               <p>Content 1 Content 1 Content 1 Content 1 Content 1</p>
             </details>

```html
<h3>HTML</h3>
<p>Some HTML code here</p>
```

Link to a specific part of the page:

[Go To TOP](#TOP)

    Markup : [text goes here](#section_name)
              section_title<a name="section_name"></a>

Hotkey:

<kbd>⌘F</kbd>

<kbd>⇧⌘F</kbd>

    Markup : <kbd>⌘F</kbd>

Hotkey list:

| Key       | Symbol |
| --------- | ------ |
| Option    | ⌥      |
| Control   | ⌃      |
| Command   | ⌘      |
| Shift     | ⇧      |
| Caps Lock | ⇪      |
| Tab       | ⇥      |
| Esc       | ⎋      |
| Power     | ⌽      |
| Return    | ↩      |
| Delete    | ⌫      |
| Up        | ↑      |
| Down      | ↓      |
| Left      | ←      |
| Right     | →      |

Emoji:

:exclamation: Use emoji icons to enhance text. :+1: Look up emoji codes at [emoji-cheat-sheet.com](http://emoji-cheat-sheet.com/)

    Markup : Code appears between colons :EMOJICODE:

---

+++
author = "Hugo Authors"
title = "Markdown Syntax Guide"
date = "2019-03-11"
description = "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
tags = [
"markdown",
"css",
"html",
]
categories = [
"themes",
"syntax",
]
series = ["Themes Guide"]
aliases = ["migrate-from-jekyl"]
+++

This article offers a sample of basic Markdown syntax that can be used in Hugo content files, also it shows whether basic HTML elements are decorated with CSS in a Hugo theme.

<!--more-->

## Headings

The following HTML `<h1>`—`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level while `<h6>` is the lowest.

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Paragraph

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Blockquotes

The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations.

#### Blockquote without attribution

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Note** that you can use _Markdown syntax_ within a blockquote.

#### Blockquote with attribution

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.

## Tables

Tables aren't part of the core Markdown spec, but Hugo supports supports them out-of-the-box.

| Name  | Age |
| ----- | --- |
| Bob   | 27  |
| Alice | 23  |

#### Inline Markdown within tables

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## Code Blocks

#### Code block with backticks

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

#### Code block indented with four spaces

    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Example HTML5 Document</title>
    </head>
    <body>
      <p>Test</p>
    </body>
    </html>

#### Code block with Hugo's internal highlight shortcode

{{< highlight html >}}

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example HTML5 Document</title>
</head>
<body>
  <p>Test</p>
</body>
</html>
{{< /highlight >}}

## List Types

#### Ordered List

1. First item
2. Second item
3. Third item

#### Unordered List

- List item
- Another item
- And another item

#### Nested list

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

## Other Elements — abbr, sub, sup, kbd, mark

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
