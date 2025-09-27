import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', phone:'', message:''})
  const [status, setStatus] = useState(null)

  const update = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

const submit = (e) => {
  e.preventDefault()
  const { name, email, phone, message } = form

  if(!name || !email || !message){
    setStatus({type:'error', msg:'Please fill required fields'})
    return
  }

  // WhatsApp config
  const phoneNumber = '254729069509' // Change to your real WhatsApp number
  const text = `Hello, I am ${name}.%0AEmail: ${email}%0APhone: ${phone || 'N/A'}%0A%0AMessage:%0A${message}`
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`

  // Open in popup window (not a full tab)
  const popupWidth = 500
  const popupHeight = 700
  const left = (window.innerWidth - popupWidth) / 2
  const top = (window.innerHeight - popupHeight) / 2

  window.open(
    whatsappURL,
    'whatsappPopup',
    `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes`
  )

  setStatus({type:'success', msg:'Opening WhatsApp...'})
  setForm({name:'', email:'', phone:'', message:''})
}


  return (
    <Container className="py-5">
      <h2 className="mb-4">Contact</h2>
      <Row className="g-4">
        
        {/* FORM */}
        <Col md={6}>
          <form className="card border-0 shadow-sm p-4" onSubmit={submit}>
            {status && (
              <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                {status.msg}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Name*</label>
              <input name="name" value={form.name} onChange={update} className="form-control" required/>
            </div>
            <div className="mb-3">
              <label className="form-label">Email*</label>
              <input name="email" value={form.email} onChange={update} type="email" className="form-control" required/>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input name="phone" value={form.phone} onChange={update} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Message*</label>
              <textarea name="message" value={form.message} onChange={update} rows="4" className="form-control" required/>
            </div>
            <Button type="submit" variant="success" className="w-100">Send to WhatsApp</Button>
          </form>
        </Col>

        {/* MAP + DETAILS */}
        <Col md={6}>
          <div className="card border-0 shadow-sm h-100">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.831278716864!2d36.821946!3d-1.292066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d35e5d295f%3A0x3a78dac827ad6d0!2sIndustrial%20Area!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
              width="100%"
              height="260"
              style={{ border: 0, borderRadius: '8px 8px 0 0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            <div className="p-4">
              <h5>Visit Us</h5>
              <p className="mb-1">Nairobi, Industrial Area</p>
              <p className="text-muted-2">Mon–Sat 8:00–17:00</p>
              <p className="mb-0">
                Phone: +254 700 000 000<br/>
                Email: info@steelforge.co
              </p>
              <hr/>
              <h6>Follow Up</h6>
              <p className="text-muted-2 small">
                We respond within 24 hours. WhatsApp and calls get faster replies.
              </p>
            </div>
          </div>
        </Col>

      </Row>
    </Container>
  )
}
