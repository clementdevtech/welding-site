import React, { useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Link } from 'react-router-dom'

const finishedItems = [
  { title: 'Security Door', spec: 'Galvanized, powder-coated', src: 'https://images.unsplash.com/photo-1560185007-c5ec03c2d8f3?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Window Grille', spec: 'Wrought iron', src: 'https://images.unsplash.com/photo-1576458088443-04a19bb13b5b?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Sliding Gate', spec: 'Heavy-duty channel', src: 'https://images.unsplash.com/photo-1615873968403-89e06804a36d?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Balcony Railing', spec: 'Stainless steel 304', src: 'https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Louvre Window', spec: 'Alu frame, tempered', src: 'https://images.unsplash.com/photo-1617692854669-2d20dfd96fb2?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Industrial Frame', spec: 'Welded box section', src: 'https://images.unsplash.com/photo-1564865886636-62084f8459b3?q=80&w=1200&auto=format&fit=crop' },
]

export default function HeroAnimation(){
  const controls = useAnimation()
  const [showProducts, setShowProducts] = React.useState(false)

  useEffect(()=>{
    async function run(){
      await controls.start({ rotate: 0, transition:{ duration: 0.5 } })
      await controls.start({ rotate: 90, scale: 1.03, transition:{ duration: 0.7, ease:'easeInOut' } })
      await controls.start({ rotate: 180, scale: 1.05, transition:{ duration: 0.6, ease:'easeInOut' } })
      // blast
      await controls.start({ opacity: 0, scale: 0.85, transition:{ duration: 0.28 } })
      setTimeout(()=> setShowProducts(true), 320)
    }
    run()
  // eslint-disable-next-line
  },[])

  const bars = Array.from({length:9})

  return (
    <section className="hero-stage mb-4 card-shadow">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 text-white">
            <h1 className="display-5 fw-bold">Precision Welding & Metal Works</h1>
            <p className="lead text-white-50">Custom steel doors, windows, gates, railings & structural fabrication — built for strength, finished for beauty.</p>

            <div className="d-flex gap-2 mt-3">
              <Link className="btn cta-strong btn-lg" to="/quote">Get Free Quote</Link>
              <Link className="btn btn-outline-light btn-lg" to="/projects">See Projects</Link>
            </div>

            <div className="d-flex gap-3 mt-4 text-white-50 small">
              <div><strong>Fast lead times</strong><br/><span className="text-muted-2">Design → Fabrication → Install</span></div>
              <div><strong>Warranty</strong><br/><span className="text-muted-2">1 year on workmanship</span></div>
            </div>
          </div>

          <div className="col-lg-6">
            <div style={{ minHeight: 320, position:'relative' }}>
              <AnimatePresence>
                {!showProducts && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={controls}
                    exit={{ opacity: 0, scale: 0.7, transition:{ duration:0.3 } }}
                    className="d-flex flex-wrap justify-content-center align-items-center gap-2"
                    style={{ padding: 12 }}
                  >
                    {bars.map((_,i) => (
                      <div key={i} style={{
                        width: i % 3 === 0 ? 180 : 110,
                        height: 16 + (i%3)*8,
                        borderRadius: 6,
                        background: 'linear-gradient(145deg,#9aa0a6,#6b7280)',
                        boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.25), 0 8px 24px rgba(0,0,0,0.35)'
                      }} />
                    ))}
                    <div className="w-100 text-center text-white-50 mt-2">Raw steel bars & sheets</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showProducts && (
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1, transition:{ duration:0.45 } }} style={{ position:'absolute', inset:0 }}>
                    <div className="row g-2">
                      {finishedItems.map((it, idx) => (
                        <div className="col-6 col-md-4" key={idx}>
                          <motion.div initial={{ scale:0, y:30, opacity:0 }} animate={{ scale:1, y:0, opacity:1, transition:{ delay: idx*0.06, type:'spring', stiffness:140 } }} whileHover={{ y:-6 }} className="card border-0">
                            <img src={it.src} alt={it.title} className="card-img-top" style={{ height:120, objectFit:'cover' }} loading="lazy" />
                            <div className="card-body py-2 px-2">
                              <h6 className="mb-0">{it.title}</h6>
                              <small className="text-muted-2">{it.spec}</small>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}