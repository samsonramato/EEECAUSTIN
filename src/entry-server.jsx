import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

// Used at build time by scripts/prerender.js to turn each route into static
// HTML, so crawlers (and the first paint) get real content instead of an
// empty <div id="root">. The browser then hydrates this markup via main.jsx.
export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
