import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CTA from '../components/CTA'
import { FaExpand, FaPlay, FaPause, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import '../index.css' // keep styles from earlier

const images = [
  'https://images.unsplash.com/photo-1560185007-c5ec03c2d8f3?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576458088443-04a19bb13b5b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1615873968403-89e06804a36d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1617692854669-2d20dfd96fb2?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1564865886636-62084f8459b3?q=80&w=1200&auto=format&fit=crop',
]

// Your supplied social video URLs — you can add/remove later
const videos = [
  { url: 'https://www.facebook.com/100087134987165/videos/1500244774652475/?app=fbl', platform: 'facebook', duration: 22 },
  { url: 'https://www.instagram.com/reel/DLahMsWoJqa/?igsh=Mnl5bTZxNDB0b21h', platform: 'instagram', duration: 18 },
  { url: 'https://vm.tiktok.com/ZMAP3Q5cM/', platform: 'tiktok', duration: 16 },
]

// Helper: build embed src (best-effort params for autoplay & mute)
function buildEmbedSrc(video) {
  const { url, platform } = video
  try {
    if (platform === 'facebook') {
      // Facebook video plugin: autoplay=1&mute=1
      const href = encodeURIComponent(url)
      return `https://www.facebook.com/plugins/video.php?href=${href}&show_text=false&autoplay=1&muted=1`
    }
    if (platform === 'tiktok') {
      // TikTok embed (v2) supports autoplay param
      // convert forms like https://vm.tiktok.com/short to embed path
      return `https://www.tiktok.com/embed/${extractTikTokId(url)}?autoplay=1&muted=1`
    }
    if (platform === 'instagram') {
      // Instagram embed — autoplay often restricted; still embed
      // Instagram embed URL pattern:
      const id = extractInstagramShortcode(url)
      if (id) {
        return `https://www.instagram.com/reel/${id}/embed/`
      }
      // fallback: point to the url
      return url
    }
    return url
  } catch (e) {
    return url
  }
}

// naive extractors (work with typical URL shapes)
function extractTikTokId(url) {
  // Examples:
  // https://vm.tiktok.com/ZMAP3Q5cM/  -> ZMAP3Q5cM
  // https://www.tiktok.com/@user/video/1234567890 -> /@user/video/1234567890 (embed uses full path)
  try {
    const u = new URL(url)
    // vm.tiktok.com short URL: path is '/ZMAP3Q5cM'
    if (u.hostname.includes('vm.tiktok.com')) return u.pathname.replace('/', '')
    // tiktok.com long URL - return full path (remove leading slash)
    return u.pathname.replace(/^\//, '')
  } catch (e) {
    // fallback return raw encoded url
    return encodeURIComponent(url)
  }
}

function extractInstagramShortcode(url) {
  // example: https://www.instagram.com/reel/DLahMsWoJqa/?igsh=...
  try {
    const u = new URL(url)
    const parts = u.pathname.split('/').filter(Boolean) // ["reel","DLahMsWoJqa"]
    if (parts.length >= 2) return parts[1]
    return null
  } catch (e) {
    return null
  }
}

/* ---------------------------
   Lightbox for image inspection
   --------------------------- */
function Lightbox({ items, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex || 0)
  const total = items.length
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % total)
    },
    [onClose, total]
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  return (
    <div className="gallery-lightbox" style={lightboxStyles.backdrop}>
      <div style={lightboxStyles.container}>
        <button aria-label="Previous" onClick={() => setIndex((i) => (i - 1 + total) % total)} style={lightboxStyles.navLeft}><FaChevronLeft/></button>
        <img src={items[index]} alt={`Inspect ${index + 1}`} style={lightboxStyles.image}/>
        <button aria-label="Next" onClick={() => setIndex((i) => (i + 1) % total)} style={lightboxStyles.navRight}><FaChevronRight/></button>
        <button aria-label="Close" onClick={onClose} style={lightboxStyles.close}>Close</button>
        <div style={lightboxStyles.counter}>{index + 1} / {total}</div>
      </div>
    </div>
  )
}

/* ---------------------------
   VideoRotator component
   --------------------------- */
