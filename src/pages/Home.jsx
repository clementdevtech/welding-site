import React from 'react'
import HeroAnimation from '../components/HeroAnimation'
import CTA from '../components/CTA'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <>
      <HeroAnimation />

      {/* About section (embedded to drive trust) */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <img src="https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1200&auto=format&fit=crop" alt="Workshop" className="img-fluid rounded shadow-sm" />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold">About SteelForge</h2>
              <p className="text-muted-2">We deliver built-to-spec welded metalwork: security doors, gates, windows, railings and structural fabrications. Our team follows documented processes and provides shop drawings, quality checks, and installation.</p>
              <ul className="mb-3">
                <li>Experienced certified welders (MIG/TIG/ARC)</li>
                <li>Detailed shop drawings & FREE site measurement</li>
                <li>Powder coating & galvanizing finish options</li>
              </ul>
              <div className="d-flex gap-2">
                <Link to="/projects" className="btn btn-outline-primary">View Work</Link>
                <Link to="/quote" className="btn cta-strong">Get Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-5 bg-light">
        <Container>
          <h3 className="mb-4">Our Services</h3>
          <Row className="g-3">
            {[
              {title:'Custom Fabrication', text:'Shop drawings, CNC plasma cutting, bending, assembly.'},
              {title:'Doors & Gates', text:'Security doors, sliding gates, frames & automation ready.'},
              {title:'Windows & Grilles', text:'Burglar guards, louvres, sliding windows.'},
              {title:'Balustrades & Railings', text:'Stair rails, balcony railings, safety handrails.'}
            ].map((s,i)=>(
              <Col key={i} md={6} lg={3}>
                <div className="card h-100 border-0 shadow-sm p-3">
                  <h6>{s.title}</h6>
                  <p className="small text-muted-2">{s.text}</p>
                  <Link to="/services" className="small text-primary">Learn more →</Link>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Trust / conversion strip */}
      <section className="py-4">
        <Container>
          <div className="row align-items-center">
            <div className="col-md-8">
              <h5 className="mb-0">Free site measurement & quote on all projects</h5>
              <p className="text-muted-2 mb-0">No surprises — fixed quotes, professional installation, and warranty on workmanship.</p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <Link to="/quote" className="btn cta-strong">Request Free Quote</Link>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  )
}
