import React from 'react'
import { Link } from 'react-router-dom'

export default function CTA(){
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h3 className="fw-bold">Ready to build something strong and beautiful?</h3>
            <p className="text-muted-2 mb-0">Send your drawings or measurements and get a free professional quote with a guaranteed timeline.</p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <Link to="/quote" className="btn cta-strong btn-lg">Request Free Quote</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
