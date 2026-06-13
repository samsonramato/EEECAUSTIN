import { useEffect, useState } from 'react'

const ENDPOINT = '/.netlify/functions/facebook-media'

/**
 * Fetches the church's latest Facebook photos & videos from our serverless
 * function. Fails silently (empty arrays) so callers can fall back to local
 * content — e.g. during local `vite dev` where the function isn't running.
 */
export function useFacebookMedia() {
  const [state, setState] = useState({
    loading: true,
    configured: false,
    photos: [],
    videos: [],
  })

  useEffect(() => {
    let alive = true
    fetch(ENDPOINT)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad status'))))
      .then((d) => {
        if (alive) setState({ loading: false, configured: !!d.configured, photos: d.photos || [], videos: d.videos || [] })
      })
      .catch(() => {
        if (alive) setState({ loading: false, configured: false, photos: [], videos: [] })
      })
    return () => {
      alive = false
    }
  }, [])

  return state
}
