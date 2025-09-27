import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({title, img, tag}){
  return (
    <motion.div whileHover={{ y:-6 }} className="card h-100 border-0 shadow-sm">
      <img src={img} alt={title} className="card-img-top" style={{ height:180, objectFit:'cover' }} loading="lazy" />
      <div className="card-body">
        <small className="badge bg-dark mb-2">{tag}</small>
        <h6 className="mb-0">{title}</h6>
      </div>
    </motion.div>
  )
}
