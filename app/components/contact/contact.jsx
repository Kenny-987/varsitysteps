import React from 'react'
import './contact.css'
import '../../globals.css'
const Contact = () => {
  return (
    <section>
        <div className="contact-form">
      <h2>Contact Us</h2>
      <p>Send feedback or ask questions and get in touch</p>
      <form >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            // value={formData.name}
            // onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@mail.com"
            // value={formData.email}
            // onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            // value={formData.message}
            // onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
    </section>
  )
}

export default Contact