# Picture Book Studio
![App Preview](https://imgix.cosmicjs.com/22c56770-ba92-11f1-94df-3d523e0e37a7-autopilot-photo-1470071459604-3b5ec3a7fe05-1790527223639.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A warm, whimsical Next.js website for a children's picture book author/publisher, powered by Cosmic. Browse books, meet characters, and flip through story page previews.

## Features

- 🏠 Home page with hero, latest books, and featured characters
- 📚 Books grid listing with target age, trim size, and page count
- 📖 Book detail page with subtitle, author, description, keyword tags, ISBN
- 🎭 Character section on every book page + full Characters directory
- 🔄 Flipbook-style story preview reader (Full Illustration / Text + Illustration / Text Only)
- 📱 Fully responsive, playful, kid-friendly design

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6abe573259463ea225acc7f5&clone_repository=6ab9489ad6c934079b996c00)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create content models for: make story kdp 30 page

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "Picture Book Studio". The content is managed in Cosmic CMS with the following object types: books, story-pages, characters. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A beautiful, playful website for a children's picture book author/publisher (Amazon KDP books). Pages: Home (hero featuring latest books, featured characters), Books listing (grid of covers with target age, trim size, page count), Book detail page (cover, subtitle, author, description, keywords as tags, ISBN, a character section showing characters linked to the book, and a 'Read a preview' flipbook-style reader showing Story Pages ordered by page_number with story text and illustrations, respecting layout: Full Illustration, Text + Illustration, Text Only), Characters listing and character detail pages (role, description, image, link to book). Warm, whimsical, kid-friendly design with rounded shapes, soft colors, and readable typography. Fully responsive.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cosmic](https://www.cosmicjs.com) headless CMS via [`@cosmicjs/sdk`](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account with a bucket containing `books`, `story-pages`, and `characters` object types

### Installation

```bash
bun install
```

Add your Cosmic credentials as environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`), then run:

```bash
bun run dev
```

Visit `http://localhost:3000` to see your app.

## Cosmic SDK Examples

```typescript
// Fetch all books, sorted newest first
const { objects: books } = await cosmic.objects
  .find({ type: 'books' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch story pages for a specific book
const { objects: pages } = await cosmic.objects
  .find({ type: 'story-pages', 'metadata.book': bookId })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app reads from three connected object types in your Cosmic bucket:

- **Books** — subtitle, author name, description, cover image, trim size, target age, page count, keywords, ISBN
- **Story Pages** — linked to a book, page number, layout (Full Illustration / Text + Illustration / Text Only), story text, illustration
- **Characters** — linked to a book, role, description, character image

Learn more about querying connected objects in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project into [Netlify](https://www.netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add the environment variables in the Netlify dashboard
5. Deploy

Set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform's environment variable settings.
<!-- README_END -->