function VideoRotator({ list }) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const timerRef = useRef(null)
  const iframeRef = useRef(null)
  const progressRef = useRef(0)
  const [progress, setProgress] = useState(0)

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // start a timer fallback for this video
  const startTimerFor = (idx) => {
    clearTimer()
    setProgress(0)
    progressRef.current = 0
    const durSec = list[idx].duration || 18 // default fallback
    const stepMs = 250
    const steps = (durSec * 1000) / stepMs
    let step = 0
    timerRef.current = setInterval(() => {
      step++
      progressRef.current = Math.min(1, step / steps)
      setProgress(progressRef.current)
      if (step >= steps) {
        clearTimer()
        setActive((a) => (a + 1) % list.length)
      }
    }, stepMs)
  }

  // try to listen for postMessage events (platform-specific) — best-effort
  useEffect(() => {
    function onMessage(e) {
      // Facebook & Instagram may post messages in some environments; tiktok less so.
      // This is intentionally generic: if an embed posts "ended" or similar we'll skip timer.
      try {
        const d = typeof e.data === 'string' ? e.data : JSON.stringify(e.data)
        if (d && /ended|finish|complete/i.test(d)) {
          clearTimer()
          setActive((a) => (a + 1) % list.length)
        }
      } catch (err) {}
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
    // eslint-disable-next-line
  }, [list.length])

  // when active changes, (re)start timer
  useEffect(() => {
    if (playing) startTimerFor(active)
    return () => clearTimer()
    // eslint-disable-next-line
  }, [active, playing])

  // pause/resume
  const togglePlay = () => {
    if (playing) {
      clearTimer()
      setPlaying(false)
    } else {
      setPlaying(true)
      startTimerFor(active)
    }
  }

  const next = () => {
    clearTimer()
    setActive((a) => (a + 1) % list.length)
  }
  const prev = () => {
    clearTimer()
    setActive((a) => (a - 1 + list.length) % list.length)
  }

  return (
    <div className="card border-0 shadow-sm p-3">
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 8 }}>
        <iframe
          ref={iframeRef}
          title={`video-embed-${active}`}
          src={buildEmbedSrc(list[active])}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          allow="autoplay; fullscreen; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
        />
      </div>

      <div className="d-flex align-items-center gap-2 mt-3">
        <Button variant="outline-secondary" size="sm" onClick={prev} aria-label="Previous"><FaChevronLeft/></Button>
        <Button variant="outline-secondary" size="sm" onClick={togglePlay} aria-label="Play/Pause">
          {playing ? <FaPause/> : <FaPlay/>}
        </Button>
        <Button variant="outline-secondary" size="sm" onClick={next} aria-label="Next"><FaChevronRight/></Button>

        <div className="flex-grow-1 ms-3" style={{ height: 8, background: '#eee', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ width: `${Math.round(progress * 100)}%`, height: '100%', background: 'linear-gradient(90deg,#0d6efd,#0b5bd7)' }} />
        </div>
      </div>

      <div className="small text-muted-2 mt-2">{list[active].platform.toUpperCase()} • Clip {active + 1} of {list.length}</div>
      <div className="small text-muted-2">If autoplay is blocked by your browser the video will still show — press play.</div>
    </div>
  )
}

/* ---------------------------
   Main Gallery Page
   --------------------------- */
export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (idx) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Gallery</h2>

      {/* IMAGE GRID */}
      <Row className="g-3">
        {images.map((src, i) => (
          <Col xs={6} md={4} lg={3} key={i}>
            <div className="card border-0 shadow-sm" style={{ cursor: 'pointer' }}>
              <img
                src={src}
                alt={`Gallery ${i}`}
                className="img-fluid rounded"
                style={{ height: 180, objectFit: 'cover' }}
                loading="lazy"
                onClick={() => openLightbox(i)}
              />
              <div className="p-2 d-flex justify-content-end">
                <button className="btn btn-sm btn-outline-primary" onClick={() => openLightbox(i)} aria-label="Inspect image">
                  <FaExpand /> Inspect
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* lightbox */}
      {lightboxOpen && (
        <Lightbox items={images} startIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}

      {/* VIDEO ROTATOR */}
      <section className="mt-5">
        <h3 className="mb-3">Videos</h3>
        <Row>
          <Col md={8}>
            <VideoRotator list={videos} />
          </Col>
          <Col md={4}>
            <div className="card border-0 shadow-sm p-3">
              <h6>About these clips</h6>
              <p className="small text-muted-2">
                Clips are pulled from Facebook, Instagram and TikTok embeds. They autoplay muted where allowed, and rotate automatically.
                If your browser blocks autoplay you can press play on the clip.
              </p>
              <hr/>
              <h6 className="mb-2">Tips</h6>
              <ul className="small text-muted-2">
                <li>Muting is required for autoplay on most modern browsers.</li>
                <li>To guarantee perfect end-detection we can host MP4s or integrate each platform SDK.</li>
                <li>Want video thumbnails here? I can add them (oEmbed fetch or manual URLs).</li>
              </ul>
            </div>
          </Col>
        </Row>
      </section>

      <CTA />
    </Container>
  )
}

/* ---------------------------
   Inline styles used by lightbox
   --------------------------- */
const lightboxStyles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(6,8,15,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1200,
  },
  container: {
    position: 'relative',
    maxWidth: '92%',
    maxHeight: '92%',
    width: '100%',
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '82vh',
    borderRadius: 8,
    boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
  },
  navLeft: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.06)',
    border: 'none',
    color: 'white',
    fontSize: 18,
    padding: 10,
    borderRadius: 8,
  },
  navRight: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.06)',
    border: 'none',
    color: 'white',
    fontSize: 18,
    padding: 10,
    borderRadius: 8,
  },
  close: {
    position: 'absolute',
    right: 12,
    top: 12,
    background: 'rgba(255,255,255,0.06)',
    border: 'none',
    padding: '6px 10px',
    color: 'white',
    borderRadius: 6,
  },
  counter: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
  },
}
