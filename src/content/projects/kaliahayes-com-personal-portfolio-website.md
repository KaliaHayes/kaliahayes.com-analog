---
name: kaliahayes.com
description: My personal portfolio website - never seen it before, have you?
source: "https://github.com/KaliaHayes/kaliahayes.com-analog"
imageUrl: /imgs/kaliahayes-com.png
tags: ["angular", "analog", "ssr", "ssg", "vercel", "figma"]
slug: kaliahayes-com-personal-portfolio-website
featured: true
priority: 3
published: 1/26/2023
updated: 12/13/2023
status: "Live!"
---

## Introduction

Welcome to kaliaHayes.com – the digital canvas that reflects my journey, skills, and passion for web development! In this blog post, I'll take you on a tour of my personal portfolio website, sharing the technologies used, the creative process behind the design, and a glimpse into the projects that define my capabilities.

## The Tech Stack

My portfolio is powered by Angular, a robust and versatile JavaScript framework that enables dynamic and interactive web applications. Leveraging Angular has allowed me to create a seamless and responsive user experience, ensuring that visitors can explore my portfolio effortlessly. But, as always, there's more to the story than meets the eye!

### Analog

More specifically, I used [Analog](https://analogjs.org/), the fullstack Angular meta-framework built by [Brandon Roberts](https://twitter.com/brandontroberts). Analog is Vite-powered, supports both Server-Side Rendering (SSR) and Static Site Generation (SSG), and utilizes File-based routing and API routes.

> Similar to other meta-frameworks such as Next.JS, Nuxt, SvelteKit, Qwik City, and others, Analog provides a similar experience, building on top of Angular. <br>
> — <cite>[Analogjs.org Introduction](https://analogjs.org/docs)</cite>

Most of the pages on my portfolio website are rendered using Analog's markdown support. For example, all of the projects and blogs are written in markdown, and Analog automatically generates the corresponding pages using the provided `analog-markdown` component. Maintaining my project and blog files is a breeze, where each file sits in `src/content/projects` or `src/content/blogs` respectively. Feel free to take a look at my blog's [source code](https://github.com/KaliaHayes/kaliahayes.com-analog) to get a better look at the power of Analog!

I have honestly enjoyed every minute of working with Analog, and look forward to diving even deeper into the framework and its capabilities. I highly recommend checking out Analog if you're interested in building a website with Angular! Check out the video below for a quick overview of Analog's features:

<iframe width="100%" height="315" src="https://www.youtube.com/embed/H4U6udLcM-Q?si=IC4BPN84MScL2R67" title="How to Build a Blog with Analog and Angular in Under 10 Minutes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Vercel

I deployed my portfolio to [Vercel](https://vercel.com), a cloud platform for static sites and serverless functions. Vercel's intuitive interface and seamless integration with GitHub made deployment a breeze. Any time I push changes to my GitHub repository, Vercel automatically deploys the updated site. This functionality ensures that my portfolio is always up-to-date, reflecting my latest projects and skills.

### Figma

In bringing my blog to life, I turned to Figma for its intuitive design canvas. Experimenting with layouts, color schemes, and fonts, Figma became the digital sketchbook where my ideas materialized.

As a CSS enthusiast, the transition from Figma to code was a worthwhile challenge. Structuring the HTML based on Figma's layout, I meticulously replicated visual elements with custom CSS. The journey from Figma to CSS is a fusion of design thinking and coding craftsmanship – a testament to the seamless integration of creativity and code.

## The Fun Stuff

Though, as mentioned above, Analog did wonders to streamline the creation of my portfolio website, I did have to write some custom code to bring my vision to life. Here are some of the features I'm most proud of:

- Table of Contents
- Custom Project/Blog Post layout, including the footer, social media links and pagination
- Tag Filtering

Again, feel free to reference my [source code](https://github.com/KaliaHayes/kaliahayes.com-analog) if you are interested in learning more about how I implemented these features.
As you explore my portfolio, I hope you enjoy the experience as much as I enjoyed creating it. Feel free to [reach out](/#contact) with any questions or comments – I'd love to hear from you!
