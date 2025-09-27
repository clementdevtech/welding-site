import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5>Dantez Welding Ke</h5>
            <p className="text-muted-2">Precision welding & metal fabrication. Doors, gates, windows & structural works.</p>
          </div>
          <div className="col-md-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/services" className="text-white-50">Services</Link></li>
              <li><Link to="/projects" className="text-white-50">Projects</Link></li>
              <li><Link to="/gallery" className="text-white-50">Gallery</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6>Contact</h6>
            <div className="small text-white-50">+254 729069509<br/>info@dantezweldingke.co</div>
            <div className="mt-3 small text-white-50">© {new Date().getFullYear()} Dantez Welding Ke.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
