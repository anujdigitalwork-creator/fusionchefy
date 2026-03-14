import React, { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const styles = `
  ${FONTS}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --saffron: #E8621A;
    --saffron-light: #F47B35;
    --cream: #FFF8EE;
    --cream-dark: #F5EDDB;
    --charcoal: #1C1C1C;
    --charcoal-mid: #2E2E2E;
    --green: #4A7C59;
    --green-light: #6A9E78;
    --gold: #C9922A;
    --text-muted: #7A6A55;
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--charcoal); overflow-x: hidden; }
  h1,h2,h3,h4 { font-family: 'Playfair Display', serif; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: var(--charcoal); color: white;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 64px;
    box-shadow: 0 2px 20px rgba(0,0,0,0.3);
    transition: all 0.3s;
  }
  .nav.scrolled { background: rgba(28,28,28,0.97); backdrop-filter: blur(12px); }
  .nav-logo { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
  .nav-logo span.logo-text { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: white; }
  .nav-logo span.logo-ai { color: var(--saffron); font-style: italic; }
  .nav-links { display: flex; gap: 1.8rem; list-style: none; }
  .nav-links a { color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.88rem; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; transition: color 0.2s; cursor: pointer; }
  .nav-links a:hover { color: var(--saffron); }
  .nav-right { display: flex; align-items: center; gap: 1rem; }
  .nav-search { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 24px; padding: 0.4rem 1rem; color: white; font-size: 0.85rem; width: 180px; outline: none; font-family: 'DM Sans', sans-serif; transition: all 0.3s; }
  .nav-search::placeholder { color: rgba(255,255,255,0.45); }
  .nav-search:focus { background: rgba(255,255,255,0.15); border-color: var(--saffron); width: 220px; }
  .btn-ai { background: var(--saffron); color: white; border: none; padding: 0.5rem 1.2rem; border-radius: 24px; font-size: 0.85rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; white-space: nowrap; }
  .btn-ai:hover { background: var(--saffron-light); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(232,98,26,0.4); }

  /* HERO */
  .hero { margin-top: 64px; height: 88vh; min-height: 560px; position: relative; overflow: hidden; background: var(--charcoal); }
  .hero-slides { width: 100%; height: 100%; position: relative; }
  .hero-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1.2s ease; background-size: cover; background-position: center; }
  .hero-slide.active { opacity: 1; }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(28,28,28,0.75) 0%, rgba(28,28,28,0.2) 60%, transparent 100%); }
  .hero-content { position: absolute; bottom: 12%; left: 6%; max-width: 580px; animation: fadeUp 1s ease forwards; }
  @keyframes fadeUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
  .hero-tag { display: inline-block; background: var(--saffron); color: white; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.3rem 0.9rem; border-radius: 2px; margin-bottom: 1rem; }
  .hero h1 { font-size: clamp(2.4rem, 5vw, 4rem); color: white; line-height: 1.12; margin-bottom: 1rem; text-shadow: 0 2px 20px rgba(0,0,0,0.4); }
  .hero p { color: rgba(255,255,255,0.85); font-size: 1.05rem; line-height: 1.65; margin-bottom: 1.8rem; }
  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary { background: var(--saffron); color: white; border: none; padding: 0.85rem 2rem; border-radius: 4px; font-size: 0.95rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.25s; }
  .btn-primary:hover { background: var(--saffron-light); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,98,26,0.4); }
  .btn-outline { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.6); padding: 0.85rem 2rem; border-radius: 4px; font-size: 0.95rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.25s; }
  .btn-outline:hover { border-color: white; background: rgba(255,255,255,0.1); }
  .hero-dots { position: absolute; bottom: 2rem; right: 6%; display: flex; gap: 0.5rem; }
  .hero-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.3s; border: none; }
  .hero-dot.active { background: var(--saffron); transform: scale(1.3); }

  /* SECTION COMMONS */
  .section { padding: 5rem 2.5rem; }
  .section-header { text-align: center; margin-bottom: 3rem; }
  .section-tag { display: inline-block; color: var(--saffron); font-size: 0.78rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.6rem; }
  .section-title { font-size: clamp(1.8rem, 3vw, 2.8rem); color: var(--charcoal); line-height: 1.2; }
  .section-title em { color: var(--saffron); font-style: italic; }
  .section-sub { color: var(--text-muted); font-size: 1rem; margin-top: 0.6rem; max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.7; }

  /* AI CHEF SECTION */
  .ai-section { background: var(--charcoal); padding: 5rem 2.5rem; position: relative; overflow: hidden; }
  .ai-section::before { content: ''; position: absolute; top: -50%; right: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(232,98,26,0.12) 0%, transparent 70%); pointer-events: none; }
  .ai-section .section-tag { color: var(--saffron-light); }
  .ai-section .section-title { color: white; }
  .ai-section .section-sub { color: rgba(255,255,255,0.55); }
  .ai-container { max-width: 760px; margin: 0 auto; }
  .ai-chat-box { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; backdrop-filter: blur(10px); }
  .ai-chat-header { background: rgba(232,98,26,0.15); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.5rem; display: flex; align-items: center; gap: 0.8rem; }
  .ai-chef-avatar { width: 36px; height: 36px; background: var(--saffron); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
  .ai-chat-header-text h4 { color: white; font-size: 0.95rem; font-family: 'Playfair Display', serif; }
  .ai-chat-header-text span { color: rgba(255,255,255,0.5); font-size: 0.75rem; }
  .ai-messages { padding: 1.5rem; min-height: 180px; max-height: 340px; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; }
  .ai-messages::-webkit-scrollbar { width: 4px; }
  .ai-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
  .msg { max-width: 85%; padding: 0.8rem 1.1rem; border-radius: 12px; font-size: 0.9rem; line-height: 1.6; }
  .msg.user { background: var(--saffron); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .msg.ai { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); align-self: flex-start; border-bottom-left-radius: 4px; }
  .msg.ai h4 { font-family: 'Playfair Display', serif; color: var(--saffron-light); margin-bottom: 0.4rem; font-size: 1rem; }
  .msg.ai ul { padding-left: 1.2rem; margin-top: 0.4rem; }
  .msg.ai ul li { margin-bottom: 0.2rem; }
  .typing { display: flex; gap: 4px; align-items: center; padding: 0.8rem 1.1rem; }
  .typing span { width: 7px; height: 7px; background: var(--saffron); border-radius: 50%; animation: bounce 1.2s infinite; }
  .typing span:nth-child(2) { animation-delay: 0.2s; }
  .typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-8px); } }
  .ai-input-row { display: flex; gap: 0; border-top: 1px solid rgba(255,255,255,0.08); }
  .ai-input { flex: 1; background: transparent; border: none; padding: 1.1rem 1.5rem; color: white; font-size: 0.92rem; font-family: 'DM Sans', sans-serif; outline: none; }
  .ai-input::placeholder { color: rgba(255,255,255,0.3); }
  .ai-send { background: var(--saffron); border: none; color: white; padding: 1rem 1.5rem; cursor: pointer; font-size: 1.1rem; transition: background 0.2s; }
  .ai-send:hover { background: var(--saffron-light); }
  .ai-chips { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1.2rem; }
  .ai-chip { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.7); padding: 0.45rem 1rem; border-radius: 20px; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .ai-chip:hover { background: rgba(232,98,26,0.2); border-color: var(--saffron); color: white; }

  /* CONTINENT BLOCKS */
  .continent-block { max-width: 1300px; margin: 0 auto 3rem; }
  .continent-header { border-left: 4px solid var(--saffron); padding: 0.5rem 0 0.5rem 1rem; margin-bottom: 1.2rem; }
  .continent-title { font-size: 1.3rem; font-family: 'Playfair Display', serif; }
  .cat-card .cat-info span { font-size: 0.72rem; color: rgba(255,255,255,0.8); font-style: italic; }

  /* CATEGORIES */
  .categories-section { background: var(--cream); }
  .cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.2rem; max-width: 1300px; margin: 0 auto; }
  .cat-card { position: relative; height: 200px; border-radius: 12px; overflow: hidden; cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,0.12); transition: transform 0.3s, box-shadow 0.3s; }
  .cat-card:hover { transform: translateY(-6px); box-shadow: 0 12px 36px rgba(0,0,0,0.2); }
  .cat-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .cat-card:hover img { transform: scale(1.08); }
  .cat-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(28,28,28,0.75) 0%, transparent 60%); }
  .cat-info { position: absolute; bottom: 1rem; left: 1rem; color: white; }
  .cat-info h3 { font-size: 1.1rem; font-weight: 700; }
  .cat-info span { font-size: 0.78rem; color: rgba(255,255,255,0.7); }

  /* TRENDING */
  .trending-section { background: var(--cream-dark); }
  .trending-scroll { display: flex; gap: 1.4rem; overflow-x: auto; padding: 0.5rem 0 1.5rem; scrollbar-width: thin; scrollbar-color: var(--saffron) transparent; max-width: 1200px; margin: 0 auto; }
  .trending-scroll::-webkit-scrollbar { height: 4px; }
  .trending-scroll::-webkit-scrollbar-thumb { background: var(--saffron); border-radius: 2px; }
  .recipe-card { min-width: 280px; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 3px 16px rgba(0,0,0,0.09); transition: all 0.3s; cursor: pointer; }
  .recipe-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.15); }
  .recipe-card-img { position: relative; height: 180px; overflow: hidden; }
  .recipe-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .recipe-card:hover .recipe-card-img img { transform: scale(1.06); }
  .recipe-badge { position: absolute; top: 0.8rem; left: 0.8rem; color: white; font-size: 0.7rem; font-weight: 600; padding: 0.25rem 0.65rem; border-radius: 20px; letter-spacing: 0.05em; }
  .recipe-badge.easy { background: var(--green); }
  .recipe-badge.medium { background: var(--gold); }
  .recipe-badge.hard { background: #C0392B; }
  .heart-btn { position: absolute; top: 0.8rem; right: 0.8rem; background: white; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.15); transition: transform 0.2s; }
  .heart-btn:hover { transform: scale(1.2); }
  .recipe-card-body { padding: 1rem 1.1rem; }
  .recipe-card-body h3 { font-size: 1rem; color: var(--charcoal); margin-bottom: 0.4rem; line-height: 1.4; }
  .recipe-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.78rem; color: var(--text-muted); margin-top: 0.6rem; }
  .recipe-chef { font-size: 0.78rem; color: var(--saffron); font-weight: 600; }

  /* CHEFS */
  .chefs-section { background: white; }
  .chefs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; max-width: 1000px; margin: 0 auto; }
  .chef-card { text-align: center; padding: 2rem 1.5rem; border-radius: 16px; background: var(--cream); cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden; }
  .chef-card::before { content: ''; position: absolute; inset: 0; background: var(--saffron); transform: scaleY(0); transform-origin: bottom; transition: transform 0.35s ease; z-index: 0; }
  .chef-card:hover::before { transform: scaleY(1); }
  .chef-card > * { position: relative; z-index: 1; }
  .chef-card:hover h3, .chef-card:hover .chef-specialty, .chef-card:hover .chef-followers { color: white; }
  .chef-avatar { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem; border: 3px solid white; box-shadow: 0 4px 14px rgba(0,0,0,0.15); }
  .chef-card h3 { font-size: 1.05rem; color: var(--charcoal); transition: color 0.3s; }
  .chef-specialty { font-size: 0.8rem; color: var(--saffron); margin-top: 0.3rem; font-weight: 500; transition: color 0.3s; }
  .chef-followers { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.3rem; transition: color 0.3s; }
  .chef-dish { font-size: 0.75rem; margin-top: 0.5rem; opacity: 0; transform: translateY(6px); transition: all 0.3s 0.1s; color: rgba(255,255,255,0.9); }
  .chef-card:hover .chef-dish { opacity: 1; transform: translateY(0); }

  /* SHOWS */
  .shows-section { background: var(--charcoal); padding: 5rem 2.5rem; }
  .shows-section .section-title { color: white; }
  .shows-section .section-tag { color: var(--saffron-light); }
  .shows-section .section-sub { color: rgba(255,255,255,0.5); }
  .shows-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; max-width: 1100px; margin: 0 auto; }
  .show-card { position: relative; border-radius: 14px; overflow: hidden; cursor: pointer; aspect-ratio: 16/9; }
  .show-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .show-card:hover img { transform: scale(1.06); }
  .show-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(28,28,28,0.9) 0%, rgba(28,28,28,0.1) 60%, transparent 100%); }
  .play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(0.9); width: 52px; height: 52px; background: rgba(232,98,26,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; transition: all 0.3s; opacity: 0; }
  .show-card:hover .play-btn { opacity: 1; transform: translate(-50%,-50%) scale(1); }
  .show-info { position: absolute; bottom: 1rem; left: 1rem; right: 1rem; color: white; }
  .show-info h3 { font-size: 1.05rem; }
  .show-info span { font-size: 0.78rem; color: rgba(255,255,255,0.6); }

  /* BLOG */
  .blog-section { background: var(--cream); }
  .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; max-width: 1100px; margin: 0 auto; }
  .blog-card { background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 3px 16px rgba(0,0,0,0.07); transition: all 0.3s; cursor: pointer; }
  .blog-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.13); }
  .blog-card-img { height: 200px; overflow: hidden; }
  .blog-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .blog-card:hover .blog-card-img img { transform: scale(1.06); }
  .blog-card-body { padding: 1.3rem; }
  .blog-category { font-size: 0.72rem; color: var(--saffron); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
  .blog-card-body h3 { font-size: 1.05rem; color: var(--charcoal); margin: 0.4rem 0 0.6rem; line-height: 1.45; }
  .blog-meta { display: flex; gap: 1rem; font-size: 0.75rem; color: var(--text-muted); }

  /* NEWSLETTER */
  .newsletter-section { background: var(--saffron); padding: 4.5rem 2.5rem; text-align: center; position: relative; overflow: hidden; }
  .newsletter-section::before { content: '🍳'; font-size: 14rem; position: absolute; left: -2rem; top: -2rem; opacity: 0.07; transform: rotate(-20deg); pointer-events: none; }
  .newsletter-section::after { content: '🌿'; font-size: 14rem; position: absolute; right: -2rem; bottom: -2rem; opacity: 0.07; transform: rotate(20deg); pointer-events: none; }
  .newsletter-section h2 { color: white; font-size: clamp(1.8rem, 3vw, 2.6rem); margin-bottom: 0.8rem; }
  .newsletter-section p { color: rgba(255,255,255,0.85); font-size: 1rem; margin-bottom: 2rem; }
  .newsletter-form { display: flex; gap: 0; max-width: 460px; margin: 0 auto; border-radius: 6px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
  .newsletter-input { flex: 1; padding: 1rem 1.4rem; border: none; font-size: 0.92rem; font-family: 'DM Sans', sans-serif; outline: none; }
  .newsletter-btn { background: var(--charcoal); color: white; border: none; padding: 1rem 1.6rem; font-size: 0.92rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.2s; white-space: nowrap; }
  .newsletter-btn:hover { background: var(--charcoal-mid); }

  /* FOOTER */
  .footer { background: var(--charcoal-mid); color: rgba(255,255,255,0.7); padding: 4rem 2.5rem 2rem; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 2.5rem; max-width: 1100px; margin: 0 auto 3rem; }
  .footer-brand h2 { font-family: 'Playfair Display', serif; color: white; font-size: 1.5rem; margin-bottom: 0.8rem; }
  .footer-brand h2 em { color: var(--saffron); }
  .footer-brand p { font-size: 0.85rem; line-height: 1.7; max-width: 260px; }
  .footer-socials { display: flex; gap: 0.8rem; margin-top: 1.2rem; }
  .social-btn { width: 36px; height: 36px; background: rgba(255,255,255,0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; font-size: 0.95rem; text-decoration: none; color: rgba(255,255,255,0.7); }
  .social-btn:hover { background: var(--saffron); }
  .footer-col h4 { color: white; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.2rem; }
  .footer-col ul { list-style: none; }
  .footer-col ul li { margin-bottom: 0.6rem; }
  .footer-col ul li a { color: rgba(255,255,255,0.55); text-decoration: none; font-size: 0.85rem; transition: color 0.2s; }
  .footer-col ul li a:hover { color: var(--saffron); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem; text-align: center; font-size: 0.8rem; max-width: 1100px; margin: 0 auto; }

  /* FULL PAGE OVERLAY */
  .full-page { position: fixed; inset: 0; background: var(--cream); z-index: 150; overflow-y: auto; animation: fadeIn 0.3s ease; }
  .full-page-header { background: var(--charcoal); padding: 1.2rem 2.5rem; display: flex; align-items: center; gap: 1.2rem; position: sticky; top: 0; z-index: 10; }
  .full-page-header h1 { font-family: 'Playfair Display', serif; color: white; font-size: 1.5rem; flex: 1; }
  .full-page-header h1 em { color: var(--saffron); font-style: italic; }
  .back-btn { background: transparent; border: 2px solid rgba(255,255,255,0.3); color: white; padding: 0.45rem 1.1rem; border-radius: 24px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; transition: all 0.2s; }
  .back-btn:hover { background: var(--saffron); border-color: var(--saffron); }
  .full-page-content { max-width: 1300px; margin: 0 auto; padding: 2.5rem 2rem; }

  /* CUISINE EXPLORER */
  .ce-continent { margin-bottom: 3rem; }
  .ce-continent-title { font-size: 1.4rem; font-family: 'Playfair Display', serif; color: var(--charcoal); margin-bottom: 1.2rem; padding-bottom: 0.6rem; border-bottom: 3px solid var(--saffron); display: inline-block; }
  .ce-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
  .ce-card { background: white; border-radius: 12px; overflow: hidden; cursor: pointer; box-shadow: 0 3px 12px rgba(0,0,0,0.08); transition: all 0.3s; }
  .ce-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(0,0,0,0.15); }
  .ce-card-img { height: 130px; overflow: hidden; position: relative; }
  .ce-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .ce-card:hover .ce-card-img img { transform: scale(1.08); }
  .ce-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%); }
  .ce-card-body { padding: 0.8rem 1rem; }
  .ce-card-body h3 { font-size: 0.92rem; color: var(--charcoal); font-weight: 600; }
  .ce-card-body p { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem; font-style: italic; }
  .ce-available { display: inline-block; background: var(--green); color: white; font-size: 0.65rem; padding: 0.15rem 0.55rem; border-radius: 10px; margin-top: 0.3rem; }
  .ce-coming { display: inline-block; background: var(--cream-dark); color: var(--text-muted); font-size: 0.65rem; padding: 0.15rem 0.55rem; border-radius: 10px; margin-top: 0.3rem; }

  /* RECIPE DATABASE */
  .rdb-filters { background: white; border-radius: 14px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 3px 12px rgba(0,0,0,0.07); }
  .rdb-filters-row { display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-end; }
  .rdb-filter-group { flex: 1; min-width: 180px; }
  .rdb-filter-group label { display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem; }
  .rdb-search-input { width: 100%; padding: 0.65rem 1rem; border: 2px solid var(--cream-dark); border-radius: 8px; font-size: 0.88rem; font-family: 'DM Sans', sans-serif; outline: none; transition: border 0.2s; }
  .rdb-search-input:focus { border-color: var(--saffron); }
  .rdb-select { width: 100%; padding: 0.65rem 1rem; border: 2px solid var(--cream-dark); border-radius: 8px; font-size: 0.88rem; font-family: 'DM Sans', sans-serif; outline: none; background: white; cursor: pointer; transition: border 0.2s; }
  .rdb-select:focus { border-color: var(--saffron); }
  .rdb-count { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.2rem; }
  .rdb-count strong { color: var(--saffron); }
  .rdb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.4rem; }
  .rdb-card { background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 3px 14px rgba(0,0,0,0.08); cursor: pointer; transition: all 0.3s; }
  .rdb-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.14); }
  .rdb-card-img { height: 170px; display: flex; align-items: center; justify-content: center; font-size: 4rem; position: relative; }
  .rdb-card-body { padding: 1rem 1.2rem; }
  .rdb-card-body h3 { font-size: 0.98rem; color: var(--charcoal); margin-bottom: 0.4rem; line-height: 1.4; }
  .rdb-card-meta { display: flex; gap: 0.8rem; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem; flex-wrap: wrap; align-items: center; }
  .rdb-cuisine-tag { display: inline-block; background: rgba(232,98,26,0.1); color: var(--saffron); font-size: 0.72rem; font-weight: 600; padding: 0.2rem 0.7rem; border-radius: 10px; }
  .rdb-empty { text-align: center; padding: 4rem; color: var(--text-muted); }
  .rdb-empty p:first-child { font-size: 3rem; margin-bottom: 1rem; }

  /* INDIAN CUISINE PAGE */
  .indian-page { position: fixed; inset: 0; background: var(--cream); z-index: 150; overflow-y: auto; animation: fadeIn 0.3s ease; }
  .indian-header { background: var(--charcoal); padding: 1.5rem 2.5rem; display: flex; align-items: center; gap: 1.5rem; position: sticky; top: 0; z-index: 10; }
  .indian-back { background: transparent; border: 2px solid rgba(255,255,255,0.3); color: white; padding: 0.5rem 1.2rem; border-radius: 24px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; transition: all 0.2s; }
  .indian-back:hover { background: var(--saffron); border-color: var(--saffron); }
  .indian-header h1 { font-family: 'Playfair Display', serif; color: white; font-size: 1.6rem; flex: 1; }
  .indian-header h1 em { color: var(--saffron); font-style: italic; }
  .indian-search { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 24px; padding: 0.5rem 1.2rem; color: white; font-size: 0.88rem; width: 240px; outline: none; font-family: 'DM Sans', sans-serif; }
  .indian-search::placeholder { color: rgba(255,255,255,0.4); }
  .indian-content { max-width: 1300px; margin: 0 auto; padding: 2.5rem 2rem; }
  .indian-cats { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2.5rem; }
  .cat-pill { background: white; border: 2px solid var(--cream-dark); color: var(--charcoal); padding: 0.45rem 1.2rem; border-radius: 24px; font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .cat-pill:hover, .cat-pill.active { background: var(--saffron); border-color: var(--saffron); color: white; }
  .indian-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.4rem; }
  .indian-card { background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 3px 16px rgba(0,0,0,0.09); cursor: pointer; transition: all 0.3s; }
  .indian-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.15); }
  .indian-card-img { height: 180px; background: linear-gradient(135deg, var(--saffron), var(--gold)); display: flex; align-items: center; justify-content: center; font-size: 4rem; position: relative; overflow: hidden; }
  .indian-card-body { padding: 1rem 1.2rem; }
  .indian-card-body h3 { font-size: 1rem; color: var(--charcoal); margin-bottom: 0.4rem; }
  .indian-card-meta { display: flex; gap: 0.8rem; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem; flex-wrap: wrap; }
  .indian-cat-badge { display: inline-block; background: var(--cream-dark); color: var(--saffron); font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.7rem; border-radius: 12px; margin-bottom: 0.4rem; }
  .diff-badge { padding: 0.2rem 0.6rem; border-radius: 10px; font-size: 0.7rem; font-weight: 600; color: white; }
  .diff-easy { background: var(--green); }
  .diff-medium { background: var(--gold); }
  .diff-hard { background: #C0392B; }
  .indian-empty { text-align: center; padding: 4rem; color: var(--text-muted); font-size: 1.1rem; }
  .indian-modal-steps { list-style: none; counter-reset: steps; }
  .indian-modal-steps li { counter-increment: steps; font-size: 0.88rem; color: var(--charcoal); padding: 0.7rem 0 0.7rem 2.5rem; border-bottom: 1px solid var(--cream-dark); position: relative; line-height: 1.6; }
  .indian-modal-steps li::before { content: counter(steps); position: absolute; left: 0; top: 0.7rem; width: 22px; height: 22px; background: var(--saffron); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; }
  .flavor-tag { display: inline-block; background: var(--cream-dark); color: var(--charcoal); font-size: 0.72rem; padding: 0.2rem 0.7rem; border-radius: 10px; margin: 0.2rem; }
  .diet-tag { display: inline-block; background: rgba(74,124,89,0.15); color: var(--green); font-size: 0.72rem; padding: 0.2rem 0.7rem; border-radius: 10px; margin: 0.2rem; font-weight: 600; }
  .nutrition-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0.8rem; margin-top: 0.8rem; }
  .nutrition-box { background: var(--cream); border-radius: 10px; padding: 0.7rem; text-align: center; }
  .nutrition-box strong { display: block; font-size: 1rem; color: var(--saffron); }
  .nutrition-box span { font-size: 0.7rem; color: var(--text-muted); }

  /* SEARCH MODAL */
  .search-modal { background: white; border-radius: 20px; max-width: 700px; width: 100%; max-height: 85vh; overflow-y: auto; animation: slideUp 0.3s ease; }
  .search-modal-header { padding: 1.5rem 1.8rem; border-bottom: 1px solid var(--cream-dark); display: flex; align-items: center; justify-content: space-between; }
  .search-modal-header h3 { font-size: 1.2rem; color: var(--charcoal); }
  .search-modal-header span { color: var(--text-muted); font-size: 0.85rem; }
  .search-results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding: 1.5rem; }
  .search-result-card { background: var(--cream); border-radius: 12px; overflow: hidden; cursor: pointer; transition: all 0.3s; }
  .search-result-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
  .search-result-img { height: 130px; overflow: hidden; }
  .search-result-img img { width: 100%; height: 100%; object-fit: cover; }
  .search-result-body { padding: 0.8rem; }
  .search-result-body h4 { font-size: 0.9rem; color: var(--charcoal); margin-bottom: 0.3rem; line-height: 1.4; }
  .search-result-meta { font-size: 0.75rem; color: var(--text-muted); }
  .search-empty { padding: 3rem; text-align: center; color: var(--text-muted); }
  .search-loading { padding: 3rem; text-align: center; }
  .ai-badge { display: inline-block; background: var(--saffron); color: white; font-size: 0.65rem; padding: 0.15rem 0.5rem; border-radius: 10px; margin-left: 0.4rem; vertical-align: middle; }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  .modal { background: white; border-radius: 20px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; animation: slideUp 0.3s ease; }
  @keyframes slideUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
  .modal-img { width: 100%; height: 260px; object-fit: cover; border-radius: 20px 20px 0 0; }
  .modal-body { padding: 1.8rem; }
  .modal-body h2 { font-size: 1.6rem; color: var(--charcoal); margin-bottom: 0.5rem; }
  .modal-meta { display: flex; gap: 1rem; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1.2rem; flex-wrap: wrap; }
  .modal-meta span { background: var(--cream); padding: 0.3rem 0.8rem; border-radius: 20px; }
  .modal-section-title { font-size: 1rem; font-weight: 600; color: var(--saffron); margin: 1.2rem 0 0.6rem; font-family: 'Playfair Display', serif; }
  .modal-ingredients { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
  .modal-ingredients li { font-size: 0.88rem; color: var(--charcoal); padding: 0.3rem 0; border-bottom: 1px solid var(--cream-dark); }
  .modal-ingredients li::before { content: '• '; color: var(--saffron); }
  .modal-steps { list-style: none; counter-reset: steps; }
  .modal-steps li { counter-increment: steps; font-size: 0.88rem; color: var(--charcoal); padding: 0.6rem 0 0.6rem 2.5rem; border-bottom: 1px solid var(--cream-dark); position: relative; line-height: 1.6; }
  .modal-steps li::before { content: counter(steps); position: absolute; left: 0; top: 0.6rem; width: 22px; height: 22px; background: var(--saffron); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; }
  .modal-close { position: absolute; top: 1rem; right: 1rem; background: white; border: none; width: 36px; height: 36px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
  .modal-close:hover { background: var(--saffron); color: white; }
  .modal-wrapper { position: relative; }
  .modal-chef-avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 4px solid var(--saffron); margin: 0 auto 1rem; display: block; }
  .modal-chef-body { padding: 2rem; text-align: center; }
  .modal-chef-body h2 { font-size: 1.6rem; color: var(--charcoal); }
  .modal-chef-specialty { color: var(--saffron); font-weight: 600; margin: 0.3rem 0 1rem; }
  .modal-chef-bio { font-size: 0.9rem; color: var(--text-muted); line-height: 1.7; text-align: left; }
  .modal-chef-stats { display: flex; gap: 1rem; justify-content: center; margin: 1.2rem 0; }
  .modal-chef-stat { text-align: center; background: var(--cream); padding: 0.8rem 1.2rem; border-radius: 12px; }
  .modal-chef-stat strong { display: block; font-size: 1.1rem; color: var(--charcoal); }
  .modal-chef-stat span { font-size: 0.75rem; color: var(--text-muted); }
  .btn-ask-chef { background: var(--saffron); color: white; border: none; padding: 0.8rem 1.8rem; border-radius: 24px; font-size: 0.92rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; margin-top: 1rem; transition: all 0.2s; }
  .btn-ask-chef:hover { background: var(--saffron-light); transform: translateY(-2px); }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .hero h1 { font-size: 2rem; }
    .section { padding: 3.5rem 1.2rem; }
    .modal-ingredients { grid-template-columns: 1fr; }
  }
`;

const heroSlides = [
  { bg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80", tag: "Chef's Special", title: "Saffron-Glazed Salmon with Herb Risotto", desc: "A restaurant-worthy dish you can recreate at home in under 40 minutes." },
  { bg: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1400&q=80", tag: "Trending Now", title: "Mushroom & Truffle Pasta Perfection", desc: "Earthy, luxurious, and deeply satisfying. A dish for every occasion." },
  { bg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&q=80", tag: "Weekend Bake", title: "Honey Cardamom Croissants", desc: "Buttery layers of joy. Master the art of laminated dough." },
];

const continents = [
  {
    name: "🌏 Asian Cuisines",
    color: "#E8621A",
    cuisines: [
      { name: "🇯🇵 Japanese", desc: "sushi, ramen, tempura", img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", recipes: ["Tonkotsu Ramen", "Chicken Katsu Curry", "Mochi Ice Cream"] },
      { name: "🇨🇳 Chinese", desc: "dim sum, Peking duck, stir-fries", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", recipes: ["Kung Pao Chicken", "Dim Sum", "Peking Duck"] },
      { name: "🇹🇭 Thai", desc: "pad thai, green curry", img: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&q=80", recipes: ["Green Curry", "Pad Thai", "Tom Yum Soup"] },
      { name: "🇮🇳 Indian", desc: "biryani, butter chicken, dosa", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", recipes: ["Butter Chicken", "Palak Paneer", "Garlic Naan"] },
      { name: "🇰🇷 Korean", desc: "kimchi, bibimbap, BBQ", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80", recipes: ["Bibimbap", "Korean BBQ", "Kimchi Jjigae"] },
      { name: "🇻🇳 Vietnamese", desc: "pho, banh mi", img: "https://images.unsplash.com/photo-1582878826629-33b7f57b2a3c?w=400&q=80", recipes: ["Pho Bo", "Banh Mi", "Fresh Spring Rolls"] },
      { name: "🇮🇩 Indonesian", desc: "nasi goreng, satay", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", recipes: ["Nasi Goreng", "Chicken Satay", "Gado Gado"] },
      { name: "🇵🇭 Filipino", desc: "adobo, lechon", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", recipes: ["Chicken Adobo", "Lechon", "Sinigang"] },
    ]
  },
  {
    name: "🌍 European Cuisines",
    color: "#4A7C59",
    cuisines: [
      { name: "🇮🇹 Italian", desc: "pasta, pizza, risotto", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80", recipes: ["Spaghetti Carbonara", "Margherita Pizza", "Tiramisu"] },
      { name: "🇫🇷 French", desc: "croissants, coq au vin", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", recipes: ["Coq au Vin", "Croissants", "French Onion Soup"] },
      { name: "🇪🇸 Spanish", desc: "paella, tapas", img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&q=80", recipes: ["Paella", "Gazpacho", "Churros"] },
      { name: "🇬🇷 Greek", desc: "moussaka, souvlaki", img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80", recipes: ["Moussaka", "Greek Salad", "Spanakopita"] },
      { name: "🇹🇷 Turkish", desc: "kebabs, baklava", img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80", recipes: ["Kebab Platter", "Baklava", "Turkish Breakfast"] },
      { name: "🇩🇪 German", desc: "sausages, schnitzel", img: "https://images.unsplash.com/photo-1599921841143-819065a55cc5?w=400&q=80", recipes: ["Wiener Schnitzel", "Bratwurst", "Pretzels"] },
      { name: "🇬🇧 British", desc: "fish and chips, pies", img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80", recipes: ["Fish & Chips", "Shepherd's Pie", "Sticky Toffee Pudding"] },
    ]
  },
  {
    name: "🌎 American Cuisines",
    color: "#C9922A",
    cuisines: [
      { name: "🇺🇸 American", desc: "burgers, BBQ", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", recipes: ["BBQ Ribs", "Clam Chowder", "Mac & Cheese"] },
      { name: "🇲🇽 Mexican", desc: "tacos, enchiladas", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80", recipes: ["Chicken Tacos", "Guacamole", "Enchiladas Verde"] },
      { name: "🇵🇪 Peruvian", desc: "ceviche, lomo saltado", img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80", recipes: ["Ceviche", "Lomo Saltado", "Causa Rellena"] },
      { name: "🇧🇷 Brazilian", desc: "feijoada, churrasco", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", recipes: ["Feijoada", "Pão de Queijo", "Brigadeiro"] },
      { name: "🇦🇷 Argentinian", desc: "asado, empanadas", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80", recipes: ["Asado BBQ", "Beef Empanadas", "Dulce de Leche Cake"] },
    ]
  },
  {
    name: "🌍 Middle Eastern Cuisines",
    color: "#8B4513",
    cuisines: [
      { name: "🇴🇲 Omani", desc: "shuwa, majboos", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80", recipes: ["Shuwa Lamb", "Chicken Majboos", "Omani Halwa"] },
      { name: "🇱🇧 Lebanese", desc: "hummus, shawarma", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80", recipes: ["Hummus & Pita", "Shawarma", "Tabbouleh"] },
      { name: "🇮🇷 Iranian", desc: "kebabs, saffron rice", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80", recipes: ["Joojeh Kebab", "Ghormeh Sabzi", "Saffron Rice"] },
      { name: "🇮🇱 Israeli", desc: "falafel, shakshouka", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", recipes: ["Falafel", "Shakshouka", "Israeli Salad"] },
    ]
  },
  {
    name: "🌍 African Cuisines",
    color: "#2E7D32",
    cuisines: [
      { name: "🇲🇦 Moroccan", desc: "tagine, couscous", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80", recipes: ["Lamb Tagine", "Couscous Royale", "Harira Soup"] },
      { name: "🇪🇹 Ethiopian", desc: "injera, doro wat", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", recipes: ["Injera with Doro Wat", "Misir Wot", "Kitfo"] },
      { name: "🇿🇦 South African", desc: "braai, bobotie", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", recipes: ["Braai BBQ", "Bobotie", "Malva Pudding"] },
      { name: "🇳🇬 Nigerian", desc: "jollof rice, egusi soup", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", recipes: ["Jollof Rice", "Egusi Soup", "Suya Skewers"] },
    ]
  },
  {
    name: "🌏 Oceania Cuisines",
    color: "#0277BD",
    cuisines: [
      { name: "🇦🇺 Australian", desc: "modern fusion, seafood", img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80", recipes: ["Grilled Barramundi", "Meat Pie", "Pavlova"] },
      { name: "🇳🇿 New Zealand", desc: "lamb, pavlova", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80", recipes: ["Roast Lamb", "Pavlova", "Hangi Feast"] },
    ]
  },
];
const categories = continents.flatMap(c => c.cuisines.map(cu => ({...cu, count: Math.floor(Math.random()*200+80) + " recipes"})));

const trending = [
  { title: "Spicy Mango Chicken Tacos", chef: "Chef Aria Voss", time: "25 min", difficulty: "easy", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80", ingredients: ["Chicken thighs", "Fresh mango", "Lime juice", "Jalapeño", "Corn tortillas", "Cilantro", "Sour cream"], steps: ["Marinate chicken in lime, chili, and mango juice for 15 mins.", "Grill chicken on high heat for 5-6 mins per side until charred.", "Dice fresh mango and mix with cilantro and lime for salsa.", "Warm tortillas and assemble with chicken, mango salsa, and sour cream."] },
  { title: "Roasted Tomato Bisque", chef: "Chef Marco Lin", time: "40 min", difficulty: "easy", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", ingredients: ["Ripe tomatoes", "Garlic cloves", "Heavy cream", "Basil leaves", "Onion", "Olive oil", "Vegetable broth"], steps: ["Roast tomatoes and garlic at 200°C for 25 mins.", "Sauté onions in olive oil until golden.", "Blend roasted tomatoes with sautéed onions and broth.", "Stir in cream and fresh basil, season to taste."] },
  { title: "Lamb Tagine with Couscous", chef: "Chef Nadia Osei", time: "1h 20min", difficulty: "medium", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80", ingredients: ["Lamb shoulder", "Apricots", "Chickpeas", "Ras el hanout", "Onion", "Couscous", "Cilantro"], steps: ["Brown lamb pieces in batches with spices.", "Add onions, apricots, chickpeas and stock to pot.", "Simmer on low heat for 1 hour until tender.", "Serve over fluffy couscous with fresh cilantro."] },
  { title: "Japanese Katsu Curry", chef: "Chef Kenji Mori", time: "50 min", difficulty: "medium", img: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=400&q=80", ingredients: ["Pork cutlets", "Curry roux blocks", "Potato", "Carrot", "Onion", "Panko breadcrumbs", "Steamed rice"], steps: ["Bread pork cutlets in flour, egg, and panko.", "Deep fry at 170°C for 4-5 mins until golden.", "Simmer curry with veggies and roux blocks.", "Slice katsu and serve over rice with curry sauce."] },
  { title: "Caramel Lava Cake", chef: "Chef Elise Blanc", time: "30 min", difficulty: "hard", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80", ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour", "Caramel sauce", "Vanilla"], steps: ["Melt chocolate and butter together gently.", "Whisk eggs and sugar until pale and fluffy.", "Fold in chocolate mixture and flour carefully.", "Bake at 200°C for exactly 12 mins — center stays molten."] },
  { title: "Summer Panzanella Salad", chef: "Chef Giulia Rossi", time: "15 min", difficulty: "easy", img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80", ingredients: ["Ciabatta bread", "Heirloom tomatoes", "Cucumber", "Red onion", "Basil", "Olive oil", "Red wine vinegar"], steps: ["Toast bread cubes in olive oil until golden.", "Chop tomatoes, cucumber, and onion.", "Toss everything with olive oil and red wine vinegar.", "Let sit for 10 mins so bread absorbs the juices."] },
];

const chefs = [
  { name: "Aria Voss", specialty: "Modern Fusion", followers: "2.4M", dish: "🌶 Signature: Miso Glazed Duck", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&q=80", bio: "Chef Aria Voss trained in Tokyo and Paris before bringing her unique East-meets-West philosophy to the world stage. Known for bold flavors and unexpected ingredient pairings, her cooking challenges conventions and delights palates.", recipes: 142, awards: 8 },
  { name: "Marco Lin", specialty: "Italian Heritage", followers: "1.8M", dish: "🍝 Signature: Truffle Carbonara", img: "https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?w=200&q=80", bio: "Born in Bologna to a family of restaurateurs, Chef Marco Lin carries four generations of Italian culinary wisdom. His philosophy is simple: great ingredients, perfect technique, and lots of love.", recipes: 98, awards: 5 },
  { name: "Nadia Osei", specialty: "West African", followers: "950K", dish: "🍲 Signature: Suya Spiced Lamb", img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=200&q=80", bio: "Chef Nadia Osei is on a mission to bring West African cuisine to the global fine dining scene. Growing up in Accra, she learned to cook from her grandmother and later trained at Le Cordon Bleu.", recipes: 76, awards: 4 },
  { name: "Kenji Mori", specialty: "Japanese Cuisine", followers: "3.1M", dish: "🍱 Signature: Wagyu Ramen", img: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&q=80", bio: "Chef Kenji Mori is Japan's most-followed culinary personality. A master of both traditional washoku and modern Japanese gastronomy, he has earned three Michelin stars across his restaurants.", recipes: 215, awards: 12 },
];

const shows = [
  { title: "Fusion Kitchen Battle", episodes: "Season 2 · 12 Episodes", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
  { title: "Street Food Chronicles", episodes: "Season 3 · 8 Episodes", img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80" },
  { title: "The Pastry Lab", episodes: "Season 1 · 10 Episodes", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80" },
];

const blogs = [
  { category: "Food Science", title: "Why Your Pasta Water Is the Secret Ingredient You're Ignoring", date: "Mar 8, 2026", read: "4 min read", img: "https://images.unsplash.com/photo-1551183053-bf91798d047e?w=400&q=80" },
  { category: "Technique", title: "The Art of Perfect Caramelization: A Deep Dive", date: "Mar 5, 2026", read: "6 min read", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80" },
  { category: "Trends", title: "10 Global Ingredients That Are Redefining Modern Cooking", date: "Mar 2, 2026", read: "5 min read", img: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&q=80" },
];

const indianCuisineData = [
  {
    "dish_name": "Samosa",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Appetizers",
    "difficulty_level": "medium",
    "prep_time_minutes": 30,
    "cook_time_minutes": 20,
    "servings": 4,
    "ingredients": [
      {
        "name": "All-purpose flour",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Potatoes",
        "quantity": "3",
        "unit": "medium"
      },
      {
        "name": "Green peas",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Garam masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      }
    ],
    "preparation_steps": [
      "Make a stiff dough with flour, oil, ajwain and salt. Rest for 20 minutes.",
      "Boil and mash potatoes. Saut\u00e9 with cumin, peas, ginger, chili and spices.",
      "Roll dough into thin circles, cut in half, shape into cones and fill with potato mixture.",
      "Seal edges with water and deep fry on medium heat until golden brown.",
      "Serve hot with mint chutney and tamarind sauce."
    ],
    "chef_notes": "Ensure oil temperature is 160\u00b0C for crispy samosas. Don't overcrowd the pan.",
    "serving_suggestions": "Serve with green chutney and tamarind chutney.",
    "flavor_profile": [
      "savory",
      "spicy"
    ],
    "dietary_tags": [
      "vegetarian",
      "vegan"
    ],
    "image_prompt": "Ultra realistic professional food photography of golden crispy Indian samosas, beautifully plated on a rustic wooden board with green mint chutney, natural lighting, high-end restaurant presentation, shallow depth of field",
    "img": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80"
  },
  {
    "dish_name": "Paneer Tikka",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Appetizers",
    "difficulty_level": "easy",
    "prep_time_minutes": 40,
    "cook_time_minutes": 15,
    "servings": 4,
    "ingredients": [
      {
        "name": "Paneer",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Yogurt",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Tandoori masala",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Bell peppers",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Kashmiri red chili",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Mix yogurt, tandoori masala, lemon juice, ginger-garlic paste and Kashmiri chili.",
      "Marinate paneer and vegetables in the mixture for at least 2 hours.",
      "Thread onto skewers alternating paneer, peppers and onion.",
      "Grill on high heat or broil for 10-12 minutes turning once.",
      "Serve with sliced onions, lemon wedges and mint chutney."
    ],
    "chef_notes": "Use hung curd (strained yogurt) for better coating. Charred edges add authentic tandoor flavor.",
    "serving_suggestions": "Serve as a starter with green chutney and sliced onion rings.",
    "flavor_profile": [
      "smoky",
      "spicy",
      "savory"
    ],
    "dietary_tags": [
      "vegetarian",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic professional food photography of smoky charred paneer tikka on skewers, vibrant orange marinade, served with colorful bell peppers, editorial food magazine style, dark background",
    "img": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80"
  },
  {
    "dish_name": "Aloo Tikki",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Appetizers",
    "difficulty_level": "easy",
    "prep_time_minutes": 20,
    "cook_time_minutes": 15,
    "servings": 4,
    "ingredients": [
      {
        "name": "Potatoes",
        "quantity": "4",
        "unit": "large"
      },
      {
        "name": "Bread crumbs",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Cumin powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Coriander leaves",
        "quantity": "0.25",
        "unit": "cup"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Amchur powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Boil, peel and mash potatoes until smooth.",
      "Mix in breadcrumbs, spices, chopped coriander and green chili.",
      "Shape into round flat patties about 1cm thick.",
      "Shallow fry in oil on medium heat until golden and crispy on both sides.",
      "Serve hot topped with yogurt, chutneys and sev."
    ],
    "chef_notes": "Ensure potatoes are completely dry before mashing to prevent soggy tikkis.",
    "serving_suggestions": "Top with yogurt, tamarind chutney, mint chutney and crunchy sev.",
    "flavor_profile": [
      "savory",
      "tangy",
      "spicy"
    ],
    "dietary_tags": [
      "vegetarian",
      "vegan"
    ],
    "image_prompt": "Ultra realistic food photography of crispy golden aloo tikki chaat, topped with colorful chutneys and yogurt, street food style, vibrant colors, editorial magazine style",
    "img": "https://images.unsplash.com/photo-1630851840633-f96999247032?w=400&q=80"
  },
  {
    "dish_name": "Dahi Puri",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Appetizers",
    "difficulty_level": "easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 0,
    "servings": 4,
    "ingredients": [
      {
        "name": "Puri shells",
        "quantity": "20",
        "unit": "pieces"
      },
      {
        "name": "Yogurt",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Boiled potatoes",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Tamarind chutney",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Mint chutney",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Sev",
        "quantity": "0.5",
        "unit": "cup"
      }
    ],
    "preparation_steps": [
      "Whisk yogurt with sugar and a pinch of salt until smooth.",
      "Make a small hole on top of each puri shell.",
      "Fill with diced boiled potatoes and chickpeas.",
      "Pour whisked yogurt over each puri.",
      "Drizzle tamarind and mint chutney, sprinkle chaat masala and sev. Serve immediately."
    ],
    "chef_notes": "Assemble just before serving to keep puris crispy.",
    "serving_suggestions": "Serve immediately as a chaat appetizer.",
    "flavor_profile": [
      "tangy",
      "sweet",
      "spicy",
      "savory"
    ],
    "dietary_tags": [
      "vegetarian"
    ],
    "image_prompt": "Ultra realistic food photography of dahi puri chaat, crispy shells filled with yogurt and colorful chutneys, Indian street food, vibrant overhead shot",
    "img": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80"
  },
  {
    "dish_name": "Onion Bhaji",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Appetizers",
    "difficulty_level": "easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "servings": 4,
    "ingredients": [
      {
        "name": "Onions",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Chickpea flour",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Coriander leaves",
        "quantity": "0.25",
        "unit": "cup"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      }
    ],
    "preparation_steps": [
      "Thinly slice onions and mix with salt. Let rest 5 minutes.",
      "Add chickpea flour, spices and coriander. Mix well.",
      "Add minimal water to form a thick batter coating the onions.",
      "Drop spoonfuls into hot oil and fry until golden and crispy.",
      "Drain on paper towels and serve hot."
    ],
    "chef_notes": "The onion releases moisture naturally \u2014 add as little water as possible for crispier bhajis.",
    "serving_suggestions": "Serve with mint yogurt dip and a cup of masala chai.",
    "flavor_profile": [
      "savory",
      "spicy",
      "crispy"
    ],
    "dietary_tags": [
      "vegetarian",
      "vegan",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of crispy golden onion bhaji fritters, stacked on parchment paper, served with yogurt dip, rustic dark background, dramatic lighting",
    "img": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80"
  },
  {
    "dish_name": "Mulligatawny Soup",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Soups",
    "difficulty_level": "medium",
    "prep_time_minutes": 15,
    "cook_time_minutes": 35,
    "servings": 4,
    "ingredients": [
      {
        "name": "Red lentils",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Coconut milk",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Curry powder",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Apple",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Vegetable stock",
        "quantity": "4",
        "unit": "cups"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Garlic",
        "quantity": "3",
        "unit": "cloves"
      }
    ],
    "preparation_steps": [
      "Saut\u00e9 onion, garlic and ginger in butter until golden.",
      "Add curry powder and cook for 1 minute until fragrant.",
      "Add lentils, diced apple and vegetable stock. Bring to boil.",
      "Simmer for 25 minutes until lentils are completely soft.",
      "Blend until smooth, stir in coconut milk and adjust seasoning."
    ],
    "chef_notes": "The apple adds a subtle sweetness that balances the spices beautifully.",
    "serving_suggestions": "Serve with warm naan bread and a drizzle of cream.",
    "flavor_profile": [
      "savory",
      "spicy",
      "slightly sweet"
    ],
    "dietary_tags": [
      "vegetarian",
      "vegan",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of golden mulligatawny soup in a white bowl, cream swirl on top, fresh coriander garnish, elegant restaurant presentation",
    "img": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80"
  },
  {
    "dish_name": "Tomato Shorba",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Soups",
    "difficulty_level": "easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "servings": 4,
    "ingredients": [
      {
        "name": "Tomatoes",
        "quantity": "6",
        "unit": "large"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Garlic",
        "quantity": "4",
        "unit": "cloves"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Black pepper",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Fresh cream",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Roast tomatoes and garlic in oven at 200\u00b0C for 20 minutes.",
      "Saut\u00e9 onion with cumin seeds until golden.",
      "Blend roasted tomatoes, garlic and saut\u00e9ed onion.",
      "Strain through a fine sieve for smooth texture.",
      "Season with black pepper, garnish with cream and coriander."
    ],
    "chef_notes": "Roasting the tomatoes adds a deep smoky sweetness to the soup.",
    "serving_suggestions": "Serve in small cups as a starter with croutons.",
    "flavor_profile": [
      "savory",
      "tangy",
      "smoky"
    ],
    "dietary_tags": [
      "vegetarian",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of vibrant red tomato shorba soup, white cream swirl, fresh herb garnish, elegant white bowl, Indian fine dining",
    "img": "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&q=80"
  },
  {
    "dish_name": "Dal Shorba",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Soups",
    "difficulty_level": "easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "servings": 4,
    "ingredients": [
      {
        "name": "Yellow moong dal",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Ghee",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Wash and pressure cook moong dal with turmeric and water.",
      "Blend into a smooth liquid and strain.",
      "Prepare a tempering with ghee, cumin and ginger.",
      "Add tempering to the dal broth and simmer for 5 minutes.",
      "Finish with lemon juice and fresh coriander."
    ],
    "chef_notes": "This light, healing soup is perfect as a starter or for those feeling unwell.",
    "serving_suggestions": "Serve warm in small cups with a squeeze of lemon.",
    "flavor_profile": [
      "savory",
      "mild",
      "comforting"
    ],
    "dietary_tags": [
      "vegetarian",
      "vegan",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of golden dal shorba in a ceramic bowl, tempered with ghee and cumin, fresh coriander, warm natural lighting",
    "img": "https://images.unsplash.com/photo-1576577445504-6af96477db52?w=400&q=80"
  },
  {
    "dish_name": "Butter Chicken",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Main Courses",
    "difficulty_level": "medium",
    "prep_time_minutes": 30,
    "cook_time_minutes": 40,
    "servings": 4,
    "ingredients": [
      {
        "name": "Chicken thighs",
        "quantity": "800",
        "unit": "g"
      },
      {
        "name": "Butter",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Tomatoes",
        "quantity": "4",
        "unit": "large"
      },
      {
        "name": "Heavy cream",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Kashmiri chili powder",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Garam masala",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Kasuri methi",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Marinate chicken in yogurt, kashmiri chili, ginger-garlic paste overnight.",
      "Grill or pan-sear the chicken until charred. Set aside.",
      "Saut\u00e9 onions until golden, add tomatoes and cook until mushy.",
      "Blend the tomato base smooth. Return to pan with butter.",
      "Add grilled chicken, cream, kasuri methi and garam masala. Simmer 15 minutes."
    ],
    "chef_notes": "Kasuri methi (dried fenugreek) is the secret ingredient that gives butter chicken its distinctive flavor.",
    "serving_suggestions": "Serve with garlic naan, basmati rice and sliced onions.",
    "flavor_profile": [
      "creamy",
      "mildly spicy",
      "savory",
      "slightly sweet"
    ],
    "dietary_tags": [
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic professional food photography of rich creamy butter chicken in a copper bowl, vibrant orange sauce, garnished with cream swirl and fresh coriander, dark moody restaurant lighting",
    "img": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80"
  },
  {
    "dish_name": "Palak Paneer",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Main Courses",
    "difficulty_level": "medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 25,
    "servings": 4,
    "ingredients": [
      {
        "name": "Spinach",
        "quantity": "500",
        "unit": "g"
      },
      {
        "name": "Paneer",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Tomatoes",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Garam masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Cream",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Ghee",
        "quantity": "3",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Blanch spinach in boiling water for 2 minutes, then blend smooth.",
      "Fry paneer cubes in ghee until golden. Set aside.",
      "Saut\u00e9 onions, add ginger-garlic paste and tomatoes until oil separates.",
      "Add blended spinach, spices and simmer for 10 minutes.",
      "Add fried paneer and cream. Simmer for 5 minutes and serve."
    ],
    "chef_notes": "Blanching and immediately cooling spinach preserves its vibrant green color.",
    "serving_suggestions": "Serve with garlic naan or jeera rice.",
    "flavor_profile": [
      "earthy",
      "creamy",
      "savory",
      "mildly spicy"
    ],
    "dietary_tags": [
      "vegetarian",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of vibrant green palak paneer in a white bowl, golden paneer cubes, cream swirl on top, Indian restaurant presentation, natural lighting",
    "img": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80"
  },
  {
    "dish_name": "Lamb Rogan Josh",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Main Courses",
    "difficulty_level": "hard",
    "prep_time_minutes": 30,
    "cook_time_minutes": 90,
    "servings": 4,
    "ingredients": [
      {
        "name": "Lamb shoulder",
        "quantity": "800",
        "unit": "g"
      },
      {
        "name": "Yogurt",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Kashmiri chili",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Whole spices",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Onions",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Ginger",
        "quantity": "2",
        "unit": "inch"
      },
      {
        "name": "Fennel powder",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "4",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Marinate lamb in yogurt, chili and ginger for at least 4 hours.",
      "In a heavy pot, fry whole spices in ghee until fragrant.",
      "Brown the marinated lamb in batches until deeply colored.",
      "Add sliced onions and cook until caramelized.",
      "Add fennel, remaining spices and water. Slow cook for 1.5 hours until tender."
    ],
    "chef_notes": "Authentic Rogan Josh gets its deep red color from Kashmiri chilies, not tomatoes.",
    "serving_suggestions": "Serve with Kashmiri naan and saffron rice.",
    "flavor_profile": [
      "deeply spiced",
      "savory",
      "rich",
      "aromatic"
    ],
    "dietary_tags": [
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of deep red Kashmiri lamb rogan josh, rich aromatic sauce, served in a copper karahi, saffron rice on side, dramatic moody lighting",
    "img": "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&q=80"
  },
  {
    "dish_name": "Chicken Biryani",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Main Courses",
    "difficulty_level": "hard",
    "prep_time_minutes": 45,
    "cook_time_minutes": 60,
    "servings": 6,
    "ingredients": [
      {
        "name": "Basmati rice",
        "quantity": "3",
        "unit": "cups"
      },
      {
        "name": "Chicken pieces",
        "quantity": "1",
        "unit": "kg"
      },
      {
        "name": "Yogurt",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Saffron",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Whole spices",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Fried onions",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Fresh mint",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Ghee",
        "quantity": "4",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Marinate chicken with yogurt, spices, fried onions and mint for 2 hours.",
      "Parboil basmati rice with whole spices until 70% cooked.",
      "Layer marinated chicken in a heavy-bottomed pot.",
      "Layer parboiled rice over chicken, top with saffron milk and ghee.",
      "Seal with dough or foil and cook on dum (slow steam) for 40 minutes."
    ],
    "chef_notes": "The dum cooking process (sealed slow steam) is what creates authentic biryani.",
    "serving_suggestions": "Serve with raita, mirchi ka salan and sliced onion salad.",
    "flavor_profile": [
      "aromatic",
      "savory",
      "spiced",
      "rich"
    ],
    "dietary_tags": [
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic professional food photography of fragrant chicken biryani, golden saffron rice with whole spices, served on a large platter, garnished with fried onions and mint, stunning presentation",
    "img": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80"
  },
  {
    "dish_name": "Garlic Naan",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Breads",
    "difficulty_level": "medium",
    "prep_time_minutes": 90,
    "cook_time_minutes": 10,
    "servings": 4,
    "ingredients": [
      {
        "name": "All-purpose flour",
        "quantity": "3",
        "unit": "cups"
      },
      {
        "name": "Yeast",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Yogurt",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Garlic",
        "quantity": "6",
        "unit": "cloves"
      },
      {
        "name": "Butter",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Coriander leaves",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Sugar",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Mix flour, yeast, sugar, salt and yogurt. Knead into soft dough.",
      "Let dough rise for 1 hour in a warm place until doubled.",
      "Divide into balls, roll into oval shapes.",
      "Cook in a very hot cast iron pan or tandoor until bubbled and slightly charred.",
      "Brush immediately with garlic butter and fresh coriander."
    ],
    "chef_notes": "A cast iron skillet on high heat mimics a tandoor beautifully at home.",
    "serving_suggestions": "Serve hot with any curry \u2014 especially butter chicken.",
    "flavor_profile": [
      "buttery",
      "garlicky",
      "slightly charred"
    ],
    "dietary_tags": [
      "vegetarian"
    ],
    "image_prompt": "Ultra realistic food photography of freshly baked garlic naan with charred spots, glistening with garlic butter and fresh coriander, dark rustic background, steam rising",
    "img": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=80"
  },
  {
    "dish_name": "Paratha",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Breads",
    "difficulty_level": "easy",
    "prep_time_minutes": 20,
    "cook_time_minutes": 20,
    "servings": 4,
    "ingredients": [
      {
        "name": "Whole wheat flour",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Butter or ghee",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Water",
        "quantity": "0.75",
        "unit": "cup"
      },
      {
        "name": "Aloo filling (optional)",
        "quantity": "2",
        "unit": "cups"
      }
    ],
    "preparation_steps": [
      "Knead wheat flour with salt and water into a soft pliable dough.",
      "Roll into circles, spread ghee, fold into layers and re-roll.",
      "Cook on a hot griddle until brown spots appear on both sides.",
      "Apply generous amount of butter or ghee and serve hot.",
      "For stuffed paratha, fill with spiced potato mixture before folding."
    ],
    "chef_notes": "The layering technique creates flaky, buttery layers in the paratha.",
    "serving_suggestions": "Serve with yogurt, pickle and fresh white butter.",
    "flavor_profile": [
      "buttery",
      "nutty",
      "savory"
    ],
    "dietary_tags": [
      "vegetarian"
    ],
    "image_prompt": "Ultra realistic food photography of golden flaky paratha on a plate with ghee melting on top, served with pickle and yogurt, warm morning light, rustic Indian breakfast setting",
    "img": "https://images.unsplash.com/photo-1620921568790-c1cf8e1b4314?w=400&q=80"
  },
  {
    "dish_name": "Puri",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Breads",
    "difficulty_level": "easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "servings": 4,
    "ingredients": [
      {
        "name": "Whole wheat flour",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Water",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Oil",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Knead flour with oil, salt and water into a stiff dough.",
      "Divide into small balls and roll into thin circles.",
      "Heat oil to 180\u00b0C in a deep pan.",
      "Fry puris one at a time, gently pressing to help them puff up.",
      "Remove when golden and puffed. Serve immediately."
    ],
    "chef_notes": "Press lightly on the puri while frying to help it puff up evenly.",
    "serving_suggestions": "Serve with aloo sabzi, halwa or chana masala.",
    "flavor_profile": [
      "crispy",
      "nutty",
      "savory"
    ],
    "dietary_tags": [
      "vegetarian",
      "vegan"
    ],
    "image_prompt": "Ultra realistic food photography of golden puffed puri breads, beautifully stacked, served with aloo sabzi, Indian breakfast style, warm golden light",
    "img": "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&q=80"
  },
  {
    "dish_name": "Vegetable Biryani",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Rice Preparations",
    "difficulty_level": "medium",
    "prep_time_minutes": 30,
    "cook_time_minutes": 45,
    "servings": 4,
    "ingredients": [
      {
        "name": "Basmati rice",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Mixed vegetables",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Whole spices",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Saffron",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Fried onions",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Yogurt",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Ghee",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Fresh mint",
        "quantity": "0.25",
        "unit": "cup"
      }
    ],
    "preparation_steps": [
      "Parboil basmati rice with whole spices until 70% done.",
      "Saut\u00e9 vegetables with yogurt and biryani masala.",
      "Layer vegetables at bottom of pot.",
      "Layer rice on top with saffron milk and fried onions.",
      "Seal and cook on dum for 30 minutes on low heat."
    ],
    "chef_notes": "Use aged basmati rice for best results \u2014 each grain stays separate.",
    "serving_suggestions": "Serve with raita and papad.",
    "flavor_profile": [
      "aromatic",
      "mildly spiced",
      "savory"
    ],
    "dietary_tags": [
      "vegetarian",
      "vegan",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of fragrant vegetable biryani, colorful vegetables and saffron rice, garnished with fried onions and mint, served in a traditional handi",
    "img": "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80"
  },
  {
    "dish_name": "Jeera Rice",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Rice Preparations",
    "difficulty_level": "easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "servings": 4,
    "ingredients": [
      {
        "name": "Basmati rice",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Cumin seeds",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Bay leaf",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Water",
        "quantity": "3.5",
        "unit": "cups"
      }
    ],
    "preparation_steps": [
      "Wash and soak basmati rice for 20 minutes.",
      "Heat ghee in a pan and add cumin seeds and bay leaf.",
      "When cumin splutters, add drained rice and saut\u00e9 for 2 minutes.",
      "Add water and salt, bring to boil.",
      "Cover and cook on low heat for 15 minutes until done."
    ],
    "chef_notes": "Soaking the rice ensures each grain cooks evenly and stays long and fluffy.",
    "serving_suggestions": "Serve with any dal or curry.",
    "flavor_profile": [
      "nutty",
      "aromatic",
      "savory"
    ],
    "dietary_tags": [
      "vegetarian",
      "vegan",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of fluffy jeera rice with golden cumin seeds, served in a white bowl, garnished with coriander, clean elegant presentation",
    "img": "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80"
  },
  {
    "dish_name": "Gulab Jamun",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Desserts",
    "difficulty_level": "medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "servings": 6,
    "ingredients": [
      {
        "name": "Milk powder",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "All-purpose flour",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Rose water",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cardamom",
        "quantity": "4",
        "unit": "pods"
      },
      {
        "name": "Ghee",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      }
    ],
    "preparation_steps": [
      "Make sugar syrup with water, sugar, rose water and cardamom. Simmer 5 minutes.",
      "Mix milk powder, flour and ghee. Add enough milk to make soft dough.",
      "Roll into smooth balls without cracks.",
      "Deep fry on very low heat until deep brown \u2014 about 8 minutes.",
      "Immediately drop into warm sugar syrup. Soak for at least 30 minutes."
    ],
    "chef_notes": "Fry on very low heat for an evenly browned center. Rushing leads to raw centers.",
    "serving_suggestions": "Serve warm with vanilla ice cream or rabri.",
    "flavor_profile": [
      "sweet",
      "floral",
      "cardamom"
    ],
    "dietary_tags": [
      "vegetarian"
    ],
    "image_prompt": "Ultra realistic food photography of golden-brown gulab jamun soaked in rose syrup, served in a white bowl with saffron strands, Indian mithai style, warm glow",
    "img": "https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80"
  },
  {
    "dish_name": "Kheer",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Desserts",
    "difficulty_level": "easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 60,
    "servings": 6,
    "ingredients": [
      {
        "name": "Full fat milk",
        "quantity": "1",
        "unit": "litre"
      },
      {
        "name": "Basmati rice",
        "quantity": "0.25",
        "unit": "cup"
      },
      {
        "name": "Sugar",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Cardamom",
        "quantity": "4",
        "unit": "pods"
      },
      {
        "name": "Saffron",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Pistachios",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Rose water",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Bring milk to a boil in a heavy-bottomed pan.",
      "Add washed rice and cook on medium heat, stirring frequently.",
      "Cook for 45-50 minutes until milk thickens and rice is fully cooked.",
      "Add sugar, cardamom, saffron and rose water. Stir well.",
      "Serve warm or chilled, garnished with pistachios and saffron strands."
    ],
    "chef_notes": "Constant stirring prevents the milk from scorching at the bottom.",
    "serving_suggestions": "Serve chilled as a festive dessert garnished with nuts.",
    "flavor_profile": [
      "sweet",
      "creamy",
      "floral",
      "cardamom"
    ],
    "dietary_tags": [
      "vegetarian",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of creamy Indian kheer rice pudding in an elegant silver bowl, garnished with saffron strands, crushed pistachios and rose petals, festive presentation",
    "img": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80"
  },
  {
    "dish_name": "Rasgulla",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Desserts",
    "difficulty_level": "hard",
    "prep_time_minutes": 30,
    "cook_time_minutes": 30,
    "servings": 6,
    "ingredients": [
      {
        "name": "Full fat milk",
        "quantity": "1",
        "unit": "litre"
      },
      {
        "name": "Lemon juice",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Water",
        "quantity": "4",
        "unit": "cups"
      },
      {
        "name": "Rose water",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Cardamom",
        "quantity": "3",
        "unit": "pods"
      }
    ],
    "preparation_steps": [
      "Boil milk and add lemon juice to curdle. Drain through muslin cloth.",
      "Rinse the chenna (paneer) under cold water to remove lemon flavor.",
      "Knead chenna for 10 minutes until smooth and no longer grainy.",
      "Roll into smooth balls. Prepare sugar syrup in a wide pan.",
      "Cook chenna balls in boiling syrup covered for 15-20 minutes. They will double in size."
    ],
    "chef_notes": "Kneading the chenna until perfectly smooth is the key to spongy rasgullas.",
    "serving_suggestions": "Serve chilled in sugar syrup with a hint of rose water.",
    "flavor_profile": [
      "sweet",
      "light",
      "floral",
      "spongy"
    ],
    "dietary_tags": [
      "vegetarian",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of white spongy rasgulla Bengali sweet in clear sugar syrup, served in a glass bowl, elegant dessert presentation, soft lighting",
    "img": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80"
  },
  {
    "dish_name": "Masala Chai",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Beverages",
    "difficulty_level": "easy",
    "prep_time_minutes": 2,
    "cook_time_minutes": 8,
    "servings": 2,
    "ingredients": [
      {
        "name": "Water",
        "quantity": "1.5",
        "unit": "cups"
      },
      {
        "name": "Milk",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Black tea leaves",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "0.5",
        "unit": "inch"
      },
      {
        "name": "Cardamom pods",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Cinnamon stick",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Black pepper",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Lightly crush cardamom, black pepper and cinnamon with a mortar.",
      "Bring water to boil with crushed spices and ginger.",
      "Add tea leaves and simmer for 2 minutes.",
      "Add milk and sugar, bring to a full boil.",
      "Strain into cups and serve hot."
    ],
    "chef_notes": "The longer the spices steep, the more aromatic the chai. Adjust milk-to-water ratio to taste.",
    "serving_suggestions": "Serve with paratha, samosa or biscuits.",
    "flavor_profile": [
      "spiced",
      "sweet",
      "aromatic",
      "warming"
    ],
    "dietary_tags": [
      "vegetarian",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of steaming masala chai in a glass cup on a saucer, warm amber color, spices visible, cozy morning light, Indian tea house atmosphere",
    "img": "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80"
  },
  {
    "dish_name": "Mango Lassi",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Beverages",
    "difficulty_level": "easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 0,
    "servings": 2,
    "ingredients": [
      {
        "name": "Ripe mangoes",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Yogurt",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Milk",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Ice cubes",
        "quantity": "6",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Peel and chop ripe mangoes.",
      "Blend mango with yogurt, milk, sugar and cardamom.",
      "Add ice cubes and blend until smooth and frothy.",
      "Pour into tall glasses.",
      "Garnish with a small piece of mango and a pinch of cardamom."
    ],
    "chef_notes": "Alphonso or Kesar mangoes give the best flavor and natural sweetness.",
    "serving_suggestions": "Serve chilled as a refreshing summer drink.",
    "flavor_profile": [
      "sweet",
      "fruity",
      "creamy",
      "tropical"
    ],
    "dietary_tags": [
      "vegetarian",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of golden mango lassi in a tall glass, frothy top, mango garnish, condensation on glass, vibrant tropical setting, bright natural light",
    "img": "https://images.unsplash.com/photo-1527904324834-3bda86da6771?w=400&q=80"
  },
  {
    "dish_name": "Rose Sharbat",
    "cuisine": "Indian",
    "country_of_origin": "India",
    "category": "Beverages",
    "difficulty_level": "easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 0,
    "servings": 2,
    "ingredients": [
      {
        "name": "Rose syrup",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Cold milk",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Basil seeds (sabja)",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Ice cubes",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Rose petals",
        "quantity": "few",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Soak basil seeds in water for 10 minutes until they swell.",
      "Add rose syrup to cold milk and stir well.",
      "Add soaked basil seeds and ice cubes.",
      "Pour into glasses and garnish with rose petals.",
      "Serve immediately while cold."
    ],
    "chef_notes": "Basil seeds (sabja) add a lovely texture and cooling properties.",
    "serving_suggestions": "Serve as a cooling summer drink.",
    "flavor_profile": [
      "floral",
      "sweet",
      "cooling"
    ],
    "dietary_tags": [
      "vegetarian",
      "gluten-free"
    ],
    "image_prompt": "Ultra realistic food photography of pink rose sharbat in a glass, floating basil seeds, fresh rose petals garnish, bright refreshing summer drink photography",
    "img": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80"
  }
];

const maharashtraCuisineData = [
  {
    "seo_title": "Authentic Maharashtrian Katachi Amti Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/katachi-amti",
    "dish_name": "Katachi Amti",
    "state": "Maharashtra",
    "category": "Soups",
    "difficulty_level": "Medium",
    "prep_time_minutes": 15,
    "cook_time_minutes": 30,
    "total_time_minutes": 45,
    "servings": 4,
    "short_description": "Katachi Amti is a deeply flavored, spiced lentil soup made from the water left after cooking chana dal. A staple of Maharashtrian Puran Poli meals, it is tempered with coconut, tamarind, and a unique goda masala that gives it its signature sweet-spicy depth.",
    "ingredients": [
      {
        "name": "Chana dal cooking water",
        "quantity": "500",
        "unit": "ml"
      },
      {
        "name": "Goda masala",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Tamarind pulp",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Jaggery",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Coconut, grated",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Dried red chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Ghee",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Collect the water drained from cooked chana dal and keep aside.",
      "Heat ghee in a pan and add mustard seeds. Let them splutter.",
      "Add dried red chilies and curry leaves. Fry for 30 seconds.",
      "Add tamarind pulp, jaggery and turmeric. Stir well.",
      "Pour in the chana dal water and bring to a boil.",
      "Add goda masala and grated coconut. Simmer for 15 minutes.",
      "Adjust salt and serve hot alongside Puran Poli."
    ],
    "chef_notes": "Goda masala is the soul of this recipe. Do not substitute with regular garam masala as the flavor profile is completely different. The balance of tamarind sourness and jaggery sweetness is key.",
    "serving_suggestions": "Traditionally served as part of a Puran Poli thali. Also pairs well with plain rice and a drizzle of ghee.",
    "nutrition_estimate": {
      "calories": "145",
      "protein_g": "6",
      "carbohydrates_g": "18",
      "fat_g": "5"
    },
    "tags": [
      "Traditional",
      "Vegetarian",
      "Festival Food",
      "Maharashtrian"
    ],
    "image_prompt": "Ultra realistic professional food photography of authentic Maharashtrian Katachi Amti, golden spiced lentil soup in a traditional copper bowl, vibrant turmeric color, garnished with curry leaves and grated coconut, rustic wooden table, soft natural window lighting, editorial food magazine style",
    "seo_keywords": [
      "katachi amti recipe",
      "maharashtrian soup",
      "chana dal soup",
      "puran poli thali",
      "goda masala recipe"
    ],
    "img": "/images/india/maharashtra/soups/katachi-amti-maharashtrian-soup.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Drumstick Soup Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/drumstick-soup",
    "dish_name": "Shevgyachya Shengachi Soup",
    "state": "Maharashtra",
    "category": "Soups",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": 4,
    "short_description": "A light, nutritious soup made with tender drumstick pods, tomatoes and mild spices. This humble Maharashtrian comfort soup is rich in iron and vitamins and is commonly made in rural households across the state.",
    "ingredients": [
      {
        "name": "Drumstick pods",
        "quantity": "4",
        "unit": "pieces"
      },
      {
        "name": "Tomatoes",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Garlic",
        "quantity": "4",
        "unit": "cloves"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Black pepper",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Fresh coriander",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Cut drumstick pods into 5cm pieces and boil in salted water until tender.",
      "Saut\u00e9 onion and garlic in oil with cumin seeds until golden.",
      "Add chopped tomatoes and cook until mushy.",
      "Add boiled drumstick pieces and 500ml water.",
      "Simmer for 15 minutes and blend slightly for a semi-thick consistency.",
      "Season with black pepper and salt. Garnish with coriander."
    ],
    "chef_notes": "Scrape the flesh from drumstick pieces while eating \u2014 the fibrous outer shell is not consumed. A squeeze of lime brightens the flavor beautifully.",
    "serving_suggestions": "Serve as a light starter or a healthy evening soup with crusty bread.",
    "nutrition_estimate": {
      "calories": "85",
      "protein_g": "3",
      "carbohydrates_g": "12",
      "fat_g": "3"
    },
    "tags": [
      "Healthy",
      "Vegetarian",
      "Gluten-Free",
      "Rural Maharashtra"
    ],
    "image_prompt": "Ultra realistic professional food photography of Maharashtrian drumstick soup in a white ceramic bowl, green drumstick pieces visible, light golden broth, fresh coriander garnish, natural window lighting, clean minimal food styling",
    "seo_keywords": [
      "drumstick soup recipe",
      "shevgyachi soup",
      "maharashtrian healthy soup",
      "moringa soup indian"
    ],
    "img": "/images/india/maharashtra/soups/shevgyachya-shengachi-maharashtrian-soup.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Tomato Saar Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/tomato-saar",
    "dish_name": "Tomato Saar",
    "state": "Maharashtra",
    "category": "Soups",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": 4,
    "short_description": "Tomato Saar is a thin, tangy and spiced tomato broth that is a beloved part of Maharashtrian thali. Made with ripe tomatoes, coconut milk and aromatic spices, it is the perfect light soup to begin a meal.",
    "ingredients": [
      {
        "name": "Ripe tomatoes",
        "quantity": "500",
        "unit": "g"
      },
      {
        "name": "Coconut milk",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Garlic",
        "quantity": "5",
        "unit": "cloves"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Ghee",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Jaggery",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Boil tomatoes until soft and blend into a smooth puree. Strain.",
      "Heat ghee, add mustard seeds and curry leaves.",
      "Add crushed garlic, ginger and green chili. Saut\u00e9 briefly.",
      "Pour in tomato puree and coconut milk. Stir well.",
      "Add jaggery and salt. Simmer for 10 minutes.",
      "Serve piping hot as a soup or alongside rice."
    ],
    "chef_notes": "The jaggery balances the acidity of tomatoes. Coconut milk makes it creamy without being heavy. Use fresh coconut milk for best results.",
    "serving_suggestions": "Serve in small cups as a starter or with steamed rice as a light meal.",
    "nutrition_estimate": {
      "calories": "110",
      "protein_g": "2",
      "carbohydrates_g": "14",
      "fat_g": "6"
    },
    "tags": [
      "Vegetarian",
      "Gluten-Free",
      "Traditional",
      "Thali"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian tomato saar in a traditional brass cup, vibrant red color, swirl of coconut milk, curry leaf garnish, rustic Indian kitchen background, warm natural light",
    "seo_keywords": [
      "tomato saar recipe",
      "maharashtrian tomato soup",
      "kokani saar",
      "indian tomato broth"
    ],
    "img": "/images/india/maharashtra/soups/tomato-saar-maharashtrian-soup.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kokum Saar Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/kokum-saar",
    "dish_name": "Kokum Saar",
    "state": "Maharashtra",
    "category": "Soups",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": 4,
    "short_description": "Kokum Saar is a cooling, digestive soup from the Konkan coast of Maharashtra. Made with kokum (dried purple mangosteen), coconut milk and minimal spices, it is light, tangy and deeply refreshing.",
    "ingredients": [
      {
        "name": "Dried kokum",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Coconut milk",
        "quantity": "250",
        "unit": "ml"
      },
      {
        "name": "Jaggery",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Cumin powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Fresh coriander",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Soak kokum in 300ml warm water for 15 minutes. Squeeze and extract the juice.",
      "Combine kokum water with coconut milk in a pan.",
      "Add jaggery, green chili, cumin powder and salt.",
      "Heat gently without boiling \u2014 do not boil coconut milk.",
      "Strain and serve garnished with fresh coriander."
    ],
    "chef_notes": "Never boil this saar vigorously as coconut milk will split. It is meant to be a delicate, cooling broth. Best served at the end of a heavy Konkan meal as a digestive.",
    "serving_suggestions": "Serve chilled or warm as a digestive after a heavy meal. Pairs beautifully with Konkani fish curry and rice.",
    "nutrition_estimate": {
      "calories": "95",
      "protein_g": "1",
      "carbohydrates_g": "12",
      "fat_g": "5"
    },
    "tags": [
      "Konkan",
      "Vegan",
      "Digestive",
      "Coastal Maharashtra"
    ],
    "image_prompt": "Ultra realistic food photography of Kokum Saar in a small clay pot, deep purple-pink color, coconut milk swirl, fresh coriander, coastal Konkan setting, warm golden light, traditional banana leaf under the pot",
    "seo_keywords": [
      "kokum saar recipe",
      "konkan soup",
      "kokum coconut milk soup",
      "maharashtra cooling drink"
    ],
    "img": "/images/india/maharashtra/soups/kokum-saar-maharashtrian-soup.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Chicken Rassa Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/chicken-rassa",
    "dish_name": "Chicken Rassa",
    "state": "Maharashtra",
    "category": "Soups",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 40,
    "total_time_minutes": 60,
    "servings": 4,
    "short_description": "Chicken Rassa is a fiery, thin-gravy chicken curry-soup from Vidarbha and Kolhapur regions of Maharashtra. Made with a distinctive red masala base and a watery consistency, it is more soup than curry and is devoured with bhakri.",
    "ingredients": [
      {
        "name": "Chicken pieces",
        "quantity": "500",
        "unit": "g"
      },
      {
        "name": "Onions",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Kolhapuri masala",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Coconut, grated",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Tomato",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Dry roast coconut until golden. Grind with fried onion into a paste.",
      "Heat oil and fry ginger-garlic paste until raw smell disappears.",
      "Add tomatoes and cook until oil separates.",
      "Add Kolhapuri masala and coconut-onion paste. Fry for 5 minutes.",
      "Add chicken pieces and coat well in masala.",
      "Add 600ml water and bring to boil. Simmer 30 minutes until chicken is cooked.",
      "The consistency should be thin and watery. Adjust salt."
    ],
    "chef_notes": "Rassa means thin gravy in Marathi. Resist the urge to thicken it \u2014 the thin spicy broth is what makes it authentic. Kolhapuri masala is essential for the correct heat level.",
    "serving_suggestions": "Serve hot with jowar bhakri or rice. Best eaten by dipping bhakri directly into the rassa.",
    "nutrition_estimate": {
      "calories": "245",
      "protein_g": "22",
      "carbohydrates_g": "8",
      "fat_g": "14"
    },
    "tags": [
      "Non-Vegetarian",
      "Kolhapuri",
      "Spicy",
      "Traditional"
    ],
    "image_prompt": "Ultra realistic food photography of fiery red Maharashtrian chicken rassa in a deep bowl, thin spicy broth, tender chicken pieces, oil floating on surface, garnished with coriander, dark dramatic lighting, traditional earthen bowl",
    "seo_keywords": [
      "chicken rassa recipe",
      "kolhapuri chicken soup",
      "maharashtrian chicken curry",
      "vidarbha chicken"
    ],
    "img": "/images/india/maharashtra/soups/chicken-rassa-maharashtra-soup.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Pithla Soup Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/pithla-soup",
    "dish_name": "Pithla Soup",
    "state": "Maharashtra",
    "category": "Soups",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": 4,
    "short_description": "A thin, liquid version of the beloved Pithla \u2014 made with besan (chickpea flour), onions, and spices. This runny comforting soup is a weekday staple in Maharashtrian homes and is incredibly quick to make.",
    "ingredients": [
      {
        "name": "Besan (chickpea flour)",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Asafoetida",
        "quantity": "1",
        "unit": "pinch"
      },
      {
        "name": "Oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Fresh coriander",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Mix besan with 600ml water and whisk until smooth with no lumps.",
      "Heat oil and add mustard seeds, asafoetida.",
      "Add sliced onion and green chili. Saut\u00e9 until translucent.",
      "Add turmeric and pour in the besan water. Stir continuously.",
      "Cook on medium heat stirring constantly until slightly thickened.",
      "Season with salt and garnish with fresh coriander."
    ],
    "chef_notes": "Keep stirring to avoid lumps forming. For a richer version, add a dollop of ghee at the end and a squeeze of lemon juice.",
    "serving_suggestions": "Serve with jowar or bajra bhakri and raw onion salad.",
    "nutrition_estimate": {
      "calories": "120",
      "protein_g": "5",
      "carbohydrates_g": "14",
      "fat_g": "5"
    },
    "tags": [
      "Vegetarian",
      "Vegan",
      "Quick",
      "Village Maharashtra"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian pithla soup in a clay bowl, golden besan broth, mustard seeds and curry leaves floating, fresh coriander, rustic village kitchen background, natural morning light",
    "seo_keywords": [
      "pithla soup recipe",
      "besan soup maharashtra",
      "maharashtrian comfort food",
      "quick indian soup"
    ],
    "img": "/images/india/maharashtra/soups/pitla-maharashtra-soup.jpeg"
  },
  {
    "seo_title": "Authentic Maharashtrian Mutton Rassa Soup Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/mutton-rassa",
    "dish_name": "Mutton Rassa",
    "state": "Maharashtra",
    "category": "Soups",
    "difficulty_level": "Hard",
    "prep_time_minutes": 30,
    "cook_time_minutes": 90,
    "total_time_minutes": 120,
    "servings": 4,
    "short_description": "A robust, spice-forward thin mutton broth from Kolhapur, Maharashtra's culinary heartland. Slow-cooked with bone-in mutton, Kolhapuri masala and roasted coconut, this is a deeply satisfying soup that warms the soul.",
    "ingredients": [
      {
        "name": "Bone-in mutton",
        "quantity": "600",
        "unit": "g"
      },
      {
        "name": "Onions",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Kolhapuri masala",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Grated coconut",
        "quantity": "5",
        "unit": "tbsp"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Whole spices",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "2",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Dry roast coconut and grind with fried onion to a fine paste.",
      "Heat oil, fry whole spices, then add ginger-garlic paste.",
      "Add mutton and brown on high heat for 10 minutes.",
      "Add Kolhapuri masala and coconut-onion paste. Fry 5 minutes.",
      "Add 1 litre water, bring to boil and pressure cook for 4 whistles.",
      "Open, adjust seasoning. Broth should be thin and deeply red.",
      "Simmer uncovered for 10 minutes to intensify flavor."
    ],
    "chef_notes": "Bone-in mutton is essential \u2014 the marrow enriches the broth. The rassa should be pourable, not thick.",
    "serving_suggestions": "Serve with jowar bhakri or tandlachi bhakri and a raw onion-chili relish.",
    "nutrition_estimate": {
      "calories": "310",
      "protein_g": "28",
      "carbohydrates_g": "9",
      "fat_g": "18"
    },
    "tags": [
      "Non-Vegetarian",
      "Kolhapuri",
      "Spicy",
      "Weekend Special"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian mutton rassa, deep red spicy thin broth with bone-in mutton pieces, dramatic dark background, copper serving bowl, oil sheen on surface, garnished with fresh coriander",
    "seo_keywords": [
      "mutton rassa recipe",
      "kolhapuri mutton soup",
      "maharashtrian mutton curry",
      "spicy mutton broth"
    ],
    "img": "/images/india/maharashtra/soups/Mutton-rassa-maharashtra-soup.jpeg"
  },
  {
    "seo_title": "Authentic Maharashtrian Aamti Dal Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/aamti-dal",
    "dish_name": "Aamti Dal",
    "state": "Maharashtra",
    "category": "Soups",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": 4,
    "short_description": "Aamti is a thin, soupy toor dal preparation that is the backbone of the everyday Maharashtrian thali. Tempered with mustard, asafoetida and goda masala, it has a unique sweet-sour-spicy balance that is totally distinctive.",
    "ingredients": [
      {
        "name": "Toor dal",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Tamarind pulp",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Jaggery",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Goda masala",
        "quantity": "1.5",
        "unit": "tsp"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Asafoetida",
        "quantity": "1",
        "unit": "pinch"
      },
      {
        "name": "Curry leaves",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Ghee",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Pressure cook toor dal with turmeric until completely soft.",
      "Mash dal and thin with water to a pouring consistency.",
      "Heat ghee in a pan. Add mustard seeds and asafoetida.",
      "Add curry leaves, tamarind, jaggery and goda masala.",
      "Pour in the dal and simmer for 10 minutes.",
      "Adjust sweet-sour balance with more jaggery or tamarind.",
      "Serve hot with a fresh drizzle of ghee."
    ],
    "chef_notes": "Goda masala is what separates Maharashtrian aamti from other dals. The consistency should be thinner than regular dal \u2014 almost drinkable.",
    "serving_suggestions": "Serve with steamed rice, ghee and papad as part of a traditional Maharashtrian thali.",
    "nutrition_estimate": {
      "calories": "195",
      "protein_g": "9",
      "carbohydrates_g": "28",
      "fat_g": "6"
    },
    "tags": [
      "Vegetarian",
      "Everyday",
      "Thali",
      "Traditional"
    ],
    "image_prompt": "Ultra realistic food photography of golden Maharashtrian aamti dal in a small brass bowl, tempered with mustard seeds and curry leaves, garnished with fresh coriander, served alongside rice and papad, warm natural lighting",
    "seo_keywords": [
      "aamti dal recipe",
      "maharashtrian dal",
      "goda masala dal",
      "toor dal maharashtra",
      "maharashtrian thali recipe"
    ],
    "img": "/images/india/maharashtra/soups/amti-dal-maharashtra-soup.jpeg"
  },
  {
    "seo_title": "Authentic Maharashtrian Varan Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/varan",
    "dish_name": "Varan",
    "state": "Maharashtra",
    "category": "Soups",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 20,
    "total_time_minutes": 25,
    "servings": 4,
    "short_description": "Varan is the simplest, most comforting dal preparation in Maharashtra \u2014 plain cooked toor dal with turmeric, tempered minimally with ghee. It is pure, clean, and is the soul food of Maharashtra eaten at every festival and family meal.",
    "ingredients": [
      {
        "name": "Toor dal",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Wash toor dal and pressure cook with turmeric and water.",
      "Mash cooked dal until smooth.",
      "Thin down with hot water to a pourable consistency.",
      "Season with salt and lemon juice.",
      "Drizzle generously with ghee before serving."
    ],
    "chef_notes": "Varan is intentionally simple \u2014 the ghee is what makes it extraordinary. Use the best quality ghee you can find. Brahmin households often eat this as Varan-Bhat (dal-rice) as a complete meal.",
    "serving_suggestions": "Serve over hot steamed rice with a generous pool of ghee. Often served at Ganesh Chaturthi naivedyam.",
    "nutrition_estimate": {
      "calories": "185",
      "protein_g": "9",
      "carbohydrates_g": "24",
      "fat_g": "7"
    },
    "tags": [
      "Vegetarian",
      "Festival Food",
      "Sattvic",
      "Simple"
    ],
    "image_prompt": "Ultra realistic food photography of pure golden Maharashtrian varan dal in a small silver bowl, generous ghee pool on top, served next to white steamed rice, clean minimal styling, soft natural light, traditional festival setting",
    "seo_keywords": [
      "varan recipe",
      "maharashtrian plain dal",
      "varan bhat",
      "ganesh chaturthi recipe",
      "sattvic dal"
    ],
    "img": "/images/india/maharashtra/soups/varan-maharashtra-soup.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Bharli Vangi Shorba Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/bharli-vangi-shorba",
    "dish_name": "Bharli Vangi Shorba",
    "state": "Maharashtra",
    "category": "Soups",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "A modern Maharashtrian restaurant-style soup inspired by the classic Bharli Vangi (stuffed brinjal). Roasted brinjal is blended with peanut-coconut masala to create a smoky, rich and velvety soup that celebrates the bold flavors of Maharashtra.",
    "ingredients": [
      {
        "name": "Small brinjals",
        "quantity": "6",
        "unit": "pieces"
      },
      {
        "name": "Peanuts, roasted",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Coconut, grated",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Goda masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Tamarind",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Roast brinjals directly on flame until charred. Peel and set aside.",
      "Dry roast coconut and peanuts together until golden.",
      "Saut\u00e9 onion until caramelized, add goda masala.",
      "Blend roasted brinjal, coconut, peanuts, onion and tamarind with water.",
      "Strain for smooth consistency. Heat gently.",
      "Season and serve garnished with a drizzle of roasted peanut oil."
    ],
    "chef_notes": "Charring the brinjal on an open flame is non-negotiable for the authentic smoky flavor that defines this soup.",
    "serving_suggestions": "Serve in small cups as an elegant starter at dinner parties.",
    "nutrition_estimate": {
      "calories": "165",
      "protein_g": "5",
      "carbohydrates_g": "16",
      "fat_g": "9"
    },
    "tags": [
      "Vegetarian",
      "Smoky",
      "Modern Maharashtrian",
      "Restaurant Style"
    ],
    "image_prompt": "Ultra realistic professional food photography of Bharli Vangi Shorba, deep smoky brown soup in a white bowl, drizzle of peanut oil, micro herb garnish, high-end restaurant presentation, dark moody background, elegant plating",
    "seo_keywords": [
      "bharli vangi soup",
      "maharashtrian brinjal soup",
      "smoked eggplant soup indian",
      "modern maharashtrian recipe"
    ],
    "img": "/images/india/maharashtra/soups/Bharli-Vangi-shorba-maharashtra-soup.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Vada Pav Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/vada-pav",
    "dish_name": "Vada Pav",
    "state": "Maharashtra",
    "category": "Appetizers",
    "difficulty_level": "Medium",
    "prep_time_minutes": 30,
    "cook_time_minutes": 20,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "Maharashtra's most iconic street food \u2014 a spiced potato vada encased in a crispy besan batter, served inside a soft pav with dry garlic chutney and green chutney. Known as Mumbai's burger, it is the heartbeat of Maharashtrian street culture.",
    "ingredients": [
      {
        "name": "Potatoes",
        "quantity": "4",
        "unit": "large"
      },
      {
        "name": "Besan",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Pav buns",
        "quantity": "4",
        "unit": "pieces"
      },
      {
        "name": "Dry garlic chutney",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Green chutney",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Green chili",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      }
    ],
    "preparation_steps": [
      "Boil and mash potatoes. Temper with mustard seeds, curry leaves, turmeric, ginger and green chili.",
      "Shape into round balls.",
      "Make besan batter with turmeric, red chili and salt. Consistency should coat a spoon.",
      "Dip potato balls in batter and deep fry until golden and crispy.",
      "Slit pav buns and apply dry garlic chutney on one side, green chutney on the other.",
      "Place hot vada inside pav and serve immediately with fried green chili."
    ],
    "chef_notes": "The dry garlic chutney is the secret weapon of vada pav. Roasted garlic, coconut and chili ground together \u2014 it must be fresh and coarse, not a paste.",
    "serving_suggestions": "Serve with dry garlic chutney, green chutney and a fried green chili on the side.",
    "nutrition_estimate": {
      "calories": "385",
      "protein_g": "9",
      "carbohydrates_g": "52",
      "fat_g": "16"
    },
    "tags": [
      "Street Food",
      "Vegetarian",
      "Mumbai",
      "Iconic"
    ],
    "image_prompt": "Ultra realistic professional food photography of authentic Mumbai Vada Pav, golden crispy vada inside a soft pav, vibrant green and red chutneys visible, street food setting, warm dramatic lighting, newspaper wrap in background",
    "seo_keywords": [
      "vada pav recipe",
      "mumbai vada pav",
      "maharashtrian street food",
      "batata vada recipe",
      "dry garlic chutney recipe"
    ],
    "img": "/images/india/maharashtra/appetizers/vadapav-maharashtra-appetizer.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Misal Pav Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/misal-pav",
    "dish_name": "Misal Pav",
    "state": "Maharashtra",
    "category": "Appetizers",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 35,
    "total_time_minutes": 55,
    "servings": 4,
    "short_description": "Misal Pav is a fiery sprouted moth bean curry topped with farsan, onion, tomato and lemon juice, served alongside buttered pav. This beloved Maharashtrian breakfast and street food is a glorious explosion of textures and flavors.",
    "ingredients": [
      {
        "name": "Sprouted moth beans (matki)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Pav buns",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Tomato",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Misal masala",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Farsan/sev",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Coconut, grated",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Cook sprouted matki until just tender but not mushy.",
      "Dry roast coconut and grind with fried onion.",
      "Heat oil, add onion-tomato masala with misal masala.",
      "Add cooked matki and 300ml water. Simmer 20 minutes.",
      "The curry (kat) should be thin and fiery.",
      "Serve in a bowl. Top with farsan, raw onion, tomato, coriander and lemon juice.",
      "Serve buttered pav on the side."
    ],
    "chef_notes": "Misal has regional variations \u2014 Pune misal is spicier, Nasik misal is sweeter. The kat (spicy gravy) is what makes it great. The farsan must be added just before serving to stay crunchy.",
    "serving_suggestions": "Serve with buttered pav, fresh onion, lemon and extra farsan on the side.",
    "nutrition_estimate": {
      "calories": "420",
      "protein_g": "15",
      "carbohydrates_g": "58",
      "fat_g": "16"
    },
    "tags": [
      "Street Food",
      "Breakfast",
      "Spicy",
      "Vegetarian"
    ],
    "image_prompt": "Ultra realistic professional food photography of Maharashtrian Misal Pav, fiery red curry topped with colorful farsan, fresh onions, tomatoes, coriander, lemon wedge, buttered pav alongside, vibrant street food styling",
    "seo_keywords": [
      "misal pav recipe",
      "maharashtrian breakfast",
      "pune misal",
      "matki misal",
      "spicy indian street food"
    ],
    "img": "/images/india/maharashtra/appetizers/misal-pav-maharashtra-appetizer.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kanda Bhaji Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/kanda-bhaji",
    "dish_name": "Kanda Bhaji",
    "state": "Maharashtra",
    "category": "Appetizers",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": 4,
    "short_description": "Kanda Bhaji are irresistibly crispy onion fritters \u2014 a Maharashtrian monsoon staple. Thinly sliced onions coated in spiced besan batter and deep fried until golden, they are a beloved teatime snack across the state.",
    "ingredients": [
      {
        "name": "Onions",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Besan",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Rice flour",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Coriander leaves",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Ajwain",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Thinly slice onions and mix with salt. Let rest 5 minutes to release moisture.",
      "Add besan, rice flour, green chili, coriander, chili powder and ajwain.",
      "Mix well. The onion moisture should be enough \u2014 add minimal water.",
      "Drop spoonfuls into hot oil and fry on medium heat.",
      "Fry until deeply golden and crispy. Drain on paper.",
      "Serve immediately while hot and crispy."
    ],
    "chef_notes": "Rice flour is the secret to extra crispiness. Adding too much water makes the bhaji heavy. The natural moisture of salted onions is usually sufficient.",
    "serving_suggestions": "Serve with green chutney and a cup of cutting chai on a rainy day.",
    "nutrition_estimate": {
      "calories": "280",
      "protein_g": "7",
      "carbohydrates_g": "32",
      "fat_g": "14"
    },
    "tags": [
      "Monsoon Snack",
      "Street Food",
      "Vegetarian",
      "Tea Time"
    ],
    "image_prompt": "Ultra realistic food photography of crispy golden Maharashtrian kanda bhaji onion fritters, stacked on a newspaper, steam rising, green chutney on side, rainy window background, warm cozy lighting",
    "seo_keywords": [
      "kanda bhaji recipe",
      "onion fritters maharashtra",
      "maharashtrian bhaji",
      "crispy onion pakora",
      "mumbai street snack"
    ],
    "img": "/images/india/maharashtra/appetizers/kanda-bhaji-maharashtra-appetizer.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Sabudana Vada Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/sabudana-vada",
    "dish_name": "Sabudana Vada",
    "state": "Maharashtra",
    "category": "Appetizers",
    "difficulty_level": "Medium",
    "prep_time_minutes": 240,
    "cook_time_minutes": 20,
    "total_time_minutes": 260,
    "servings": 4,
    "short_description": "Sabudana Vada are crispy shallow-fried patties made with soaked tapioca pearls, mashed potato and roasted peanuts. A popular Maharashtrian fasting food (upvas) and monsoon snack, they are crunchy outside and soft inside.",
    "ingredients": [
      {
        "name": "Sabudana (tapioca pearls)",
        "quantity": "250",
        "unit": "g"
      },
      {
        "name": "Potatoes",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Roasted peanuts, coarsely ground",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Green chili",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Rock salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "4",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Soak sabudana in minimal water for 4 hours until pearls are soft but not mushy.",
      "Boil and mash potatoes until smooth.",
      "Mix sabudana, potato, peanuts, green chili, cumin, lemon and coriander.",
      "Shape into round flat patties.",
      "Shallow fry in oil on medium heat until golden and crispy on both sides.",
      "Serve hot with green chutney and yogurt."
    ],
    "chef_notes": "The key is the correct sabudana soak \u2014 it should be just soft enough to press, not wet and sticky. Drain any excess water before mixing to avoid vadas falling apart.",
    "serving_suggestions": "Serve with green chutney and sweetened yogurt. Perfect for fasting days.",
    "nutrition_estimate": {
      "calories": "310",
      "protein_g": "7",
      "carbohydrates_g": "48",
      "fat_g": "11"
    },
    "tags": [
      "Fasting Food",
      "Vegetarian",
      "Gluten-Free",
      "Street Food"
    ],
    "image_prompt": "Ultra realistic food photography of golden crispy Maharashtrian sabudana vada on a plate, visible tapioca pearls, green chutney and yogurt alongside, warm golden lighting, traditional serving",
    "seo_keywords": [
      "sabudana vada recipe",
      "maharashtrian fasting food",
      "upvas recipe",
      "tapioca patties recipe",
      "navratri snacks"
    ],
    "img": "/images/india/maharashtra/appetizers/sabudana-vada-maharashtra-appetizer.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Poha Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/kanda-poha",
    "dish_name": "Kanda Poha",
    "state": "Maharashtra",
    "category": "Appetizers",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": 4,
    "short_description": "Kanda Poha is Maharashtra's quintessential breakfast \u2014 flattened rice tossed with saut\u00e9ed onions, mustard, turmeric and curry leaves, finished with fresh coconut, coriander and a squeeze of lemon. Simple, light and utterly satisfying.",
    "ingredients": [
      {
        "name": "Thick poha (flattened rice)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Grated coconut",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Sugar",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Wash poha in a sieve until just moistened. Do not over-soak.",
      "Heat oil, add mustard seeds, curry leaves and green chili.",
      "Add sliced onion and fry until translucent.",
      "Add turmeric and poha. Toss gently on low heat.",
      "Add sugar and salt. Mix carefully.",
      "Remove from heat. Add lemon juice, coconut and coriander.",
      "Serve warm topped with sev and fresh pomegranate seeds (optional)."
    ],
    "chef_notes": "The poha should be moist but not wet. Each grain must be separate. Adding a small amount of sugar balances the lemon acidity \u2014 a signature Maharashtrian touch.",
    "serving_suggestions": "Serve warm for breakfast with a cup of cutting chai.",
    "nutrition_estimate": {
      "calories": "285",
      "protein_g": "5",
      "carbohydrates_g": "48",
      "fat_g": "8"
    },
    "tags": [
      "Breakfast",
      "Vegetarian",
      "Quick",
      "Street Food"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian kanda poha in a steel plate, golden yellow color, garnished with fresh coconut, coriander and sev, lemon wedge on side, warm breakfast setting",
    "seo_keywords": [
      "kanda poha recipe",
      "maharashtrian poha",
      "mumbai breakfast",
      "poha recipe",
      "indian breakfast ideas"
    ],
    "img": "/images/india/maharashtra/appetizers/pohe-maharashtra-appetizer.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Thalipeeth Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/thalipeeth",
    "dish_name": "Thalipeeth",
    "state": "Maharashtra",
    "category": "Appetizers",
    "difficulty_level": "Medium",
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": 4,
    "short_description": "Thalipeeth is a savory multigrain Maharashtrian pancake made from a special blend called bhajani \u2014 roasted and ground rice, wheat, jowar, bajra and lentils. Spiced with onion, coriander and chilies, it is a nutritious and deeply satisfying meal.",
    "ingredients": [
      {
        "name": "Bhajani flour (multigrain blend)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Green chili",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Coriander leaves",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Sesame seeds",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Mix bhajani flour with finely chopped onion, green chili, coriander, sesame and cumin.",
      "Add salt and enough water to make a soft pliable dough.",
      "Grease a wet cloth or plastic sheet. Place a ball of dough on it.",
      "Pat into a thin round circle with wet fingers.",
      "Make a small hole in the center and cook on a hot griddle.",
      "Drizzle oil around edges and cook on both sides until crispy and golden.",
      "Serve hot with fresh white butter or yogurt."
    ],
    "chef_notes": "Bhajani flour is the heart of thalipeeth. You can make it by roasting jowar, bajra, rice, chana dal, urad dal and wheat together and grinding coarsely.",
    "serving_suggestions": "Serve with loni (homemade white butter) or fresh yogurt and pickle.",
    "nutrition_estimate": {
      "calories": "295",
      "protein_g": "9",
      "carbohydrates_g": "42",
      "fat_g": "10"
    },
    "tags": [
      "Breakfast",
      "Vegetarian",
      "Multigrain",
      "Traditional"
    ],
    "image_prompt": "Ultra realistic food photography of freshly cooked Maharashtrian thalipeeth on a cast iron griddle, golden brown, topped with white butter melting, rustic kitchen setting, warm morning light",
    "seo_keywords": [
      "thalipeeth recipe",
      "maharashtrian pancake",
      "bhajani recipe",
      "multigrain indian flatbread",
      "maharashtra breakfast"
    ],
    "img": "/images/india/maharashtra/appetizers/thalipeeth-maharashtra-appetizer.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Batata Vada Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/batata-vada",
    "dish_name": "Batata Vada",
    "state": "Maharashtra",
    "category": "Appetizers",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 20,
    "total_time_minutes": 40,
    "servings": 4,
    "short_description": "The soul of Vada Pav \u2014 Batata Vada is a perfectly spiced potato ball encased in a thin, crispy besan batter and deep fried until golden. On its own, it is a spectacular snack that can be eaten with multiple chutneys.",
    "ingredients": [
      {
        "name": "Potatoes",
        "quantity": "4",
        "unit": "large"
      },
      {
        "name": "Besan",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Green chili",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Turmeric",
        "quantity": "0.75",
        "unit": "tsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Boil, peel and mash potatoes until smooth.",
      "Temper mustard seeds, curry leaves, ginger and green chili in oil.",
      "Mix tempering into mashed potato with turmeric and lemon. Form balls.",
      "Make besan batter with turmeric, red chili, salt and water.",
      "Dip each potato ball in batter and deep fry until golden.",
      "Serve hot with green chutney and dry garlic chutney."
    ],
    "chef_notes": "The batter should coat the vada thinly \u2014 too thick and it becomes doughy. A pinch of baking soda in the batter keeps it light and crispy.",
    "serving_suggestions": "Serve with dry garlic-coconut chutney, tamarind chutney and green coriander chutney.",
    "nutrition_estimate": {
      "calories": "295",
      "protein_g": "8",
      "carbohydrates_g": "38",
      "fat_g": "13"
    },
    "tags": [
      "Street Food",
      "Vegetarian",
      "Mumbai",
      "Crispy"
    ],
    "image_prompt": "Ultra realistic food photography of golden Maharashtrian batata vada on a plate, besan coating cracked to reveal potato filling, served with vibrant green and red chutneys, street food atmosphere",
    "seo_keywords": [
      "batata vada recipe",
      "potato vada recipe",
      "maharashtrian snack",
      "mumbai batata vada",
      "vada pav filling"
    ],
    "img": "/images/india/maharashtra/appetizers/batata-vada-maharashtra-appetizer.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Chakli Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/chakli",
    "dish_name": "Chakli",
    "state": "Maharashtra",
    "category": "Appetizers",
    "difficulty_level": "Hard",
    "prep_time_minutes": 30,
    "cook_time_minutes": 30,
    "total_time_minutes": 60,
    "servings": 8,
    "short_description": "Chakli is Maharashtra's most beloved festive snack \u2014 spiral-shaped savory crackers made from rice flour and spices, deep fried to a perfect crunchy golden finish. A Diwali staple, they are addictive, crispy and deeply satisfying.",
    "ingredients": [
      {
        "name": "Rice flour",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Urad dal flour",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Sesame seeds",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Butter",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "1.5",
        "unit": "tsp"
      },
      {
        "name": "Asafoetida",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "3",
        "unit": "cups"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Mix rice flour, urad flour, sesame, cumin, chili, asafoetida, butter and salt.",
      "Add warm water gradually and knead into a firm smooth dough.",
      "Fill chakli press with dough and press into spiral shapes on a flat surface.",
      "Heat oil to 160\u00b0C. Slide chakli into oil carefully.",
      "Fry on medium heat until golden and crispy \u2014 about 4 minutes per batch.",
      "Drain and cool completely before storing in airtight container."
    ],
    "chef_notes": "The oil temperature must be consistent \u2014 too hot and chakli browns too quickly, too low and it absorbs oil. Adding butter to the dough is what creates that melt-in-mouth texture.",
    "serving_suggestions": "Serve as a festive snack during Diwali or store in airtight containers for up to 2 weeks.",
    "nutrition_estimate": {
      "calories": "185",
      "protein_g": "3",
      "carbohydrates_g": "24",
      "fat_g": "9"
    },
    "tags": [
      "Diwali",
      "Festive",
      "Vegetarian",
      "Crispy Snack"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian chakli spiral snacks in a traditional brass plate, golden crispy spirals, Diwali diyas in background, warm festive lighting, overhead shot",
    "seo_keywords": [
      "chakli recipe",
      "maharashtrian diwali snacks",
      "rice flour chakli",
      "murukku maharashtra",
      "crispy indian snacks"
    ],
    "img": "/images/india/maharashtra/appetizers/chakali-maharashtra-appetizer.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kothimbir Vadi Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/kothimbir-vadi",
    "dish_name": "Kothimbir Vadi",
    "state": "Maharashtra",
    "category": "Appetizers",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "Kothimbir Vadi are steamed and shallow-fried savory cakes made with generous amounts of fresh coriander (kothimbir) and besan. A beloved Maharashtrian tea-time snack, they are fragrant, crispy outside and soft inside.",
    "ingredients": [
      {
        "name": "Fresh coriander",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Besan",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Green chili",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Sesame seeds",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Roasted peanut powder",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Finely chop coriander and mix with besan, green chili, ginger, sesame, peanut powder, cumin and salt.",
      "Add very little water to make a thick dough-like mixture.",
      "Grease a plate and spread mixture evenly 1cm thick.",
      "Steam for 15-20 minutes until set and cooked through.",
      "Cool completely and cut into diamond or square shapes.",
      "Shallow fry in oil until golden and crispy on all sides.",
      "Serve hot with green chutney."
    ],
    "chef_notes": "Steaming before frying creates the unique two-texture experience. Do not skip the steaming step or the inside will remain raw.",
    "serving_suggestions": "Serve with green coriander chutney and a cup of masala chai.",
    "nutrition_estimate": {
      "calories": "220",
      "protein_g": "9",
      "carbohydrates_g": "24",
      "fat_g": "10"
    },
    "tags": [
      "Tea Time",
      "Vegetarian",
      "Traditional",
      "Steamed and Fried"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian kothimbir vadi, golden crispy diamond-shaped cakes on a plate, bright green coriander visible, served with green chutney, warm natural lighting",
    "seo_keywords": [
      "kothimbir vadi recipe",
      "coriander fritters maharashtra",
      "maharashtrian snack",
      "besan coriander cake",
      "tea time snack india"
    ],
    "img": "/images/india/maharashtra/appetizers/kothimbir-vadi-maharashtra-appetizer.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Bharli Mirchi Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/bharli-mirchi",
    "dish_name": "Bharli Mirchi",
    "state": "Maharashtra",
    "category": "Appetizers",
    "difficulty_level": "Medium",
    "prep_time_minutes": 25,
    "cook_time_minutes": 15,
    "total_time_minutes": 40,
    "servings": 4,
    "short_description": "Bharli Mirchi are large green chilies stuffed with a tangy besan-peanut-coconut filling and shallow fried until blistered and fragrant. A popular Maharashtrian appetizer and side dish with a perfect balance of heat, tang and nuttiness.",
    "ingredients": [
      {
        "name": "Large green chilies (Bhavnagri)",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Besan",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Roasted peanut powder",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Grated coconut",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Tamarind paste",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Jaggery",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Dry roast besan until fragrant and golden.",
      "Mix roasted besan with peanut powder, coconut, tamarind, jaggery, coriander and salt.",
      "Slit chilies lengthwise and remove seeds partially.",
      "Fill each chili with the besan-peanut mixture.",
      "Heat oil in a pan and place stuffed chilies.",
      "Cover and cook on low heat for 8-10 minutes, turning once.",
      "Serve hot as appetizer or side dish."
    ],
    "chef_notes": "Use Bhavnagri or any large mild-to-medium green chili. Removing the seeds reduces heat. The tamarind-jaggery in the filling creates a perfect sweet-sour-spicy balance.",
    "serving_suggestions": "Serve as a side with dal-rice or as an appetizer before the main meal.",
    "nutrition_estimate": {
      "calories": "175",
      "protein_g": "6",
      "carbohydrates_g": "14",
      "fat_g": "11"
    },
    "tags": [
      "Vegetarian",
      "Spicy",
      "Traditional",
      "Side Dish"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian bharli mirchi, blistered green stuffed chilies in a pan, golden besan filling visible, garnished with coriander, rustic dark background",
    "seo_keywords": [
      "bharli mirchi recipe",
      "stuffed green chili maharashtra",
      "besan stuffed chili",
      "maharashtrian starter",
      "indian stuffed peppers"
    ],
    "img": "/images/india/maharashtra/appetizers/bharli-mirch-maharashtra-appetizer.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kachumber Salad Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/kachumber-salad",
    "dish_name": "Kachumber",
    "state": "Maharashtra",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 4,
    "short_description": "Kachumber is Maharashtra's essential salad \u2014 a refreshing mix of finely diced cucumber, tomato, onion, coriander and lemon juice. Served with almost every Maharashtrian meal, it provides a cooling contrast to spicy curries.",
    "ingredients": [
      {
        "name": "Cucumber",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Tomato",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Fresh coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "0.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Finely dice cucumber, tomato and onion into even small pieces.",
      "Finely chop green chili and coriander.",
      "Combine all ingredients in a bowl.",
      "Add lemon juice, salt and roasted cumin powder.",
      "Toss well and serve immediately."
    ],
    "chef_notes": "Always cut kachumber just before serving \u2014 it releases water and becomes watery if left too long. The roasted cumin powder adds a wonderful depth.",
    "serving_suggestions": "Serve alongside any Maharashtrian curry, dal-rice, or grilled meats.",
    "nutrition_estimate": {
      "calories": "45",
      "protein_g": "2",
      "carbohydrates_g": "9",
      "fat_g": "0"
    },
    "tags": [
      "Salad",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Everyday"
    ],
    "image_prompt": "Ultra realistic food photography of fresh Maharashtrian kachumber salad in a white bowl, colorful diced cucumber, tomato, onion, fresh coriander, lemon wedge on side, bright natural light, clean minimal styling",
    "seo_keywords": [
      "kachumber recipe",
      "indian salad recipe",
      "maharashtrian salad",
      "cucumber tomato salad india",
      "indian thali salad"
    ],
    "img": "/images/india/maharashtra/salads/kachumber-maharashtra-salad.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Sprouted Moong Salad Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/sprouted-moong-salad",
    "dish_name": "Moodyachi Usal Salad",
    "state": "Maharashtra",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 240,
    "cook_time_minutes": 5,
    "total_time_minutes": 245,
    "servings": 4,
    "short_description": "A refreshing and protein-rich salad made with home-sprouted moong beans tossed with lemon, fresh coconut, coriander and minimal spices. A daily health ritual in many Maharashtrian homes, it is nutritious, light and deeply satisfying.",
    "ingredients": [
      {
        "name": "Sprouted moong beans",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Fresh coconut, grated",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Ginger",
        "quantity": "0.5",
        "unit": "inch"
      },
      {
        "name": "Fresh coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Mustard seeds",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Steam sprouted moong lightly for 3-4 minutes until just cooked but still crunchy.",
      "Prepare a quick tempering with mustard seeds in oil.",
      "Toss moong sprouts with coconut, lemon, green chili, ginger and coriander.",
      "Add tempering and salt.",
      "Mix well and serve at room temperature or slightly warm."
    ],
    "chef_notes": "Do not overcook the sprouts \u2014 they should retain their crunch. This salad is best eaten fresh as the sprouts soften over time.",
    "serving_suggestions": "Serve as a starter, healthy snack or alongside a light lunch.",
    "nutrition_estimate": {
      "calories": "130",
      "protein_g": "8",
      "carbohydrates_g": "18",
      "fat_g": "3"
    },
    "tags": [
      "Healthy",
      "Protein-Rich",
      "Vegan",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian sprouted moong salad in a white bowl, green sprouts tossed with fresh coconut and coriander, lemon wedge garnish, bright clean food photography, natural light",
    "seo_keywords": [
      "sprouted moong salad",
      "moong bean salad india",
      "maharashtrian healthy salad",
      "protein salad india",
      "moong sprout recipe"
    ],
    "img": "/images/india/maharashtra/salads/moodyachi-usal-salad-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Raw Papaya Salad Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/raw-papaya-salad",
    "dish_name": "Kacha Papaya Koshimbir",
    "state": "Maharashtra",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 0,
    "total_time_minutes": 15,
    "servings": 4,
    "short_description": "A light, crunchy salad made with shredded raw green papaya, fresh coconut, peanuts and a lemon dressing. Koshimbir is a class of Maharashtrian raw vegetable salads dressed with coconut, yogurt or lemon \u2014 this version is refreshing and nutritious.",
    "ingredients": [
      {
        "name": "Raw green papaya",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Grated coconut",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Roasted peanuts, crushed",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Sugar",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Mustard seeds",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Peel and grate or julienne the raw papaya finely.",
      "Mix with coconut, peanuts, green chili, lemon, sugar and salt.",
      "Prepare a quick tempering with mustard seeds and oil.",
      "Add tempering to salad and toss well.",
      "Garnish with coriander and serve immediately."
    ],
    "chef_notes": "Salting the raw papaya and leaving it for 5 minutes draws out excess moisture and softens it slightly. Squeeze gently before adding the dressing.",
    "serving_suggestions": "Serve as a refreshing side with fish curry and rice or as part of a Maharashtrian thali.",
    "nutrition_estimate": {
      "calories": "110",
      "protein_g": "3",
      "carbohydrates_g": "14",
      "fat_g": "5"
    },
    "tags": [
      "Salad",
      "Vegetarian",
      "Refreshing",
      "Koshimbir"
    ],
    "image_prompt": "Ultra realistic food photography of raw papaya koshimbir salad, pale green shredded papaya with coconut and peanuts in a white bowl, fresh coriander garnish, light and bright food photography",
    "seo_keywords": [
      "raw papaya salad maharashtra",
      "koshimbir recipe",
      "kacha papaya salad india",
      "maharashtrian salad",
      "green papaya recipe"
    ],
    "img": "/images/india/maharashtra/salads/kacha-papaya-koshimbir-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kakdi Koshimbir Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/kakdi-koshimbir",
    "dish_name": "Kakdi Koshimbir",
    "state": "Maharashtra",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 4,
    "short_description": "A beloved Maharashtrian cucumber salad dressed with fresh yogurt, grated coconut, roasted peanuts and a mustard tempering. Kakdi Koshimbir is cooling, creamy and the perfect accompaniment to any spicy Maharashtrian meal.",
    "ingredients": [
      {
        "name": "Cucumber",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Yogurt",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Grated coconut",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Roasted peanuts, crushed",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Mustard seeds",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Peel and finely dice or grate cucumber. Squeeze out excess water.",
      "Mix cucumber with yogurt, coconut and peanuts.",
      "Add green chili, coriander and salt.",
      "Prepare mustard seed tempering and add to salad.",
      "Toss well and serve chilled."
    ],
    "chef_notes": "Squeezing water out of cucumber is important \u2014 otherwise the salad becomes watery. Add peanuts just before serving for crunch.",
    "serving_suggestions": "Serve alongside spicy Maharashtrian curries as a cooling side.",
    "nutrition_estimate": {
      "calories": "95",
      "protein_g": "4",
      "carbohydrates_g": "10",
      "fat_g": "5"
    },
    "tags": [
      "Salad",
      "Vegetarian",
      "Cooling",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian kakdi koshimbir cucumber salad in a clay bowl, creamy yogurt dressing, fresh coconut and peanuts visible, green chili garnish, clean natural light",
    "seo_keywords": [
      "kakdi koshimbir recipe",
      "cucumber raita maharashtra",
      "maharashtrian koshimbir",
      "cooling salad india",
      "cucumber yogurt salad"
    ],
    "img": "/images/india/maharashtra/salads/kakdi-koshimbir-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Matki Usal Salad Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/matki-salad",
    "dish_name": "Matki Salad",
    "state": "Maharashtra",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 480,
    "cook_time_minutes": 10,
    "total_time_minutes": 490,
    "servings": 4,
    "short_description": "A hearty protein-packed salad made with sprouted moth beans (matki) tossed with onion, tomato, lemon and coconut. Rich in fibre and protein, this Maharashtrian staple doubles as a nutritious salad or a quick snack.",
    "ingredients": [
      {
        "name": "Sprouted matki (moth beans)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Tomato",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Grated coconut",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak matki overnight and sprout for 24-48 hours.",
      "Steam sprouted matki for 5 minutes until tender but firm.",
      "Cool completely.",
      "Toss with finely chopped onion, tomato, green chili and coriander.",
      "Add coconut, lemon juice, chaat masala and salt.",
      "Mix well and serve fresh."
    ],
    "chef_notes": "Sprouting matki increases its nutritional value significantly. Don't skip the sprouting process.",
    "serving_suggestions": "Serve as a standalone snack with chai or as a protein-rich side dish.",
    "nutrition_estimate": {
      "calories": "155",
      "protein_g": "10",
      "carbohydrates_g": "22",
      "fat_g": "2"
    },
    "tags": [
      "Protein Rich",
      "Vegan",
      "Gluten-Free",
      "Healthy"
    ],
    "image_prompt": "Ultra realistic food photography of matki sprouted bean salad in a colorful bowl, brown sprouted beans with red tomato, green coriander and white coconut, bright healthy food photography",
    "seo_keywords": [
      "matki salad recipe",
      "moth bean salad",
      "maharashtrian sprout salad",
      "protein salad india",
      "healthy indian salad"
    ],
    "img": "/images/india/maharashtra/salads/matki-salad-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Carrot Koshimbir Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/carrot-koshimbir",
    "dish_name": "Gajar Koshimbir",
    "state": "Maharashtra",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 4,
    "short_description": "A bright and sweet Maharashtrian carrot salad made with grated raw carrots, coconut, peanuts and a light lemon dressing. Simple, sweet, crunchy and incredibly quick to make \u2014 a daily fixture on the Maharashtrian table.",
    "ingredients": [
      {
        "name": "Carrots",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Grated coconut",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Crushed peanuts",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Sugar",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Mustard tempering",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Peel and finely grate the carrots.",
      "Mix with coconut, peanuts, green chili and coriander.",
      "Add lemon juice, salt and sugar.",
      "Add mustard tempering.",
      "Toss and serve immediately."
    ],
    "chef_notes": "This salad is best made fresh. The natural sweetness of carrot with lemon and coconut is perfect as is \u2014 keep it simple.",
    "serving_suggestions": "Serve alongside dal-rice, any curry or as part of thali.",
    "nutrition_estimate": {
      "calories": "90",
      "protein_g": "2",
      "carbohydrates_g": "12",
      "fat_g": "4"
    },
    "tags": [
      "Salad",
      "Vegetarian",
      "Vegan",
      "Quick"
    ],
    "image_prompt": "Ultra realistic food photography of vibrant orange carrot koshimbir in a white bowl, fresh coconut and coriander garnish, bright natural light, clean minimal food styling",
    "seo_keywords": [
      "carrot koshimbir recipe",
      "gajar salad maharashtra",
      "indian carrot salad",
      "maharashtrian koshimbir",
      "vegan indian salad"
    ],
    "img": "/images/india/maharashtra/salads/gajar-koshimbir-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Peanut Koshimbir Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/peanut-koshimbir",
    "dish_name": "Shenga Koshimbir",
    "state": "Maharashtra",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 4,
    "short_description": "A crunchy, protein-rich Maharashtrian peanut salad dressed with yogurt, fresh coconut, lemon and green chili. Shenga Koshimbir is a popular fasting-friendly salad that doubles as a satisfying snack.",
    "ingredients": [
      {
        "name": "Roasted peanuts",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Yogurt",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Grated coconut",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Sugar",
        "quantity": "0.25",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Peel roasted peanuts and keep whole.",
      "Mix yogurt with lemon, salt and sugar until smooth.",
      "Toss peanuts with yogurt dressing.",
      "Add coconut, green chili and coriander.",
      "Serve immediately for best crunch."
    ],
    "chef_notes": "Add the yogurt dressing just before serving to keep peanuts crunchy. A great protein-rich addition to any meal.",
    "serving_suggestions": "Serve as a side salad or fasting snack.",
    "nutrition_estimate": {
      "calories": "210",
      "protein_g": "10",
      "carbohydrates_g": "12",
      "fat_g": "14"
    },
    "tags": [
      "Fasting Food",
      "Protein Rich",
      "Vegetarian",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of shenga peanut koshimbir in a small bowl, creamy yogurt coated peanuts, fresh coconut and coriander, bright clean food photography",
    "seo_keywords": [
      "shenga koshimbir recipe",
      "peanut salad maharashtra",
      "peanut yogurt salad india",
      "fasting salad maharashtra"
    ],
    "img": "/images/india/maharashtra/salads/shenga-koshimbir-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Bharli Vangi Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/bharli-vangi",
    "dish_name": "Bharli Vangi",
    "state": "Maharashtra",
    "category": "Main Courses",
    "difficulty_level": "Medium",
    "prep_time_minutes": 25,
    "cook_time_minutes": 30,
    "total_time_minutes": 55,
    "servings": 4,
    "short_description": "Bharli Vangi is Maharashtra's crown jewel \u2014 small brinjals stuffed with a fragrant peanut-coconut-spice mixture and slow cooked in their own juices. It is a celebratory dish that showcases the genius of Maharashtrian flavor-building.",
    "ingredients": [
      {
        "name": "Small round brinjals",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Roasted peanuts",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Grated coconut",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Goda masala",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Sesame seeds",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Tamarind",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Jaggery",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Dry roast peanuts, coconut and sesame seeds. Grind with fried onion.",
      "Mix ground masala with goda masala, tamarind, jaggery and salt.",
      "Make criss-cross slits in brinjals keeping the stem intact.",
      "Stuff each brinjal generously with the masala mixture.",
      "Heat oil in a pan and place stuffed brinjals carefully.",
      "Cover and cook on low heat for 25 minutes, turning gently.",
      "Brinjals should be completely tender. Serve with remaining masala as sauce."
    ],
    "chef_notes": "Low and slow is the key to perfectly cooked bharli vangi. The brinjals will release moisture and cook in their own steam. Avoid the urge to add water.",
    "serving_suggestions": "Serve with jowar bhakri, rice or roti and a bowl of varan.",
    "nutrition_estimate": {
      "calories": "265",
      "protein_g": "7",
      "carbohydrates_g": "22",
      "fat_g": "17"
    },
    "tags": [
      "Vegetarian",
      "Festival Food",
      "Traditional",
      "Signature Dish"
    ],
    "image_prompt": "Ultra realistic professional food photography of Maharashtrian bharli vangi, stuffed brinjals in deep brown masala gravy in a copper karahi, garnished with coriander and grated coconut, warm moody lighting, rustic wooden background",
    "seo_keywords": [
      "bharli vangi recipe",
      "stuffed brinjal maharashtra",
      "maharashtrian eggplant recipe",
      "goda masala recipe",
      "maharashtrian vegetarian main course"
    ],
    "img": "/images/india/maharashtra/main-courses/bharli-vangi-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Chicken Kolhapuri Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/chicken-kolhapuri",
    "dish_name": "Chicken Kolhapuri",
    "state": "Maharashtra",
    "category": "Main Courses",
    "difficulty_level": "Hard",
    "prep_time_minutes": 40,
    "cook_time_minutes": 60,
    "total_time_minutes": 100,
    "servings": 4,
    "short_description": "Chicken Kolhapuri is one of India's most fiery and complex chicken dishes \u2014 a dark, aromatic and intensely spiced curry from the city of Kolhapur. Made with a fresh-ground Kolhapuri masala of roasted whole spices, coconut and chilies, it is bold, unapologetic and deeply satisfying.",
    "ingredients": [
      {
        "name": "Chicken",
        "quantity": "800",
        "unit": "g"
      },
      {
        "name": "Onions",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Kolhapuri masala",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Dried red chilies (Kashmiri + Bedgi)",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Grated coconut, dry roasted",
        "quantity": "5",
        "unit": "tbsp"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Whole spices",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Sesame seeds, roasted",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "2",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Dry roast whole spices, sesame and coconut. Grind with soaked red chilies.",
      "Fry onions until deep brown and caramelized \u2014 this is critical.",
      "Add ginger-garlic paste and fry until oil separates.",
      "Add Kolhapuri masala and ground coconut-chili paste. Fry on low heat for 8 minutes.",
      "Add chicken pieces and coat well. Sear on high heat.",
      "Add water, cover and cook on medium heat for 35-40 minutes.",
      "The gravy should be thick, dark and coating the chicken. Adjust seasoning."
    ],
    "chef_notes": "The depth of color in Kolhapuri chicken comes from deeply caramelized onions and dry roasted coconut \u2014 not from food coloring. Never rush these steps. Use a mix of Kashmiri (for color) and Bedgi/Guntur (for heat) chilies.",
    "serving_suggestions": "Serve with jowar bhakri, tandlachi bhakri or steamed rice.",
    "nutrition_estimate": {
      "calories": "380",
      "protein_g": "32",
      "carbohydrates_g": "12",
      "fat_g": "22"
    },
    "tags": [
      "Non-Vegetarian",
      "Spicy",
      "Kolhapuri",
      "Weekend Special"
    ],
    "image_prompt": "Ultra realistic professional food photography of fiery dark Chicken Kolhapuri, deep reddish-brown thick masala, chicken pieces coated in aromatic spiced gravy, copper karahi, dramatic side lighting, garnished with coriander and fried onions",
    "seo_keywords": [
      "chicken kolhapuri recipe",
      "kolhapuri masala chicken",
      "spicy maharashtrian chicken",
      "authentic chicken kolhapuri",
      "indian spicy chicken curry"
    ],
    "img": "/images/india/maharashtra/main-courses/chicken-kolhapuri-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Masala Bhaat Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/masala-bhaat",
    "dish_name": "Masala Bhaat",
    "state": "Maharashtra",
    "category": "Main Courses",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "Masala Bhaat is a fragrant one-pot Maharashtrian rice dish made with seasonal vegetables, goda masala and a generous garnish of fresh coconut and coriander. It is a festive staple \u2014 especially at weddings and Ganesh Chaturthi celebrations.",
    "ingredients": [
      {
        "name": "Basmati rice",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Mixed vegetables (brinjal, potato, green peas)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Goda masala",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Grated coconut",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Ghee",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Cashews",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Wash and soak rice for 20 minutes.",
      "Heat ghee in a heavy pot. Fry cashews until golden, remove.",
      "Add mustard seeds, curry leaves and sliced onion. Saut\u00e9 until golden.",
      "Add vegetables and goda masala. Fry for 5 minutes.",
      "Add drained rice and toss to coat with masala.",
      "Add 550ml water and salt. Bring to boil.",
      "Cover and cook on very low heat for 18 minutes.",
      "Garnish with coconut, coriander and fried cashews."
    ],
    "chef_notes": "Goda masala gives Masala Bhaat its signature sweet-spiced aroma. Do not substitute it. Brinjal is the traditional vegetable but you can add any seasonal vegetables.",
    "serving_suggestions": "Serve with kadhi, papad, pickle and a dollop of ghee.",
    "nutrition_estimate": {
      "calories": "345",
      "protein_g": "7",
      "carbohydrates_g": "58",
      "fat_g": "9"
    },
    "tags": [
      "Festival Food",
      "Vegetarian",
      "One-Pot",
      "Wedding Food"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian masala bhaat, fragrant spiced rice with vegetables, fresh coconut and coriander garnish, served in a traditional banana leaf bowl, festive Maharashtrian setting",
    "seo_keywords": [
      "masala bhaat recipe",
      "maharashtrian spiced rice",
      "goda masala rice",
      "wedding rice maharashtra",
      "ganesh chaturthi recipe"
    ],
    "img": "/images/india/maharashtra/main-courses/masala-bhaat-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Puran Poli Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/puran-poli",
    "dish_name": "Puran Poli",
    "state": "Maharashtra",
    "category": "Breads",
    "difficulty_level": "Hard",
    "prep_time_minutes": 60,
    "cook_time_minutes": 30,
    "total_time_minutes": 90,
    "servings": 4,
    "short_description": "Puran Poli is Maharashtra's most beloved festive flatbread \u2014 a thin whole wheat outer shell stuffed with a fragrant sweet filling of cooked chana dal, jaggery and cardamom. Made for Holi, Ganesh Chaturthi and Diwali, it is soul food in its purest form.",
    "ingredients": [
      {
        "name": "Whole wheat flour",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Chana dal",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Jaggery",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Cardamom powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Nutmeg powder",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "6",
        "unit": "tbsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Make a soft, pliable dough with flour, turmeric, salt, oil and water. Rest 30 minutes.",
      "Pressure cook chana dal until completely soft.",
      "Mash dal and cook with jaggery until mixture thickens and leaves sides of pan.",
      "Add cardamom and nutmeg. Cool completely \u2014 this is the puran.",
      "Divide dough and puran into equal balls.",
      "Flatten dough, place puran ball, seal and roll gently into thin circles.",
      "Cook on hot griddle with generous ghee on both sides until golden."
    ],
    "chef_notes": "The puran must be very dry before stuffing \u2014 cook it until it holds its shape and does not stick. A soft dough that rests well is crucial for thin rolling without tearing.",
    "serving_suggestions": "Serve hot with katachi amti, ghee and a glass of milk. Traditionally eaten at Holi and Ganesh Chaturthi.",
    "nutrition_estimate": {
      "calories": "420",
      "protein_g": "10",
      "carbohydrates_g": "68",
      "fat_g": "12"
    },
    "tags": [
      "Festival Food",
      "Vegetarian",
      "Holi",
      "Ganesh Chaturthi"
    ],
    "image_prompt": "Ultra realistic professional food photography of freshly made Maharashtrian puran poli, golden flatbread with ghee glistening, stacked on a plate with katachi amti alongside, festive setting, warm natural light",
    "seo_keywords": [
      "puran poli recipe",
      "maharashtrian sweet flatbread",
      "holi special recipe",
      "chana dal sweet poli",
      "ganesh chaturthi food"
    ],
    "img": "/images/india/maharashtra/breads/puran-poli-maharashtra-bread.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Bhakri Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/jowar-bhakri",
    "dish_name": "Jowar Bhakri",
    "state": "Maharashtra",
    "category": "Breads",
    "difficulty_level": "Medium",
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": 4,
    "short_description": "Jowar Bhakri is Maharashtra's everyday sorghum flatbread \u2014 thick, rustic and nutritious. Made purely with jowar flour and water, it requires skill to roll and is best eaten fresh off the tawa with generous white butter and a simple chutney.",
    "ingredients": [
      {
        "name": "Jowar flour (sorghum)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Warm water",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "White butter (loni)",
        "quantity": "4",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Mix jowar flour with warm water and salt. Knead into a soft dough \u2014 jowar is gluten-free so it won't be elastic.",
      "Divide into medium balls.",
      "Wet your palms with water and pat each ball into a thick round on a wet cloth.",
      "Alternatively, roll gently between sheets of plastic.",
      "Cook on a dry hot tawa (no oil) on medium heat.",
      "Press gently with a cloth and cook until light brown spots appear.",
      "Serve immediately with white butter."
    ],
    "chef_notes": "Jowar bhakri requires patience. Because it has no gluten, it must be patted out with wet hands \u2014 it cannot be rolled like wheat roti. Always eat fresh as it hardens when cold.",
    "serving_suggestions": "Serve hot with white butter, any Maharashtrian curry, or thecha (green chili chutney).",
    "nutrition_estimate": {
      "calories": "220",
      "protein_g": "7",
      "carbohydrates_g": "44",
      "fat_g": "4"
    },
    "tags": [
      "Gluten-Free",
      "Vegetarian",
      "Traditional",
      "Everyday"
    ],
    "image_prompt": "Ultra realistic food photography of freshly made jowar bhakri on a hot tawa, slightly charred rustic flatbread, white butter melting on top, traditional Maharashtrian kitchen setting, warm light",
    "seo_keywords": [
      "jowar bhakri recipe",
      "sorghum flatbread india",
      "maharashtrian bhakri",
      "gluten free indian bread",
      "jowar roti recipe"
    ],
    "img": "/images/india/maharashtra/breads/jowar-bhakri-maharashtra-bread.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Pav Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/homemade-pav",
    "dish_name": "Homemade Pav",
    "state": "Maharashtra",
    "category": "Breads",
    "difficulty_level": "Medium",
    "prep_time_minutes": 120,
    "cook_time_minutes": 20,
    "total_time_minutes": 140,
    "servings": 8,
    "short_description": "Soft, pillowy pav buns are the vessel for Mumbai's greatest street foods \u2014 Vada Pav, Pav Bhaji and Misal Pav. Made with maida, yeast and a touch of sugar, homemade pav is incomparably softer and more delicious than store-bought versions.",
    "ingredients": [
      {
        "name": "All-purpose flour (maida)",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Instant yeast",
        "quantity": "7",
        "unit": "g"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Butter",
        "quantity": "30",
        "unit": "g"
      },
      {
        "name": "Warm milk",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Warm water",
        "quantity": "50",
        "unit": "ml"
      }
    ],
    "preparation_steps": [
      "Mix yeast and sugar in warm water. Let sit 10 minutes until frothy.",
      "Add yeast mixture to flour with salt and butter.",
      "Add warm milk and knead for 10 minutes until smooth and elastic.",
      "Cover and let rise in a warm place for 1 hour until doubled.",
      "Punch down, divide into 8 equal balls, shape and place in a greased tray.",
      "Let rise again for 30 minutes.",
      "Bake at 180\u00b0C for 18-20 minutes until golden.",
      "Brush with butter immediately after baking."
    ],
    "chef_notes": "Placing the pav balls touching each other in the tray ensures they rise upward and become perfectly soft-sided. Brushing with butter while hot makes the crust tender.",
    "serving_suggestions": "Use for Vada Pav, Pav Bhaji, Misal Pav or serve with any Maharashtrian curry.",
    "nutrition_estimate": {
      "calories": "210",
      "protein_g": "6",
      "carbohydrates_g": "36",
      "fat_g": "5"
    },
    "tags": [
      "Bread",
      "Vegetarian",
      "Baked",
      "Street Food Base"
    ],
    "image_prompt": "Ultra realistic food photography of fresh homemade pav buns, golden brown, soft and pillowy, just out of the oven on a baking tray, butter melting on top, warm bakery atmosphere",
    "seo_keywords": [
      "pav recipe homemade",
      "mumbai pav bread",
      "soft dinner rolls india",
      "vada pav bread recipe",
      "maharashtrian pav bun"
    ],
    "img": "/images/india/maharashtra/breads/homemade-pav-maharashtra-bread.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Amboli Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/amboli",
    "dish_name": "Amboli",
    "state": "Maharashtra",
    "category": "Breads",
    "difficulty_level": "Medium",
    "prep_time_minutes": 480,
    "cook_time_minutes": 20,
    "total_time_minutes": 500,
    "servings": 4,
    "short_description": "Amboli is a thick, soft, slightly sour fermented rice and urad dal pancake from the Konkan coast of Maharashtra. Softer and thicker than a dosa, it is a beloved breakfast in Malvani and Goan-influenced cuisines.",
    "ingredients": [
      {
        "name": "Rice",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Urad dal",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Poha",
        "quantity": "50",
        "unit": "g"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Oil for cooking",
        "quantity": "3",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Soak rice, urad dal and poha together for 4 hours.",
      "Grind into a thick, coarse batter.",
      "Ferment overnight in a warm place.",
      "Season with salt. Batter should be thick.",
      "Pour a ladle onto a hot greased tawa and spread into a thick circle.",
      "Cover and cook on medium heat. No need to flip.",
      "Serve hot when the top is cooked and bottom is golden."
    ],
    "chef_notes": "Amboli is intentionally thick \u2014 unlike dosa, do not spread thin. The coarse texture is characteristic. Serve with red coconut chutney or chicken curry.",
    "serving_suggestions": "Serve with Malvani chicken curry, coconut chutney or fish curry.",
    "nutrition_estimate": {
      "calories": "210",
      "protein_g": "6",
      "carbohydrates_g": "38",
      "fat_g": "4"
    },
    "tags": [
      "Konkan",
      "Fermented",
      "Breakfast",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian amboli thick fermented rice pancake on a cast iron pan, golden bottom, soft top, served with red coconut chutney, coastal Konkan setting",
    "seo_keywords": [
      "amboli recipe",
      "konkan pancake recipe",
      "maharashtrian fermented bread",
      "malvani breakfast",
      "rice pancake india"
    ],
    "img": "/images/india/maharashtra/breads/amboli-maharashtra-bread.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Ghavan Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/ghavan",
    "dish_name": "Ghavan",
    "state": "Maharashtra",
    "category": "Breads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": 4,
    "short_description": "Ghavan is a thin, lacy rice flour crepe from the Konkan region of Maharashtra. Made simply with rice flour, water and salt, it is crispy at the edges, soft in the middle and is the everyday bread of coastal Maharashtrian households.",
    "ingredients": [
      {
        "name": "Rice flour",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Coconut milk",
        "quantity": "150",
        "unit": "ml"
      },
      {
        "name": "Water",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Mix rice flour with coconut milk, water and salt into a thin pouring batter.",
      "Let the batter rest for 15 minutes.",
      "Heat a non-stick or cast iron pan and grease lightly.",
      "Pour a thin ladle of batter and spread into a thin circle.",
      "Cover and cook on medium heat until set.",
      "No need to flip. Serve when edges are crispy."
    ],
    "chef_notes": "The batter must be thinner than dosa batter. Coconut milk adds a subtle sweetness and richness to the ghavan.",
    "serving_suggestions": "Serve with coconut chutney, fish curry or any Konkani side dish.",
    "nutrition_estimate": {
      "calories": "175",
      "protein_g": "3",
      "carbohydrates_g": "30",
      "fat_g": "5"
    },
    "tags": [
      "Konkan",
      "Gluten-Free",
      "Breakfast",
      "Vegan"
    ],
    "image_prompt": "Ultra realistic food photography of thin lacy Maharashtrian ghavan rice crepe on a clay plate, crispy golden edges, served with coconut chutney, coastal Konkan setting, morning light",
    "seo_keywords": [
      "ghavan recipe",
      "konkan rice crepe",
      "maharashtrian rice bread",
      "gluten free indian bread",
      "coastal maharashtra breakfast"
    ],
    "img": "/images/india/maharashtra/breads/ghavan-maharashtra-bread.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Dhapate Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/dhapate",
    "dish_name": "Dhapate",
    "state": "Maharashtra",
    "category": "Breads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": 4,
    "short_description": "Dhapate is a rustic Maharashtrian multigrain flatbread made with jowar, wheat, besan and onion \u2014 packed with flavor and nutrition. A traditional peasant bread that has gained widespread popularity for its hearty, satisfying nature.",
    "ingredients": [
      {
        "name": "Jowar flour",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Whole wheat flour",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Besan",
        "quantity": "50",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Sesame seeds",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Mix all flours with chopped onion, green chili, sesame, coriander and salt.",
      "Add oil and rub in well.",
      "Add water gradually and knead into a soft dough.",
      "Pat each ball into a thick round on a greased surface.",
      "Cook on a hot tawa with oil until golden on both sides.",
      "Serve hot with yogurt or chutney."
    ],
    "chef_notes": "Dhapate has a rustic, slightly crumbly texture due to the multigrain blend. Do not over-knead. The onions should remain slightly crunchy in the bread.",
    "serving_suggestions": "Serve with fresh yogurt, butter, and green chutney.",
    "nutrition_estimate": {
      "calories": "240",
      "protein_g": "8",
      "carbohydrates_g": "36",
      "fat_g": "8"
    },
    "tags": [
      "Multigrain",
      "Vegetarian",
      "Rustic",
      "Healthy"
    ],
    "image_prompt": "Ultra realistic food photography of rustic Maharashtrian dhapate multigrain flatbread on a cast iron pan, golden brown, sesame seeds visible, served with fresh yogurt and green chutney",
    "seo_keywords": [
      "dhapate recipe",
      "maharashtrian multigrain bread",
      "jowar wheat flatbread",
      "traditional maharashtra bread",
      "healthy indian flatbread"
    ],
    "img": "/images/india/maharashtra/breads/dhapate-maharashtra-bread.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Vangyache Bharit Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/vangyache-bharit",
    "dish_name": "Vangyache Bharit",
    "state": "Maharashtra",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": 4,
    "short_description": "Vangyache Bharit is Maharashtra's fire-roasted brinjal mash \u2014 smoky, earthy and brightened with fresh coconut, onion, lemon and coriander. Similar to North Indian Baingan Bharta but distinctly Maharashtrian with coconut and a lighter hand on spices.",
    "ingredients": [
      {
        "name": "Large brinjal",
        "quantity": "1",
        "unit": "kg"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Grated coconut",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Garlic",
        "quantity": "4",
        "unit": "cloves"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Roast brinjal directly on flame, turning regularly until completely charred.",
      "Cool and peel. Mash the smoky flesh.",
      "Temper mustard seeds, garlic and green chili in oil.",
      "Add finely chopped onion and fry until translucent.",
      "Add mashed brinjal and mix well.",
      "Add coconut, lemon, salt and coriander.",
      "Serve at room temperature."
    ],
    "chef_notes": "Direct flame roasting is essential for the smoky flavor. Do not use oven roasting \u2014 it will not give the same result. Serve within an hour for best flavor.",
    "serving_suggestions": "Serve with jowar bhakri, rice or as a dip with pav.",
    "nutrition_estimate": {
      "calories": "145",
      "protein_g": "3",
      "carbohydrates_g": "18",
      "fat_g": "7"
    },
    "tags": [
      "Vegetarian",
      "Smoky",
      "Vegan",
      "Everyday"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian vangyache bharit smoked brinjal mash in a clay bowl, coconut and coriander visible, rustic dark background, cast iron pan alongside",
    "seo_keywords": [
      "vangyache bharit recipe",
      "maharashtrian baingan bharta",
      "smoked brinjal maharashtra",
      "fire roasted eggplant india",
      "maharashtrian vegetarian recipe"
    ],
    "img": "/images/india/maharashtra/main-courses/vangyache-bharit-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Shrikhand Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/shrikhand",
    "dish_name": "Shrikhand",
    "state": "Maharashtra",
    "category": "Desserts",
    "difficulty_level": "Easy",
    "prep_time_minutes": 480,
    "cook_time_minutes": 0,
    "total_time_minutes": 480,
    "servings": 6,
    "short_description": "Shrikhand is Maharashtra's most beloved dessert \u2014 thick strained yogurt whipped with sugar, saffron, cardamom and garnished with pistachios. Creamy, fragrant and intensely flavored, it is served at every celebration and festival.",
    "ingredients": [
      {
        "name": "Full fat yogurt",
        "quantity": "1",
        "unit": "kg"
      },
      {
        "name": "Powdered sugar",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Saffron",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Warm milk",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Pistachios",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Rose water",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Hang yogurt in a muslin cloth for 6-8 hours to drain all whey.",
      "The resulting chakka should be very thick and dense.",
      "Soak saffron in warm milk for 10 minutes.",
      "Whisk chakka with powdered sugar until smooth.",
      "Add cardamom, saffron milk and rose water. Whisk well.",
      "Chill for at least 2 hours before serving.",
      "Garnish with chopped pistachios and saffron strands."
    ],
    "chef_notes": "The quality of shrikhand depends entirely on the chakka (strained yogurt). It must be hung long enough to eliminate all whey \u2014 otherwise the shrikhand will be runny. Use full-fat yogurt only.",
    "serving_suggestions": "Serve chilled as a dessert or with hot puri as Shrikhand-Puri \u2014 a famous Maharashtrian combination.",
    "nutrition_estimate": {
      "calories": "285",
      "protein_g": "7",
      "carbohydrates_g": "42",
      "fat_g": "10"
    },
    "tags": [
      "Dessert",
      "Vegetarian",
      "Festival Food",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic professional food photography of Maharashtrian shrikhand in an elegant silver bowl, pale saffron yellow color, garnished with crushed pistachios and saffron strands, rose petals, soft natural light, festive presentation",
    "seo_keywords": [
      "shrikhand recipe",
      "maharashtrian sweet",
      "saffron yogurt dessert",
      "shrikhand puri recipe",
      "indian festival dessert"
    ],
    "img": "/images/india/maharashtra/desserts/shrikhand-maharashtra-dessert.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Modak Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/steamed-modak",
    "dish_name": "Ukadiche Modak",
    "state": "Maharashtra",
    "category": "Desserts",
    "difficulty_level": "Hard",
    "prep_time_minutes": 60,
    "cook_time_minutes": 20,
    "total_time_minutes": 80,
    "servings": 4,
    "short_description": "Ukadiche Modak are steamed rice flour dumplings filled with a fragrant coconut-jaggery-cardamom filling. Lord Ganesha's favorite offering, these delicate modak are made during Ganesh Chaturthi and require skill to shape their distinctive pleated form.",
    "ingredients": [
      {
        "name": "Rice flour",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Grated coconut",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Jaggery",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Cardamom powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Nutmeg",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.25",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Make filling: cook coconut with jaggery until dry. Add cardamom and nutmeg. Cool.",
      "Boil 500ml water with ghee and salt. Add rice flour off heat and mix vigorously.",
      "Knead dough while warm into a smooth ball using wet hands.",
      "Take a small ball of dough, flatten in your palm into a thin cup shape.",
      "Place filling in center and pleat the edges together upward to form a pointed top.",
      "Seal all pleats at the top with a twist.",
      "Steam in a steamer lined with muslin for 12-15 minutes.",
      "Serve hot with a drizzle of ghee."
    ],
    "chef_notes": "The dough must be worked while warm. If it cracks, wet hands with water and knead again. The pleating is a traditional art \u2014 13 pleats is considered perfect.",
    "serving_suggestions": "Serve as naivedyam (offering) to Lord Ganesha during Ganesh Chaturthi. Eat hot with ghee.",
    "nutrition_estimate": {
      "calories": "265",
      "protein_g": "4",
      "carbohydrates_g": "45",
      "fat_g": "8"
    },
    "tags": [
      "Festival Food",
      "Vegetarian",
      "Gluten-Free",
      "Ganesh Chaturthi"
    ],
    "image_prompt": "Ultra realistic professional food photography of handmade Maharashtrian ukadiche modak, delicate steamed rice dumplings with pleated tops, ghee drizzle, arranged on a traditional banana leaf with marigolds, Ganesh Chaturthi setting",
    "seo_keywords": [
      "modak recipe",
      "ukadiche modak",
      "ganesh chaturthi modak",
      "steamed rice dumpling india",
      "maharashtrian festival sweet"
    ],
    "img": "/images/india/maharashtra/desserts/ukadiche-modak-maharashtra-dessert.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Puranachi Poli Kheer Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/basundi",
    "dish_name": "Basundi",
    "state": "Maharashtra",
    "category": "Desserts",
    "difficulty_level": "Medium",
    "prep_time_minutes": 5,
    "cook_time_minutes": 90,
    "total_time_minutes": 95,
    "servings": 6,
    "short_description": "Basundi is a rich, thickened sweetened milk dessert from Maharashtra \u2014 essentially a concentrated rabri flavored with saffron, cardamom and garnished with nuts. Slow cooked until creamy and thick, it is a festival and wedding staple.",
    "ingredients": [
      {
        "name": "Full fat milk",
        "quantity": "1.5",
        "unit": "litre"
      },
      {
        "name": "Sugar",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Saffron",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Charoli nuts",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Almonds, sliced",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Pistachios, sliced",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Rose water",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Bring milk to a boil in a wide heavy pan.",
      "Reduce heat and simmer, stirring frequently, for 60-70 minutes.",
      "The milk will reduce by half and thick cream layers will form.",
      "Add sugar, saffron, cardamom and rose water.",
      "Simmer another 15 minutes until thick and creamy.",
      "Serve warm or chilled, garnished with nuts."
    ],
    "chef_notes": "Basundi requires patience \u2014 do not rush the reduction. Keep scraping the cream from sides and mixing back in. This creates the characteristic creamy texture.",
    "serving_suggestions": "Serve chilled as a dessert or warm as a festival offering.",
    "nutrition_estimate": {
      "calories": "310",
      "protein_g": "9",
      "carbohydrates_g": "38",
      "fat_g": "14"
    },
    "tags": [
      "Dessert",
      "Vegetarian",
      "Festival Food",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian basundi in a traditional copper bowl, thick creamy saffron-yellow milk dessert, garnished with pistachios, almonds and saffron strands, festive Indian setting",
    "seo_keywords": [
      "basundi recipe",
      "maharashtrian milk dessert",
      "thickened sweet milk india",
      "rabri maharashtra",
      "indian festival dessert milk"
    ],
    "img": "/images/india/maharashtra/desserts/basundi-maharashtra-dessert.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Gulachi Poli Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/gulachi-poli",
    "dish_name": "Gulachi Poli",
    "state": "Maharashtra",
    "category": "Desserts",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 20,
    "total_time_minutes": 40,
    "servings": 4,
    "short_description": "Gulachi Poli is a simple Maharashtrian sweet flatbread stuffed with a jaggery and sesame seed filling. Less complex than Puran Poli, it is a beloved homestyle sweet that is quick to make and deeply comforting.",
    "ingredients": [
      {
        "name": "Whole wheat flour",
        "quantity": "250",
        "unit": "g"
      },
      {
        "name": "Jaggery, grated",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Sesame seeds",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.25",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Dry roast sesame seeds until golden. Cool and grind coarsely.",
      "Mix ground sesame with jaggery and cardamom to make filling.",
      "Make a soft dough with wheat flour, ghee and salt.",
      "Roll out small circles, place filling, seal and roll gently.",
      "Cook on a hot tawa with ghee until golden on both sides.",
      "Serve hot."
    ],
    "chef_notes": "Do not make the filling too fine \u2014 a coarse texture gives better taste and prevents the poli from becoming soggy.",
    "serving_suggestions": "Serve hot with ghee as a dessert or sweet snack.",
    "nutrition_estimate": {
      "calories": "290",
      "protein_g": "6",
      "carbohydrates_g": "44",
      "fat_g": "10"
    },
    "tags": [
      "Dessert",
      "Vegetarian",
      "Festival Food",
      "Quick Sweet"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian gulachi poli sweet flatbread, golden brown, served on a steel plate with ghee, sesame seeds visible, homestyle Maharashtrian kitchen setting",
    "seo_keywords": [
      "gulachi poli recipe",
      "sesame jaggery flatbread",
      "maharashtrian sweet poli",
      "til jaggery poli",
      "quick indian sweet flatbread"
    ],
    "img": "/images/india/maharashtra/desserts/gulachi-poli-maharashtra-dessert.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kheer Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/sabudana-kheer",
    "dish_name": "Sabudana Kheer",
    "state": "Maharashtra",
    "category": "Desserts",
    "difficulty_level": "Easy",
    "prep_time_minutes": 30,
    "cook_time_minutes": 20,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "Sabudana Kheer is a silky, creamy Maharashtrian dessert made with tapioca pearls cooked in sweetened milk with cardamom, saffron and nuts. A popular fasting-friendly dessert, it is light yet indulgent.",
    "ingredients": [
      {
        "name": "Sabudana (tapioca pearls)",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Full fat milk",
        "quantity": "800",
        "unit": "ml"
      },
      {
        "name": "Sugar",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Cardamom powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Saffron",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Cashews",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Raisins",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Ghee",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Soak sabudana in water for 30 minutes. Drain.",
      "Fry cashews and raisins in ghee. Set aside.",
      "Bring milk to a boil. Add soaked sabudana.",
      "Simmer on medium heat for 15 minutes until pearls are translucent.",
      "Add sugar, cardamom and saffron.",
      "Simmer 5 more minutes. Garnish with fried nuts.",
      "Serve warm or chilled."
    ],
    "chef_notes": "Do not over-soak sabudana or the pearls will dissolve into the milk. They should be just soft enough to cook through in the milk.",
    "serving_suggestions": "Serve warm as a fasting dessert or festival sweet.",
    "nutrition_estimate": {
      "calories": "265",
      "protein_g": "6",
      "carbohydrates_g": "42",
      "fat_g": "8"
    },
    "tags": [
      "Fasting Food",
      "Dessert",
      "Vegetarian",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of sabudana kheer in a brass bowl, translucent tapioca pearls in creamy saffron milk, garnished with fried cashews and raisins, warm golden light, traditional Indian setting",
    "seo_keywords": [
      "sabudana kheer recipe",
      "tapioca pudding india",
      "maharashtrian fasting dessert",
      "sabudana sweet",
      "upvas kheer recipe"
    ],
    "img": "/images/india/maharashtra/desserts/sabudana-kheer-maharashtra-dessert.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Masala Chai Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/masala-chai-cutting",
    "dish_name": "Cutting Chai",
    "state": "Maharashtra",
    "category": "Tea",
    "difficulty_level": "Easy",
    "prep_time_minutes": 2,
    "cook_time_minutes": 8,
    "total_time_minutes": 10,
    "servings": 2,
    "short_description": "Cutting Chai is Mumbai's iconic half-cup strong masala tea \u2014 served scalding hot in small glasses on street corners throughout the city. The name 'cutting' comes from the practice of splitting one cup into two smaller portions. Bold, spiced and deeply satisfying.",
    "ingredients": [
      {
        "name": "Water",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Milk",
        "quantity": "150",
        "unit": "ml"
      },
      {
        "name": "Strong black tea leaves",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Cardamom",
        "quantity": "3",
        "unit": "pods"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Black pepper",
        "quantity": "2",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Crush cardamom and black pepper roughly.",
      "Bring water to boil with crushed spices and grated ginger.",
      "Add tea leaves and boil for 2 minutes.",
      "Add milk and bring to a vigorous boil \u2014 let it rise twice.",
      "Add sugar and strain into small glasses.",
      "Serve immediately \u2014 scalding hot."
    ],
    "chef_notes": "The double boil is crucial for that thick, strong Mumbai cutting chai character. The ginger must be fresh \u2014 powdered ginger will not give the same result.",
    "serving_suggestions": "Serve in small glasses with bun maska, vada pav or khari biscuit.",
    "nutrition_estimate": {
      "calories": "85",
      "protein_g": "3",
      "carbohydrates_g": "12",
      "fat_g": "3"
    },
    "tags": [
      "Beverage",
      "Mumbai",
      "Street Food",
      "Vegetarian"
    ],
    "image_prompt": "Ultra realistic food photography of Mumbai cutting chai in small glass cups on a steel tray, steam rising, street chai stall background, warm golden late afternoon light, authentic street atmosphere",
    "seo_keywords": [
      "cutting chai recipe",
      "mumbai masala chai",
      "indian spiced tea",
      "maharashtrian chai",
      "street chai india"
    ],
    "img": "/images/india/maharashtra/tea/cutting-chai-maharashtra-tea.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kolhapuri Masala Tea Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/kolhapuri-masala-tea",
    "dish_name": "Kolhapuri Kanda Chai",
    "state": "Maharashtra",
    "category": "Tea",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": 2,
    "short_description": "A bold, unusual tea specialty from Kolhapur \u2014 made with the addition of a tiny amount of onion and unique spice blend. Peculiar to outsiders but beloved locally, this tea has a unique savory-spiced character that is intensely warming.",
    "ingredients": [
      {
        "name": "Water",
        "quantity": "250",
        "unit": "ml"
      },
      {
        "name": "Milk",
        "quantity": "100",
        "unit": "ml"
      },
      {
        "name": "Tea leaves",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Small onion",
        "quantity": "0.25",
        "unit": "piece"
      },
      {
        "name": "Black pepper",
        "quantity": "4",
        "unit": "pieces"
      },
      {
        "name": "Clove",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Sugar",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Crush ginger, onion, pepper and clove together.",
      "Boil water with crushed spices for 3 minutes.",
      "Add tea leaves and boil 2 minutes.",
      "Add milk and sugar. Bring to a boil.",
      "Strain carefully and serve hot."
    ],
    "chef_notes": "The onion quantity is tiny \u2014 just enough to add body and a subtle savoriness. This is a distinctly Kolhapuri specialty that confuses outsiders but converts them after one sip.",
    "serving_suggestions": "Serve on cold mornings with bhakri and thecha.",
    "nutrition_estimate": {
      "calories": "70",
      "protein_g": "2",
      "carbohydrates_g": "10",
      "fat_g": "2"
    },
    "tags": [
      "Beverage",
      "Kolhapuri",
      "Unique",
      "Warming"
    ],
    "image_prompt": "Ultra realistic food photography of Kolhapuri kanda chai in a clay kulhad, steam rising, rustic Kolhapur street background, golden morning light",
    "seo_keywords": [
      "kolhapuri chai recipe",
      "kanda chai recipe",
      "onion tea india",
      "unusual indian tea recipes",
      "kolhapur street food"
    ],
    "img": "/images/india/maharashtra/tea/kolhapuri-kanda-chai-maharashtra-tea.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Ginger Lemon Tea Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/adrak-lemon-chai",
    "dish_name": "Adrak Lemon Chai",
    "state": "Maharashtra",
    "category": "Tea",
    "difficulty_level": "Easy",
    "prep_time_minutes": 2,
    "cook_time_minutes": 8,
    "total_time_minutes": 10,
    "servings": 2,
    "short_description": "A refreshingly light lemon ginger tea that is popular across Pune's upscale cafes and traditional Maharashtrian homes alike. Black tea brightened with fresh lemon juice and generous ginger \u2014 a perfect monsoon or winter warmer.",
    "ingredients": [
      {
        "name": "Water",
        "quantity": "400",
        "unit": "ml"
      },
      {
        "name": "Black tea leaves",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "2",
        "unit": "inch"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Honey or sugar",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Mint leaves",
        "quantity": "4",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Grate ginger and boil with water for 3 minutes.",
      "Add tea leaves and simmer 2 minutes.",
      "Strain into cups.",
      "Add lemon juice and honey.",
      "Garnish with mint leaves and serve hot."
    ],
    "chef_notes": "Do not add lemon juice while boiling \u2014 it will make the tea bitter. Always add after straining.",
    "serving_suggestions": "Serve as a light tea option or after heavy meals as a digestive.",
    "nutrition_estimate": {
      "calories": "30",
      "protein_g": "0",
      "carbohydrates_g": "7",
      "fat_g": "0"
    },
    "tags": [
      "Beverage",
      "Healthy",
      "Vegan",
      "Refreshing"
    ],
    "image_prompt": "Ultra realistic food photography of adrak lemon chai in a clear glass, golden tea color, lemon slice floating, fresh mint garnish, clean minimal food photography, bright natural light",
    "seo_keywords": [
      "adrak lemon chai recipe",
      "ginger lemon tea india",
      "maharashtrian tea recipe",
      "healthy indian tea",
      "black tea with lemon ginger"
    ],
    "img": "/images/india/maharashtra/tea/adrak-lemon-chai-maharashtra-tea.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Tulsi Ginger Tea Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/tulsi-ginger-tea",
    "dish_name": "Tulsi Adrak Chai",
    "state": "Maharashtra",
    "category": "Tea",
    "difficulty_level": "Easy",
    "prep_time_minutes": 2,
    "cook_time_minutes": 8,
    "total_time_minutes": 10,
    "servings": 2,
    "short_description": "A healing Ayurvedic tea made with fresh holy basil (tulsi), ginger, black pepper and honey. A traditional Maharashtrian home remedy for colds and coughs, this fragrant tea is now popular in wellness cafes across Mumbai and Pune.",
    "ingredients": [
      {
        "name": "Fresh tulsi leaves",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Water",
        "quantity": "350",
        "unit": "ml"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Black pepper",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Honey",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Lightly bruise tulsi leaves and ginger.",
      "Bring water to boil with tulsi, ginger and black pepper.",
      "Simmer for 5 minutes until fragrant.",
      "Strain into cups.",
      "Add honey and lemon juice. Stir well.",
      "Serve hot."
    ],
    "chef_notes": "This is a caffeine-free herbal tea. The honey should be added after straining when the temperature drops slightly to preserve its properties.",
    "serving_suggestions": "Serve on cold mornings or as a soothing evening drink.",
    "nutrition_estimate": {
      "calories": "20",
      "protein_g": "0",
      "carbohydrates_g": "5",
      "fat_g": "0"
    },
    "tags": [
      "Herbal Tea",
      "Ayurvedic",
      "Vegan",
      "Caffeine-Free",
      "Immunity Booster"
    ],
    "image_prompt": "Ultra realistic food photography of tulsi ginger tea in a glass cup, golden herbal tea with fresh tulsi leaves floating, ginger slice, honey drizzle, clean wellness food photography, natural light",
    "seo_keywords": [
      "tulsi chai recipe",
      "holy basil tea india",
      "ayurvedic tea maharashtra",
      "immunity tea india",
      "herbal tea indian recipe"
    ],
    "img": "/images/india/maharashtra/tea/tulsi-adrak-chai-maharashtra-tea.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Spiced Milk Tea Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/saffron-milk-tea",
    "dish_name": "Kesar Doodh Chai",
    "state": "Maharashtra",
    "category": "Tea",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 8,
    "total_time_minutes": 13,
    "servings": 2,
    "short_description": "A luxurious saffron and cardamom-infused milk tea that is a festive morning drink across Maharashtrian households. Fragrant, golden and warming \u2014 this tea bridges the gap between chai and warm saffron milk.",
    "ingredients": [
      {
        "name": "Milk",
        "quantity": "400",
        "unit": "ml"
      },
      {
        "name": "Saffron",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Tea leaves",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Almonds, slivered",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Soak saffron in 2 tablespoons warm milk for 5 minutes.",
      "Bring remaining milk to a gentle boil.",
      "Add tea leaves and simmer 1 minute.",
      "Add saffron milk, cardamom and sugar.",
      "Strain into cups.",
      "Garnish with slivered almonds."
    ],
    "chef_notes": "Soaking saffron in warm milk first ensures full color and flavor release. Only use genuine saffron \u2014 imitation saffron will not give the right result.",
    "serving_suggestions": "Serve on festive mornings or as a special treat on cold winter days.",
    "nutrition_estimate": {
      "calories": "130",
      "protein_g": "7",
      "carbohydrates_g": "14",
      "fat_g": "5"
    },
    "tags": [
      "Festive",
      "Vegetarian",
      "Warming",
      "Saffron"
    ],
    "image_prompt": "Ultra realistic food photography of kesar doodh chai in a golden kulhad, bright yellow saffron color, saffron strands visible, almond garnish, festive Maharashtrian setting, warm morning light",
    "seo_keywords": [
      "kesar chai recipe",
      "saffron milk tea india",
      "festive indian tea",
      "maharashtrian spiced milk",
      "cardamom saffron tea"
    ],
    "img": "/images/india/maharashtra/tea/kesar-doodh-chai-maharashtra-tea.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Masala Kadha Tea Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/masala-kadha",
    "dish_name": "Masala Kadha",
    "state": "Maharashtra",
    "category": "Tea",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": 2,
    "short_description": "Masala Kadha is a potent Maharashtrian medicinal spice decoction \u2014 boiled with ginger, tulsi, pepper, clove, cinnamon and lemon. A powerful immunity booster and cold remedy that is now widely popular as a wellness drink across Maharashtra.",
    "ingredients": [
      {
        "name": "Water",
        "quantity": "400",
        "unit": "ml"
      },
      {
        "name": "Ginger",
        "quantity": "2",
        "unit": "inch"
      },
      {
        "name": "Tulsi leaves",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Black pepper",
        "quantity": "6",
        "unit": "pieces"
      },
      {
        "name": "Cloves",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Cinnamon",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Honey",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.25",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Crush all dry spices.",
      "Bring water to boil with ginger, tulsi, pepper, cloves, cinnamon and turmeric.",
      "Simmer on low heat for 12 minutes until reduced by a third.",
      "Strain into cups.",
      "Add lemon juice and honey when slightly cooled.",
      "Serve hot."
    ],
    "chef_notes": "Kadha should be strong and slightly bitter \u2014 that is its nature. Do not dilute with milk or extra water. Drink in small cups.",
    "serving_suggestions": "Drink first thing in the morning on an empty stomach for maximum benefit.",
    "nutrition_estimate": {
      "calories": "25",
      "protein_g": "0",
      "carbohydrates_g": "6",
      "fat_g": "0"
    },
    "tags": [
      "Immunity Booster",
      "Ayurvedic",
      "Herbal",
      "Caffeine-Free"
    ],
    "image_prompt": "Ultra realistic food photography of dark amber masala kadha in a clay cup, steam rising, fresh tulsi leaves and dry spices scattered around, dark rustic background, healing wellness photography",
    "seo_keywords": [
      "masala kadha recipe",
      "immunity booster india",
      "maharashtrian kadha recipe",
      "ayurvedic spice decoction",
      "cold remedy india"
    ],
    "img": "/images/india/maharashtra/tea/masala-kadha-maharashtra-tea.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kokum Sharbat Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/kokum-sharbat",
    "dish_name": "Kokum Sharbat",
    "state": "Maharashtra",
    "category": "Tea",
    "difficulty_level": "Easy",
    "prep_time_minutes": 30,
    "cook_time_minutes": 0,
    "total_time_minutes": 30,
    "servings": 4,
    "short_description": "Kokum Sharbat is Maharashtra's signature summer cooler \u2014 a deep crimson, tangy and sweet cold drink made from dried kokum soaked in water with sugar and spices. A natural antacid and digestive, it is the preferred summer drink of coastal Maharashtra.",
    "ingredients": [
      {
        "name": "Dried kokum",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Cold water",
        "quantity": "400",
        "unit": "ml"
      },
      {
        "name": "Sugar",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Black salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Mint leaves",
        "quantity": "5",
        "unit": "pieces"
      },
      {
        "name": "Ice",
        "quantity": "8",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Soak kokum in 200ml warm water for 30 minutes.",
      "Squeeze kokum to extract maximum juice and color.",
      "Strain the kokum water into a jug.",
      "Add sugar, black salt and cumin powder. Stir to dissolve.",
      "Add remaining cold water and ice.",
      "Garnish with mint and serve cold."
    ],
    "chef_notes": "Black salt and cumin are essential for the authentic digestive kokum sharbat character. The deep purple-pink color should be vivid \u2014 if too pale, soak longer.",
    "serving_suggestions": "Serve chilled as a summer cooler, digestive after meals or as a welcome drink.",
    "nutrition_estimate": {
      "calories": "55",
      "protein_g": "0",
      "carbohydrates_g": "13",
      "fat_g": "0"
    },
    "tags": [
      "Summer Drink",
      "Digestive",
      "Vegan",
      "Cooling",
      "Konkan"
    ],
    "image_prompt": "Ultra realistic food photography of deep crimson kokum sharbat in a tall glass, vibrant purple-red color, fresh mint garnish, ice cubes, condensation on glass, tropical coastal setting, bright sunlight",
    "seo_keywords": [
      "kokum sharbat recipe",
      "kokum drink india",
      "maharashtrian summer drink",
      "konkan kokum juice",
      "digestive indian drink"
    ],
    "img": "/images/india/maharashtra/tea/kokum-sharbat-maharashtra-tea.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Filter Coffee Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/maharashtrian-coffee",
    "dish_name": "Nagpur Filter Coffee",
    "state": "Maharashtra",
    "category": "Coffee",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": 2,
    "short_description": "Coffee culture in Nagpur and Vidarbha region of Maharashtra is rooted in strong filter coffee tradition with a Deccan influence. This strong, aromatic drip coffee with hot milk is the morning ritual of countless Maharashtrian households across the Vidarbha belt.",
    "ingredients": [
      {
        "name": "Filter coffee powder (80/20 blend)",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Hot water",
        "quantity": "100",
        "unit": "ml"
      },
      {
        "name": "Full fat milk",
        "quantity": "250",
        "unit": "ml"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Add coffee powder to filter device upper chamber.",
      "Pour hot water over coffee slowly \u2014 allow to drip (15 minutes).",
      "Heat milk separately until frothy.",
      "Pour decoction into cup (about 30-40ml per cup).",
      "Add hot frothy milk and sugar.",
      "Serve immediately in steel tumblers."
    ],
    "chef_notes": "The chicory in the coffee blend adds body and a slight bitterness that is characteristic of South and Central Indian filter coffee. Use 80% coffee, 20% chicory blend.",
    "serving_suggestions": "Serve in traditional steel tumbler-dabara set with poha or thalipeeth.",
    "nutrition_estimate": {
      "calories": "95",
      "protein_g": "5",
      "carbohydrates_g": "10",
      "fat_g": "4"
    },
    "tags": [
      "Coffee",
      "Vegetarian",
      "Morning Ritual",
      "Vidarbha"
    ],
    "image_prompt": "Ultra realistic food photography of filter coffee being poured between traditional steel tumbler and dabara, steaming rich brown coffee, morning light, rustic Indian kitchen background",
    "seo_keywords": [
      "filter coffee maharashtra",
      "nagpur filter coffee",
      "vidarbha coffee",
      "south indian filter coffee recipe",
      "indian filter kaapi"
    ],
    "img": "/images/india/maharashtra/coffee/nagpur-filter-coffee-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Cafe Coffee Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/pune-cafe-coffee",
    "dish_name": "Pune Cafe Irani Coffee",
    "state": "Maharashtra",
    "category": "Coffee",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": 2,
    "short_description": "Pune's iconic Irani cafes have been serving this distinctive milky coffee since the early 1900s. Made with strong chicory-coffee decoction and boiled milk, served in small thick-bottomed glasses \u2014 this is the taste of old Pune.",
    "ingredients": [
      {
        "name": "Coffee powder with chicory",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Hot water",
        "quantity": "80",
        "unit": "ml"
      },
      {
        "name": "Full fat milk",
        "quantity": "300",
        "unit": "ml"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Brew strong coffee decoction by pouring hot water over coffee powder.",
      "Boil milk separately until it rises twice.",
      "Pour decoction into glass.",
      "Add sugar.",
      "Pour hot boiled milk in a thin stream from height to create froth.",
      "Serve immediately."
    ],
    "chef_notes": "Pouring the milk from a height creates the characteristic froth of Irani cafe coffee. The milk should be freshly boiled and very hot.",
    "serving_suggestions": "Serve in small thick glasses with Osmania biscuits or bun maska.",
    "nutrition_estimate": {
      "calories": "110",
      "protein_g": "6",
      "carbohydrates_g": "12",
      "fat_g": "5"
    },
    "tags": [
      "Coffee",
      "Irani Cafe",
      "Pune",
      "Heritage"
    ],
    "image_prompt": "Ultra realistic food photography of Pune Irani cafe coffee in a thick glass, frothy milk top, dark coffee visible at bottom, old Irani cafe setting with vintage tiles, warm nostalgic light",
    "seo_keywords": [
      "irani cafe coffee pune",
      "pune cafe coffee recipe",
      "maharashtrian coffee",
      "old pune cafe",
      "chicory coffee india"
    ],
    "img": "/images/india/maharashtra/coffee/pune-cafe-irani-coffee-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Cold Coffee Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/cold-coffee",
    "dish_name": "Nashik Cold Coffee",
    "state": "Maharashtra",
    "category": "Coffee",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 0,
    "total_time_minutes": 5,
    "servings": 2,
    "short_description": "A thick, indulgent blended cold coffee that is enormously popular across Maharashtra's college towns \u2014 especially Nashik and Pune. Rich with ice cream, chilled milk and strong coffee, it is the ultimate summer treat.",
    "ingredients": [
      {
        "name": "Strong brewed coffee, cooled",
        "quantity": "100",
        "unit": "ml"
      },
      {
        "name": "Chilled full fat milk",
        "quantity": "300",
        "unit": "ml"
      },
      {
        "name": "Vanilla ice cream",
        "quantity": "2",
        "unit": "scoops"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Ice cubes",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Chocolate sauce",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Brew strong coffee and allow to cool completely.",
      "Add coffee, milk, ice cream, sugar and ice to blender.",
      "Blend until frothy and smooth.",
      "Pour into tall chilled glasses.",
      "Drizzle chocolate sauce on top.",
      "Serve immediately."
    ],
    "chef_notes": "For a truly authentic Maharashtra college-style cold coffee, it must be thick enough to be slightly difficult to sip through a straw. Use full-fat milk and generous ice cream.",
    "serving_suggestions": "Serve in tall glasses with a straw as a summer refreshment.",
    "nutrition_estimate": {
      "calories": "285",
      "protein_g": "8",
      "carbohydrates_g": "36",
      "fat_g": "12"
    },
    "tags": [
      "Coffee",
      "Cold Drink",
      "Summer",
      "Indulgent"
    ],
    "image_prompt": "Ultra realistic food photography of thick blended cold coffee in a tall glass, chocolate drizzle, whipped cream on top, straw, condensation on glass, vibrant young cafe setting",
    "seo_keywords": [
      "cold coffee recipe india",
      "thick cold coffee maharashtra",
      "nashik cold coffee",
      "indian cafe cold coffee",
      "blended coffee recipe"
    ],
    "img": "/images/india/maharashtra/coffee/nashik-cold-coffee-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Bajra Coffee Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/jaggery-coffee",
    "dish_name": "Jaggery Filter Coffee",
    "state": "Maharashtra",
    "category": "Coffee",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": 2,
    "short_description": "A traditional Maharashtrian health-conscious take on filter coffee where white sugar is replaced with natural jaggery. The jaggery adds a subtle molasses depth to the coffee that complements the chicory perfectly \u2014 a trending wellness coffee.",
    "ingredients": [
      {
        "name": "Filter coffee decoction",
        "quantity": "60",
        "unit": "ml"
      },
      {
        "name": "Full fat milk",
        "quantity": "250",
        "unit": "ml"
      },
      {
        "name": "Jaggery, grated",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "0.25",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Prepare strong filter coffee decoction.",
      "Heat milk with grated jaggery until jaggery dissolves.",
      "Add cardamom to the milk.",
      "Pour decoction into cup.",
      "Add jaggery-cardamom milk.",
      "Serve hot."
    ],
    "chef_notes": "Jaggery has a lower melting point than sugar \u2014 add it to warm milk, not boiling milk, to prevent it from caramelizing too quickly and changing the flavor.",
    "serving_suggestions": "Serve as a healthier morning coffee alternative.",
    "nutrition_estimate": {
      "calories": "105",
      "protein_g": "5",
      "carbohydrates_g": "14",
      "fat_g": "4"
    },
    "tags": [
      "Coffee",
      "Healthy Alternative",
      "Jaggery",
      "Vegetarian"
    ],
    "image_prompt": "Ultra realistic food photography of jaggery filter coffee in a clay cup, warm brown color, cardamom pods alongside, jaggery piece on saucer, natural wellness photography, morning light",
    "seo_keywords": [
      "jaggery coffee recipe",
      "healthy filter coffee india",
      "maharashtrian coffee",
      "gur coffee recipe",
      "natural sweetener coffee india"
    ],
    "img": "/images/india/maharashtra/coffee/jaggery-filter-coffee-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Pav Bhaji Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/pav-bhaji",
    "dish_name": "Pav Bhaji",
    "state": "Maharashtra",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "Pav Bhaji is Mumbai's greatest culinary invention \u2014 a buttery, spiced vegetable mash cooked on a massive iron griddle and served with butter-toasted pav buns. A dish born in the textile mills of Mumbai, it is now one of India's most beloved street foods.",
    "ingredients": [
      {
        "name": "Potatoes",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Cauliflower",
        "quantity": "1",
        "unit": "small"
      },
      {
        "name": "Green peas",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Tomatoes",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Butter",
        "quantity": "5",
        "unit": "tbsp"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Capsicum",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Pav bhaji masala",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Kashmiri red chili powder",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Pav buns",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Boil potatoes, cauliflower and peas until soft.",
      "Heat butter in a wide pan. Fry onion until golden.",
      "Add tomatoes and capsicum. Cook until mushy.",
      "Add pav bhaji masala and Kashmiri chili. Cook 5 minutes.",
      "Add boiled vegetables and mash together completely.",
      "Add water to adjust consistency. Simmer 15 minutes.",
      "Toast pav buns on butter until golden.",
      "Serve bhaji topped with butter, lemon and raw onion."
    ],
    "chef_notes": "The flat iron tawa and liberal butter are what make street-style pav bhaji special. Do not be shy with the butter. Mash the vegetables completely \u2014 no chunks.",
    "serving_suggestions": "Serve piping hot bhaji with butter-toasted pav, raw onion, lemon wedge and coriander.",
    "nutrition_estimate": {
      "calories": "415",
      "protein_g": "10",
      "carbohydrates_g": "58",
      "fat_g": "18"
    },
    "tags": [
      "Street Food",
      "Vegetarian",
      "Mumbai",
      "Iconic"
    ],
    "image_prompt": "Ultra realistic professional food photography of Mumbai pav bhaji, vibrant red spiced vegetable mash sizzling on iron tawa, butter melting, served with golden toasted pav, lemon and onion, street food atmosphere",
    "seo_keywords": [
      "pav bhaji recipe",
      "mumbai street food",
      "pav bhaji masala recipe",
      "maharashtrian main course",
      "indian vegetarian street food"
    ],
    "img": "/images/india/maharashtra/main-courses/pav-bhaji-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Matki Chi Usal Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/matki-usal",
    "dish_name": "Matki Chi Usal",
    "state": "Maharashtra",
    "category": "Main Courses",
    "difficulty_level": "Medium",
    "prep_time_minutes": 480,
    "cook_time_minutes": 30,
    "total_time_minutes": 510,
    "servings": 4,
    "short_description": "Matki Chi Usal is a protein-rich curry made with sprouted moth beans in a coconut-onion masala. A Maharashtra staple that appears both as a main course and as the base of the famous Misal Pav, it is hearty, nutritious and deeply flavorful.",
    "ingredients": [
      {
        "name": "Sprouted matki (moth beans)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Grated coconut",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Goda masala",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Sprout matki by soaking overnight and tying in cloth for 24 hours.",
      "Dry roast coconut until golden. Grind with fried onion.",
      "Heat oil and add mustard seeds and curry leaves.",
      "Add ginger-garlic paste and saut\u00e9.",
      "Add coconut-onion paste and goda masala. Fry 5 minutes.",
      "Add matki sprouts and water. Season with salt.",
      "Simmer 20 minutes until matki is cooked but holds shape.",
      "Garnish with coconut and coriander."
    ],
    "chef_notes": "Do not overcook the matki \u2014 it should have a slight bite. The sprouting process increases the protein and fiber content significantly.",
    "serving_suggestions": "Serve with bhakri or rice, or as the base for Misal Pav.",
    "nutrition_estimate": {
      "calories": "235",
      "protein_g": "12",
      "carbohydrates_g": "28",
      "fat_g": "8"
    },
    "tags": [
      "Vegetarian",
      "Protein Rich",
      "Traditional",
      "Main Course"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian matki chi usal, sprouted moth bean curry in a copper bowl, coconut and coriander garnish, golden gravy, served with bhakri, warm natural light",
    "seo_keywords": [
      "matki usal recipe",
      "moth bean curry maharashtra",
      "sprouted matki recipe",
      "maharashtrian main course",
      "misal base recipe"
    ],
    "img": "/images/india/maharashtra/main-courses/matki-chi-usal-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kombdi Vade Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/kombdi-vade",
    "dish_name": "Kombdi Vade",
    "state": "Maharashtra",
    "category": "Main Courses",
    "difficulty_level": "Hard",
    "prep_time_minutes": 60,
    "cook_time_minutes": 60,
    "total_time_minutes": 120,
    "servings": 4,
    "short_description": "Kombdi Vade is Malvan's most celebrated dish \u2014 a spicy coconut-based chicken curry (kombdi) served with crispy fried wheat-rice pooris (vade). A Konkan culinary masterpiece, this combination of fiery curry and crispy bread is one of Maharashtra's finest meals.",
    "ingredients": [
      {
        "name": "Chicken pieces",
        "quantity": "800",
        "unit": "g"
      },
      {
        "name": "Grated coconut, dry roasted",
        "quantity": "8",
        "unit": "tbsp"
      },
      {
        "name": "Malvani masala",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Onions",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "For vade - wheat flour",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "For vade - rice flour",
        "quantity": "50",
        "unit": "g"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Salt",
        "quantity": "2",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Dry roast coconut deeply until dark brown. Grind with fried onion into thick paste.",
      "Saut\u00e9 ginger-garlic paste, add Malvani masala and coconut paste. Fry 8 minutes.",
      "Add chicken pieces, brown well. Add water and cook 40 minutes.",
      "For vade: mix flours, salt and make soft dough.",
      "Roll into small thick circles.",
      "Deep fry vade until golden and puffed.",
      "Serve hot chicken curry with crispy vade."
    ],
    "chef_notes": "Malvani masala contains 25+ spices including kokum, star anise and stone flower. It cannot be substituted. Deep browning of the coconut is the secret to the authentic dark color and smoky depth of this dish.",
    "serving_suggestions": "Serve kombdi (chicken curry) with freshly fried vade and raw onion salad.",
    "nutrition_estimate": {
      "calories": "520",
      "protein_g": "38",
      "carbohydrates_g": "42",
      "fat_g": "22"
    },
    "tags": [
      "Non-Vegetarian",
      "Konkan",
      "Malvani",
      "Celebratory"
    ],
    "image_prompt": "Ultra realistic professional food photography of Kombdi Vade, dark fiery Malvani chicken curry alongside golden puffed vade bread, traditional Konkan coastal setting, coconut tree background, warm sunlight",
    "seo_keywords": [
      "kombdi vade recipe",
      "malvani chicken recipe",
      "konkan chicken curry",
      "maharashtrian coastal food",
      "malvani cuisine recipe"
    ],
    "img": "/images/india/maharashtra/main-courses/kombdi-vade-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Shepu Bhaji Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/shepu-bhaji",
    "dish_name": "Shepu Bhaji",
    "state": "Maharashtra",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": 4,
    "short_description": "Shepu Bhaji is a simple, fragrant dry vegetable dish made with fresh dill leaves, roasted peanuts and coconut. A beloved everyday Maharashtrian green sabzi, it is intensely aromatic and pairs beautifully with dal and rice.",
    "ingredients": [
      {
        "name": "Fresh dill leaves (shepu)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Roasted peanuts",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Grated coconut",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Garlic",
        "quantity": "3",
        "unit": "cloves"
      },
      {
        "name": "Oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Wash and finely chop dill leaves.",
      "Heat oil, add mustard seeds, crushed garlic and green chili.",
      "Add chopped dill leaves and saut\u00e9 on high heat for 3 minutes.",
      "Add peanuts, salt and lemon juice.",
      "Cook for 5 more minutes until dill is wilted and fragrant.",
      "Finish with fresh coconut and serve."
    ],
    "chef_notes": "Dill is strongly aromatic \u2014 cook on high heat briefly to intensify rather than lose its fragrance. Do not overcook or it becomes bitter.",
    "serving_suggestions": "Serve with toor dal, rice and bhakri as part of a Maharashtrian thali.",
    "nutrition_estimate": {
      "calories": "155",
      "protein_g": "5",
      "carbohydrates_g": "8",
      "fat_g": "11"
    },
    "tags": [
      "Vegetarian",
      "Everyday",
      "Green Vegetable",
      "Quick"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian shepu bhaji dill stir fry in a pan, vibrant green color, peanuts and coconut visible, aromatic garnish, clean natural food photography",
    "seo_keywords": [
      "shepu bhaji recipe",
      "dill leaves sabzi maharashtra",
      "maharashtrian green sabzi",
      "dill stir fry india",
      "shepu recipe"
    ],
    "img": "/images/india/maharashtra/main-courses/shepu-bhaji-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Zunka Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/zunka",
    "dish_name": "Zunka",
    "state": "Maharashtra",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": 4,
    "short_description": "Zunka is a thick, spiced besan preparation \u2014 the rustic cousin of pithla. Made with dry-roasted besan, onion and spices with minimal water, it is the definitive comfort food of the Maharashtrian countryside. Zunka-Bhakri is a complete meal beloved across all of rural Maharashtra.",
    "ingredients": [
      {
        "name": "Besan (chickpea flour)",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Green chili",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Garlic",
        "quantity": "4",
        "unit": "cloves"
      },
      {
        "name": "Asafoetida",
        "quantity": "1",
        "unit": "pinch"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Heat oil in a kadhai and add mustard seeds, asafoetida and curry leaves.",
      "Add sliced garlic, green chili and onion. Fry until golden.",
      "Add turmeric.",
      "Add besan and roast on low heat, stirring constantly, for 8-10 minutes.",
      "Add splashes of water \u2014 about 4-5 tablespoons total \u2014 while stirring.",
      "The zunka should be dry and crumbly, not wet.",
      "Season with salt and serve hot."
    ],
    "chef_notes": "Zunka should be drier than pithla. Add water in very small splashes to create a slightly moist but crumbly texture. The besan must be well-roasted \u2014 raw besan taste is the enemy.",
    "serving_suggestions": "Serve hot with jowar bhakri, raw onion and green chili. This combination is called Zunka-Bhakri.",
    "nutrition_estimate": {
      "calories": "235",
      "protein_g": "10",
      "carbohydrates_g": "28",
      "fat_g": "10"
    },
    "tags": [
      "Vegetarian",
      "Village Food",
      "Traditional",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian zunka in a clay bowl, dry golden besan with onion and spices, served with jowar bhakri on a steel plate, rustic village Maharashtrian setting",
    "seo_keywords": [
      "zunka recipe",
      "zunka bhakri maharashtra",
      "besan dry curry",
      "maharashtrian village food",
      "traditional zunka recipe"
    ],
    "img": "/images/india/maharashtra/main-courses/zunka-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Hirwa Thecha Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/hirwa-thecha",
    "dish_name": "Hirwa Thecha",
    "state": "Maharashtra",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 15,
    "servings": 4,
    "short_description": "Hirwa Thecha is Maharashtra's most essential table condiment \u2014 a roughly pounded green chili and garlic relish with fresh coriander and roasted peanuts. Fiery, fragrant and addictive, it is eaten with every Maharashtrian meal.",
    "ingredients": [
      {
        "name": "Green chilies",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Garlic",
        "quantity": "8",
        "unit": "cloves"
      },
      {
        "name": "Roasted peanuts",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Fresh coriander",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Heat oil in a small pan. Fry green chilies briefly for 1-2 minutes.",
      "Add garlic and fry 1 more minute.",
      "Remove from heat. Cool slightly.",
      "Place in mortar with peanuts, coriander and salt.",
      "Pound coarsely \u2014 do not grind smooth.",
      "Add lemon juice and mix. Serve immediately."
    ],
    "chef_notes": "Thecha is intentionally coarse and chunky \u2014 never blend smooth. The rough texture is what makes it special. Adjust chili quantity based on heat preference.",
    "serving_suggestions": "Serve with jowar bhakri, dal-rice or any Maharashtrian meal as a condiment.",
    "nutrition_estimate": {
      "calories": "90",
      "protein_g": "4",
      "carbohydrates_g": "6",
      "fat_g": "6"
    },
    "tags": [
      "Condiment",
      "Vegan",
      "Spicy",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian hirwa thecha green chili relish in a small clay pot, coarse chunky texture, green and peanut colors, rustic mortar alongside, dark background",
    "seo_keywords": [
      "thecha recipe",
      "hirwa thecha",
      "maharashtrian green chili chutney",
      "green chili garlic relish",
      "bhakri condiment"
    ],
    "img": "/images/india/maharashtra/sides/hirwa-thecha-maharashtra-side.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Dry Garlic Chutney Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/dry-garlic-chutney",
    "dish_name": "Lasun Khobra Chutney",
    "state": "Maharashtra",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": 8,
    "short_description": "The famous dry garlic-coconut chutney that goes into every Vada Pav and is served alongside countless Maharashtrian snacks. A coarse powder of roasted garlic, dried coconut and red chilies \u2014 this is the most important condiment in Maharashtrian cuisine.",
    "ingredients": [
      {
        "name": "Garlic",
        "quantity": "12",
        "unit": "cloves"
      },
      {
        "name": "Dried coconut, grated",
        "quantity": "6",
        "unit": "tbsp"
      },
      {
        "name": "Kashmiri red chili powder",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Cumin seeds, roasted",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Dry roast garlic cloves in a dry pan until golden and slightly charred.",
      "Dry roast dried coconut until golden brown \u2014 not too dark.",
      "Dry roast cumin seeds.",
      "Grind all roasted ingredients with chili powder and salt.",
      "Pulse to a coarse powder \u2014 not smooth.",
      "Store in airtight jar for up to 2 weeks."
    ],
    "chef_notes": "The chutney must remain coarse and dry \u2014 never add water or oil. The smoky garlic and roasted coconut flavors must be distinct. Use dried coconut, not fresh.",
    "serving_suggestions": "Essential for Vada Pav. Also great with bhakri, thalipeeth and as a rice seasoning.",
    "nutrition_estimate": {
      "calories": "55",
      "protein_g": "1",
      "carbohydrates_g": "4",
      "fat_g": "4"
    },
    "tags": [
      "Condiment",
      "Vegan",
      "Gluten-Free",
      "Dry Chutney"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian dry garlic coconut chutney in a small bowl, reddish-brown coarse powder, garlic cloves and dried coconut visible alongside, dark rustic background",
    "seo_keywords": [
      "dry garlic chutney recipe",
      "lasun chutney vada pav",
      "maharashtrian dry chutney",
      "garlic coconut chutney powder",
      "vada pav chutney recipe"
    ],
    "img": "/images/india/maharashtra/sides/lasun-khobra-chutney-maharashtra-side.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Green Chutney Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/hirvi-chutney",
    "dish_name": "Hirvi Chutney",
    "state": "Maharashtra",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 6,
    "short_description": "Maharashtra's vibrant green coriander and coconut chutney that accompanies every snack, street food and meal. Made with fresh coriander, fresh coconut, green chili and lemon, it is bright, fresh and perfectly balanced.",
    "ingredients": [
      {
        "name": "Fresh coriander",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Fresh coconut, grated",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Garlic",
        "quantity": "2",
        "unit": "cloves"
      },
      {
        "name": "Ginger",
        "quantity": "0.5",
        "unit": "inch"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.75",
        "unit": "tsp"
      },
      {
        "name": "Sugar",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Roasted peanuts",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Add all ingredients to a blender.",
      "Blend with minimal water to a smooth but slightly thick paste.",
      "Taste and adjust salt, lemon and chili.",
      "Store refrigerated for up to 3 days."
    ],
    "chef_notes": "The coconut and peanuts add body and prevent the chutney from being too watery. Use minimal water \u2014 the chutney should coat a spoon.",
    "serving_suggestions": "Serve with vada pav, samosa, bhaji, sabudana vada or any Maharashtra snack.",
    "nutrition_estimate": {
      "calories": "60",
      "protein_g": "2",
      "carbohydrates_g": "5",
      "fat_g": "4"
    },
    "tags": [
      "Condiment",
      "Vegan",
      "Gluten-Free",
      "Fresh Chutney"
    ],
    "image_prompt": "Ultra realistic food photography of vibrant green Maharashtrian coriander coconut chutney in a small bowl, bright green color, fresh coriander leaves as garnish, clean bright food photography",
    "seo_keywords": [
      "hirvi chutney recipe",
      "maharashtrian green chutney",
      "coriander coconut chutney",
      "vada pav green chutney",
      "indian green sauce recipe"
    ],
    "img": "/images/india/maharashtra/sides/hirvi-chutney-maharashtra-side.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kanda Lasun Masala Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/kanda-lasun-masala",
    "dish_name": "Kanda Lasun Masala",
    "state": "Maharashtra",
    "category": "Sides",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 15,
    "total_time_minutes": 35,
    "servings": 8,
    "short_description": "Kanda Lasun Masala is the foundational flavor paste of Maharashtrian cooking \u2014 a deeply caramelized onion and garlic masala that forms the base of countless curries. Made in large batches and stored, it is the secret to authentic Maharashtrian flavor.",
    "ingredients": [
      {
        "name": "Onions",
        "quantity": "4",
        "unit": "large"
      },
      {
        "name": "Garlic",
        "quantity": "20",
        "unit": "cloves"
      },
      {
        "name": "Dried red chilies",
        "quantity": "6",
        "unit": "pieces"
      },
      {
        "name": "Grated coconut",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Dry roast coconut until golden.",
      "Fry sliced onions in oil until very deep brown \u2014 almost caramelized.",
      "Add garlic and dried chilies. Fry 3 more minutes.",
      "Cool completely.",
      "Grind with roasted coconut and salt to a smooth paste.",
      "Store in refrigerator for up to 10 days."
    ],
    "chef_notes": "The deep browning of onions is non-negotiable \u2014 this is what creates the characteristic sweetness and depth in Maharashtrian curries. Raw or lightly cooked onion paste will not achieve the same result.",
    "serving_suggestions": "Use as a base for any Maharashtrian curry, especially chicken, fish or vegetable.",
    "nutrition_estimate": {
      "calories": "85",
      "protein_g": "2",
      "carbohydrates_g": "8",
      "fat_g": "5"
    },
    "tags": [
      "Masala Base",
      "Condiment",
      "Vegan",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of deep brown Maharashtrian kanda lasun masala paste in a glass jar, rich caramelized color, garlic and chili visible, rustic kitchen background",
    "seo_keywords": [
      "kanda lasun masala recipe",
      "maharashtrian curry base",
      "onion garlic paste india",
      "maharashtrian masala recipe",
      "caramelized onion masala"
    ],
    "img": "/images/india/maharashtra/sides/kanda-lasun-masala-maharashtra-side.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Goda Masala Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/goda-masala",
    "dish_name": "Goda Masala",
    "state": "Maharashtra",
    "category": "Sides",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 15,
    "total_time_minutes": 35,
    "servings": 16,
    "short_description": "Goda Masala is Maharashtra's most unique and precious spice blend \u2014 a complex mixture of 20+ spices including dagad phool (stone flower), kalpasi, cloves, coconut and cinnamon. The word 'goda' means sweet in Marathi, reflecting its slightly sweet, aromatic character.",
    "ingredients": [
      {
        "name": "Coriander seeds",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Cumin seeds",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Grated dried coconut",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Dried red chilies",
        "quantity": "6",
        "unit": "pieces"
      },
      {
        "name": "Cloves",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Cinnamon",
        "quantity": "2",
        "unit": "inch"
      },
      {
        "name": "Stone flower (dagad phool)",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Black pepper",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Sesame seeds",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Bay leaves",
        "quantity": "3",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Dry roast each spice separately in a pan until fragrant.",
      "Roast dried coconut until deep golden.",
      "Allow all roasted spices to cool completely.",
      "Grind together into a fine powder.",
      "Store in an airtight jar in a cool, dark place.",
      "Lasts up to 3 months when stored properly."
    ],
    "chef_notes": "Stone flower (dagad phool) is the most important spice in goda masala \u2014 it gives it a unique mushroom-like earthy character that cannot be replicated. Source from a Maharashtrian store if possible.",
    "serving_suggestions": "Use in Aamti dal, Bharli Vangi, Masala Bhaat and all traditional Maharashtrian curries.",
    "nutrition_estimate": {
      "calories": "35",
      "protein_g": "1",
      "carbohydrates_g": "4",
      "fat_g": "2"
    },
    "tags": [
      "Spice Blend",
      "Vegan",
      "Gluten-Free",
      "Traditional"
    ],
    "image_prompt": "Ultra realistic food photography of homemade goda masala spice blend in a glass jar, rich dark brown color, whole spices displayed around the jar \u2014 stone flower, cloves, cinnamon, coconut, food magazine styling",
    "seo_keywords": [
      "goda masala recipe",
      "maharashtrian spice blend",
      "how to make goda masala",
      "dagad phool masala",
      "authentic goda masala ingredients"
    ],
    "img": "/images/india/maharashtra/sides/goda-masala-maharashtra-side.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Ambadi Pickle Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/raw-mango-pickle",
    "dish_name": "Kairi Loncha (Raw Mango Pickle)",
    "state": "Maharashtra",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 20,
    "cook_time_minutes": 5,
    "total_time_minutes": 1445,
    "servings": 16,
    "short_description": "Kairi Loncha is the quintessential Maharashtrian raw mango pickle \u2014 small pieces of tart raw mango marinated in mustard oil with chili, turmeric, mustard seeds and fenugreek. A summer staple that every household makes when the first raw mangoes arrive.",
    "ingredients": [
      {
        "name": "Raw mango",
        "quantity": "500",
        "unit": "g"
      },
      {
        "name": "Mustard oil",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "3",
        "unit": "tsp"
      },
      {
        "name": "Turmeric",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Mustard seeds, coarsely crushed",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Fenugreek seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Asafoetida",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Cut raw mango into small pieces with skin. Do not peel.",
      "Mix mango with salt and leave overnight to release juice.",
      "Heat mustard oil to smoking point, cool completely.",
      "Dry roast fenugreek seeds until slightly dark. Crush coarsely.",
      "Mix mango with chili, turmeric, mustard, fenugreek and asafoetida.",
      "Add mustard oil and mix well.",
      "Store in a glass jar. Ready in 24 hours, best after 3 days."
    ],
    "chef_notes": "Heating mustard oil to smoking point and cooling removes its bitterness. This step must not be skipped. The pickle tastes best after a few days when the mango absorbs the spices.",
    "serving_suggestions": "Serve with dal-rice, bhakri or as a condiment with any Maharashtrian meal.",
    "nutrition_estimate": {
      "calories": "40",
      "protein_g": "0",
      "carbohydrates_g": "4",
      "fat_g": "3"
    },
    "tags": [
      "Pickle",
      "Vegan",
      "Gluten-Free",
      "Summer Special"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian raw mango pickle in a traditional glass jar, vibrant orange-red color, mango pieces visible in spiced oil, rustic kitchen background, sunlight through window",
    "seo_keywords": [
      "kairi loncha recipe",
      "raw mango pickle maharashtra",
      "indian mango pickle",
      "maharashtrian achar",
      "summer mango pickle recipe"
    ],
    "img": "/images/india/maharashtra/sides/kairi-loncha-maharashtra-side.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Peanut Chutney Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/peanut-chutney",
    "dish_name": "Shenga Chutney",
    "state": "Maharashtra",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 15,
    "servings": 6,
    "short_description": "A rich, creamy roasted peanut chutney that is uniquely Maharashtrian \u2014 made with dry-roasted peanuts, garlic, chilies and a hint of tamarind. Thicker and earthier than South Indian peanut chutney, it is the perfect accompaniment to bhakri and rice.",
    "ingredients": [
      {
        "name": "Roasted peanuts",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Garlic",
        "quantity": "4",
        "unit": "cloves"
      },
      {
        "name": "Dried red chilies",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Tamarind",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Mustard seeds",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "0.75",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Grind peanuts with garlic, red chilies, tamarind and salt.",
      "Add minimal water to make a coarse thick chutney.",
      "Prepare tempering with mustard seeds in oil.",
      "Pour tempering over chutney and mix.",
      "Serve immediately or refrigerate for up to 5 days."
    ],
    "chef_notes": "Keep the texture coarse \u2014 Maharashtrian peanut chutney should never be smooth. The garlic must be raw, not cooked, for a sharp contrast.",
    "serving_suggestions": "Serve with bhakri, thalipeeth, poha or as a dipping sauce.",
    "nutrition_estimate": {
      "calories": "150",
      "protein_g": "6",
      "carbohydrates_g": "6",
      "fat_g": "12"
    },
    "tags": [
      "Condiment",
      "Vegan",
      "Gluten-Free",
      "Protein Rich"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian peanut chutney in a small bowl, coarse textured, earthy brown color, tempering visible on top, peanuts scattered around, dark rustic background",
    "seo_keywords": [
      "shenga chutney recipe",
      "peanut chutney maharashtra",
      "groundnut chutney india",
      "maharashtrian peanut sauce",
      "bhakri condiment recipe"
    ],
    "img": "/images/india/maharashtra/sides/shenga-chutney-maharashtra-side.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Tamarind Chutney Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/tamarind-chutney",
    "dish_name": "Chincha Gul Chutney",
    "state": "Maharashtra",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": 8,
    "short_description": "Chincha Gul Chutney is Maharashtra's sweet-and-sour tamarind-jaggery sauce that accompanies chaat, bhel puri, and countless street snacks. The Maharashtrian version is uniquely spiced with goda masala for a distinctly regional character.",
    "ingredients": [
      {
        "name": "Tamarind",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Jaggery",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Goda masala",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Cumin powder",
        "quantity": "0.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak tamarind in warm water. Extract thick pulp.",
      "Combine tamarind pulp with jaggery in a pan.",
      "Cook on medium heat until jaggery dissolves and sauce thickens.",
      "Add goda masala, chili, salt and cumin.",
      "Simmer until sauce coats a spoon.",
      "Cool and store in airtight jar for up to 2 weeks."
    ],
    "chef_notes": "The goda masala addition is what makes this distinctly Maharashtrian rather than generic tamarind chutney. Adjust the tamarind-jaggery ratio to your preferred sweet-sour balance.",
    "serving_suggestions": "Serve with vada pav, bhel puri, samosa, dahi puri or any chaat.",
    "nutrition_estimate": {
      "calories": "65",
      "protein_g": "0",
      "carbohydrates_g": "16",
      "fat_g": "0"
    },
    "tags": [
      "Condiment",
      "Vegan",
      "Gluten-Free",
      "Sweet Chutney"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian tamarind jaggery chutney in a small glass bowl, dark brown glossy sauce, served alongside bhel puri, warm amber light",
    "seo_keywords": [
      "chincha gul chutney recipe",
      "maharashtrian tamarind chutney",
      "sweet tamarind sauce india",
      "chaat chutney recipe",
      "imli jaggery chutney"
    ],
    "img": "/images/india/maharashtra/sides/chincha-gul-chutney-maharashtra-side.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Coconut Chutney Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/fresh-coconut-chutney",
    "dish_name": "Khobra Chutney",
    "state": "Maharashtra",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 3,
    "total_time_minutes": 13,
    "servings": 6,
    "short_description": "Fresh coconut chutney is essential to the Konkan Maharashtrian table \u2014 a bright white paste of fresh coconut, green chili and coriander tempered with mustard seeds. It accompanies dosas, idlis, bhakri and countless Konkan dishes.",
    "ingredients": [
      {
        "name": "Fresh coconut, grated",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Ginger",
        "quantity": "0.5",
        "unit": "inch"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Roasted chana dal",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Mustard seeds",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "6",
        "unit": "pieces"
      },
      {
        "name": "Oil",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Blend coconut with green chili, ginger, coriander, chana dal, lemon and salt.",
      "Add minimal water to make a smooth but thick paste.",
      "Prepare tempering with mustard seeds and curry leaves.",
      "Pour tempering over chutney.",
      "Serve immediately or refrigerate for up to 2 days."
    ],
    "chef_notes": "Always use fresh coconut for best results. The roasted chana dal adds body and a nutty flavor. The chutney should be thick enough to scoop, not runny.",
    "serving_suggestions": "Serve with amboli, ghavan, dosa, idli or any Konkan breakfast.",
    "nutrition_estimate": {
      "calories": "110",
      "protein_g": "2",
      "carbohydrates_g": "6",
      "fat_g": "9"
    },
    "tags": [
      "Condiment",
      "Vegan",
      "Gluten-Free",
      "Konkan"
    ],
    "image_prompt": "Ultra realistic food photography of fresh white coconut chutney in a small bowl, mustard seeds and curry leaves on top, served alongside ghavan, bright natural coastal light",
    "seo_keywords": [
      "fresh coconut chutney recipe",
      "khobra chutney maharashtra",
      "konkan coconut chutney",
      "white coconut chutney india",
      "maharashtrian dip recipe"
    ],
    "img": "/images/india/maharashtra/sides/khobra-chutney-maharashtra-side.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Gajar Loncha Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/carrot-pickle",
    "dish_name": "Gajar Loncha",
    "state": "Maharashtra",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 5,
    "total_time_minutes": 1460,
    "servings": 12,
    "short_description": "Gajar Loncha is a crunchy, spiced Maharashtrian carrot pickle made with fresh carrots marinated in mustard oil, red chili and mustard seeds. Unlike preservative-heavy commercial pickles, this fresh homestyle pickle is bright, crunchy and ready to eat within 24 hours.",
    "ingredients": [
      {
        "name": "Carrots",
        "quantity": "500",
        "unit": "g"
      },
      {
        "name": "Mustard seeds, crushed",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Mustard oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Asafoetida",
        "quantity": "0.25",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Cut carrots into thick matchstick pieces.",
      "Mix with salt and turmeric. Leave 30 minutes.",
      "Drain any liquid that releases.",
      "Heat mustard oil to smoking, cool completely.",
      "Mix carrots with red chili, mustard seeds, asafoetida and lemon.",
      "Add cooled mustard oil and mix well.",
      "Leave for 24 hours before eating. Keeps 1 week."
    ],
    "chef_notes": "Cut carrots thicker than you think \u2014 they will soften slightly in the pickle. The mustard oil must be heated and cooled to remove bitterness.",
    "serving_suggestions": "Serve with rice and dal, bhakri or as a condiment with any Maharashtrian meal.",
    "nutrition_estimate": {
      "calories": "50",
      "protein_g": "0",
      "carbohydrates_g": "6",
      "fat_g": "3"
    },
    "tags": [
      "Pickle",
      "Vegan",
      "Gluten-Free",
      "Quick Pickle"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian gajar loncha carrot pickle in a glass jar, bright orange carrot pieces in red chili oil, mustard seeds visible, rustic kitchen window background",
    "seo_keywords": [
      "gajar loncha recipe",
      "carrot pickle maharashtra",
      "indian carrot pickle",
      "quick carrot achar recipe",
      "maharashtrian loncha"
    ],
    "img": "/images/india/maharashtra/sides/gajar-loncha-maharashtra-side.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Varan Bhaat Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/varan-bhaat",
    "dish_name": "Varan Bhaat",
    "state": "Maharashtra",
    "category": "Rice Preparations",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": 4,
    "short_description": "Varan Bhaat is the most comforting, soulful meal in Maharashtra \u2014 plain steamed rice topped with ghee-drizzled Varan (simple toor dal). Eaten at every festival, celebration and everyday meal, it is the backbone of Maharashtrian home cooking.",
    "ingredients": [
      {
        "name": "Basmati or kolam rice",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Toor dal",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Cook rice in rice cooker or pot with 1:2 ratio of rice to water.",
      "Separately pressure cook toor dal with turmeric until very soft.",
      "Mash dal and thin with hot water to pouring consistency.",
      "Season dal with salt and lemon juice.",
      "Serve hot rice in a plate with dal poured over and abundant ghee."
    ],
    "chef_notes": "The generosity of ghee is what makes Varan Bhaat extraordinary \u2014 do not be shy. In Maharashtra, eating Varan Bhaat with ghee is almost sacred.",
    "serving_suggestions": "Serve with papad, pickle and koshimbir as a complete simple meal.",
    "nutrition_estimate": {
      "calories": "420",
      "protein_g": "12",
      "carbohydrates_g": "70",
      "fat_g": "11"
    },
    "tags": [
      "Festival Food",
      "Vegetarian",
      "Comfort Food",
      "Everyday"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian varan bhaat, white steamed rice with golden dal poured over, ghee pool visible, served on a banana leaf with papad and pickle, warm comforting light",
    "seo_keywords": [
      "varan bhaat recipe",
      "maharashtrian rice dal",
      "toor dal rice maharashtra",
      "festival food maharashtra",
      "simple indian comfort meal"
    ],
    "img": "/images/india/maharashtra/rice/varan-bhaat-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Bhel Puri Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/bhel-puri",
    "dish_name": "Mumbai Bhel Puri",
    "state": "Maharashtra",
    "category": "Appetizers",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 0,
    "total_time_minutes": 15,
    "servings": 4,
    "short_description": "Mumbai Bhel Puri is the city's most iconic street snack \u2014 a dazzling mix of puffed rice, sev, vegetables, chutneys and spices. Assembled in seconds on the beach or street corner, each serving is a perfect symphony of textures and flavors.",
    "ingredients": [
      {
        "name": "Puffed rice (kurmura)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Fine sev",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Boiled potatoes, diced",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Onion, finely chopped",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Tomato, finely chopped",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Tamarind chutney",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Green chutney",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Raw mango, grated",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "In a large bowl combine puffed rice, potatoes, onion, tomato, raw mango.",
      "Add both chutneys and chaat masala.",
      "Add lemon juice and coriander.",
      "Toss quickly and well.",
      "Top with sev generously.",
      "Serve immediately \u2014 bhel must be eaten within minutes."
    ],
    "chef_notes": "Speed is essential \u2014 bhel goes soggy quickly. Assemble and eat immediately. The raw mango adds the authentic Mumbai bhel tang that cannot be substituted.",
    "serving_suggestions": "Serve immediately in paper cones or cups as a snack.",
    "nutrition_estimate": {
      "calories": "280",
      "protein_g": "6",
      "carbohydrates_g": "52",
      "fat_g": "6"
    },
    "tags": [
      "Street Food",
      "Vegetarian",
      "Mumbai",
      "Chaat"
    ],
    "image_prompt": "Ultra realistic food photography of Mumbai bhel puri in a paper cone, colorful puffed rice mix with sev, chutneys, onion and coriander, Juhu beach setting, golden hour light",
    "seo_keywords": [
      "bhel puri recipe",
      "mumbai bhel recipe",
      "maharashtrian chaat",
      "puffed rice snack india",
      "juhu beach bhel"
    ],
    "img": "/images/india/maharashtra/appetizers/mumbai-bhel-puri-maharashtra-appetizer.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Tadgola Kheer Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/tadgola-kheer",
    "dish_name": "Tadgola Kheer",
    "state": "Maharashtra",
    "category": "Desserts",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": 4,
    "short_description": "Tadgola Kheer is a uniquely Maharashtrian summer dessert made with ice apple (tadgola/palm fruit) \u2014 the tender translucent fruit of the palm tree that is beloved on Maharashtra's coast. Simmered in sweetened milk with cardamom, it is cool, delicate and seasonal.",
    "ingredients": [
      {
        "name": "Tadgola (ice apple/palm fruit)",
        "quantity": "6",
        "unit": "pieces"
      },
      {
        "name": "Full fat milk",
        "quantity": "600",
        "unit": "ml"
      },
      {
        "name": "Sugar",
        "quantity": "80",
        "unit": "g"
      },
      {
        "name": "Cardamom powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Rose water",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Pistachios",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Peel tadgola and slice into thin rounds.",
      "Bring milk to a boil and simmer until slightly reduced.",
      "Add sugar, cardamom and rose water.",
      "Remove from heat and cool completely.",
      "Add tadgola slices to cooled milk.",
      "Refrigerate for 1 hour before serving.",
      "Garnish with pistachios."
    ],
    "chef_notes": "Tadgola must be added to cooled milk \u2014 adding to hot milk will make it lose its delicate texture. This is a seasonal dish best made from May to June when tadgola is fresh.",
    "serving_suggestions": "Serve chilled as a summer dessert.",
    "nutrition_estimate": {
      "calories": "195",
      "protein_g": "6",
      "carbohydrates_g": "30",
      "fat_g": "6"
    },
    "tags": [
      "Seasonal",
      "Summer Dessert",
      "Vegetarian",
      "Coastal Maharashtra"
    ],
    "image_prompt": "Ultra realistic food photography of tadgola kheer in a glass bowl, translucent ice apple pieces in creamy milk, pistachios garnish, cooling summer dessert photography, bright coastal light",
    "seo_keywords": [
      "tadgola kheer recipe",
      "ice apple dessert india",
      "palm fruit milk sweet",
      "maharashtrian summer dessert",
      "coastal maharashtra recipe"
    ],
    "img": "/images/india/maharashtra/desserts/tadgola-kheer-maharashtra-dessert.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Narali Bhaat Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/narali-bhaat",
    "dish_name": "Narali Bhaat",
    "state": "Maharashtra",
    "category": "Rice Preparations",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "Narali Bhaat is a fragrant, mildly sweet coconut rice made on Narali Purnima \u2014 the full moon festival that marks the start of the Konkan fishing season. Rice cooked in coconut milk with jaggery, cardamom and topped with dried fruits, it is a celebratory dish of coastal Maharashtra.",
    "ingredients": [
      {
        "name": "Basmati rice",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Fresh coconut milk",
        "quantity": "400",
        "unit": "ml"
      },
      {
        "name": "Jaggery",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Grated coconut",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Cloves",
        "quantity": "4",
        "unit": "pieces"
      },
      {
        "name": "Ghee",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cashews",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Raisins",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.25",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Wash and soak basmati rice for 20 minutes.",
      "Heat ghee and fry cashews and raisins. Set aside.",
      "Fry cloves in remaining ghee.",
      "Add rice and fry for 2 minutes.",
      "Add coconut milk and 200ml water. Bring to boil.",
      "Add jaggery and a pinch of salt.",
      "Cook covered on very low heat for 18 minutes.",
      "Fluff gently and top with coconut, cardamom and fried nuts."
    ],
    "chef_notes": "The jaggery gives narali bhaat its characteristic pale amber color. Use fresh coconut milk \u2014 packaged coconut milk will not give the same aroma. Eat fresh as this rice does not reheat well.",
    "serving_suggestions": "Serve warm as a festive dish during Narali Purnima or coconut-themed celebrations.",
    "nutrition_estimate": {
      "calories": "385",
      "protein_g": "6",
      "carbohydrates_g": "62",
      "fat_g": "12"
    },
    "tags": [
      "Festival Food",
      "Vegetarian",
      "Coastal Maharashtra",
      "Sweet Rice"
    ],
    "image_prompt": "Ultra realistic professional food photography of Maharashtrian narali bhaat, fragrant coconut rice on a banana leaf, golden color, garnished with fresh coconut, cashews, raisins and marigolds, Narali Purnima festival setting",
    "seo_keywords": [
      "narali bhaat recipe",
      "coconut rice maharashtra",
      "narali purnima recipe",
      "konkan sweet rice",
      "maharashtrian festival rice"
    ],
    "img": "/images/india/maharashtra/rice/narali-bhaat-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kadhi Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/maharashtrian-kadhi",
    "dish_name": "Maharashtrian Kadhi",
    "state": "Maharashtra",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": 4,
    "short_description": "Maharashtrian Kadhi is a delicate, tangy yogurt and besan soup-curry that is lighter and more restrained than its Rajasthani or Gujarati counterparts. Tempered with mustard, curry leaves and ginger, it is a staple of the Maharashtra thali.",
    "ingredients": [
      {
        "name": "Yogurt",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Besan",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Water",
        "quantity": "400",
        "unit": "ml"
      },
      {
        "name": "Ginger",
        "quantity": "0.5",
        "unit": "inch"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Turmeric",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Whisk yogurt and besan together until completely smooth with no lumps.",
      "Add water and whisk again.",
      "Pour into a pan and heat on medium, stirring constantly.",
      "Add ginger, green chili and turmeric.",
      "Cook until it comes to a boil and thickens slightly.",
      "Prepare tempering with ghee, mustard and curry leaves.",
      "Add tempering to kadhi and simmer 5 minutes."
    ],
    "chef_notes": "Constant stirring while cooking is essential to prevent the kadhi from curdling. The mixture must be cold when you start heating \u2014 starting from room temperature leads to curdling.",
    "serving_suggestions": "Serve with steamed rice and papad as part of Maharashtra thali.",
    "nutrition_estimate": {
      "calories": "145",
      "protein_g": "7",
      "carbohydrates_g": "12",
      "fat_g": "8"
    },
    "tags": [
      "Vegetarian",
      "Thali",
      "Traditional",
      "Everyday"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian kadhi in a small brass bowl, golden yellow creamy curry, mustard seeds and curry leaves floating, served alongside white steamed rice",
    "seo_keywords": [
      "maharashtrian kadhi recipe",
      "yogurt curry maharashtra",
      "besan kadhi recipe",
      "kadhi rice",
      "maharashtrian thali recipe"
    ],
    "img": "/images/india/maharashtra/main-courses/maharashtrian-kadhi.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Sol Kadhi Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/sol-kadhi",
    "dish_name": "Sol Kadhi",
    "state": "Maharashtra",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 30,
    "cook_time_minutes": 0,
    "total_time_minutes": 30,
    "servings": 4,
    "short_description": "Sol Kadhi is the iconic pink digestive drink-curry of the Konkan coast \u2014 made from kokum and coconut milk. A stunning deep pink color, cooling, tangy and subtly spiced, it is served as a digestive drink after Malvani or Konkani fish meals.",
    "ingredients": [
      {
        "name": "Dried kokum",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Fresh coconut milk",
        "quantity": "300",
        "unit": "ml"
      },
      {
        "name": "Garlic",
        "quantity": "3",
        "unit": "cloves"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Cumin powder",
        "quantity": "0.25",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak kokum in 200ml warm water for 20 minutes.",
      "Squeeze kokum to extract all juice. Strain.",
      "Crush garlic and green chili into a paste.",
      "Mix coconut milk with kokum water.",
      "Add garlic paste, cumin, salt.",
      "Stir well and chill.",
      "Garnish with coriander and serve cold."
    ],
    "chef_notes": "Sol Kadhi should never be heated \u2014 it will split and lose its beautiful pink color. Always serve cold or at room temperature. Adjust kokum quantity for desired tanginess.",
    "serving_suggestions": "Serve cold alongside Malvani fish thali or as a digestive drink after a rich meal.",
    "nutrition_estimate": {
      "calories": "85",
      "protein_g": "1",
      "carbohydrates_g": "8",
      "fat_g": "6"
    },
    "tags": [
      "Konkan",
      "Digestive",
      "Vegan",
      "Gluten-Free",
      "Cooling"
    ],
    "image_prompt": "Ultra realistic food photography of sol kadhi in a glass, stunning deep pink-purple color, coconut cream swirl, fresh coriander garnish, Konkan fish thali in background, bright coastal photography",
    "seo_keywords": [
      "sol kadhi recipe",
      "kokum coconut milk drink",
      "malvani sol kadhi",
      "pink digestive drink india",
      "konkan sol kadhi recipe"
    ],
    "img": "/images/india/maharashtra/sides/sol-kadhi-maharashtra-side.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Phodnicha Bhat Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/phodnicha-bhat",
    "dish_name": "Phodnicha Bhat",
    "state": "Maharashtra",
    "category": "Rice Preparations",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": 4,
    "short_description": "Phodnicha Bhat is Maharashtra's beloved leftover rice stir-fry \u2014 day-old rice tempered with mustard seeds, curry leaves, onion, green chili and turmeric. Quick, fragrant and deeply satisfying, it is a staple morning dish across Maharashtrian households.",
    "ingredients": [
      {
        "name": "Cooked leftover rice",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Grated coconut",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Heat oil in a pan and add mustard seeds. Let them splutter.",
      "Add curry leaves, green chili and sliced onion.",
      "Saut\u00e9 until onion turns translucent.",
      "Add turmeric and leftover rice. Mix well on high heat.",
      "Toss for 3-4 minutes until rice is heated through.",
      "Add salt, lemon juice, coconut and coriander.",
      "Serve hot with yogurt or pickle."
    ],
    "chef_notes": "Day-old cold rice works best \u2014 fresh rice becomes mushy. Break any lumps before adding to the pan. High heat gives the rice a slight crispy texture.",
    "serving_suggestions": "Serve with fresh yogurt, pickle and papad for a quick breakfast or lunch.",
    "nutrition_estimate": {
      "calories": "285",
      "protein_g": "5",
      "carbohydrates_g": "52",
      "fat_g": "6"
    },
    "tags": [
      "Vegetarian",
      "Quick",
      "Leftover Rice",
      "Everyday"
    ],
    "image_prompt": "Ultra realistic food photography of Maharashtrian phodnicha bhat tempered rice in a steel plate, golden yellow color, mustard seeds and curry leaves visible, garnished with coconut and coriander",
    "seo_keywords": [
      "phodnicha bhat recipe",
      "maharashtrian fried rice",
      "leftover rice india",
      "tempered rice maharashtra"
    ],
    "img": "/images/india/maharashtra/rice/phodnicha-bhat-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Indrayani Rice Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/indrayani-rice",
    "dish_name": "Indrayani Rice",
    "state": "Maharashtra",
    "category": "Rice Preparations",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": 4,
    "short_description": "Indrayani is a premium short-grain rice variety grown exclusively in the Maval region near Pune, Maharashtra. Cooked simply with ghee and minimal spices, its natural aroma and sticky texture make it one of Maharashtra's most prized rice preparations.",
    "ingredients": [
      {
        "name": "Indrayani rice",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Ghee",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Water",
        "quantity": "500",
        "unit": "ml"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "5",
        "unit": "pieces"
      },
      {
        "name": "Cumin seeds",
        "quantity": "0.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Wash Indrayani rice gently 2-3 times until water runs clear.",
      "Soak for 20 minutes.",
      "Heat ghee in a heavy pot and add cumin and curry leaves.",
      "Add drained rice and fry gently for 2 minutes.",
      "Add water and salt. Bring to boil.",
      "Cover and cook on very low heat for 18 minutes.",
      "Rest for 5 minutes before serving with generous ghee."
    ],
    "chef_notes": "Indrayani rice has a natural floral aroma that requires no heavy spicing. Cook it simply \u2014 the rice is the star. Available in Pune markets and online.",
    "serving_suggestions": "Serve with any Maharashtrian dal, kadhi or simple varan. Best enjoyed with ghee.",
    "nutrition_estimate": {
      "calories": "310",
      "protein_g": "6",
      "carbohydrates_g": "62",
      "fat_g": "5"
    },
    "tags": [
      "Vegetarian",
      "Premium Rice",
      "Pune",
      "Traditional"
    ],
    "image_prompt": "Ultra realistic food photography of Indrayani rice in a traditional brass plate, perfectly cooked short grain rice, ghee pool, curry leaves garnish, clean minimal styling",
    "seo_keywords": [
      "indrayani rice recipe",
      "maharashtrian premium rice",
      "maval rice pune",
      "indrayani chawal recipe"
    ],
    "img": "/images/india/maharashtra/rice/indrayani-rice-maharashtra.jpg"
  },
  {
    "seo_title": "Authentic Maharashtrian Kolhapuri Bhat Recipe | FusionChef AI",
    "slug": "/indian-cuisine/maharashtra/kolhapuri-bhat",
    "dish_name": "Kolhapuri Bhat",
    "state": "Maharashtra",
    "category": "Rice Preparations",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "Kolhapuri Bhat is a fiery, aromatic spiced rice from the culinary capital of Maharashtra \u2014 Kolhapur. Made with the legendary Kolhapuri masala, roasted coconut and dry red chilies, this rice dish packs the bold, unapologetic heat that Kolhapur is famous for.",
    "ingredients": [
      {
        "name": "Basmati rice",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Kolhapuri masala",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Grated coconut, roasted",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Dried red chilies",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Wash and soak basmati rice for 20 minutes.",
      "Heat oil and add mustard seeds, curry leaves and dried red chilies.",
      "Add sliced onion and fry until golden.",
      "Add Kolhapuri masala and roasted coconut. Fry 3 minutes.",
      "Add drained rice and toss to coat.",
      "Add 550ml water and salt. Bring to boil.",
      "Cover and cook on low heat for 18 minutes.",
      "Garnish with coriander and roasted coconut."
    ],
    "chef_notes": "Kolhapuri masala is the key \u2014 do not substitute with regular garam masala. The roasted coconut adds a smoky depth that complements the fiery masala perfectly.",
    "serving_suggestions": "Serve with Kolhapuri chicken rassa, sol kadhi and papad.",
    "nutrition_estimate": {
      "calories": "340",
      "protein_g": "7",
      "carbohydrates_g": "58",
      "fat_g": "9"
    },
    "tags": [
      "Spicy",
      "Vegetarian",
      "Kolhapuri",
      "Festival Food"
    ],
    "image_prompt": "Ultra realistic food photography of spicy Kolhapuri bhat in a copper plate, reddish-orange spiced rice, roasted coconut and coriander garnish, dramatic Kolhapuri setting",
    "seo_keywords": [
      "kolhapuri bhat recipe",
      "spicy maharashtrian rice",
      "kolhapur rice recipe",
      "kolhapuri masala rice"
    ],
    "img": "/images/india/maharashtra/rice/kolhapuri-bhat-maharashtra.jpg"
  }
];

const punjabCuisineData = [
  {
    "seo_title": "Authentic Punjabi Dal Makhani Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/dal-makhani",
    "dish_name": "Dal Makhani",
    "state": "Punjab",
    "category": "Soups",
    "difficulty_level": "Medium",
    "prep_time_minutes": 480,
    "cook_time_minutes": 60,
    "total_time_minutes": 540,
    "servings": 4,
    "short_description": "Dal Makhani is Punjab's most iconic lentil preparation \u2014 black urad dal and rajma slow-cooked overnight with butter, cream and tomatoes into a velvety, deeply satisfying dal that is the soul of Punjabi cooking.",
    "ingredients": [
      {
        "name": "Whole black urad dal",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Rajma (kidney beans)",
        "quantity": "50",
        "unit": "g"
      },
      {
        "name": "Butter",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Fresh cream",
        "quantity": "100",
        "unit": "ml"
      },
      {
        "name": "Tomatoes",
        "quantity": "3",
        "unit": "medium"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Garam masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak urad dal and rajma overnight in water.",
      "Pressure cook together until completely soft \u2014 about 6-8 whistles.",
      "Mash lightly and simmer on very low heat.",
      "In a separate pan, heat butter and fry onion until golden.",
      "Add ginger-garlic paste, tomatoes and spices. Cook until oil separates.",
      "Add this masala to the dal and mix well.",
      "Simmer on lowest heat for 30-45 minutes stirring occasionally.",
      "Finish with cream and butter. Serve garnished with a cream swirl."
    ],
    "chef_notes": "The secret to restaurant-style Dal Makhani is the long slow simmer \u2014 the longer it cooks, the better it gets. Dhaba-style dal is cooked for 6-8 hours on a wood fire.",
    "serving_suggestions": "Serve with butter naan, tandoori roti or jeera rice.",
    "nutrition_estimate": {
      "calories": "385",
      "protein_g": "15",
      "carbohydrates_g": "42",
      "fat_g": "18"
    },
    "tags": [
      "Vegetarian",
      "Iconic",
      "Slow Cooked",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic professional food photography of Dal Makhani in a copper bowl, dark velvety lentils with cream swirl and butter, garnished with coriander, warm dramatic lighting",
    "seo_keywords": [
      "dal makhani recipe",
      "punjabi dal makhani",
      "black dal recipe",
      "restaurant style dal makhani"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Sarson Ka Saag Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/sarson-ka-saag",
    "dish_name": "Sarson Ka Saag",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 60,
    "total_time_minutes": 80,
    "servings": 4,
    "short_description": "Sarson Ka Saag is Punjab's most beloved winter dish \u2014 mustard greens slow-cooked with spinach, bathua and spices into a thick, earthy and deeply nourishing preparation. Served with makki di roti and white butter, it is the soul of Punjabi winter.",
    "ingredients": [
      {
        "name": "Mustard greens (sarson)",
        "quantity": "500",
        "unit": "g"
      },
      {
        "name": "Spinach",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Bathua (chenopodium)",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Ginger",
        "quantity": "2",
        "unit": "inch"
      },
      {
        "name": "Garlic",
        "quantity": "6",
        "unit": "cloves"
      },
      {
        "name": "Green chili",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Maize flour (makki atta)",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Butter",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Wash and roughly chop all greens.",
      "Pressure cook greens with ginger, garlic and green chili for 3 whistles.",
      "Blend coarsely \u2014 do not make smooth.",
      "Add maize flour and cook stirring for 20 minutes.",
      "Prepare tempering with butter, onion until golden.",
      "Add tempering to saag and mix well.",
      "Simmer 15 more minutes on low heat.",
      "Serve topped with a generous dollop of white butter."
    ],
    "chef_notes": "Bathua (wild spinach) is essential for authentic sarson ka saag \u2014 it adds a distinctive earthiness. Maize flour thickens the saag and prevents it from being watery.",
    "serving_suggestions": "Serve with makki di roti, white butter (makkhan) and jaggery.",
    "nutrition_estimate": {
      "calories": "185",
      "protein_g": "6",
      "carbohydrates_g": "18",
      "fat_g": "10"
    },
    "tags": [
      "Vegetarian",
      "Winter Special",
      "Iconic",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic professional food photography of Sarson Ka Saag, deep green mustard greens in a brass bowl topped with white butter, served alongside makki di roti, rustic Punjabi setting",
    "seo_keywords": [
      "sarson ka saag recipe",
      "punjabi saag",
      "mustard greens recipe",
      "sarson saag makki roti"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Butter Chicken Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/butter-chicken",
    "dish_name": "Murgh Makhani",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Medium",
    "prep_time_minutes": 40,
    "cook_time_minutes": 45,
    "total_time_minutes": 85,
    "servings": 4,
    "short_description": "Murgh Makhani \u2014 Butter Chicken \u2014 is arguably India's most famous dish, born in the kitchens of Delhi's Moti Mahal restaurant from Punjabi roots. Tandoor-roasted chicken in a velvety tomato-butter-cream sauce, it is indulgent, mildly spiced and universally beloved.",
    "ingredients": [
      {
        "name": "Chicken",
        "quantity": "800",
        "unit": "g"
      },
      {
        "name": "Butter",
        "quantity": "5",
        "unit": "tbsp"
      },
      {
        "name": "Fresh cream",
        "quantity": "150",
        "unit": "ml"
      },
      {
        "name": "Tomatoes",
        "quantity": "4",
        "unit": "large"
      },
      {
        "name": "Cashews",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Kashmiri red chili powder",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Kasuri methi",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Garam masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Honey",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Marinate chicken in yogurt, ginger-garlic paste, Kashmiri chili and spices for 4 hours.",
      "Grill or cook chicken in a very hot pan until charred. Set aside.",
      "Cook onion, tomatoes and cashews together until soft. Blend smooth.",
      "Heat butter, add the blended sauce and cook for 15 minutes.",
      "Add Kashmiri chili, kasuri methi and garam masala.",
      "Add grilled chicken pieces and simmer 15 minutes.",
      "Finish with cream and honey. Adjust seasoning.",
      "Garnish with cream swirl and kasuri methi."
    ],
    "chef_notes": "Kasuri methi (dried fenugreek) is the secret ingredient that gives Murgh Makhani its distinctive restaurant aroma. Always add it at the end. Kashmiri chili gives color without heat.",
    "serving_suggestions": "Serve with butter naan, laccha paratha or steamed basmati rice.",
    "nutrition_estimate": {
      "calories": "420",
      "protein_g": "32",
      "carbohydrates_g": "14",
      "fat_g": "26"
    },
    "tags": [
      "Non-Vegetarian",
      "Iconic",
      "Creamy",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic professional food photography of Murgh Makhani butter chicken in a copper karahi, vibrant orange-red creamy sauce, tender chicken pieces, cream swirl, garnished with kasuri methi and green chili",
    "seo_keywords": [
      "butter chicken recipe",
      "murgh makhani recipe",
      "punjabi butter chicken",
      "restaurant style butter chicken"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Amritsari Fish Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/amritsari-fish",
    "dish_name": "Amritsari Machhi",
    "state": "Punjab",
    "category": "Appetizers",
    "difficulty_level": "Medium",
    "prep_time_minutes": 30,
    "cook_time_minutes": 20,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "Amritsari Machhi is the legendary crispy fried fish from the holy city of Amritsar \u2014 marinated in a spiced besan-ajwain batter and deep fried to a glorious golden crunch. Served with green chutney and onion rings, it is street food perfection.",
    "ingredients": [
      {
        "name": "Fish fillets (sole or pomfret)",
        "quantity": "600",
        "unit": "g"
      },
      {
        "name": "Besan",
        "quantity": "6",
        "unit": "tbsp"
      },
      {
        "name": "Rice flour",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Ajwain (carom seeds)",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Kashmiri red chili",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Amchur (dry mango powder)",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Clean fish and make cuts on both sides for marinade penetration.",
      "Marinate with ginger-garlic paste, lemon, chili, amchur and salt for 20 minutes.",
      "Make a thick batter with besan, rice flour, ajwain and water.",
      "Dip marinated fish in batter.",
      "Deep fry in hot oil until golden and crispy \u2014 about 4 minutes each side.",
      "Drain and serve immediately with green chutney."
    ],
    "chef_notes": "Ajwain (carom seeds) is what makes this distinctly Amritsari. The double coating \u2014 marinate then batter \u2014 ensures the fish stays juicy inside while being incredibly crispy outside.",
    "serving_suggestions": "Serve with green chutney, sliced onion rings and lemon wedges.",
    "nutrition_estimate": {
      "calories": "310",
      "protein_g": "28",
      "carbohydrates_g": "18",
      "fat_g": "14"
    },
    "tags": [
      "Non-Vegetarian",
      "Street Food",
      "Amritsar",
      "Crispy"
    ],
    "image_prompt": "Ultra realistic professional food photography of Amritsari Machhi, golden crispy fried fish pieces, served with green chutney and onion rings, newspaper wrap, street food atmosphere",
    "seo_keywords": [
      "amritsari machhi recipe",
      "punjabi fried fish",
      "amritsar fish fry",
      "crispy fish recipe india"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Tandoori Chicken Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/tandoori-chicken",
    "dish_name": "Tandoori Chicken",
    "state": "Punjab",
    "category": "Appetizers",
    "difficulty_level": "Medium",
    "prep_time_minutes": 480,
    "cook_time_minutes": 30,
    "total_time_minutes": 510,
    "servings": 4,
    "short_description": "Tandoori Chicken is Punjab's greatest gift to the world \u2014 chicken marinated in yogurt and spices then roasted in a blazing tandoor until charred and smoky. The iconic red-orange color, smoky aroma and juicy interior make it one of India's most recognizable dishes.",
    "ingredients": [
      {
        "name": "Chicken legs and thighs",
        "quantity": "800",
        "unit": "g"
      },
      {
        "name": "Thick yogurt",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Kashmiri red chili powder",
        "quantity": "3",
        "unit": "tsp"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Mustard oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Garam masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Coriander powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Cumin powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "2",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Score chicken pieces deeply with a sharp knife.",
      "First marinade: apply lemon juice, salt and chili for 30 minutes.",
      "Second marinade: mix yogurt, ginger-garlic paste, mustard oil and all spices.",
      "Coat chicken thoroughly and refrigerate overnight.",
      "Cook in a very hot oven at 240\u00b0C or on a grill.",
      "Cook for 25-30 minutes turning once until charred on edges.",
      "Rest 5 minutes before serving with green chutney and sliced onions."
    ],
    "chef_notes": "Mustard oil is essential for authentic Tandoori flavor \u2014 do not substitute with regular oil. Overnight marination makes all the difference. The chicken should have dark charred spots.",
    "serving_suggestions": "Serve with mint chutney, sliced onion, lemon wedges and laccha paratha.",
    "nutrition_estimate": {
      "calories": "295",
      "protein_g": "35",
      "carbohydrates_g": "5",
      "fat_g": "14"
    },
    "tags": [
      "Non-Vegetarian",
      "Iconic",
      "Tandoor",
      "Grilled"
    ],
    "image_prompt": "Ultra realistic professional food photography of Tandoori Chicken, charred smoky chicken legs on a sizzling plate, vibrant red-orange color, served with mint chutney and onion rings, dramatic dark background",
    "seo_keywords": [
      "tandoori chicken recipe",
      "punjabi tandoori",
      "clay oven chicken",
      "authentic tandoori chicken marinade"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Paneer Tikka Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/paneer-tikka",
    "dish_name": "Punjabi Paneer Tikka",
    "state": "Punjab",
    "category": "Appetizers",
    "difficulty_level": "Easy",
    "prep_time_minutes": 60,
    "cook_time_minutes": 20,
    "total_time_minutes": 80,
    "servings": 4,
    "short_description": "Punjabi Paneer Tikka is the king of vegetarian starters \u2014 cubes of fresh cottage cheese marinated in a spiced yogurt mixture and grilled until blistered and smoky. Served on skewers with capsicum and onion, it is a party favourite across India.",
    "ingredients": [
      {
        "name": "Paneer",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Thick yogurt",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Kashmiri red chili powder",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Besan",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Kasuri methi",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Mustard oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Capsicum",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Cut paneer into large cubes. Cut capsicum and onion into squares.",
      "Mix yogurt with all spices, besan, kasuri methi and mustard oil.",
      "Marinate paneer, capsicum and onion in the mixture for 1 hour.",
      "Thread onto skewers alternating paneer, capsicum and onion.",
      "Grill on high heat or in oven at 220\u00b0C for 15-18 minutes.",
      "Brush with butter and grill 2 more minutes until charred.",
      "Sprinkle chaat masala and serve with mint chutney."
    ],
    "chef_notes": "Besan in the marinade helps it stick to the paneer and creates a light crust. Do not skip the charring \u2014 it's what gives tikka its distinctive smoky flavor.",
    "serving_suggestions": "Serve with mint chutney, sliced onion and lemon wedges.",
    "nutrition_estimate": {
      "calories": "285",
      "protein_g": "18",
      "carbohydrates_g": "10",
      "fat_g": "19"
    },
    "tags": [
      "Vegetarian",
      "Grilled",
      "Party Starter",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic professional food photography of Paneer Tikka on skewers, charred paneer cubes with capsicum and onion, vibrant orange marinade, sizzling plate, served with mint chutney",
    "seo_keywords": [
      "paneer tikka recipe",
      "punjabi paneer tikka",
      "grilled paneer recipe",
      "vegetarian tikka"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Chole Bhature Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/chole-bhature",
    "dish_name": "Chole Bhature",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Medium",
    "prep_time_minutes": 480,
    "cook_time_minutes": 60,
    "total_time_minutes": 540,
    "servings": 4,
    "short_description": "Chole Bhature is Punjab's most iconic breakfast and brunch dish \u2014 deeply spiced chickpeas served with pillowy deep-fried bread. The dark, tangy chole and the puffed golden bhature together create one of India's most satisfying and beloved combinations.",
    "ingredients": [
      {
        "name": "Dried chickpeas (kabuli chana)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Tea bag",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Onions",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Tomatoes",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Chole masala",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Amchur",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Maida (for bhature)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Yogurt (for bhature)",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Salt",
        "quantity": "2",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak chickpeas overnight. Pressure cook with tea bag for dark color.",
      "Fry onions until deep brown. Add ginger-garlic paste and tomatoes.",
      "Add chole masala and amchur. Cook until oil separates.",
      "Add cooked chickpeas and mash some for thick gravy.",
      "Simmer 20 minutes. Adjust seasoning.",
      "For bhature: knead maida with yogurt, salt and water into soft dough. Rest 2 hours.",
      "Roll into oval shapes and deep fry until puffed and golden.",
      "Serve chole with hot bhature, sliced onion and pickle."
    ],
    "chef_notes": "The tea bag trick gives chole its characteristic dark color naturally. Mashing some chickpeas creates a thick gravy without adding any thickener.",
    "serving_suggestions": "Serve with pickled onions, green chili, mango pickle and lassi.",
    "nutrition_estimate": {
      "calories": "580",
      "protein_g": "18",
      "carbohydrates_g": "72",
      "fat_g": "24"
    },
    "tags": [
      "Vegetarian",
      "Street Food",
      "Breakfast",
      "Iconic"
    ],
    "image_prompt": "Ultra realistic professional food photography of Chole Bhature, dark spiced chickpeas alongside golden puffed bhature, pickled onions and green chili, vibrant Punjabi dhaba setting",
    "seo_keywords": [
      "chole bhature recipe",
      "punjabi chole bhature",
      "chickpea curry puri",
      "delhi chole bhature"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Rajma Chawal Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/rajma-chawal",
    "dish_name": "Rajma Chawal",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 480,
    "cook_time_minutes": 45,
    "total_time_minutes": 525,
    "servings": 4,
    "short_description": "Rajma Chawal \u2014 red kidney bean curry with steamed rice \u2014 is Punjab's ultimate comfort food. Slow-cooked kidney beans in a thick onion-tomato masala, served over steamed rice with a drizzle of ghee. Simple, hearty and deeply nourishing.",
    "ingredients": [
      {
        "name": "Rajma (kidney beans)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Onions",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Tomatoes",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Rajma masala",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Basmati rice",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Bay leaf",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak rajma overnight. Pressure cook until very soft.",
      "Heat ghee with cumin seeds and bay leaf.",
      "Add onions and fry until deep golden.",
      "Add ginger-garlic paste and tomatoes. Cook until oil separates.",
      "Add rajma masala and cooked rajma with its water.",
      "Simmer 20 minutes mashing some beans for thick gravy.",
      "Cook basmati rice separately.",
      "Serve rajma over rice with ghee and raw onion salad."
    ],
    "chef_notes": "The rajma water from pressure cooking is liquid gold \u2014 never drain it. It thickens the curry and adds deep flavor. A good rajma masala is the key.",
    "serving_suggestions": "Serve over steamed basmati rice with ghee, raw onion salad and pickle.",
    "nutrition_estimate": {
      "calories": "450",
      "protein_g": "16",
      "carbohydrates_g": "72",
      "fat_g": "12"
    },
    "tags": [
      "Vegetarian",
      "Comfort Food",
      "Everyday",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic professional food photography of Rajma Chawal, dark red kidney bean curry over white basmati rice in a steel plate, ghee drizzle, raw onion on side, homestyle Punjabi setting",
    "seo_keywords": [
      "rajma chawal recipe",
      "punjabi rajma recipe",
      "kidney bean curry rice",
      "rajma masala recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Makki Di Roti Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/makki-di-roti",
    "dish_name": "Makki Di Roti",
    "state": "Punjab",
    "category": "Breads",
    "difficulty_level": "Medium",
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": 4,
    "short_description": "Makki Di Roti is Punjab's iconic cornmeal flatbread \u2014 thick, rustic and slightly sweet, best eaten hot off the tawa with sarson ka saag and a generous knob of white butter. A winter staple that represents the heart of Punjabi rural cooking.",
    "ingredients": [
      {
        "name": "Maize flour (makki atta)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Warm water",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "White butter (makkhan)",
        "quantity": "4",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Mix maize flour with salt and warm water.",
      "Knead into a soft dough \u2014 maize has no gluten so it will be crumbly.",
      "Divide into balls and flatten on a wet cloth or between plastic sheets.",
      "Carefully transfer to a hot dry tawa.",
      "Cook on medium heat, pressing gently with a wet hand.",
      "Cook on both sides until golden spots appear.",
      "Apply white butter generously and serve immediately."
    ],
    "chef_notes": "Makki roti is gluten-free and requires patience to roll \u2014 use wet hands and a plastic sheet. Always eat fresh and hot as it hardens when cold.",
    "serving_suggestions": "Serve hot with sarson ka saag, white butter and jaggery.",
    "nutrition_estimate": {
      "calories": "240",
      "protein_g": "5",
      "carbohydrates_g": "46",
      "fat_g": "5"
    },
    "tags": [
      "Gluten-Free",
      "Vegetarian",
      "Winter Special",
      "Traditional"
    ],
    "image_prompt": "Ultra realistic food photography of Makki Di Roti, thick golden cornmeal flatbread on a cast iron tawa, white butter melting on top, sarson ka saag alongside, rustic Punjabi winter setting",
    "seo_keywords": [
      "makki di roti recipe",
      "cornmeal flatbread punjab",
      "maize roti recipe",
      "makki roti sarson saag"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Butter Naan Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/butter-naan",
    "dish_name": "Butter Naan",
    "state": "Punjab",
    "category": "Breads",
    "difficulty_level": "Medium",
    "prep_time_minutes": 120,
    "cook_time_minutes": 20,
    "total_time_minutes": 140,
    "servings": 4,
    "short_description": "Butter Naan is Punjab's most celebrated bread \u2014 a leavened, pillowy flatbread cooked in a blazing tandoor and brushed with generous amounts of butter. Soft, slightly charred and irresistibly good, it is the perfect vehicle for Punjab's rich curries.",
    "ingredients": [
      {
        "name": "All-purpose flour (maida)",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Yogurt",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Instant yeast",
        "quantity": "5",
        "unit": "g"
      },
      {
        "name": "Sugar",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Butter",
        "quantity": "5",
        "unit": "tbsp"
      },
      {
        "name": "Milk",
        "quantity": "100",
        "unit": "ml"
      },
      {
        "name": "Nigella seeds (kalonji)",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Activate yeast in warm milk with sugar for 10 minutes.",
      "Mix flour, yogurt, salt and yeast mixture. Knead 10 minutes.",
      "Rest covered for 1.5 hours until doubled.",
      "Divide into balls and roll into teardrop shapes.",
      "Press nigella seeds on top.",
      "Cook on a very hot tawa or under a grill until puffed and charred.",
      "Brush generously with butter immediately and serve."
    ],
    "chef_notes": "The hotter the cooking surface, the better the naan. A cast iron pan on highest heat gives good results at home. Brushing with butter while hot is non-negotiable.",
    "serving_suggestions": "Serve with dal makhani, butter chicken, paneer dishes or any Punjabi curry.",
    "nutrition_estimate": {
      "calories": "290",
      "protein_g": "7",
      "carbohydrates_g": "46",
      "fat_g": "9"
    },
    "tags": [
      "Vegetarian",
      "Bread",
      "Tandoor",
      "Iconic"
    ],
    "image_prompt": "Ultra realistic food photography of butter naan, pillowy charred flatbread glistening with butter, fresh coriander on top, served in a basket with a side of dal makhani, warm restaurant lighting",
    "seo_keywords": [
      "butter naan recipe",
      "punjabi naan",
      "homemade naan bread",
      "tandoor naan recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Laccha Paratha Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/laccha-paratha",
    "dish_name": "Laccha Paratha",
    "state": "Punjab",
    "category": "Breads",
    "difficulty_level": "Medium",
    "prep_time_minutes": 30,
    "cook_time_minutes": 20,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "Laccha Paratha is a multi-layered flaky whole wheat flatbread that is a Punjabi masterpiece. The concentric coiled layers created by folding and rolling the dough separate into crispy, buttery strata when cooked \u2014 making it one of the most texturally satisfying Indian breads.",
    "ingredients": [
      {
        "name": "Whole wheat flour",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Ghee",
        "quantity": "5",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Warm water",
        "quantity": "180",
        "unit": "ml"
      }
    ],
    "preparation_steps": [
      "Knead flour, salt and water into a smooth soft dough. Rest 20 minutes.",
      "Roll a ball into a large thin circle.",
      "Brush generously with ghee.",
      "Make pleats like a fan \u2014 fold accordion-style.",
      "Roll the pleated strip into a coil.",
      "Flatten the coil gently and roll into a circle.",
      "Cook on hot tawa with ghee on both sides until golden and crispy.",
      "Crush gently between palms to separate layers before serving."
    ],
    "chef_notes": "The crushing step after cooking is essential \u2014 it separates the layers and gives laccha paratha its signature flaky appearance. Do not skip this.",
    "serving_suggestions": "Serve with dal makhani, any Punjabi curry, raita or butter.",
    "nutrition_estimate": {
      "calories": "310",
      "protein_g": "7",
      "carbohydrates_g": "44",
      "fat_g": "12"
    },
    "tags": [
      "Vegetarian",
      "Flaky",
      "Layered Bread",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic food photography of laccha paratha, flaky multi-layered wheat flatbread crushed to show layers, golden and crispy, ghee glistening, served with dal makhani",
    "seo_keywords": [
      "laccha paratha recipe",
      "layered paratha punjab",
      "flaky paratha recipe",
      "punjabi bread recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Aloo Paratha Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/aloo-paratha",
    "dish_name": "Aloo Paratha",
    "state": "Punjab",
    "category": "Breads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 30,
    "cook_time_minutes": 20,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "Aloo Paratha is Punjab's most beloved stuffed flatbread \u2014 whole wheat dough filled with spiced mashed potatoes and cooked on a tawa with generous amounts of butter or ghee. The perfect Punjabi breakfast, served with yogurt, pickle and white butter.",
    "ingredients": [
      {
        "name": "Whole wheat flour",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Potatoes",
        "quantity": "4",
        "unit": "large"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Coriander leaves",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Ajwain",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Amchur",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Butter",
        "quantity": "5",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Knead wheat flour into soft dough. Rest 20 minutes.",
      "Boil and mash potatoes completely smooth.",
      "Mix mashed potato with green chili, ginger, coriander, ajwain, amchur and salt.",
      "Roll dough ball into a small circle, place potato filling, seal completely.",
      "Roll gently into a large circle \u2014 filling should not tear through.",
      "Cook on hot tawa with generous butter on both sides.",
      "Cook until golden brown patches appear.",
      "Serve hot with white butter."
    ],
    "chef_notes": "The potato filling must be completely dry and lump-free \u2014 any moisture will cause the paratha to tear while rolling. A well-seasoned filling is the heart of a great Aloo Paratha.",
    "serving_suggestions": "Serve with white butter, yogurt, mango pickle and a glass of lassi.",
    "nutrition_estimate": {
      "calories": "380",
      "protein_g": "9",
      "carbohydrates_g": "56",
      "fat_g": "14"
    },
    "tags": [
      "Vegetarian",
      "Breakfast",
      "Stuffed Bread",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic food photography of Aloo Paratha, golden stuffed flatbread with butter melting on top, served with white yogurt, pickle and green chutney, homestyle Punjabi breakfast setting",
    "seo_keywords": [
      "aloo paratha recipe",
      "punjabi aloo paratha",
      "potato stuffed flatbread",
      "breakfast paratha recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Kulcha Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/amritsari-kulcha",
    "dish_name": "Amritsari Kulcha",
    "state": "Punjab",
    "category": "Breads",
    "difficulty_level": "Hard",
    "prep_time_minutes": 180,
    "cook_time_minutes": 20,
    "total_time_minutes": 200,
    "servings": 4,
    "short_description": "Amritsari Kulcha is the legendary stuffed bread from the holy city \u2014 a leavened maida bread filled with spiced potato or paneer mixture and baked in a tandoor until blistered and golden. Served with chole and white butter, it is one of Punjab's most indulgent pleasures.",
    "ingredients": [
      {
        "name": "Maida",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Yogurt",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Baking powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Potatoes (for filling)",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Butter",
        "quantity": "5",
        "unit": "tbsp"
      },
      {
        "name": "Pomegranate seeds (anardana)",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Knead maida with yogurt, baking powder, salt and water into soft dough. Rest 2-3 hours.",
      "Make filling: mash potatoes with finely chopped onion, green chili, coriander and anardana.",
      "Roll dough into circle, stuff with potato filling, seal.",
      "Roll gently into thick oval shape.",
      "Slap onto a very hot tawa or bake on inverted tawa at highest heat.",
      "Cook until blistered and golden on both sides.",
      "Apply generous butter immediately.",
      "Serve with chole and white butter."
    ],
    "chef_notes": "Anardana (dried pomegranate seeds) is the secret ingredient that gives Amritsari kulcha its characteristic tangy complexity. Do not substitute.",
    "serving_suggestions": "Serve with Punjabi chole, white butter, sliced onion and green chutney.",
    "nutrition_estimate": {
      "calories": "420",
      "protein_g": "9",
      "carbohydrates_g": "62",
      "fat_g": "15"
    },
    "tags": [
      "Vegetarian",
      "Amritsar",
      "Stuffed Bread",
      "Iconic"
    ],
    "image_prompt": "Ultra realistic food photography of Amritsari Kulcha, blistered golden stuffed bread with butter, served alongside dark chole curry, authentic Amritsar dhaba setting",
    "seo_keywords": [
      "amritsari kulcha recipe",
      "punjabi kulcha",
      "stuffed kulcha",
      "amritsar street food bread"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Matar Paneer Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/matar-paneer",
    "dish_name": "Matar Paneer",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 30,
    "total_time_minutes": 45,
    "servings": 4,
    "short_description": "Matar Paneer is a classic Punjabi curry of fresh green peas and cottage cheese in a rich onion-tomato gravy. Fragrant, mildly spiced and deeply satisfying, it is one of the most popular vegetarian dishes across North India.",
    "ingredients": [
      {
        "name": "Paneer",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Green peas",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Onions",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Tomatoes",
        "quantity": "3",
        "unit": "medium"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "1.5",
        "unit": "tbsp"
      },
      {
        "name": "Kashmiri red chili",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Garam masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Kasuri methi",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Fresh cream",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Blend onion and tomato into a smooth paste.",
      "Heat oil and cook the onion-tomato paste until oil separates.",
      "Add ginger-garlic paste and all spices. Fry 5 minutes.",
      "Add green peas and 200ml water. Simmer 10 minutes.",
      "Add paneer cubes gently.",
      "Simmer 10 more minutes.",
      "Crush kasuri methi between palms and add.",
      "Finish with cream. Serve garnished with coriander."
    ],
    "chef_notes": "Lightly frying paneer in butter before adding to curry keeps it soft and prevents crumbling. Fresh peas are ideal when in season.",
    "serving_suggestions": "Serve with butter naan, laccha paratha or steamed basmati rice.",
    "nutrition_estimate": {
      "calories": "320",
      "protein_g": "16",
      "carbohydrates_g": "14",
      "fat_g": "22"
    },
    "tags": [
      "Vegetarian",
      "Everyday",
      "Classic",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic food photography of Matar Paneer, paneer cubes and green peas in rich orange gravy in a copper karahi, garnished with cream and coriander, warm restaurant lighting",
    "seo_keywords": [
      "matar paneer recipe",
      "punjabi matar paneer",
      "peas paneer curry",
      "paneer recipe indian"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Palak Paneer Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/palak-paneer",
    "dish_name": "Palak Paneer",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": 4,
    "short_description": "Palak Paneer is a jewel of Punjabi vegetarian cooking \u2014 soft cubes of cottage cheese nestled in a vibrant, silky spinach sauce seasoned with ginger, garlic and aromatic spices. Nutritious, beautiful and deeply satisfying.",
    "ingredients": [
      {
        "name": "Spinach (palak)",
        "quantity": "500",
        "unit": "g"
      },
      {
        "name": "Paneer",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Tomato",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "1.5",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Cream",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Ghee",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Garam masala",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Blanch spinach in boiling water for 2 minutes. Shock in ice water.",
      "Blend spinach with green chili into a smooth puree.",
      "Heat ghee and fry cumin seeds, onion until golden.",
      "Add ginger-garlic paste and tomato. Cook until oil separates.",
      "Add spinach puree and garam masala. Simmer 10 minutes.",
      "Add paneer cubes and cream.",
      "Simmer 5 minutes. Serve hot."
    ],
    "chef_notes": "Blanching and shocking spinach preserves its brilliant green color. Do not overcook after adding spinach puree or it will lose its vibrant color.",
    "serving_suggestions": "Serve with butter naan, tandoori roti or steamed rice.",
    "nutrition_estimate": {
      "calories": "290",
      "protein_g": "18",
      "carbohydrates_g": "8",
      "fat_g": "20"
    },
    "tags": [
      "Vegetarian",
      "Healthy",
      "Classic",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic food photography of Palak Paneer, vibrant green spinach curry with white paneer cubes, cream swirl on top, garnished with ginger julienne, copper bowl, warm lighting",
    "seo_keywords": [
      "palak paneer recipe",
      "punjabi palak paneer",
      "spinach paneer curry",
      "saag paneer recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Kadhi Pakora Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/kadhi-pakora",
    "dish_name": "Punjabi Kadhi Pakora",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 45,
    "total_time_minutes": 65,
    "servings": 4,
    "short_description": "Punjabi Kadhi Pakora is a thick, tangy yogurt-besan curry loaded with crispy fried onion fritters. Unlike its thinner counterparts from other regions, Punjabi kadhi is hearty, bold and deeply flavored \u2014 a true comfort food staple.",
    "ingredients": [
      {
        "name": "Yogurt (sour)",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Besan",
        "quantity": "6",
        "unit": "tbsp"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Fenugreek seeds",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Dried red chilies",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Whisk yogurt with besan, turmeric and salt until smooth.",
      "Add 600ml water and mix well.",
      "Cook kadhi on medium heat stirring constantly for 30-35 minutes until thick.",
      "Make pakora batter with besan, sliced onion and spices. Fry until crispy.",
      "Add pakoras to kadhi just before serving.",
      "Prepare tempering with ghee, mustard seeds, fenugreek, dried chilies and garlic.",
      "Pour tempering over kadhi and serve immediately."
    ],
    "chef_notes": "Sour yogurt is essential for authentic Punjabi kadhi \u2014 if yogurt isn't sour enough, add a squeeze of lemon. Add pakoras just before serving to keep them crispy.",
    "serving_suggestions": "Serve with steamed rice, jeera rice or rotis.",
    "nutrition_estimate": {
      "calories": "340",
      "protein_g": "12",
      "carbohydrates_g": "32",
      "fat_g": "18"
    },
    "tags": [
      "Vegetarian",
      "Comfort Food",
      "Traditional",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic food photography of Punjabi Kadhi Pakora, golden yellow thick kadhi with crispy pakoras, red tempering oil swirled on top, served over white rice, copper bowl",
    "seo_keywords": [
      "kadhi pakora recipe",
      "punjabi kadhi recipe",
      "yogurt curry fritters",
      "kadhi chawal recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Shahi Paneer Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/shahi-paneer",
    "dish_name": "Shahi Paneer",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 35,
    "total_time_minutes": 55,
    "servings": 4,
    "short_description": "Shahi Paneer is the royal curry of Punjabi cuisine \u2014 a Mughal-influenced dish of paneer in a luxuriously rich cashew-cream-saffron gravy. Mildly spiced, aromatic and indulgent, it lives up to its regal name with every saffron-scented spoonful.",
    "ingredients": [
      {
        "name": "Paneer",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Cashews",
        "quantity": "5",
        "unit": "tbsp"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Fresh cream",
        "quantity": "150",
        "unit": "ml"
      },
      {
        "name": "Saffron",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Cardamom",
        "quantity": "3",
        "unit": "pods"
      },
      {
        "name": "Cloves",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "1.5",
        "unit": "tbsp"
      },
      {
        "name": "Rose water",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Butter",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak cashews in warm water for 30 minutes. Blend smooth.",
      "Soak saffron in 2 tablespoons warm milk.",
      "Saut\u00e9 onions with cardamom and cloves until golden. Blend smooth.",
      "Heat butter, add ginger-garlic paste and onion paste. Cook until oil separates.",
      "Add cashew paste and cook 5 minutes.",
      "Add cream, saffron milk and rose water. Simmer gently.",
      "Add paneer cubes and simmer 8 minutes.",
      "Garnish with saffron strands and silver leaf."
    ],
    "chef_notes": "Rose water and saffron define Shahi Paneer's Mughal character. Add them at the end \u2014 both are delicate and lose their fragrance with prolonged cooking.",
    "serving_suggestions": "Serve with butter naan, sheermal or steamed basmati rice.",
    "nutrition_estimate": {
      "calories": "410",
      "protein_g": "17",
      "carbohydrates_g": "12",
      "fat_g": "32"
    },
    "tags": [
      "Vegetarian",
      "Royal",
      "Mughal",
      "Creamy"
    ],
    "image_prompt": "Ultra realistic professional food photography of Shahi Paneer, paneer in pale golden saffron cream sauce, silver leaf garnish, served in an ornate copper bowl, elegant royal setting",
    "seo_keywords": [
      "shahi paneer recipe",
      "royal paneer curry",
      "mughal paneer recipe",
      "creamy paneer dish punjab"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Lassi Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/sweet-lassi",
    "dish_name": "Punjabi Sweet Lassi",
    "state": "Punjab",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 2,
    "short_description": "Punjabi Sweet Lassi is the world's most famous yogurt drink \u2014 thick, creamy, chilled and topped with a layer of malai (cream). Served in tall clay glasses, it is the perfect accompaniment to a hearty Punjabi meal and the ultimate summer cooler.",
    "ingredients": [
      {
        "name": "Full fat yogurt",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Sugar",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Chilled water or milk",
        "quantity": "150",
        "unit": "ml"
      },
      {
        "name": "Rose water",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Malai (cream layer)",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Ice cubes",
        "quantity": "6",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Blend yogurt with sugar, cardamom and water until frothy.",
      "Add rose water and blend briefly.",
      "Pour into tall chilled glasses with ice.",
      "Top with a generous layer of malai (cream).",
      "Optionally garnish with pistachios and rose petals.",
      "Serve immediately."
    ],
    "chef_notes": "The malai (cream) layer on top is the signature of authentic Punjabi lassi \u2014 never skip it. Use full-fat yogurt for the thick, rich texture.",
    "serving_suggestions": "Serve with chole bhature, aloo paratha or any Punjabi breakfast.",
    "nutrition_estimate": {
      "calories": "245",
      "protein_g": "8",
      "carbohydrates_g": "30",
      "fat_g": "11"
    },
    "tags": [
      "Beverage",
      "Vegetarian",
      "Summer Drink",
      "Iconic"
    ],
    "image_prompt": "Ultra realistic professional food photography of Punjabi Sweet Lassi in a tall clay glass, frothy white yogurt drink topped with cream layer and rose petals, pistachio garnish, golden afternoon light",
    "seo_keywords": [
      "punjabi lassi recipe",
      "sweet lassi recipe",
      "yogurt drink india",
      "punjabi sweet lassi"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Mango Lassi Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/mango-lassi",
    "dish_name": "Aam Ki Lassi",
    "state": "Punjab",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 2,
    "short_description": "Aam Ki Lassi is Punjab's summer celebration in a glass \u2014 thick Alphonso or Kesar mango pulp blended with creamy yogurt and chilled milk into the most indulgent of all lassi varieties. Vibrant, fruity and deeply refreshing.",
    "ingredients": [
      {
        "name": "Alphonso mango pulp",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Full fat yogurt",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Chilled milk",
        "quantity": "100",
        "unit": "ml"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Ice cubes",
        "quantity": "6",
        "unit": "pieces"
      },
      {
        "name": "Saffron",
        "quantity": "0.1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Blend mango pulp, yogurt, milk, sugar and cardamom together.",
      "Add ice and blend until frothy.",
      "Pour into tall glasses.",
      "Garnish with saffron strands and a drizzle of mango pulp.",
      "Serve immediately."
    ],
    "chef_notes": "Always use Alphonso or Kesar mango pulp for best flavor. Fresh ripe mangoes blended in are even better when in season.",
    "serving_suggestions": "Serve as a summer refreshment or alongside spicy Punjabi food.",
    "nutrition_estimate": {
      "calories": "265",
      "protein_g": "7",
      "carbohydrates_g": "42",
      "fat_g": "8"
    },
    "tags": [
      "Beverage",
      "Vegetarian",
      "Summer",
      "Fruity"
    ],
    "image_prompt": "Ultra realistic food photography of Mango Lassi in a tall glass, vibrant golden yellow color, saffron strands garnish, condensation on glass, summer tropical setting",
    "seo_keywords": [
      "mango lassi recipe",
      "aam lassi punjab",
      "mango yogurt drink",
      "alphonso mango lassi"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Nimbu Pani Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/nimbu-pani",
    "dish_name": "Shikanji",
    "state": "Punjab",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 0,
    "total_time_minutes": 5,
    "servings": 2,
    "short_description": "Shikanji is Punjab's beloved spiced lemonade \u2014 fresh lemon juice with black salt, roasted cumin, ginger and mint. More complex and satisfying than regular lemonade, it is a summer staple sold at every dhaba and street corner across Punjab.",
    "ingredients": [
      {
        "name": "Lemon juice",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Cold water",
        "quantity": "400",
        "unit": "ml"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Black salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Ginger juice",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Mint leaves",
        "quantity": "6",
        "unit": "pieces"
      },
      {
        "name": "Ice cubes",
        "quantity": "6",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Dissolve sugar in a little water.",
      "Mix lemon juice, black salt, cumin powder and ginger juice.",
      "Add cold water and sugar syrup. Stir well.",
      "Pour over ice in tall glasses.",
      "Garnish with mint leaves and a lemon slice.",
      "Serve immediately."
    ],
    "chef_notes": "Black salt is what makes Shikanji distinctive \u2014 it adds a sulphurous complexity that regular salt cannot replicate. Roasted cumin powder is essential.",
    "serving_suggestions": "Serve as a cooling summer drink or alongside spicy street food.",
    "nutrition_estimate": {
      "calories": "55",
      "protein_g": "0",
      "carbohydrates_g": "13",
      "fat_g": "0"
    },
    "tags": [
      "Beverage",
      "Vegan",
      "Summer",
      "Street Food"
    ],
    "image_prompt": "Ultra realistic food photography of Shikanji lemonade in a tall glass with ice, bright yellow color, mint leaves and lemon slice, condensation, street food setting Punjab",
    "seo_keywords": [
      "shikanji recipe",
      "punjabi lemonade",
      "nimbu pani recipe",
      "spiced lemonade india"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Aam Panna Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/aam-panna",
    "dish_name": "Aam Panna",
    "state": "Punjab",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": 4,
    "short_description": "Aam Panna is a tangy, cooling raw mango drink beloved across Punjab in summer \u2014 made with roasted or boiled raw green mangoes, black salt, roasted cumin and mint. A natural antidote to heat stroke, it is refreshing, tangy and deeply satisfying.",
    "ingredients": [
      {
        "name": "Raw green mangoes",
        "quantity": "3",
        "unit": "medium"
      },
      {
        "name": "Sugar",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Black salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Mint leaves",
        "quantity": "10",
        "unit": "pieces"
      },
      {
        "name": "Black pepper",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Cold water",
        "quantity": "600",
        "unit": "ml"
      },
      {
        "name": "Ice",
        "quantity": "8",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Roast raw mangoes directly on flame until charred and soft.",
      "Cool, peel and extract the pulp.",
      "Blend pulp with sugar, black salt, cumin, mint and pepper.",
      "Add cold water and blend until smooth.",
      "Strain if desired. Pour over ice.",
      "Garnish with mint and serve cold."
    ],
    "chef_notes": "Roasting the mango on direct flame adds a smoky complexity that boiling cannot achieve. The charred skin adds depth to the flavor.",
    "serving_suggestions": "Serve ice cold as a summer refreshment or alongside spicy food.",
    "nutrition_estimate": {
      "calories": "85",
      "protein_g": "1",
      "carbohydrates_g": "20",
      "fat_g": "0"
    },
    "tags": [
      "Vegan",
      "Summer Drink",
      "Cooling",
      "Raw Mango"
    ],
    "image_prompt": "Ultra realistic food photography of Aam Panna in a tall glass, pale green color, mint leaves floating, ice cubes, condensation, bright summer photography",
    "seo_keywords": [
      "aam panna recipe",
      "raw mango drink punjab",
      "kacha aam panna",
      "cooling summer drink india"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Chaas Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/masala-chaas",
    "dish_name": "Masala Chaas",
    "state": "Punjab",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 0,
    "total_time_minutes": 5,
    "servings": 2,
    "short_description": "Masala Chaas is Punjab's digestive spiced buttermilk \u2014 thin, tangy yogurt whisked with black salt, roasted cumin, ginger and mint. Lighter than lassi and deeply refreshing, it is the traditional Punjabi post-meal digestive.",
    "ingredients": [
      {
        "name": "Yogurt",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Cold water",
        "quantity": "300",
        "unit": "ml"
      },
      {
        "name": "Black salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "0.5",
        "unit": "inch"
      },
      {
        "name": "Green chili",
        "quantity": "0.5",
        "unit": "piece"
      },
      {
        "name": "Mint leaves",
        "quantity": "6",
        "unit": "pieces"
      },
      {
        "name": "Ice",
        "quantity": "4",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Blend yogurt with water until smooth and frothy.",
      "Add black salt, cumin powder, grated ginger and green chili.",
      "Blend briefly.",
      "Pour over ice into glasses.",
      "Garnish with mint leaves and a pinch of cumin powder.",
      "Serve immediately."
    ],
    "chef_notes": "Masala chaas must be thin and pourable \u2014 not thick like lassi. The black salt is what makes it distinctly Punjabi. Drink it cold for best results.",
    "serving_suggestions": "Serve after a heavy Punjabi meal as a digestive.",
    "nutrition_estimate": {
      "calories": "65",
      "protein_g": "4",
      "carbohydrates_g": "7",
      "fat_g": "2"
    },
    "tags": [
      "Beverage",
      "Digestive",
      "Vegetarian",
      "Cooling"
    ],
    "image_prompt": "Ultra realistic food photography of Masala Chaas spiced buttermilk in a tall glass, pale white frothy drink, cumin and mint garnish, bright clean food photography",
    "seo_keywords": [
      "masala chaas recipe",
      "punjabi buttermilk",
      "spiced chaas",
      "digestive drink india"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Jeera Rice Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/jeera-rice",
    "dish_name": "Punjabi Jeera Rice",
    "state": "Punjab",
    "category": "Rice Preparations",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": 4,
    "short_description": "Punjabi Jeera Rice is the perfect companion to any dal or curry \u2014 fluffy basmati rice tempered with cumin seeds in ghee, aromatic and fragrant. Simple to make yet impossibly satisfying, it is the most ordered rice dish at Punjabi dhabas.",
    "ingredients": [
      {
        "name": "Basmati rice",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Ghee",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cumin seeds",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Bay leaf",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Wash basmati rice and soak 20 minutes. Drain.",
      "Heat ghee in a heavy pot and add cumin seeds.",
      "When cumin splutters, add bay leaves.",
      "Add drained rice and fry gently for 2 minutes.",
      "Add 550ml water and salt. Bring to boil.",
      "Cover and cook on very low heat for 15 minutes.",
      "Rest 5 minutes. Fluff gently.",
      "Garnish with coriander and serve."
    ],
    "chef_notes": "The key to perfect jeera rice is not opening the lid while cooking. The steam does all the work. Use aged basmati for best aroma and long grains.",
    "serving_suggestions": "Serve with dal makhani, rajma, any Punjabi curry or raita.",
    "nutrition_estimate": {
      "calories": "295",
      "protein_g": "5",
      "carbohydrates_g": "56",
      "fat_g": "5"
    },
    "tags": [
      "Vegetarian",
      "Everyday",
      "Aromatic",
      "Simple"
    ],
    "image_prompt": "Ultra realistic food photography of Punjabi Jeera Rice, long grain basmati rice in a steel bowl, cumin seeds visible, ghee sheen, garnished with coriander, served alongside dal makhani",
    "seo_keywords": [
      "jeera rice recipe",
      "punjabi cumin rice",
      "basmati rice recipe",
      "jeera pulao recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Biryani Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/chicken-biryani-punjabi",
    "dish_name": "Punjabi Chicken Biryani",
    "state": "Punjab",
    "category": "Rice Preparations",
    "difficulty_level": "Hard",
    "prep_time_minutes": 60,
    "cook_time_minutes": 60,
    "total_time_minutes": 120,
    "servings": 4,
    "short_description": "Punjabi Chicken Biryani is a bold, deeply spiced layered rice dish \u2014 bold with caramelized onions, whole spices and marinated chicken. Richer and more intensely flavored than its southern counterparts, it reflects the hearty exuberance of Punjabi cooking.",
    "ingredients": [
      {
        "name": "Basmati rice",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Chicken",
        "quantity": "800",
        "unit": "g"
      },
      {
        "name": "Yogurt",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Fried onions (birista)",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Saffron",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Whole spices",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Biryani masala",
        "quantity": "3",
        "unit": "tsp"
      },
      {
        "name": "Mint leaves",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Salt",
        "quantity": "2",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Marinate chicken in yogurt, ginger-garlic paste, biryani masala and half the fried onions. Rest 2 hours.",
      "Par-cook basmati rice with whole spices until 70% done. Drain.",
      "Cook marinated chicken until nearly done.",
      "Layer in a heavy pot: chicken at bottom, rice on top.",
      "Sprinkle saffron milk, fried onions, mint and ghee.",
      "Seal with dough or foil and cook on very low heat (dum) for 25 minutes.",
      "Open and gently mix from sides. Serve immediately."
    ],
    "chef_notes": "The dum (steam cooking) step is what makes biryani special. Use a heavy-bottomed pot and the lowest heat setting. Never rush the dum.",
    "serving_suggestions": "Serve with raita, sliced onions and lemon wedges.",
    "nutrition_estimate": {
      "calories": "520",
      "protein_g": "32",
      "carbohydrates_g": "58",
      "fat_g": "18"
    },
    "tags": [
      "Non-Vegetarian",
      "Special Occasion",
      "Dum Cooking",
      "Festive"
    ],
    "image_prompt": "Ultra realistic professional food photography of Punjabi Chicken Biryani opened in a handi, layers of saffron rice and chicken visible, fried onions and mint garnish, dramatic steam, festive setting",
    "seo_keywords": [
      "punjabi chicken biryani recipe",
      "north indian biryani",
      "dum biryani recipe",
      "chicken biryani punjab"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Kheer Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/chawal-ki-kheer",
    "dish_name": "Chawal Ki Kheer",
    "state": "Punjab",
    "category": "Desserts",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 60,
    "total_time_minutes": 70,
    "servings": 6,
    "short_description": "Chawal Ki Kheer is Punjab's most beloved festival dessert \u2014 rice simmered in full-fat milk with sugar, saffron and cardamom until the milk reduces to a thick, creamy pudding. Garnished with pistachios and rose petals, it is made at every Punjabi celebration.",
    "ingredients": [
      {
        "name": "Full fat milk",
        "quantity": "1.5",
        "unit": "litre"
      },
      {
        "name": "Basmati rice",
        "quantity": "50",
        "unit": "g"
      },
      {
        "name": "Sugar",
        "quantity": "120",
        "unit": "g"
      },
      {
        "name": "Saffron",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Pistachios",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Almonds",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Rose water",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Rinse basmati rice and soak 20 minutes.",
      "Bring milk to boil in a heavy pan.",
      "Add rice and simmer on medium heat for 45-50 minutes stirring frequently.",
      "The milk should reduce by half and rice should dissolve.",
      "Add sugar, saffron, cardamom and rose water.",
      "Simmer 10 more minutes until thick and creamy.",
      "Serve warm or chilled garnished with nuts and rose petals."
    ],
    "chef_notes": "Never use parboiled rice for kheer \u2014 use good quality basmati. Stirring frequently prevents the bottom from burning and helps break down the rice.",
    "serving_suggestions": "Serve warm or chilled as a festival dessert.",
    "nutrition_estimate": {
      "calories": "295",
      "protein_g": "8",
      "carbohydrates_g": "44",
      "fat_g": "10"
    },
    "tags": [
      "Vegetarian",
      "Festival Food",
      "Dessert",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of Chawal Ki Kheer in a clay pot, creamy saffron rice pudding, garnished with pistachios, almonds and rose petals, festive Punjabi setting",
    "seo_keywords": [
      "chawal ki kheer recipe",
      "punjabi rice kheer",
      "rice pudding india",
      "festival kheer recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Gulab Jamun Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/gulab-jamun",
    "dish_name": "Punjabi Gulab Jamun",
    "state": "Punjab",
    "category": "Desserts",
    "difficulty_level": "Medium",
    "prep_time_minutes": 30,
    "cook_time_minutes": 30,
    "total_time_minutes": 60,
    "servings": 6,
    "short_description": "Gulab Jamun are Punjab's most celebrated festival sweet \u2014 soft, spongy milk-solid dumplings deep-fried to a deep golden brown and soaked in saffron-cardamom sugar syrup. Warm, syrupy and melt-in-mouth, they are India's most beloved sweet.",
    "ingredients": [
      {
        "name": "Khoya (mawa)",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Paneer",
        "quantity": "50",
        "unit": "g"
      },
      {
        "name": "Maida",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Sugar (for syrup)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Water (for syrup)",
        "quantity": "300",
        "unit": "ml"
      },
      {
        "name": "Cardamom powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Saffron",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Rose water",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      }
    ],
    "preparation_steps": [
      "Make sugar syrup with sugar, water, cardamom, saffron and rose water. Keep warm.",
      "Knead khoya, paneer and maida into a smooth crack-free dough.",
      "Shape into smooth small balls \u2014 no cracks.",
      "Heat oil to 130-140\u00b0C \u2014 low temperature is critical.",
      "Fry slowly on low heat turning constantly for 8-10 minutes until deep golden.",
      "Transfer directly to warm sugar syrup.",
      "Soak for minimum 2 hours before serving.",
      "Serve warm with syrup."
    ],
    "chef_notes": "Low temperature frying is the most critical factor \u2014 too hot and the outside browns before the inside cooks. The balls must fry slowly and evenly for a soft interior.",
    "serving_suggestions": "Serve warm with sugar syrup and a scoop of vanilla ice cream.",
    "nutrition_estimate": {
      "calories": "285",
      "protein_g": "6",
      "carbohydrates_g": "42",
      "fat_g": "11"
    },
    "tags": [
      "Vegetarian",
      "Festival Sweet",
      "Iconic",
      "Dessert"
    ],
    "image_prompt": "Ultra realistic professional food photography of Gulab Jamun, deep golden spongy balls in saffron syrup in a brass bowl, garnished with pistachios and rose petals, festive golden lighting",
    "seo_keywords": [
      "gulab jamun recipe",
      "punjabi gulab jamun",
      "milk dumpling sweet",
      "festival sweet india"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Gajar Ka Halwa Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/gajar-ka-halwa",
    "dish_name": "Gajar Ka Halwa",
    "state": "Punjab",
    "category": "Desserts",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 60,
    "total_time_minutes": 80,
    "servings": 6,
    "short_description": "Gajar Ka Halwa is Punjab's quintessential winter dessert \u2014 grated red Delhi carrots slow-cooked in milk with ghee, sugar and cardamom until caramelized and deeply fragrant. Topped with khoya and nuts, it is the king of Indian winter sweets.",
    "ingredients": [
      {
        "name": "Red carrots (Delhi gajar)",
        "quantity": "1",
        "unit": "kg"
      },
      {
        "name": "Full fat milk",
        "quantity": "500",
        "unit": "ml"
      },
      {
        "name": "Sugar",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Ghee",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Khoya",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Cardamom powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Almonds",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Cashews",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Raisins",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Peel and grate carrots on the fine side of the grater.",
      "Cook grated carrots with milk in a heavy pan on medium heat.",
      "Stir frequently until all milk is absorbed \u2014 about 30 minutes.",
      "Add ghee and fry carrots until they start to change color.",
      "Add sugar and continue cooking until moisture evaporates.",
      "Add khoya and cardamom. Mix well.",
      "Fry nuts in ghee and add to halwa.",
      "Serve warm."
    ],
    "chef_notes": "Red Delhi carrots (available November-February) give the best color and sweetness. Orange carrots produce a paler, less flavorful halwa. The frying step after milk absorption is what caramelizes the sugars.",
    "serving_suggestions": "Serve warm topped with a scoop of vanilla ice cream or rabri.",
    "nutrition_estimate": {
      "calories": "340",
      "protein_g": "7",
      "carbohydrates_g": "46",
      "fat_g": "15"
    },
    "tags": [
      "Vegetarian",
      "Winter Special",
      "Festival Sweet",
      "Classic"
    ],
    "image_prompt": "Ultra realistic professional food photography of Gajar Ka Halwa, deep red carrot halwa in a copper bowl, garnished with silver leaf, pistachios and cashews, warm winter lighting",
    "seo_keywords": [
      "gajar ka halwa recipe",
      "carrot halwa punjab",
      "gajar halwa recipe",
      "indian carrot pudding winter"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Pinni Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/pinni",
    "dish_name": "Pinni",
    "state": "Punjab",
    "category": "Desserts",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": 8,
    "short_description": "Pinni is Punjab's beloved winter energy sweet \u2014 whole wheat flour roasted in ghee with jaggery, dry fruits and nuts, shaped into balls. A traditional Punjabi home sweet made in winter for strength and warmth, it is packed with nutrition and deep flavor.",
    "ingredients": [
      {
        "name": "Whole wheat flour (atta)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Ghee",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Jaggery, grated",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Almonds",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Cashews",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Edible gum (gondh)",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Dry ginger powder",
        "quantity": "0.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Fry edible gum in ghee until it puffs up. Remove and crush.",
      "Roast wheat flour in ghee on low heat stirring constantly for 20 minutes until golden and fragrant.",
      "Cool slightly.",
      "Add grated jaggery, cardamom, dry ginger and crushed gum.",
      "Add chopped nuts and mix well.",
      "While still warm, shape into balls.",
      "Cool completely before storing."
    ],
    "chef_notes": "The flour must be roasted on low heat for at least 20 minutes \u2014 the nutty aroma is your guide. Shaping must be done while the mixture is warm and pliable.",
    "serving_suggestions": "Serve as a winter sweet or energy snack with milk.",
    "nutrition_estimate": {
      "calories": "285",
      "protein_g": "5",
      "carbohydrates_g": "36",
      "fat_g": "14"
    },
    "tags": [
      "Vegetarian",
      "Winter Sweet",
      "Energy Food",
      "Traditional"
    ],
    "image_prompt": "Ultra realistic food photography of Punjabi Pinni, golden round wheat flour and jaggery balls, dry fruits visible, arranged on a brass plate, warm winter Punjabi home setting",
    "seo_keywords": [
      "pinni recipe",
      "punjabi pinni sweet",
      "wheat jaggery balls india",
      "winter sweet punjab"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Kulfi Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/kulfi",
    "dish_name": "Punjabi Kulfi",
    "state": "Punjab",
    "category": "Desserts",
    "difficulty_level": "Medium",
    "prep_time_minutes": 30,
    "cook_time_minutes": 480,
    "total_time_minutes": 510,
    "servings": 6,
    "short_description": "Punjabi Kulfi is India's original ice cream \u2014 a dense, creamy frozen dessert made with reduced milk, saffron, cardamom and pistachios. Richer, denser and more intensely flavored than regular ice cream, it is a summer treat with centuries of history.",
    "ingredients": [
      {
        "name": "Full fat milk",
        "quantity": "1",
        "unit": "litre"
      },
      {
        "name": "Sugar",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Saffron",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Pistachios",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Almonds",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cornflour",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Rose water",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Reduce milk by half on medium heat stirring frequently \u2014 about 30 minutes.",
      "Add sugar, saffron, cardamom and cornflour slurry.",
      "Cook 10 more minutes until thick.",
      "Add chopped pistachios and rose water.",
      "Cool completely.",
      "Pour into kulfi moulds or small cups.",
      "Freeze for 6-8 hours until solid.",
      "Unmould and serve immediately."
    ],
    "chef_notes": "Kulfi must be dense \u2014 it should not have air whipped in like ice cream. The richness comes from reduced milk. Serve immediately after unmoulding.",
    "serving_suggestions": "Serve with falooda (vermicelli and basil seeds) or plain with rose syrup.",
    "nutrition_estimate": {
      "calories": "220",
      "protein_g": "7",
      "carbohydrates_g": "28",
      "fat_g": "9"
    },
    "tags": [
      "Vegetarian",
      "Frozen Dessert",
      "Summer",
      "Traditional"
    ],
    "image_prompt": "Ultra realistic professional food photography of Punjabi Kulfi on sticks, golden saffron color, pistachio garnish, dripping in summer heat, traditional clay cups alongside",
    "seo_keywords": [
      "kulfi recipe",
      "punjabi kulfi",
      "indian ice cream",
      "saffron kulfi recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Kaddu Ki Sabzi Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/kaddu-ki-sabzi",
    "dish_name": "Kaddu Ki Sabzi",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": 4,
    "short_description": "Kaddu Ki Sabzi is a beloved Punjabi pumpkin preparation with a unique sweet-sour-spicy balance. Cooked with fenugreek seeds, amchur and jaggery, this simple sabzi transforms humble pumpkin into a deeply flavorful dish that pairs beautifully with puri.",
    "ingredients": [
      {
        "name": "Yellow pumpkin (kaddu)",
        "quantity": "600",
        "unit": "g"
      },
      {
        "name": "Fenugreek seeds",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Jaggery",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Amchur",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Coriander powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Peel and cube pumpkin into medium pieces.",
      "Heat oil and add fenugreek seeds until slightly darkened.",
      "Add pumpkin and all dry spices. Toss well.",
      "Cover and cook on medium heat for 15 minutes.",
      "Add jaggery and amchur. Mix gently.",
      "Cook uncovered 5 more minutes until slightly caramelized.",
      "Serve garnished with coriander."
    ],
    "chef_notes": "Do not overcook the pumpkin \u2014 it should hold its shape while being tender. The sweet-sour balance of jaggery and amchur is the defining characteristic of this dish.",
    "serving_suggestions": "Serve with puri, dal and rice as part of a Punjabi thali.",
    "nutrition_estimate": {
      "calories": "145",
      "protein_g": "2",
      "carbohydrates_g": "22",
      "fat_g": "6"
    },
    "tags": [
      "Vegetarian",
      "Everyday",
      "Simple",
      "Vegan"
    ],
    "image_prompt": "Ultra realistic food photography of Kaddu Ki Sabzi, golden pumpkin pieces in a pan, caramelized edges, garnished with coriander, warm home cooking photography",
    "seo_keywords": [
      "kaddu ki sabzi recipe",
      "punjabi pumpkin curry",
      "sweet sour pumpkin india",
      "kaddu recipe north india"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Baingan Bharta Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/baingan-bharta",
    "dish_name": "Punjabi Baingan Bharta",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": 4,
    "short_description": "Punjabi Baingan Bharta is the definitive smoked eggplant dish of North India \u2014 fire-roasted brinjal mashed and cooked with onions, tomatoes and robust Punjabi spices. Smoky, hearty and deeply flavored, it is comfort food at its finest.",
    "ingredients": [
      {
        "name": "Large brinjal",
        "quantity": "1",
        "unit": "kg"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Tomatoes",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "1.5",
        "unit": "tbsp"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Red chili powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Garam masala",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Roast brinjal on direct flame until completely charred. Peel and mash.",
      "Heat oil and fry onions until golden.",
      "Add ginger-garlic paste and green chili. Fry 2 minutes.",
      "Add tomatoes and cook until oil separates.",
      "Add chili powder and mashed brinjal. Mix well.",
      "Cook on medium heat for 10 minutes.",
      "Add garam masala and salt.",
      "Garnish with coriander and serve."
    ],
    "chef_notes": "Char the brinjal until completely blackened \u2014 the more thorough the charring, the smokier and more flavorful the bharta. Adding a small piece of coal for extra smokiness is a dhaba trick.",
    "serving_suggestions": "Serve with makki di roti, paratha or tandoori roti.",
    "nutrition_estimate": {
      "calories": "145",
      "protein_g": "3",
      "carbohydrates_g": "16",
      "fat_g": "8"
    },
    "tags": [
      "Vegetarian",
      "Smoky",
      "Classic",
      "Vegan"
    ],
    "image_prompt": "Ultra realistic food photography of Punjabi Baingan Bharta, smoky charred eggplant mash in a pan, dark and earthy, garnished with green chili and coriander, rustic dhaba setting",
    "seo_keywords": [
      "baingan bharta recipe",
      "punjabi eggplant recipe",
      "smoked brinjal north india",
      "roasted eggplant curry punjab"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Aloo Gobi Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/aloo-gobi",
    "dish_name": "Aloo Gobi Punjabi Style",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": 4,
    "short_description": "Punjabi Aloo Gobi is a dry stir-fry of potatoes and cauliflower with cumin, turmeric, ginger and garam masala \u2014 simple, satisfying and deeply aromatic. One of the most universally loved everyday sabzis of North India.",
    "ingredients": [
      {
        "name": "Cauliflower",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Potatoes",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Coriander powder",
        "quantity": "1.5",
        "unit": "tsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "0.75",
        "unit": "tsp"
      },
      {
        "name": "Garam masala",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Cut cauliflower into florets and potatoes into cubes.",
      "Heat oil and add cumin seeds until they splutter.",
      "Add onion and ginger. Fry until translucent.",
      "Add all dry spices and fry 1 minute.",
      "Add potatoes and cauliflower. Toss to coat with spices.",
      "Cover and cook on low heat for 15-18 minutes.",
      "Uncover and dry out on high heat for 3 minutes.",
      "Sprinkle garam masala and coriander. Serve."
    ],
    "chef_notes": "The secret is cooking on low heat covered \u2014 then finishing on high heat uncovered. This steams the vegetables first then crisps them slightly.",
    "serving_suggestions": "Serve with roti, paratha and dal as part of an everyday Punjabi meal.",
    "nutrition_estimate": {
      "calories": "175",
      "protein_g": "4",
      "carbohydrates_g": "22",
      "fat_g": "8"
    },
    "tags": [
      "Vegetarian",
      "Everyday",
      "Vegan",
      "Simple"
    ],
    "image_prompt": "Ultra realistic food photography of Aloo Gobi, golden turmeric-spiced potato and cauliflower stir fry in a karahi, cumin seeds visible, garnished with coriander, homestyle Punjabi cooking",
    "seo_keywords": [
      "aloo gobi recipe",
      "punjabi aloo gobi",
      "potato cauliflower curry",
      "dry aloo gobi sabzi"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Chaat Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/aloo-chaat",
    "dish_name": "Amritsari Aloo Chaat",
    "state": "Punjab",
    "category": "Appetizers",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": 4,
    "short_description": "Amritsari Aloo Chaat is a legendary street food from Amritsar \u2014 crispy fried potato cubes tossed with tamarind chutney, green chutney, chaat masala, pomegranate and fresh coriander. Bold, tangy, spicy and utterly addictive.",
    "ingredients": [
      {
        "name": "Potatoes",
        "quantity": "4",
        "unit": "large"
      },
      {
        "name": "Tamarind chutney",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Green chutney",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "1.5",
        "unit": "tsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Pomegranate seeds",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "small"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Boil potatoes until just cooked. Cool and cube.",
      "Deep fry potato cubes until golden and crispy.",
      "Drain and season with salt and a little chaat masala while hot.",
      "In a bowl, combine fried potatoes with chutneys.",
      "Add chaat masala, chili powder, pomegranate seeds and onion.",
      "Toss well and top with coriander.",
      "Squeeze lemon and serve immediately."
    ],
    "chef_notes": "Serve immediately \u2014 the potatoes must be crispy when eating. Do not toss with chutney too early or they will go soft.",
    "serving_suggestions": "Serve as a street food snack or starter at parties.",
    "nutrition_estimate": {
      "calories": "265",
      "protein_g": "4",
      "carbohydrates_g": "38",
      "fat_g": "12"
    },
    "tags": [
      "Vegetarian",
      "Street Food",
      "Amritsar",
      "Chaat"
    ],
    "image_prompt": "Ultra realistic food photography of Amritsari Aloo Chaat, crispy potato cubes with colorful chutneys, pomegranate seeds and coriander, vibrant street food photography",
    "seo_keywords": [
      "aloo chaat recipe",
      "amritsari chaat",
      "punjabi potato chaat",
      "street food amritsar"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Gol Gappe Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/gol-gappe",
    "dish_name": "Gol Gappe",
    "state": "Punjab",
    "category": "Appetizers",
    "difficulty_level": "Hard",
    "prep_time_minutes": 30,
    "cook_time_minutes": 30,
    "total_time_minutes": 60,
    "servings": 4,
    "short_description": "Gol Gappe \u2014 known as Pani Puri in Mumbai \u2014 are Punjab's most beloved street food: crispy hollow semolina spheres filled with spiced potatoes and dunked in tangy tamarind-mint water. Each explosive bite is an experience of pure joy.",
    "ingredients": [
      {
        "name": "Semolina (sooji)",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Maida",
        "quantity": "50",
        "unit": "g"
      },
      {
        "name": "Baking soda",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Mint leaves",
        "quantity": "1",
        "unit": "cup"
      },
      {
        "name": "Tamarind",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Potatoes",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Black salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      }
    ],
    "preparation_steps": [
      "Knead semolina, maida and baking soda into a stiff dough. Rest 30 minutes.",
      "Roll very thin and cut into small circles.",
      "Deep fry on medium heat until puffed and golden. Drain and cool.",
      "Blend mint, green chili, tamarind, black salt and cumin with water for pani.",
      "Mash potatoes with chaat masala and salt for filling.",
      "To serve: make a hole in gol gappe, fill with potato, dip in pani and eat immediately."
    ],
    "chef_notes": "The stiff dough and thin rolling are crucial for puffing up correctly. Fry on medium \u2014 too hot burns them before they puff, too cold and they don't puff at all.",
    "serving_suggestions": "Serve immediately after assembling \u2014 eat within seconds of filling for maximum crunch.",
    "nutrition_estimate": {
      "calories": "245",
      "protein_g": "5",
      "carbohydrates_g": "42",
      "fat_g": "7"
    },
    "tags": [
      "Vegetarian",
      "Street Food",
      "Iconic",
      "Chaat"
    ],
    "image_prompt": "Ultra realistic professional food photography of Gol Gappe, crispy round puris on a plate with green mint water, spiced potato filling, street food vendor setting Punjab",
    "seo_keywords": [
      "gol gappe recipe",
      "pani puri punjab",
      "punjabi street food",
      "golgappa recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Samosa Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/punjabi-samosa",
    "dish_name": "Punjabi Samosa",
    "state": "Punjab",
    "category": "Appetizers",
    "difficulty_level": "Medium",
    "prep_time_minutes": 45,
    "cook_time_minutes": 30,
    "total_time_minutes": 75,
    "servings": 4,
    "short_description": "The Punjabi Samosa is larger, crispier and more boldly spiced than its counterparts \u2014 a thick pastry shell filled with spiced potatoes, green peas and whole cumin, deep fried to a shattering crunch. Punjab's definitive tea-time snack.",
    "ingredients": [
      {
        "name": "Maida",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Potatoes",
        "quantity": "4",
        "unit": "large"
      },
      {
        "name": "Green peas",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Coriander seeds, crushed",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Amchur",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Ghee",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "2",
        "unit": "cups"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Rub ghee into maida until sandy. Add water and knead into stiff dough. Rest 30 minutes.",
      "Make filling: fry cumin and coriander seeds, add boiled mashed potatoes and peas.",
      "Add ginger, green chili, amchur and salt. Cool completely.",
      "Roll dough thin, cut into semicircles, form cones, fill and seal.",
      "Deep fry on low-medium heat for 12-15 minutes until golden and crispy.",
      "Serve with green and tamarind chutney."
    ],
    "chef_notes": "The key to a crispy samosa is frying on low-medium heat for longer \u2014 this gives the pastry time to dry out and become shattering crispy rather than soft.",
    "serving_suggestions": "Serve with green chutney, tamarind chutney and a cup of chai.",
    "nutrition_estimate": {
      "calories": "285",
      "protein_g": "6",
      "carbohydrates_g": "36",
      "fat_g": "14"
    },
    "tags": [
      "Vegetarian",
      "Street Food",
      "Tea Time",
      "Iconic"
    ],
    "image_prompt": "Ultra realistic professional food photography of large Punjabi Samosa, shattering crispy golden pastry, served with vibrant green and brown chutneys, chai cup alongside, street food setting",
    "seo_keywords": [
      "punjabi samosa recipe",
      "aloo samosa recipe",
      "crispy samosa",
      "indian street food samosa"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Dahi Bhalle Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/dahi-bhalle",
    "dish_name": "Dahi Bhalle",
    "state": "Punjab",
    "category": "Appetizers",
    "difficulty_level": "Medium",
    "prep_time_minutes": 240,
    "cook_time_minutes": 20,
    "total_time_minutes": 260,
    "servings": 4,
    "short_description": "Dahi Bhalle are fluffy, soft lentil fritters soaked in cold water until spongy, then served in sweetened yogurt with tamarind chutney, green chutney, chaat masala and sev. A cooling, tangy and utterly delicious Punjabi chaat.",
    "ingredients": [
      {
        "name": "Urad dal (skinned)",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Yogurt",
        "quantity": "500",
        "unit": "g"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Tamarind chutney",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Green chutney",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "1.5",
        "unit": "tsp"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Sev",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Pomegranate seeds",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "1",
        "unit": "cup"
      }
    ],
    "preparation_steps": [
      "Soak urad dal for 4 hours. Grind to thick fluffy batter.",
      "Fry spoonfuls in oil until golden. Remove.",
      "Soak fried bhalle in lukewarm water for 20 minutes until soft and spongy.",
      "Squeeze out water gently.",
      "Whisk yogurt with sugar and cumin.",
      "Place bhalle in a dish. Pour sweetened yogurt over them.",
      "Top with both chutneys, chaat masala, chili powder and sev.",
      "Garnish with pomegranate seeds and coriander."
    ],
    "chef_notes": "The soaking step is crucial \u2014 the bhalle must become very soft and spongy. Urad dal batter must be whipped until airy for soft bhalle.",
    "serving_suggestions": "Serve chilled as a starter or chaat at festivals and celebrations.",
    "nutrition_estimate": {
      "calories": "295",
      "protein_g": "12",
      "carbohydrates_g": "38",
      "fat_g": "11"
    },
    "tags": [
      "Vegetarian",
      "Chaat",
      "Festival Food",
      "Cooling"
    ],
    "image_prompt": "Ultra realistic food photography of Dahi Bhalle, soft white lentil fritters in creamy yogurt, topped with colorful chutneys, pomegranate seeds and sev, vibrant chaat photography",
    "seo_keywords": [
      "dahi bhalle recipe",
      "dahi vada punjabi",
      "lentil fritters yogurt",
      "punjabi chaat recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Kachumber Salad Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/punjabi-kachumber",
    "dish_name": "Punjabi Kachumber",
    "state": "Punjab",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 4,
    "short_description": "Punjabi Kachumber is a bold, crunchy raw salad of cucumber, tomato, onion and radish \u2014 seasoned assertively with black salt, chaat masala and lemon. The perfect cooling counterpoint to the rich, spiced curries of Punjabi cuisine.",
    "ingredients": [
      {
        "name": "Cucumber",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Tomato",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Radish",
        "quantity": "2",
        "unit": "medium"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Black salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Dice all vegetables into even small pieces.",
      "Mix together in a bowl.",
      "Add black salt, chaat masala and lemon juice.",
      "Toss well.",
      "Garnish with coriander and green chili.",
      "Serve immediately."
    ],
    "chef_notes": "Radish is the Punjabi element that sets this apart from other kachumbers. Black salt and chaat masala give it a distinctly North Indian character.",
    "serving_suggestions": "Serve alongside any Punjabi main course as a cooling salad.",
    "nutrition_estimate": {
      "calories": "45",
      "protein_g": "2",
      "carbohydrates_g": "9",
      "fat_g": "0"
    },
    "tags": [
      "Vegan",
      "Salad",
      "Everyday",
      "Refreshing"
    ],
    "image_prompt": "Ultra realistic food photography of Punjabi Kachumber salad in a white bowl, colorful diced cucumber, tomato, onion and radish, lemon wedge, bright natural light",
    "seo_keywords": [
      "punjabi kachumber recipe",
      "north indian salad",
      "cucumber tomato onion salad punjab",
      "kachumber salad recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Mooli Salad Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/mooli-salad",
    "dish_name": "Mooli Ka Raita",
    "state": "Punjab",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 4,
    "short_description": "Mooli Ka Raita is a simple, cooling Punjabi yogurt salad made with grated white radish \u2014 a winter staple that uses Punjab's famous winter mooli. Refreshing, digestive and the perfect accompaniment to any Punjabi meal.",
    "ingredients": [
      {
        "name": "White radish (mooli)",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Yogurt",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Black salt",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Grate radish and squeeze out all excess water.",
      "Whisk yogurt until smooth.",
      "Mix grated radish into yogurt.",
      "Add black salt, cumin powder, green chili and salt.",
      "Garnish with coriander.",
      "Serve chilled."
    ],
    "chef_notes": "Squeezing the water out of radish is essential \u2014 otherwise the raita becomes very watery. Use white winter mooli for the mildest flavor.",
    "serving_suggestions": "Serve alongside biryani, paratha or any Punjabi curry.",
    "nutrition_estimate": {
      "calories": "75",
      "protein_g": "4",
      "carbohydrates_g": "8",
      "fat_g": "3"
    },
    "tags": [
      "Vegetarian",
      "Raita",
      "Cooling",
      "Winter"
    ],
    "image_prompt": "Ultra realistic food photography of Mooli Ka Raita in a white bowl, white yogurt with grated radish, cumin powder garnish, fresh coriander, clean minimal styling",
    "seo_keywords": [
      "mooli raita recipe",
      "radish raita punjab",
      "white radish yogurt",
      "winter raita recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Onion Salad Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/pyaz-sirka",
    "dish_name": "Pyaz Sirka",
    "state": "Punjab",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 0,
    "total_time_minutes": 5,
    "servings": 4,
    "short_description": "Pyaz Sirka \u2014 pickled onions in vinegar \u2014 are the iconic dhaba condiment of Punjab, served alongside every meal from butter chicken to dal makhani. The sharp vinegar pickle cuts through rich gravies and cleanses the palate perfectly.",
    "ingredients": [
      {
        "name": "Red onions",
        "quantity": "3",
        "unit": "large"
      },
      {
        "name": "White vinegar",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Sugar",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      }
    ],
    "preparation_steps": [
      "Thinly slice onions into rings.",
      "Mix vinegar, salt, sugar and chili powder together.",
      "Toss onion rings in the pickling liquid.",
      "Add sliced green chili.",
      "Leave for 15 minutes minimum before serving.",
      "Serve as a condiment alongside any Punjabi meal."
    ],
    "chef_notes": "These pickled onions turn a beautiful pink color after 15 minutes. They are even better after an hour. Keeps in the fridge for 3 days.",
    "serving_suggestions": "Serve alongside any Punjabi curry, dal, biryani or grilled meats.",
    "nutrition_estimate": {
      "calories": "35",
      "protein_g": "1",
      "carbohydrates_g": "7",
      "fat_g": "0"
    },
    "tags": [
      "Vegan",
      "Pickle",
      "Condiment",
      "Dhaba"
    ],
    "image_prompt": "Ultra realistic food photography of Pyaz Sirka pickled onion rings in a small bowl, vibrant pink-purple color, vinegar sheen, green chili, classic Punjabi dhaba setting",
    "seo_keywords": [
      "pyaz sirka recipe",
      "punjabi pickled onions",
      "dhaba onion salad",
      "vinegar onions india"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Chana Salad Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/chana-chaat-salad",
    "dish_name": "Chana Chaat Salad",
    "state": "Punjab",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 4,
    "short_description": "Punjabi Chana Chaat Salad is a protein-packed salad of boiled chickpeas tossed with tomato, onion, green chili, chutneys and chaat masala. Quick, satisfying and deeply flavorful \u2014 it doubles as a healthy snack and a light meal.",
    "ingredients": [
      {
        "name": "Boiled chickpeas",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Tomato",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Tamarind chutney",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Green chutney",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Combine chickpeas with diced tomato, onion and green chili.",
      "Add both chutneys and chaat masala.",
      "Add lemon juice and toss well.",
      "Garnish with coriander.",
      "Serve immediately."
    ],
    "chef_notes": "Best eaten immediately after dressing. If made ahead, keep the chutneys separate until serving.",
    "serving_suggestions": "Serve as a healthy snack or light lunch.",
    "nutrition_estimate": {
      "calories": "195",
      "protein_g": "10",
      "carbohydrates_g": "30",
      "fat_g": "3"
    },
    "tags": [
      "Vegan",
      "Protein Rich",
      "Healthy",
      "Chaat"
    ],
    "image_prompt": "Ultra realistic food photography of Chana Chaat Salad in a bowl, golden chickpeas with colorful vegetables and chutneys, vibrant fresh food photography",
    "seo_keywords": [
      "chana chaat recipe",
      "punjabi chickpea salad",
      "healthy chaat",
      "boiled chana salad"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Masala Chai Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/punjabi-masala-chai",
    "dish_name": "Punjabi Masala Chai",
    "state": "Punjab",
    "category": "Tea",
    "difficulty_level": "Easy",
    "prep_time_minutes": 2,
    "cook_time_minutes": 8,
    "total_time_minutes": 10,
    "servings": 2,
    "short_description": "Punjabi Masala Chai is the strongest, most aromatic of all Indian masala teas \u2014 made with full-fat milk, robust tea leaves, fresh ginger, cardamom and a generous hand with spices. Bold, thick and deeply warming, it is the heartbeat of Punjabi daily life.",
    "ingredients": [
      {
        "name": "Water",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Full fat milk",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Strong CTC tea leaves",
        "quantity": "2.5",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "1.5",
        "unit": "inch"
      },
      {
        "name": "Cardamom",
        "quantity": "4",
        "unit": "pods"
      },
      {
        "name": "Black pepper",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Cinnamon",
        "quantity": "0.5",
        "unit": "inch"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Crush cardamom, black pepper and cinnamon.",
      "Bring water to boil with crushed spices and grated ginger.",
      "Add tea leaves and boil vigorously for 2 minutes.",
      "Add milk and bring to a full rolling boil twice.",
      "Add sugar.",
      "Strain into cups and serve immediately."
    ],
    "chef_notes": "Punjabi chai must be strong and milky \u2014 the double boil is essential. CTC tea gives the right strength. Ginger must be fresh \u2014 powder is not acceptable.",
    "serving_suggestions": "Serve with aloo paratha, samosa or any Punjabi snack.",
    "nutrition_estimate": {
      "calories": "95",
      "protein_g": "4",
      "carbohydrates_g": "12",
      "fat_g": "4"
    },
    "tags": [
      "Beverage",
      "Warming",
      "Vegetarian",
      "Morning Ritual"
    ],
    "image_prompt": "Ultra realistic food photography of Punjabi Masala Chai in a kulhad clay cup, deep amber tea color, steam rising, ginger and cardamom pods alongside, rustic dhaba morning setting",
    "seo_keywords": [
      "punjabi masala chai recipe",
      "north indian tea recipe",
      "strong masala chai",
      "dhaba chai recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Noon Chai Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/noon-chai",
    "dish_name": "Noon Chai",
    "state": "Punjab",
    "category": "Tea",
    "difficulty_level": "Medium",
    "prep_time_minutes": 5,
    "cook_time_minutes": 20,
    "total_time_minutes": 25,
    "servings": 2,
    "short_description": "Noon Chai \u2014 also called Pink Tea or Kashmiri Chai \u2014 is a beautiful pink-hued salted tea made with special gunpowder tea leaves, milk, baking soda and salt. Popular in Punjab's northern regions and throughout Kashmir, it is floral, creamy and utterly unique.",
    "ingredients": [
      {
        "name": "Kashmiri tea leaves (gunpowder)",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Water",
        "quantity": "300",
        "unit": "ml"
      },
      {
        "name": "Full fat milk",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Baking soda",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Cardamom",
        "quantity": "2",
        "unit": "pods"
      },
      {
        "name": "Pistachios",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Boil tea leaves in water with baking soda for 10 minutes.",
      "The liquid will turn dark red-brown.",
      "Add milk and continue cooking for 5 minutes.",
      "Add salt and cardamom.",
      "Strain and whisk vigorously \u2014 this creates the pink color.",
      "Pour back and forth between cups several times.",
      "Garnish with crushed pistachios and serve."
    ],
    "chef_notes": "The baking soda and vigorous whisking are what create the famous pink color. Kashmiri tea leaves (gunpowder green tea) are essential \u2014 regular tea will not work.",
    "serving_suggestions": "Serve with Kashmiri bread (girda) or any soft bread.",
    "nutrition_estimate": {
      "calories": "85",
      "protein_g": "4",
      "carbohydrates_g": "8",
      "unit": "g",
      "fat_g": "4"
    },
    "tags": [
      "Pink Tea",
      "Kashmiri",
      "Unique",
      "Warming"
    ],
    "image_prompt": "Ultra realistic food photography of Noon Chai pink tea in a traditional cup, beautiful dusty rose pink color, pistachio garnish, elegant presentation, soft morning light",
    "seo_keywords": [
      "noon chai recipe",
      "pink tea punjab",
      "kashmiri chai recipe",
      "salted pink tea india"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Kahwa Tea Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/kahwa",
    "dish_name": "Kahwa",
    "state": "Punjab",
    "category": "Tea",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": 2,
    "short_description": "Kahwa is a fragrant green tea from Kashmir and Punjab's northern regions, brewed with saffron, cardamom, cinnamon and almonds. A warming, aromatic and health-promoting drink, it is served at weddings and celebrations throughout northern Punjab.",
    "ingredients": [
      {
        "name": "Kashmiri green tea",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Water",
        "quantity": "400",
        "unit": "ml"
      },
      {
        "name": "Saffron",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Cardamom",
        "quantity": "3",
        "unit": "pods"
      },
      {
        "name": "Cinnamon",
        "quantity": "0.5",
        "unit": "inch"
      },
      {
        "name": "Almonds",
        "quantity": "6",
        "unit": "pieces"
      },
      {
        "name": "Honey",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Rose petals",
        "quantity": "4",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Crush cardamom and break cinnamon.",
      "Bring water to boil with saffron, cardamom and cinnamon.",
      "Add green tea and simmer on low heat for 3 minutes.",
      "Do not boil vigorously \u2014 green tea becomes bitter.",
      "Strain into cups.",
      "Add honey and garnish with slivered almonds and rose petals.",
      "Serve immediately."
    ],
    "chef_notes": "Never boil green tea \u2014 it becomes bitter. Keep it at a gentle simmer. The saffron should bloom fully in the water before adding tea.",
    "serving_suggestions": "Serve as a warming morning tea or after meals as a digestive.",
    "nutrition_estimate": {
      "calories": "45",
      "protein_g": "1",
      "carbohydrates_g": "8",
      "fat_g": "2"
    },
    "tags": [
      "Green Tea",
      "Aromatic",
      "Healthy",
      "Kashmiri"
    ],
    "image_prompt": "Ultra realistic food photography of Kahwa in a traditional brass cup, golden saffron tea, almond slivers and rose petals floating, elegant Kashmiri setting",
    "seo_keywords": [
      "kahwa recipe",
      "kashmiri green tea",
      "saffron tea recipe",
      "punjab noon chai kahwa"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Tandoori Chai Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/tandoori-chai",
    "dish_name": "Tandoori Chai",
    "state": "Punjab",
    "category": "Tea",
    "difficulty_level": "Medium",
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": 2,
    "short_description": "Tandoori Chai is Punjab's most theatrical tea experience \u2014 strong masala chai poured into a red-hot clay kulhad, which instantly chars and infuses the tea with an incredible smoky, earthy aroma. A sensation that has taken India's tea culture by storm.",
    "ingredients": [
      {
        "name": "Water",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Full fat milk",
        "quantity": "200",
        "unit": "ml"
      },
      {
        "name": "Strong tea leaves",
        "quantity": "2.5",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Cardamom",
        "quantity": "3",
        "unit": "pods"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Clay kulhad",
        "quantity": "2",
        "unit": "pieces"
      }
    ],
    "preparation_steps": [
      "Prepare strong masala chai in the usual way.",
      "Heat clay kulhads directly on gas flame until smoking hot and red.",
      "Place smoking hot kulhads in a deep bowl.",
      "Pour prepared chai slowly into the hot kulhads.",
      "The chai will sizzle and smoke dramatically.",
      "Allow to cool slightly and drink from the kulhad."
    ],
    "chef_notes": "The clay kulhad must be unglazed and new for best smoky flavor. Heat until you see small wisps of smoke rising from the clay. The sizzling smoke infuses the chai with an unforgettable earthy aroma.",
    "serving_suggestions": "Serve at chai tapris or as a special theatrical experience with snacks.",
    "nutrition_estimate": {
      "calories": "90",
      "protein_g": "4",
      "carbohydrates_g": "12",
      "fat_g": "4"
    },
    "tags": [
      "Smoky",
      "Theatrical",
      "Trending",
      "Street Chai"
    ],
    "image_prompt": "Ultra realistic dramatic food photography of Tandoori Chai being poured into a smoking hot clay kulhad, steam and smoke dramatically rising, orange glow, street chai setting Punjab at dusk",
    "seo_keywords": [
      "tandoori chai recipe",
      "smoky clay pot tea",
      "kulhad chai punjab",
      "trending indian tea"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Badam Doodh Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/badam-doodh",
    "dish_name": "Badam Doodh",
    "state": "Punjab",
    "category": "Tea",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": 2,
    "short_description": "Badam Doodh is Punjab's beloved almond milk drink \u2014 warm full-fat milk blended with soaked almonds, saffron, cardamom and sugar. A traditional nutrition drink fed to children and given at weddings, it is fragrant, creamy and deeply nourishing.",
    "ingredients": [
      {
        "name": "Full fat milk",
        "quantity": "400",
        "unit": "ml"
      },
      {
        "name": "Almonds",
        "quantity": "15",
        "unit": "pieces"
      },
      {
        "name": "Saffron",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Pistachios",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Soak almonds in warm water for 1 hour. Peel and grind to paste.",
      "Soak saffron in 1 tablespoon warm milk.",
      "Bring milk to a gentle boil.",
      "Add almond paste, saffron, cardamom and sugar.",
      "Simmer on low heat for 5 minutes.",
      "Froth by pouring between containers from height.",
      "Serve warm garnished with pistachios."
    ],
    "chef_notes": "Soaking and peeling almonds is essential \u2014 unpeeled almonds give a bitter taste. Pouring from height creates the characteristic froth.",
    "serving_suggestions": "Serve warm at night before bed or as a morning energy drink.",
    "nutrition_estimate": {
      "calories": "195",
      "protein_g": "8",
      "carbohydrates_g": "18",
      "fat_g": "11"
    },
    "tags": [
      "Nutrition Drink",
      "Vegetarian",
      "Warming",
      "Traditional"
    ],
    "image_prompt": "Ultra realistic food photography of Badam Doodh in a tall glass, creamy golden almond milk, saffron strands and pistachio garnish, frothy top, warm cozy lighting",
    "seo_keywords": [
      "badam doodh recipe",
      "almond milk drink india",
      "punjabi almond milk",
      "saffron almond milk"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Espresso Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/punjabi-coffee",
    "dish_name": "Amritsari Doodh Coffee",
    "state": "Punjab",
    "category": "Coffee",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 8,
    "total_time_minutes": 13,
    "servings": 2,
    "short_description": "Amritsari Doodh Coffee is a rich, full-fat milky coffee from the holy city \u2014 made Punjabi-style with generous milk, strong coffee and cardamom, served frothy and scalding hot. Less sophisticated than filter coffee but deeply comforting and full of Punjabi warmth.",
    "ingredients": [
      {
        "name": "Full fat milk",
        "quantity": "350",
        "unit": "ml"
      },
      {
        "name": "Instant coffee",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Cardamom powder",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Water",
        "quantity": "50",
        "unit": "ml"
      }
    ],
    "preparation_steps": [
      "Whisk instant coffee with a little warm water until frothy.",
      "Heat milk until steaming.",
      "Add coffee mixture, cardamom and sugar.",
      "Whisk vigorously to create froth.",
      "Pour from height into cups for extra froth.",
      "Serve immediately."
    ],
    "chef_notes": "Whisking the coffee with water before adding milk creates a creamy froth similar to cafe-style coffee without any equipment.",
    "serving_suggestions": "Serve with aloo paratha or any Punjabi morning snack.",
    "nutrition_estimate": {
      "calories": "130",
      "protein_g": "6",
      "carbohydrates_g": "16",
      "fat_g": "5"
    },
    "tags": [
      "Coffee",
      "Vegetarian",
      "Morning",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic food photography of Amritsari Doodh Coffee in a thick glass, frothy milky coffee, cardamom garnish, Amritsar morning setting",
    "seo_keywords": [
      "punjabi coffee recipe",
      "amritsari doodh coffee",
      "milky indian coffee",
      "north india coffee"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Iced Coffee Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/punjabi-cold-coffee",
    "dish_name": "Punjabi Cold Coffee",
    "state": "Punjab",
    "category": "Coffee",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 0,
    "total_time_minutes": 5,
    "servings": 2,
    "short_description": "Punjabi Cold Coffee is a thick, creamy blended iced coffee drink \u2014 a staple of Punjab's urban cafe culture. Made with strong coffee, full-fat milk and ice cream, it is indulgent, sweet and deeply satisfying.",
    "ingredients": [
      {
        "name": "Strong brewed coffee, cooled",
        "quantity": "100",
        "unit": "ml"
      },
      {
        "name": "Full fat milk",
        "quantity": "250",
        "unit": "ml"
      },
      {
        "name": "Vanilla ice cream",
        "quantity": "2",
        "unit": "scoops"
      },
      {
        "name": "Sugar",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Ice cubes",
        "quantity": "8",
        "unit": "pieces"
      },
      {
        "name": "Chocolate sauce",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Brew strong coffee and cool completely.",
      "Blend coffee, milk, ice cream, sugar and ice until smooth.",
      "Pour into tall chilled glasses.",
      "Drizzle chocolate sauce on top.",
      "Serve immediately with a straw."
    ],
    "chef_notes": "Use strong brewed coffee not instant for best flavor. The ice cream makes it thick and creamy \u2014 do not substitute with just milk.",
    "serving_suggestions": "Serve as a summer refreshment or cafe-style dessert drink.",
    "nutrition_estimate": {
      "calories": "280",
      "protein_g": "7",
      "carbohydrates_g": "36",
      "fat_g": "12"
    },
    "tags": [
      "Coffee",
      "Summer Drink",
      "Indulgent",
      "Cafe Style"
    ],
    "image_prompt": "Ultra realistic food photography of Punjabi Cold Coffee in a tall glass, thick blended coffee with whipped cream, chocolate drizzle, condensation on glass, vibrant cafe setting",
    "seo_keywords": [
      "punjabi cold coffee recipe",
      "north india cold coffee",
      "blended coffee india",
      "cold coffee recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Thandai Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/thandai",
    "dish_name": "Thandai",
    "state": "Punjab",
    "category": "Coffee",
    "difficulty_level": "Medium",
    "prep_time_minutes": 240,
    "cook_time_minutes": 0,
    "total_time_minutes": 240,
    "servings": 4,
    "short_description": "Thandai is Punjab's festive Holi drink \u2014 a cooling milk beverage infused with a complex paste of almonds, rose petals, fennel seeds, melon seeds, cardamom, pepper and saffron. Chilled and sweet, it is served throughout the Holi festival season.",
    "ingredients": [
      {
        "name": "Full fat milk",
        "quantity": "800",
        "unit": "ml"
      },
      {
        "name": "Almonds",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Melon seeds (magaz)",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Fennel seeds",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Rose petals, dried",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Black pepper",
        "quantity": "6",
        "unit": "pieces"
      },
      {
        "name": "Cardamom",
        "quantity": "4",
        "unit": "pods"
      },
      {
        "name": "Saffron",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Sugar",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Rose water",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak almonds, melon seeds, fennel, rose petals and pepper for 3-4 hours.",
      "Grind soaked ingredients into a fine smooth paste.",
      "Heat milk and dissolve sugar. Cool completely.",
      "Mix thandai paste into cold milk.",
      "Add saffron milk and rose water.",
      "Strain through a fine sieve.",
      "Chill for 2 hours and serve over ice."
    ],
    "chef_notes": "The soaking of the spices and nuts is essential for a smooth paste. The paste can be made in advance and stored in the fridge for 3 days.",
    "serving_suggestions": "Serve ice cold during Holi celebrations with gujiya.",
    "nutrition_estimate": {
      "calories": "220",
      "protein_g": "7",
      "carbohydrates_g": "28",
      "fat_g": "9"
    },
    "tags": [
      "Holi Festival",
      "Vegetarian",
      "Cooling",
      "Festive"
    ],
    "image_prompt": "Ultra realistic food photography of Thandai in a tall glass, pale creamy milk with rose petals and saffron strands, served with colorful Holi setting, rose petals scattered around",
    "seo_keywords": [
      "thandai recipe",
      "holi drink punjab",
      "rose almond milk drink",
      "festive punjabi drink"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Papad Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/masala-papad",
    "dish_name": "Masala Papad",
    "state": "Punjab",
    "category": "Appetizers",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 15,
    "servings": 4,
    "short_description": "Masala Papad is a beloved Punjabi starter \u2014 a crispy urad dal wafer topped with finely diced onion, tomato, green chili, chaat masala and coriander. Crunchy, spicy, tangy and utterly addictive, it arrives at every Punjabi restaurant table.",
    "ingredients": [
      {
        "name": "Urad dal papad",
        "quantity": "4",
        "unit": "pieces"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Tomato",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "1",
        "unit": "cup"
      }
    ],
    "preparation_steps": [
      "Deep fry or roast papads until puffed and golden.",
      "Finely dice onion, tomato and green chili.",
      "Mix with chaat masala, lemon juice and coriander.",
      "Spread topping on papads just before serving.",
      "Serve immediately \u2014 do not let papad go soggy."
    ],
    "chef_notes": "Top the papad with the masala just before serving to keep it crispy. Roasting over flame gives a better flavor than deep frying.",
    "serving_suggestions": "Serve as a starter at Punjabi meals or as a quick snack.",
    "nutrition_estimate": {
      "calories": "115",
      "protein_g": "5",
      "carbohydrates_g": "12",
      "fat_g": "5"
    },
    "tags": [
      "Vegetarian",
      "Starter",
      "Crispy",
      "Quick"
    ],
    "image_prompt": "Ultra realistic food photography of Masala Papad on a white plate, crispy wafer topped with colorful diced onion, tomato and coriander, chaat masala dusted, restaurant presentation",
    "seo_keywords": [
      "masala papad recipe",
      "punjabi papad appetizer",
      "crispy papad topping",
      "indian restaurant starter"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Mint Chutney Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/pudina-chutney",
    "dish_name": "Pudina Chutney",
    "state": "Punjab",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 6,
    "short_description": "Punjabi Pudina Chutney is the essential green accompaniment to every tandoori dish, samosa, tikka and chaat \u2014 a vibrant, deeply flavored fresh mint sauce with coriander, green chili and lemon. Bold, fresh and irreplaceable.",
    "ingredients": [
      {
        "name": "Fresh mint leaves",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Fresh coriander",
        "quantity": "50",
        "unit": "g"
      },
      {
        "name": "Green chili",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Garlic",
        "quantity": "2",
        "unit": "cloves"
      },
      {
        "name": "Ginger",
        "quantity": "0.5",
        "unit": "inch"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Black salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Sugar",
        "quantity": "0.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Add all ingredients to a blender.",
      "Blend with minimal water to a smooth paste.",
      "Taste and adjust salt, lemon and chili.",
      "Store refrigerated for up to 3 days."
    ],
    "chef_notes": "Use minimal water to keep the chutney thick and vibrant green. Adding yogurt makes it creamier for serving with tikkas.",
    "serving_suggestions": "Serve with tandoori chicken, tikkas, samosas, kebabs and chaat.",
    "nutrition_estimate": {
      "calories": "25",
      "protein_g": "1",
      "carbohydrates_g": "4",
      "fat_g": "0"
    },
    "tags": [
      "Vegan",
      "Condiment",
      "Essential",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of Pudina Chutney in a small bowl, vibrant bright green, served alongside tandoori chicken and sliced onions, clean food photography",
    "seo_keywords": [
      "pudina chutney recipe",
      "punjabi mint chutney",
      "green chutney recipe",
      "tandoori chutney"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Imli Chutney Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/imli-chutney",
    "dish_name": "Imli Khajur Chutney",
    "state": "Punjab",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": 8,
    "short_description": "Imli Khajur Chutney is Punjab's sweet-and-sour tamarind chutney made with dates and jaggery \u2014 a deep brown, thick sauce with complex layers of sweet, sour and spiced flavors. Essential for chaats, samosas and street food across Punjab.",
    "ingredients": [
      {
        "name": "Tamarind",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Dates (khajur)",
        "quantity": "80",
        "unit": "g"
      },
      {
        "name": "Jaggery",
        "quantity": "80",
        "unit": "g"
      },
      {
        "name": "Ginger powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Black salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "0.25",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak tamarind and dates in warm water for 30 minutes.",
      "Remove seeds from dates.",
      "Blend tamarind, dates and jaggery with soaking water.",
      "Strain through a sieve.",
      "Cook the strained liquid for 10 minutes until thickened.",
      "Add all spices and simmer 5 more minutes.",
      "Cool and store. Keeps 2 weeks refrigerated."
    ],
    "chef_notes": "Dates add a natural sweetness and thickness that jaggery alone cannot. Adjust sweet-sour balance by adding more tamarind or jaggery.",
    "serving_suggestions": "Serve with samosa, gol gappe, dahi bhalle, aloo chaat and bhel puri.",
    "nutrition_estimate": {
      "calories": "70",
      "protein_g": "0",
      "carbohydrates_g": "17",
      "fat_g": "0"
    },
    "tags": [
      "Vegan",
      "Condiment",
      "Sweet Chutney",
      "Gluten-Free"
    ],
    "image_prompt": "Ultra realistic food photography of Imli Khajur Chutney in a small bowl, deep glossy brown sauce, served alongside samosas and chaat, dark moody food photography",
    "seo_keywords": [
      "imli chutney recipe",
      "tamarind date chutney punjab",
      "sweet chutney india",
      "chaat chutney recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Raita Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/boondi-raita",
    "dish_name": "Boondi Raita",
    "state": "Punjab",
    "category": "Sides",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 0,
    "total_time_minutes": 10,
    "servings": 4,
    "short_description": "Boondi Raita is a classic Punjabi yogurt condiment made with tiny crispy chickpea flour droplets (boondi) soaked in spiced yogurt with cumin and coriander. Cooling, creamy and essential alongside biryani and rich Punjabi curries.",
    "ingredients": [
      {
        "name": "Yogurt",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Boondi",
        "quantity": "0.5",
        "unit": "cup"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Black salt",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak boondi in warm water for 5 minutes. Squeeze gently.",
      "Whisk yogurt until smooth.",
      "Add soaked boondi to yogurt.",
      "Add all spices and salt.",
      "Mix well and chill for 30 minutes before serving.",
      "Garnish with cumin powder and chili powder."
    ],
    "chef_notes": "Soaking boondi briefly softens it just enough to be pleasantly tender without becoming mushy. Add boondi just before serving if you prefer more crunch.",
    "serving_suggestions": "Serve alongside biryani, pulao, paratha or any Punjabi curry.",
    "nutrition_estimate": {
      "calories": "130",
      "protein_g": "6",
      "carbohydrates_g": "15",
      "fat_g": "5"
    },
    "tags": [
      "Vegetarian",
      "Cooling",
      "Condiment",
      "Classic"
    ],
    "image_prompt": "Ultra realistic food photography of Boondi Raita in a white bowl, creamy yogurt with tiny golden boondi, cumin and chili powder garnish, fresh coriander, clean food photography",
    "seo_keywords": [
      "boondi raita recipe",
      "punjabi raita",
      "yogurt condiment india",
      "boondi yogurt recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Achaar Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/mixed-achaar",
    "dish_name": "Punjabi Mixed Achaar",
    "state": "Punjab",
    "category": "Sides",
    "difficulty_level": "Hard",
    "prep_time_minutes": 60,
    "cook_time_minutes": 0,
    "total_time_minutes": 4320,
    "servings": 16,
    "short_description": "Punjabi Mixed Achaar is a bold, fiery mixed vegetable pickle with raw mango, turnip, cauliflower and carrots preserved in mustard oil with whole spices. A beloved condiment on every Punjabi table, it adds heat, tang and depth to any meal.",
    "ingredients": [
      {
        "name": "Raw mango, cubed",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Turnip, cubed",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Cauliflower",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Carrots",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Mustard oil",
        "quantity": "150",
        "unit": "ml"
      },
      {
        "name": "Mustard seeds, coarsely crushed",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Fenugreek seeds, coarsely crushed",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "3",
        "unit": "tsp"
      },
      {
        "name": "Turmeric",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "3",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Wash all vegetables and dry completely in sunlight for 2 hours.",
      "Cut into large pieces.",
      "Mix salt and turmeric. Coat vegetables thoroughly.",
      "Leave in a jar in sunlight for 2 days.",
      "Heat mustard oil to smoking point. Cool completely.",
      "Mix all spices with vegetables.",
      "Add cooled mustard oil and mix well.",
      "Store in sterilized glass jars. Ready in 3 days."
    ],
    "chef_notes": "Drying vegetables completely before pickling is essential to prevent mold. Mustard oil must be heated to smoking point to remove bitterness. Sunlight is the best preservative.",
    "serving_suggestions": "Serve as a condiment with any Punjabi meal, paratha or rice-dal.",
    "nutrition_estimate": {
      "calories": "55",
      "protein_g": "1",
      "carbohydrates_g": "4",
      "fat_g": "4"
    },
    "tags": [
      "Vegan",
      "Pickle",
      "Traditional",
      "Spicy"
    ],
    "image_prompt": "Ultra realistic food photography of Punjabi Mixed Achaar in a glass jar, colorful vegetables in mustard oil, vibrant red and yellow spices, rustic Punjabi kitchen background",
    "seo_keywords": [
      "punjabi achaar recipe",
      "mixed vegetable pickle india",
      "punjabi pickle recipe",
      "mustard oil achaar"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Pindi Chole Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/pindi-chole",
    "dish_name": "Pindi Chole",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Medium",
    "prep_time_minutes": 480,
    "cook_time_minutes": 50,
    "total_time_minutes": 530,
    "servings": 4,
    "short_description": "Pindi Chole is a dry, intensely spiced chickpea preparation from Rawalpindi \u2014 darker, more tangy and far more robustly spiced than regular chole. Made with a special dry masala and no onion-tomato gravy, it is a distinctive and addictive Punjabi dish.",
    "ingredients": [
      {
        "name": "Kabuli chana (chickpeas)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Tea bags",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Chole masala",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Anardana (pomegranate seeds)",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Amchur",
        "quantity": "1.5",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "2",
        "unit": "inch"
      },
      {
        "name": "Green chili",
        "quantity": "3",
        "unit": "pieces"
      },
      {
        "name": "Oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Whole spices",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak chickpeas overnight. Pressure cook with tea bags for dark color.",
      "Drain chickpeas, keeping liquid.",
      "Heat oil and fry whole spices.",
      "Add ginger and green chili.",
      "Add cooked chickpeas and all dry masalas.",
      "Add some cooking liquid. Cook on medium heat until dry.",
      "Mash some chickpeas to bind.",
      "Garnish with ginger julienne and green chili."
    ],
    "chef_notes": "Pindi chole should be almost dry \u2014 not like a gravy chole. Anardana and amchur together give it its characteristic sharp tang. The tea bag trick gives the dark color.",
    "serving_suggestions": "Serve with kulcha, bhature or puri.",
    "nutrition_estimate": {
      "calories": "285",
      "protein_g": "14",
      "carbohydrates_g": "42",
      "fat_g": "8"
    },
    "tags": [
      "Vegetarian",
      "Dry Curry",
      "Tangy",
      "Traditional"
    ],
    "image_prompt": "Ultra realistic food photography of Pindi Chole, dark dry spiced chickpeas in a pan, ginger julienne and green chili garnish, served with kulcha, rustic setting",
    "seo_keywords": [
      "pindi chole recipe",
      "rawalpindi chole",
      "dry chickpea curry punjab",
      "pindi chane recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Langar Dal Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/langar-dal",
    "dish_name": "Langar Di Dal",
    "state": "Punjab",
    "category": "Soups",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 45,
    "total_time_minutes": 55,
    "servings": 4,
    "short_description": "Langar Di Dal is the blessed dal served at the Golden Temple's langar (community kitchen) in Amritsar \u2014 a simple, pure and deeply nourishing preparation of urad dal with minimal spices. Eaten by millions, it is perhaps the most spiritually significant food in India.",
    "ingredients": [
      {
        "name": "Urad dal (split)",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Ghee",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Turmeric",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Wash urad dal and pressure cook with turmeric until very soft.",
      "Mash well.",
      "Heat ghee and add cumin seeds.",
      "Add ginger and green chili. Saut\u00e9 briefly.",
      "Pour tempering over dal.",
      "Simmer 10 minutes.",
      "Season with salt and garnish with coriander.",
      "Serve with roti and sabzi."
    ],
    "chef_notes": "The simplicity of Langar Dal is its beauty \u2014 no tomatoes, no heavy spices, just clean nourishing flavors. The ghee and cumin tempering is its only adornment.",
    "serving_suggestions": "Serve with roti, sabzi and rice as a complete simple meal.",
    "nutrition_estimate": {
      "calories": "225",
      "protein_g": "12",
      "carbohydrates_g": "28",
      "fat_g": "7"
    },
    "tags": [
      "Vegetarian",
      "Sattvic",
      "Golden Temple",
      "Simple"
    ],
    "image_prompt": "Ultra realistic food photography of Langar Di Dal, simple clean urad dal in a steel bowl, cumin tempering, minimal garnish, spiritual and peaceful setting, soft golden light",
    "seo_keywords": [
      "langar dal recipe",
      "golden temple dal",
      "amritsar langar food",
      "urad dal punjab simple"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Saag Soup Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/saag-soup",
    "dish_name": "Palak Shorba",
    "state": "Punjab",
    "category": "Soups",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": 4,
    "short_description": "Palak Shorba is a light, vibrant green spinach soup from Punjab \u2014 blended spinach with garlic, ginger and spices, finished with cream and lemon. A nutritious and elegant starter that showcases Punjab's love for leafy greens.",
    "ingredients": [
      {
        "name": "Spinach",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Garlic",
        "quantity": "4",
        "unit": "cloves"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Green chili",
        "quantity": "1",
        "unit": "piece"
      },
      {
        "name": "Fresh cream",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Butter",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cumin seeds",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Blanch spinach in boiling water for 2 minutes. Drain.",
      "Blend spinach with garlic, ginger and green chili.",
      "Heat butter and fry cumin with onion until golden.",
      "Add spinach puree and 300ml water.",
      "Simmer 10 minutes.",
      "Season with salt and lemon juice.",
      "Serve with a swirl of cream."
    ],
    "chef_notes": "Blanching and shocking spinach preserves the vibrant green color. Do not overcook after blending.",
    "serving_suggestions": "Serve as a starter before any Punjabi meal.",
    "nutrition_estimate": {
      "calories": "95",
      "protein_g": "4",
      "carbohydrates_g": "8",
      "fat_g": "6"
    },
    "tags": [
      "Vegetarian",
      "Healthy",
      "Green Soup",
      "Starter"
    ],
    "image_prompt": "Ultra realistic food photography of Palak Shorba green spinach soup in a white bowl, vibrant green color, cream swirl, crouton garnish, elegant restaurant presentation",
    "seo_keywords": [
      "palak shorba recipe",
      "punjabi spinach soup",
      "green soup india",
      "spinach soup starter"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Tomato Shorba Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/tomato-shorba",
    "dish_name": "Tamatar Shorba",
    "state": "Punjab",
    "category": "Soups",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": 4,
    "short_description": "Tamatar Shorba is a classic North Indian restaurant soup \u2014 a thin, spiced tomato broth with ginger, garlic and whole spices, finished with cream. It has graced the starters section of Punjabi restaurants for decades as the perfect warming opener.",
    "ingredients": [
      {
        "name": "Ripe tomatoes",
        "quantity": "600",
        "unit": "g"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Garlic",
        "quantity": "3",
        "unit": "cloves"
      },
      {
        "name": "Whole spices",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Fresh cream",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Butter",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Sugar",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Coriander",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Roast tomatoes, onion, ginger and garlic together.",
      "Blend until smooth and strain.",
      "Heat butter with whole spices.",
      "Add strained tomato liquid.",
      "Add sugar, salt and simmer 15 minutes.",
      "Finish with cream.",
      "Garnish with coriander and serve hot."
    ],
    "chef_notes": "Roasting the tomatoes adds a depth of flavor that boiled tomatoes cannot achieve. The sugar is essential to balance tomato acidity.",
    "serving_suggestions": "Serve as a restaurant-style starter before Punjabi curries.",
    "nutrition_estimate": {
      "calories": "105",
      "protein_g": "2",
      "carbohydrates_g": "12",
      "fat_g": "6"
    },
    "tags": [
      "Vegetarian",
      "Restaurant Style",
      "Soup",
      "Classic"
    ],
    "image_prompt": "Ultra realistic food photography of Tamatar Shorba in an elegant white bowl, vibrant red tomato soup, cream swirl, coriander garnish, fine dining presentation",
    "seo_keywords": [
      "tamatar shorba recipe",
      "punjabi tomato soup",
      "indian restaurant tomato shorba",
      "spiced tomato broth"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Maah Ki Dal Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/maah-ki-dal",
    "dish_name": "Maah Ki Dal",
    "state": "Punjab",
    "category": "Soups",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "total_time_minutes": 45,
    "servings": 4,
    "short_description": "Maah Ki Dal is the everyday white urad dal of Punjab \u2014 a simple, clean preparation of split urad with a ginger-garlic tempering. Less rich than Dal Makhani but equally satisfying, it is the everyday dal of Punjabi rural households.",
    "ingredients": [
      {
        "name": "White urad dal (split)",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Ghee",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Tomato",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Turmeric",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "0.75",
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Wash and pressure cook urad dal with turmeric until soft.",
      "Heat ghee and add cumin seeds.",
      "Add onion and fry until golden.",
      "Add ginger-garlic paste and tomato. Cook until oil separates.",
      "Add red chili powder.",
      "Pour tempering over dal.",
      "Simmer 10 minutes. Adjust consistency.",
      "Serve with ghee drizzle."
    ],
    "chef_notes": "Maah ki dal is naturally thicker than other dals due to the starchy nature of urad. Do not thin it too much \u2014 a creamy consistency is ideal.",
    "serving_suggestions": "Serve with makki di roti, plain roti or rice.",
    "nutrition_estimate": {
      "calories": "240",
      "protein_g": "12",
      "carbohydrates_g": "28",
      "fat_g": "9"
    },
    "tags": [
      "Vegetarian",
      "Everyday",
      "Rural Punjab",
      "Simple"
    ],
    "image_prompt": "Ultra realistic food photography of Maah Ki Dal, creamy white urad dal in a copper bowl, ghee pool, cumin tempering, simple homestyle Punjabi photography",
    "seo_keywords": [
      "maah ki dal recipe",
      "white urad dal punjab",
      "punjabi dal recipe",
      "urad dal everyday"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Atte Ka Halwa Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/atte-ka-halwa",
    "dish_name": "Atte Ka Halwa",
    "state": "Punjab",
    "category": "Desserts",
    "difficulty_level": "Easy",
    "prep_time_minutes": 5,
    "cook_time_minutes": 25,
    "total_time_minutes": 30,
    "servings": 4,
    "short_description": "Atte Ka Halwa is Punjab's simplest and most comforting dessert \u2014 whole wheat flour roasted in generous ghee until golden and nutty, then cooked with sugar and water into a thick, fragrant pudding. Made at Sikh religious ceremonies and served with great love.",
    "ingredients": [
      {
        "name": "Whole wheat flour",
        "quantity": "200",
        "unit": "g"
      },
      {
        "name": "Ghee",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Sugar",
        "quantity": "150",
        "unit": "g"
      },
      {
        "name": "Water",
        "quantity": "400",
        "unit": "ml"
      },
      {
        "name": "Cardamom powder",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Almonds",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cashews",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Heat ghee in a heavy pan and add wheat flour.",
      "Roast on low heat stirring constantly for 15-20 minutes until deep golden and fragrant.",
      "Meanwhile boil water with sugar until dissolved.",
      "Carefully pour sugar water into roasted flour \u2014 it will splutter.",
      "Stir vigorously to prevent lumps.",
      "Cook until halwa leaves sides of pan.",
      "Add cardamom and nuts.",
      "Serve warm."
    ],
    "chef_notes": "The flour must be roasted to a deep golden brown \u2014 this is what creates the distinctive nutty flavor. Rushing this step results in raw flour taste.",
    "serving_suggestions": "Serve as prasad at religious ceremonies or as a warming winter dessert.",
    "nutrition_estimate": {
      "calories": "355",
      "protein_g": "6",
      "carbohydrates_g": "48",
      "fat_g": "17"
    },
    "tags": [
      "Vegetarian",
      "Religious",
      "Festival",
      "Simple"
    ],
    "image_prompt": "Ultra realistic food photography of Atte Ka Halwa, golden wheat flour pudding in a brass thali, ghee sheen, garnished with almonds and cashews, warm devotional setting",
    "seo_keywords": [
      "atte ka halwa recipe",
      "wheat flour halwa punjab",
      "langar halwa",
      "punjabi halwa recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Gobhi Paratha Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/gobhi-paratha",
    "dish_name": "Gobhi Paratha",
    "state": "Punjab",
    "category": "Breads",
    "difficulty_level": "Medium",
    "prep_time_minutes": 30,
    "cook_time_minutes": 20,
    "total_time_minutes": 50,
    "servings": 4,
    "short_description": "Gobhi Paratha is a beloved Punjabi stuffed flatbread filled with spiced grated cauliflower \u2014 a delicate and fragrant winter breakfast. The crispy golden exterior gives way to the warm, lightly spiced cauliflower filling, best enjoyed with white butter and yogurt.",
    "ingredients": [
      {
        "name": "Whole wheat flour",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Cauliflower, grated",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Ajwain",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Amchur",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Butter",
        "quantity": "4",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Grate cauliflower finely. Squeeze out all moisture.",
      "Mix with green chili, ginger, coriander, ajwain, amchur and salt.",
      "Make soft wheat dough. Rest 20 minutes.",
      "Roll dough into circle, fill with cauliflower, seal and roll gently.",
      "Cook on hot tawa with butter on both sides until golden.",
      "Serve hot immediately."
    ],
    "chef_notes": "Squeezing all moisture from cauliflower is critical \u2014 wet filling causes the paratha to tear and become soggy. The filling must be completely dry.",
    "serving_suggestions": "Serve with white butter, yogurt and sweet mango pickle.",
    "nutrition_estimate": {
      "calories": "310",
      "protein_g": "8",
      "carbohydrates_g": "44",
      "fat_g": "12"
    },
    "tags": [
      "Vegetarian",
      "Breakfast",
      "Winter",
      "Stuffed Bread"
    ],
    "image_prompt": "Ultra realistic food photography of Gobhi Paratha, golden cauliflower stuffed flatbread with butter, served with white yogurt and pickle, winter Punjabi morning setting",
    "seo_keywords": [
      "gobhi paratha recipe",
      "cauliflower stuffed paratha",
      "punjabi gobi paratha",
      "winter breakfast punjab"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Bhature Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/bhature",
    "dish_name": "Bhature",
    "state": "Punjab",
    "category": "Breads",
    "difficulty_level": "Medium",
    "prep_time_minutes": 120,
    "cook_time_minutes": 20,
    "total_time_minutes": 140,
    "servings": 4,
    "short_description": "Bhature are Punjab's iconic deep-fried leavened breads \u2014 puffed up golden clouds of maida dough that are crispy outside and soft inside. The perfect partner to chole, they are a Punjabi breakfast institution.",
    "ingredients": [
      {
        "name": "Maida (all-purpose flour)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Yogurt",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Semolina (sooji)",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Sugar",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Baking soda",
        "quantity": "0.25",
        "unit": "tsp"
      },
      {
        "name": "Oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Oil for frying",
        "quantity": "3",
        "unit": "cups"
      },
      {
        "name": "Salt",
        "quantity": "0.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Mix maida, sooji, yogurt, sugar, salt, baking soda and oil.",
      "Knead into a smooth soft dough with minimal water.",
      "Rest covered for 1.5-2 hours.",
      "Divide into balls and roll into oval shapes.",
      "Heat oil to 180\u00b0C.",
      "Fry one at a time, pressing down gently so it puffs up.",
      "Turn once. Fry until golden on both sides.",
      "Serve immediately while hot."
    ],
    "chef_notes": "Hot oil and a soft rested dough are the keys to perfectly puffed bhature. Pressing down gently while frying forces it to puff. Never crowd the oil.",
    "serving_suggestions": "Serve hot with pindi chole or regular chole, pickled onions and pickle.",
    "nutrition_estimate": {
      "calories": "295",
      "protein_g": "6",
      "carbohydrates_g": "40",
      "fat_g": "13"
    },
    "tags": [
      "Vegetarian",
      "Deep Fried",
      "Breakfast",
      "Street Food"
    ],
    "image_prompt": "Ultra realistic professional food photography of Bhature, large puffed golden deep-fried bread, crispy and airy, served with dark chole curry, authentic Punjabi dhaba setting",
    "seo_keywords": [
      "bhature recipe",
      "punjabi bhature",
      "deep fried bread india",
      "chole bhature bread recipe"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Matar Kulcha Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/matar-kulcha",
    "dish_name": "Matar Kulcha",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Medium",
    "prep_time_minutes": 20,
    "cook_time_minutes": 25,
    "total_time_minutes": 45,
    "servings": 4,
    "short_description": "Matar Kulcha is a beloved Punjabi street food of spiced dried white peas served alongside soft kulcha bread. The tangy, chatpata matar with its tamarind and chaat masala dressing paired with kulcha is a Delhi and Punjab street food icon.",
    "ingredients": [
      {
        "name": "Dried white peas (safed matar)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Kulcha bread",
        "quantity": "4",
        "unit": "pieces"
      },
      {
        "name": "Tamarind chutney",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Green chutney",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "1.5",
        "unit": "tsp"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak and pressure cook white peas until soft.",
      "Heat oil and fry ginger. Add cooked peas.",
      "Add chaat masala, salt and some tamarind chutney.",
      "Mash slightly and simmer 10 minutes.",
      "Serve in a bowl. Top with both chutneys, raw onion and lemon.",
      "Serve with buttered kulcha alongside."
    ],
    "chef_notes": "White dried peas (safed matar) are completely different from green peas. They have a unique starchy texture that absorbs the tangy dressing beautifully.",
    "serving_suggestions": "Serve matar in a bowl with kulcha bread, raw onion and extra chutney.",
    "nutrition_estimate": {
      "calories": "385",
      "protein_g": "14",
      "carbohydrates_g": "62",
      "fat_g": "9"
    },
    "tags": [
      "Vegetarian",
      "Street Food",
      "Chaat",
      "Punjabi"
    ],
    "image_prompt": "Ultra realistic professional food photography of Matar Kulcha, spiced white peas with colorful chutneys alongside soft kulcha bread, vibrant street food setting Punjab",
    "seo_keywords": [
      "matar kulcha recipe",
      "punjabi matar chaat",
      "white peas chaat",
      "delhi street food matar kulcha"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Sookha Kala Chana Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/kala-chana",
    "dish_name": "Sookha Kala Chana",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 480,
    "cook_time_minutes": 30,
    "total_time_minutes": 510,
    "servings": 4,
    "short_description": "Sookha Kala Chana is a dry, rustic Punjabi preparation of black chickpeas \u2014 pressure cooked until tender then tossed in a bold tempering of cumin, ginger, amchur and green chili. A nutritious staple offered as prasad at Sikh temples and eaten as everyday dhaba food.",
    "ingredients": [
      {
        "name": "Kala chana (black chickpeas)",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Oil",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "quantity": "1",
        "unit": "inch"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Amchur",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Soak kala chana overnight. Pressure cook until tender.",
      "Heat oil and add cumin seeds.",
      "Add ginger and green chili. Fry 1 minute.",
      "Add drained chana and toss well.",
      "Add amchur, chaat masala and salt.",
      "Cook dry on high heat for 5 minutes.",
      "Garnish with coriander and serve."
    ],
    "chef_notes": "Kala chana takes much longer to cook than kabuli chana. The longer it soaks and the higher the pressure cook, the better the texture.",
    "serving_suggestions": "Serve as prasad, with puri, or alongside tea as a nutritious snack.",
    "nutrition_estimate": {
      "calories": "235",
      "protein_g": "12",
      "carbohydrates_g": "36",
      "fat_g": "5"
    },
    "tags": [
      "Vegan",
      "High Protein",
      "Prasad",
      "Everyday"
    ],
    "image_prompt": "Ultra realistic food photography of Sookha Kala Chana, dark spiced black chickpeas in a pan, garnished with coriander and green chili, simple rustic Punjabi presentation",
    "seo_keywords": [
      "kala chana recipe",
      "black chickpea dry curry",
      "punjabi chana recipe",
      "sookha chana prasad"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Meetha Chawal Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/meetha-chawal",
    "dish_name": "Meetha Chawal",
    "state": "Punjab",
    "category": "Rice Preparations",
    "difficulty_level": "Easy",
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": 4,
    "short_description": "Meetha Chawal \u2014 sweet saffron rice \u2014 is a Punjabi festival rice preparation made for special occasions and religious gatherings. Fragrant basmati cooked with saffron, ghee, whole spices and sugar, garnished with fried nuts and raisins.",
    "ingredients": [
      {
        "name": "Basmati rice",
        "quantity": "300",
        "unit": "g"
      },
      {
        "name": "Sugar",
        "quantity": "100",
        "unit": "g"
      },
      {
        "name": "Ghee",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Saffron",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Cardamom",
        "quantity": "4",
        "unit": "pods"
      },
      {
        "name": "Cloves",
        "quantity": "4",
        "unit": "pieces"
      },
      {
        "name": "Almonds",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Cashews",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Raisins",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Wash and soak basmati rice for 20 minutes.",
      "Heat ghee and fry nuts and raisins. Remove.",
      "Fry whole spices in remaining ghee.",
      "Add drained rice and fry 2 minutes.",
      "Add water, sugar and saffron soaked in warm water.",
      "Bring to boil, cover and cook on very low heat for 18 minutes.",
      "Fluff and garnish with fried nuts."
    ],
    "chef_notes": "The saffron must be soaked in warm water or milk to release its full color and aroma. Adding sugar with water ensures even distribution.",
    "serving_suggestions": "Serve at Punjabi festivals, religious occasions or as a sweet side.",
    "nutrition_estimate": {
      "calories": "375",
      "protein_g": "5",
      "carbohydrates_g": "64",
      "fat_g": "10"
    },
    "tags": [
      "Vegetarian",
      "Festival Food",
      "Sweet Rice",
      "Saffron"
    ],
    "image_prompt": "Ultra realistic food photography of Meetha Chawal saffron rice in a brass thali, golden yellow fragrant rice, fried almonds cashews and raisins garnish, festive Punjabi setting",
    "seo_keywords": [
      "meetha chawal recipe",
      "saffron sweet rice punjab",
      "zarda rice punjabi",
      "festival rice recipe punjab"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Aloo Kulcha Salad Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/lahori-salad",
    "dish_name": "Lahori Salad",
    "state": "Punjab",
    "category": "Salads",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 0,
    "total_time_minutes": 15,
    "servings": 4,
    "short_description": "Lahori Salad is a robust, generously seasoned salad from the culinary tradition of undivided Punjab \u2014 sliced tomatoes, cucumbers, onions, radish and green chilies dressed with chaat masala, lemon and raw mango powder. Bold flavors befitting Punjabi cuisine.",
    "ingredients": [
      {
        "name": "Tomatoes",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Cucumber",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "Red onion",
        "quantity": "1",
        "unit": "large"
      },
      {
        "name": "White radish",
        "quantity": "1",
        "unit": "medium"
      },
      {
        "name": "Green chili",
        "quantity": "2",
        "unit": "pieces"
      },
      {
        "name": "Chaat masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Amchur",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Black salt",
        "quantity": "0.5",
        "unit": "tsp"
      },
      {
        "name": "Lemon juice",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "quantity": "3",
        "unit": "tbsp"
      }
    ],
    "preparation_steps": [
      "Slice all vegetables into rounds or chunks.",
      "Arrange on a serving plate.",
      "Sprinkle chaat masala, amchur and black salt.",
      "Squeeze lemon juice over everything.",
      "Top with coriander and green chili.",
      "Serve immediately."
    ],
    "chef_notes": "Lahori salad is presented with vegetables in larger pieces than kachumber \u2014 it's meant to be eaten alongside the main meal, not stirred in. The triple-sour combination of lemon, amchur and black salt is its signature.",
    "serving_suggestions": "Serve alongside any Punjabi meat or vegetarian main course.",
    "nutrition_estimate": {
      "calories": "50",
      "protein_g": "2",
      "carbohydrates_g": "10",
      "fat_g": "0"
    },
    "tags": [
      "Vegan",
      "Refreshing",
      "Tangy",
      "Traditional"
    ],
    "image_prompt": "Ultra realistic food photography of Lahori Salad, colorful sliced vegetables on a white plate, chaat masala dusted, lemon wedge, fresh coriander, vibrant food photography",
    "seo_keywords": [
      "lahori salad recipe",
      "punjabi salad",
      "north indian salad recipe",
      "chaat masala vegetable salad"
    ]
  },
  {
    "seo_title": "Authentic Punjabi Dhaba Paneer Recipe | FusionChef AI",
    "slug": "/indian-cuisine/punjab/dhaba-paneer",
    "dish_name": "Dhaba Style Paneer",
    "state": "Punjab",
    "category": "Main Courses",
    "difficulty_level": "Easy",
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": 4,
    "short_description": "Dhaba Style Paneer is the bold, rustic paneer curry of Punjab's roadside eateries \u2014 coarser, more aggressively spiced and more deeply flavored than restaurant versions. Cooked in mustard oil with whole spices and a robust onion-tomato base, it is unforgettable.",
    "ingredients": [
      {
        "name": "Paneer",
        "quantity": "400",
        "unit": "g"
      },
      {
        "name": "Mustard oil",
        "quantity": "3",
        "unit": "tbsp"
      },
      {
        "name": "Onion",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Tomato",
        "quantity": "2",
        "unit": "large"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2",
        "unit": "tbsp"
      },
      {
        "name": "Coriander powder",
        "quantity": "2",
        "unit": "tsp"
      },
      {
        "name": "Red chili powder",
        "quantity": "1.5",
        "unit": "tsp"
      },
      {
        "name": "Garam masala",
        "quantity": "1",
        "unit": "tsp"
      },
      {
        "name": "Kasuri methi",
        "quantity": "1",
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1.5",
        "unit": "tsp"
      }
    ],
    "preparation_steps": [
      "Heat mustard oil to smoking point. Cool slightly.",
      "Add whole spices and onion. Fry until golden.",
      "Add ginger-garlic paste. Fry until raw smell goes.",
      "Add tomatoes and all dry spices. Cook until oil separates.",
      "Add paneer cubes cut into large pieces.",
      "Toss well and add 150ml water.",
      "Simmer 10 minutes.",
      "Crush kasuri methi and add. Serve."
    ],
    "chef_notes": "Mustard oil is what makes dhaba paneer taste different from restaurant paneer \u2014 the pungent, slightly bitter oil adds a characteristic Punjabi intensity.",
    "serving_suggestions": "Serve with laccha paratha, tandoori roti or steamed rice.",
    "nutrition_estimate": {
      "calories": "340",
      "protein_g": "18",
      "carbohydrates_g": "10",
      "fat_g": "26"
    },
    "tags": [
      "Vegetarian",
      "Dhaba Style",
      "Bold",
      "Rustic"
    ],
    "image_prompt": "Ultra realistic food photography of Dhaba Style Paneer, bold rustic paneer curry in a karahi, dark spiced gravy, served on a roadside dhaba table with laccha paratha",
    "seo_keywords": [
      "dhaba paneer recipe",
      "punjabi dhaba style paneer",
      "roadside paneer curry",
      "mustard oil paneer recipe"
    ]
  }
];

const chips = ["Chicken + lemon + garlic", "Pasta in 20 mins", "Vegan dessert ideas", "Leftover rice recipes"];
const welcome = { role: "ai", content: <><h4>👋 Hello, I'm FusionChef AI!</h4>Tell me what ingredients you have, a cuisine you're craving, or any dietary needs — I'll craft a recipe just for you.</> };

export default function FusionChefAI() {
  const [slide, setSlide] = useState(0);
  const [liked, setLiked] = useState({});
  const [messages, setMessages] = useState([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [recipeModal, setRecipeModal] = useState(null);
  const [indianPage, setIndianPage] = useState(false);
  const [maharashtraPage, setMaharashtraPage] = useState(false);
  const [punjabPage, setPunjabPage] = useState(false);
  const [punjabCategory, setPunjabCategory] = useState("All");
  const [punjabSearch, setPunjabSearch] = useState("");
  const [punjabModal, setPunjabModal] = useState(null);
  const [punjabGuidePage, setPunjabGuidePage] = useState(false);
  const [maharashtraGuidePage, setMaharashtraGuidePage] = useState(false);
  const [maharashtraCategory, setMaharashtraCategory] = useState("All");
  const [maharashtraSearch, setMaharashtraSearch] = useState("");
  const [maharashtraModal, setMaharashtraModal] = useState(null);
  const [cuisineExplorer, setCuisineExplorer] = useState(false);
  const [recipeDB, setRecipeDB] = useState(false);
  const [recipeDBCategory, setRecipeDBCategory] = useState("All");
  const [recipeDBCuisine, setRecipeDBCuisine] = useState("All");
  const [recipeDBSearch, setRecipeDBSearch] = useState("");
  const [recipeDBDifficulty, setRecipeDBDifficulty] = useState("All");
  const [indianCategory, setIndianCategory] = useState("All");
  const [indianSearch, setIndianSearch] = useState("");
  const [indianModal, setIndianModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [chefModal, setChefModal] = useState(null);
  const [catModal, setCatModal] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToSection = (id) => {
    if (id === "cuisine-explorer") { setCuisineExplorer(true); setRecipeDB(false); return; }
    if (id === "recipe-db") { setRecipeDB(true); setCuisineExplorer(false); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setRecipeModal(null); setChefModal(null); setCatModal(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sendMessage = async (text) => {
    const query = (text || input).trim();
    if (!query) return;
    setInput("");
    setMessages(m => [...m, { role: "user", content: query }]);
    setLoading(true);
    try {
      const GROQ_KEY = "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";
      const systemPrompt = "You are FusionChef AI, a warm and creative culinary AI. When users ask for recipes, respond with a catchy dish name, 5-7 key ingredients, 3-4 brief cooking steps, and a helpful tip. Keep it enthusiastic and under 250 words.";
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + GROQ_KEY },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "system", content: systemPrompt }, { role: "user", content: query }],
          max_tokens: 500,
          temperature: 0.8
        })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Hmm, let me think on that...";
      setMessages(m => [...m, { role: "ai", content: reply }]);
    } catch {
      setMessages(m => [...m, { role: "ai", content: "Oops! My kitchen is a bit busy. Please try again in a moment. 🍳" }]);
    }
    setLoading(false);
  };

  const handleSearch = async (q) => {
    const query = (q || searchQuery).trim();
    if (!query) return;
    setSearchModal(true);
    setSearchLoading(true);
    setSearchResults([]);
    // Search existing recipes
    const local = trending.filter(r =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.chef.toLowerCase().includes(query.toLowerCase()) ||
      (r.ingredients && r.ingredients.some(i => i.toLowerCase().includes(query.toLowerCase())))
    ).map(r => ({ ...r, isAI: false }));
    setSearchResults(local);
    // AI generates more results
    try {
      const GROQ_KEY = "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";
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + GROQ_KEY },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: 'You are FusionChef AI. Generate exactly 3 recipe suggestions for the search query. Respond ONLY with a valid JSON array, no extra text. Format: [{"title":"...","chef":"Chef Name","time":"30 min","difficulty":"easy","ingredients":["item1","item2","item3","item4","item5"],"steps":["Step 1","Step 2","Step 3"],"img":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80","isAI":true}]' },
            { role: "user", content: "Search: " + query }
          ],
          max_tokens: 1000, temperature: 0.7
        })
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "[]";
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const aiRecipes = JSON.parse(jsonMatch[0]).map(r => ({ ...r, isAI: true }));
        setSearchResults(prev => [...prev, ...aiRecipes]);
      }
    } catch(e) { console.log("Search AI error:", e); }
    setSearchLoading(false);
  };

  const navLinks = [
    { label: "AI Chef", id: "ai-chef" },
    { label: "Trending", id: "trending" },
    { label: "Cuisines", id: "cuisine-explorer" },
    { label: "Recipes", id: "recipe-db" },
  ];

  return (
    <>
      <style>{styles}</style>

      {/* RECIPE MODAL */}
      {recipeModal && (
        <div className="modal-overlay" onClick={() => setRecipeModal(null)}>
          <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setRecipeModal(null)}>✕</button>
            <div className="modal">
              <img src={recipeModal.img} alt={recipeModal.title} className="modal-img" />
              <div className="modal-body">
                <div className="recipe-chef">{recipeModal.chef || "FusionChef AI"} {recipeModal.isAI && <span className="ai-badge">✨ AI</span>}</div>
                <h2>{recipeModal.title || "Recipe"}</h2>
                <div className="modal-meta">
                  <span>⏱ {recipeModal.time || "30 min"}</span>
                  <span>📊 {recipeModal.difficulty ? recipeModal.difficulty.charAt(0).toUpperCase()+recipeModal.difficulty.slice(1) : "Easy"}</span>
                  <span>⭐ 4.8</span>
                  <span>🍽 2-4 servings</span>
                </div>
                <div className="modal-section-title">Ingredients</div>
                <ul className="modal-ingredients">
                  {(recipeModal.ingredients || ["Check recipe for ingredients"]).map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
                <div className="modal-section-title">Instructions</div>
                <ol className="modal-steps">
                  {(recipeModal.steps || ["Follow recipe instructions"]).map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHEF MODAL */}
      {chefModal && (
        <div className="modal-overlay" onClick={() => setChefModal(null)}>
          <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setChefModal(null)}>✕</button>
            <div className="modal">
              <div className="modal-chef-body">
                <img src={chefModal.img} alt={chefModal.name} className="modal-chef-avatar" />
                <h2>{chefModal.name}</h2>
                <div className="modal-chef-specialty">{chefModal.specialty}</div>
                <div className="modal-chef-stats">
                  <div className="modal-chef-stat"><strong>{chefModal.followers}</strong><span>Followers</span></div>
                  <div className="modal-chef-stat"><strong>{chefModal.recipes}</strong><span>Recipes</span></div>
                  <div className="modal-chef-stat"><strong>{chefModal.awards}</strong><span>Awards</span></div>
                </div>
                <p className="modal-chef-bio">{chefModal.bio}</p>
                <button className="btn-ask-chef" onClick={() => { setChefModal(null); scrollToSection("ai-chef"); }}>
                  ✨ Ask AI Chef about {chefModal.name.split(" ")[0]}'s recipes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY MODAL */}
      {catModal && (
        <div className="modal-overlay" onClick={() => setCatModal(null)}>
          <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setCatModal(null)}>✕</button>
            <div className="modal">
              <img src={catModal.img} alt={catModal.name} className="modal-img" />
              <div className="modal-body">
                <h2>{catModal.name}</h2>
                <p style={{color:"var(--text-muted)", marginBottom:"1rem"}}>{catModal.count} available</p>
                <div className="modal-section-title">Popular in this Category</div>
                <ul className="modal-steps">
                  {catModal.recipes.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
                <button className="btn-ask-chef" style={{marginTop:"1.2rem"}} onClick={() => { setCatModal(null); scrollToSection("ai-chef"); }}>
                  ✨ Generate a {catModal.name} Recipe with AI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* CUISINE EXPLORER PAGE */}
      {cuisineExplorer && (
        <div className="full-page">
          <div className="full-page-header">
            <button className="back-btn" onClick={() => setCuisineExplorer(false)}>← Back</button>
            <h1>🌍 Cuisine <em>Explorer</em></h1>
          </div>
          <div className="full-page-content">
            {[
              { continent: "🌏 Asian Cuisines", cuisines: [
                { name: "🇮🇳 Indian", desc: "biryani, butter chicken, dosa", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", available: "indian", states: ["Maharashtra", "Punjab"] },
                { name: "🇯🇵 Japanese", desc: "sushi, ramen, tempura", img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80" },
                { name: "🇨🇳 Chinese", desc: "dim sum, Peking duck, stir-fries", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80" },
                { name: "🇹🇭 Thai", desc: "pad thai, green curry", img: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&q=80" },
                { name: "🇰🇷 Korean", desc: "kimchi, bibimbap, BBQ", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80" },
                { name: "🇻🇳 Vietnamese", desc: "pho, banh mi", img: "https://images.unsplash.com/photo-1582878826629-33b7f57b2a3c?w=400&q=80" },
                { name: "🇮🇩 Indonesian", desc: "nasi goreng, satay", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80" },
                { name: "🇵🇭 Filipino", desc: "adobo, lechon", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80" },
              ]},
              { continent: "🌍 European Cuisines", cuisines: [
                { name: "🇮🇹 Italian", desc: "pasta, pizza, risotto", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80" },
                { name: "🇫🇷 French", desc: "croissants, coq au vin", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" },
                { name: "🇪🇸 Spanish", desc: "paella, tapas", img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&q=80" },
                { name: "🇬🇷 Greek", desc: "moussaka, souvlaki", img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80" },
                { name: "🇹🇷 Turkish", desc: "kebabs, baklava", img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80" },
                { name: "🇩🇪 German", desc: "sausages, schnitzel", img: "https://images.unsplash.com/photo-1599921841143-819065a55cc5?w=400&q=80" },
                { name: "🇬🇧 British", desc: "fish and chips, pies", img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80" },
              ]},
              { continent: "🌎 American Cuisines", cuisines: [
                { name: "🇺🇸 American", desc: "burgers, BBQ", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
                { name: "🇲🇽 Mexican", desc: "tacos, enchiladas", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80" },
                { name: "🇵🇪 Peruvian", desc: "ceviche, lomo saltado", img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80" },
                { name: "🇧🇷 Brazilian", desc: "feijoada, churrasco", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80" },
                { name: "🇦🇷 Argentinian", desc: "asado, empanadas", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80" },
              ]},
              { continent: "🌍 Middle Eastern Cuisines", cuisines: [
                { name: "🇱🇧 Lebanese", desc: "hummus, shawarma", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80" },
                { name: "🇮🇷 Iranian", desc: "kebabs, saffron rice", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80" },
                { name: "🇮🇱 Israeli", desc: "falafel, shakshouka", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80" },
                { name: "🇴🇲 Omani", desc: "shuwa, majboos", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80" },
              ]},
              { continent: "🌍 African Cuisines", cuisines: [
                { name: "🇲🇦 Moroccan", desc: "tagine, couscous", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80" },
                { name: "🇪🇹 Ethiopian", desc: "injera, doro wat", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80" },
                { name: "🇳🇬 Nigerian", desc: "jollof rice, egusi soup", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80" },
                { name: "🇿🇦 South African", desc: "braai, bobotie", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80" },
              ]},
              { continent: "🌏 Oceania Cuisines", cuisines: [
                { name: "🇦🇺 Australian", desc: "modern fusion, seafood", img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80" },
                { name: "🇳🇿 New Zealand", desc: "lamb, pavlova", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" },
              ]},
            ].map(group => (
              <div key={group.continent} className="ce-continent">
                <h2 className="ce-continent-title">{group.continent}</h2>
                <div className="ce-grid">
                  {group.cuisines.map(c => (
                    <div key={c.name} className="ce-card" onClick={() => {
                      if(c.available) { setCuisineExplorer(false); setIndianPage(true); }
                      else { alert("🚧 " + c.name + " recipes coming soon!"); }
                    }}>
                      <div className="ce-card-img">
                        <img src={c.img} alt={c.name} />
                        <div className="ce-card-overlay" />
                      </div>
                      <div className="ce-card-body">
                        <h3>{c.name}</h3>
                        <p>{c.desc}</p>
                        {c.available ? <span className="ce-available">✅ Available</span> : <span className="ce-coming">🚧 Coming Soon</span>}
                        {c.states && c.states.length > 0 && (
                          <div style={{marginTop:"0.4rem"}}>
                            {c.states.map(s => (
                              <span key={s} onClick={e => { e.stopPropagation(); setCuisineExplorer(false); if(s==="Maharashtra") setMaharashtraPage(true); else if(s==="Punjab") setPunjabPage(true); window.scrollTo({top:0,behavior:"smooth"}); }} style={{display:"inline-block",background:"rgba(232,98,26,0.15)",color:"var(--saffron)",fontSize:"0.68rem",padding:"0.2rem 0.6rem",borderRadius:"10px",marginRight:"0.3rem",cursor:"pointer",fontWeight:600}}>📍 {s}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECIPE DATABASE PAGE */}
      {recipeDB && (
        <div className="full-page">
          <div className="full-page-header">
            <button className="back-btn" onClick={() => setRecipeDB(false)}>← Back</button>
            <h1>📖 Recipe <em>Database</em></h1>
          </div>
          <div className="full-page-content">
            <div className="rdb-filters">
              <div className="rdb-filters-row">
                <div className="rdb-filter-group" style={{flex:2}}>
                  <label>🔍 Search Recipes</label>
                  <input className="rdb-search-input" placeholder="Search by name, ingredient or flavor..." value={recipeDBSearch} onChange={e => setRecipeDBSearch(e.target.value)} />
                </div>
                <div className="rdb-filter-group">
                  <label>🍽 Category</label>
                  <select className="rdb-select" value={recipeDBCategory} onChange={e => setRecipeDBCategory(e.target.value)}>
                    <option value="All">All Categories</option>
                    {["Appetizers","Soups","Main Courses","Breads","Rice Preparations","Desserts","Beverages"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="rdb-filter-group">
                  <label>📊 Difficulty</label>
                  <select className="rdb-select" value={recipeDBDifficulty} onChange={e => setRecipeDBDifficulty(e.target.value)}>
                    <option value="All">All Levels</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className="rdb-filter-group">
                  <label>🌍 Cuisine</label>
                  <select className="rdb-select" value={recipeDBCuisine} onChange={e => setRecipeDBCuisine(e.target.value)}>
                    <option value="All">All Cuisines</option>
                    <option value="Indian">🇮🇳 Indian</option>
                    <option value="Maharashtrian">🍊 Maharashtra</option>
                  </select>
                </div>
              </div>
            </div>
            {(() => {
              const allRecipes = [...indianCuisineData, ...maharashtraCuisineData, ...punjabCuisineData];
              const filtered = allRecipes.filter(d => {
                const matchCat = recipeDBCategory === "All" || d.category === recipeDBCategory;
                const matchDiff = recipeDBDifficulty === "All" || d.difficulty_level === recipeDBDifficulty;
                const matchCuisine = recipeDBCuisine === "All" || d.cuisine === recipeDBCuisine;
                const matchSearch = !recipeDBSearch || 
                  d.dish_name.toLowerCase().includes(recipeDBSearch.toLowerCase()) ||
                  d.flavor_profile.some(f => f.toLowerCase().includes(recipeDBSearch.toLowerCase())) ||
                  d.ingredients.some(i => i.name.toLowerCase().includes(recipeDBSearch.toLowerCase()));
                return matchCat && matchDiff && matchCuisine && matchSearch;
              });
              const emojis = {"Appetizers":"🥟","Soups":"🍜","Main Courses":"🍛","Breads":"🫓","Rice Preparations":"🍚","Desserts":"🍮","Beverages":"☕"};
              const gradients = {"Appetizers":"#E8621A, #C9922A","Soups":"#4A7C59, #2E7D32","Main Courses":"#C0392B, #E8621A","Breads":"#C9922A, #8B4513","Rice Preparations":"#4A7C59, #C9922A","Desserts":"#9B59B6, #E8621A","Beverages":"#1C6EA4, #4A7C59"};
              return (
                <>
                  <div className="rdb-count">Showing <strong>{filtered.length}</strong> of <strong>{allRecipes.length}</strong> recipes</div>
                  {filtered.length === 0 ? (
                    <div className="rdb-empty"><p>🔍</p><p>No recipes found. Try different filters!</p></div>
                  ) : (
                    <div className="rdb-grid">
                      {filtered.map((dish, i) => (
                        <div key={i} className="rdb-card" onClick={() => { setRecipeDB(false); if(dish.state === "Maharashtra") { setMaharashtraModal(dish); setMaharashtraPage(true); } else if(dish.state === "Punjab") { setPunjabModal(dish); setPunjabPage(true); } else { setIndianModal(dish); setIndianPage(true); } window.scrollTo({top:0,behavior:"smooth"}); }}>
                          <div className="rdb-card-img" style={{padding:0,overflow:"hidden"}}>
                            {dish.img ? <img src={dish.img} alt={dish.dish_name} style={{width:"100%",height:"100%",objectFit:"cover"}} /> : <span>{emojis[dish.category] || "🍽"}</span>}
                          </div>
                          <div className="rdb-card-body">
                            <div style={{display:"flex", gap:"0.4rem", marginBottom:"0.4rem", flexWrap:"wrap"}}>
                              <span className="rdb-cuisine-tag">{dish.cuisine}</span>
                              <span className="indian-cat-badge">{dish.category}</span>
                            </div>
                            <h3>{dish.dish_name}</h3>
                            <div className="rdb-card-meta">
                              <span>⏱ {dish.prep_time_minutes + dish.cook_time_minutes} min</span>
                              <span>🍽 {dish.servings} servings</span>
                              <span className={`diff-badge diff-${dish.difficulty_level}`}>{dish.difficulty_level}</span>
                            </div>
                            <div style={{marginTop:"0.5rem"}}>
                              {dish.dietary_tags.slice(0,2).map((t,j) => <span key={j} className="diet-tag">{t}</span>)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}



      {/* PUNJAB CUISINE PAGE */}
      {punjabPage && (
        <div className="indian-page">
          <div className="indian-header">
            <button className="indian-back" onClick={() => setPunjabPage(false)}>← Back</button>
            <button onClick={() => { setPunjabGuidePage(true); setPunjabPage(false); window.scrollTo({top:0,behavior:"smooth"}); }} style={{background:"rgba(74,124,89,0.15)",border:"1px solid #4A7C59",color:"#4A7C59",padding:"0.4rem 1rem",borderRadius:"20px",cursor:"pointer",fontSize:"0.8rem",fontWeight:600}}>📖 Cuisine Guide</button>
            <h1>🌾 Punjab <em>Cuisine</em></h1>
            <input className="indian-search" placeholder="Search dishes..." value={punjabSearch} onChange={e => setPunjabSearch(e.target.value)} />
          </div>
          <div className="indian-content">
            {(() => {
              const filtered = punjabCuisineData.filter(d => {
                const matchCat = punjabCategory === "All" || d.category === punjabCategory;
                const matchSearch = !punjabSearch || d.dish_name.toLowerCase().includes(punjabSearch.toLowerCase()) || d.tags.some(t => t.toLowerCase().includes(punjabSearch.toLowerCase()));
                return matchCat && matchSearch;
              });
              const emojis = {"Appetizers":"🥟","Soups":"🍜","Main Courses":"🍛","Breads":"🫓","Rice Preparations":"🍚","Desserts":"🍮","Tea":"🍵","Coffee":"☕","Salads":"🥗","Sides":"🫙"};
              const gradients = {"Appetizers":"#E8621A, #C9922A","Soups":"#4A7C59, #2E7D32","Main Courses":"#C0392B, #E8621A","Breads":"#C9922A, #8B4513","Rice Preparations":"#4A7C59, #C9922A","Desserts":"#9B59B6, #E8621A","Tea":"#1a6b3c, #2E7D32","Coffee":"#4a2c0a, #8B4513","Salads":"#2E7D32, #4A7C59","Sides":"#C9922A, #E8621A"};
              return (
                <>
                  <div className="indian-cats">
                    {["All","Soups","Appetizers","Salads","Main Courses","Breads","Rice Preparations","Desserts","Tea","Coffee","Sides"].map(cat => (
                      <button key={cat} className={`cat-pill${punjabCategory === cat ? " active" : ""}`} onClick={() => setPunjabCategory(cat)}>{cat}</button>
                    ))}
                  </div>
                  {filtered.length === 0 ? (
                    <div className="indian-empty">🔍 No dishes found. Try a different search!</div>
                  ) : (
                    <div className="indian-grid">
                      {filtered.map((dish, i) => (
                        <div key={i} className="indian-card" onClick={() => setPunjabModal(dish)}>
                          <div className="indian-card-img" style={{padding:0,overflow:"hidden",background:"#f5f0ea"}}>
                            {dish.img ? (
                              <img src={dish.img} alt={dish.dish_name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover"}}
                                onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
                            ) : null}
                            <div style={{display:dish.img?"none":"flex",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",flexDirection:"column",background:`linear-gradient(135deg, ${gradients[dish.category]||"#4A7C59, #2E7D32"})`}}>
                              <span style={{fontSize:"2.5rem"}}>{emojis[dish.category]||"🍽"}</span>
                              <span style={{fontSize:"0.65rem",color:"white",marginTop:"0.3rem",textAlign:"center",padding:"0 0.5rem",fontWeight:600}}>{dish.dish_name}</span>
                            </div>
                          </div>
                          <div className="indian-card-body">
                            <div className="indian-cat-badge">{dish.category}</div>
                            <h3>{dish.dish_name}</h3>
                            <p style={{fontSize:"0.78rem",color:"var(--text-muted)",marginTop:"0.3rem",lineHeight:"1.4"}}>{dish.short_description ? dish.short_description.substring(0,80)+"..." : ""}</p>
                            <div className="indian-card-meta">
                              <span>⏱ {dish.prep_time_minutes + dish.cook_time_minutes} min</span>
                              <span className={`diff-badge diff-${dish.difficulty_level.toLowerCase()}`}>{dish.difficulty_level}</span>
                            </div>
                            <div style={{marginTop:"0.5rem"}}>
                              {dish.tags.slice(0,2).map((t,j) => <span key={j} className="diet-tag">{t}</span>)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* PUNJAB DISH MODAL */}
          {punjabModal && (
            <div className="modal-overlay" onClick={() => setPunjabModal(null)}>
              <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setPunjabModal(null)}>✕</button>
                <div className="modal">
                  <div style={{height:"260px",overflow:"hidden",position:"relative",background:"#f5f0ea"}}>
                    {punjabModal.img ? (
                      <img src={punjabModal.img} alt={punjabModal.dish_name} style={{width:"100%",height:"100%",objectFit:"cover"}}
                        onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
                    ) : null}
                    <div style={{display:"none",background:"linear-gradient(135deg,#4A7C59,#2E7D32)",height:"260px",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"0.5rem"}}>
                      <span style={{fontSize:"5rem"}}>{{"Appetizers":"🥟","Soups":"🍜","Main Courses":"🍛","Breads":"🫓","Rice Preparations":"🍚","Desserts":"🍮","Tea":"🍵","Coffee":"☕","Salads":"🥗","Sides":"🫙"}[punjabModal.category]||"🍽"}</span>
                      <span style={{color:"white",fontWeight:700,fontSize:"1rem"}}>{punjabModal.dish_name}</span>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="indian-cat-badge">{punjabModal.category}</div>
                    <h2>{punjabModal.dish_name}</h2>
                    <p style={{fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:"1.7",marginBottom:"1rem"}}>{punjabModal.short_description}</p>
                    <div className="modal-meta">
                      <span>⏱ Prep: {punjabModal.prep_time_minutes} min</span>
                      <span>🔥 Cook: {punjabModal.cook_time_minutes} min</span>
                      <span className={`diff-badge diff-${punjabModal.difficulty_level.toLowerCase()}`}>{punjabModal.difficulty_level}</span>
                    </div>
                    <div style={{marginTop:"0.6rem"}}>
                      {punjabModal.tags.map((t,i) => <span key={i} className="diet-tag">{t}</span>)}
                    </div>
                    <div className="modal-section-title">Ingredients</div>
                    <ul className="modal-ingredients">
                      {punjabModal.ingredients.map((ing,i) => <li key={i}>{ing.quantity} {ing.unit} {ing.name}</li>)}
                    </ul>
                    <div className="modal-section-title">Instructions</div>
                    <ol className="indian-modal-steps">
                      {punjabModal.preparation_steps.map((step,i) => <li key={i}>{step}</li>)}
                    </ol>
                    {punjabModal.chef_notes && (<><div className="modal-section-title">👨‍🍳 Chef Notes</div><p style={{fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:"1.7",background:"var(--cream)",padding:"0.8rem",borderRadius:"8px"}}>{punjabModal.chef_notes}</p></>)}
                    {punjabModal.serving_suggestions && (<><div className="modal-section-title">🍽 Serving Suggestions</div><p style={{fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:"1.7"}}>{punjabModal.serving_suggestions}</p></>)}
                    {punjabModal.nutrition_estimate && (
                      <><div className="modal-section-title">Nutrition Estimate</div>
                      <div className="nutrition-grid">
                        {Object.entries(punjabModal.nutrition_estimate).map(([k,v]) => (
                          <div key={k} className="nutrition-box"><strong>{v}</strong><span>{k.replace(/_/g," ")}</span></div>
                        ))}
                      </div></>
                    )}
                    <div style={{marginTop:"1rem"}}>
                      <div className="modal-section-title">🔍 SEO Keywords</div>
                      <div>{punjabModal.seo_keywords && punjabModal.seo_keywords.map((k,i) => <span key={i} className="flavor-tag">{k}</span>)}</div>
                    </div>
                    <div style={{marginTop:"1.2rem"}}>
                      <button className="btn-ask-chef" onClick={() => { setPunjabModal(null); setPunjabPage(false); setTimeout(() => scrollToSection("ai-chef"), 300); }}>
                        ✨ Ask AI Chef about this dish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PUNJAB CUISINE GUIDE PAGE */}
      {punjabGuidePage && (
        <div style={{minHeight:"100vh",background:"#FFF8EE",fontFamily:"'DM Sans', sans-serif"}}>
          <div style={{position:"relative",padding:"5rem 2rem 4rem",textAlign:"center",overflow:"hidden",minHeight:"420px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <img src="/images/india/punjab/punjab-cuisine-banner.jpg" alt="Traditional Punjabi cuisine spread with butter chicken, sarson da saag, makki di roti and lassi"
              style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0}}
              onError={e => e.target.style.display="none"} />
            <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(135deg,rgba(28,28,28,0.85) 0%,rgba(0,40,0,0.75) 50%,rgba(74,124,89,0.6) 100%)",zIndex:1}}></div>
            <div style={{position:"relative",zIndex:2,textAlign:"center"}}>
              <button onClick={() => { setPunjabGuidePage(false); setPunjabPage(true); window.scrollTo({top:0,behavior:"smooth"}); }} style={{position:"absolute",top:"-3rem",left:0,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"white",padding:"0.5rem 1rem",borderRadius:"20px",cursor:"pointer",fontSize:"0.85rem"}}>← Back</button>
              <span style={{background:"rgba(74,124,89,0.4)",color:"#90EE90",padding:"0.3rem 1rem",borderRadius:"20px",fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>Culinary Guide</span>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.5rem,6vw,4.5rem)",color:"white",margin:"1rem 0 0.5rem",lineHeight:1.1}}>Punjabi <em style={{color:"#90EE90"}}>Cuisine</em></h1>
              <p style={{color:"rgba(255,255,255,0.7)",fontSize:"1.1rem",maxWidth:"600px",margin:"0 auto",lineHeight:1.7}}>Where Every Meal Tells a Story of Abundance, Spirit & Fire</p>
            </div>
          </div>

          <div style={{maxWidth:"900px",margin:"0 auto",padding:"3rem 1.5rem"}}>
            <section style={{marginBottom:"3rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1rem"}}>
                <span style={{fontSize:"1.8rem"}}>🌾</span>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",color:"#1C1C1C",margin:0}}>Introduction</h2>
              </div>
              <div style={{width:"60px",height:"3px",background:"linear-gradient(90deg,#4A7C59,#2E7D32)",borderRadius:"2px",marginBottom:"1.5rem"}}></div>
              <p style={{fontSize:"1.05rem",lineHeight:1.9,color:"#444",background:"white",padding:"1.8rem",borderRadius:"16px",borderLeft:"4px solid #4A7C59",boxShadow:"0 4px 20px rgba(0,0,0,0.06)"}}>
                Punjabi cuisine is one of the world's most recognized and celebrated regional food traditions — a bold, abundant and deeply satisfying cooking style born in the fertile plains of the Punjab, the granary of India. Shaped by five rivers, the agricultural heritage of Jat farming communities, the spiritual generosity of the Sikh faith and the historical crossroads of the Silk Road, Punjabi food is generous in spirit, big in flavor and utterly honest in character. From the smoky grandeur of Tandoori Chicken to the winter soul food of Sarson Da Saag, from the street-food genius of Chole Bhature to the royal indulgence of Murgh Makhani — Punjabi cuisine speaks a universal language of nourishment and celebration that has crossed every ocean to become India's most globally beloved regional food.
              </p>
            </section>

            <section style={{marginBottom:"3rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1rem"}}>
                <span style={{fontSize:"1.8rem"}}>🗺️</span>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",color:"#1C1C1C",margin:0}}>Regional Highlights</h2>
              </div>
              <div style={{width:"60px",height:"3px",background:"linear-gradient(90deg,#4A7C59,#2E7D32)",borderRadius:"2px",marginBottom:"1.5rem"}}></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(380px,1fr))",gap:"1.2rem"}}>
                {[
                  {region:"🏛️ Amritsar",color:"#8a6a1a",bg:"#f8f2e8",desc:"The spiritual and culinary heart of Punjab. Home to the legendary Amritsari Machhi, Kulcha-Chole and Langar Di Dal of the Golden Temple — dishes of extraordinary flavor and spiritual significance."},
                  {region:"🌾 Rural Punjab",color:"#4A7C59",bg:"#e8f5ed",desc:"Sarson Da Saag with Makki Di Roti, Maah Ki Dal, Pinni and Atte Ka Halwa — the honest, sustaining food of farmers that forms the soul of Punjabi cooking."},
                  {region:"🏙️ Ludhiana / Chandigarh",color:"#1a5c8a",bg:"#e8f0f8",desc:"Urban Punjab's vibrant food scene brings Dhaba culture to the city — bold Rajma Chawal, Kadhi Pakora, Butter Naan and the legendary Punjabi breakfast of Aloo Paratha."},
                  {region:"🌉 Pindi / Lahori Heritage",color:"#8a1a1a",bg:"#f8e8e8",desc:"The culinary legacy of undivided Punjab — Pindi Chole, Lahori Salad and Gol Gappe carry the flavors of a shared cultural heritage that transcends borders."},
                ].map((r,i) => (
                  <div key={i} style={{background:r.bg,padding:"1.5rem",borderRadius:"16px",borderLeft:`4px solid ${r.color}`}}>
                    <h3 style={{margin:"0 0 0.6rem",color:r.color,fontSize:"1.1rem",fontWeight:700}}>{r.region}</h3>
                    <p style={{margin:0,fontSize:"0.88rem",color:"#444",lineHeight:1.8}}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section style={{marginBottom:"3rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1rem"}}>
                <span style={{fontSize:"1.8rem"}}>📖</span>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",color:"#1C1C1C",margin:0}}>Recipe Categories</h2>
              </div>
              <div style={{width:"60px",height:"3px",background:"linear-gradient(90deg,#4A7C59,#2E7D32)",borderRadius:"2px",marginBottom:"1.5rem"}}></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"1rem"}}>
                {[
                  {emoji:"🍜",cat:"Soups",desc:"From the sacred Langar Di Dal to the smoky Tamatar Shorba — warming, nourishing Punjabi broths."},
                  {emoji:"🥟",cat:"Appetizers",desc:"Tandoori Chicken, Amritsari Machhi, Gol Gappe — Punjab's bold, theatrical starters."},
                  {emoji:"🥗",cat:"Salads",desc:"Crispy Kachumber, tangy Pyaz Sirka and protein-rich Chana Chaat."},
                  {emoji:"🍛",cat:"Main Courses",desc:"Butter Chicken, Sarson Da Saag, Chole Bhature — dishes that define Indian cuisine globally."},
                  {emoji:"🫓",cat:"Breads",desc:"Makki Di Roti, Butter Naan, Amritsari Kulcha — legendary breads from the tandoor and tawa."},
                  {emoji:"🍚",cat:"Rice Preparations",desc:"Jeera Rice, Punjabi Biryani and fragrant Meetha Chawal for every occasion."},
                  {emoji:"🍮",cat:"Desserts",desc:"Gajar Ka Halwa, Gulab Jamun, Kulfi — Punjab's legendary festival sweets."},
                  {emoji:"🍵",cat:"Tea",desc:"Masala Chai, Noon Chai, Tandoori Chai — the theatrical teas of Punjab."},
                  {emoji:"☕",cat:"Coffee",desc:"Lassi, Thandai and Amritsari Coffee — Punjab's rich drinking culture."},
                  {emoji:"🫙",cat:"Sides",desc:"Pudina Chutney, Imli Chutney, Boondi Raita — essential Punjabi condiments."},
                ].map((c,i) => (
                  <div key={i} style={{background:"white",padding:"1.3rem",borderRadius:"12px",boxShadow:"0 4px 15px rgba(0,0,0,0.06)",cursor:"pointer",transition:"transform 0.2s"}}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
                    onClick={() => { setPunjabGuidePage(false); setPunjabPage(true); setPunjabCategory(c.cat); window.scrollTo({top:0,behavior:"smooth"}); }}>
                    <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>{c.emoji}</div>
                    <h4 style={{margin:"0 0 0.4rem",color:"#4A7C59",fontSize:"1rem",fontWeight:700}}>{c.cat}</h4>
                    <p style={{margin:0,fontSize:"0.82rem",color:"#666",lineHeight:1.6}}>{c.desc}</p>
                    <div style={{marginTop:"0.8rem",fontSize:"0.75rem",color:"#4A7C59",fontWeight:600}}>Explore recipes →</div>
                  </div>
                ))}
              </div>
            </section>

            <div style={{background:"linear-gradient(135deg,#4A7C59,#2E7D32)",borderRadius:"20px",padding:"2.5rem",textAlign:"center",color:"white"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.8rem",margin:"0 0 0.8rem"}}>Ready to Cook Punjabi? 🌾</h3>
              <p style={{margin:"0 0 1.5rem",opacity:0.9,fontSize:"1rem"}}>Explore 66 authentic recipes with step-by-step instructions, chef notes and nutrition information.</p>
              <button onClick={() => { setPunjabGuidePage(false); setPunjabPage(true); window.scrollTo({top:0,behavior:"smooth"}); }} style={{background:"white",color:"#4A7C59",border:"none",padding:"0.9rem 2.5rem",borderRadius:"30px",fontSize:"1rem",fontWeight:700,cursor:"pointer"}}>
                Browse All Recipes →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAHARASHTRA CUISINE GUIDE PAGE */}
      {maharashtraGuidePage && (
        <div style={{minHeight:"100vh", background:"#FFF8EE", fontFamily:"'DM Sans', sans-serif"}}>
          {/* Hero */}
          <div style={{position:"relative", padding:"5rem 2rem 4rem", textAlign:"center", overflow:"hidden", minHeight:"420px", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <img src="/images/india/maharashtra/maharashtrian-cuisine-banner.jpg" alt="Traditional Maharashtrian cuisine thali spread with vada pav, modak, bhakri and various curries" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0}} />
            <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(135deg, rgba(28,28,28,0.85) 0%, rgba(45,26,0,0.75) 50%, rgba(232,98,26,0.6) 100%)",zIndex:1}}></div>
            <button onClick={() => setMaharashtraGuidePage(false)} style={{position:"absolute",top:"1.5rem",left:"1.5rem",background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"white",padding:"0.5rem 1rem",borderRadius:"20px",cursor:"pointer",fontSize:"0.85rem"}}>← Back</button>
            <div style={{position:"relative",zIndex:1}}>
              <span style={{background:"rgba(232,98,26,0.3)",color:"#ffb347",padding:"0.3rem 1rem",borderRadius:"20px",fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>Culinary Guide</span>
              <h1 style={{fontFamily:"'Playfair Display', serif",fontSize:"clamp(2.5rem,6vw,4.5rem)",color:"white",margin:"1rem 0 0.5rem",lineHeight:1.1}}>Maharashtrian <em style={{color:"#E8621A"}}>Cuisine</em></h1>
              <p style={{color:"rgba(255,255,255,0.7)",fontSize:"1.1rem",maxWidth:"600px",margin:"0 auto",lineHeight:1.7}}>Where Every Meal Tells a Story of Culture, Tradition & Flavor</p>
            </div>
          </div>

          <div style={{maxWidth:"900px",margin:"0 auto",padding:"3rem 1.5rem"}}>

            {/* Introduction */}
            <section style={{marginBottom:"3rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1rem"}}>
                <span style={{fontSize:"1.8rem"}}>🌾</span>
                <h2 style={{fontFamily:"'Playfair Display', serif",fontSize:"2rem",color:"#1C1C1C",margin:0}}>Introduction</h2>
              </div>
              <div style={{width:"60px",height:"3px",background:"linear-gradient(90deg,#E8621A,#C9922A)",borderRadius:"2px",marginBottom:"1.5rem"}}></div>
              <p style={{fontSize:"1.05rem",lineHeight:1.9,color:"#444",background:"white",padding:"1.8rem",borderRadius:"16px",borderLeft:"4px solid #E8621A",boxShadow:"0 4px 20px rgba(0,0,0,0.06)"}}>
                Maharashtrian cuisine is one of India's most diverse and deeply rooted culinary traditions, shaped by the vast geography, rich history, and vibrant culture of Maharashtra — India's third-largest state. Stretching from the lush Konkan coastline to the rugged Deccan plateau and the expansive Vidarbha plains, the cuisine of Maharashtra is a magnificent tapestry of flavors, textures, and aromas. It is a cuisine of contrasts — bold yet subtle, fiery yet balanced, rustic yet refined. From the iconic Vada Pav of Mumbai's bustling streets to the ceremonial sweetness of Puran Poli served at festivals, Maharashtrian food is deeply intertwined with the everyday life and celebrations of its people. Characterized by the masterful use of local spices like goda masala, the tartness of kokum, the earthiness of peanuts, and the sweetness of jaggery, this cuisine offers a uniquely satisfying culinary experience that is wholesome, flavorful, and soulful at its core.
              </p>
            </section>

            {/* History */}
            <section style={{marginBottom:"3rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1rem"}}>
                <span style={{fontSize:"1.8rem"}}>📜</span>
                <h2 style={{fontFamily:"'Playfair Display', serif",fontSize:"2rem",color:"#1C1C1C",margin:0}}>History & Heritage</h2>
              </div>
              <div style={{width:"60px",height:"3px",background:"linear-gradient(90deg,#E8621A,#C9922A)",borderRadius:"2px",marginBottom:"1.5rem"}}></div>
              <p style={{fontSize:"1.05rem",lineHeight:1.9,color:"#444",background:"white",padding:"1.8rem",borderRadius:"16px",boxShadow:"0 4px 20px rgba(0,0,0,0.06)"}}>
                The culinary heritage of Maharashtra spans thousands of years, influenced by ancient trade routes, royal kitchens, and agricultural practices deeply rooted in the land. The Maratha Empire under Chhatrapati Shivaji Maharaj played a pivotal role in establishing a distinct Maharashtrian identity, and this pride extended naturally to its food culture. The fertile black soil of the Deccan plateau gave rise to sorghum (jowar), pearl millet (bajra), and lentils as staple crops, while the Konkan coast — blessed with coconut palms, kokum trees, and abundant seafood — developed an entirely different coastal cuisine. The influence of the Brahmin, Marathwada, and Varhadi communities added layers of vegetarian refinement, while the warrior communities of Kolhapur contributed their legendary fiery meat preparations. Colonial trade brought new vegetables like potatoes and tomatoes, which were seamlessly absorbed into local recipes, creating beloved dishes like Vada Pav and Pav Bhaji that are now synonymous with Mumbai's identity.
              </p>
            </section>

            {/* Key Ingredients */}
            <section style={{marginBottom:"3rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1rem"}}>
                <span style={{fontSize:"1.8rem"}}>🌿</span>
                <h2 style={{fontFamily:"'Playfair Display', serif",fontSize:"2rem",color:"#1C1C1C",margin:0}}>Key Ingredients</h2>
              </div>
              <div style={{width:"60px",height:"3px",background:"linear-gradient(90deg,#E8621A,#C9922A)",borderRadius:"2px",marginBottom:"1.5rem"}}></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:"1rem"}}>
                {[
                  {emoji:"🌶️", name:"Goda Masala", desc:"Maharashtra's signature spice blend of 20+ ingredients including stone flower, giving dishes their unique sweet-spiced aroma."},
                  {emoji:"🍋", name:"Kokum", desc:"A dried purple fruit from the Konkan coast, used as a souring agent in curries and cooling summer drinks like Sol Kadhi."},
                  {emoji:"🥜", name:"Peanuts", desc:"The backbone of Maharashtrian cooking — roasted peanuts appear in chutneys, curries, rice dishes and salads across the state."},
                  {emoji:"🥥", name:"Coconut", desc:"Fresh, dried and as milk — coconut is indispensable in Konkan cuisine, adding richness and sweetness to curries and chutneys."},
                  {emoji:"🍯", name:"Jaggery", desc:"Unrefined cane sugar that brings a distinctive sweetness to dals, chutneys and sweets, balancing the heat of spices."},
                  {emoji:"🌱", name:"Curry Leaves", desc:"A fragrant tempering essential that imparts an unmistakable aroma to almost every Maharashtrian dish."},
                  {emoji:"🫘", name:"Lentils & Legumes", desc:"Toor dal, chana dal, matki and moong form the protein foundation of the Maharashtrian vegetarian diet."},
                  {emoji:"🌾", name:"Jowar & Bajra", desc:"Sorghum and pearl millet are the traditional grains of rural Maharashtra, used to make the beloved nutritious bhakri."},
                ].map((ing,i) => (
                  <div key={i} style={{background:"white",padding:"1.2rem",borderRadius:"12px",boxShadow:"0 4px 15px rgba(0,0,0,0.06)",display:"flex",gap:"0.8rem",alignItems:"flex-start"}}>
                    <span style={{fontSize:"1.8rem",flexShrink:0}}>{ing.emoji}</span>
                    <div>
                      <h4 style={{margin:"0 0 0.3rem",color:"#1C1C1C",fontSize:"0.95rem",fontWeight:700}}>{ing.name}</h4>
                      <p style={{margin:0,fontSize:"0.82rem",color:"#666",lineHeight:1.6}}>{ing.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Regional Variations */}
            <section style={{marginBottom:"3rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1rem"}}>
                <span style={{fontSize:"1.8rem"}}>🗺️</span>
                <h2 style={{fontFamily:"'Playfair Display', serif",fontSize:"2rem",color:"#1C1C1C",margin:0}}>Regional Variations</h2>
              </div>
              <div style={{width:"60px",height:"3px",background:"linear-gradient(90deg,#E8621A,#C9922A)",borderRadius:"2px",marginBottom:"1.5rem"}}></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(400px, 1fr))",gap:"1.2rem"}}>
                {[
                  {region:"🌊 Konkan Cuisine",color:"#1a6b8a",bg:"#e8f4f8",desc:"The coastal strip of Maharashtra produces India's most distinctive seafood cuisine. Featuring coconut milk, kokum, and Malvani masala, Konkan cooking is rich, tangy and aromatic. Signature dishes include Kombdi Vade, Sol Kadhi, Amboli and Ghavan."},
                  {region:"🔥 Kolhapuri Cuisine",color:"#8a1a1a",bg:"#f8e8e8",desc:"Kolhapur is Maharashtra's culinary capital for spice lovers. The legendary Kolhapuri masala — ground fresh from 25+ spices — creates dishes of extraordinary heat and complexity. Chicken Kolhapuri, Mutton Rassa and Tambda Rassa are its crown jewels."},
                  {region:"🏙️ Pune / Desh Cuisine",color:"#4A7C59",bg:"#e8f5ed",desc:"The cuisine of Pune and the Deccan plateau is characterized by a perfect sweet-sour-spicy balance using goda masala and tamarind-jaggery combinations. Bharli Vangi, Aamti Dal and the festival foods of Puran Poli and Masala Bhaat define this region."},
                  {region:"🌅 Vidarbha Cuisine",color:"#8a6a1a",bg:"#f8f2e8",desc:"The eastern Vidarbha region is known for its bold flavors and liberal use of sesame seeds, poppy seeds and dried coconut. Saoji cuisine — named after the weaver community — produces some of India's most intensely spiced mutton and chicken preparations."},
                ].map((r,i) => (
                  <div key={i} style={{background:r.bg,padding:"1.5rem",borderRadius:"16px",borderLeft:`4px solid ${r.color}`}}>
                    <h3 style={{margin:"0 0 0.6rem",color:r.color,fontSize:"1.1rem",fontWeight:700}}>{r.region}</h3>
                    <p style={{margin:0,fontSize:"0.88rem",color:"#444",lineHeight:1.8}}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Thali Structure */}
            <section style={{marginBottom:"3rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1rem"}}>
                <span style={{fontSize:"1.8rem"}}>🍽️</span>
                <h2 style={{fontFamily:"'Playfair Display', serif",fontSize:"2rem",color:"#1C1C1C",margin:0}}>The Maharashtrian Thali</h2>
              </div>
              <div style={{width:"60px",height:"3px",background:"linear-gradient(90deg,#E8621A,#C9922A)",borderRadius:"2px",marginBottom:"1.5rem"}}></div>
              <div style={{background:"white",padding:"2rem",borderRadius:"16px",boxShadow:"0 4px 20px rgba(0,0,0,0.06)"}}>
                <p style={{fontSize:"1.05rem",lineHeight:1.9,color:"#444",marginTop:0}}>A traditional Maharashtrian thali is a beautifully balanced complete meal served on a large steel plate or banana leaf. Each element has a specific role and position, reflecting centuries of nutritional wisdom.</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:"0.8rem",marginTop:"1.2rem"}}>
                  {[
                    {item:"🍚 Bhaat",desc:"Steamed rice — the centerpiece"},
                    {item:"🥣 Varan/Aamti",desc:"Toor dal — thin and comforting"},
                    {item:"🥬 Bhaji",desc:"Seasonal vegetable dry preparation"},
                    {item:"🫓 Bhakri/Poli",desc:"Flatbread — jowar or wheat"},
                    {item:"🥗 Koshimbir",desc:"Fresh raw salad with coconut"},
                    {item:"🫙 Loncha",desc:"Pickle — sweet, sour or spicy"},
                    {item:"🍮 Dessert",desc:"Shrikhand, kheer or modak"},
                    {item:"🥛 Taak",desc:"Buttermilk — the digestive finale"},
                  ].map((t,i) => (
                    <div key={i} style={{background:"#FFF8EE",padding:"0.8rem 1rem",borderRadius:"10px",border:"1px solid #f0e0cc"}}>
                      <div style={{fontWeight:700,fontSize:"0.9rem",color:"#1C1C1C"}}>{t.item}</div>
                      <div style={{fontSize:"0.78rem",color:"#888",marginTop:"0.2rem"}}>{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Recipe Categories */}
            <section style={{marginBottom:"3rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1rem"}}>
                <span style={{fontSize:"1.8rem"}}>📖</span>
                <h2 style={{fontFamily:"'Playfair Display', serif",fontSize:"2rem",color:"#1C1C1C",margin:0}}>Recipe Categories</h2>
              </div>
              <div style={{width:"60px",height:"3px",background:"linear-gradient(90deg,#E8621A,#C9922A)",borderRadius:"2px",marginBottom:"1.5rem"}}></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:"1rem"}}>
                {[
                  {emoji:"🍜",cat:"Soups",desc:"From the soul-warming Katachi Amti to the cooling Kokum Saar, Maharashtrian soups are light, spiced broths that set the tone for every meal."},
                  {emoji:"🥟",cat:"Appetizers",desc:"Street food legends like Vada Pav and Misal Pav sit alongside monsoon classics like Kanda Bhaji and festive Chakli."},
                  {emoji:"🥗",cat:"Salads",desc:"The koshimbir tradition celebrates raw vegetables dressed simply with coconut, lemon and peanuts — fresh, crunchy and vibrant."},
                  {emoji:"🍛",cat:"Main Courses",desc:"The heart of Maharashtrian cooking — bold curries like Chicken Kolhapuri, smoky Vangyache Bharit and the legendary Kombdi Vade."},
                  {emoji:"🫓",cat:"Breads",desc:"From the rustic Jowar Bhakri to the festive sweetness of Puran Poli, Maharashtrian breads are an art form in themselves."},
                  {emoji:"🍚",cat:"Rice Preparations",desc:"Fragrant Masala Bhaat, celebratory Narali Bhaat and the everyday comfort of Varan Bhaat represent rice in all its glory."},
                  {emoji:"🍮",cat:"Desserts",desc:"Silky Shrikhand, divine Ukadiche Modak and creamy Basundi — Maharashtrian sweets are festive, indulgent and deeply satisfying."},
                  {emoji:"🍵",cat:"Tea",desc:"From the iconic Mumbai Cutting Chai to healing Masala Kadha and the cooling Kokum Sharbat — beverages are a ritual here."},
                  {emoji:"☕",cat:"Coffee",desc:"Pune's Irani cafe culture, Nagpur's filter coffee tradition and the indulgent Nashik Cold Coffee celebrate coffee Maharashtra's way."},
                  {emoji:"🫙",cat:"Sides",desc:"The condiment table of Maharashtra — fiery Thecha, smoky Dry Garlic Chutney, tangy pickles and the essential Goda Masala."},
                ].map((c,i) => (
                  <div key={i} style={{background:"white",padding:"1.3rem",borderRadius:"12px",boxShadow:"0 4px 15px rgba(0,0,0,0.06)",cursor:"pointer",transition:"transform 0.2s"}}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
                    onClick={() => { setMaharashtraGuidePage(false); setMaharashtraPage(true); setMaharashtraCategory(c.cat); }}>
                    <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>{c.emoji}</div>
                    <h4 style={{margin:"0 0 0.4rem",color:"#E8621A",fontSize:"1rem",fontWeight:700}}>{c.cat}</h4>
                    <p style={{margin:0,fontSize:"0.82rem",color:"#666",lineHeight:1.6}}>{c.desc}</p>
                    <div style={{marginTop:"0.8rem",fontSize:"0.75rem",color:"#E8621A",fontWeight:600}}>Explore recipes →</div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div style={{background:"linear-gradient(135deg,#E8621A,#C9922A)",borderRadius:"20px",padding:"2.5rem",textAlign:"center",color:"white"}}>
              <h3 style={{fontFamily:"'Playfair Display', serif",fontSize:"1.8rem",margin:"0 0 0.8rem"}}>Ready to Cook Maharashtrian? 🍊</h3>
              <p style={{margin:"0 0 1.5rem",opacity:0.9,fontSize:"1rem"}}>Explore 77 authentic recipes with step-by-step instructions, chef notes and nutrition information.</p>
              <button onClick={() => { setMaharashtraGuidePage(false); setMaharashtraPage(true); }} style={{background:"white",color:"#E8621A",border:"none",padding:"0.9rem 2.5rem",borderRadius:"30px",fontSize:"1rem",fontWeight:700,cursor:"pointer"}}>
                Browse All Recipes →
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MAHARASHTRA CUISINE PAGE */}
      {maharashtraPage && (
        <div className="indian-page">
          <div className="indian-header">
            <button className="indian-back" onClick={() => setMaharashtraPage(false)}>← Back</button>
            <button onClick={() => { setMaharashtraGuidePage(true); setMaharashtraPage(false); window.scrollTo({top:0, behavior:"smooth"}); }} style={{background:"rgba(232,98,26,0.15)",border:"1px solid #E8621A",color:"#E8621A",padding:"0.4rem 1rem",borderRadius:"20px",cursor:"pointer",fontSize:"0.8rem",fontWeight:600}}>📖 Cuisine Guide</button>
            <h1>🍊 Maharashtra <em>Cuisine</em></h1>
            <input className="indian-search" placeholder="Search dishes..." value={maharashtraSearch} onChange={e => setMaharashtraSearch(e.target.value)} />
          </div>
          <div className="indian-content">
            <div className="indian-cats">
              {["All","Soups","Appetizers","Salads","Main Courses","Breads","Rice Preparations","Desserts","Tea","Coffee","Sides"].map(cat => (
                <button key={cat} className={`cat-pill${maharashtraCategory === cat ? " active" : ""}`} onClick={() => setMaharashtraCategory(cat)}>{cat}</button>
              ))}
            </div>
            {(() => {
              const filtered = maharashtraCuisineData.filter(d => {
                const matchCat = maharashtraCategory === "All" || d.category === maharashtraCategory;
                const matchSearch = !maharashtraSearch || d.dish_name.toLowerCase().includes(maharashtraSearch.toLowerCase()) || (d.flavor_profile && d.flavor_profile.some(f => f.toLowerCase().includes(maharashtraSearch.toLowerCase()))) || d.tags.some(t => t.toLowerCase().includes(maharashtraSearch.toLowerCase()));
                return matchCat && matchSearch;
              });
              const emojis = {"Appetizers":"🥟","Soups":"🍜","Main Courses":"🍛","Breads":"🫓","Rice Preparations":"🍚","Desserts":"🍮","Tea":"🍵","Coffee":"☕","Salads":"🥗","Sides":"🫙"};
              const gradients = {"Appetizers":"#E8621A, #C9922A","Soups":"#4A7C59, #2E7D32","Main Courses":"#C0392B, #E8621A","Breads":"#C9922A, #8B4513","Rice Preparations":"#4A7C59, #C9922A","Desserts":"#9B59B6, #E8621A","Tea":"#1a6b3c, #2E7D32","Coffee":"#4a2c0a, #8B4513","Salads":"#2E7D32, #4A7C59","Sides":"#C9922A, #E8621A"};
              return filtered.length === 0 ? (
                <div className="indian-empty">🔍 No dishes found. Try a different search!</div>
              ) : (
                <div className="indian-grid">
                  {filtered.map((dish, i) => (
                    <div key={i} className="indian-card" onClick={() => setMaharashtraModal(dish)}>
                      <div className="indian-card-img" style={{padding:0,overflow:"hidden",background:"#f5f0ea"}}>
                        {dish.img ? (
                          <img 
                            src={dish.img} 
                            alt={dish.dish_name} 
                            loading="lazy"
                            style={{width:"100%",height:"100%",objectFit:"cover"}}
                            onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
                          />
                        ) : null}
                        <div style={{display: dish.img ? "none" : "flex", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", flexDirection:"column", background:`linear-gradient(135deg, ${gradients[dish.category] || "#E8621A, #C9922A"})`}}>
                          <span style={{fontSize:"2.5rem"}}>{emojis[dish.category] || "🍽"}</span>
                          <span style={{fontSize:"0.65rem",color:"white",marginTop:"0.3rem",textAlign:"center",padding:"0 0.5rem",fontWeight:600}}>{dish.dish_name}</span>
                        </div>
                      </div>
                      <div className="indian-card-body">
                        <div className="indian-cat-badge">{dish.category}</div>
                        <h3>{dish.dish_name}</h3>
                        <p style={{fontSize:"0.78rem",color:"var(--text-muted)",marginTop:"0.3rem",lineHeight:"1.4"}}>{dish.short_description ? dish.short_description.substring(0,80)+"..." : ""}</p>
                        <div className="indian-card-meta">
                          <span>⏱ {dish.prep_time_minutes + dish.cook_time_minutes} min</span>
                          <span className={`diff-badge diff-${dish.difficulty_level.toLowerCase()}`}>{dish.difficulty_level}</span>
                        </div>
                        <div style={{marginTop:"0.5rem"}}>
                          {dish.tags.slice(0,2).map((t,j) => <span key={j} className="diet-tag">{t}</span>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* MAHARASHTRA DISH MODAL */}
          {maharashtraModal && (
            <div className="modal-overlay" onClick={() => setMaharashtraModal(null)}>
              <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setMaharashtraModal(null)}>✕</button>
                <div className="modal">
                  <div style={{height:"260px", overflow:"hidden", position:"relative", background:"#f5f0ea"}}>
                    {maharashtraModal.img ? (
                      <img 
                        src={maharashtraModal.img} 
                        alt={maharashtraModal.dish_name}
                        style={{width:"100%",height:"100%",objectFit:"cover"}}
                        onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
                      />
                    ) : null}
                    <div style={{display:"none", background:"linear-gradient(135deg,#E8621A,#C9922A)",height:"260px",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"0.5rem"}}>
                      <span style={{fontSize:"5rem"}}>{{"Appetizers":"🥟","Soups":"🍜","Main Courses":"🍛","Breads":"🫓","Rice Preparations":"🍚","Desserts":"🍮","Tea":"🍵","Coffee":"☕","Salads":"🥗","Sides":"🫙"}[maharashtraModal.category]||"🍽"}</span>
                      <span style={{color:"white",fontWeight:700,fontSize:"1rem"}}>{maharashtraModal.dish_name}</span>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="indian-cat-badge">{maharashtraModal.category}</div>
                    <h2>{maharashtraModal.dish_name}</h2>
                    <p style={{fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:"1.7",marginBottom:"1rem"}}>{maharashtraModal.short_description}</p>
                    <div className="modal-meta">
                      <span>⏱ Prep: {maharashtraModal.prep_time_minutes} min</span>
                      <span>🔥 Cook: {maharashtraModal.cook_time_minutes} min</span>
                      <span className={`diff-badge diff-${maharashtraModal.difficulty_level.toLowerCase()}`}>{maharashtraModal.difficulty_level}</span>
                    </div>
                    <div style={{marginTop:"0.6rem"}}>
                      {maharashtraModal.tags.map((t,i) => <span key={i} className="diet-tag">{t}</span>)}
                    </div>
                    <div className="modal-section-title">Ingredients</div>
                    <ul className="modal-ingredients">
                      {maharashtraModal.ingredients.map((ing, i) => <li key={i}>{ing.quantity} {ing.unit} {ing.name}</li>)}
                    </ul>
                    <div className="modal-section-title">Instructions</div>
                    <ol className="indian-modal-steps">
                      {maharashtraModal.preparation_steps.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                    {maharashtraModal.chef_notes && (<><div className="modal-section-title">👨‍🍳 Chef Notes</div><p style={{fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:"1.7",background:"var(--cream)",padding:"0.8rem",borderRadius:"8px"}}>{maharashtraModal.chef_notes}</p></>)}
                    {maharashtraModal.serving_suggestions && (<><div className="modal-section-title">🍽 Serving Suggestions</div><p style={{fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:"1.7"}}>{maharashtraModal.serving_suggestions}</p></>)}
                    {maharashtraModal.nutrition_estimate && (
                      <><div className="modal-section-title">Nutrition Estimate</div>
                      <div className="nutrition-grid">
                        {Object.entries(maharashtraModal.nutrition_estimate).map(([k,v]) => (
                          <div key={k} className="nutrition-box"><strong>{v}</strong><span>{k.replace(/_/g,' ')}</span></div>
                        ))}
                      </div></>
                    )}
                    <div style={{marginTop:"1rem"}}>
                      <div className="modal-section-title">🔍 SEO Keywords</div>
                      <div>{maharashtraModal.seo_keywords && maharashtraModal.seo_keywords.map((k,i) => <span key={i} className="flavor-tag">{k}</span>)}</div>
                    </div>
                    <div style={{marginTop:"1.2rem"}}>
                      <button className="btn-ask-chef" onClick={() => { setMaharashtraModal(null); setMaharashtraPage(false); setTimeout(() => { scrollToSection("ai-chef"); }, 300); }}>
                        ✨ Ask AI Chef about this dish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* INDIAN CUISINE PAGE */}
      {indianPage && (
        <div className="indian-page">
          <div className="indian-header">
            <button className="indian-back" onClick={() => setIndianPage(false)}>← Back</button>
            <h1>🇮🇳 Indian <em>Cuisine</em></h1>
            <input className="indian-search" placeholder="Search dishes..." value={indianSearch} onChange={e => setIndianSearch(e.target.value)} />
          </div>
          <div className="indian-content">
            <div style={{background:"rgba(232,98,26,0.08)",borderRadius:"12px",padding:"1rem 1.2rem",marginBottom:"1.5rem",display:"flex",alignItems:"center",gap:"1rem",flexWrap:"wrap"}}>
              <span style={{fontSize:"0.85rem",color:"var(--charcoal)",fontWeight:600}}>🗺️ Explore by State:</span>
              <button onClick={() => { setIndianPage(false); setMaharashtraPage(true); window.scrollTo({top:0,behavior:"smooth"}); }} style={{background:"var(--saffron)",color:"white",border:"none",borderRadius:"20px",padding:"0.4rem 1rem",fontSize:"0.8rem",fontWeight:600,cursor:"pointer"}}>🍊 Maharashtra</button>
              <button onClick={() => { setIndianPage(false); setPunjabPage(true); window.scrollTo({top:0,behavior:"smooth"}); }} style={{background:"#4A7C59",color:"white",border:"none",borderRadius:"20px",padding:"0.4rem 1rem",fontSize:"0.8rem",fontWeight:600,cursor:"pointer"}}>🌾 Punjab</button>
              <span style={{fontSize:"0.75rem",color:"var(--text-muted)"}}>More states coming soon...</span>
            </div>
            <div className="indian-cats">
              {["All", "Appetizers", "Soups", "Main Courses", "Breads", "Rice Preparations", "Desserts", "Beverages"].map(cat => (
                <button key={cat} className={`cat-pill${indianCategory === cat ? " active" : ""}`} onClick={() => setIndianCategory(cat)}>{cat}</button>
              ))}
            </div>
            {(() => {
              const filtered = indianCuisineData.filter(d => {
                const matchCat = indianCategory === "All" || d.category === indianCategory;
                const matchSearch = !indianSearch || d.dish_name.toLowerCase().includes(indianSearch.toLowerCase()) || d.flavor_profile.some(f => f.toLowerCase().includes(indianSearch.toLowerCase()));
                return matchCat && matchSearch;
              });
              const emojis = {"Appetizers":"🥟","Soups":"🍜","Main Courses":"🍛","Breads":"🫓","Rice Preparations":"🍚","Desserts":"🍮","Beverages":"☕"};
              return filtered.length === 0 ? (
                <div className="indian-empty">🔍 No dishes found. Try a different search!</div>
              ) : (
                <div className="indian-grid">
                  {filtered.map((dish, i) => (
                    <div key={i} className="indian-card" onClick={() => setIndianModal(dish)}>
                      <div className="indian-card-img" style={{padding:0,overflow:"hidden"}}>
                        {dish.img ? <img src={dish.img} alt={dish.dish_name} style={{width:"100%",height:"100%",objectFit:"cover"}} /> : <span>{emojis[dish.category] || "🍽"}</span>}
                      </div>
                      <div className="indian-card-body">
                        <div className="indian-cat-badge">{dish.category}</div>
                        <h3>{dish.dish_name}</h3>
                        <div className="indian-card-meta">
                          <span>⏱ {dish.prep_time_minutes + dish.cook_time_minutes} min</span>
                          <span>🍽 {dish.servings} servings</span>
                          <span className={`diff-badge diff-${dish.difficulty_level}`}>{dish.difficulty_level}</span>
                        </div>
                        <div style={{marginTop:"0.5rem"}}>
                          {dish.dietary_tags.map((t,j) => <span key={j} className="diet-tag">{t}</span>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* INDIAN DISH MODAL */}
          {indianModal && (
            <div className="modal-overlay" onClick={() => setIndianModal(null)}>
              <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setIndianModal(null)}>✕</button>
                <div className="modal">
                  <div style={{height:"240px", overflow:"hidden", position:"relative"}}>
                    {indianModal.img ? <img src={indianModal.img} alt={indianModal.dish_name} style={{width:"100%",height:"100%",objectFit:"cover"}} /> : <div style={{background:"linear-gradient(135deg,#E8621A,#C9922A)",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"5rem"}}>{{"Appetizers":"🥟","Soups":"🍜","Main Courses":"🍛","Breads":"🫓","Rice Preparations":"🍚","Desserts":"🍮","Beverages":"☕"}[indianModal.category]||"🍽"}</div>}
                  </div>
                  <div className="modal-body">
                    <div className="indian-cat-badge">{indianModal.category}</div>
                    <h2>{indianModal.dish_name}</h2>
                    <div className="modal-meta">
                      <span>⏱ Prep: {indianModal.prep_time_minutes} min</span>
                      <span>🔥 Cook: {indianModal.cook_time_minutes} min</span>
                      <span>🍽 {indianModal.servings} servings</span>
                      <span className={`diff-badge diff-${indianModal.difficulty_level}`}>{indianModal.difficulty_level}</span>
                    </div>
                    <div style={{marginTop:"0.6rem"}}>
                      {indianModal.dietary_tags.map((t,i) => <span key={i} className="diet-tag">{t}</span>)}
                    </div>
                    <div className="modal-section-title">Ingredients</div>
                    <ul className="modal-ingredients">
                      {indianModal.ingredients.map((ing, i) => <li key={i}>{ing.quantity} {ing.unit} {ing.name}</li>)}
                    </ul>
                    <div className="modal-section-title">Instructions</div>
                    <ol className="indian-modal-steps">
                      {indianModal.preparation_steps.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                    {indianModal.chef_notes && (<><div className="modal-section-title">👨‍🍳 Chef Notes</div><p style={{fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:"1.7",background:"var(--cream)",padding:"0.8rem",borderRadius:"8px"}}>{indianModal.chef_notes}</p></>)}
                    {indianModal.serving_suggestions && (<><div className="modal-section-title">🍽 Serving Suggestions</div><p style={{fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:"1.7"}}>{indianModal.serving_suggestions}</p></>)}
                    <div className="modal-section-title">Flavor Profile</div>
                    <div>{indianModal.flavor_profile.map((f,i) => <span key={i} className="flavor-tag">{f}</span>)}</div>
                    {indianModal.nutrition_estimate && Object.keys(indianModal.nutrition_estimate).length > 0 && (
                      <><div className="modal-section-title">Nutrition Estimate</div>
                      <div className="nutrition-grid">
                        {Object.entries(indianModal.nutrition_estimate).map(([k,v]) => (
                          <div key={k} className="nutrition-box"><strong>{v}</strong><span>{k.replace('_',' ')}</span></div>
                        ))}
                      </div></>
                    )}
                    <div style={{marginTop:"1.2rem"}}>
                      <button className="btn-ask-chef" onClick={() => { setIndianModal(null); setIndianPage(false); setTimeout(() => { scrollToSection("ai-chef"); sendMessage("Give me more tips for cooking " + indianModal.dish_name); }, 300); }}>
                        ✨ Ask AI Chef about this dish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SEARCH MODAL */}
      {searchModal && (
        <div className="modal-overlay" onClick={() => setSearchModal(false)}>
          <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSearchModal(false)}>✕</button>
            <div className="search-modal">
              <div className="search-modal-header">
                <h3>Results for "<em style={{color:"var(--saffron)"}}>{searchQuery}</em>"</h3>
                <span>{searchResults.length} found {searchLoading && "· AI generating more..."}</span>
              </div>
              {searchLoading && searchResults.length === 0 ? (
                <div className="search-loading"><div className="typing"><span/><span/><span/></div></div>
              ) : searchResults.length === 0 ? (
                <div className="search-empty">
                  <p style={{fontSize:"2rem"}}>🔍</p>
                  <p>No recipes found. Try a different search!</p>
                </div>
              ) : (
                <div className="search-results-grid">
                  {searchResults.map((r, i) => (
                    <div key={i} className="search-result-card" onClick={() => { setSearchModal(false); setRecipeModal(r); }}>
                      <div className="search-result-img"><img src={r.img} alt={r.title} onError={e => e.target.src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80"} /></div>
                      <div className="search-result-body">
                        <div className="recipe-chef">{r.chef} {r.isAI && <span className="ai-badge">✨ AI</span>}</div>
                        <h4>{r.title}</h4>
                        <div className="search-result-meta">⏱ {r.time} · {r.difficulty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>
          <span style={{fontSize:"1.5rem"}}>🍴</span>
          <span className="logo-text">FusionChef <span className="logo-ai">AI</span></span>
        </div>
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.label}><a onClick={() => scrollToSection(l.id)}>{l.label}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <input className="nav-search" placeholder="Search recipes..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} />
          <button className="btn-ai" onClick={() => scrollToSection("ai-chef")}>✨ Ask AI Chef</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-slides">
          {heroSlides.map((s, i) => (
            <div key={i} className={`hero-slide${i === slide ? " active" : ""}`} style={{ backgroundImage: `url(${s.bg})` }} />
          ))}
        </div>
        <div className="hero-overlay" />
        <div className="hero-content" key={slide}>
          <span className="hero-tag">{heroSlides[slide].tag}</span>
          <h1>{heroSlides[slide].title}</h1>
          <p>{heroSlides[slide].desc}</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollToSection("trending")}>Explore Recipes</button>
            <button className="btn-outline" onClick={() => scrollToSection("ai-chef")}>✨ Generate with AI</button>
          </div>
        </div>
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`hero-dot${i === slide ? " active" : ""}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </section>

      {/* AI CHEF */}
      <section className="ai-section" id="ai-chef">
        <div className="section-header">
          <div className="section-tag">✨ Powered by Anthropic</div>
          <h2 className="section-title">Your Personal <em style={{color:"var(--saffron-light)"}}>AI Chef</em></h2>
          <p className="section-sub">Tell me your ingredients, cravings, or dietary needs — I'll craft a custom recipe in seconds.</p>
        </div>
        <div className="ai-container">
          <div className="ai-chat-box">
            <div className="ai-chat-header">
              <div className="ai-chef-avatar">👨‍🍳</div>
              <div className="ai-chat-header-text">
                <h4>FusionChef AI</h4>
                <span>● Online · Powered by Claude</span>
              </div>
            </div>
            <div className="ai-messages">
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.role}`}>
                  {typeof m.content === "string"
                    ? m.content.split("\n").map((line, j) => <p key={j}>{line}</p>)
                    : m.content}
                </div>
              ))}
              {loading && <div className="msg ai"><div className="typing"><span/><span/><span/></div></div>}
              <div ref={messagesEndRef} />
            </div>
            <div className="ai-input-row">
              <input className="ai-input" placeholder="E.g. I have chicken, garlic, and spinach..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} />
              <button className="ai-send" onClick={() => sendMessage()}>➤</button>
            </div>
          </div>
          <div className="ai-chips">
            {chips.map(c => (
              <button key={c} className="ai-chip" onClick={() => sendMessage(c)}>💬 {c}</button>
            ))}
          </div>
        </div>
      </section>



      {/* WORLD CUISINES */}
      <section className="section categories-section" id="categories">
        <div className="section-header">
          <div className="section-tag">🌍 Worldwide</div>
          <h2 className="section-title">Explore <em>World Cuisines</em></h2>
          <p className="section-sub">Click any cuisine to explore authentic recipes from around the globe.</p>
        </div>
        <div className="cat-grid">
          {[
            { name: "🇮🇳 Indian", desc: "biryani, butter chicken, dosa", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", id: "indian" },

            { name: "🇯🇵 Japanese", desc: "sushi, ramen, tempura", img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", id: "coming" },
            { name: "🇮🇹 Italian", desc: "pasta, pizza, risotto", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80", id: "coming" },
            { name: "🇲🇽 Mexican", desc: "tacos, enchiladas, guacamole", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80", id: "coming" },
            { name: "🇨🇳 Chinese", desc: "dim sum, Peking duck, stir-fries", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", id: "coming" },
            { name: "🇹🇭 Thai", desc: "pad thai, green curry", img: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&q=80", id: "coming" },
            { name: "🇫🇷 French", desc: "croissants, coq au vin", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", id: "coming" },
            { name: "🇰🇷 Korean", desc: "kimchi, bibimbap, BBQ", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80", id: "coming" },
            { name: "🇬🇷 Greek", desc: "moussaka, souvlaki", img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80", id: "coming" },
            { name: "🇲🇦 Moroccan", desc: "tagine, couscous", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80", id: "coming" },
            { name: "🇻🇳 Vietnamese", desc: "pho, banh mi", img: "https://images.unsplash.com/photo-1582878826629-33b7f57b2a3c?w=400&q=80", id: "coming" },
            { name: "🇪🇸 Spanish", desc: "paella, tapas, churros", img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&q=80", id: "coming" },
          ].map(c => (
            <div key={c.name} className="cat-card" onClick={() => {
              if(c.id === "indian") { setIndianPage(true); }
              else if(c.id === "maharashtra") { setMaharashtraPage(true); }
              else { alert("🚧 " + c.name + " recipes coming soon!"); }
            }}>
              <img src={c.img} alt={c.name} />
              <div className="cat-overlay" />
              <div className="cat-info">
                <h3>{c.name}</h3>
                <span>{c.desc}</span>
                {c.id === "indian" && <span style={{display:"inline-block",background:"var(--saffron)",color:"white",fontSize:"0.65rem",padding:"0.15rem 0.5rem",borderRadius:"10px",marginTop:"0.3rem"}}>✅ Available Now</span>}
                {c.id === "coming" && <span style={{display:"inline-block",background:"rgba(255,255,255,0.2)",color:"white",fontSize:"0.65rem",padding:"0.15rem 0.5rem",borderRadius:"10px",marginTop:"0.3rem"}}>🚧 Coming Soon</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="section trending-section" id="trending">
        <div className="section-header">
          <div className="section-tag">🔥 Hot Right Now</div>
          <h2 className="section-title">Trending <em>This Week</em></h2>
          <p className="section-sub">Community favorites, curated fresh every week by our AI.</p>
        </div>
        <div className="trending-scroll" id="recipes">
          {trending.map((r, i) => (
            <div key={i} className="recipe-card" onClick={() => setRecipeModal(r)}>
              <div className="recipe-card-img">
                <img src={r.img} alt={r.title} />
                <span className={`recipe-badge ${r.difficulty}`}>{r.difficulty.charAt(0).toUpperCase()+r.difficulty.slice(1)}</span>
                <button className={`heart-btn${liked[i] ? " liked" : ""}`} onClick={e => { e.stopPropagation(); setLiked(l => ({ ...l, [i]: !l[i] })); }}>
                  {liked[i] ? "❤️" : "🤍"}
                </button>
              </div>
              <div className="recipe-card-body">
                <div className="recipe-chef">{r.chef}</div>
                <h3>{r.title}</h3>
                <div className="recipe-meta">
                  <span>⏱ {r.time}</span>
                  <span>⭐ 4.{7 + (i % 3)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHEFS */}
      <section className="section chefs-section" id="chefs">
        <div className="section-header">
          <div className="section-tag">Meet the Team</div>
          <h2 className="section-title">Featured <em>Chefs</em></h2>
          <p className="section-sub">World-class culinary talent, curated and celebrated by FusionChef AI.</p>
        </div>
        <div className="chefs-grid">
          {chefs.map(c => (
            <div key={c.name} className="chef-card" onClick={() => setChefModal(c)}>
              <img src={c.img} alt={c.name} className="chef-avatar" />
              <h3>{c.name}</h3>
              <div className="chef-specialty">{c.specialty}</div>
              <div className="chef-followers">{c.followers} followers</div>
              <div className="chef-dish">{c.dish}</div>
            </div>
          ))}
        </div>
      </section>





      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <h2>Get Weekly Recipes, Chef Tips & AI Picks</h2>
        <p>Join 420,000+ food lovers. Unsubscribe anytime.</p>
        {subscribed ? (
          <p style={{color:"white",fontWeight:600,fontSize:"1.1rem"}}>🎉 You're in! Welcome to the FusionChef family.</p>
        ) : (
          <div className="newsletter-form">
            <input className="newsletter-input" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
            <button className="newsletter-btn" onClick={() => email && setSubscribed(true)}>Subscribe →</button>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>FusionChef <em>AI</em></h2>
            <p>Where every meal tells a story. AI-powered recipes, world-class chefs, and culinary inspiration — all in one place.</p>
            <div className="footer-socials">
              {["📘","📸","🐦","▶️","📌"].map((s, i) => <a key={i} className="social-btn" href="#">{s}</a>)}
            </div>
          </div>
          <div className="footer-col">
            <h4>Recipes</h4>
            <ul>{["Breakfast","Lunch","Dinner","Baking","Vegetarian","Healthy"].map(l => <li key={l}><a href="#" onClick={() => scrollToSection("categories")}>{l}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Discover</h4>
            <ul>{[["Shows","shows"],["Chefs","chefs"],["Magazine","blog"],["Trending","trending"],["AI Chef","ai-chef"]].map(([l,id]) => <li key={l}><a href="#" onClick={() => scrollToSection(id)}>{l}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>{["About Us","Careers","Press","Contact","Privacy","Terms"].map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 FusionChef AI. All rights reserved. Powered by <span style={{color:"var(--saffron)"}}>Anthropic Claude</span>.
        </div>
      </footer>
    </>
  );
}
