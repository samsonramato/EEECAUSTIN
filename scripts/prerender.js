// Static-site generation step. Runs after the client and SSR builds:
//   1. `vite build`                         -> dist/ (client assets + index.html template)
//   2. `vite build --ssr src/entry-server`  -> dist-ssr/entry-server.js
//   3. node scripts/prerender.js            -> writes real HTML for every route
//
// For each route we render the React tree to HTML, inject it into the
// <div id="root">, and swap in route-specific <title>/description/canonical so
// crawlers get a complete, unique page instead of an empty SPA shell.

import { readFile, writeFile, rm } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = resolve(projectRoot, 'dist')
const SITE = 'https://eeecaustin.org'

// One source of truth for per-page metadata. Titles mirror the document.title
// set client-side in each page component (kept identical for consistency).
const routes = [
  {
    path: '/',
    file: 'index.html',
    // Home keeps the template's meta (already tuned), only its body is injected.
    keepTemplateMeta: true,
  },
  {
    path: '/about',
    file: 'about.html',
    title: 'About — Ethiopian Emmanuel Evangelical Church — Austin | Gospel & Evangelical Community',
    description:
      'Learn about Ethiopian Emmanuel Evangelical Church — a Habesha (Amharic & Tigrinya) evangelical community in Austin / Pflugerville, Texas. Our story, beliefs, and mission.',
  },
  {
    path: '/services',
    file: 'services.html',
    title: 'Worship Services — Ethiopian Emmanuel Evangelical Church — Austin | Gospel Community',
    description:
      'Service times at Ethiopian Emmanuel Evangelical Church in Austin / Pflugerville, TX — Sunday worship, Wednesday prayer, and Friday Bible study. All are welcome.',
  },
  {
    path: '/events',
    file: 'events.html',
    title: 'Events — Ethiopian Emmanuel Evangelical Church — Austin | Gospel & Evangelical Community',
    description:
      'Upcoming events, holidays, and special services at Ethiopian Emmanuel Evangelical Church in Austin / Pflugerville, Texas.',
  },
  {
    path: '/donate',
    file: 'donate.html',
    title: 'Give — Ethiopian Emmanuel Evangelical Church — Austin | Gospel & Evangelical Community',
    description:
      'Give to Ethiopian Emmanuel Evangelical Church in Austin, TX. Support the ministry of our Ethiopian & Eritrean evangelical community.',
  },
  {
    path: '/contact',
    file: 'contact.html',
    title: 'Contact — Ethiopian Emmanuel Evangelical Church — Austin | Gospel & Evangelical Community',
    description:
      'Contact Ethiopian Emmanuel Evangelical Church in Austin / Pflugerville, TX — address, phone, service times, and directions. ሁሉም እንኳን ደህና መጡ.',
  },
]

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Replace the content of a tag matched by `pattern`, building the new tag with `make`.
function replaceTag(html, pattern, make) {
  return pattern.test(html) ? html.replace(pattern, make) : html
}

function applyMeta(html, route) {
  const title = escapeHtml(route.title)
  const description = escapeHtml(route.description)
  const url = `${SITE}${route.path}`

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  html = replaceTag(
    html,
    /(<meta name="description"[\s\S]*?content=")[\s\S]*?("\s*\/>)/,
    `$1${description}$2`,
  )
  html = replaceTag(
    html,
    /(<link rel="canonical" href=")[^"]*("\s*\/>)/,
    `$1${url}$2`,
  )
  html = replaceTag(
    html,
    /(<meta property="og:url" content=")[^"]*("\s*\/>)/,
    `$1${url}$2`,
  )
  html = replaceTag(
    html,
    /(<meta property="og:title" content=")[\s\S]*?("\s*\/>)/,
    `$1${title}$2`,
  )
  html = replaceTag(
    html,
    /(<meta name="twitter:title" content=")[\s\S]*?("\s*\/>)/,
    `$1${title}$2`,
  )
  return html
}

async function run() {
  const template = await readFile(resolve(distDir, 'index.html'), 'utf8')
  const { render } = await import(
    pathToFileURL(resolve(projectRoot, 'dist-ssr/entry-server.js')).href
  )

  if (!template.includes('<div id="root"></div>')) {
    throw new Error('Could not find empty <div id="root"></div> in dist/index.html')
  }

  for (const route of routes) {
    const appHtml = render(route.path)
    let html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    )
    if (!route.keepTemplateMeta) html = applyMeta(html, route)
    await writeFile(resolve(distDir, route.file), html, 'utf8')
    console.log(`prerendered ${route.path} -> dist/${route.file}`)
  }

  // SSR bundle is build-time only; keep it out of the deployed dist.
  await rm(resolve(projectRoot, 'dist-ssr'), { recursive: true, force: true })
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
