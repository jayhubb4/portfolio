import React, { useState } from 'react';
import './Footer.scss';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';


const Footer = () => {
  const [formData, setFormData] = useState({name: '', email: '', message: ''})
  const [isFormSubmitted, setisFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { name, email, message } = formData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...FormData, [name]: value });
  }

  const handleSubmit = () =>  {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact)
    .then(() => {
      setLoading(false);
      setisFormSubmitted(true);
    })
  }
  return (
    <>
      <h2 className='head-text'>Take a coffee & chat with me</h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:codescaping@gmail.com" className='p-text'>codescaping@gmail.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +1 (205) 612-2694" className='p-text'>+1 (205) 612-2694</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.hblogo} alt="hblogo" />
          <a href="tel: +1 (205) 612-2694" className='p-text'>Request a Quote!</a> {/* Change href to honeybook link when created */}
        </div>
      </div>

    {!isFormSubmitted ?
      <div className='app__footer-form app__flex'>
        <div className='app__flex'>
          <input 
          className='p-text' 
          type="text" 
          placeholder='Your Name'
          name='name'
          value={name}
          onChange={handleChangeInput}
          />
        </div>
        <div className='app__flex'>
          <input 
          className='p-text' 
          type="text" 
          placeholder='Your E-mail'
          name='email'
          value={email}
          onChange={handleChangeInput}
          />
        </div>
        <div>
          <textarea
          className='p-text'
          placeholder='Your Message'
          value={message} 
          name="message" 
          onChange={handleChangeInput}
          >           
          </textarea>
        </div>
        <button 
        type='button'
        className='p-text'
        onClick={handleSubmit}
        >
        {loading ? 'Sending' : 'Send Message'}       
        </button>
      </div>
      : <div>
        <h3
        className='head-text'
        >
        Thank you for getting in touch!
        </h3>
      </div>}
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact / quote',
  'app__whitebg'
)