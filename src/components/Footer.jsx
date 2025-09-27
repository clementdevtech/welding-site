import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5>SteelForge</h5>
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
            <div className="small text-white-50">+254 700 000 000<br/>info@steelforge.co</div>
            <div className="mt-3 small text-white-50">© {new Date().getFullYear()} SteelForge Ltd.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
