import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../services/services.css';

export const ContactUs = () => {
  const form = useRef();
  const [message, setMessage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const authenticateUser = () => {
    // Replace this with your actual authentication logic
    // For demonstration, we'll just set it to true
    setAuthenticated(true);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!authenticated) {
      setMessage('Please authenticate before sending the message.');
      return;
    }

    const userName = form.current.user_name.value.trim();
    const userEmail = form.current.user_email.value.trim();
    const userMessage = form.current.message.value.trim();

    if (!userName || !userEmail || !userMessage) {
      setMessage('Please fill in all fields.');
      return;
    }

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        () => {
          setMessage('SUCCESS! Your message has been sent.');
          form.current.reset(); // Reset the form to its initial state
        },
        (error) => {
          setMessage(`FAILED... ${error.text}`);
        }
      );
  };

  return (
    <div className='contacts'>
      <button onClick={authenticateUser}>Authenticate</button>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
