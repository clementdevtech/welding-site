import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaPhone, FaFacebook, FaInstagram, FaBars, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar(){
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="navbar navbar-dark bg-dark sticky-top px-3 d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand fw-bold m-0">Dantez Welding Ke</Link>
        <div className="d-lg-none">
          <button
            className="btn btn-dark border-0 p-0"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <FaBars size={26} color="#fff" />
          </button>
        </div>
        <div className="d-none d-lg-flex gap-3">
          <NavLink to="/" end className="nav-link text-white-50">Home</NavLink>
          <NavLink to="/services" className="nav-link text-white-50">Services</NavLink>
          <NavLink to="/projects" className="nav-link text-white-50">Projects</NavLink>
          <NavLink to="/gallery" className="nav-link text-white-50">Gallery</NavLink>
          <NavLink to="/contact" className="nav-link text-white-50">Contact</NavLink>
          <NavLink to="/quote" className="nav-link text-white-50">Get Quote</NavLink>
          <a className="btn btn-outline-light btn-sm ms-2" href="tel:+254729069509">
            <FaPhone className="me-1"/> Call
          </a>
          <a className="text-white-50" href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook/></a>
          <a className="text-white-50" href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram/></a>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: '#000',
                zIndex: 998
              }}
            />
            <motion.div
              key="sidemenu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '75%',
                maxWidth: 300,
                height: '100%',
                background: '#1c1c1c',
                zIndex: 999,
                padding: '1.5rem'
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-white m-0">Menu</h5>
                <button
                  className="btn btn-dark border-0"
                  onClick={() => setOpen(false)}
                >
                  <FaTimes size={22} color="#fff" />
                </button>
              </div>
              <ul className="list-unstyled">
                <li className="mb-3"><NavLink onClick={() => setOpen(false)} to="/" end className="text-white text-decoration-none">Home</NavLink></li>
                <li className="mb-3"><NavLink onClick={() => setOpen(false)} to="/services" className="text-white text-decoration-none">Services</NavLink></li>
                <li className="mb-3"><NavLink onClick={() => setOpen(false)} to="/projects" className="text-white text-decoration-none">Projects</NavLink></li>
                <li className="mb-3"><NavLink onClick={() => setOpen(false)} to="/gallery" className="text-white text-decoration-none">Gallery</NavLink></li>
                <li className="mb-3"><NavLink onClick={() => setOpen(false)} to="/contact" className="text-white text-decoration-none">Contact</NavLink></li>
                <li className="mb-4"><NavLink onClick={() => setOpen(false)} to="/quote" className="text-white text-decoration-none">Get Quote</NavLink></li>
              </ul>
              <div className="d-flex flex-column gap-3 mt-4">
                <a className="btn btn-outline-light btn-sm" href="tel:+254729069509">
                  <FaPhone className="me-1"/> Call
                </a>
                <div className="d-flex gap-3">
                  <a className="text-white-50" href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook/></a>
                  <a className="text-white-50" href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram/></a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
