import React, { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --saffron: #E8621A;
    --saffron-light: #F47B35;
    --cream: #FFF8EE;
    --cream-dark: #F5EDDB;
    --charcoal: #1C1C1C;
    --charcoal-mid: #2E2E2E;
    --green: #4A7C59;
    --gold: #C9922A;
    --text-muted: #7A6A55;
    --white: #ffffff;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--charcoal);
    overflow-x: hidden;
  }

  h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }

  /* ── HERO ── */
  .contact-hero {
    background: var(--charcoal);
    padding: 6rem 2rem 5rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .contact-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 50%, rgba(232,98,26,0.18) 0%, transparent 65%),
                radial-gradient(ellipse at 75% 30%, rgba(201,146,42,0.1) 0%, transparent 60%);
  }
  .contact-hero::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(232,98,26,0.5), transparent);
  }
  .hero-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
  .hero-label {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.2rem;
  }
  .hero-title {
    font-size: clamp(2.8rem, 6vw, 4.5rem);
    color: var(--white);
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }
  .hero-title em { color: var(--saffron); font-style: italic; }
  .hero-desc {
    font-size: 1.05rem;
    color: rgba(255,255,255,0.7);
    line-height: 1.8;
    max-width: 560px;
    margin: 0 auto;
  }

  /* ── LAYOUT ── */
  .contact-body {
    max-width: 1140px;
    margin: 0 auto;
    padding: 5rem 2rem 6rem;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 4rem;
    align-items: start;
  }

  /* ── LEFT PANEL ── */
  .left-panel { display: flex; flex-direction: column; gap: 2.5rem; }

  .section-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--saffron);
    margin-bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--cream-dark);
  }

  .info-card {
    background: var(--white);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid var(--cream-dark);
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }
  .info-card h3 {
    font-size: 1.3rem;
    color: var(--charcoal);
    margin-bottom: 0.4rem;
  }
  .info-card .card-desc {
    font-size: 0.88rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.9rem 0;
    border-bottom: 1px solid var(--cream-dark);
  }
  .contact-item:last-child { border-bottom: none; }
  .contact-icon {
    width: 38px;
    height: 38px;
    background: rgba(232,98,26,0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
    color: var(--saffron);
  }
  .contact-detail { flex: 1; }
  .contact-detail strong {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.2rem;
  }
  .contact-detail a, .contact-detail span {
    font-size: 0.9rem;
    color: var(--charcoal);
    text-decoration: none;
    transition: color 0.2s;
    line-height: 1.5;
  }
  .contact-detail a:hover { color: var(--saffron); }

  /* Social links */
  .social-row {
    display: flex;
    gap: 0.8rem;
    margin-top: 0.3rem;
    flex-wrap: wrap;
  }
  .social-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--cream);
    border: 1px solid var(--cream-dark);
    border-radius: 8px;
    padding: 0.4rem 0.9rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--charcoal);
    text-decoration: none;
    transition: all 0.2s;
  }
  .social-link:hover {
    background: var(--saffron);
    border-color: var(--saffron);
    color: white;
  }

  /* Response time */
  .response-card {
    background: linear-gradient(135deg, var(--charcoal), #2d1a0e);
    border-radius: 16px;
    padding: 1.8rem;
    color: white;
    position: relative;
    overflow: hidden;
  }
  .response-card::before {
    content: '';
    position: absolute;
    top: -30px; right: -30px;
    width: 120px; height: 120px;
    background: rgba(232,98,26,0.15);
    border-radius: 50%;
  }
  .response-card h4 {
    font-size: 1rem;
    color: var(--gold);
    margin-bottom: 0.5rem;
    position: relative;
  }
  .response-card p {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.75);
    line-height: 1.7;
    position: relative;
  }
  .response-time {
    display: inline-block;
    background: var(--saffron);
    color: white;
    font-size: 0.78rem;
    font-weight: 700;
    padding: 0.25rem 0.8rem;
    border-radius: 20px;
    margin-top: 0.8rem;
    position: relative;
  }

  /* Collaboration card */
  .collab-card {
    background: var(--white);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid var(--cream-dark);
    border-left: 4px solid var(--saffron);
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }
  .collab-card h3 {
    font-size: 1.2rem;
    color: var(--charcoal);
    margin-bottom: 0.5rem;
  }
  .collab-card p {
    font-size: 0.88rem;
    color: var(--text-muted);
    line-height: 1.75;
    margin-bottom: 1.2rem;
  }
  .collab-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .collab-tag {
    background: rgba(232,98,26,0.08);
    color: var(--saffron);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    border: 1px solid rgba(232,98,26,0.2);
  }

  /* ── RIGHT PANEL — FORM ── */
  .form-card {
    background: var(--white);
    border-radius: 20px;
    padding: 2.8rem;
    border: 1px solid var(--cream-dark);
    box-shadow: 0 8px 40px rgba(0,0,0,0.07);
    position: sticky;
    top: 2rem;
  }
  .form-card h2 {
    font-size: 1.9rem;
    color: var(--charcoal);
    margin-bottom: 0.4rem;
  }
  .form-card h2 em { color: var(--saffron); font-style: italic; }
  .form-card .form-intro {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--cream-dark);
  }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
  .form-group { margin-bottom: 1.4rem; }
  .form-group label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 0.5rem;
  }
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.85rem 1.1rem;
    border: 2px solid var(--cream-dark);
    border-radius: 10px;
    font-size: 0.92rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--charcoal);
    background: var(--cream);
    outline: none;
    transition: all 0.2s;
    resize: none;
  }
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    border-color: var(--saffron);
    background: white;
    box-shadow: 0 0 0 4px rgba(232,98,26,0.08);
  }
  .form-group input::placeholder,
  .form-group textarea::placeholder { color: #b0a090; }
  .form-group select { cursor: pointer; }
  .form-group textarea { min-height: 140px; line-height: 1.6; }

  .submit-btn {
    width: 100%;
    background: var(--saffron);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.25s;
    letter-spacing: 0.04em;
    margin-top: 0.5rem;
  }
  .submit-btn:hover {
    background: var(--saffron-light, #F47B35);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(232,98,26,0.35);
  }
  .submit-btn:active { transform: translateY(0); }

  /* Success message */
  .success-msg {
    background: rgba(74,124,89,0.1);
    border: 1px solid rgba(74,124,89,0.3);
    border-radius: 10px;
    padding: 1.2rem 1.5rem;
    margin-top: 1.2rem;
    text-align: center;
  }
  .success-msg strong {
    display: block;
    color: var(--green);
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
  .success-msg span {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  /* ── CLOSING SECTION ── */
  .closing-section {
    background: var(--charcoal);
    padding: 5rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .closing-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(232,98,26,0.15) 0%, transparent 70%);
  }
  .closing-inner { position: relative; z-index: 1; max-width: 620px; margin: 0 auto; }
  .closing-inner h2 {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    color: white;
    margin-bottom: 1rem;
    line-height: 1.25;
  }
  .closing-inner h2 em { color: var(--saffron); font-style: italic; }
  .closing-inner p {
    font-size: 1rem;
    color: rgba(255,255,255,0.65);
    line-height: 1.8;
    margin-bottom: 2rem;
  }
  .closing-divider {
    width: 60px;
    height: 3px;
    background: var(--saffron);
    border-radius: 2px;
    margin: 0 auto 2rem;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .contact-body {
      grid-template-columns: 1fr;
      gap: 2.5rem;
      padding: 3rem 1.5rem 4rem;
    }
    .form-card { position: static; padding: 2rem 1.5rem; }
    .form-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .contact-hero { padding: 4rem 1.5rem 3.5rem; }
    .hero-title { font-size: 2.4rem; }
  }
`;

const ContactIcon = ({ type }) => {
  const icons = {
    email: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    website: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    location: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    social: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.subject && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <style>{styles}</style>

      {/* ── HERO ── */}
      <div className="contact-hero">
        <div className="hero-inner">
          <div className="hero-label">Get in Touch</div>
          <h1 className="hero-title">Contact <em>Us</em></h1>
          <p className="hero-desc">
            Whether you have a question about a recipe, want to share feedback, or are interested
            in collaborating — we would love to hear from you. Fusion Chef is built on a love for
            authentic cuisine, and every message is read and valued.
          </p>
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div className="contact-body">

        {/* ── LEFT PANEL ── */}
        <div className="left-panel">

          {/* Contact Information */}
          <div>
            <div className="section-label">Contact Information</div>
            <div className="info-card">
              <h3>Reach Us Directly</h3>
              <p className="card-desc">
                We are based in Pune, India, and serve a global community of home cooks,
                culinary students and food enthusiasts. Use any of the channels below to connect with us.
              </p>

              <div className="contact-item">
                <div className="contact-icon"><ContactIcon type="email" /></div>
                <div className="contact-detail">
                  <strong>Email Address</strong>
                  <a href="mailto:anuj.digitalwork@gmail.com">anuj.digitalwork@gmail.com</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><ContactIcon type="website" /></div>
                <div className="contact-detail">
                  <strong>Website</strong>
                  <a href="https://fusionchefy.vercel.app" target="_blank" rel="noreferrer">
                    fusionchefy.vercel.app
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><ContactIcon type="location" /></div>
                <div className="contact-detail">
                  <strong>Location</strong>
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><ContactIcon type="social" /></div>
                <div className="contact-detail">
                  <strong>Social Media</strong>
                  <div className="social-row">
                    <a
                      href="https://www.instagram.com/teach_taste_cook"
                      target="_blank"
                      rel="noreferrer"
                      className="social-link"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.pinterest.com/fusionchef"
                      target="_blank"
                      rel="noreferrer"
                      className="social-link"
                    >
                      Pinterest
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="response-card">
            <h4>Response Time</h4>
            <p>
              We read every message personally and aim to provide a thoughtful,
              helpful response to all inquiries. Your questions, suggestions and feedback
              are important to us.
            </p>
            <div className="response-time">Response within 24 to 48 hours</div>
          </div>

          {/* Collaboration */}
          <div>
            <div className="section-label">Work With Us</div>
            <div className="collab-card">
              <h3>Collaboration and Business Inquiries</h3>
              <p>
                Fusion Chef is open to meaningful partnerships that align with our mission
                of authentic, accessible culinary education. If you represent a brand, culinary
                institution, or content platform and are interested in working together,
                we would be glad to explore opportunities with you.
              </p>
              <div className="collab-tags">
                <span className="collab-tag">Brand Collaborations</span>
                <span className="collab-tag">Recipe Partnerships</span>
                <span className="collab-tag">Culinary Training</span>
                <span className="collab-tag">Content Partnerships</span>
                <span className="collab-tag">Media Inquiries</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── RIGHT PANEL — FORM ── */}
        <div className="form-card">
          <h2>Send Us a <em>Message</em></h2>
          <p className="form-intro">
            Use the form below to reach us for recipe questions, suggestions,
            collaborations, or any general inquiries. All fields are required.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="recipe-question">Recipe Question</option>
                <option value="recipe-suggestion">Recipe Suggestion</option>
                <option value="collaboration">Collaboration Inquiry</option>
                <option value="culinary-training">Culinary Training</option>
                <option value="content-partnership">Content Partnership</option>
                <option value="feedback">General Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>

            {submitted && (
              <div className="success-msg">
                <strong>Message Received</strong>
                <span>Thank you for reaching out. We will respond within 24 to 48 hours.</span>
              </div>
            )}
          </form>
        </div>

      </div>

      {/* ── CLOSING SECTION ── */}
      <div className="closing-section">
        <div className="closing-inner">
          <div className="closing-divider" />
          <h2>Let's Talk <em>Food</em></h2>
          <p>
            Cooking is one of the most universal forms of human connection. Whether you are
            recreating a childhood dish, exploring a new cuisine, or building a career in the
            culinary arts — Fusion Chef is here to support your journey every step of the way.
            We look forward to hearing from you.
          </p>
          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)" }}>
            Fusion Chef — Chef's World Recipes. Global Cuisines.
            <br />
            Founded by Chef Anuj Vikas Lonkar, Pune, India.
          </p>
        </div>
      </div>
    </>
  );
}
