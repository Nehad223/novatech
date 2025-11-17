"use client"
import React, { useState } from 'react'

const Contact_Body = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
    subject:'contact',
    projectType:''
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccess('')
      return
    }

    setErrors({})

    try {

      const response = await fetch('https://novatech66.pythonanywhere.com/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setSuccess('Message sent successfully!')
        setFormData({ fullName: '', email: '', message: '' })
      } else {
        setSuccess('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error(error)
      setSuccess('An error occurred. Please try again.')
    }
  }

  return (
    <div className='Contact_Body container'>
      <form className='Inputs' onSubmit={handleSubmit} noValidate>
        <input
          name='fullName'
          placeholder='Full Name'
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className='error'>{errors.fullName}</p>}

        <input
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className='error'>{errors.email}</p>}

        <textarea
          name='message'
          placeholder='Message'
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <p className='error'>{errors.message}</p>}

        <button type='submit'>Send Message</button>

        {success && <p className='success'>{success}</p>}
      </form>

      <div className='Text_Info'>
        <h3>Contact Info</h3>
        <div className='location'>
          <img className='img' src="/location.png" alt='location' />
          <p>Location</p>
          <p>Lattakia, Syria</p>
        </div>
        <div className='location'>
          <img className='img' src="/email.png" alt='email' />
          <p>Email</p>
          <p>novatech@gmail.com</p>
        </div>
        <div className='location'>
          <img className='img' src="/phone.png" alt='phone' />
          <p>Phone</p>
          <p>+963940219610</p>
        </div>

        <div>
          <h3>Links</h3>
          <div className='icons'>
            <img src="/facebook.png" alt='facebook' />
            <img src="/telegram.png" alt='telegram' />
            <img src="/insta.png" alt='instagram' />
            <img src="/github.png" alt='github' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact_Body
