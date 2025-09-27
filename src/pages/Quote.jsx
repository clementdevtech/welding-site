import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

export default function Quote(){
  const [form, setForm] = useState({
    name:'', 
    email:'', 
    phone:'', 
    projectType:'Security Door', 
    details:''
  })
  const [status, setStatus] = useState(null)

  function update(e){ 
    setForm(prev=>({ ...prev, [e.target.name]: e.target.value })) 
  }

  function submit(e){
    e.preventDefault()
    if(!form.name || !form.email){ 
      setStatus({type:'error', msg:'Name and email required'}) 
      return 
    }

    // Format WhatsApp message
    const message = `Hello, I would like a quote:\n
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone || 'N/A'}
Project Type: ${form.projectType}
Details: ${form.details || 'N/A'}`

    // Replace with your WhatsApp business number
    const phoneNumber = "254729069509" // e.g. Kenya format without "+" 
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp chat
    window.open(url, "_blank")

    // Reset form
    setForm({
      name:'', 
      email:'', 
      phone:'', 
      projectType:'Security Door', 
      details:''
    })
    setStatus({type:'success', msg:'Redirecting to WhatsApp...'})
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Get a Quote</h2>
      <Row>
        <Col md={8}>
          <form className="card border-0 shadow-sm p-4" onSubmit={submit}>
            {status && <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}>{status.msg}</div>}
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name*</label>
                <input name="name" value={form.name} onChange={update} className="form-control" required/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Email*</label>
                <input name="email" type="email" value={form.email} onChange={update} className="form-control" required/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input name="phone" value={form.phone} onChange={update} className="form-control"/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Project Type</label>
                <select name="projectType" value={form.projectType} onChange={update} className="form-select">
                  <option>Security Door</option>
                  <option>Metallic Windows</option>
                  <option>Gate</option>
                  <option>Railing</option>
                  <option>Custom Fabrication</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Details</label>
                <textarea name="details" value={form.details} onChange={update} rows="4" className="form-control" placeholder="Dimensions, quantity, finish..."/>
              </div>
              <div className="col-12 text-end">
                <Button type="submit" variant="success" size="lg">Send via WhatsApp</Button>
              </div>
            </div>
          </form>
        </Col>

        <Col md={4}>
          <div className="p-4 bg-light rounded-3">
            <h5 className="mb-2">Pro Tips</h5>
            <ul className="small text-muted-2">
              <li>Include dimensions and quantity for faster quotes</li>
              <li>Attach sketches when possible (email after sending)</li>
              <li>Choose finish (powder coat / galvanize) to get accurate pricing</li>
            </ul>
            <hr/>
            <div className="small text-muted-2">We reply within 24 hours — faster by phone/WhatsApp.</div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
