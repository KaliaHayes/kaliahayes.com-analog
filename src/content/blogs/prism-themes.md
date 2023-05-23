---
name: Prism.js Themes
date: 2023-05-13
description: the secret sauce
slug: prism-themes
featured: true
tags: ["markdown", "prism.js", "resource", "themes"]
---
- - - -

This is some `inline code`

<mark>Laserwave</mark>

![cotton-candy](/imgs/Laserwave.png)

```css
code[class*="language-"],
pre[class*="language-"] {
	color: #f8f8f2;
	background: none;
	text-shadow: 0 1px rgba(0, 0, 0, 0.3);
	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;
	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;
	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

/* Code blocks */
pre[class*="language-"] {
	padding: 1em;
	margin: .5em 0;
	overflow: auto;
	border-radius: 0.3em;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
	background: #0c0c0d;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
	padding: .1em;
	border-radius: .3em;
	white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: #6272a4;
}

.token.punctuation {
	color: #f8f8f2;
}

.namespace {
	opacity: .7;
}

.token.property,
.token.tag,
.token.constant,
.token.symbol,
.token.deleted {
	color: #ff79c6;
}

.token.boolean,
.token.number {
	color: #bd93f9;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
	color: #50fa7b;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string,
.token.variable {
	color: #f8f8f2;
}

.token.atrule,
.token.attr-value,
.token.function,
.token.class-name {
	color: #f1fa8c;
}

.token.keyword {
	color: #8be9fd;
}

.token.regex,
.token.important {
	color: #ffb86c;
}

.token.important,
.token.bold {
	font-weight: bold;
}

.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}
```
- - - -



<mark> Cotton Candy</mark>

![cotton-candy](/imgs/Cotton-Candy.png)

```css
code[class*="language-"],
pre[class*="language-"] {
  background: #0d0c0e;
  color: #ffffff;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace; /* this is the default */
  /* The following properties are standard, please leave them as they are */
  font-size: 1em;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  line-height: 1.5;
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;
  /* The following properties are also standard */
  -webkit-hyphens: none;
  hyphens: none;
}

code[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection,
pre[class*="language-"]::-moz-selection,
pre[class*="language-"] ::-moz-selection {
  background: #eb64b927;
  color: inherit;
}

code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection, pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection {
  background: #eb64b927;
  color: inherit;
}

code[class*="language-"]::selection,
code[class*="language-"] ::selection,
pre[class*="language-"]::selection,
pre[class*="language-"] ::selection {
  background: #eb64b927;
  color: inherit;
}

/* Properties specific to code blocks */
pre[class*="language-"] {
  padding: 1em; /* this is standard */
  margin: 0.5em 0; /* this is the default */
  overflow: auto; /* this is standard */
  border-radius: 0.5em;
}

/* Properties specific to inline code */
:not(pre) > code[class*="language-"] {
  padding: 0.2em 0.3em;
  border-radius: 0.5rem;
  white-space: normal; /* this is standard */
}

.token.comment,
.token.prolog,
.token.cdata {
  color: #91889b;
}

.token.punctuation {
  color: #7b6995;
}

.token.builtin,
.token.constant,
.token.boolean {
  color: #FF9800;
}

.token.number {
  color: #b381c5;
}

.token.important,
.token.atrule,
.token.property,
.token.keyword {
  color: #40b4c4;
}

.token.doctype,
.token.operator,
.token.inserted,
.token.tag,
.token.class-name,
.token.symbol {
  color: #74dfc4;
}

.token.attr-name,
.token.function,
.token.deleted,
.token.selector {
  color: #fa9cd7;
}

.token.attr-value,
.token.regex,
.token.char,
.token.string {
  color: #b4dce7;
}

.token.entity,
.token.url,
.token.variable {
  color: #ffffff;
}

/* The following rules are pretty similar across themes, but feel free to adjust them */
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.token.namespace {
  opacity: 0.7;
}
```


- - - -

<mark>Kolada</mark>

![Kolada](/imgs/Kolada.png)

```css

code[class*="language-"],
pre[class*="language-"] {
  background: #0d0c0e;
  color: #ffffff;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace; /* this is the default */
  /* The following properties are standard, please leave them as they are */
  font-size: 1em;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  line-height: 1.5;
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;
  /* The following properties are also standard */
  -webkit-hyphens: none;
  hyphens: none;
}

code[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection,
pre[class*="language-"]::-moz-selection,
pre[class*="language-"] ::-moz-selection {
  background: #eb64b927;
  color: inherit;
}

code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection, pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection {
  background: #eb64b927;
  color: inherit;
}

code[class*="language-"]::selection,
code[class*="language-"] ::selection,
pre[class*="language-"]::selection,
pre[class*="language-"] ::selection {
  background: #eb64b927;
  color: inherit;
}

/* Properties specific to code blocks */
pre[class*="language-"] {
  padding: 1em; /* this is standard */
  margin: 0.5em 0; /* this is the default */
  overflow: auto; /* this is standard */
  border-radius: 0.5em;
}

/* Properties specific to inline code */
:not(pre) > code[class*="language-"] {
  padding: 0.2em 0.3em;
  border-radius: 0.5rem;
  white-space: normal; /* this is standard */
}

.token.comment,
.token.prolog,
.token.cdata {
  color: #91889b;
}

.token.punctuation {
  color: #7b6995;
}

.token.builtin,
.token.constant,
.token.boolean {
  color: #ff9800;
}

.token.number {
  color: #b381c5;
}

.token.important,
.token.atrule,
.token.property,
.token.keyword {
  color: #40b4c4;
}

.token.doctype,
.token.operator,
.token.inserted,
.token.tag,
.token.class-name,
.token.symbol {
  color: #f3b13d;
}

.token.attr-name,
.token.function,
.token.deleted,
.token.selector {
  color: #fa9cd7;
}

.token.attr-value,
.token.regex,
.token.char,
.token.string {
  color: #b4dce7;
}

.token.entity,
.token.url,
.token.variable {
  color: #ffffff;
}

/* The following rules are pretty similar across themes, but feel free to adjust them */
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.token.namespace {
  opacity: 0.7;
}
```