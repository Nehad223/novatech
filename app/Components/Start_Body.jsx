"use client"
import { useState } from "react";

const Start_Body = ({ backendUrl }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectType: '',
    message: '',
    subject: 'project'
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.projectType) newErrors.projectType = "Please select a project type.";
    if (!formData.message.trim()) newErrors.message = "Description is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess('');
      return;
    }

    setErrors({});
    setSuccess('');

    try {
      const url = 'https://novatech66.pythonanywhere.com/contact/'
      if (!url) {
        setSuccess('Backend URL not specified.');
        return;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess('Form submitted successfully!');
        setFormData({
          fullName: '',
          email: '',
          projectType: '',
          message: '',
          subject: 'project'
        });
      } else {
        setSuccess('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setSuccess('An error occurred. Please try again.');
    }
  };

  return (
    <div className='container start'>
      <h1>Start Your Project</h1>
      <p>املأ النموذج أدناه وسيقوم خبراؤنا بالرد عليك خلال 24 ساعة</p>

      <div className='Start_Body'>
        <form className='start-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor="projectType">Project Type</label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
            >
              <option value="">Select a project type</option>
              <option value="telegram-bot">Telegram Bot</option>
              <option value="website">Website</option>
              <option value="app">Mobile App</option>
              <option value="ai-model">AI Model</option>
            </select>
            {errors.projectType && <span className="error-msg">{errors.projectType}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor="message">Project Description</label>
            <textarea
              id="message"
              name="message"
              placeholder="Describe your idea or project requirements..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <span className="error-msg">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-btn">Submit</button>

          {success && <p className="success-msg">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Start_Body;
