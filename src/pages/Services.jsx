import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CTA from '../components/CTA'

export default function Services(){
  const services = [
    {title:'Custom Fabrication', desc:'CNC plasma, precise cutting, jigging and repeatable weld fixtures.'},
    {title:'Doors & Gates', desc:'Security doors, swing/slide gates, automation-ready frames.'},
    {title:'Windows & Grilles', desc:'Burglar guards, louvres, fixed & sliding solutions.'},
    {title:'Balustrades & Stairs', desc:'Stainless & mild steel handrails, spiral stairs.'},
    {title:'On-site Welding', desc:'Mobile welding team for repairs, structural connections and installs.'},
    {title:'Finishing', desc:'Powder coating, galvanizing, anti-rust priming and baking.'},
  ]

  return (
    <Container className="py-5">
      <h2 className="mb-4">Services</h2>
      <Row className="g-4">
        {services.map((s,i)=>(
          <Col md={6} lg={4} key={i}>
            <div className="card h-100 border-0 shadow-sm p-3">
              <h5>{s.title}</h5>
              <p className="text-muted-2">{s.desc}</p>
            </div>
          </Col>
        ))}
      </Row>

      <section className="py-5">
        <h4>How we work</h4>
        <ol>
          <li>Send drawings or request site visit</li>
          <li>Receive shop drawings & fixed quote</li>
          <li>Production — quality checks — delivery & install</li>
        </ol>
      </section>

      <CTA />
    </Container>
  )
}
