import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaPhone, FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">SteelForge</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMain">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink to="/" end className="nav-link">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/services" className="nav-link">Services</NavLink></li>
            <li className="nav-item"><NavLink to="/projects" className="nav-link">Projects</NavLink></li>
            <li className="nav-item"><NavLink to="/gallery" className="nav-link">Gallery</NavLink></li>
            <li className="nav-item"><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
            <li className="nav-item"><NavLink to="/quote" className="nav-link">Get Quote</NavLink></li>
          </ul>
          <div className="d-flex gap-2 align-items-center">
            <a className="btn btn-outline-light btn-sm" href="tel:+254700000000"><FaPhone className="me-1"/> Call</a>
            <a className="text-white-50" href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook/></a>
            <a className="text-white-50" href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram/></a>
          </div>
        </div>
      </div>
    </nav>
  )
}
