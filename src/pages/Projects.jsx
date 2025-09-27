import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import CTA from '../components/CTA'

export default function Projects(){
  const projects = [
    { t: 'Mall Entrance Gate', img: '/images/image5.jpeg', tag: 'Commercial' },
    { t: 'Residential Balcony', img: '/images/image13.jpeg', tag: 'Residential' },
    { t: 'Factory Staircase', img: '/images/image8.jpeg', tag: 'Industrial' },
    { t: 'Security Windows', img: '/images/image20.jpeg', tag: 'Residential' },
  ]

  return (
    <Container className="py-5">
      <h2 className="mb-4">Projects</h2>
      <Row className="g-4">
        {projects.map((p,i)=>(
          <Col md={6} lg={3} key={i}>
            <ProjectCard title={p.t} img={p.img} tag={p.tag} />
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">
        <small className="text-muted-2">Want similar work? <a href="/quote" className="text-primary">Request a quote</a></small>
      </div>

      <CTA />
    </Container>
  )
}
