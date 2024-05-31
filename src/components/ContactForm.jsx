import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { MdAddCall, MdMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import toast, { Toaster } from 'react-hot-toast'; // corrected import
import "./contactForm.css";

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'message') setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        'service_gc3re3p',
        'template_dkt7hei',
        e.target,
        '-_xPVTTJr2if1wF0m'
      );
      toast.success("Message sent successfully!");
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
      toast.error("Error sending message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="section-contact-form">
        {/* Render the Toaster component with custom props */}
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className="container-contact-form">
          <div className="title-and-subtitle">
            <h1>Let’s get in touch!</h1>
            <p>
              Got questions about AuraSky? Our team is here to help. Contact us
              for quick and friendly support.
            </p>
          </div>

          <div className="container-contact">
            <div className="container-contact-left">
              <div>
                <div className="contact">
                  <span>
                    <MdAddCall />
                  </span>
                  <p>+91 7355598462</p>
                </div>
                <div className="contact">
                  <span>
                    <MdMail />
                  </span>
                  <p>ritanshushivhare123@gmail.com</p>
                </div>
              </div>
              <div className="social-links-contact">
                <h1>Connect with us</h1>
                <div className="icons-social-links">
                  <BsTwitter className="icon" />
                  <BsInstagram className="icon" />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="container-contact-right">
              <div className="input-container">
                <FaUser />
                <span></span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
              </div>
              <div className="input-container">
                <MdMail />
                <span></span>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              
              <div className="input-container">
                <MdMail />
                <span></span>
                <input
                  type="text"
                  name="message"
                  value={message}
                  onChange={handleChange}
                  placeholder="Message"
                />
              </div>
              <button type="submit" className="button" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
