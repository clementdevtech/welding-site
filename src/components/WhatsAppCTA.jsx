import React from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppCTA(){
  // Pre-filled message
  const message = "Hello, I’d like to request a quote for a project. Can you assist me?"

  return (
    <a 
      href={`https://wa.me/254729069509?text=${encodeURIComponent(message)}`} 
      target="_blank" 
      rel="noreferrer" 
      className="fab-cta"
    >
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ type: 'spring', stiffness: 160 }} 
        className="btn btn-success rounded-pill shadow-lg px-3 py-2 d-flex align-items-center"
      >
        <FaWhatsapp className="me-2"/> Chat
      </motion.div>
    </a>
  )
}
