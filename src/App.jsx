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
    "image_prompt": "Ultra realistic professional food photography of golden crispy Indian samosas, beautifully plated on a rustic wooden board with green mint chutney, natural lighting, high-end restaurant presentation, shallow depth of field"
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
    "image_prompt": "Ultra realistic professional food photography of smoky charred paneer tikka on skewers, vibrant orange marinade, served with colorful bell peppers, editorial food magazine style, dark background"
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
    "image_prompt": "Ultra realistic food photography of crispy golden aloo tikki chaat, topped with colorful chutneys and yogurt, street food style, vibrant colors, editorial magazine style"
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
    "image_prompt": "Ultra realistic food photography of dahi puri chaat, crispy shells filled with yogurt and colorful chutneys, Indian street food, vibrant overhead shot"
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
    "image_prompt": "Ultra realistic food photography of crispy golden onion bhaji fritters, stacked on parchment paper, served with yogurt dip, rustic dark background, dramatic lighting"
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
    "image_prompt": "Ultra realistic food photography of golden mulligatawny soup in a white bowl, cream swirl on top, fresh coriander garnish, elegant restaurant presentation"
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
    "image_prompt": "Ultra realistic food photography of vibrant red tomato shorba soup, white cream swirl, fresh herb garnish, elegant white bowl, Indian fine dining"
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
    "image_prompt": "Ultra realistic food photography of golden dal shorba in a ceramic bowl, tempered with ghee and cumin, fresh coriander, warm natural lighting"
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
    "image_prompt": "Ultra realistic professional food photography of rich creamy butter chicken in a copper bowl, vibrant orange sauce, garnished with cream swirl and fresh coriander, dark moody restaurant lighting"
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
    "image_prompt": "Ultra realistic food photography of vibrant green palak paneer in a white bowl, golden paneer cubes, cream swirl on top, Indian restaurant presentation, natural lighting"
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
    "image_prompt": "Ultra realistic food photography of deep red Kashmiri lamb rogan josh, rich aromatic sauce, served in a copper karahi, saffron rice on side, dramatic moody lighting"
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
    "image_prompt": "Ultra realistic professional food photography of fragrant chicken biryani, golden saffron rice with whole spices, served on a large platter, garnished with fried onions and mint, stunning presentation"
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
    "image_prompt": "Ultra realistic food photography of freshly baked garlic naan with charred spots, glistening with garlic butter and fresh coriander, dark rustic background, steam rising"
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
    "image_prompt": "Ultra realistic food photography of golden flaky paratha on a plate with ghee melting on top, served with pickle and yogurt, warm morning light, rustic Indian breakfast setting"
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
    "image_prompt": "Ultra realistic food photography of golden puffed puri breads, beautifully stacked, served with aloo sabzi, Indian breakfast style, warm golden light"
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
    "image_prompt": "Ultra realistic food photography of fragrant vegetable biryani, colorful vegetables and saffron rice, garnished with fried onions and mint, served in a traditional handi"
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
    "image_prompt": "Ultra realistic food photography of fluffy jeera rice with golden cumin seeds, served in a white bowl, garnished with coriander, clean elegant presentation"
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
    "image_prompt": "Ultra realistic food photography of golden-brown gulab jamun soaked in rose syrup, served in a white bowl with saffron strands, Indian mithai style, warm glow"
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
    "image_prompt": "Ultra realistic food photography of creamy Indian kheer rice pudding in an elegant silver bowl, garnished with saffron strands, crushed pistachios and rose petals, festive presentation"
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
    "image_prompt": "Ultra realistic food photography of white spongy rasgulla Bengali sweet in clear sugar syrup, served in a glass bowl, elegant dessert presentation, soft lighting"
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
    "image_prompt": "Ultra realistic food photography of steaming masala chai in a glass cup on a saucer, warm amber color, spices visible, cozy morning light, Indian tea house atmosphere"
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
    "image_prompt": "Ultra realistic food photography of golden mango lassi in a tall glass, frothy top, mango garnish, condensation on glass, vibrant tropical setting, bright natural light"
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
    "image_prompt": "Ultra realistic food photography of pink rose sharbat in a glass, floating basil seeds, fresh rose petals garnish, bright refreshing summer drink photography"
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
            { role: "system", content: "You are FusionChef AI. Generate exactly 3 recipe suggestions for the search query. Respond ONLY with a valid JSON array, no extra text. Format: [{"title":"...","chef":"Chef Name","time":"30 min","difficulty":"easy","ingredients":["item1","item2","item3","item4","item5"],"steps":["Step 1","Step 2","Step 3"],"img":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80","isAI":true}]" },
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

      {/* INDIAN CUISINE PAGE */}
      {indianPage && (
        <div className="indian-page">
          <div className="indian-header">
            <button className="indian-back" onClick={() => setIndianPage(false)}>← Back</button>
            <h1>🇮🇳 Indian <em>Cuisine</em></h1>
            <input className="indian-search" placeholder="Search dishes..." value={indianSearch} onChange={e => setIndianSearch(e.target.value)} />
          </div>
          <div className="indian-content">
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
                      <div className="indian-card-img">
                        <span>{emojis[dish.category] || "🍽"}</span>
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
                  <div style={{background:"linear-gradient(135deg, #E8621A, #C9922A)", height:"200px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"5rem"}}>
                    {{"Appetizers":"🥟","Soups":"🍜","Main Courses":"🍛","Breads":"🫓","Rice Preparations":"🍚","Desserts":"🍮","Beverages":"☕"}[indianModal.category] || "🍽"}
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

      {/* CATEGORIES */}
      <section className="section categories-section" id="categories">
        <div className="section-header">
          <div className="section-tag">🌍 Worldwide</div>
          <h2 className="section-title">Explore <em>World Cuisines</em></h2>
          <p className="section-sub">From Asia to Oceania — discover authentic flavors from every corner of the globe.</p>
        </div>
        {continents.map(continent => (
          <div key={continent.name} className="continent-block">
            <div className="continent-header" style={{borderColor: continent.color}}>
              <h3 className="continent-title" style={{color: continent.color}}>{continent.name}</h3>
            </div>
            <div className="cat-grid">
              {continent.cuisines.map(c => (
                <div key={c.name} className="cat-card" onClick={() => { console.log("Clicked:", c.name); if(c.name.indexOf("Indian") !== -1) { setIndianPage(true); } else { setCatModal({...c, count: Math.floor(Math.random()*200+80) + " recipes"}); } }}>
                  <img src={c.img} alt={c.name} />
                  <div className="cat-overlay" />
                  <div className="cat-info">
                    <h3>{c.name}</h3>
                    <span>{c.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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

      {/* SHOWS */}
      <section className="shows-section" id="shows">
        <div className="section-header">
          <div className="section-tag">🎬 Now Streaming</div>
          <h2 className="section-title">FusionChef <em style={{color:"var(--saffron-light)"}}>Shows</em></h2>
          <p className="section-sub">Binge-worthy culinary TV, from competition kitchens to street food adventures.</p>
        </div>
        <div className="shows-grid">
          {shows.map(s => (
            <div key={s.title} className="show-card">
              <img src={s.img} alt={s.title} />
              <div className="show-overlay" />
              <div className="play-btn">▶</div>
              <div className="show-info">
                <h3>{s.title}</h3>
                <span>{s.episodes}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="section blog-section" id="blog">
        <div className="section-header">
          <div className="section-tag">📖 Knowledge Kitchen</div>
          <h2 className="section-title">From the <em>FusionChef Kitchen</em></h2>
        </div>
        <div className="blog-grid">
          {blogs.map(b => (
            <div key={b.title} className="blog-card">
              <div className="blog-card-img"><img src={b.img} alt={b.title} /></div>
              <div className="blog-card-body">
                <div className="blog-category">{b.category}</div>
                <h3>{b.title}</h3>
                <div className="blog-meta"><span>{b.date}</span><span>{b.read}</span></div>
              </div>
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
