// Serverless endpoint that returns the church Facebook page's latest
// photos and videos via the Graph API. The access token stays server-side.
//
// Required Netlify environment variables:
//   FB_PAGE_ID        - numeric ID of the Facebook Page
//   FB_ACCESS_TOKEN   - long-lived Page access token
//
// Returns 200 with empty arrays when unconfigured or on error, so the
// frontend can fall back to local images without ever breaking.

const GRAPH = 'https://graph.facebook.com/v21.0'

export const handler = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    'Access-Control-Allow-Origin': '*',
  }

  const token = process.env.FB_ACCESS_TOKEN
  const pageId = process.env.FB_PAGE_ID

  if (!token || !pageId) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ configured: false, photos: [], videos: [] }),
    }
  }

  const photosUrl =
    `${GRAPH}/${pageId}/photos?type=uploaded` +
    `&fields=id,images,name,created_time&limit=24&access_token=${token}`
  const videosUrl =
    `${GRAPH}/${pageId}/videos` +
    `?fields=id,permalink_url,description,title,picture,created_time,privacy&limit=24&access_token=${token}`

  try {
    const [pRes, vRes] = await Promise.all([fetch(photosUrl), fetch(videosUrl)])
    const pData = await pRes.json()
    const vData = await vRes.json()

    // Newest first: sort by created_time descending (don't trust API order).
    const byNewest = (a, b) => new Date(b.created_time || 0) - new Date(a.created_time || 0)

    const photos = (pData.data || [])
      .slice()
      .sort(byNewest)
      .map((p) => {
        const imgs = p.images || []
        const best = imgs[0]?.source
        const thumb = imgs.find((i) => i.width && i.width <= 720)?.source || best
        return { id: p.id, src: best, thumb, caption: p.name || '', date: p.created_time || null }
      })
      .filter((p) => p.src)

    const videos = (vData.data || [])
      // Only public videos can be shown to visitors; drop "Only me"/friends.
      .filter((v) => (v.privacy?.value || 'EVERYONE') === 'EVERYONE')
      .slice()
      .sort(byNewest)
      .map((v) => {
        const path = v.permalink_url || ''
        const permalink = path.startsWith('http') ? path : `https://www.facebook.com${path}`
        // Reels can't be embedded via the video plugin — flag so the UI links out.
        const isReel = /\/reel\//.test(path)
        return {
          id: v.id,
          permalink,
          isReel,
          title: v.title || v.description || '',
          picture: v.picture || '',
          date: v.created_time || null,
        }
      })
      .filter((v) => v.permalink)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        configured: true,
        photos,
        videos,
        // surfaced for debugging in the Network tab; harmless if null
        errors: { photos: pData.error || null, videos: vData.error || null },
      }),
    }
  } catch (err) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ configured: true, photos: [], videos: [], error: String(err) }),
    }
  }
}
