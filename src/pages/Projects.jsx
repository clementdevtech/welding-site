import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import CTA from '../components/CTA'

export default function Projects(){
  const projects = [
    { t: 'Mall Entrance Gate', img: '/images', tag: 'Commercial' },
    { t: 'Residential Balcony', img: 'https://images.unsplash.com/photo-1556909190-eccf4a8bf37a?q=80&w=1200&auto=format&fit=crop', tag: 'Residential' },
    { t: 'Factory Staircase', img: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?q=80&w=1200&auto=format&fit=crop', tag: 'Industrial' },
    { t: 'Security Windows', img: 'https://images.unsplash.com/photo-1603566234453-25d7bb1d69c7?q=80&w=1200&auto=format&fit=crop', tag: 'Residential' },
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
