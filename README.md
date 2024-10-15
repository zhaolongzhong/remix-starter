# remix-starter

## Setup

Install dependencies

```sh
npm install
```

```sh
npm run dev
```

## Open in browser

- [http://localhost:3000](http://localhost:3000)
- [http://localhost:3000/blog](http://localhost:3000/blog)
- [http://localhost:3000/contacts](http://localhost:3000/contacts)

## Stack

- Remix
- Typescript
- Tailwind
- Markdown (`remark-rehype`, `remark-gfm`)

## Sturcture

- app
  - routes
    - \_index.tsx
    - blog.\_index.tsx
    - contacts.\_index.tsx
  - ui
  - utils
    root.tsx
- md
  - posts
- scripts
  - format.sh
- package.json
- tsconfig.json
- vite.config.ts

## Features

- Side panel
- Dark model
- Post list
- Post detail with markdown
- Footnotes support, include proper navigation

## Reference

- [Remix Docs](https://remix.run/docs)
