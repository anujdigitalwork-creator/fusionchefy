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
  .nav-links a { color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.88rem; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; transition: color 0.2s; }
  .nav-links a:hover { color: var(--saffron); }
  .nav-right { display: flex; align-items: center; gap: 1rem; }
  .nav-search { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 24px; padding: 0.4rem 1rem; color: white; font-size: 0.85rem; width: 180px; outline: none; font-family: 'DM Sans', sans-serif; transition: all 0.3s; }
  .nav-search::placeholder { color: rgba(255,255,255,0.45); }
  .nav-search:focus { background: rgba(255,255,255,0.15); border-color: var(--saffron); width: 220px; }
  .btn-ai { background: var(--saffron); color: white; border: none; padding: 0.5rem 1.2rem; border-radius: 24px; font-size: 0.85rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; white-space: nowrap; }
  .btn-ai:hover { background: var(--saffron-light); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(232,98,26,0.4); }

  /* HERO */
  .hero {
    margin-top: 64px; height: 88vh; min-height: 560px; position: relative; overflow: hidden;
    background: var(--charcoal);
  }
  .hero-slides { width: 100%; height: 100%; position: relative; }
  .hero-slide {
    position: absolute; inset: 0; opacity: 0; transition: opacity 1.2s ease;
    background-size: cover; background-position: center;
  }
  .hero-slide.active { opacity: 1; }
  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(28,28,28,0.75) 0%, rgba(28,28,28,0.2) 60%, transparent 100%);
  }
  .hero-content {
    position: absolute; bottom: 12%; left: 6%; max-width: 580px;
    animation: fadeUp 1s ease forwards;
  }
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
  .ai-section::before {
    content: ''; position: absolute; top: -50%; right: -10%; width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(232,98,26,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .ai-section .section-tag { color: var(--saffron-light); }
  .ai-section .section-title { color: white; }
  .ai-section .section-sub { color: rgba(255,255,255,0.55); }
  .ai-container { max-width: 760px; margin: 0 auto; }
  .ai-chat-box {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px; overflow: hidden; backdrop-filter: blur(10px);
  }
  .ai-chat-header { background: rgba(232,98,26,0.15); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.5rem; display: flex; align-items: center; gap: 0.8rem; }
  .ai-chef-avatar { width: 36px; height: 36px; background: var(--saffron); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
  .ai-chat-header-text h4 { color: white; font-size: 0.95rem; font-family: 'Playfair Display', serif; }
  .ai-chat-header-text span { color: rgba(255,255,255,0.5); font-size: 0.75rem; }
  .ai-messages { padding: 1.5rem; min-height: 180px; max-height: 340px; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; }
  .ai-messages::-webkit-scrollbar { width: 4px; }
  .ai-messages::-webkit-scrollbar-track { background: transparent; }
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

  /* CATEGORIES */
  .categories-section { background: var(--cream); }
  .cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.2rem; max-width: 1200px; margin: 0 auto; }
  .cat-card {
    position: relative; height: 200px; border-radius: 12px; overflow: hidden; cursor: pointer;
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
    transition: transform 0.3s, box-shadow 0.3s;
  }
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
  .recipe-badge { position: absolute; top: 0.8rem; left: 0.8rem; background: var(--green); color: white; font-size: 0.7rem; font-weight: 600; padding: 0.25rem 0.65rem; border-radius: 20px; letter-spacing: 0.05em; }
  .recipe-badge.easy { background: var(--green); }
  .recipe-badge.medium { background: var(--gold); }
  .recipe-badge.hard { background: #C0392B; }
  .heart-btn { position: absolute; top: 0.8rem; right: 0.8rem; background: white; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.15); transition: transform 0.2s; }
  .heart-btn:hover { transform: scale(1.2); }
  .heart-btn.liked { color: #e74c3c; }
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
  .newsletter-section {
    background: var(--saffron);
    padding: 4.5rem 2.5rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .newsletter-section::before {
    content: '🍳'; font-size: 14rem; position: absolute; left: -2rem; top: -2rem;
    opacity: 0.07; transform: rotate(-20deg); pointer-events: none;
  }
  .newsletter-section::after {
    content: '🌿'; font-size: 14rem; position: absolute; right: -2rem; bottom: -2rem;
    opacity: 0.07; transform: rotate(20deg); pointer-events: none;
  }
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

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .hero h1 { font-size: 2rem; }
    .section { padding: 3.5rem 1.2rem; }
  }
`;

const heroSlides = [
  { bg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80", tag: "Chef's Special", title: "Saffron-Glazed Salmon with Herb Risotto", desc: "A restaurant-worthy dish you can recreate at home in under 40 minutes." },
  { bg: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1400&q=80", tag: "Trending Now", title: "Mushroom & Truffle Pasta Perfection", desc: "Earthy, luxurious, and deeply satisfying. A dish for every occasion." },
  { bg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&q=80", tag: "Weekend Bake", title: "Honey Cardamom Croissants", desc: "Buttery layers of joy. Master the art of laminated dough." },
];

const categories = [
  { name: "Breakfast", count: "248 recipes", img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80" },
  { name: "Quick Dinners", count: "185 recipes", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
  { name: "Vegetarian", count: "312 recipes", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  { name: "Baking", count: "167 recipes", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80" },
  { name: "World Cuisine", count: "420 recipes", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80" },
  { name: "Healthy Eats", count: "209 recipes", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" },
];

const trending = [
  { title: "Spicy Mango Chicken Tacos", chef: "Chef Aria Voss", time: "25 min", difficulty: "easy", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80" },
  { title: "Roasted Tomato Bisque", chef: "Chef Marco Lin", time: "40 min", difficulty: "easy", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
  { title: "Lamb Tagine with Couscous", chef: "Chef Nadia Osei", time: "1h 20min", difficulty: "medium", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80" },
  { title: "Japanese Katsu Curry", chef: "Chef Kenji Mori", time: "50 min", difficulty: "medium", img: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=400&q=80" },
  { title: "Caramel Lava Cake", chef: "Chef Elise Blanc", time: "30 min", difficulty: "hard", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
  { title: "Summer Panzanella Salad", chef: "Chef Giulia Rossi", time: "15 min", difficulty: "easy", img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80" },
];

const chefs = [
  { name: "Aria Voss", specialty: "Modern Fusion", followers: "2.4M", dish: "🌶 Signature: Miso Glazed Duck", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&q=80" },
  { name: "Marco Lin", specialty: "Italian Heritage", followers: "1.8M", dish: "🍝 Signature: Truffle Carbonara", img: "https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?w=200&q=80" },
  { name: "Nadia Osei", specialty: "West African", followers: "950K", dish: "🍲 Signature: Suya Spiced Lamb", img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=200&q=80" },
  { name: "Kenji Mori", specialty: "Japanese Cuisine", followers: "3.1M", dish: "🍱 Signature: Wagyu Ramen", img: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&q=80" },
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
  const messagesEndRef = useRef(null);

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

  const sendMessage = async (text) => {
    const query = (text || input).trim();
    if (!query) return;
    setInput("");
    setMessages(m => [...m, { role: "user", content: query }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are FusionChef AI, a warm and creative culinary AI on a food website. When users ask for recipes or cooking help, respond with a recipe that includes: a catchy dish name, 5-7 key ingredients (as a short list), 3-4 brief cooking steps, and a helpful tip. Keep it conversational, enthusiastic, and under 250 words. Format nicely with a title and sections.",
          messages: [{ role: "user", content: query }]
        })
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Hmm, let me think on that...";
      setMessages(m => [...m, { role: "ai", content: reply }]);
    } catch {
      setMessages(m => [...m, { role: "ai", content: "Oops! My kitchen is a bit busy. Please try again in a moment. 🍳" }]);
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">
          <span style={{fontSize:"1.5rem"}}>🍴</span>
          <span className="logo-text">FusionChef <span className="logo-ai">AI</span></span>
        </div>
        <ul className="nav-links">
          {["Recipes","AI Chef","Shows","Cuisines","Trending","Magazine"].map(l => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <input className="nav-search" placeholder="Search recipes..." />
          <button className="btn-ai">✨ Ask AI Chef</button>
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
            <button className="btn-primary">Explore Recipe</button>
            <button className="btn-outline">✨ Generate with AI</button>
          </div>
        </div>
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`hero-dot${i === slide ? " active" : ""}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </section>

      {/* AI CHEF */}
      <section className="ai-section">
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
              <input
                className="ai-input"
                placeholder="E.g. I have chicken, garlic, and spinach..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
              />
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
      <section className="section categories-section">
        <div className="section-header">
          <div className="section-tag">Browse</div>
          <h2 className="section-title">Explore by <em>Category</em></h2>
        </div>
        <div className="cat-grid">
          {categories.map(c => (
            <div key={c.name} className="cat-card">
              <img src={c.img} alt={c.name} />
              <div className="cat-overlay" />
              <div className="cat-info">
                <h3>{c.name}</h3>
                <span>{c.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="section trending-section">
        <div className="section-header">
          <div className="section-tag">🔥 Hot Right Now</div>
          <h2 className="section-title">Trending <em>This Week</em></h2>
          <p className="section-sub">Community favorites, curated fresh every week by our AI.</p>
        </div>
        <div className="trending-scroll">
          {trending.map((r, i) => (
            <div key={i} className="recipe-card">
              <div className="recipe-card-img">
                <img src={r.img} alt={r.title} />
                <span className={`recipe-badge ${r.difficulty}`}>{r.difficulty.charAt(0).toUpperCase()+r.difficulty.slice(1)}</span>
                <button
                  className={`heart-btn${liked[i] ? " liked" : ""}`}
                  onClick={() => setLiked(l => ({ ...l, [i]: !l[i] }))}
                >
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
      <section className="section chefs-section">
        <div className="section-header">
          <div className="section-tag">Meet the Team</div>
          <h2 className="section-title">Featured <em>Chefs</em></h2>
          <p className="section-sub">World-class culinary talent, curated and celebrated by FusionChef AI.</p>
        </div>
        <div className="chefs-grid">
          {chefs.map(c => (
            <div key={c.name} className="chef-card">
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
      <section className="shows-section">
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
      <section className="section blog-section">
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
            <ul>{["Breakfast","Lunch","Dinner","Baking","Vegetarian","Healthy"].map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Discover</h4>
            <ul>{["Shows","Chefs","Magazine","Trending","AI Chef","Classes"].map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
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
