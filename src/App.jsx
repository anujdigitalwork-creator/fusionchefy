import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useParams, useNavigate } from "react-router-dom";

const GA_ID = "G-6MVKQHR38Y";
function injectGA() {
  if (document.getElementById("ga-script")) return;
  const s1 = document.createElement("script");
  s1.id = "ga-script"; s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s1);
  const s2 = document.createElement("script");
  s2.id = "ga-init";
  s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:true});`;
  document.head.appendChild(s2);
}
function gtagEvent(eventName, params = {}) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
    if (typeof window.gtag === "function") window.gtag("event", eventName, params);
  }
}

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');`;
const styles = `
  ${FONTS}
  *{margin:0;padding:0;box-sizing:border-box;}
  :root{--saffron:#E8621A;--saffron-light:#F47B35;--cream:#FFF8EE;--cream-dark:#F5EDDB;--charcoal:#1C1C1C;--charcoal-mid:#2E2E2E;--green:#4A7C59;--green-light:#6A9E78;--gold:#C9922A;--text-muted:#7A6A55;}
  body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--charcoal);overflow-x:hidden;}
  h1,h2,h3,h4{font-family:'Playfair Display',serif;}
  .nav{position:fixed;top:0;left:0;right:0;z-index:100;background:var(--charcoal);color:white;display:flex;align-items:center;justify-content:space-between;padding:0 2.5rem;height:64px;box-shadow:0 2px 20px rgba(0,0,0,0.3);transition:all 0.3s;}
  .nav.scrolled{background:rgba(28,28,28,0.97);backdrop-filter:blur(12px);}
  .nav-logo{display:flex;align-items:center;gap:0.5rem;cursor:pointer;}
  .nav-logo span.logo-text{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:white;}
  .nav-logo span.logo-ai{color:var(--saffron);font-style:italic;}
  .nav-links{display:flex;gap:1.8rem;list-style:none;}
  .nav-links a{color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.88rem;font-weight:500;letter-spacing:0.04em;text-transform:uppercase;transition:color 0.2s;cursor:pointer;}
  .nav-links a:hover{color:var(--saffron);}
  .nav-right{display:flex;align-items:center;gap:1rem;}
  .btn-ai{background:var(--saffron);color:white;border:none;padding:0.5rem 1.2rem;border-radius:24px;font-size:0.85rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;white-space:nowrap;}
  .btn-ai:hover{background:var(--saffron-light);transform:translateY(-1px);box-shadow:0 4px 14px rgba(232,98,26,0.4);}
  .hero{margin-top:64px;height:88vh;min-height:560px;position:relative;overflow:hidden;background:var(--charcoal);}
  .hero-slides{width:100%;height:100%;position:relative;}
  .hero-slide{position:absolute;inset:0;opacity:0;transition:opacity 1.2s ease;background-size:cover;background-position:center;}
  .hero-slide.active{opacity:1;}
  .hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(28,28,28,0.75) 0%,rgba(28,28,28,0.2) 60%,transparent 100%);}
  .hero-content{position:absolute;bottom:12%;left:6%;max-width:580px;animation:fadeUp 1s ease forwards;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
  .hero-tag{display:inline-block;background:var(--saffron);color:white;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:0.3rem 0.9rem;border-radius:2px;margin-bottom:1rem;}
  .hero h1{font-size:clamp(2.4rem,5vw,4rem);color:white;line-height:1.12;margin-bottom:1rem;text-shadow:0 2px 20px rgba(0,0,0,0.4);}
  .hero p{color:rgba(255,255,255,0.85);font-size:1.05rem;line-height:1.65;margin-bottom:1.8rem;}
  .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;}
  .btn-primary{background:var(--saffron);color:white;border:none;padding:0.85rem 2rem;border-radius:4px;font-size:0.95rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.25s;}
  .btn-primary:hover{background:var(--saffron-light);transform:translateY(-2px);box-shadow:0 8px 24px rgba(232,98,26,0.4);}
  .btn-outline{background:transparent;color:white;border:2px solid rgba(255,255,255,0.6);padding:0.85rem 2rem;border-radius:4px;font-size:0.95rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.25s;}
  .btn-outline:hover{border-color:white;background:rgba(255,255,255,0.1);}
  .hero-dots{position:absolute;bottom:2rem;right:6%;display:flex;gap:0.5rem;}
  .hero-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.4);cursor:pointer;transition:all 0.3s;border:none;}
  .hero-dot.active{background:var(--saffron);transform:scale(1.3);}
  .section{padding:5rem 2.5rem;}
  .section-header{text-align:center;margin-bottom:3rem;}
  .section-tag{display:inline-block;color:var(--saffron);font-size:0.78rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.6rem;}
  .section-title{font-size:clamp(1.8rem,3vw,2.8rem);color:var(--charcoal);line-height:1.2;}
  .section-title em{color:var(--saffron);font-style:italic;}
  .section-sub{color:var(--text-muted);font-size:1rem;margin-top:0.6rem;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7;}
  .ai-section{background:var(--charcoal);padding:5rem 2.5rem;position:relative;overflow:hidden;}
  .ai-section::before{content:'';position:absolute;top:-50%;right:-10%;width:600px;height:600px;background:radial-gradient(circle,rgba(232,98,26,0.12) 0%,transparent 70%);pointer-events:none;}
  .ai-section .section-tag{color:var(--saffron-light);}
  .ai-section .section-title{color:white;}
  .ai-section .section-sub{color:rgba(255,255,255,0.55);}
  .ai-container{max-width:760px;margin:0 auto;}
  .ai-chat-box{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;backdrop-filter:blur(10px);}
  .ai-chat-header{background:rgba(232,98,26,0.15);border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 1.5rem;display:flex;align-items:center;gap:0.8rem;}
  .ai-chef-avatar{width:36px;height:36px;background:var(--saffron);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;}
  .ai-chat-header-text h4{color:white;font-size:0.95rem;font-family:'Playfair Display',serif;}
  .ai-chat-header-text span{color:rgba(255,255,255,0.5);font-size:0.75rem;}
  .ai-messages{padding:1.5rem;min-height:180px;max-height:340px;overflow-y:auto;display:flex;flex-direction:column;gap:1rem;}
  .ai-messages::-webkit-scrollbar{width:4px;}
  .ai-messages::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:2px;}
  .msg{max-width:85%;padding:0.8rem 1.1rem;border-radius:12px;font-size:0.9rem;line-height:1.6;}
  .msg.user{background:var(--saffron);color:white;align-self:flex-end;border-bottom-right-radius:4px;}
  .msg.ai{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.9);align-self:flex-start;border-bottom-left-radius:4px;}
  .msg.ai h4{font-family:'Playfair Display',serif;color:var(--saffron-light);margin-bottom:0.4rem;font-size:1rem;}
  .typing{display:flex;gap:4px;align-items:center;padding:0.8rem 1.1rem;}
  .typing span{width:7px;height:7px;background:var(--saffron);border-radius:50%;animation:bounce 1.2s infinite;}
  .typing span:nth-child(2){animation-delay:0.2s;}
  .typing span:nth-child(3){animation-delay:0.4s;}
  @keyframes bounce{0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-8px);}}
  .ai-input-row{display:flex;gap:0;border-top:1px solid rgba(255,255,255,0.08);}
  .ai-input{flex:1;background:transparent;border:none;padding:1.1rem 1.5rem;color:white;font-size:0.92rem;font-family:'DM Sans',sans-serif;outline:none;}
  .ai-input::placeholder{color:rgba(255,255,255,0.3);}
  .ai-send{background:var(--saffron);border:none;color:white;padding:1rem 1.5rem;cursor:pointer;font-size:1.1rem;transition:background 0.2s;}
  .ai-send:hover{background:var(--saffron-light);}
  .ai-chips{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:1.2rem;}
  .ai-chip{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);padding:0.45rem 1rem;border-radius:20px;font-size:0.8rem;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;}
  .ai-chip:hover{background:rgba(232,98,26,0.2);border-color:var(--saffron);color:white;}
  .categories-section{background:var(--cream);}
  .cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.2rem;max-width:1300px;margin:0 auto;}
  .cat-card{position:relative;height:200px;border-radius:12px;overflow:hidden;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.12);transition:transform 0.3s,box-shadow 0.3s;}
  .cat-card:hover{transform:translateY(-6px);box-shadow:0 12px 36px rgba(0,0,0,0.2);}
  .cat-card img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s;}
  .cat-card:hover img{transform:scale(1.08);}
  .cat-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(28,28,28,0.75) 0%,transparent 60%);}
  .cat-info{position:absolute;bottom:1rem;left:1rem;color:white;}
  .cat-info h3{font-size:1.1rem;font-weight:700;}
  .cat-info span{font-size:0.78rem;color:rgba(255,255,255,0.7);}
  .trending-section{background:var(--cream-dark);}
  .trending-scroll{display:flex;gap:1.4rem;overflow-x:auto;padding:0.5rem 0 1.5rem;scrollbar-width:thin;scrollbar-color:var(--saffron) transparent;max-width:1200px;margin:0 auto;}
  .trending-scroll::-webkit-scrollbar{height:4px;}
  .trending-scroll::-webkit-scrollbar-thumb{background:var(--saffron);border-radius:2px;}
  .recipe-card{min-width:280px;background:white;border-radius:12px;overflow:hidden;box-shadow:0 3px 16px rgba(0,0,0,0.09);transition:all 0.3s;cursor:pointer;}
  .recipe-card:hover{transform:translateY(-5px);box-shadow:0 12px 30px rgba(0,0,0,0.15);}
  .recipe-card-img{position:relative;height:180px;overflow:hidden;}
  .recipe-card-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s;}
  .recipe-card:hover .recipe-card-img img{transform:scale(1.06);}
  .recipe-badge{position:absolute;top:0.8rem;left:0.8rem;color:white;font-size:0.7rem;font-weight:600;padding:0.25rem 0.65rem;border-radius:20px;letter-spacing:0.05em;}
  .recipe-badge.easy{background:var(--green);}
  .recipe-badge.medium{background:var(--gold);}
  .recipe-badge.hard{background:#C0392B;}
  .heart-btn{position:absolute;top:0.8rem;right:0.8rem;background:white;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.15);transition:transform 0.2s;}
  .heart-btn:hover{transform:scale(1.2);}
  .recipe-card-body{padding:1rem 1.1rem;}
  .recipe-card-body h3{font-size:1rem;color:var(--charcoal);margin-bottom:0.4rem;line-height:1.4;}
  .recipe-meta{display:flex;align-items:center;gap:1rem;font-size:0.78rem;color:var(--text-muted);margin-top:0.6rem;}
  .recipe-chef{font-size:0.78rem;color:var(--saffron);font-weight:600;}
  .chefs-section{background:white;}
  .chefs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.5rem;max-width:1000px;margin:0 auto;}
  .chef-card{text-align:center;padding:2rem 1.5rem;border-radius:16px;background:var(--cream);cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden;}
  .chef-card::before{content:'';position:absolute;inset:0;background:var(--saffron);transform:scaleY(0);transform-origin:bottom;transition:transform 0.35s ease;z-index:0;}
  .chef-card:hover::before{transform:scaleY(1);}
  .chef-card>*{position:relative;z-index:1;}
  .chef-card:hover h3,.chef-card:hover .chef-specialty,.chef-card:hover .chef-followers{color:white;}
  .chef-avatar{width:90px;height:90px;border-radius:50%;object-fit:cover;margin:0 auto 1rem;border:3px solid white;box-shadow:0 4px 14px rgba(0,0,0,0.15);}
  .chef-card h3{font-size:1.05rem;color:var(--charcoal);transition:color 0.3s;}
  .chef-specialty{font-size:0.8rem;color:var(--saffron);margin-top:0.3rem;font-weight:500;transition:color 0.3s;}
  .chef-followers{font-size:0.75rem;color:var(--text-muted);margin-top:0.3rem;transition:color 0.3s;}
  .chef-dish{font-size:0.75rem;margin-top:0.5rem;opacity:0;transform:translateY(6px);transition:all 0.3s 0.1s;color:rgba(255,255,255,0.9);}
  .chef-card:hover .chef-dish{opacity:1;transform:translateY(0);}
  .newsletter-section{background:var(--saffron);padding:4.5rem 2.5rem;text-align:center;position:relative;overflow:hidden;}
  .newsletter-section::before{content:'🍳';font-size:14rem;position:absolute;left:-2rem;top:-2rem;opacity:0.07;transform:rotate(-20deg);pointer-events:none;}
  .newsletter-section::after{content:'🌿';font-size:14rem;position:absolute;right:-2rem;bottom:-2rem;opacity:0.07;transform:rotate(20deg);pointer-events:none;}
  .newsletter-section h2{color:white;font-size:clamp(1.8rem,3vw,2.6rem);margin-bottom:0.8rem;}
  .newsletter-section p{color:rgba(255,255,255,0.85);font-size:1rem;margin-bottom:2rem;}
  .newsletter-form{display:flex;gap:0;max-width:460px;margin:0 auto;border-radius:6px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.2);}
  .newsletter-input{flex:1;padding:1rem 1.4rem;border:none;font-size:0.92rem;font-family:'DM Sans',sans-serif;outline:none;}
  .newsletter-btn{background:var(--charcoal);color:white;border:none;padding:1rem 1.6rem;font-size:0.92rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background 0.2s;white-space:nowrap;}
  .newsletter-btn:hover{background:var(--charcoal-mid);}
  .footer{background:var(--charcoal-mid);color:rgba(255,255,255,0.7);padding:4rem 2.5rem 2rem;}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2.5rem;max-width:1100px;margin:0 auto 3rem;}
  .footer-brand h2{font-family:'Playfair Display',serif;color:white;font-size:1.5rem;margin-bottom:0.8rem;}
  .footer-brand h2 em{color:var(--saffron);}
  .footer-brand p{font-size:0.85rem;line-height:1.7;max-width:260px;}
  .footer-socials{display:flex;gap:0.8rem;margin-top:1.2rem;}
  .social-btn{width:36px;height:36px;background:rgba(255,255,255,0.08);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.2s;font-size:0.95rem;text-decoration:none;color:rgba(255,255,255,0.7);}
  .social-btn:hover{background:var(--saffron);}
  .footer-col h4{color:white;font-family:'DM Sans',sans-serif;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:1.2rem;}
  .footer-col ul{list-style:none;}
  .footer-col ul li{margin-bottom:0.6rem;}
  .footer-col ul li a{color:rgba(255,255,255,0.55);text-decoration:none;font-size:0.85rem;transition:color 0.2s;}
  .footer-col ul li a:hover{color:var(--saffron);}
  .footer-bottom{border-top:1px solid rgba(255,255,255,0.08);padding-top:1.5rem;text-align:center;font-size:0.8rem;max-width:1100px;margin:0 auto;}
  .full-page{position:fixed;inset:0;background:var(--cream);z-index:150;overflow-y:auto;animation:fadeIn 0.3s ease;}
  .full-page-header{background:var(--charcoal);padding:1.2rem 2.5rem;display:flex;align-items:center;gap:1.2rem;position:sticky;top:0;z-index:10;}
  .full-page-header h1{font-family:'Playfair Display',serif;color:white;font-size:1.5rem;flex:1;}
  .full-page-header h1 em{color:var(--saffron);font-style:italic;}
  .back-btn{background:transparent;border:2px solid rgba(255,255,255,0.3);color:white;padding:0.45rem 1.1rem;border-radius:24px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:0.85rem;transition:all 0.2s;}
  .back-btn:hover{background:var(--saffron);border-color:var(--saffron);}
  .full-page-content{max-width:1300px;margin:0 auto;padding:2.5rem 2rem;}
  .ce-continent{margin-bottom:3rem;}
  .ce-continent-title{font-size:1.4rem;font-family:'Playfair Display',serif;color:var(--charcoal);margin-bottom:1.2rem;padding-bottom:0.6rem;border-bottom:3px solid var(--saffron);display:inline-block;}
  .ce-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;}
  .ce-card{background:white;border-radius:12px;overflow:hidden;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,0.08);transition:all 0.3s;}
  .ce-card:hover{transform:translateY(-4px);box-shadow:0 10px 28px rgba(0,0,0,0.15);}
  .ce-card-img{height:130px;overflow:hidden;position:relative;}
  .ce-card-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s;}
  .ce-card:hover .ce-card-img img{transform:scale(1.08);}
  .ce-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%);}
  .ce-card-body{padding:0.8rem 1rem;}
  .ce-card-body h3{font-size:0.92rem;color:var(--charcoal);font-weight:600;}
  .ce-card-body p{font-size:0.75rem;color:var(--text-muted);margin-top:0.2rem;font-style:italic;}
  .ce-available{display:inline-block;background:var(--green);color:white;font-size:0.65rem;padding:0.15rem 0.55rem;border-radius:10px;margin-top:0.3rem;}
  .ce-coming{display:inline-block;background:var(--cream-dark);color:var(--text-muted);font-size:0.65rem;padding:0.15rem 0.55rem;border-radius:10px;margin-top:0.3rem;}
  .rdb-filters{background:white;border-radius:14px;padding:1.5rem;margin-bottom:2rem;box-shadow:0 3px 12px rgba(0,0,0,0.07);}
  .rdb-filters-row{display:flex;flex-wrap:wrap;gap:1.5rem;align-items:flex-end;}
  .rdb-filter-group{flex:1;min-width:180px;}
  .rdb-filter-group label{display:block;font-size:0.78rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.5rem;}
  .rdb-search-input{width:100%;padding:0.65rem 1rem;border:2px solid var(--cream-dark);border-radius:8px;font-size:0.88rem;font-family:'DM Sans',sans-serif;outline:none;transition:border 0.2s;}
  .rdb-search-input:focus{border-color:var(--saffron);}
  .rdb-select{width:100%;padding:0.65rem 1rem;border:2px solid var(--cream-dark);border-radius:8px;font-size:0.88rem;font-family:'DM Sans',sans-serif;outline:none;background:white;cursor:pointer;transition:border 0.2s;}
  .rdb-select:focus{border-color:var(--saffron);}
  .rdb-count{font-size:0.85rem;color:var(--text-muted);margin-bottom:1.2rem;}
  .rdb-count strong{color:var(--saffron);}
  .rdb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.4rem;}
  .rdb-card{background:white;border-radius:14px;overflow:hidden;box-shadow:0 3px 14px rgba(0,0,0,0.08);cursor:pointer;transition:all 0.3s;}
  .rdb-card:hover{transform:translateY(-5px);box-shadow:0 12px 30px rgba(0,0,0,0.14);}
  .rdb-card-img{height:170px;display:flex;align-items:center;justify-content:center;font-size:4rem;position:relative;}
  .rdb-card-body{padding:1rem 1.2rem;}
  .rdb-card-body h3{font-size:0.98rem;color:var(--charcoal);margin-bottom:0.4rem;line-height:1.4;}
  .rdb-card-meta{display:flex;gap:0.8rem;font-size:0.75rem;color:var(--text-muted);margin-top:0.5rem;flex-wrap:wrap;align-items:center;}
  .rdb-cuisine-tag{display:inline-block;background:rgba(232,98,26,0.1);color:var(--saffron);font-size:0.72rem;font-weight:600;padding:0.2rem 0.7rem;border-radius:10px;}
  .rdb-empty{text-align:center;padding:4rem;color:var(--text-muted);}
  .indian-page{position:fixed;inset:0;background:var(--cream);z-index:150;overflow-y:auto;animation:fadeIn 0.3s ease;}
  .indian-header{background:var(--charcoal);padding:1.5rem 2.5rem;display:flex;align-items:center;gap:1.5rem;position:sticky;top:0;z-index:10;}
  .indian-back{background:transparent;border:2px solid rgba(255,255,255,0.3);color:white;padding:0.5rem 1.2rem;border-radius:24px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:0.85rem;transition:all 0.2s;}
  .indian-back:hover{background:var(--saffron);border-color:var(--saffron);}
  .indian-header h1{font-family:'Playfair Display',serif;color:white;font-size:1.6rem;flex:1;}
  .indian-header h1 em{color:var(--saffron);font-style:italic;}
  .indian-search{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:24px;padding:0.5rem 1.2rem;color:white;font-size:0.88rem;width:240px;outline:none;font-family:'DM Sans',sans-serif;}
  .indian-search::placeholder{color:rgba(255,255,255,0.4);}
  .indian-content{max-width:1300px;margin:0 auto;padding:2.5rem 2rem;}
  .indian-cats{display:flex;flex-wrap:wrap;gap:0.6rem;margin-bottom:2.5rem;}
  .cat-pill{background:white;border:2px solid var(--cream-dark);color:var(--charcoal);padding:0.45rem 1.2rem;border-radius:24px;font-size:0.82rem;font-weight:500;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;}
  .cat-pill:hover,.cat-pill.active{background:var(--saffron);border-color:var(--saffron);color:white;}
  .indian-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.4rem;}
  .indian-card{background:white;border-radius:14px;overflow:hidden;box-shadow:0 3px 16px rgba(0,0,0,0.09);cursor:pointer;transition:all 0.3s;}
  .indian-card:hover{transform:translateY(-5px);box-shadow:0 12px 30px rgba(0,0,0,0.15);}
  .indian-card-img{height:180px;background:linear-gradient(135deg,var(--saffron),var(--gold));display:flex;align-items:center;justify-content:center;font-size:4rem;position:relative;overflow:hidden;}
  .indian-card-body{padding:1rem 1.2rem;}
  .indian-card-body h3{font-size:1rem;color:var(--charcoal);margin-bottom:0.4rem;}
  .indian-card-meta{display:flex;gap:0.8rem;font-size:0.75rem;color:var(--text-muted);margin-top:0.5rem;flex-wrap:wrap;}
  .indian-cat-badge{display:inline-block;background:var(--cream-dark);color:var(--saffron);font-size:0.7rem;font-weight:600;padding:0.2rem 0.7rem;border-radius:12px;margin-bottom:0.4rem;}
  .diff-badge{padding:0.2rem 0.6rem;border-radius:10px;font-size:0.7rem;font-weight:600;color:white;}
  .diff-easy{background:var(--green);}
  .diff-medium{background:var(--gold);}
  .diff-hard{background:#C0392B;}
  .indian-empty{text-align:center;padding:4rem;color:var(--text-muted);font-size:1.1rem;}
  .indian-modal-steps{list-style:none;counter-reset:steps;}
  .indian-modal-steps li{counter-increment:steps;font-size:0.88rem;color:var(--charcoal);padding:0.7rem 0 0.7rem 2.5rem;border-bottom:1px solid var(--cream-dark);position:relative;line-height:1.6;}
  .indian-modal-steps li::before{content:counter(steps);position:absolute;left:0;top:0.7rem;width:22px;height:22px;background:var(--saffron);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700;}
  .flavor-tag{display:inline-block;background:var(--cream-dark);color:var(--charcoal);font-size:0.72rem;padding:0.2rem 0.7rem;border-radius:10px;margin:0.2rem;}
  .diet-tag{display:inline-block;background:rgba(74,124,89,0.15);color:var(--green);font-size:0.72rem;padding:0.2rem 0.7rem;border-radius:10px;margin:0.2rem;font-weight:600;}
  .nutrition-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0.8rem;margin-top:0.8rem;}
  .nutrition-box{background:var(--cream);border-radius:10px;padding:0.7rem;text-align:center;}
  .nutrition-box strong{display:block;font-size:1rem;color:var(--saffron);}
  .nutrition-box span{font-size:0.7rem;color:var(--text-muted);}
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:200;display:flex;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(4px);animation:fadeIn 0.2s ease;}
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  .modal{background:white;border-radius:20px;max-width:600px;width:100%;max-height:90vh;overflow-y:auto;animation:slideUp 0.3s ease;}
  @keyframes slideUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
  .modal-img{width:100%;height:260px;object-fit:cover;border-radius:20px 20px 0 0;}
  .modal-body{padding:1.8rem;}
  .modal-body h2{font-size:1.6rem;color:var(--charcoal);margin-bottom:0.5rem;}
  .modal-meta{display:flex;gap:1rem;font-size:0.82rem;color:var(--text-muted);margin-bottom:1.2rem;flex-wrap:wrap;}
  .modal-meta span{background:var(--cream);padding:0.3rem 0.8rem;border-radius:20px;}
  .modal-section-title{font-size:1rem;font-weight:600;color:var(--saffron);margin:1.2rem 0 0.6rem;font-family:'Playfair Display',serif;}
  .modal-ingredients{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:0.4rem;}
  .modal-ingredients li{font-size:0.88rem;color:var(--charcoal);padding:0.3rem 0;border-bottom:1px solid var(--cream-dark);}
  .modal-ingredients li::before{content:'• ';color:var(--saffron);}
  .modal-steps{list-style:none;counter-reset:steps;}
  .modal-steps li{counter-increment:steps;font-size:0.88rem;color:var(--charcoal);padding:0.6rem 0 0.6rem 2.5rem;border-bottom:1px solid var(--cream-dark);position:relative;line-height:1.6;}
  .modal-steps li::before{content:counter(steps);position:absolute;left:0;top:0.6rem;width:22px;height:22px;background:var(--saffron);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700;}
  .modal-close{position:absolute;top:1rem;right:1rem;background:white;border:none;width:36px;height:36px;border-radius:50%;font-size:1.1rem;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
  .modal-close:hover{background:var(--saffron);color:white;}
  .modal-wrapper{position:relative;}
  .modal-chef-avatar{width:80px;height:80px;border-radius:50%;object-fit:cover;border:4px solid var(--saffron);margin:0 auto 1rem;display:block;}
  .modal-chef-body{padding:2rem;text-align:center;}
  .modal-chef-body h2{font-size:1.6rem;color:var(--charcoal);}
  .modal-chef-specialty{color:var(--saffron);font-weight:600;margin:0.3rem 0 1rem;}
  .modal-chef-bio{font-size:0.9rem;color:var(--text-muted);line-height:1.7;text-align:left;}
  .modal-chef-stats{display:flex;gap:1rem;justify-content:center;margin:1.2rem 0;}
  .modal-chef-stat{text-align:center;background:var(--cream);padding:0.8rem 1.2rem;border-radius:12px;}
  .modal-chef-stat strong{display:block;font-size:1.1rem;color:var(--charcoal);}
  .modal-chef-stat span{font-size:0.75rem;color:var(--text-muted);}
  .btn-ask-chef{background:var(--saffron);color:white;border:none;padding:0.8rem 1.8rem;border-radius:24px;font-size:0.92rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;margin-top:1rem;transition:all 0.2s;}
  .btn-ask-chef:hover{background:var(--saffron-light);transform:translateY(-2px);}
  .search-modal{background:white;border-radius:20px;max-width:700px;width:100%;max-height:85vh;overflow-y:auto;animation:slideUp 0.3s ease;}
  .search-modal-header{padding:1.5rem 1.8rem;border-bottom:1px solid var(--cream-dark);display:flex;align-items:center;justify-content:space-between;}
  .search-modal-header h3{font-size:1.2rem;color:var(--charcoal);}
  .search-modal-header span{color:var(--text-muted);font-size:0.85rem;}
  .search-results-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;padding:1.5rem;}
  .search-result-card{background:var(--cream);border-radius:12px;overflow:hidden;cursor:pointer;transition:all 0.3s;}
  .search-result-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.12);}
  .search-result-img{height:130px;overflow:hidden;}
  .search-result-img img{width:100%;height:100%;object-fit:cover;}
  .search-result-body{padding:0.8rem;}
  .search-result-body h4{font-size:0.9rem;color:var(--charcoal);margin-bottom:0.3rem;line-height:1.4;}
  .search-result-meta{font-size:0.75rem;color:var(--text-muted);}
  .search-empty{padding:3rem;text-align:center;color:var(--text-muted);}
  .search-loading{padding:3rem;text-align:center;}
  .ai-badge{display:inline-block;background:var(--saffron);color:white;font-size:0.65rem;padding:0.15rem 0.5rem;border-radius:10px;margin-left:0.4rem;vertical-align:middle;}
  @media(max-width:768px){.nav-links{display:none;}.footer-grid{grid-template-columns:1fr 1fr;}.hero h1{font-size:2rem;}.section{padding:3.5rem 1.2rem;}.modal-ingredients{grid-template-columns:1fr;}}
`;

const heroSlides = [
  { bg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80", tag: "Chef's Special", title: "Saffron-Glazed Salmon with Herb Risotto", desc: "A restaurant-worthy dish you can recreate at home in under 40 minutes." },
  { bg: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1400&q=80", tag: "Trending Now", title: "Mushroom & Truffle Pasta Perfection", desc: "Earthy, luxurious, and deeply satisfying. A dish for every occasion." },
  { bg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&q=80", tag: "Weekend Bake", title: "Honey Cardamom Croissants", desc: "Buttery layers of joy. Master the art of laminated dough." },
];

const trending = [
  { title: "Spicy Mango Chicken Tacos", chef: "Chef Aria Voss", time: "25 min", difficulty: "easy", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80", ingredients: ["Chicken thighs","Fresh mango","Lime juice","Jalapeño","Corn tortillas","Cilantro","Sour cream"], steps: ["Marinate chicken in lime, chili, and mango juice for 15 mins.","Grill chicken on high heat for 5-6 mins per side until charred.","Dice fresh mango and mix with cilantro and lime for salsa.","Warm tortillas and assemble with chicken, mango salsa, and sour cream."] },
  { title: "Roasted Tomato Bisque", chef: "Chef Marco Lin", time: "40 min", difficulty: "easy", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", ingredients: ["Ripe tomatoes","Garlic cloves","Heavy cream","Basil leaves","Onion","Olive oil","Vegetable broth"], steps: ["Roast tomatoes and garlic at 200°C for 25 mins.","Sauté onions in olive oil until golden.","Blend roasted tomatoes with sautéed onions and broth.","Stir in cream and fresh basil, season to taste."] },
  { title: "Lamb Tagine with Couscous", chef: "Chef Nadia Osei", time: "1h 20min", difficulty: "medium", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80", ingredients: ["Lamb shoulder","Apricots","Chickpeas","Ras el hanout","Onion","Couscous","Cilantro"], steps: ["Brown lamb pieces in batches with spices.","Add onions, apricots, chickpeas and stock to pot.","Simmer on low heat for 1 hour until tender.","Serve over fluffy couscous with fresh cilantro."] },
  { title: "Japanese Katsu Curry", chef: "Chef Kenji Mori", time: "50 min", difficulty: "medium", img: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=400&q=80", ingredients: ["Pork cutlets","Curry roux blocks","Potato","Carrot","Onion","Panko breadcrumbs","Steamed rice"], steps: ["Bread pork cutlets in flour, egg, and panko.","Deep fry at 170°C for 4-5 mins until golden.","Simmer curry with veggies and roux blocks.","Slice katsu and serve over rice with curry sauce."] },
  { title: "Caramel Lava Cake", chef: "Chef Elise Blanc", time: "30 min", difficulty: "hard", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80", ingredients: ["Dark chocolate","Butter","Eggs","Sugar","Flour","Caramel sauce","Vanilla"], steps: ["Melt chocolate and butter together gently.","Whisk eggs and sugar until pale and fluffy.","Fold in chocolate mixture and flour carefully.","Bake at 200°C for exactly 12 mins — center stays molten."] },
  { title: "Summer Panzanella Salad", chef: "Chef Giulia Rossi", time: "15 min", difficulty: "easy", img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80", ingredients: ["Ciabatta bread","Heirloom tomatoes","Cucumber","Red onion","Basil","Olive oil","Red wine vinegar"], steps: ["Toast bread cubes in olive oil until golden.","Chop tomatoes, cucumber, and onion.","Toss everything with olive oil and red wine vinegar.","Let sit for 10 mins so bread absorbs the juices."] },
];

const chefs = [
  { name: "Aria Voss", specialty: "Modern Fusion", followers: "2.4M", dish: "🌶 Signature: Miso Glazed Duck", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&q=80", bio: "Chef Aria Voss trained in Tokyo and Paris before bringing her unique East-meets-West philosophy to the world stage. Known for bold flavors and unexpected ingredient pairings, her cooking challenges conventions and delights palates.", recipes: 142, awards: 8 },
  { name: "Marco Lin", specialty: "Italian Heritage", followers: "1.8M", dish: "🍝 Signature: Truffle Carbonara", img: "https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?w=200&q=80", bio: "Born in Bologna to a family of restaurateurs, Chef Marco Lin carries four generations of Italian culinary wisdom. His philosophy is simple: great ingredients, perfect technique, and lots of love.", recipes: 98, awards: 5 },
  { name: "Nadia Osei", specialty: "West African", followers: "950K", dish: "🍲 Signature: Suya Spiced Lamb", img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=200&q=80", bio: "Chef Nadia Osei is on a mission to bring West African cuisine to the global fine dining scene. Growing up in Accra, she learned to cook from her grandmother and later trained at Le Cordon Bleu.", recipes: 76, awards: 4 },
  { name: "Kenji Mori", specialty: "Japanese Cuisine", followers: "3.1M", dish: "🍱 Signature: Wagyu Ramen", img: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&q=80", bio: "Chef Kenji Mori is Japan's most-followed culinary personality. A master of both traditional washoku and modern Japanese gastronomy, he has earned three Michelin stars across his restaurants.", recipes: 215, awards: 12 },
];

const chips = ["Chicken + lemon + garlic", "Pasta in 20 mins", "Vegan dessert ideas", "Leftover rice recipes"];
const welcome = { role: "ai", content: <><h4>👋 Hello, I'm Fusion Chef!</h4>Tell me what ingredients you have, a cuisine you're craving, or any dietary needs — I'll craft a recipe just for you.</> };


const indianCuisineData = [
  { dish_name:"Samosa", cuisine:"Indian", country_of_origin:"India", category:"Appetizers", difficulty_level:"medium", prep_time_minutes:30, cook_time_minutes:20, servings:4, ingredients:[{name:"All-purpose flour",quantity:"2",unit:"cups"},{name:"Potatoes",quantity:"3",unit:"medium"},{name:"Green peas",quantity:"0.5",unit:"cup"},{name:"Cumin seeds",quantity:"1",unit:"tsp"},{name:"Garam masala",quantity:"1",unit:"tsp"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Green chili",quantity:"2",unit:"pieces"},{name:"Oil for frying",quantity:"2",unit:"cups"}], preparation_steps:["Make a stiff dough with flour, oil, ajwain and salt. Rest for 20 minutes.","Boil and mash potatoes. Sauté with cumin, peas, ginger, chili and spices.","Roll dough into thin circles, cut in half, shape into cones and fill with potato mixture.","Seal edges with water and deep fry on medium heat until golden brown.","Serve hot with mint chutney and tamarind sauce."], chef_notes:"Ensure oil temperature is 160°C for crispy samosas. Don't overcrowd the pan.", serving_suggestions:"Serve with green chutney and tamarind chutney.", flavor_profile:["savory","spicy"], dietary_tags:["vegetarian","vegan"], img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" },
  { dish_name:"Paneer Tikka", cuisine:"Indian", country_of_origin:"India", category:"Appetizers", difficulty_level:"easy", prep_time_minutes:40, cook_time_minutes:15, servings:4, ingredients:[{name:"Paneer",quantity:"400",unit:"g"},{name:"Yogurt",quantity:"1",unit:"cup"},{name:"Tandoori masala",quantity:"2",unit:"tbsp"},{name:"Lemon juice",quantity:"2",unit:"tbsp"},{name:"Bell peppers",quantity:"2",unit:"pieces"},{name:"Onion",quantity:"1",unit:"large"},{name:"Ginger-garlic paste",quantity:"2",unit:"tbsp"},{name:"Kashmiri red chili",quantity:"1",unit:"tbsp"}], preparation_steps:["Mix yogurt, tandoori masala, lemon juice, ginger-garlic paste and Kashmiri chili.","Marinate paneer and vegetables in the mixture for at least 2 hours.","Thread onto skewers alternating paneer, peppers and onion.","Grill on high heat or broil for 10-12 minutes turning once.","Serve with sliced onions, lemon wedges and mint chutney."], chef_notes:"Use hung curd (strained yogurt) for better coating. Charred edges add authentic tandoor flavor.", serving_suggestions:"Serve as a starter with green chutney and sliced onion rings.", flavor_profile:["smoky","spicy","savory"], dietary_tags:["vegetarian","gluten-free"], img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80" },
  { dish_name:"Aloo Tikki", cuisine:"Indian", country_of_origin:"India", category:"Appetizers", difficulty_level:"easy", prep_time_minutes:20, cook_time_minutes:15, servings:4, ingredients:[{name:"Potatoes",quantity:"4",unit:"large"},{name:"Bread crumbs",quantity:"0.5",unit:"cup"},{name:"Cumin powder",quantity:"1",unit:"tsp"},{name:"Coriander leaves",quantity:"0.25",unit:"cup"},{name:"Green chili",quantity:"2",unit:"pieces"},{name:"Amchur powder",quantity:"1",unit:"tsp"},{name:"Oil",quantity:"3",unit:"tbsp"}], preparation_steps:["Boil, peel and mash potatoes until smooth.","Mix in breadcrumbs, spices, chopped coriander and green chili.","Shape into round flat patties about 1cm thick.","Shallow fry in oil on medium heat until golden and crispy on both sides.","Serve hot topped with yogurt, chutneys and sev."], chef_notes:"Ensure potatoes are completely dry before mashing to prevent soggy tikkis.", serving_suggestions:"Top with yogurt, tamarind chutney, mint chutney and crunchy sev.", flavor_profile:["savory","tangy","spicy"], dietary_tags:["vegetarian","vegan"], img:"https://images.unsplash.com/photo-1630851840633-f96999247032?w=400&q=80" },
  { dish_name:"Dahi Puri", cuisine:"Indian", country_of_origin:"India", category:"Appetizers", difficulty_level:"easy", prep_time_minutes:15, cook_time_minutes:0, servings:4, ingredients:[{name:"Puri shells",quantity:"20",unit:"pieces"},{name:"Yogurt",quantity:"2",unit:"cups"},{name:"Boiled potatoes",quantity:"2",unit:"medium"},{name:"Tamarind chutney",quantity:"4",unit:"tbsp"},{name:"Mint chutney",quantity:"4",unit:"tbsp"},{name:"Chaat masala",quantity:"1",unit:"tsp"},{name:"Sev",quantity:"0.5",unit:"cup"}], preparation_steps:["Whisk yogurt with sugar and a pinch of salt until smooth.","Make a small hole on top of each puri shell.","Fill with diced boiled potatoes and chickpeas.","Pour whisked yogurt over each puri.","Drizzle tamarind and mint chutney, sprinkle chaat masala and sev. Serve immediately."], chef_notes:"Assemble just before serving to keep puris crispy.", serving_suggestions:"Serve immediately as a chaat appetizer.", flavor_profile:["tangy","sweet","spicy","savory"], dietary_tags:["vegetarian"], img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80" },
  { dish_name:"Onion Bhaji", cuisine:"Indian", country_of_origin:"India", category:"Appetizers", difficulty_level:"easy", prep_time_minutes:10, cook_time_minutes:15, servings:4, ingredients:[{name:"Onions",quantity:"3",unit:"large"},{name:"Chickpea flour",quantity:"1",unit:"cup"},{name:"Cumin seeds",quantity:"1",unit:"tsp"},{name:"Turmeric",quantity:"0.5",unit:"tsp"},{name:"Red chili powder",quantity:"1",unit:"tsp"},{name:"Coriander leaves",quantity:"0.25",unit:"cup"},{name:"Oil for frying",quantity:"2",unit:"cups"}], preparation_steps:["Thinly slice onions and mix with salt. Let rest 5 minutes.","Add chickpea flour, spices and coriander. Mix well.","Add minimal water to form a thick batter coating the onions.","Drop spoonfuls into hot oil and fry until golden and crispy.","Drain on paper towels and serve hot."], chef_notes:"The onion releases moisture naturally — add as little water as possible for crispier bhajis.", serving_suggestions:"Serve with mint yogurt dip and a cup of masala chai.", flavor_profile:["savory","spicy","crispy"], dietary_tags:["vegetarian","vegan","gluten-free"], img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80" },
  { dish_name:"Mulligatawny Soup", cuisine:"Indian", country_of_origin:"India", category:"Soups", difficulty_level:"medium", prep_time_minutes:15, cook_time_minutes:35, servings:4, ingredients:[{name:"Red lentils",quantity:"1",unit:"cup"},{name:"Coconut milk",quantity:"1",unit:"cup"},{name:"Onion",quantity:"1",unit:"large"},{name:"Curry powder",quantity:"2",unit:"tbsp"},{name:"Apple",quantity:"1",unit:"medium"},{name:"Vegetable stock",quantity:"4",unit:"cups"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Garlic",quantity:"3",unit:"cloves"}], preparation_steps:["Sauté onion, garlic and ginger in butter until golden.","Add curry powder and cook for 1 minute until fragrant.","Add lentils, diced apple and vegetable stock. Bring to boil.","Simmer for 25 minutes until lentils are completely soft.","Blend until smooth, stir in coconut milk and adjust seasoning."], chef_notes:"The apple adds a subtle sweetness that balances the spices beautifully.", serving_suggestions:"Serve with warm naan bread and a drizzle of cream.", flavor_profile:["savory","spicy","slightly sweet"], dietary_tags:["vegetarian","vegan","gluten-free"], img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
  { dish_name:"Tomato Shorba", cuisine:"Indian", country_of_origin:"India", category:"Soups", difficulty_level:"easy", prep_time_minutes:10, cook_time_minutes:25, servings:4, ingredients:[{name:"Tomatoes",quantity:"6",unit:"large"},{name:"Onion",quantity:"1",unit:"medium"},{name:"Garlic",quantity:"4",unit:"cloves"},{name:"Cumin seeds",quantity:"1",unit:"tsp"},{name:"Black pepper",quantity:"1",unit:"tsp"},{name:"Fresh cream",quantity:"2",unit:"tbsp"},{name:"Coriander",quantity:"2",unit:"tbsp"}], preparation_steps:["Roast tomatoes and garlic in oven at 200°C for 20 minutes.","Sauté onion with cumin seeds until golden.","Blend roasted tomatoes, garlic and sautéed onion.","Strain through a fine sieve for smooth texture.","Season with black pepper, garnish with cream and coriander."], chef_notes:"Roasting the tomatoes adds a deep smoky sweetness to the soup.", serving_suggestions:"Serve in small cups as a starter with croutons.", flavor_profile:["savory","tangy","smoky"], dietary_tags:["vegetarian","gluten-free"], img:"https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&q=80" },
  { dish_name:"Dal Shorba", cuisine:"Indian", country_of_origin:"India", category:"Soups", difficulty_level:"easy", prep_time_minutes:10, cook_time_minutes:30, servings:4, ingredients:[{name:"Yellow moong dal",quantity:"1",unit:"cup"},{name:"Turmeric",quantity:"0.5",unit:"tsp"},{name:"Cumin seeds",quantity:"1",unit:"tsp"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Lemon juice",quantity:"2",unit:"tbsp"},{name:"Ghee",quantity:"2",unit:"tbsp"},{name:"Coriander",quantity:"2",unit:"tbsp"}], preparation_steps:["Wash and pressure cook moong dal with turmeric and water.","Blend into a smooth liquid and strain.","Prepare a tempering with ghee, cumin and ginger.","Add tempering to the dal broth and simmer for 5 minutes.","Finish with lemon juice and fresh coriander."], chef_notes:"This light, healing soup is perfect as a starter or for those feeling unwell.", serving_suggestions:"Serve warm in small cups with a squeeze of lemon.", flavor_profile:["savory","mild","comforting"], dietary_tags:["vegetarian","vegan","gluten-free"], img:"https://images.unsplash.com/photo-1576577445504-6af96477db52?w=400&q=80" },
  { dish_name:"Butter Chicken", cuisine:"Indian", country_of_origin:"India", category:"Main Courses", difficulty_level:"medium", prep_time_minutes:30, cook_time_minutes:40, servings:4, ingredients:[{name:"Chicken thighs",quantity:"800",unit:"g"},{name:"Butter",quantity:"4",unit:"tbsp"},{name:"Tomatoes",quantity:"4",unit:"large"},{name:"Heavy cream",quantity:"1",unit:"cup"},{name:"Kashmiri chili powder",quantity:"2",unit:"tbsp"},{name:"Garam masala",quantity:"2",unit:"tsp"},{name:"Ginger-garlic paste",quantity:"3",unit:"tbsp"},{name:"Kasuri methi",quantity:"1",unit:"tbsp"}], preparation_steps:["Marinate chicken in yogurt, kashmiri chili, ginger-garlic paste overnight.","Grill or pan-sear the chicken until charred. Set aside.","Sauté onions until golden, add tomatoes and cook until mushy.","Blend the tomato base smooth. Return to pan with butter.","Add grilled chicken, cream, kasuri methi and garam masala. Simmer 15 minutes."], chef_notes:"Kasuri methi (dried fenugreek) is the secret ingredient that gives butter chicken its distinctive flavor.", serving_suggestions:"Serve with garlic naan, basmati rice and sliced onions.", flavor_profile:["creamy","mildly spicy","savory","slightly sweet"], dietary_tags:["gluten-free"], img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80" },
  { dish_name:"Palak Paneer", cuisine:"Indian", country_of_origin:"India", category:"Main Courses", difficulty_level:"medium", prep_time_minutes:20, cook_time_minutes:25, servings:4, ingredients:[{name:"Spinach",quantity:"500",unit:"g"},{name:"Paneer",quantity:"300",unit:"g"},{name:"Onion",quantity:"2",unit:"medium"},{name:"Tomatoes",quantity:"2",unit:"medium"},{name:"Garam masala",quantity:"1",unit:"tsp"},{name:"Cream",quantity:"3",unit:"tbsp"},{name:"Ginger-garlic paste",quantity:"2",unit:"tbsp"},{name:"Ghee",quantity:"3",unit:"tbsp"}], preparation_steps:["Blanch spinach in boiling water for 2 minutes, then blend smooth.","Fry paneer cubes in ghee until golden. Set aside.","Sauté onions, add ginger-garlic paste and tomatoes until oil separates.","Add blended spinach, spices and simmer for 10 minutes.","Add fried paneer and cream. Simmer for 5 minutes and serve."], chef_notes:"Blanching and immediately cooling spinach preserves its vibrant green color.", serving_suggestions:"Serve with garlic naan or jeera rice.", flavor_profile:["earthy","creamy","savory","mildly spicy"], dietary_tags:["vegetarian","gluten-free"], img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" },
  { dish_name:"Lamb Rogan Josh", cuisine:"Indian", country_of_origin:"India", category:"Main Courses", difficulty_level:"hard", prep_time_minutes:30, cook_time_minutes:90, servings:4, ingredients:[{name:"Lamb shoulder",quantity:"800",unit:"g"},{name:"Yogurt",quantity:"1",unit:"cup"},{name:"Kashmiri chili",quantity:"3",unit:"tbsp"},{name:"Whole spices",quantity:"1",unit:"tbsp"},{name:"Onions",quantity:"3",unit:"large"},{name:"Ginger",quantity:"2",unit:"inch"},{name:"Fennel powder",quantity:"2",unit:"tsp"},{name:"Ghee",quantity:"4",unit:"tbsp"}], preparation_steps:["Marinate lamb in yogurt, chili and ginger for at least 4 hours.","In a heavy pot, fry whole spices in ghee until fragrant.","Brown the marinated lamb in batches until deeply colored.","Add sliced onions and cook until caramelized.","Add fennel, remaining spices and water. Slow cook for 1.5 hours until tender."], chef_notes:"Authentic Rogan Josh gets its deep red color from Kashmiri chilies, not tomatoes.", serving_suggestions:"Serve with Kashmiri naan and saffron rice.", flavor_profile:["deeply spiced","savory","rich","aromatic"], dietary_tags:["gluten-free"], img:"https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&q=80" },
  { dish_name:"Chicken Biryani", cuisine:"Indian", country_of_origin:"India", category:"Main Courses", difficulty_level:"hard", prep_time_minutes:45, cook_time_minutes:60, servings:6, ingredients:[{name:"Basmati rice",quantity:"3",unit:"cups"},{name:"Chicken pieces",quantity:"1",unit:"kg"},{name:"Yogurt",quantity:"1",unit:"cup"},{name:"Saffron",quantity:"0.5",unit:"tsp"},{name:"Whole spices",quantity:"2",unit:"tbsp"},{name:"Fried onions",quantity:"1",unit:"cup"},{name:"Fresh mint",quantity:"0.5",unit:"cup"},{name:"Ghee",quantity:"4",unit:"tbsp"}], preparation_steps:["Marinate chicken with yogurt, spices, fried onions and mint for 2 hours.","Parboil basmati rice with whole spices until 70% cooked.","Layer marinated chicken in a heavy-bottomed pot.","Layer parboiled rice over chicken, top with saffron milk and ghee.","Seal with dough or foil and cook on dum (slow steam) for 40 minutes."], chef_notes:"The dum cooking process (sealed slow steam) is what creates authentic biryani.", serving_suggestions:"Serve with raita, mirchi ka salan and sliced onion salad.", flavor_profile:["aromatic","savory","spiced","rich"], dietary_tags:["gluten-free"], img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80" },
  { dish_name:"Garlic Naan", cuisine:"Indian", country_of_origin:"India", category:"Breads", difficulty_level:"medium", prep_time_minutes:90, cook_time_minutes:10, servings:4, ingredients:[{name:"All-purpose flour",quantity:"3",unit:"cups"},{name:"Yeast",quantity:"2",unit:"tsp"},{name:"Yogurt",quantity:"0.5",unit:"cup"},{name:"Garlic",quantity:"6",unit:"cloves"},{name:"Butter",quantity:"4",unit:"tbsp"},{name:"Coriander leaves",quantity:"3",unit:"tbsp"},{name:"Sugar",quantity:"1",unit:"tsp"},{name:"Salt",quantity:"1",unit:"tsp"}], preparation_steps:["Mix flour, yeast, sugar, salt and yogurt. Knead into soft dough.","Let dough rise for 1 hour in a warm place until doubled.","Divide into balls, roll into oval shapes.","Cook in a very hot cast iron pan or tandoor until bubbled and slightly charred.","Brush immediately with garlic butter and fresh coriander."], chef_notes:"A cast iron skillet on high heat mimics a tandoor beautifully at home.", serving_suggestions:"Serve hot with any curry — especially butter chicken.", flavor_profile:["buttery","garlicky","slightly charred"], dietary_tags:["vegetarian"], img:"https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=80" },
  { dish_name:"Vegetable Biryani", cuisine:"Indian", country_of_origin:"India", category:"Rice Preparations", difficulty_level:"medium", prep_time_minutes:30, cook_time_minutes:45, servings:4, ingredients:[{name:"Basmati rice",quantity:"2",unit:"cups"},{name:"Mixed vegetables",quantity:"2",unit:"cups"},{name:"Whole spices",quantity:"2",unit:"tbsp"},{name:"Saffron",quantity:"0.25",unit:"tsp"},{name:"Fried onions",quantity:"0.5",unit:"cup"},{name:"Yogurt",quantity:"0.5",unit:"cup"},{name:"Ghee",quantity:"3",unit:"tbsp"},{name:"Fresh mint",quantity:"0.25",unit:"cup"}], preparation_steps:["Parboil basmati rice with whole spices until 70% done.","Sauté vegetables with yogurt and biryani masala.","Layer vegetables at bottom of pot.","Layer rice on top with saffron milk and fried onions.","Seal and cook on dum for 30 minutes on low heat."], chef_notes:"Use aged basmati rice for best results — each grain stays separate.", serving_suggestions:"Serve with raita and papad.", flavor_profile:["aromatic","mildly spiced","savory"], dietary_tags:["vegetarian","vegan","gluten-free"], img:"https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80" },
  { dish_name:"Jeera Rice", cuisine:"Indian", country_of_origin:"India", category:"Rice Preparations", difficulty_level:"easy", prep_time_minutes:10, cook_time_minutes:20, servings:4, ingredients:[{name:"Basmati rice",quantity:"2",unit:"cups"},{name:"Cumin seeds",quantity:"2",unit:"tsp"},{name:"Ghee",quantity:"2",unit:"tbsp"},{name:"Bay leaf",quantity:"2",unit:"pieces"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Water",quantity:"3.5",unit:"cups"}], preparation_steps:["Wash and soak basmati rice for 20 minutes.","Heat ghee in a pan and add cumin seeds and bay leaf.","When cumin splutters, add drained rice and sauté for 2 minutes.","Add water and salt, bring to boil.","Cover and cook on low heat for 15 minutes until done."], chef_notes:"Soaking the rice ensures each grain cooks evenly and stays long and fluffy.", serving_suggestions:"Serve with any dal or curry.", flavor_profile:["nutty","aromatic","savory"], dietary_tags:["vegetarian","vegan","gluten-free"], img:"https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80" },
  { dish_name:"Gulab Jamun", cuisine:"Indian", country_of_origin:"India", category:"Desserts", difficulty_level:"medium", prep_time_minutes:20, cook_time_minutes:30, servings:6, ingredients:[{name:"Milk powder",quantity:"1",unit:"cup"},{name:"All-purpose flour",quantity:"3",unit:"tbsp"},{name:"Sugar",quantity:"2",unit:"cups"},{name:"Rose water",quantity:"2",unit:"tbsp"},{name:"Cardamom",quantity:"4",unit:"pods"},{name:"Ghee",quantity:"2",unit:"tbsp"},{name:"Oil for frying",quantity:"2",unit:"cups"}], preparation_steps:["Make sugar syrup with water, sugar, rose water and cardamom. Simmer 5 minutes.","Mix milk powder, flour and ghee. Add enough milk to make soft dough.","Roll into smooth balls without cracks.","Deep fry on very low heat until deep brown — about 8 minutes.","Immediately drop into warm sugar syrup. Soak for at least 30 minutes."], chef_notes:"Fry on very low heat for an evenly browned center. Rushing leads to raw centers.", serving_suggestions:"Serve warm with vanilla ice cream or rabri.", flavor_profile:["sweet","floral","cardamom"], dietary_tags:["vegetarian"], img:"https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80" },
  { dish_name:"Kheer", cuisine:"Indian", country_of_origin:"India", category:"Desserts", difficulty_level:"easy", prep_time_minutes:5, cook_time_minutes:60, servings:6, ingredients:[{name:"Full fat milk",quantity:"1",unit:"litre"},{name:"Basmati rice",quantity:"0.25",unit:"cup"},{name:"Sugar",quantity:"0.5",unit:"cup"},{name:"Cardamom",quantity:"4",unit:"pods"},{name:"Saffron",quantity:"0.25",unit:"tsp"},{name:"Pistachios",quantity:"2",unit:"tbsp"},{name:"Rose water",quantity:"1",unit:"tbsp"}], preparation_steps:["Bring milk to a boil in a heavy-bottomed pan.","Add washed rice and cook on medium heat, stirring frequently.","Cook for 45-50 minutes until milk thickens and rice is fully cooked.","Add sugar, cardamom, saffron and rose water. Stir well.","Serve warm or chilled, garnished with pistachios and saffron strands."], chef_notes:"Constant stirring prevents the milk from scorching at the bottom.", serving_suggestions:"Serve chilled as a festive dessert garnished with nuts.", flavor_profile:["sweet","creamy","floral","cardamom"], dietary_tags:["vegetarian","gluten-free"], img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80" },
  { dish_name:"Masala Chai", cuisine:"Indian", country_of_origin:"India", category:"Beverages", difficulty_level:"easy", prep_time_minutes:2, cook_time_minutes:8, servings:2, ingredients:[{name:"Water",quantity:"1.5",unit:"cups"},{name:"Milk",quantity:"1",unit:"cup"},{name:"Black tea leaves",quantity:"2",unit:"tsp"},{name:"Ginger",quantity:"0.5",unit:"inch"},{name:"Cardamom pods",quantity:"3",unit:"pieces"},{name:"Cinnamon stick",quantity:"1",unit:"piece"},{name:"Black pepper",quantity:"3",unit:"pieces"},{name:"Sugar",quantity:"2",unit:"tsp"}], preparation_steps:["Lightly crush cardamom, black pepper and cinnamon with a mortar.","Bring water to boil with crushed spices and grated ginger.","Add tea leaves and simmer for 2 minutes.","Add milk and sugar, bring to a full boil.","Strain into cups and serve hot."], chef_notes:"The longer the spices steep, the more aromatic the chai. Adjust milk-to-water ratio to taste.", serving_suggestions:"Serve with paratha, samosa or biscuits.", flavor_profile:["spiced","sweet","aromatic","warming"], dietary_tags:["vegetarian","gluten-free"], img:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80" },
  { dish_name:"Mango Lassi", cuisine:"Indian", country_of_origin:"India", category:"Beverages", difficulty_level:"easy", prep_time_minutes:5, cook_time_minutes:0, servings:2, ingredients:[{name:"Ripe mangoes",quantity:"2",unit:"large"},{name:"Yogurt",quantity:"1",unit:"cup"},{name:"Milk",quantity:"0.5",unit:"cup"},{name:"Sugar",quantity:"2",unit:"tbsp"},{name:"Cardamom powder",quantity:"0.25",unit:"tsp"},{name:"Ice cubes",quantity:"6",unit:"pieces"}], preparation_steps:["Peel and chop ripe mangoes.","Blend mango with yogurt, milk, sugar and cardamom.","Add ice cubes and blend until smooth and frothy.","Pour into tall glasses.","Garnish with a small piece of mango and a pinch of cardamom."], chef_notes:"Alphonso or Kesar mangoes give the best flavor and natural sweetness.", serving_suggestions:"Serve chilled as a refreshing summer drink.", flavor_profile:["sweet","fruity","creamy","tropical"], dietary_tags:["vegetarian","gluten-free"], img:"https://images.unsplash.com/photo-1527904324834-3bda86da6771?w=400&q=80" },
];


const maharashtraCuisineData = [
  { dish_name:"Katachi Amti", state:"Maharashtra", cuisine:"Indian", category:"Soups", difficulty_level:"Medium", prep_time_minutes:15, cook_time_minutes:30, total_time_minutes:45, servings:4, short_description:"Katachi Amti is a deeply flavored, spiced lentil soup made from the water left after cooking chana dal. A staple of Maharashtrian Puran Poli meals, it is tempered with coconut, tamarind, and a unique goda masala that gives it its signature sweet-spicy depth.", ingredients:[{name:"Chana dal cooking water",quantity:"500",unit:"ml"},{name:"Goda masala",quantity:"2",unit:"tsp"},{name:"Tamarind pulp",quantity:"2",unit:"tbsp"},{name:"Jaggery",quantity:"1",unit:"tbsp"},{name:"Coconut, grated",quantity:"3",unit:"tbsp"},{name:"Mustard seeds",quantity:"1",unit:"tsp"},{name:"Curry leaves",quantity:"10",unit:"pieces"},{name:"Dried red chili",quantity:"2",unit:"pieces"},{name:"Ghee",quantity:"2",unit:"tbsp"},{name:"Turmeric",quantity:"0.5",unit:"tsp"},{name:"Salt",quantity:"1",unit:"tsp"}], preparation_steps:["Collect the water drained from cooked chana dal and keep aside.","Heat ghee in a pan and add mustard seeds. Let them splutter.","Add dried red chilies and curry leaves. Fry for 30 seconds.","Add tamarind pulp, jaggery and turmeric. Stir well.","Pour in the chana dal water and bring to a boil.","Add goda masala and grated coconut. Simmer for 15 minutes.","Adjust salt and serve hot alongside Puran Poli."], chef_notes:"Goda masala is the soul of this recipe. Do not substitute with regular garam masala as the flavor profile is completely different.", serving_suggestions:"Traditionally served as part of a Puran Poli thali. Also pairs well with plain rice and a drizzle of ghee.", nutrition_estimate:{calories:"145",protein_g:"6",carbohydrates_g:"18",fat_g:"5"}, tags:["Traditional","Vegetarian","Festival Food","Maharashtrian"], img:"/images/india/maharashtra/soups/katachi-amti-maharashtrian-soup.jpg" },
  { dish_name:"Shevgyachya Shengachi Soup", state:"Maharashtra", cuisine:"Indian", category:"Soups", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:25, total_time_minutes:35, servings:4, short_description:"A light, nutritious soup made with tender drumstick pods, tomatoes and mild spices. This humble Maharashtrian comfort soup is rich in iron and vitamins.", ingredients:[{name:"Drumstick pods",quantity:"4",unit:"pieces"},{name:"Tomatoes",quantity:"2",unit:"medium"},{name:"Onion",quantity:"1",unit:"medium"},{name:"Garlic",quantity:"4",unit:"cloves"},{name:"Cumin seeds",quantity:"1",unit:"tsp"},{name:"Black pepper",quantity:"0.5",unit:"tsp"},{name:"Turmeric",quantity:"0.25",unit:"tsp"},{name:"Oil",quantity:"1",unit:"tbsp"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Fresh coriander",quantity:"2",unit:"tbsp"}], preparation_steps:["Cut drumstick pods into 5cm pieces and boil in salted water until tender.","Sauté onion and garlic in oil with cumin seeds until golden.","Add chopped tomatoes and cook until mushy.","Add boiled drumstick pieces and 500ml water.","Simmer for 15 minutes and blend slightly for a semi-thick consistency.","Season with black pepper and salt. Garnish with coriander."], chef_notes:"Scrape the flesh from drumstick pieces while eating — the fibrous outer shell is not consumed.", serving_suggestions:"Serve as a light starter or a healthy evening soup.", nutrition_estimate:{calories:"85",protein_g:"3",carbohydrates_g:"12",fat_g:"3"}, tags:["Healthy","Vegetarian","Gluten-Free"], img:"/images/india/maharashtra/soups/shevgyachya-shengachi-maharashtrian-soup.jpg" },
  { dish_name:"Tomato Saar", state:"Maharashtra", cuisine:"Indian", category:"Soups", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:20, total_time_minutes:30, servings:4, short_description:"Tomato Saar is a thin, tangy and spiced tomato broth that is a beloved part of Maharashtrian thali. Made with ripe tomatoes, coconut milk and aromatic spices.", ingredients:[{name:"Ripe tomatoes",quantity:"500",unit:"g"},{name:"Coconut milk",quantity:"200",unit:"ml"},{name:"Garlic",quantity:"5",unit:"cloves"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Green chili",quantity:"2",unit:"pieces"},{name:"Mustard seeds",quantity:"1",unit:"tsp"},{name:"Curry leaves",quantity:"8",unit:"pieces"},{name:"Ghee",quantity:"1",unit:"tbsp"},{name:"Jaggery",quantity:"1",unit:"tsp"},{name:"Salt",quantity:"1",unit:"tsp"}], preparation_steps:["Boil tomatoes until soft and blend into a smooth puree. Strain.","Heat ghee, add mustard seeds and curry leaves.","Add crushed garlic, ginger and green chili. Sauté briefly.","Pour in tomato puree and coconut milk. Stir well.","Add jaggery and salt. Simmer for 10 minutes.","Serve piping hot as a soup or alongside rice."], chef_notes:"The jaggery balances the acidity of tomatoes. Coconut milk makes it creamy without being heavy. Use fresh coconut milk for best results.", serving_suggestions:"Serve in small cups as a starter or with steamed rice as a light meal.", nutrition_estimate:{calories:"110",protein_g:"2",carbohydrates_g:"14",fat_g:"6"}, tags:["Vegetarian","Gluten-Free","Traditional","Thali"], img:"/images/india/maharashtra/soups/tomato-saar-maharashtrian-soup.jpg" },
  { dish_name:"Kokum Saar", state:"Maharashtra", cuisine:"Indian", category:"Soups", difficulty_level:"Easy", prep_time_minutes:5, cook_time_minutes:15, total_time_minutes:20, servings:4, short_description:"Kokum Saar is a cooling, digestive soup from the Konkan coast of Maharashtra. Made with kokum, coconut milk and minimal spices, it is light, tangy and deeply refreshing.", ingredients:[{name:"Dried kokum",quantity:"8",unit:"pieces"},{name:"Coconut milk",quantity:"250",unit:"ml"},{name:"Jaggery",quantity:"1",unit:"tbsp"},{name:"Green chili",quantity:"1",unit:"piece"},{name:"Cumin powder",quantity:"0.5",unit:"tsp"},{name:"Salt",quantity:"0.5",unit:"tsp"},{name:"Fresh coriander",quantity:"1",unit:"tbsp"}], preparation_steps:["Soak kokum in 300ml warm water for 15 minutes. Squeeze and extract the juice.","Combine kokum water with coconut milk in a pan.","Add jaggery, green chili, cumin powder and salt.","Heat gently without boiling — do not boil coconut milk.","Strain and serve garnished with fresh coriander."], chef_notes:"Never boil this saar vigorously as coconut milk will split. Best served at the end of a heavy Konkan meal as a digestive.", serving_suggestions:"Serve chilled or warm as a digestive after a heavy meal. Pairs beautifully with Konkani fish curry and rice.", nutrition_estimate:{calories:"95",protein_g:"1",carbohydrates_g:"12",fat_g:"5"}, tags:["Konkan","Vegan","Digestive","Coastal Maharashtra"], img:"/images/india/maharashtra/soups/kokum-saar-maharashtrian-soup.jpg" },
  { dish_name:"Chicken Rassa", state:"Maharashtra", cuisine:"Indian", category:"Soups", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:40, total_time_minutes:60, servings:4, short_description:"Chicken Rassa is a fiery, thin-gravy chicken curry-soup from Vidarbha and Kolhapur regions. Made with a distinctive red masala base and a watery consistency, it is more soup than curry.", ingredients:[{name:"Chicken pieces",quantity:"500",unit:"g"},{name:"Onions",quantity:"2",unit:"large"},{name:"Kolhapuri masala",quantity:"3",unit:"tbsp"},{name:"Coconut, grated",quantity:"4",unit:"tbsp"},{name:"Ginger-garlic paste",quantity:"2",unit:"tbsp"},{name:"Tomato",quantity:"2",unit:"medium"},{name:"Oil",quantity:"3",unit:"tbsp"},{name:"Turmeric",quantity:"0.5",unit:"tsp"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Dry roast coconut until golden. Grind with fried onion into a paste.","Heat oil and fry ginger-garlic paste until raw smell disappears.","Add tomatoes and cook until oil separates.","Add Kolhapuri masala and coconut-onion paste. Fry for 5 minutes.","Add chicken pieces and coat well in masala.","Add 600ml water and bring to boil. Simmer 30 minutes until chicken is cooked.","The consistency should be thin and watery. Adjust salt."], chef_notes:"Rassa means thin gravy in Marathi. Resist the urge to thicken it — the thin spicy broth is what makes it authentic.", serving_suggestions:"Serve hot with jowar bhakri or rice. Best eaten by dipping bhakri directly into the rassa.", nutrition_estimate:{calories:"245",protein_g:"22",carbohydrates_g:"8",fat_g:"14"}, tags:["Non-Vegetarian","Kolhapuri","Spicy","Traditional"], img:"/images/india/maharashtra/soups/chicken-rassa-maharashtra-soup.jpg" },
  { dish_name:"Pithla Soup", state:"Maharashtra", cuisine:"Indian", category:"Soups", difficulty_level:"Easy", prep_time_minutes:5, cook_time_minutes:15, total_time_minutes:20, servings:4, short_description:"A thin, liquid version of the beloved Pithla — made with besan (chickpea flour), onions, and spices. This runny comforting soup is a weekday staple in Maharashtrian homes.", ingredients:[{name:"Besan (chickpea flour)",quantity:"4",unit:"tbsp"},{name:"Onion",quantity:"1",unit:"medium"},{name:"Green chili",quantity:"2",unit:"pieces"},{name:"Mustard seeds",quantity:"1",unit:"tsp"},{name:"Turmeric",quantity:"0.25",unit:"tsp"},{name:"Asafoetida",quantity:"1",unit:"pinch"},{name:"Oil",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Fresh coriander",quantity:"2",unit:"tbsp"}], preparation_steps:["Mix besan with 600ml water and whisk until smooth with no lumps.","Heat oil and add mustard seeds, asafoetida.","Add sliced onion and green chili. Sauté until translucent.","Add turmeric and pour in the besan water. Stir continuously.","Cook on medium heat stirring constantly until slightly thickened.","Season with salt and garnish with fresh coriander."], chef_notes:"Keep stirring to avoid lumps forming. For a richer version, add a dollop of ghee at the end and a squeeze of lemon juice.", serving_suggestions:"Serve with jowar or bajra bhakri and raw onion salad.", nutrition_estimate:{calories:"120",protein_g:"5",carbohydrates_g:"14",fat_g:"5"}, tags:["Vegetarian","Vegan","Quick","Village Maharashtra"], img:"/images/india/maharashtra/soups/pitla-maharashtra-soup.jpeg" },
  { dish_name:"Mutton Rassa", state:"Maharashtra", cuisine:"Indian", category:"Soups", difficulty_level:"Hard", prep_time_minutes:30, cook_time_minutes:90, total_time_minutes:120, servings:4, short_description:"A robust, spice-forward thin mutton broth from Kolhapur. Slow-cooked with bone-in mutton, Kolhapuri masala and roasted coconut, this is a deeply satisfying soup.", ingredients:[{name:"Bone-in mutton",quantity:"600",unit:"g"},{name:"Onions",quantity:"3",unit:"large"},{name:"Kolhapuri masala",quantity:"4",unit:"tbsp"},{name:"Grated coconut",quantity:"5",unit:"tbsp"},{name:"Ginger-garlic paste",quantity:"3",unit:"tbsp"},{name:"Oil",quantity:"4",unit:"tbsp"},{name:"Whole spices",quantity:"1",unit:"tbsp"},{name:"Salt",quantity:"2",unit:"tsp"}], preparation_steps:["Dry roast coconut and grind with fried onion to a fine paste.","Heat oil, fry whole spices, then add ginger-garlic paste.","Add mutton and brown on high heat for 10 minutes.","Add Kolhapuri masala and coconut-onion paste. Fry 5 minutes.","Add 1 litre water, bring to boil and pressure cook for 4 whistles.","Open, adjust seasoning. Broth should be thin and deeply red.","Simmer uncovered for 10 minutes to intensify flavor."], chef_notes:"Bone-in mutton is essential — the marrow enriches the broth. The rassa should be pourable, not thick.", serving_suggestions:"Serve with jowar bhakri or tandlachi bhakri and a raw onion-chili relish.", nutrition_estimate:{calories:"310",protein_g:"28",carbohydrates_g:"9",fat_g:"18"}, tags:["Non-Vegetarian","Kolhapuri","Spicy","Weekend Special"], img:"/images/india/maharashtra/soups/Mutton-rassa-maharashtra-soup.jpeg" },
  { dish_name:"Aamti Dal", state:"Maharashtra", cuisine:"Indian", category:"Soups", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:25, total_time_minutes:35, servings:4, short_description:"Aamti is a thin, soupy toor dal preparation that is the backbone of the everyday Maharashtrian thali. Tempered with mustard, asafoetida and goda masala.", ingredients:[{name:"Toor dal",quantity:"200",unit:"g"},{name:"Tamarind pulp",quantity:"2",unit:"tbsp"},{name:"Jaggery",quantity:"1",unit:"tbsp"},{name:"Goda masala",quantity:"1.5",unit:"tsp"},{name:"Mustard seeds",quantity:"1",unit:"tsp"},{name:"Asafoetida",quantity:"1",unit:"pinch"},{name:"Curry leaves",quantity:"10",unit:"pieces"},{name:"Ghee",quantity:"2",unit:"tbsp"},{name:"Turmeric",quantity:"0.5",unit:"tsp"},{name:"Salt",quantity:"1",unit:"tsp"}], preparation_steps:["Pressure cook toor dal with turmeric until completely soft.","Mash dal and thin with water to a pouring consistency.","Heat ghee in a pan. Add mustard seeds and asafoetida.","Add curry leaves, tamarind, jaggery and goda masala.","Pour in the dal and simmer for 10 minutes.","Adjust sweet-sour balance with more jaggery or tamarind.","Serve hot with a fresh drizzle of ghee."], chef_notes:"Goda masala is what separates Maharashtrian aamti from other dals. The consistency should be thinner than regular dal — almost drinkable.", serving_suggestions:"Serve with steamed rice, ghee and papad as part of a traditional Maharashtrian thali.", nutrition_estimate:{calories:"195",protein_g:"9",carbohydrates_g:"28",fat_g:"6"}, tags:["Vegetarian","Everyday","Thali","Traditional"], img:"/images/india/maharashtra/soups/amti-dal-maharashtra-soup.jpeg" },
  { dish_name:"Varan", state:"Maharashtra", cuisine:"Indian", category:"Soups", difficulty_level:"Easy", prep_time_minutes:5, cook_time_minutes:20, total_time_minutes:25, servings:4, short_description:"Varan is the simplest, most comforting dal preparation in Maharashtra — plain cooked toor dal with turmeric, tempered minimally with ghee. Pure, clean soul food.", ingredients:[{name:"Toor dal",quantity:"200",unit:"g"},{name:"Turmeric",quantity:"0.5",unit:"tsp"},{name:"Ghee",quantity:"3",unit:"tbsp"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Lemon juice",quantity:"1",unit:"tbsp"}], preparation_steps:["Wash toor dal and pressure cook with turmeric and water.","Mash cooked dal until smooth.","Thin down with hot water to a pourable consistency.","Season with salt and lemon juice.","Drizzle generously with ghee before serving."], chef_notes:"Varan is intentionally simple — the ghee is what makes it extraordinary. Use the best quality ghee you can find.", serving_suggestions:"Serve over hot steamed rice with a generous pool of ghee. Often served at Ganesh Chaturthi naivedyam.", nutrition_estimate:{calories:"185",protein_g:"9",carbohydrates_g:"24",fat_g:"7"}, tags:["Vegetarian","Festival Food","Sattvic","Simple"], img:"/images/india/maharashtra/soups/varan-maharashtra-soup.jpg" },
  { dish_name:"Bharli Vangi Shorba", state:"Maharashtra", cuisine:"Indian", category:"Soups", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:30, total_time_minutes:50, servings:4, short_description:"A modern Maharashtrian restaurant-style soup inspired by the classic Bharli Vangi. Roasted brinjal blended with peanut-coconut masala creates a smoky, rich and velvety soup.", ingredients:[{name:"Small brinjals",quantity:"6",unit:"pieces"},{name:"Peanuts, roasted",quantity:"3",unit:"tbsp"},{name:"Coconut, grated",quantity:"3",unit:"tbsp"},{name:"Onion",quantity:"1",unit:"large"},{name:"Goda masala",quantity:"1",unit:"tsp"},{name:"Tamarind",quantity:"1",unit:"tbsp"},{name:"Oil",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"1",unit:"tsp"}], preparation_steps:["Roast brinjals directly on flame until charred. Peel and set aside.","Dry roast coconut and peanuts together until golden.","Sauté onion until caramelized, add goda masala.","Blend roasted brinjal, coconut, peanuts, onion and tamarind with water.","Strain for smooth consistency. Heat gently.","Season and serve garnished with a drizzle of roasted peanut oil."], chef_notes:"Charring the brinjal on an open flame is non-negotiable for the authentic smoky flavor that defines this soup.", serving_suggestions:"Serve in small cups as an elegant starter at dinner parties.", nutrition_estimate:{calories:"165",protein_g:"5",carbohydrates_g:"16",fat_g:"9"}, tags:["Vegetarian","Smoky","Modern Maharashtrian","Restaurant Style"], img:"/images/india/maharashtra/soups/Bharli-Vangi-shorba-maharashtra-soup.jpg" },
  { dish_name:"Vada Pav", state:"Maharashtra", cuisine:"Indian", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:30, cook_time_minutes:20, total_time_minutes:50, servings:4, short_description:"Maharashtra's most iconic street food — a spiced potato vada encased in a crispy besan batter, served inside a soft pav with dry garlic chutney and green chutney. Known as Mumbai's burger.", ingredients:[{name:"Potatoes",quantity:"4",unit:"large"},{name:"Besan",quantity:"1",unit:"cup"},{name:"Pav buns",quantity:"4",unit:"pieces"},{name:"Dry garlic chutney",quantity:"4",unit:"tbsp"},{name:"Green chutney",quantity:"4",unit:"tbsp"},{name:"Mustard seeds",quantity:"1",unit:"tsp"},{name:"Turmeric",quantity:"0.5",unit:"tsp"},{name:"Green chili",quantity:"3",unit:"pieces"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Oil for frying",quantity:"2",unit:"cups"}], preparation_steps:["Boil and mash potatoes. Temper with mustard seeds, curry leaves, turmeric, ginger and green chili.","Shape into round balls.","Make besan batter with turmeric, red chili and salt. Consistency should coat a spoon.","Dip each potato ball in batter and deep fry until golden and crispy.","Slit pav buns and apply dry garlic chutney on one side, green chutney on the other.","Place hot vada inside pav and serve immediately with fried green chili."], chef_notes:"The dry garlic chutney is the secret weapon of vada pav. Roasted garlic, coconut and chili ground together — it must be fresh and coarse, not a paste.", serving_suggestions:"Serve with dry garlic chutney, green chutney and a fried green chili on the side.", nutrition_estimate:{calories:"385",protein_g:"9",carbohydrates_g:"52",fat_g:"16"}, tags:["Street Food","Vegetarian","Mumbai","Iconic"], img:"/images/india/maharashtra/appetizers/vadapav-maharashtra-appetizer.jpg" },
  { dish_name:"Misal Pav", state:"Maharashtra", cuisine:"Indian", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:35, total_time_minutes:55, servings:4, short_description:"Misal Pav is a fiery sprouted moth bean curry topped with farsan, onion, tomato and lemon juice, served alongside buttered pav. This beloved Maharashtrian breakfast is a glorious explosion of textures.", ingredients:[{name:"Sprouted moth beans (matki)",quantity:"300",unit:"g"},{name:"Pav buns",quantity:"8",unit:"pieces"},{name:"Onion",quantity:"2",unit:"medium"},{name:"Tomato",quantity:"2",unit:"medium"},{name:"Misal masala",quantity:"3",unit:"tbsp"},{name:"Farsan/sev",quantity:"1",unit:"cup"},{name:"Coconut, grated",quantity:"3",unit:"tbsp"},{name:"Oil",quantity:"3",unit:"tbsp"},{name:"Lemon juice",quantity:"2",unit:"tbsp"},{name:"Coriander",quantity:"3",unit:"tbsp"}], preparation_steps:["Cook sprouted matki until just tender but not mushy.","Dry roast coconut and grind with fried onion.","Heat oil, add onion-tomato masala with misal masala.","Add cooked matki and 300ml water. Simmer 20 minutes.","The curry (kat) should be thin and fiery.","Serve in a bowl. Top with farsan, raw onion, tomato, coriander and lemon juice.","Serve buttered pav on the side."], chef_notes:"Misal has regional variations — Pune misal is spicier, Nasik misal is sweeter. The kat (spicy gravy) is what makes it great. The farsan must be added just before serving.", serving_suggestions:"Serve with buttered pav, fresh onion, lemon and extra farsan on the side.", nutrition_estimate:{calories:"420",protein_g:"15",carbohydrates_g:"58",fat_g:"16"}, tags:["Street Food","Breakfast","Spicy","Vegetarian"], img:"/images/india/maharashtra/appetizers/misal-pav-maharashtra-appetizer.jpg" },
  { dish_name:"Kanda Bhaji", state:"Maharashtra", cuisine:"Indian", category:"Appetizers", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:15, total_time_minutes:25, servings:4, short_description:"Kanda Bhaji are irresistibly crispy onion fritters — a Maharashtrian monsoon staple. Thinly sliced onions coated in spiced besan batter and deep fried until golden.", ingredients:[{name:"Onions",quantity:"3",unit:"large"},{name:"Besan",quantity:"1",unit:"cup"},{name:"Rice flour",quantity:"3",unit:"tbsp"},{name:"Green chili",quantity:"3",unit:"pieces"},{name:"Coriander leaves",quantity:"3",unit:"tbsp"},{name:"Red chili powder",quantity:"1",unit:"tsp"},{name:"Ajwain",quantity:"0.5",unit:"tsp"},{name:"Oil for frying",quantity:"2",unit:"cups"},{name:"Salt",quantity:"1",unit:"tsp"}], preparation_steps:["Thinly slice onions and mix with salt. Let rest 5 minutes to release moisture.","Add besan, rice flour, green chili, coriander, chili powder and ajwain.","Mix well. The onion moisture should be enough — add minimal water.","Drop spoonfuls into hot oil and fry on medium heat.","Fry until deeply golden and crispy. Drain on paper.","Serve immediately while hot and crispy."], chef_notes:"Rice flour is the secret to extra crispiness. Adding too much water makes the bhaji heavy. The natural moisture of salted onions is usually sufficient.", serving_suggestions:"Serve with green chutney and a cup of cutting chai on a rainy day.", nutrition_estimate:{calories:"280",protein_g:"7",carbohydrates_g:"32",fat_g:"14"}, tags:["Monsoon Snack","Street Food","Vegetarian","Tea Time"], img:"/images/india/maharashtra/appetizers/kanda-bhaji-maharashtra-appetizer.jpg" },
  { dish_name:"Sabudana Vada", state:"Maharashtra", cuisine:"Indian", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:240, cook_time_minutes:20, total_time_minutes:260, servings:4, short_description:"Sabudana Vada are crispy shallow-fried patties made with soaked tapioca pearls, mashed potato and roasted peanuts. A popular Maharashtrian fasting food and monsoon snack.", ingredients:[{name:"Sabudana (tapioca pearls)",quantity:"250",unit:"g"},{name:"Potatoes",quantity:"2",unit:"medium"},{name:"Roasted peanuts, coarsely ground",quantity:"0.5",unit:"cup"},{name:"Green chili",quantity:"3",unit:"pieces"},{name:"Cumin seeds",quantity:"1",unit:"tsp"},{name:"Lemon juice",quantity:"1",unit:"tbsp"},{name:"Coriander",quantity:"3",unit:"tbsp"},{name:"Rock salt",quantity:"1",unit:"tsp"},{name:"Oil for frying",quantity:"4",unit:"tbsp"}], preparation_steps:["Soak sabudana in minimal water for 4 hours until pearls are soft but not mushy.","Boil and mash potatoes until smooth.","Mix sabudana, potato, peanuts, green chili, cumin, lemon and coriander.","Shape into round flat patties.","Shallow fry in oil on medium heat until golden and crispy on both sides.","Serve hot with green chutney and yogurt."], chef_notes:"The key is the correct sabudana soak — it should be just soft enough to press, not wet and sticky. Drain any excess water before mixing.", serving_suggestions:"Serve with green chutney and sweetened yogurt. Perfect for fasting days.", nutrition_estimate:{calories:"310",protein_g:"7",carbohydrates_g:"48",fat_g:"11"}, tags:["Fasting Food","Vegetarian","Gluten-Free","Street Food"], img:"/images/india/maharashtra/appetizers/sabudana-vada-maharashtra-appetizer.jpg" },
  { dish_name:"Kanda Poha", state:"Maharashtra", cuisine:"Indian", category:"Appetizers", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:15, total_time_minutes:25, servings:4, short_description:"Kanda Poha is Maharashtra's quintessential breakfast — flattened rice tossed with sautéed onions, mustard, turmeric and curry leaves, finished with fresh coconut, coriander and lemon.", ingredients:[{name:"Thick poha (flattened rice)",quantity:"300",unit:"g"},{name:"Onion",quantity:"2",unit:"medium"},{name:"Green chili",quantity:"2",unit:"pieces"},{name:"Mustard seeds",quantity:"1",unit:"tsp"},{name:"Turmeric",quantity:"0.5",unit:"tsp"},{name:"Curry leaves",quantity:"10",unit:"pieces"},{name:"Grated coconut",quantity:"3",unit:"tbsp"},{name:"Lemon juice",quantity:"2",unit:"tbsp"},{name:"Oil",quantity:"3",unit:"tbsp"},{name:"Coriander",quantity:"3",unit:"tbsp"},{name:"Sugar",quantity:"1",unit:"tsp"}], preparation_steps:["Wash poha in a sieve until just moistened. Do not over-soak.","Heat oil, add mustard seeds, curry leaves and green chili.","Add sliced onion and fry until translucent.","Add turmeric and poha. Toss gently on low heat.","Add sugar and salt. Mix carefully.","Remove from heat. Add lemon juice, coconut and coriander.","Serve warm topped with sev and fresh pomegranate seeds (optional)."], chef_notes:"The poha should be moist but not wet. Each grain must be separate. Adding a small amount of sugar balances the lemon acidity — a signature Maharashtrian touch.", serving_suggestions:"Serve warm for breakfast with a cup of cutting chai.", nutrition_estimate:{calories:"285",protein_g:"5",carbohydrates_g:"48",fat_g:"8"}, tags:["Breakfast","Vegetarian","Quick","Street Food"], img:"/images/india/maharashtra/appetizers/pohe-maharashtra-appetizer.jpg" },
  { dish_name:"Thalipeeth", state:"Maharashtra", cuisine:"Indian", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:15, cook_time_minutes:20, total_time_minutes:35, servings:4, short_description:"Thalipeeth is a savory multigrain Maharashtrian pancake made from bhajani flour — roasted rice, wheat, jowar, bajra and lentils. Spiced with onion, coriander and chilies.", ingredients:[{name:"Bhajani flour (multigrain blend)",quantity:"300",unit:"g"},{name:"Onion",quantity:"2",unit:"medium"},{name:"Green chili",quantity:"3",unit:"pieces"},{name:"Coriander leaves",quantity:"4",unit:"tbsp"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"},{name:"Cumin seeds",quantity:"1",unit:"tsp"},{name:"Oil",quantity:"4",unit:"tbsp"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Mix bhajani flour with finely chopped onion, green chili, coriander, sesame and cumin.","Add salt and enough water to make a soft pliable dough.","Grease a wet cloth or plastic sheet. Place a ball of dough on it.","Pat into a thin round circle with wet fingers.","Make a small hole in the center and cook on a hot griddle.","Drizzle oil around edges and cook on both sides until crispy and golden.","Serve hot with fresh white butter or yogurt."], chef_notes:"Bhajani flour is the heart of thalipeeth. You can make it by roasting jowar, bajra, rice, chana dal, urad dal and wheat together and grinding coarsely.", serving_suggestions:"Serve with loni (homemade white butter) or fresh yogurt and pickle.", nutrition_estimate:{calories:"295",protein_g:"9",carbohydrates_g:"42",fat_g:"10"}, tags:["Breakfast","Vegetarian","Multigrain","Traditional"], img:"/images/india/maharashtra/appetizers/thalipeeth-maharashtra-appetizer.jpg" },
  { dish_name:"Batata Vada", state:"Maharashtra", cuisine:"Indian", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:20, total_time_minutes:40, servings:4, short_description:"The soul of Vada Pav — a perfectly spiced potato ball encased in a thin, crispy besan batter and deep fried until golden. On its own, it is a spectacular snack.", ingredients:[{name:"Potatoes",quantity:"4",unit:"large"},{name:"Besan",quantity:"1",unit:"cup"},{name:"Mustard seeds",quantity:"1",unit:"tsp"},{name:"Curry leaves",quantity:"10",unit:"pieces"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Green chili",quantity:"3",unit:"pieces"},{name:"Turmeric",quantity:"0.75",unit:"tsp"},{name:"Oil for frying",quantity:"2",unit:"cups"},{name:"Lemon juice",quantity:"1",unit:"tbsp"}], preparation_steps:["Boil, peel and mash potatoes until smooth.","Temper mustard seeds, curry leaves, ginger and green chili in oil.","Mix tempering into mashed potato with turmeric and lemon. Form balls.","Make besan batter with turmeric, red chili, salt and water.","Dip each potato ball in batter and deep fry until golden.","Serve hot with green chutney and dry garlic chutney."], chef_notes:"The batter should coat the vada thinly — too thick and it becomes doughy. A pinch of baking soda in the batter keeps it light and crispy.", serving_suggestions:"Serve with dry garlic-coconut chutney, tamarind chutney and green coriander chutney.", nutrition_estimate:{calories:"295",protein_g:"8",carbohydrates_g:"38",fat_g:"13"}, tags:["Street Food","Vegetarian","Mumbai","Crispy"], img:"/images/india/maharashtra/appetizers/batata-vada-maharashtra-appetizer.jpg" },
  { dish_name:"Chakli", state:"Maharashtra", cuisine:"Indian", category:"Appetizers", difficulty_level:"Hard", prep_time_minutes:30, cook_time_minutes:30, total_time_minutes:60, servings:8, short_description:"Chakli is Maharashtra's most beloved festive snack — spiral-shaped savory crackers made from rice flour and spices, deep fried to a perfect crunchy golden finish. A Diwali staple.", ingredients:[{name:"Rice flour",quantity:"300",unit:"g"},{name:"Urad dal flour",quantity:"100",unit:"g"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"},{name:"Cumin seeds",quantity:"1",unit:"tsp"},{name:"Butter",quantity:"2",unit:"tbsp"},{name:"Red chili powder",quantity:"1.5",unit:"tsp"},{name:"Asafoetida",quantity:"0.5",unit:"tsp"},{name:"Oil for frying",quantity:"3",unit:"cups"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Mix rice flour, urad flour, sesame, cumin, chili, asafoetida, butter and salt.","Add warm water gradually and knead into a firm smooth dough.","Fill chakli press with dough and press into spiral shapes on a flat surface.","Heat oil to 160°C. Slide chakli into oil carefully.","Fry on medium heat until golden and crispy — about 4 minutes per batch.","Drain and cool completely before storing in airtight container."], chef_notes:"The oil temperature must be consistent — too hot and chakli browns too quickly, too low and it absorbs oil. Adding butter to the dough creates that melt-in-mouth texture.", serving_suggestions:"Serve as a festive snack during Diwali or store in airtight containers for up to 2 weeks.", nutrition_estimate:{calories:"185",protein_g:"3",carbohydrates_g:"24",fat_g:"9"}, tags:["Diwali","Festive","Vegetarian","Crispy Snack"], img:"/images/india/maharashtra/appetizers/chakali-maharashtra-appetizer.jpg" },
  { dish_name:"Kothimbir Vadi", state:"Maharashtra", cuisine:"Indian", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:30, total_time_minutes:50, servings:4, short_description:"Kothimbir Vadi are steamed and shallow-fried savory cakes made with generous amounts of fresh coriander and besan. A beloved Maharashtrian tea-time snack.", ingredients:[{name:"Fresh coriander",quantity:"200",unit:"g"},{name:"Besan",quantity:"200",unit:"g"},{name:"Green chili",quantity:"3",unit:"pieces"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Roasted peanut powder",quantity:"3",unit:"tbsp"},{name:"Cumin seeds",quantity:"1",unit:"tsp"},{name:"Oil",quantity:"4",unit:"tbsp"},{name:"Salt",quantity:"1",unit:"tsp"}], preparation_steps:["Finely chop coriander and mix with besan, green chili, ginger, sesame, peanut powder, cumin and salt.","Add very little water to make a thick dough-like mixture.","Grease a plate and spread mixture evenly 1cm thick.","Steam for 15-20 minutes until set and cooked through.","Cool completely and cut into diamond or square shapes.","Shallow fry in oil until golden and crispy on all sides.","Serve hot with green chutney."], chef_notes:"Steaming before frying creates the unique two-texture experience. Do not skip the steaming step or the inside will remain raw.", serving_suggestions:"Serve with green coriander chutney and a cup of masala chai.", nutrition_estimate:{calories:"220",protein_g:"9",carbohydrates_g:"24",fat_g:"10"}, tags:["Tea Time","Vegetarian","Traditional","Steamed and Fried"], img:"/images/india/maharashtra/appetizers/kothimbir-vadi-maharashtra-appetizer.jpg" },
  { dish_name:"Bharli Mirchi", state:"Maharashtra", cuisine:"Indian", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:25, cook_time_minutes:15, total_time_minutes:40, servings:4, short_description:"Large green chilies stuffed with a tangy besan-peanut-coconut filling and shallow fried until blistered. A popular Maharashtrian appetizer with perfect balance of heat, tang and nuttiness.", ingredients:[{name:"Large green chilies (Bhavnagri)",quantity:"8",unit:"pieces"},{name:"Besan",quantity:"3",unit:"tbsp"},{name:"Roasted peanut powder",quantity:"3",unit:"tbsp"},{name:"Grated coconut",quantity:"2",unit:"tbsp"},{name:"Tamarind paste",quantity:"1",unit:"tbsp"},{name:"Jaggery",quantity:"1",unit:"tsp"},{name:"Coriander",quantity:"2",unit:"tbsp"},{name:"Oil",quantity:"3",unit:"tbsp"},{name:"Salt",quantity:"1",unit:"tsp"}], preparation_steps:["Dry roast besan until fragrant and golden.","Mix roasted besan with peanut powder, coconut, tamarind, jaggery, coriander and salt.","Slit chilies lengthwise and remove seeds partially.","Fill each chili with the besan-peanut mixture.","Heat oil in a pan and place stuffed chilies.","Cover and cook on low heat for 8-10 minutes, turning once.","Serve hot as appetizer or side dish."], chef_notes:"Use Bhavnagri or any large mild-to-medium green chili. Removing the seeds reduces heat. The tamarind-jaggery in the filling creates a perfect sweet-sour-spicy balance.", serving_suggestions:"Serve as a side with dal-rice or as an appetizer before the main meal.", nutrition_estimate:{calories:"175",protein_g:"6",carbohydrates_g:"14",fat_g:"11"}, tags:["Vegetarian","Spicy","Traditional","Side Dish"], img:"/images/india/maharashtra/appetizers/bharli-mirch-maharashtra-appetizer.jpg" },
  { dish_name:"Mumbai Bhel Puri", state:"Maharashtra", cuisine:"Indian", category:"Appetizers", difficulty_level:"Easy", prep_time_minutes:15, cook_time_minutes:0, total_time_minutes:15, servings:4, short_description:"Mumbai Bhel Puri is the city's most iconic street snack — a dazzling mix of puffed rice, sev, vegetables, chutneys and spices. Assembled in seconds on the beach or street corner.", ingredients:[{name:"Puffed rice (kurmura)",quantity:"300",unit:"g"},{name:"Fine sev",quantity:"100",unit:"g"},{name:"Boiled potatoes, diced",quantity:"2",unit:"medium"},{name:"Onion, finely chopped",quantity:"1",unit:"medium"},{name:"Tomato, finely chopped",quantity:"1",unit:"medium"},{name:"Tamarind chutney",quantity:"4",unit:"tbsp"},{name:"Green chutney",quantity:"3",unit:"tbsp"},{name:"Chaat masala",quantity:"1",unit:"tsp"},{name:"Lemon juice",quantity:"2",unit:"tbsp"},{name:"Raw mango, grated",quantity:"2",unit:"tbsp"},{name:"Coriander",quantity:"3",unit:"tbsp"}], preparation_steps:["In a large bowl combine puffed rice, potatoes, onion, tomato, raw mango.","Add both chutneys and chaat masala.","Add lemon juice and coriander.","Toss quickly and well.","Top with sev generously.","Serve immediately — bhel must be eaten within minutes."], chef_notes:"Speed is essential — bhel goes soggy quickly. Assemble and eat immediately. The raw mango adds the authentic Mumbai bhel tang.", serving_suggestions:"Serve immediately in paper cones or cups as a snack.", nutrition_estimate:{calories:"280",protein_g:"6",carbohydrates_g:"52",fat_g:"6"}, tags:["Street Food","Vegetarian","Mumbai","Chaat"], img:"/images/india/maharashtra/appetizers/mumbai-bhel-puri-maharashtra-appetizer.jpg" },
  { dish_name:"Kachumber", state:"Maharashtra", cuisine:"Indian", category:"Salads", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:0, total_time_minutes:10, servings:4, short_description:"Kachumber is Maharashtra's essential salad — a refreshing mix of finely diced cucumber, tomato, onion, coriander and lemon juice. Served with almost every Maharashtrian meal.", ingredients:[{name:"Cucumber",quantity:"2",unit:"medium"},{name:"Tomato",quantity:"2",unit:"medium"},{name:"Onion",quantity:"1",unit:"medium"},{name:"Green chili",quantity:"1",unit:"piece"},{name:"Fresh coriander",quantity:"3",unit:"tbsp"},{name:"Lemon juice",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"0.5",unit:"tsp"},{name:"Roasted cumin powder",quantity:"0.5",unit:"tsp"}], preparation_steps:["Finely dice cucumber, tomato and onion into even small pieces.","Finely chop green chili and coriander.","Combine all ingredients in a bowl.","Add lemon juice, salt and roasted cumin powder.","Toss well and serve immediately."], chef_notes:"Always cut kachumber just before serving — it releases water and becomes watery if left too long. The roasted cumin powder adds a wonderful depth.", serving_suggestions:"Serve alongside any Maharashtrian curry, dal-rice, or grilled meats.", nutrition_estimate:{calories:"45",protein_g:"2",carbohydrates_g:"9",fat_g:"0"}, tags:["Salad","Vegetarian","Vegan","Gluten-Free","Everyday"], img:"/images/india/maharashtra/salads/kachumber-maharashtra-salad.jpg" },
  { dish_name:"Moodyachi Usal Salad", state:"Maharashtra", cuisine:"Indian", category:"Salads", difficulty_level:"Easy", prep_time_minutes:240, cook_time_minutes:5, total_time_minutes:245, servings:4, short_description:"A refreshing and protein-rich salad made with home-sprouted moong beans tossed with lemon, fresh coconut, coriander and minimal spices. A daily health ritual in many Maharashtrian homes.", ingredients:[{name:"Sprouted moong beans",quantity:"300",unit:"g"},{name:"Fresh coconut, grated",quantity:"3",unit:"tbsp"},{name:"Lemon juice",quantity:"2",unit:"tbsp"},{name:"Green chili",quantity:"1",unit:"piece"},{name:"Ginger",quantity:"0.5",unit:"inch"},{name:"Fresh coriander",quantity:"3",unit:"tbsp"},{name:"Salt",quantity:"0.5",unit:"tsp"},{name:"Mustard seeds",quantity:"0.5",unit:"tsp"},{name:"Oil",quantity:"1",unit:"tsp"}], preparation_steps:["Steam sprouted moong lightly for 3-4 minutes until just cooked but still crunchy.","Prepare a quick tempering with mustard seeds in oil.","Toss moong sprouts with coconut, lemon, green chili, ginger and coriander.","Add tempering and salt.","Mix well and serve at room temperature or slightly warm."], chef_notes:"Do not overcook the sprouts — they should retain their crunch. This salad is best eaten fresh as the sprouts soften over time.", serving_suggestions:"Serve as a starter, healthy snack or alongside a light lunch.", nutrition_estimate:{calories:"130",protein_g:"8",carbohydrates_g:"18",fat_g:"3"}, tags:["Healthy","Protein-Rich","Vegan","Gluten-Free"], img:"/images/india/maharashtra/salads/moodyachi-usal-salad-maharashtra.jpg" },
  { dish_name:"Kakdi Koshimbir", state:"Maharashtra", cuisine:"Indian", category:"Salads", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:0, total_time_minutes:10, servings:4, short_description:"A beloved Maharashtrian cucumber salad dressed with fresh yogurt, grated coconut, roasted peanuts and a mustard tempering. Cooling, creamy and the perfect accompaniment to any spicy Maharashtrian meal.", ingredients:[{name:"Cucumber",quantity:"2",unit:"large"},{name:"Yogurt",quantity:"4",unit:"tbsp"},{name:"Grated coconut",quantity:"3",unit:"tbsp"},{name:"Roasted peanuts, crushed",quantity:"3",unit:"tbsp"},{name:"Green chili",quantity:"1",unit:"piece"},{name:"Mustard seeds",quantity:"0.5",unit:"tsp"},{name:"Oil",quantity:"1",unit:"tsp"},{name:"Salt",quantity:"0.5",unit:"tsp"},{name:"Coriander",quantity:"2",unit:"tbsp"}], preparation_steps:["Peel and finely dice or grate cucumber. Squeeze out excess water.","Mix cucumber with yogurt, coconut and peanuts.","Add green chili, coriander and salt.","Prepare mustard seed tempering and add to salad.","Toss well and serve chilled."], chef_notes:"Squeezing water out of cucumber is important — otherwise the salad becomes watery. Add peanuts just before serving for crunch.", serving_suggestions:"Serve alongside spicy Maharashtrian curries as a cooling side.", nutrition_estimate:{calories:"95",protein_g:"4",carbohydrates_g:"10",fat_g:"5"}, tags:["Salad","Vegetarian","Cooling","Gluten-Free"], img:"/images/india/maharashtra/salads/kakdi-koshimbir-maharashtra.jpg" },
  { dish_name:"Gajar Koshimbir", state:"Maharashtra", cuisine:"Indian", category:"Salads", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:0, total_time_minutes:10, servings:4, short_description:"A bright and sweet Maharashtrian carrot salad made with grated raw carrots, coconut, peanuts and a light lemon dressing. Simple, sweet, crunchy and incredibly quick to make.", ingredients:[{name:"Carrots",quantity:"3",unit:"large"},{name:"Grated coconut",quantity:"3",unit:"tbsp"},{name:"Crushed peanuts",quantity:"2",unit:"tbsp"},{name:"Green chili",quantity:"1",unit:"piece"},{name:"Lemon juice",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"0.5",unit:"tsp"},{name:"Sugar",quantity:"0.25",unit:"tsp"},{name:"Coriander",quantity:"2",unit:"tbsp"},{name:"Mustard tempering",quantity:"1",unit:"tsp"}], preparation_steps:["Peel and finely grate the carrots.","Mix with coconut, peanuts, green chili and coriander.","Add lemon juice, salt and sugar.","Add mustard tempering.","Toss and serve immediately."], chef_notes:"This salad is best made fresh. The natural sweetness of carrot with lemon and coconut is perfect as is — keep it simple.", serving_suggestions:"Serve alongside dal-rice, any curry or as part of thali.", nutrition_estimate:{calories:"90",protein_g:"2",carbohydrates_g:"12",fat_g:"4"}, tags:["Salad","Vegetarian","Vegan","Quick"], img:"/images/india/maharashtra/salads/gajar-koshimbir-maharashtra.jpg" },
  { dish_name:"Bharli Vangi", state:"Maharashtra", cuisine:"Indian", category:"Main Courses", difficulty_level:"Medium", prep_time_minutes:25, cook_time_minutes:30, total_time_minutes:55, servings:4, short_description:"Bharli Vangi is Maharashtra's crown jewel — small brinjals stuffed with a fragrant peanut-coconut-spice mixture and slow cooked in their own juices.", ingredients:[{name:"Small round brinjals",quantity:"8",unit:"pieces"},{name:"Roasted peanuts",quantity:"4",unit:"tbsp"},{name:"Grated coconut",quantity:"4",unit:"tbsp"},{name:"Onion",quantity:"1",unit:"medium"},{name:"Goda masala",quantity:"2",unit:"tsp"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"},{name:"Tamarind",quantity:"1",unit:"tbsp"},{name:"Jaggery",quantity:"1",unit:"tsp"},{name:"Oil",quantity:"3",unit:"tbsp"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Dry roast peanuts, coconut and sesame seeds. Grind with fried onion.","Mix ground masala with goda masala, tamarind, jaggery and salt.","Make criss-cross slits in brinjals keeping the stem intact.","Stuff each brinjal generously with the masala mixture.","Heat oil in a pan and place stuffed brinjals carefully.","Cover and cook on low heat for 25 minutes, turning gently.","Brinjals should be completely tender. Serve with remaining masala as sauce."], chef_notes:"Low and slow is the key to perfectly cooked bharli vangi. The brinjals will release moisture and cook in their own steam. Avoid the urge to add water.", serving_suggestions:"Serve with jowar bhakri, rice or roti and a bowl of varan.", nutrition_estimate:{calories:"265",protein_g:"7",carbohydrates_g:"22",fat_g:"17"}, tags:["Vegetarian","Festival Food","Traditional","Signature Dish"], img:"/images/india/maharashtra/main-courses/bharli-vangi-maharashtra.jpg" },
  { dish_name:"Chicken Kolhapuri", state:"Maharashtra", cuisine:"Indian", category:"Main Courses", difficulty_level:"Hard", prep_time_minutes:40, cook_time_minutes:60, total_time_minutes:100, servings:4, short_description:"Chicken Kolhapuri is one of India's most fiery and complex chicken dishes — a dark, aromatic and intensely spiced curry from the city of Kolhapur.", ingredients:[{name:"Chicken",quantity:"800",unit:"g"},{name:"Onions",quantity:"3",unit:"large"},{name:"Kolhapuri masala",quantity:"4",unit:"tbsp"},{name:"Dried red chilies (Kashmiri + Bedgi)",quantity:"8",unit:"pieces"},{name:"Grated coconut, dry roasted",quantity:"5",unit:"tbsp"},{name:"Ginger-garlic paste",quantity:"3",unit:"tbsp"},{name:"Whole spices",quantity:"1",unit:"tbsp"},{name:"Sesame seeds, roasted",quantity:"2",unit:"tbsp"},{name:"Oil",quantity:"4",unit:"tbsp"},{name:"Salt",quantity:"2",unit:"tsp"}], preparation_steps:["Dry roast whole spices, sesame and coconut. Grind with soaked red chilies.","Fry onions until deep brown and caramelized — this is critical.","Add ginger-garlic paste and fry until oil separates.","Add Kolhapuri masala and ground coconut-chili paste. Fry on low heat for 8 minutes.","Add chicken pieces and coat well. Sear on high heat.","Add water, cover and cook on medium heat for 35-40 minutes.","The gravy should be thick, dark and coating the chicken. Adjust seasoning."], chef_notes:"The depth of color in Kolhapuri chicken comes from deeply caramelized onions and dry roasted coconut — not from food coloring. Never rush these steps.", serving_suggestions:"Serve with jowar bhakri, tandlachi bhakri or steamed rice.", nutrition_estimate:{calories:"380",protein_g:"32",carbohydrates_g:"12",fat_g:"22"}, tags:["Non-Vegetarian","Spicy","Kolhapuri","Weekend Special"], img:"/images/india/maharashtra/main-courses/chicken-kolhapuri-maharashtra.jpg" },
  { dish_name:"Masala Bhaat", state:"Maharashtra", cuisine:"Indian", category:"Main Courses", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:30, total_time_minutes:50, servings:4, short_description:"Masala Bhaat is a fragrant one-pot Maharashtrian rice dish made with seasonal vegetables, goda masala and a generous garnish of fresh coconut and coriander. A festive staple.", ingredients:[{name:"Basmati rice",quantity:"300",unit:"g"},{name:"Mixed vegetables (brinjal, potato, green peas)",quantity:"300",unit:"g"},{name:"Goda masala",quantity:"2",unit:"tsp"},{name:"Grated coconut",quantity:"4",unit:"tbsp"},{name:"Onion",quantity:"1",unit:"large"},{name:"Mustard seeds",quantity:"1",unit:"tsp"},{name:"Curry leaves",quantity:"10",unit:"pieces"},{name:"Ghee",quantity:"3",unit:"tbsp"},{name:"Cashews",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Wash and soak rice for 20 minutes.","Heat ghee in a heavy pot. Fry cashews until golden, remove.","Add mustard seeds, curry leaves and sliced onion. Sauté until golden.","Add vegetables and goda masala. Fry for 5 minutes.","Add drained rice and toss to coat with masala.","Add 550ml water and salt. Bring to boil.","Cover and cook on very low heat for 18 minutes.","Garnish with coconut, coriander and fried cashews."], chef_notes:"Goda masala gives Masala Bhaat its signature sweet-spiced aroma. Do not substitute it.", serving_suggestions:"Serve with kadhi, papad, pickle and a dollop of ghee.", nutrition_estimate:{calories:"345",protein_g:"7",carbohydrates_g:"58",fat_g:"9"}, tags:["Festival Food","Vegetarian","One-Pot","Wedding Food"], img:"/images/india/maharashtra/main-courses/masala-bhaat-maharashtra.jpg" },
  { dish_name:"Pav Bhaji", state:"Maharashtra", cuisine:"Indian", category:"Main Courses", difficulty_level:"Easy", prep_time_minutes:20, cook_time_minutes:30, total_time_minutes:50, servings:4, short_description:"Pav Bhaji is Mumbai's greatest culinary invention — a buttery, spiced vegetable mash cooked on a massive iron griddle and served with butter-toasted pav buns.", ingredients:[{name:"Potatoes",quantity:"3",unit:"large"},{name:"Cauliflower",quantity:"1",unit:"small"},{name:"Green peas",quantity:"0.5",unit:"cup"},{name:"Tomatoes",quantity:"3",unit:"large"},{name:"Butter",quantity:"5",unit:"tbsp"},{name:"Onion",quantity:"2",unit:"large"},{name:"Capsicum",quantity:"1",unit:"medium"},{name:"Pav bhaji masala",quantity:"3",unit:"tbsp"},{name:"Kashmiri red chili powder",quantity:"2",unit:"tsp"},{name:"Pav buns",quantity:"8",unit:"pieces"},{name:"Lemon juice",quantity:"2",unit:"tbsp"}], preparation_steps:["Boil potatoes, cauliflower and peas until soft.","Heat butter in a wide pan. Fry onion until golden.","Add tomatoes and capsicum. Cook until mushy.","Add pav bhaji masala and Kashmiri chili. Cook 5 minutes.","Add boiled vegetables and mash together completely.","Add water to adjust consistency. Simmer 15 minutes.","Toast pav buns on butter until golden.","Serve bhaji topped with butter, lemon and raw onion."], chef_notes:"The flat iron tawa and liberal butter are what make street-style pav bhaji special. Do not be shy with the butter. Mash the vegetables completely — no chunks.", serving_suggestions:"Serve piping hot bhaji with butter-toasted pav, raw onion, lemon wedge and coriander.", nutrition_estimate:{calories:"415",protein_g:"10",carbohydrates_g:"58",fat_g:"18"}, tags:["Street Food","Vegetarian","Mumbai","Iconic"], img:"/images/india/maharashtra/main-courses/pav-bhaji-maharashtra.jpg" },
  { dish_name:"Vangyache Bharit", state:"Maharashtra", cuisine:"Indian", category:"Main Courses", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:25, total_time_minutes:35, servings:4, short_description:"Vangyache Bharit is Maharashtra's fire-roasted brinjal mash — smoky, earthy and brightened with fresh coconut, onion, lemon and coriander.", ingredients:[{name:"Large brinjal",quantity:"1",unit:"kg"},{name:"Onion",quantity:"2",unit:"medium"},{name:"Grated coconut",quantity:"4",unit:"tbsp"},{name:"Green chili",quantity:"2",unit:"pieces"},{name:"Mustard seeds",quantity:"1",unit:"tsp"},{name:"Garlic",quantity:"4",unit:"cloves"},{name:"Lemon juice",quantity:"2",unit:"tbsp"},{name:"Oil",quantity:"2",unit:"tbsp"},{name:"Coriander",quantity:"3",unit:"tbsp"},{name:"Salt",quantity:"1",unit:"tsp"}], preparation_steps:["Roast brinjal directly on flame, turning regularly until completely charred.","Cool and peel. Mash the smoky flesh.","Temper mustard seeds, garlic and green chili in oil.","Add finely chopped onion and fry until translucent.","Add mashed brinjal and mix well.","Add coconut, lemon, salt and coriander.","Serve at room temperature."], chef_notes:"Direct flame roasting is essential for the smoky flavor. Do not use oven roasting — it will not give the same result.", serving_suggestions:"Serve with jowar bhakri, rice or as a dip with pav.", nutrition_estimate:{calories:"145",protein_g:"3",carbohydrates_g:"18",fat_g:"7"}, tags:["Vegetarian","Smoky","Vegan","Everyday"], img:"/images/india/maharashtra/main-courses/vangyache-bharit-maharashtra.jpg" },
  { dish_name:"Zunka", state:"Maharashtra", cuisine:"Indian", category:"Main Courses", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:15, total_time_minutes:25, servings:4, short_description:"Zunka is a thick, spiced besan preparation — the rustic cousin of pithla. Made with dry-roasted besan, onion and spices, it is the definitive comfort food of the Maharashtrian countryside.", ingredients:[{name:"Besan (chickpea flour)",quantity:"150",unit:"g"},{name:"Onion",quantity:"2",unit:"large"},{name:"Green chili",quantity:"3",unit:"pieces"},{name:"Mustard seeds",quantity:"1",unit:"tsp"},{name:"Curry leaves",quantity:"10",unit:"pieces"},{name:"Garlic",quantity:"4",unit:"cloves"},{name:"Asafoetida",quantity:"1",unit:"pinch"},{name:"Turmeric",quantity:"0.5",unit:"tsp"},{name:"Oil",quantity:"3",unit:"tbsp"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Heat oil in a kadhai and add mustard seeds, asafoetida and curry leaves.","Add sliced garlic, green chili and onion. Fry until golden.","Add turmeric.","Add besan and roast on low heat, stirring constantly, for 8-10 minutes.","Add splashes of water — about 4-5 tablespoons total — while stirring.","The zunka should be dry and crumbly, not wet.","Season with salt and serve hot."], chef_notes:"Zunka should be drier than pithla. Add water in very small splashes to create a slightly moist but crumbly texture. The besan must be well-roasted.", serving_suggestions:"Serve hot with jowar bhakri, raw onion and green chili. This combination is called Zunka-Bhakri.", nutrition_estimate:{calories:"235",protein_g:"10",carbohydrates_g:"28",fat_g:"10"}, tags:["Vegetarian","Village Food","Traditional","Gluten-Free"], img:"/images/india/maharashtra/main-courses/zunka-maharashtra.jpg" },
  { dish_name:"Puran Poli", state:"Maharashtra", cuisine:"Indian", category:"Breads", difficulty_level:"Hard", prep_time_minutes:60, cook_time_minutes:30, total_time_minutes:90, servings:4, short_description:"Puran Poli is Maharashtra's most beloved festive flatbread — a thin whole wheat outer shell stuffed with a fragrant sweet filling of cooked chana dal, jaggery and cardamom.", ingredients:[{name:"Whole wheat flour",quantity:"300",unit:"g"},{name:"Chana dal",quantity:"200",unit:"g"},{name:"Jaggery",quantity:"200",unit:"g"},{name:"Cardamom powder",quantity:"1",unit:"tsp"},{name:"Nutmeg powder",quantity:"0.25",unit:"tsp"},{name:"Ghee",quantity:"6",unit:"tbsp"},{name:"Turmeric",quantity:"0.25",unit:"tsp"},{name:"Salt",quantity:"0.5",unit:"tsp"}], preparation_steps:["Make a soft, pliable dough with flour, turmeric, salt, oil and water. Rest 30 minutes.","Pressure cook chana dal until completely soft.","Mash dal and cook with jaggery until mixture thickens and leaves sides of pan.","Add cardamom and nutmeg. Cool completely — this is the puran.","Divide dough and puran into equal balls.","Flatten dough, place puran ball, seal and roll gently into thin circles.","Cook on hot griddle with generous ghee on both sides until golden."], chef_notes:"The puran must be very dry before stuffing — cook it until it holds its shape and does not stick. A soft dough that rests well is crucial for thin rolling without tearing.", serving_suggestions:"Serve hot with katachi amti, ghee and a glass of milk. Traditionally eaten at Holi and Ganesh Chaturthi.", nutrition_estimate:{calories:"420",protein_g:"10",carbohydrates_g:"68",fat_g:"12"}, tags:["Festival Food","Vegetarian","Holi","Ganesh Chaturthi"], img:"/images/india/maharashtra/breads/puran-poli-maharashtra-bread.jpg" },
  { dish_name:"Jowar Bhakri", state:"Maharashtra", cuisine:"Indian", category:"Breads", difficulty_level:"Medium", prep_time_minutes:15, cook_time_minutes:20, total_time_minutes:35, servings:4, short_description:"Jowar Bhakri is Maharashtra's everyday sorghum flatbread — thick, rustic and nutritious. Made purely with jowar flour and water, it requires skill to roll and is best eaten fresh.", ingredients:[{name:"Jowar flour (sorghum)",quantity:"300",unit:"g"},{name:"Warm water",quantity:"200",unit:"ml"},{name:"Salt",quantity:"0.5",unit:"tsp"},{name:"White butter (loni)",quantity:"4",unit:"tbsp"}], preparation_steps:["Mix jowar flour with warm water and salt. Knead into a soft dough — jowar is gluten-free so it won't be elastic.","Divide into medium balls.","Wet your palms with water and pat each ball into a thick round on a wet cloth.","Cook on a dry hot tawa (no oil) on medium heat.","Press gently with a cloth and cook until light brown spots appear.","Serve immediately with white butter."], chef_notes:"Jowar bhakri requires patience. Because it has no gluten, it must be patted out with wet hands — it cannot be rolled like wheat roti. Always eat fresh as it hardens when cold.", serving_suggestions:"Serve hot with white butter, any Maharashtrian curry, or thecha (green chili chutney).", nutrition_estimate:{calories:"220",protein_g:"7",carbohydrates_g:"44",fat_g:"4"}, tags:["Gluten-Free","Vegetarian","Traditional","Everyday"], img:"/images/india/maharashtra/breads/jowar-bhakri-maharashtra-bread.jpg" },
  { dish_name:"Shrikhand", state:"Maharashtra", cuisine:"Indian", category:"Desserts", difficulty_level:"Easy", prep_time_minutes:480, cook_time_minutes:0, total_time_minutes:480, servings:6, short_description:"Shrikhand is Maharashtra's most beloved dessert — thick strained yogurt whipped with sugar, saffron, cardamom and garnished with pistachios. Creamy, fragrant and intensely flavored.", ingredients:[{name:"Full fat yogurt",quantity:"1",unit:"kg"},{name:"Powdered sugar",quantity:"200",unit:"g"},{name:"Saffron",quantity:"0.5",unit:"tsp"},{name:"Cardamom powder",quantity:"1",unit:"tsp"},{name:"Warm milk",quantity:"2",unit:"tbsp"},{name:"Pistachios",quantity:"2",unit:"tbsp"},{name:"Rose water",quantity:"1",unit:"tsp"}], preparation_steps:["Hang yogurt in a muslin cloth for 6-8 hours to drain all whey.","The resulting chakka should be very thick and dense.","Soak saffron in warm milk for 10 minutes.","Whisk chakka with powdered sugar until smooth.","Add cardamom, saffron milk and rose water. Whisk well.","Chill for at least 2 hours before serving.","Garnish with chopped pistachios and saffron strands."], chef_notes:"The quality of shrikhand depends entirely on the chakka (strained yogurt). It must be hung long enough to eliminate all whey — otherwise the shrikhand will be runny. Use full-fat yogurt only.", serving_suggestions:"Serve chilled as a dessert or with hot puri as Shrikhand-Puri — a famous Maharashtrian combination.", nutrition_estimate:{calories:"285",protein_g:"7",carbohydrates_g:"42",fat_g:"10"}, tags:["Dessert","Vegetarian","Festival Food","Gluten-Free"], img:"/images/india/maharashtra/desserts/shrikhand-maharashtra-dessert.jpg" },
  { dish_name:"Ukadiche Modak", state:"Maharashtra", cuisine:"Indian", category:"Desserts", difficulty_level:"Hard", prep_time_minutes:60, cook_time_minutes:20, total_time_minutes:80, servings:4, short_description:"Ukadiche Modak are steamed rice flour dumplings filled with a fragrant coconut-jaggery-cardamom filling. Lord Ganesha's favorite offering, these delicate modak are made during Ganesh Chaturthi.", ingredients:[{name:"Rice flour",quantity:"300",unit:"g"},{name:"Grated coconut",quantity:"300",unit:"g"},{name:"Jaggery",quantity:"200",unit:"g"},{name:"Cardamom powder",quantity:"1",unit:"tsp"},{name:"Nutmeg",quantity:"0.25",unit:"tsp"},{name:"Ghee",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"0.25",unit:"tsp"}], preparation_steps:["Make filling: cook coconut with jaggery until dry. Add cardamom and nutmeg. Cool.","Boil 500ml water with ghee and salt. Add rice flour off heat and mix vigorously.","Knead dough while warm into a smooth ball using wet hands.","Take a small ball of dough, flatten in your palm into a thin cup shape.","Place filling in center and pleat the edges together upward to form a pointed top.","Seal all pleats at the top with a twist.","Steam in a steamer lined with muslin for 12-15 minutes.","Serve hot with a drizzle of ghee."], chef_notes:"The dough must be worked while warm. If it cracks, wet hands with water and knead again. The pleating is a traditional art — 13 pleats is considered perfect.", serving_suggestions:"Serve as naivedyam (offering) to Lord Ganesha during Ganesh Chaturthi. Eat hot with ghee.", nutrition_estimate:{calories:"265",protein_g:"4",carbohydrates_g:"45",fat_g:"8"}, tags:["Festival Food","Vegetarian","Gluten-Free","Ganesh Chaturthi"], img:"/images/india/maharashtra/desserts/ukadiche-modak-maharashtra-dessert.jpg" },
  { dish_name:"Basundi", state:"Maharashtra", cuisine:"Indian", category:"Desserts", difficulty_level:"Medium", prep_time_minutes:5, cook_time_minutes:90, total_time_minutes:95, servings:6, short_description:"Basundi is a rich, thickened sweetened milk dessert from Maharashtra — essentially a concentrated rabri flavored with saffron, cardamom and garnished with nuts.", ingredients:[{name:"Full fat milk",quantity:"1.5",unit:"litre"},{name:"Sugar",quantity:"150",unit:"g"},{name:"Saffron",quantity:"0.5",unit:"tsp"},{name:"Cardamom powder",quantity:"1",unit:"tsp"},{name:"Charoli nuts",quantity:"2",unit:"tbsp"},{name:"Almonds, sliced",quantity:"2",unit:"tbsp"},{name:"Pistachios, sliced",quantity:"2",unit:"tbsp"},{name:"Rose water",quantity:"1",unit:"tsp"}], preparation_steps:["Bring milk to a boil in a wide heavy pan.","Reduce heat and simmer, stirring frequently, for 60-70 minutes.","The milk will reduce by half and thick cream layers will form.","Add sugar, saffron, cardamom and rose water.","Simmer another 15 minutes until thick and creamy.","Serve warm or chilled, garnished with nuts."], chef_notes:"Basundi requires patience — do not rush the reduction. Keep scraping the cream from sides and mixing back in. This creates the characteristic creamy texture.", serving_suggestions:"Serve chilled as a dessert or warm as a festival offering.", nutrition_estimate:{calories:"310",protein_g:"9",carbohydrates_g:"38",fat_g:"14"}, tags:["Dessert","Vegetarian","Festival Food","Gluten-Free"], img:"/images/india/maharashtra/desserts/basundi-maharashtra-dessert.jpg" },
  { dish_name:"Sabudana Kheer", state:"Maharashtra", cuisine:"Indian", category:"Desserts", difficulty_level:"Easy", prep_time_minutes:30, cook_time_minutes:20, total_time_minutes:50, servings:4, short_description:"Sabudana Kheer is a silky, creamy Maharashtrian dessert made with tapioca pearls cooked in sweetened milk with cardamom, saffron and nuts. A popular fasting-friendly dessert.", ingredients:[{name:"Sabudana (tapioca pearls)",quantity:"100",unit:"g"},{name:"Full fat milk",quantity:"800",unit:"ml"},{name:"Sugar",quantity:"100",unit:"g"},{name:"Cardamom powder",quantity:"0.5",unit:"tsp"},{name:"Saffron",quantity:"0.25",unit:"tsp"},{name:"Cashews",quantity:"2",unit:"tbsp"},{name:"Raisins",quantity:"1",unit:"tbsp"},{name:"Ghee",quantity:"1",unit:"tbsp"}], preparation_steps:["Soak sabudana in water for 30 minutes. Drain.","Fry cashews and raisins in ghee. Set aside.","Bring milk to a boil. Add soaked sabudana.","Simmer on medium heat for 15 minutes until pearls are translucent.","Add sugar, cardamom and saffron.","Simmer 5 more minutes. Garnish with fried nuts.","Serve warm or chilled."], chef_notes:"Do not over-soak sabudana or the pearls will dissolve into the milk. They should be just soft enough to cook through in the milk.", serving_suggestions:"Serve warm as a fasting dessert or festival sweet.", nutrition_estimate:{calories:"265",protein_g:"6",carbohydrates_g:"42",fat_g:"8"}, tags:["Fasting Food","Dessert","Vegetarian","Gluten-Free"], img:"/images/india/maharashtra/desserts/sabudana-kheer-maharashtra-dessert.jpg" },
  { dish_name:"Cutting Chai", state:"Maharashtra", cuisine:"Indian", category:"Tea", difficulty_level:"Easy", prep_time_minutes:2, cook_time_minutes:8, total_time_minutes:10, servings:2, short_description:"Cutting Chai is Mumbai's iconic half-cup strong masala tea — served scalding hot in small glasses on street corners throughout the city. Bold, spiced and deeply satisfying.", ingredients:[{name:"Water",quantity:"200",unit:"ml"},{name:"Full fat milk",quantity:"150",unit:"ml"},{name:"Strong black tea leaves",quantity:"2",unit:"tsp"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Cardamom",quantity:"3",unit:"pods"},{name:"Sugar",quantity:"2",unit:"tsp"},{name:"Black pepper",quantity:"2",unit:"pieces"}], preparation_steps:["Crush cardamom and black pepper roughly.","Bring water to boil with crushed spices and grated ginger.","Add tea leaves and boil 2 minutes.","Add milk and bring to a vigorous boil — let it rise twice.","Add sugar and strain into small glasses.","Serve immediately — scalding hot."], chef_notes:"The double boil is crucial for that thick, strong Mumbai cutting chai character. The ginger must be fresh — powdered ginger will not give the same result.", serving_suggestions:"Serve in small glasses with bun maska, vada pav or khari biscuit.", nutrition_estimate:{calories:"85",protein_g:"3",carbohydrates_g:"12",fat_g:"3"}, tags:["Beverage","Mumbai","Street Food","Vegetarian"], img:"/images/india/maharashtra/tea/cutting-chai-maharashtra-tea.jpg" },
  { dish_name:"Masala Kadha", state:"Maharashtra", cuisine:"Indian", category:"Tea", difficulty_level:"Easy", prep_time_minutes:5, cook_time_minutes:15, total_time_minutes:20, servings:2, short_description:"Masala Kadha is a potent Maharashtrian medicinal spice decoction — boiled with ginger, tulsi, pepper, clove, cinnamon and lemon. A powerful immunity booster and cold remedy.", ingredients:[{name:"Water",quantity:"400",unit:"ml"},{name:"Ginger",quantity:"2",unit:"inch"},{name:"Tulsi leaves",quantity:"8",unit:"pieces"},{name:"Black pepper",quantity:"6",unit:"pieces"},{name:"Cloves",quantity:"3",unit:"pieces"},{name:"Cinnamon",quantity:"1",unit:"inch"},{name:"Lemon juice",quantity:"2",unit:"tsp"},{name:"Honey",quantity:"2",unit:"tsp"},{name:"Turmeric",quantity:"0.25",unit:"tsp"}], preparation_steps:["Crush all dry spices.","Bring water to boil with ginger, tulsi, pepper, cloves, cinnamon and turmeric.","Simmer on low heat for 12 minutes until reduced by a third.","Strain into cups.","Add lemon juice and honey when slightly cooled.","Serve hot."], chef_notes:"Kadha should be strong and slightly bitter — that is its nature. Do not dilute with milk or extra water. Drink in small cups.", serving_suggestions:"Drink first thing in the morning on an empty stomach for maximum benefit.", nutrition_estimate:{calories:"25",protein_g:"0",carbohydrates_g:"6",fat_g:"0"}, tags:["Immunity Booster","Ayurvedic","Herbal","Caffeine-Free"], img:"/images/india/maharashtra/tea/masala-kadha-maharashtra-tea.jpg" },
  { dish_name:"Kokum Sharbat", state:"Maharashtra", cuisine:"Indian", category:"Tea", difficulty_level:"Easy", prep_time_minutes:30, cook_time_minutes:0, total_time_minutes:30, servings:4, short_description:"Kokum Sharbat is Maharashtra's signature summer cooler — a deep crimson, tangy and sweet cold drink made from dried kokum soaked in water with sugar and spices.", ingredients:[{name:"Dried kokum",quantity:"10",unit:"pieces"},{name:"Cold water",quantity:"400",unit:"ml"},{name:"Sugar",quantity:"3",unit:"tbsp"},{name:"Black salt",quantity:"0.5",unit:"tsp"},{name:"Roasted cumin powder",quantity:"0.5",unit:"tsp"},{name:"Mint leaves",quantity:"5",unit:"pieces"},{name:"Ice",quantity:"8",unit:"pieces"}], preparation_steps:["Soak kokum in 200ml warm water for 30 minutes.","Squeeze kokum to extract maximum juice and color.","Strain the kokum water into a jug.","Add sugar, black salt and cumin powder. Stir to dissolve.","Add remaining cold water and ice.","Garnish with mint and serve cold."], chef_notes:"Black salt and cumin are essential for the authentic digestive kokum sharbat character. The deep purple-pink color should be vivid — if too pale, soak longer.", serving_suggestions:"Serve chilled as a summer cooler, digestive after meals or as a welcome drink.", nutrition_estimate:{calories:"55",protein_g:"0",carbohydrates_g:"13",fat_g:"0"}, tags:["Summer Drink","Digestive","Vegan","Cooling","Konkan"], img:"/images/india/maharashtra/tea/kokum-sharbat-maharashtra-tea.jpg" },
  { dish_name:"Nagpur Filter Coffee", state:"Maharashtra", cuisine:"Indian", category:"Coffee", difficulty_level:"Easy", prep_time_minutes:5, cook_time_minutes:10, total_time_minutes:15, servings:2, short_description:"Coffee culture in Nagpur and Vidarbha region of Maharashtra is rooted in strong filter coffee tradition with a Deccan influence. This strong, aromatic drip coffee with hot milk is the morning ritual of countless Maharashtrian households.", ingredients:[{name:"Filter coffee powder (80/20 blend)",quantity:"3",unit:"tbsp"},{name:"Hot water",quantity:"100",unit:"ml"},{name:"Full fat milk",quantity:"250",unit:"ml"},{name:"Sugar",quantity:"2",unit:"tsp"}], preparation_steps:["Add coffee powder to filter device upper chamber.","Pour hot water over coffee slowly — allow to drip (15 minutes).","Heat milk separately until frothy.","Pour decoction into cup (about 30-40ml per cup).","Add hot frothy milk and sugar.","Serve immediately in steel tumblers."], chef_notes:"The chicory in the coffee blend adds body and a slight bitterness that is characteristic of South and Central Indian filter coffee. Use 80% coffee, 20% chicory blend.", serving_suggestions:"Serve in traditional steel tumbler-dabara set with poha or thalipeeth.", nutrition_estimate:{calories:"95",protein_g:"5",carbohydrates_g:"10",fat_g:"4"}, tags:["Coffee","Vegetarian","Morning Ritual","Vidarbha"], img:"/images/india/maharashtra/coffee/nagpur-filter-coffee-maharashtra.jpg" },
  { dish_name:"Pune Cafe Irani Coffee", state:"Maharashtra", cuisine:"Indian", category:"Coffee", difficulty_level:"Easy", prep_time_minutes:5, cook_time_minutes:10, total_time_minutes:15, servings:2, short_description:"Pune's iconic Irani cafes have been serving this distinctive milky coffee since the early 1900s. Made with strong chicory-coffee decoction and boiled milk, served in small thick-bottomed glasses.", ingredients:[{name:"Coffee powder with chicory",quantity:"2",unit:"tbsp"},{name:"Hot water",quantity:"80",unit:"ml"},{name:"Full fat milk",quantity:"300",unit:"ml"},{name:"Sugar",quantity:"2",unit:"tsp"}], preparation_steps:["Brew strong coffee decoction by pouring hot water over coffee powder.","Boil milk separately until it rises twice.","Pour decoction into glass.","Add sugar.","Pour hot boiled milk in a thin stream from height to create froth.","Serve immediately."], chef_notes:"Pouring the milk from a height creates the characteristic froth of Irani cafe coffee. The milk should be freshly boiled and very hot.", serving_suggestions:"Serve in small thick glasses with Osmania biscuits or bun maska.", nutrition_estimate:{calories:"110",protein_g:"6",carbohydrates_g:"12",fat_g:"5"}, tags:["Coffee","Irani Cafe","Pune","Heritage"], img:"/images/india/maharashtra/coffee/pune-cafe-irani-coffee-maharashtra.jpg" },
  { dish_name:"Hirwa Thecha", state:"Maharashtra", cuisine:"Indian", category:"Sides", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:5, total_time_minutes:15, servings:4, short_description:"Hirwa Thecha is Maharashtra's most essential table condiment — a roughly pounded green chili and garlic relish with fresh coriander and roasted peanuts. Fiery, fragrant and addictive.", ingredients:[{name:"Green chilies",quantity:"8",unit:"pieces"},{name:"Garlic",quantity:"8",unit:"cloves"},{name:"Roasted peanuts",quantity:"4",unit:"tbsp"},{name:"Fresh coriander",quantity:"4",unit:"tbsp"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Oil",quantity:"1",unit:"tsp"},{name:"Lemon juice",quantity:"1",unit:"tsp"}], preparation_steps:["Heat oil in a small pan. Fry green chilies briefly for 1-2 minutes.","Add garlic and fry 1 more minute.","Remove from heat. Cool slightly.","Place in mortar with peanuts, coriander and salt.","Pound coarsely — do not grind smooth.","Add lemon juice and mix. Serve immediately."], chef_notes:"Thecha is intentionally coarse and chunky — never blend smooth. The rough texture is what makes it special. Adjust chili quantity based on heat preference.", serving_suggestions:"Serve with jowar bhakri, dal-rice or any Maharashtrian meal as a condiment.", nutrition_estimate:{calories:"90",protein_g:"4",carbohydrates_g:"6",fat_g:"6"}, tags:["Condiment","Vegan","Spicy","Gluten-Free"], img:"/images/india/maharashtra/sides/hirwa-thecha-maharashtra-side.jpg" },
  { dish_name:"Lasun Khobra Chutney", state:"Maharashtra", cuisine:"Indian", category:"Sides", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:10, total_time_minutes:20, servings:8, short_description:"The famous dry garlic-coconut chutney that goes into every Vada Pav and is served alongside countless Maharashtrian snacks. A coarse powder of roasted garlic, dried coconut and red chilies.", ingredients:[{name:"Garlic",quantity:"12",unit:"cloves"},{name:"Dried coconut, grated",quantity:"6",unit:"tbsp"},{name:"Kashmiri red chili powder",quantity:"2",unit:"tsp"},{name:"Cumin seeds, roasted",quantity:"1",unit:"tsp"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Oil",quantity:"1",unit:"tsp"}], preparation_steps:["Dry roast garlic cloves in a dry pan until golden and slightly charred.","Dry roast dried coconut until golden brown — not too dark.","Dry roast cumin seeds.","Grind all roasted ingredients with chili powder and salt.","Pulse to a coarse powder — not smooth.","Store in airtight jar for up to 2 weeks."], chef_notes:"The chutney must remain coarse and dry — never add water or oil. The smoky garlic and roasted coconut flavors must be distinct. Use dried coconut, not fresh.", serving_suggestions:"Essential for Vada Pav. Also great with bhakri, thalipeeth and as a rice seasoning.", nutrition_estimate:{calories:"55",protein_g:"1",carbohydrates_g:"4",fat_g:"4"}, tags:["Condiment","Vegan","Gluten-Free","Dry Chutney"], img:"/images/india/maharashtra/sides/lasun-khobra-chutney-maharashtra-side.jpg" },
  { dish_name:"Sol Kadhi", state:"Maharashtra", cuisine:"Indian", category:"Sides", difficulty_level:"Easy", prep_time_minutes:30, cook_time_minutes:0, total_time_minutes:30, servings:4, short_description:"Sol Kadhi is the iconic pink digestive drink-curry of the Konkan coast — made from kokum and coconut milk. A stunning deep pink color, cooling, tangy and subtly spiced.", ingredients:[{name:"Dried kokum",quantity:"8",unit:"pieces"},{name:"Fresh coconut milk",quantity:"300",unit:"ml"},{name:"Garlic",quantity:"3",unit:"cloves"},{name:"Green chili",quantity:"1",unit:"piece"},{name:"Coriander",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"0.5",unit:"tsp"},{name:"Cumin powder",quantity:"0.25",unit:"tsp"}], preparation_steps:["Soak kokum in 200ml warm water for 20 minutes.","Squeeze kokum to extract all juice. Strain.","Crush garlic and green chili into a paste.","Mix coconut milk with kokum water.","Add garlic paste, cumin, salt.","Stir well and chill.","Garnish with coriander and serve cold."], chef_notes:"Sol Kadhi should never be heated — it will split and lose its beautiful pink color. Always serve cold or at room temperature.", serving_suggestions:"Serve cold alongside Malvani fish thali or as a digestive drink after a rich meal.", nutrition_estimate:{calories:"85",protein_g:"1",carbohydrates_g:"8",fat_g:"6"}, tags:["Konkan","Digestive","Vegan","Gluten-Free","Cooling"], img:"/images/india/maharashtra/sides/sol-kadhi-maharashtra-side.jpg" },
  { dish_name:"Varan Bhaat", state:"Maharashtra", cuisine:"Indian", category:"Rice Preparations", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:25, total_time_minutes:35, servings:4, short_description:"Varan Bhaat is the most comforting, soulful meal in Maharashtra — plain steamed rice topped with ghee-drizzled Varan (simple toor dal). Eaten at every festival, celebration and everyday meal.", ingredients:[{name:"Basmati or kolam rice",quantity:"300",unit:"g"},{name:"Toor dal",quantity:"150",unit:"g"},{name:"Turmeric",quantity:"0.5",unit:"tsp"},{name:"Ghee",quantity:"4",unit:"tbsp"},{name:"Salt",quantity:"1.5",unit:"tsp"},{name:"Lemon juice",quantity:"1",unit:"tsp"}], preparation_steps:["Cook rice in rice cooker or pot with 1:2 ratio of rice to water.","Separately pressure cook toor dal with turmeric until very soft.","Mash dal and thin with hot water to pouring consistency.","Season dal with salt and lemon juice.","Serve hot rice in a plate with dal poured over and abundant ghee."], chef_notes:"The generosity of ghee is what makes Varan Bhaat extraordinary — do not be shy. In Maharashtra, eating Varan Bhaat with ghee is almost sacred.", serving_suggestions:"Serve with papad, pickle and koshimbir as a complete simple meal.", nutrition_estimate:{calories:"420",protein_g:"12",carbohydrates_g:"70",fat_g:"11"}, tags:["Festival Food","Vegetarian","Comfort Food","Everyday"], img:"/images/india/maharashtra/rice/varan-bhaat-maharashtra.jpg" },
  { dish_name:"Narali Bhaat", state:"Maharashtra", cuisine:"Indian", category:"Rice Preparations", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:30, total_time_minutes:50, servings:4, short_description:"Narali Bhaat is a fragrant, mildly sweet coconut rice made on Narali Purnima — the full moon festival that marks the start of the Konkan fishing season.", ingredients:[{name:"Basmati rice",quantity:"300",unit:"g"},{name:"Fresh coconut milk",quantity:"400",unit:"ml"},{name:"Jaggery",quantity:"100",unit:"g"},{name:"Grated coconut",quantity:"4",unit:"tbsp"},{name:"Cardamom powder",quantity:"1",unit:"tsp"},{name:"Cloves",quantity:"4",unit:"pieces"},{name:"Ghee",quantity:"2",unit:"tbsp"},{name:"Cashews",quantity:"2",unit:"tbsp"},{name:"Raisins",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"0.25",unit:"tsp"}], preparation_steps:["Wash and soak basmati rice for 20 minutes.","Heat ghee and fry cashews and raisins. Set aside.","Fry cloves in remaining ghee.","Add rice and fry 2 minutes.","Add coconut milk and 200ml water. Bring to boil.","Add jaggery and a pinch of salt.","Cook covered on very low heat for 18 minutes.","Fluff gently and top with coconut, cardamom and fried nuts."], chef_notes:"The jaggery gives narali bhaat its characteristic pale amber color. Use fresh coconut milk — packaged coconut milk will not give the same aroma.", serving_suggestions:"Serve warm as a festive dish during Narali Purnima or coconut-themed celebrations.", nutrition_estimate:{calories:"385",protein_g:"6",carbohydrates_g:"62",fat_g:"12"}, tags:["Festival Food","Vegetarian","Coastal Maharashtra","Sweet Rice"], img:"/images/india/maharashtra/rice/narali-bhaat-maharashtra.jpg" },
];


const punjabCuisineData = [
  { dish_name:"Dal Makhani", state:"Punjab", cuisine:"Indian", category:"Soups", difficulty_level:"Medium", prep_time_minutes:480, cook_time_minutes:60, total_time_minutes:540, servings:4, short_description:"Punjab's most iconic lentil preparation — black urad dal and rajma slow-cooked with butter, cream and tomatoes into a velvety, deeply satisfying dal that is the soul of Punjabi cooking.", ingredients:[{name:"Whole black urad dal",quantity:"200",unit:"g"},{name:"Rajma (kidney beans)",quantity:"50",unit:"g"},{name:"Butter",quantity:"4",unit:"tbsp"},{name:"Fresh cream",quantity:"100",unit:"ml"},{name:"Tomatoes",quantity:"3",unit:"medium"},{name:"Onion",quantity:"1",unit:"large"},{name:"Ginger-garlic paste",quantity:"2",unit:"tbsp"},{name:"Red chili powder",quantity:"1",unit:"tsp"},{name:"Garam masala",quantity:"1",unit:"tsp"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Soak urad dal and rajma overnight in water.","Pressure cook together until completely soft — about 6-8 whistles.","Mash lightly and simmer on very low heat.","Heat butter and fry onion until golden. Add ginger-garlic paste and tomatoes.","Add spices and cook until oil separates.","Add this masala to the dal. Simmer on lowest heat for 30-45 minutes.","Finish with cream and butter. Season and serve."], chef_notes:"The secret to restaurant-style Dal Makhani is the long slow simmer — the longer it cooks, the better it gets. Adding a coal smoking (dhungar) technique creates the restaurant tandoor aroma.", serving_suggestions:"Serve with butter naan, tandoori roti or jeera rice.", nutrition_estimate:{calories:"385",protein_g:"15",carbohydrates_g:"42",fat_g:"18"}, tags:["Vegetarian","Iconic","Slow Cooked","Punjabi"], img:"/images/india/punjab/soups/dal-makhani-punjab-soup.jpg" },
  { dish_name:"Tamatar Shorba", state:"Punjab", cuisine:"Indian", category:"Soups", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:25, total_time_minutes:35, servings:4, short_description:"A classic North Indian restaurant soup — a thin, spiced tomato broth with ginger, garlic and whole spices, finished with cream. The opening act of any great Punjabi restaurant meal.", ingredients:[{name:"Ripe tomatoes",quantity:"600",unit:"g"},{name:"Onion",quantity:"1",unit:"medium"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Garlic",quantity:"3",unit:"cloves"},{name:"Fresh cream",quantity:"3",unit:"tbsp"},{name:"Butter",quantity:"2",unit:"tbsp"},{name:"Sugar",quantity:"1",unit:"tsp"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Coriander",quantity:"2",unit:"tbsp"}], preparation_steps:["Roast tomatoes, onion, ginger and garlic together until charred.","Blend until smooth and strain.","Heat butter with bay leaf and whole spices.","Add strained tomato liquid.","Add sugar, salt and simmer 15 minutes.","Finish with cream. Garnish with coriander."], chef_notes:"Roasting the tomatoes adds a depth of flavor that boiled tomatoes cannot achieve. The charred bits from roasting give the shorba its distinctive restaurant-style character.", serving_suggestions:"Serve as a restaurant-style starter before Punjabi curries.", nutrition_estimate:{calories:"105",protein_g:"2",carbohydrates_g:"12",fat_g:"6"}, tags:["Vegetarian","Restaurant Style","Soup","Classic"], img:"/images/india/punjab/soups/tamatar-shorba-punjab-soup.jpg" },
  { dish_name:"Kadhi Pakora", state:"Punjab", cuisine:"Indian", category:"Soups", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:45, total_time_minutes:65, servings:4, short_description:"Punjabi Kadhi Pakora is a tangy, yogurt-based curry with crispy besan fritters. Richer and more robust than its Maharashtrian counterpart, Punjabi kadhi is thick, flavorful and deeply comforting.", ingredients:[{name:"Sour yogurt",quantity:"400",unit:"g"},{name:"Besan",quantity:"6",unit:"tbsp"},{name:"Onion",quantity:"2",unit:"medium"},{name:"Mustard seeds",quantity:"1",unit:"tsp"},{name:"Fenugreek seeds",quantity:"0.5",unit:"tsp"},{name:"Dried red chili",quantity:"3",unit:"pieces"},{name:"Ghee",quantity:"3",unit:"tbsp"},{name:"Turmeric",quantity:"0.5",unit:"tsp"},{name:"Red chili powder",quantity:"1",unit:"tsp"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Whisk yogurt with 4 tbsp besan, turmeric and red chili. Add water to thin.","Make pakoras: mix onion with remaining besan, spices and fry until golden.","Prepare kadhi: heat ghee, fry mustard, fenugreek, dried chilies.","Add sliced onion and fry until golden.","Pour in the yogurt-besan mixture. Bring to boil, simmer 30 minutes stirring often.","Add pakoras 10 minutes before serving.","Finish with a ghee and red chili tadka."], chef_notes:"Punjabi kadhi must simmer for at least 30 minutes to cook the raw besan flavor. The sour yogurt is essential — use yogurt that is 2-3 days old.", serving_suggestions:"Serve hot over steamed rice with a fresh tadka of ghee and red chili.", nutrition_estimate:{calories:"320",protein_g:"12",carbohydrates_g:"28",fat_g:"18"}, tags:["Vegetarian","Comfort Food","Punjabi","Traditional"], img:"/images/india/punjab/soups/kadhi-pakora-punjab-soup.jpg" },
  { dish_name:"Amritsari Machhi", state:"Punjab", cuisine:"Indian", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:30, cook_time_minutes:20, total_time_minutes:50, servings:4, short_description:"The legendary crispy fried fish from Amritsar — marinated in a spiced besan-ajwain batter and deep fried to a glorious golden crunch. Served with green chutney and onion rings.", ingredients:[{name:"Fish fillets (sole or pomfret)",quantity:"600",unit:"g"},{name:"Besan",quantity:"6",unit:"tbsp"},{name:"Rice flour",quantity:"2",unit:"tbsp"},{name:"Ajwain (carom seeds)",quantity:"1",unit:"tsp"},{name:"Ginger-garlic paste",quantity:"2",unit:"tbsp"},{name:"Kashmiri red chili",quantity:"2",unit:"tsp"},{name:"Amchur (dry mango powder)",quantity:"1",unit:"tsp"},{name:"Lemon juice",quantity:"2",unit:"tbsp"},{name:"Oil for frying",quantity:"2",unit:"cups"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Clean fish and make deep cuts on both sides.","Marinate with ginger-garlic paste, lemon, chili, amchur and salt for 20 minutes.","Make thick batter with besan, rice flour, ajwain and water.","Dip marinated fish in batter.","Deep fry in hot oil until golden and crispy — about 4 minutes each side.","Drain and serve immediately."], chef_notes:"Ajwain (carom seeds) is what makes this distinctly Amritsari. The double coating ensures the fish stays juicy inside while being incredibly crispy outside.", serving_suggestions:"Serve with green chutney, sliced onion rings and lemon wedges.", nutrition_estimate:{calories:"310",protein_g:"28",carbohydrates_g:"18",fat_g:"14"}, tags:["Non-Vegetarian","Amritsar","Street Food","Crispy"], img:"/images/india/punjab/appetizers/amritsari-machhi-punjab-appetizer.jpg" },
  { dish_name:"Tandoori Chicken", state:"Punjab", cuisine:"Indian", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:480, cook_time_minutes:30, total_time_minutes:510, servings:4, short_description:"Punjab's greatest gift to the world — chicken marinated in yogurt and spices then roasted in a blazing tandoor until charred, smoky and deeply flavored.", ingredients:[{name:"Chicken legs and thighs",quantity:"800",unit:"g"},{name:"Thick yogurt",quantity:"200",unit:"g"},{name:"Kashmiri red chili powder",quantity:"3",unit:"tsp"},{name:"Ginger-garlic paste",quantity:"3",unit:"tbsp"},{name:"Mustard oil",quantity:"2",unit:"tbsp"},{name:"Lemon juice",quantity:"3",unit:"tbsp"},{name:"Garam masala",quantity:"1",unit:"tsp"},{name:"Chaat masala",quantity:"1",unit:"tsp"},{name:"Salt",quantity:"2",unit:"tsp"}], preparation_steps:["Score chicken pieces deeply with a sharp knife.","First marinade: apply lemon juice, salt and chili for 30 minutes.","Second marinade: mix yogurt, ginger-garlic paste, mustard oil and all spices.","Coat chicken thoroughly and refrigerate overnight.","Cook in a very hot oven at 240°C or on a grill for 25-30 minutes.","Turn once halfway. Edges should be charred.","Brush with melted butter and serve."], chef_notes:"Mustard oil is essential for authentic Tandoori flavor. Overnight marination makes all the difference — do not rush this step.", serving_suggestions:"Serve with mint chutney, sliced onion, lemon wedges and laccha paratha.", nutrition_estimate:{calories:"295",protein_g:"35",carbohydrates_g:"5",fat_g:"14"}, tags:["Non-Vegetarian","Iconic","Grilled","Tandoor"], img:"/images/india/punjab/appetizers/tandoori-chicken-punjab-appetizer.jpg" },
  { dish_name:"Punjabi Samosa", state:"Punjab", cuisine:"Indian", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:45, cook_time_minutes:25, total_time_minutes:70, servings:4, short_description:"The Punjabi samosa is larger, thicker-shelled and more robustly spiced than other regional varieties. Filled with a boldly seasoned dry potato-pea filling.", ingredients:[{name:"All-purpose flour",quantity:"250",unit:"g"},{name:"Potatoes",quantity:"4",unit:"large"},{name:"Green peas",quantity:"0.5",unit:"cup"},{name:"Ajwain",quantity:"0.5",unit:"tsp"},{name:"Cumin seeds",quantity:"1",unit:"tsp"},{name:"Amchur powder",quantity:"1",unit:"tsp"},{name:"Garam masala",quantity:"1",unit:"tsp"},{name:"Green chili",quantity:"2",unit:"pieces"},{name:"Oil for frying",quantity:"2",unit:"cups"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Make firm dough with flour, ajwain, salt and oil. Rest 30 minutes.","Boil potatoes and mash coarsely — keep chunky.","Sauté peas with cumin, green chili, amchur, garam masala and potato.","Roll dough into circles, cut in half and form cones.","Fill with potato mixture and seal edges firmly.","Deep fry on medium heat until golden brown — about 10 minutes.","Serve with chole and both chutneys."], chef_notes:"Punjabi samosas should be large and substantial. The filling should be dry and well-spiced. Fry on medium heat — the slow fry creates a crispier shell.", serving_suggestions:"Serve with tamarind chutney, mint chutney and a cup of hot chai.", nutrition_estimate:{calories:"285",protein_g:"5",carbohydrates_g:"38",fat_g:"13"}, tags:["Vegetarian","Street Food","Iconic","Punjabi"], img:"/images/india/punjab/appetizers/punjabi-samosa-appetizer.jpg" },
  { dish_name:"Punjabi Kachumber", state:"Punjab", cuisine:"Indian", category:"Salads", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:0, total_time_minutes:10, servings:4, short_description:"A bold, crunchy raw salad of cucumber, tomato, onion and radish — seasoned assertively with black salt, chaat masala and lemon. The perfect cooling counterpoint to rich Punjabi curries.", ingredients:[{name:"Cucumber",quantity:"2",unit:"medium"},{name:"Tomato",quantity:"2",unit:"medium"},{name:"Onion",quantity:"1",unit:"large"},{name:"Radish",quantity:"2",unit:"medium"},{name:"Green chili",quantity:"1",unit:"piece"},{name:"Lemon juice",quantity:"2",unit:"tbsp"},{name:"Black salt",quantity:"0.5",unit:"tsp"},{name:"Chaat masala",quantity:"0.5",unit:"tsp"},{name:"Coriander",quantity:"3",unit:"tbsp"}], preparation_steps:["Dice all vegetables into even small pieces.","Mix together in a bowl.","Add black salt, chaat masala and lemon juice.","Toss well.","Garnish with coriander and green chili. Serve immediately."], chef_notes:"Radish is the Punjabi element that sets this apart from other kachumbers. Black salt and chaat masala give it a distinctly North Indian character.", serving_suggestions:"Serve alongside any Punjabi main course as a cooling salad.", nutrition_estimate:{calories:"50",protein_g:"2",carbohydrates_g:"10",fat_g:"0"}, tags:["Vegan","Gluten-Free","Salad","Everyday"], img:"/images/india/punjab/salads/punjabi-kachumber-salad.jpg" },
  { dish_name:"Sarson Ka Saag", state:"Punjab", cuisine:"Indian", category:"Main Courses", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:60, total_time_minutes:80, servings:4, short_description:"Punjab's most beloved winter dish — mustard greens slow-cooked with spinach and spices into a thick, earthy and deeply nourishing preparation. Served with makki di roti and white butter.", ingredients:[{name:"Mustard greens (sarson)",quantity:"500",unit:"g"},{name:"Spinach",quantity:"200",unit:"g"},{name:"Bathua (chenopodium)",quantity:"100",unit:"g"},{name:"Onion",quantity:"2",unit:"medium"},{name:"Ginger",quantity:"2",unit:"inch"},{name:"Garlic",quantity:"6",unit:"cloves"},{name:"Green chili",quantity:"3",unit:"pieces"},{name:"Maize flour (makki atta)",quantity:"2",unit:"tbsp"},{name:"Butter",quantity:"4",unit:"tbsp"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Wash and roughly chop all greens.","Pressure cook greens with ginger, garlic and green chili for 3 whistles.","Blend coarsely — do not make smooth.","Add maize flour and cook stirring for 20 minutes.","Prepare tempering with butter and golden onion.","Add to saag. Simmer 15 more minutes.","Adjust salt and serve with a knob of white butter."], chef_notes:"Bathua (wild spinach) is essential for authentic sarson ka saag — it adds a distinctive earthiness. Maize flour thickens the saag and adds flavor.", serving_suggestions:"Serve with makki di roti, white butter (makkhan) and jaggery.", nutrition_estimate:{calories:"185",protein_g:"6",carbohydrates_g:"18",fat_g:"10"}, tags:["Vegetarian","Winter Special","Iconic","Punjabi"], img:"/images/india/punjab/main-courses/sarson-ka-saag-punjab.jpg" },
  { dish_name:"Butter Chicken (Murgh Makhani)", state:"Punjab", cuisine:"Indian", category:"Main Courses", difficulty_level:"Medium", prep_time_minutes:40, cook_time_minutes:45, total_time_minutes:85, servings:4, short_description:"India's most famous dish — tandoor-roasted chicken in a velvety tomato-butter-cream sauce. Mildly spiced, deeply aromatic and universally beloved.", ingredients:[{name:"Chicken",quantity:"800",unit:"g"},{name:"Butter",quantity:"5",unit:"tbsp"},{name:"Fresh cream",quantity:"150",unit:"ml"},{name:"Tomatoes",quantity:"4",unit:"large"},{name:"Cashews",quantity:"3",unit:"tbsp"},{name:"Onion",quantity:"2",unit:"medium"},{name:"Ginger-garlic paste",quantity:"2",unit:"tbsp"},{name:"Kashmiri red chili powder",quantity:"2",unit:"tsp"},{name:"Kasuri methi",quantity:"1",unit:"tbsp"},{name:"Garam masala",quantity:"1",unit:"tsp"}], preparation_steps:["Marinate chicken in yogurt, ginger-garlic paste, Kashmiri chili and spices for 4 hours.","Grill or cook chicken in a very hot pan until charred. Set aside.","Cook onion, tomatoes and cashews together until soft. Blend smooth.","Heat butter, add the blended sauce and cook for 15 minutes with all spices.","Add grilled chicken pieces, simmer 15 minutes.","Finish with cream and kasuri methi.","Adjust seasoning."], chef_notes:"Kasuri methi (dried fenugreek) is the secret ingredient that gives Murgh Makhani its distinctive restaurant aroma. Do not skip it.", serving_suggestions:"Serve with butter naan, laccha paratha or steamed basmati rice.", nutrition_estimate:{calories:"420",protein_g:"32",carbohydrates_g:"14",fat_g:"26"}, tags:["Non-Vegetarian","Iconic","Creamy","Punjabi"], img:"/images/india/punjab/main-courses/butter-chicken-murgh-makhani-punjab.jpg" },
  { dish_name:"Chole Bhature", state:"Punjab", cuisine:"Indian", category:"Main Courses", difficulty_level:"Medium", prep_time_minutes:480, cook_time_minutes:60, total_time_minutes:540, servings:4, short_description:"Punjab's most iconic breakfast and brunch dish — deeply spiced chickpeas served with pillowy deep-fried bread.", ingredients:[{name:"Dried chickpeas",quantity:"300",unit:"g"},{name:"Tea bag",quantity:"1",unit:"piece"},{name:"Onions",quantity:"3",unit:"large"},{name:"Tomatoes",quantity:"3",unit:"large"},{name:"Chole masala",quantity:"3",unit:"tbsp"},{name:"Ginger-garlic paste",quantity:"2",unit:"tbsp"},{name:"Amchur",quantity:"1",unit:"tsp"},{name:"Maida",quantity:"300",unit:"g"},{name:"Yogurt",quantity:"100",unit:"g"},{name:"Oil for frying",quantity:"2",unit:"cups"}], preparation_steps:["Soak chickpeas overnight. Pressure cook with tea bag for dark color.","Fry onions until deep brown. Add ginger-garlic paste and tomatoes.","Add chole masala and amchur. Cook until oil separates.","Add cooked chickpeas. Mash some for thick gravy. Simmer 20 minutes.","For bhature: knead maida with yogurt, salt and water into soft dough. Rest 2 hours.","Roll into oval shapes and deep fry until puffed and golden.","Serve chole hot with fresh bhature."], chef_notes:"The tea bag gives chole its characteristic dark color naturally. The key to perfect bhature is resting the dough — do not rush this step.", serving_suggestions:"Serve with pickled onions, green chili, mango pickle and lassi.", nutrition_estimate:{calories:"580",protein_g:"18",carbohydrates_g:"72",fat_g:"24"}, tags:["Vegetarian","Street Food","Breakfast","Iconic"], img:"/images/india/punjab/main-courses/chole-bhature-punjab.jpg" },
  { dish_name:"Makki Di Roti", state:"Punjab", cuisine:"Indian", category:"Breads", difficulty_level:"Medium", prep_time_minutes:15, cook_time_minutes:20, total_time_minutes:35, servings:4, short_description:"Punjab's iconic cornmeal flatbread — thick, rustic and slightly sweet, best eaten hot off the tawa with sarson ka saag and white butter.", ingredients:[{name:"Maize flour (makki atta)",quantity:"300",unit:"g"},{name:"Warm water",quantity:"200",unit:"ml"},{name:"Salt",quantity:"0.5",unit:"tsp"},{name:"White butter (makkhan)",quantity:"4",unit:"tbsp"}], preparation_steps:["Mix maize flour with salt and warm water. Knead into a soft dough — maize has no gluten so it will be crumbly.","Divide into balls and flatten on a wet cloth.","Carefully transfer to a hot dry tawa.","Cook on medium heat, pressing gently with a wet hand.","Cook on both sides until golden. Apply white butter.","Serve immediately — makki roti hardens quickly."], chef_notes:"Makki roti is gluten-free and requires patience. Use wet hands and a plastic sheet for patting. Always eat fresh and hot as it hardens when cold.", serving_suggestions:"Serve hot with sarson ka saag, white butter and jaggery.", nutrition_estimate:{calories:"240",protein_g:"5",carbohydrates_g:"46",fat_g:"5"}, tags:["Gluten-Free","Vegetarian","Winter Special","Traditional"], img:"/images/india/punjab/breads/makki-di-roti-punjab-bread.jpg" },
  { dish_name:"Butter Naan", state:"Punjab", cuisine:"Indian", category:"Breads", difficulty_level:"Medium", prep_time_minutes:120, cook_time_minutes:20, total_time_minutes:140, servings:4, short_description:"Punjab's most celebrated bread — a leavened, pillowy flatbread cooked in a blazing tandoor and brushed with generous amounts of butter.", ingredients:[{name:"All-purpose flour",quantity:"400",unit:"g"},{name:"Yogurt",quantity:"100",unit:"g"},{name:"Instant yeast",quantity:"5",unit:"g"},{name:"Sugar",quantity:"1",unit:"tsp"},{name:"Butter",quantity:"5",unit:"tbsp"},{name:"Milk",quantity:"100",unit:"ml"},{name:"Nigella seeds",quantity:"1",unit:"tsp"},{name:"Salt",quantity:"1",unit:"tsp"}], preparation_steps:["Activate yeast in warm milk with sugar for 10 minutes.","Mix flour, yogurt, salt and yeast mixture. Knead 10 minutes.","Rest covered for 1.5 hours until doubled.","Divide into balls and roll into teardrop shapes.","Press nigella seeds on top.","Cook on a very hot tawa or under a grill until puffed and charred.","Brush generously with butter and serve immediately."], chef_notes:"The hotter the cooking surface, the better the naan. Brushing with butter while hot is non-negotiable.", serving_suggestions:"Serve with dal makhani, butter chicken, paneer dishes or any Punjabi curry.", nutrition_estimate:{calories:"290",protein_g:"7",carbohydrates_g:"46",fat_g:"9"}, tags:["Vegetarian","Iconic","Bread","Tandoor"], img:"/images/india/punjab/breads/butter-naan-punjab-bread.jpg" },
  { dish_name:"Aloo Paratha", state:"Punjab", cuisine:"Indian", category:"Breads", difficulty_level:"Easy", prep_time_minutes:30, cook_time_minutes:20, total_time_minutes:50, servings:4, short_description:"Punjab's most beloved stuffed flatbread — whole wheat dough filled with spiced mashed potatoes, cooked with generous amounts of butter.", ingredients:[{name:"Whole wheat flour",quantity:"300",unit:"g"},{name:"Potatoes",quantity:"4",unit:"large"},{name:"Green chili",quantity:"2",unit:"pieces"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Coriander leaves",quantity:"3",unit:"tbsp"},{name:"Ajwain",quantity:"0.5",unit:"tsp"},{name:"Amchur",quantity:"0.5",unit:"tsp"},{name:"Butter",quantity:"5",unit:"tbsp"},{name:"Salt",quantity:"1.5",unit:"tsp"}], preparation_steps:["Knead wheat flour into soft dough. Rest 20 minutes.","Boil and mash potatoes until completely smooth.","Mix with green chili, ginger, coriander, ajwain, amchur and salt.","Roll dough ball into small circle, place potato filling, seal completely.","Roll gently into large circle — filling should not tear through.","Cook on hot tawa with generous butter on both sides until golden.","Serve immediately."], chef_notes:"The potato filling must be completely dry and lump-free — any moisture will cause the paratha to tear while rolling.", serving_suggestions:"Serve with white butter, yogurt, mango pickle and a glass of lassi.", nutrition_estimate:{calories:"380",protein_g:"9",carbohydrates_g:"56",fat_g:"14"}, tags:["Vegetarian","Breakfast","Stuffed Bread","Punjabi"], img:"/images/india/punjab/breads/aloo-paratha-punjab-bread.jpg" },
  { dish_name:"Gajar Ka Halwa", state:"Punjab", cuisine:"Indian", category:"Desserts", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:60, total_time_minutes:80, servings:6, short_description:"Punjab's quintessential winter dessert — grated red Delhi carrots slow-cooked in milk with ghee, sugar and cardamom until caramelized and deeply fragrant.", ingredients:[{name:"Red carrots (Delhi gajar)",quantity:"1",unit:"kg"},{name:"Full fat milk",quantity:"500",unit:"ml"},{name:"Sugar",quantity:"150",unit:"g"},{name:"Ghee",quantity:"4",unit:"tbsp"},{name:"Khoya",quantity:"100",unit:"g"},{name:"Cardamom powder",quantity:"1",unit:"tsp"},{name:"Almonds",quantity:"3",unit:"tbsp"},{name:"Cashews",quantity:"2",unit:"tbsp"}], preparation_steps:["Peel and grate carrots on the fine side of grater.","Cook grated carrots with milk in a heavy pan on medium heat.","Stir frequently until all milk is absorbed — about 30 minutes.","Add ghee and fry carrots until they start to change color.","Add sugar and continue cooking until moisture evaporates.","Add khoya and cardamom. Fry nuts in ghee separately and add.","Serve warm."], chef_notes:"Red Delhi carrots give the best color and sweetness (available Nov-Feb). The frying step after milk absorption caramelizes the sugars — this is critical.", serving_suggestions:"Serve warm topped with a scoop of vanilla ice cream or rabri.", nutrition_estimate:{calories:"340",protein_g:"7",carbohydrates_g:"46",fat_g:"15"}, tags:["Vegetarian","Winter Special","Festival Sweet","Classic"], img:"/images/india/punjab/desserts/gajar-ka-halwa-punjab-dessert.jpg" },
  { dish_name:"Punjabi Masala Chai", state:"Punjab", cuisine:"Indian", category:"Tea", difficulty_level:"Easy", prep_time_minutes:2, cook_time_minutes:8, total_time_minutes:10, servings:2, short_description:"The strongest, most aromatic of all Indian masala teas — made with full-fat milk, robust tea leaves, fresh ginger, cardamom and a generous hand with spices.", ingredients:[{name:"Water",quantity:"200",unit:"ml"},{name:"Full fat milk",quantity:"200",unit:"ml"},{name:"Strong CTC tea leaves",quantity:"2.5",unit:"tsp"},{name:"Ginger",quantity:"1.5",unit:"inch"},{name:"Cardamom",quantity:"4",unit:"pods"},{name:"Black pepper",quantity:"3",unit:"pieces"},{name:"Cinnamon",quantity:"0.5",unit:"inch"},{name:"Sugar",quantity:"2",unit:"tsp"}], preparation_steps:["Crush cardamom, black pepper and cinnamon.","Bring water to boil with crushed spices and grated ginger.","Add tea leaves and boil vigorously for 2 minutes.","Add milk and bring to a full rolling boil twice.","Add sugar. Strain into cups and serve immediately."], chef_notes:"Punjabi chai must be strong and milky — the double boil is essential. CTC tea gives the right strength. Never use tea bags.", serving_suggestions:"Serve with aloo paratha, samosa or any Punjabi snack.", nutrition_estimate:{calories:"95",protein_g:"4",carbohydrates_g:"12",fat_g:"4"}, tags:["Vegetarian","Morning Ritual","Warming","Beverage"], img:"/images/india/punjab/tea/punjabi-masala-chai-tea.jpg" },
  { dish_name:"Punjabi Sweet Lassi", state:"Punjab", cuisine:"Indian", category:"Sides", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:0, total_time_minutes:10, servings:2, short_description:"The world's most famous yogurt drink — thick, creamy, chilled and topped with a layer of malai (cream). Served in tall clay glasses.", ingredients:[{name:"Full fat yogurt",quantity:"400",unit:"g"},{name:"Sugar",quantity:"3",unit:"tbsp"},{name:"Chilled water or milk",quantity:"150",unit:"ml"},{name:"Rose water",quantity:"1",unit:"tsp"},{name:"Malai (cream)",quantity:"3",unit:"tbsp"},{name:"Cardamom powder",quantity:"0.25",unit:"tsp"},{name:"Ice cubes",quantity:"6",unit:"pieces"}], preparation_steps:["Blend yogurt with sugar, cardamom and water until frothy.","Add rose water and blend briefly.","Pour into tall chilled glasses with ice.","Top with a generous layer of malai.","Serve immediately."], chef_notes:"The malai layer on top is the signature of authentic Punjabi lassi — never skip it. Use full-fat yogurt for the creamiest result.", serving_suggestions:"Serve with chole bhature, aloo paratha or any Punjabi breakfast.", nutrition_estimate:{calories:"245",protein_g:"8",carbohydrates_g:"30",fat_g:"11"}, tags:["Vegetarian","Beverage","Summer Drink","Iconic"], img:"/images/india/punjab/sides/punjabi-lassi-punjab-side.jpg" },
];

// ─── ASIAN CUISINE DATA ───────────────────────────────────────────────────────
// Chinese, Japanese, Thai, Korean, Vietnamese
// Categories: Appetizers, Salads, Soups, Main Courses, Desserts
// ─────────────────────────────────────────────────────────────────────────────

const chineseCuisineData = [
  // ── APPETIZERS ──────────────────────────────────────────────────────────────
  {
    dish_name: "Pork & Ginger Dumplings (Jiaozi)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 45,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Hand-folded dumplings filled with seasoned pork and ginger, steamed or pan-fried until golden. A Chinese New Year staple and everyday comfort food across northern China.",
    ingredients: [
      { name: "Ground pork", quantity: "300", unit: "g" },
      { name: "Dumpling wrappers", quantity: "30", unit: "pieces" },
      { name: "Napa cabbage", quantity: "200", unit: "g" },
      { name: "Fresh ginger", quantity: "2", unit: "inch" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Spring onions", quantity: "3", unit: "stalks" },
      { name: "Garlic", quantity: "3", unit: "cloves" }
    ],
    preparation_steps: [
      "Salt the napa cabbage and let stand 10 minutes. Squeeze out all moisture.",
      "Mix ground pork with cabbage, ginger, garlic, soy sauce, sesame oil and spring onions.",
      "Place 1 tsp filling on each wrapper, moisten edges with water and pleat to seal.",
      "Pan-fry in oil until golden on the bottom, then add water and cover to steam 8 minutes.",
      "Serve with black vinegar and chili oil dipping sauce."
    ],
    chef_notes: "The pleating technique is the mark of a skilled dumpling maker — aim for at least 7 pleats per dumpling. The key is squeezing every drop of moisture from the cabbage.",
    serving_suggestions: "Serve with Chinkiang black vinegar, soy sauce, julienned ginger and chili oil.",
    flavor_profile: ["savory", "umami", "gingery", "crispy"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
    tags: ["Street Food", "New Year", "Northern China", "Comfort Food"]
  },
  {
    dish_name: "Crispy Spring Rolls",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Golden, shatteringly crisp rolls filled with seasoned pork, cabbage and glass noodles — a dim sum classic found in teahouses across China.",
    ingredients: [
      { name: "Spring roll wrappers", quantity: "12", unit: "pieces" },
      { name: "Ground pork", quantity: "200", unit: "g" },
      { name: "Cabbage, shredded", quantity: "150", unit: "g" },
      { name: "Carrots, julienned", quantity: "100", unit: "g" },
      { name: "Glass noodles, soaked", quantity: "50", unit: "g" },
      { name: "Oyster sauce", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" },
      { name: "Oil for frying", quantity: "2", unit: "cups" }
    ],
    preparation_steps: [
      "Stir-fry pork in a hot wok, then add vegetables and cook until wilted.",
      "Add glass noodles, oyster sauce and soy sauce. Cool filling completely.",
      "Place filling on wrapper, fold sides in and roll tightly. Seal edge with flour paste.",
      "Deep fry at 175°C for 4-5 minutes until deep golden and crispy.",
      "Drain on paper and serve immediately with sweet chili sauce."
    ],
    chef_notes: "The filling MUST be completely cooled before wrapping — hot filling creates steam that bursts the wrapper during frying. Roll tightly with no air pockets.",
    serving_suggestions: "Serve with sweet chili dipping sauce and a squeeze of lemon.",
    flavor_profile: ["crispy", "savory", "umami"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&q=80",
    tags: ["Dim Sum", "Fried", "Party Food", "Classic"]
  },
  {
    dish_name: "Char Siu Bao (BBQ Pork Buns)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Appetizers",
    difficulty_level: "hard",
    prep_time_minutes: 90,
    cook_time_minutes: 20,
    servings: 6,
    short_description: "Pillowy steamed buns filled with sticky, caramelized BBQ pork — the undisputed king of dim sum. The iconic white bun with its characteristic split top is a hallmark of Cantonese teahouses.",
    ingredients: [
      { name: "All-purpose flour", quantity: "300", unit: "g" },
      { name: "Pork shoulder, diced", quantity: "400", unit: "g" },
      { name: "Hoisin sauce", quantity: "3", unit: "tbsp" },
      { name: "Oyster sauce", quantity: "2", unit: "tbsp" },
      { name: "Five spice powder", quantity: "1", unit: "tsp" },
      { name: "Sugar", quantity: "3", unit: "tbsp" },
      { name: "Instant yeast", quantity: "5", unit: "g" },
      { name: "Baking powder", quantity: "1", unit: "tsp" }
    ],
    preparation_steps: [
      "Marinate pork in hoisin, oyster sauce, five spice and sugar for 2 hours.",
      "Roast marinated pork at 200°C for 25 minutes, basting twice. Cool and dice finely.",
      "Make dough with flour, yeast, sugar and water. Rest 1 hour until doubled.",
      "Divide dough, flatten each piece, add pork filling and seal into round buns.",
      "Steam on parchment squares at high heat for 15 minutes until puffed and white."
    ],
    chef_notes: "The characteristic split on top of char siu bao happens naturally from steam pressure during steaming. Don't over-fill or the buns won't have room to expand.",
    serving_suggestions: "Serve fresh from the steamer at dim sum with jasmine tea.",
    flavor_profile: ["sweet", "savory", "caramelized", "pillowy"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80",
    tags: ["Dim Sum", "Steamed", "Cantonese", "Classic"]
  },
  {
    dish_name: "Scallion Pancakes (Cong You Bing)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 30,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Crispy, flaky layered flatbreads studded with fragrant spring onions — a beloved Shanghai street food made by rolling and coiling the dough to create hundreds of buttery layers.",
    ingredients: [
      { name: "All-purpose flour", quantity: "250", unit: "g" },
      { name: "Spring onions", quantity: "6", unit: "stalks" },
      { name: "Sesame oil", quantity: "3", unit: "tbsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Boiling water", quantity: "150", unit: "ml" },
      { name: "Oil for frying", quantity: "4", unit: "tbsp" }
    ],
    preparation_steps: [
      "Mix flour with boiling water, knead into smooth dough. Rest 30 minutes.",
      "Roll dough thin, brush generously with sesame oil and scatter spring onions.",
      "Roll up into a log, then coil into a spiral. Flatten gently into a round.",
      "Fry in oil on medium heat for 3-4 minutes each side until golden and crispy.",
      "Serve cut into wedges with soy dipping sauce."
    ],
    chef_notes: "The lamination from rolling and coiling is what creates the flaky layers. Don't skip the resting time — it makes rolling much easier.",
    serving_suggestions: "Serve with soy-vinegar dipping sauce or enjoy as a breakfast street food.",
    flavor_profile: ["crispy", "savory", "sesame", "oniony"],
    dietary_tags: ["vegetarian", "vegan", "dairy-free"],
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80",
    tags: ["Street Food", "Vegetarian", "Shanghai", "Breakfast"]
  },
  {
    dish_name: "Steamed Egg with Soy (Chawanmushi-style)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Silky smooth steamed eggs with a texture smoother than tofu, finished with soy sauce and sesame oil. A comforting Chinese home cooking classic that requires nothing more than eggs, broth and patience.",
    ingredients: [
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Chicken broth, warm", quantity: "300", unit: "ml" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sesame oil", quantity: "1", unit: "tsp" },
      { name: "Spring onions", quantity: "2", unit: "stalks" },
      { name: "Salt", quantity: "0.5", unit: "tsp" }
    ],
    preparation_steps: [
      "Beat eggs gently without creating foam. Strain through a fine sieve.",
      "Mix with warm (not hot) chicken broth at a 1:1.5 ratio of egg to broth.",
      "Pour into bowls, cover tightly with plastic wrap.",
      "Steam over medium-low heat for 12-14 minutes until just set with a slight wobble.",
      "Drizzle with soy sauce and sesame oil, garnish with spring onions."
    ],
    chef_notes: "The secret is NOT whisking vigorously — air bubbles create holes in the silky texture. Steam on medium-low; high heat produces a pitted, rubbery custard.",
    serving_suggestions: "Serve as a starter or alongside rice and stir-fried vegetables.",
    flavor_profile: ["silky", "savory", "umami", "delicate"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    tags: ["Steamed", "Comfort Food", "Quick", "Cantonese"]
  },

  // ── SOUPS ────────────────────────────────────────────────────────────────────
  {
    dish_name: "Hot & Sour Soup (Suan La Tang)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "A classic Sichuan soup of complex contrasts — thick, egg-ribboned broth that is simultaneously sour from black vinegar, spicy from white pepper, savory from mushrooms and silky from tofu.",
    ingredients: [
      { name: "Chicken broth", quantity: "1", unit: "litre" },
      { name: "Firm tofu", quantity: "150", unit: "g" },
      { name: "Wood ear mushrooms", quantity: "30", unit: "g" },
      { name: "Bamboo shoots", quantity: "80", unit: "g" },
      { name: "Eggs", quantity: "2", unit: "pieces" },
      { name: "Chinkiang black vinegar", quantity: "3", unit: "tbsp" },
      { name: "White pepper", quantity: "1", unit: "tsp" },
      { name: "Cornstarch", quantity: "3", unit: "tbsp" }
    ],
    preparation_steps: [
      "Soak wood ear mushrooms 20 minutes, then slice thinly.",
      "Bring broth to a boil, add tofu, mushrooms and bamboo shoots.",
      "Add soy sauce, vinegar and white pepper.",
      "Stir cornstarch with cold water and slowly pour into simmering soup to thicken.",
      "Pour beaten egg in a slow stream while stirring to create ribbons. Serve hot."
    ],
    chef_notes: "Add vinegar OFF the heat or at the very end — boiling drives away the aroma. White pepper gives the 'hot', vinegar gives the 'sour'. Don't skimp on either.",
    serving_suggestions: "Serve as a starter before a Chinese meal or with steamed rice.",
    flavor_profile: ["sour", "spicy", "umami", "silky"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    tags: ["Sichuan", "Classic", "Quick", "Warming"]
  },
  {
    dish_name: "Wonton Soup",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Soups",
    difficulty_level: "medium",
    prep_time_minutes: 40,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Delicate pork-and-shrimp wontons swimming in a clear, deeply flavored broth — a Cantonese comfort food staple. The thin, silky wrappers and the aromatic broth are what make this dish sublime.",
    ingredients: [
      { name: "Wonton wrappers", quantity: "24", unit: "pieces" },
      { name: "Ground pork", quantity: "200", unit: "g" },
      { name: "Shrimp, peeled and minced", quantity: "150", unit: "g" },
      { name: "Chicken broth", quantity: "1.5", unit: "litres" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Bok choy", quantity: "2", unit: "heads" }
    ],
    preparation_steps: [
      "Mix pork and shrimp with soy sauce, sesame oil, ginger and spring onions.",
      "Place a teaspoon of filling in each wrapper. Wet edges and fold into triangle, then bring corners together.",
      "Simmer broth with ginger and spring onions for 20 minutes. Season well.",
      "Cook wontons in boiling water for 3-4 minutes until they float and filling is cooked.",
      "Transfer wontons to bowls, ladle hot broth over, add blanched bok choy."
    ],
    chef_notes: "Never boil wontons directly in your broth — it muddies the clear, delicate broth. Cook them separately in plain water and transfer to the serving bowls.",
    serving_suggestions: "Serve with chili oil drizzle and a side of wontons for dipping.",
    flavor_profile: ["delicate", "umami", "savory", "silky"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
    tags: ["Cantonese", "Comfort Food", "Classic", "Dim Sum"]
  },
  {
    dish_name: "Mapo Tofu Soup",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "A Sichuan classic transformed into a deeply satisfying soup — silken tofu and ground pork in a fiery, numbing broth of doubanjiang and Sichuan peppercorns. Bold, spicy and utterly addictive.",
    ingredients: [
      { name: "Silken tofu", quantity: "400", unit: "g" },
      { name: "Ground pork", quantity: "150", unit: "g" },
      { name: "Doubanjiang (spicy bean paste)", quantity: "2", unit: "tbsp" },
      { name: "Chicken broth", quantity: "500", unit: "ml" },
      { name: "Sichuan peppercorns, ground", quantity: "1", unit: "tsp" },
      { name: "Garlic", quantity: "4", unit: "cloves" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Fry doubanjiang in oil until oil turns red and fragrant.",
      "Add ground pork and cook until browned. Add garlic and ginger.",
      "Pour in broth and bring to a simmer.",
      "Gently add silken tofu cut into cubes — do not stir aggressively.",
      "Finish with ground Sichuan pepper, spring onions and a drizzle of chili oil."
    ],
    chef_notes: "Doubanjiang is the soul of this dish — don't substitute. Silken tofu is non-negotiable for the texture. The Sichuan peppercorn gives the characteristic numbing 'ma' sensation.",
    serving_suggestions: "Serve over steamed white rice to balance the heat.",
    flavor_profile: ["spicy", "numbing", "umami", "bold"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80",
    tags: ["Sichuan", "Spicy", "Quick", "Numbing"]
  },

  // ── SALADS ───────────────────────────────────────────────────────────────────
  {
    dish_name: "Smashed Cucumber Salad (Pai Huang Gua)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "A refreshing northern Chinese cold appetizer of smashed cucumbers marinated in garlic, rice vinegar, sesame oil and chili oil — crunchy, garlicky and impossibly refreshing.",
    ingredients: [
      { name: "English cucumbers", quantity: "2", unit: "large" },
      { name: "Garlic", quantity: "4", unit: "cloves" },
      { name: "Rice vinegar", quantity: "2", unit: "tbsp" },
      { name: "Sesame oil", quantity: "1", unit: "tbsp" },
      { name: "Chili oil", quantity: "1", unit: "tbsp" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" }
    ],
    preparation_steps: [
      "Smash cucumbers with the flat of a cleaver until they crack open. Cut into bite-sized pieces.",
      "Salt cucumbers and leave 10 minutes. Drain any liquid.",
      "Crush garlic and mix with rice vinegar, soy sauce, sesame oil, chili oil and sugar.",
      "Toss cucumbers with dressing 5 minutes before serving.",
      "Garnish with sesame seeds and fresh coriander."
    ],
    chef_notes: "Smashing rather than slicing creates jagged edges that absorb the dressing better. Salting and draining removes bitterness and excess water for a crunchier result.",
    serving_suggestions: "Serve as a refreshing starter or side dish at room temperature.",
    flavor_profile: ["refreshing", "garlicky", "tangy", "crunchy"],
    dietary_tags: ["vegetarian", "vegan", "dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
    tags: ["Vegetarian", "Cold Dish", "Quick", "Refreshing"]
  },
  {
    dish_name: "Sichuan Cold Noodle Salad (Liang Mian)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Chilled wheat noodles tossed in a complex sauce of sesame paste, chili oil, black vinegar and Sichuan pepper — a summer staple that delivers a symphony of spicy, numbing, tangy and savory sensations.",
    ingredients: [
      { name: "Fresh wheat noodles", quantity: "400", unit: "g" },
      { name: "Chinese sesame paste", quantity: "3", unit: "tbsp" },
      { name: "Chili oil", quantity: "2", unit: "tbsp" },
      { name: "Black vinegar", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sichuan pepper oil", quantity: "1", unit: "tsp" },
      { name: "Cucumber, julienned", quantity: "1", unit: "medium" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Cook noodles until just tender. Drain and rinse under cold water immediately.",
      "Toss with a little sesame oil to prevent sticking. Chill.",
      "Whisk sesame paste with soy sauce, vinegar, chili oil, a pinch of sugar and water until smooth.",
      "Toss chilled noodles with sauce, julienned cucumber and spring onions.",
      "Top with chili oil, Sichuan pepper oil and crushed peanuts."
    ],
    chef_notes: "Chinese sesame paste (made from roasted sesame seeds) is much more intense than Middle Eastern tahini — don't substitute. Rinsing noodles in cold water is essential for the right texture.",
    serving_suggestions: "Serve cold as a street food style snack or light summer meal.",
    flavor_profile: ["spicy", "nutty", "tangy", "numbing"],
    dietary_tags: ["vegetarian", "dairy-free"],
    img: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80",
    tags: ["Sichuan", "Cold Noodles", "Street Food", "Summer"]
  },

  // ── MAIN COURSES ─────────────────────────────────────────────────────────────
  {
    dish_name: "Kung Pao Chicken (Gong Bao Ji Ding)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "The world-famous Sichuan stir-fry of diced chicken with dried chilies, Sichuan peppercorns and peanuts in a glossy, sweet-spicy-sour sauce. Authentic Kung Pao is complex, numbing and deeply satisfying.",
    ingredients: [
      { name: "Chicken breast, diced", quantity: "500", unit: "g" },
      { name: "Dried red chilies", quantity: "8", unit: "pieces" },
      { name: "Sichuan peppercorns", quantity: "1", unit: "tsp" },
      { name: "Roasted peanuts", quantity: "80", unit: "g" },
      { name: "Soy sauce", quantity: "3", unit: "tbsp" },
      { name: "Chinkiang black vinegar", quantity: "2", unit: "tbsp" },
      { name: "Sugar", quantity: "2", unit: "tbsp" },
      { name: "Garlic and ginger", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Marinate chicken in soy sauce, Shaoxing wine and cornstarch for 15 minutes.",
      "Mix sauce: soy sauce, vinegar, sugar, chicken broth and cornstarch.",
      "Wok-fry chilies and Sichuan pepper in oil until fragrant. Remove chilies.",
      "Stir-fry chicken on high heat until just cooked. Add garlic and ginger.",
      "Pour in sauce, toss until glossy, add peanuts and spring onions last."
    ],
    chef_notes: "The wok must be screaming hot — this dish lives and dies by wok hei (the breath of the wok). Cook in small batches so the temperature never drops. The vinegar and sugar ratio creates the unique 'lychee sauce' flavor.",
    serving_suggestions: "Serve over steamed white rice or with steamed jasmine rice.",
    flavor_profile: ["spicy", "numbing", "sweet", "tangy", "savory"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80",
    tags: ["Sichuan", "Stir-Fry", "Iconic", "Spicy"]
  },
  {
    dish_name: "Peking Duck (Beijing Kaoya)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "hard",
    prep_time_minutes: 1440,
    cook_time_minutes: 90,
    servings: 4,
    short_description: "China's most celebrated dish — lacquered duck with impossibly thin, crackling skin served with Mandarin pancakes, hoisin sauce and cucumber. A Beijing imperial classic that requires patience but delivers spectacular results.",
    ingredients: [
      { name: "Whole duck", quantity: "1", unit: "kg" },
      { name: "Maltose syrup", quantity: "3", unit: "tbsp" },
      { name: "Mandarin pancakes", quantity: "16", unit: "pieces" },
      { name: "Hoisin sauce", quantity: "4", unit: "tbsp" },
      { name: "Cucumber, julienned", quantity: "1", unit: "medium" },
      { name: "Spring onions", quantity: "6", unit: "stalks" },
      { name: "Five spice powder", quantity: "2", unit: "tsp" },
      { name: "Salt", quantity: "2", unit: "tsp" }
    ],
    preparation_steps: [
      "Clean duck and air-dry in refrigerator uncovered for 24-48 hours — this is critical for crispy skin.",
      "Blanch duck with boiling water, dry again. Brush with maltose-water glaze.",
      "Season cavity with five spice and salt. Roast at 200°C for 45 minutes, then 220°C for 30 minutes.",
      "Rest 15 minutes. Carve the crispy skin and meat separately.",
      "Serve skin and meat on warm pancakes with hoisin, cucumber and spring onions."
    ],
    chef_notes: "Air-drying is the single most important step — 48 hours gives near-restaurant results. The maltose glaze creates that characteristic mahogany lacquer color.",
    serving_suggestions: "Serve in two courses — first the skin, then the meat — as is traditional in Beijing restaurants.",
    flavor_profile: ["rich", "crispy", "caramelized", "sweet-savory"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&q=80",
    tags: ["Beijing", "Imperial", "Special Occasion", "Iconic"]
  },
  {
    dish_name: "Sweet & Sour Pork (Gu Lao Rou)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Tender, twice-fried pork pieces in a vibrant glossy sauce of pineapple, bell peppers and tomato ketchup — a Cantonese classic that has become one of the world's most beloved Chinese dishes.",
    ingredients: [
      { name: "Pork tenderloin", quantity: "400", unit: "g" },
      { name: "Pineapple chunks", quantity: "150", unit: "g" },
      { name: "Bell peppers", quantity: "2", unit: "pieces" },
      { name: "Tomato ketchup", quantity: "4", unit: "tbsp" },
      { name: "Rice vinegar", quantity: "3", unit: "tbsp" },
      { name: "Sugar", quantity: "3", unit: "tbsp" },
      { name: "Cornstarch", quantity: "4", unit: "tbsp" },
      { name: "Egg", quantity: "1", unit: "piece" }
    ],
    preparation_steps: [
      "Cut pork into bite-sized pieces, coat in egg and cornstarch batter.",
      "Deep fry at 180°C until golden. Remove, rest 2 minutes, fry again for extra crunch.",
      "Stir-fry bell peppers and pineapple briefly in a hot wok.",
      "Add sauce of ketchup, vinegar, sugar, water and cornstarch. Stir until glossy.",
      "Toss fried pork in the sauce immediately before serving."
    ],
    chef_notes: "Double-frying is the secret to pork that stays crispy in the sauce. Add the pork to the sauce at the LAST moment — only toss right before serving.",
    serving_suggestions: "Serve immediately over steamed white rice with jasmine tea.",
    flavor_profile: ["sweet", "tangy", "crispy", "colorful"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    tags: ["Cantonese", "Classic", "Family Favorite", "Stir-Fry"]
  },
  {
    dish_name: "Dan Dan Noodles",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Sichuan's most famous street food noodle dish — wheat noodles in a complex sauce of sesame paste, doubanjiang, preserved vegetables and spiced minced pork with Sichuan peppercorn numbing heat.",
    ingredients: [
      { name: "Fresh wheat noodles", quantity: "400", unit: "g" },
      { name: "Ground pork", quantity: "200", unit: "g" },
      { name: "Chinese sesame paste", quantity: "3", unit: "tbsp" },
      { name: "Doubanjiang", quantity: "1", unit: "tbsp" },
      { name: "Ya Cai (preserved vegetables)", quantity: "3", unit: "tbsp" },
      { name: "Chili oil", quantity: "3", unit: "tbsp" },
      { name: "Sichuan peppercorns, toasted", quantity: "1", unit: "tsp" },
      { name: "Chicken broth", quantity: "200", unit: "ml" }
    ],
    preparation_steps: [
      "Fry pork with doubanjiang and ya cai until fragrant and well-colored.",
      "Mix sauce base in each bowl: sesame paste, soy sauce, chili oil, Sichuan pepper oil, broth and vinegar.",
      "Cook noodles, drain and divide into bowls.",
      "Ladle spiced minced pork over noodles.",
      "Garnish with spring onions, ground Sichuan pepper and additional chili oil."
    ],
    chef_notes: "Ya Cai (Yibin preserved mustard greens) is essential for the authentic texture and funk — available in Asian grocery stores. Don't skip the toasted and ground Sichuan peppercorn finish.",
    serving_suggestions: "Serve in individual bowls — each person mixes their own noodles before eating.",
    flavor_profile: ["spicy", "numbing", "savory", "nutty", "complex"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
    tags: ["Sichuan", "Street Food", "Noodles", "Iconic"]
  },
  {
    dish_name: "Mapo Tofu (Ma Po Dou Fu)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Soft silken tofu in a fiery, numbing Sichuan sauce of doubanjiang, fermented black beans and ground pork — one of China's most iconic dishes, packing extraordinary flavor into deceptively simple ingredients.",
    ingredients: [
      { name: "Silken tofu", quantity: "600", unit: "g" },
      { name: "Ground pork", quantity: "150", unit: "g" },
      { name: "Doubanjiang", quantity: "2", unit: "tbsp" },
      { name: "Fermented black beans", quantity: "1", unit: "tbsp" },
      { name: "Sichuan peppercorns, ground", quantity: "1.5", unit: "tsp" },
      { name: "Garlic and ginger", quantity: "2", unit: "tbsp" },
      { name: "Chicken broth", quantity: "300", unit: "ml" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Fry doubanjiang and fermented black beans in oil until oil turns deep red.",
      "Add garlic, ginger and pork. Cook until pork is done.",
      "Add broth and bring to a simmer.",
      "Carefully add silken tofu cut in cubes — it's very fragile.",
      "Thicken with cornstarch slurry, finish with Sichuan pepper. Garnish with spring onions."
    ],
    chef_notes: "Handle the silken tofu with extreme care — use a spatula or spoon to gently fold it in, never stir. The ground Sichuan peppercorn should be added right at the end for maximum numbing impact.",
    serving_suggestions: "Absolutely must be served with steamed white rice — the numbing heat needs a neutral base.",
    flavor_profile: ["numbing", "spicy", "umami", "silky"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80",
    tags: ["Sichuan", "Iconic", "Spicy", "Tofu"]
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    dish_name: "Mango Pudding",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Desserts",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 0,
    servings: 6,
    short_description: "A silky, intensely flavored Cantonese dessert made with ripe Alphonso mango and cream — smooth, cool and vibrantly colored. A Hong Kong dim sum institution that is simpler to make than it looks.",
    ingredients: [
      { name: "Ripe mango pulp", quantity: "400", unit: "g" },
      { name: "Heavy cream", quantity: "200", unit: "ml" },
      { name: "Gelatin sheets", quantity: "4", unit: "pieces" },
      { name: "Sugar", quantity: "60", unit: "g" },
      { name: "Coconut milk", quantity: "100", unit: "ml" },
      { name: "Fresh mango for garnish", quantity: "1", unit: "piece" }
    ],
    preparation_steps: [
      "Bloom gelatin in cold water for 5 minutes.",
      "Heat coconut milk with sugar until dissolved. Squeeze excess water from gelatin and melt in.",
      "Blend mango pulp until smooth. Mix with coconut milk mixture and cream.",
      "Pour into serving glasses or moulds. Refrigerate 4 hours until set.",
      "Serve unmoulded with fresh mango, evaporated milk drizzle and a mint leaf."
    ],
    chef_notes: "Use the ripest, most fragrant mangoes you can find — Alphonso or Ataulfo varieties give the best flavor and color. The evaporated milk drizzle is the classic Hong Kong garnish.",
    serving_suggestions: "Serve chilled garnished with fresh mango and evaporated milk.",
    flavor_profile: ["sweet", "tropical", "creamy", "silky"],
    dietary_tags: ["gluten-free", "vegetarian"],
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
    tags: ["Dim Sum", "Hong Kong", "Cold Dessert", "Summer"]
  },
  {
    dish_name: "Tang Yuan (Glutinous Rice Balls)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 40,
    cook_time_minutes: 10,
    servings: 6,
    short_description: "Chewy glutinous rice balls filled with a molten black sesame paste, served in sweet ginger broth. Eaten at the Lantern Festival and Winter Solstice, Tang Yuan symbolizes family reunion and togetherness.",
    ingredients: [
      { name: "Glutinous rice flour", quantity: "250", unit: "g" },
      { name: "Black sesame seeds, toasted", quantity: "150", unit: "g" },
      { name: "Butter", quantity: "50", unit: "g" },
      { name: "Sugar", quantity: "80", unit: "g" },
      { name: "Fresh ginger", quantity: "2", unit: "inch" },
      { name: "Brown sugar", quantity: "60", unit: "g" },
      { name: "Water", quantity: "500", unit: "ml" }
    ],
    preparation_steps: [
      "Grind toasted sesame seeds to a paste. Mix with soft butter and sugar. Freeze in small balls.",
      "Knead glutinous rice flour with warm water into a smooth, pliable dough.",
      "Flatten a ball of dough in your palm, place frozen sesame filling in center. Seal smoothly.",
      "Simmer ginger and brown sugar in water for the serving broth.",
      "Cook Tang Yuan in boiling water until they float. Transfer to ginger broth and serve."
    ],
    chef_notes: "Freezing the sesame filling is critical — it must be solid when you wrap it so it doesn't break through the delicate wrapper. The balls are done when they float.",
    serving_suggestions: "Serve 3-4 balls per person in warm ginger broth. The number 3 is traditional.",
    flavor_profile: ["chewy", "nutty", "sweet", "warming"],
    dietary_tags: ["vegetarian", "dairy-free"],
    img: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80",
    tags: ["Festival Food", "Lantern Festival", "Traditional", "Chewy"]
  },
  {
    dish_name: "Egg Tarts (Dan Ta)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 25,
    servings: 8,
    short_description: "Flaky, buttery pastry shells filled with smooth, wobbly egg custard — a Hong Kong bakery classic inspired by Portuguese pastel de nata. The contrast between the crisp shell and silky custard is perfection.",
    ingredients: [
      { name: "All-purpose flour", quantity: "200", unit: "g" },
      { name: "Butter", quantity: "120", unit: "g" },
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Sugar", quantity: "80", unit: "g" },
      { name: "Evaporated milk", quantity: "100", unit: "ml" },
      { name: "Hot water", quantity: "150", unit: "ml" },
      { name: "Vanilla extract", quantity: "0.5", unit: "tsp" }
    ],
    preparation_steps: [
      "Make pastry by rubbing butter into flour with sugar until breadcrumb texture. Add egg yolk and cold water to bind.",
      "Press pastry into tart moulds. Refrigerate 20 minutes.",
      "Dissolve sugar in hot water. Cool, then mix with eggs, evaporated milk and vanilla.",
      "Strain custard and pour into pastry shells.",
      "Bake at 180°C for 20-25 minutes until custard is just set with a slight wobble."
    ],
    chef_notes: "The custard should wobble like jelly when you take it out — residual heat continues cooking. Overbaked tarts have a pitted, rubbery surface.",
    serving_suggestions: "Serve warm from the oven at dim sum or as an afternoon snack with tea.",
    flavor_profile: ["buttery", "sweet", "eggy", "silky"],
    dietary_tags: ["vegetarian"],
    img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80",
    tags: ["Hong Kong", "Dim Sum", "Baked", "Classic"]
  }
// ── NEW CHINESE DISHES TO ADD ────────────────────────────────────────────────

  // ── RICE PREPARATIONS ──────────────────────────────────────────────────────
  {
    dish_name: "Yangzhou Fried Rice",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Rice Preparations",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 15,
    total_time_minutes: 30,
    servings: 4,
    short_description: "China's most celebrated fried rice — golden egg-coated grains stir-fried with prawns, ham, peas and spring onion. Born in Yangzhou, perfected across the world.",
    ingredients: [
      { name: "Cold cooked jasmine rice", quantity: "600", unit: "g" },
      { name: "Eggs", quantity: "3", unit: "large" },
      { name: "Tiger prawns", quantity: "150", unit: "g" },
      { name: "Chinese ham or bacon", quantity: "100", unit: "g" },
      { name: "Frozen peas", quantity: "80", unit: "g" },
      { name: "Spring onion", quantity: "4", unit: "stalks" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sesame oil", quantity: "1", unit: "tsp" },
      { name: "Vegetable oil", quantity: "3", unit: "tbsp" },
      { name: "Salt", quantity: "0.5", unit: "tsp" },
      { name: "White pepper", quantity: "0.5", unit: "tsp" },
    ],
    preparation_steps: [
      "Use cold day-old rice — fresh rice makes it soggy. Break up all clumps.",
      "Beat eggs with a pinch of salt.",
      "Heat wok until smoking. Add oil and scramble eggs until just set. Remove.",
      "Reheat wok, add more oil, stir-fry prawns until pink. Remove.",
      "Add rice to blazing hot wok. Stir-fry vigorously, pressing against wok.",
      "Add ham and peas. Season with soy sauce and white pepper.",
      "Return eggs and prawns. Toss everything together rapidly.",
      "Drizzle sesame oil and toss with spring onion. Serve immediately.",
    ],
    chef_notes: "Wok hei — the breath of the wok — is everything in fried rice. The highest possible heat creates that smoky, slightly charred aroma that makes restaurant fried rice so irresistible. Never use fresh rice.",
    serving_suggestions: "Serve immediately in a hot bowl. Perfect alongside any Chinese main course.",
    nutrition_estimate: { calories: "385", protein_g: "18", carbohydrates_g: "52", fat_g: "12" },
    tags: ["Fried Rice", "Yangzhou", "Classic", "Chinese"],
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
  },
  {
    dish_name: "Claypot Rice (Bo Zai Fan)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Rice Preparations",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 30,
    total_time_minutes: 50,
    servings: 4,
    short_description: "A Cantonese street food icon — rice cooked in a clay pot until a crispy golden crust forms on the bottom, topped with Chinese sausage, chicken and a drizzle of dark soy sauce.",
    ingredients: [
      { name: "Jasmine rice", quantity: "400", unit: "g" },
      { name: "Chinese sausage (lap cheong)", quantity: "3", unit: "pieces" },
      { name: "Chicken thigh", quantity: "300", unit: "g" },
      { name: "Shiitake mushrooms", quantity: "6", unit: "pieces" },
      { name: "Dark soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Light soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Oyster sauce", quantity: "2", unit: "tbsp" },
      { name: "Sesame oil", quantity: "1", unit: "tsp" },
      { name: "Ginger", quantity: "3", unit: "slices" },
      { name: "Spring onion", quantity: "3", unit: "stalks" },
    ],
    preparation_steps: [
      "Soak rice 30 minutes. Marinate chicken with soy, oyster sauce and ginger.",
      "Slice Chinese sausage diagonally. Soak and slice shiitake mushrooms.",
      "Cook rice in clay pot with water until almost absorbed — about 15 minutes.",
      "Arrange chicken, sausage and mushrooms on top of rice.",
      "Cover and cook on lowest heat 15 more minutes.",
      "Turn heat to high for last 2 minutes to create crispy rice crust.",
      "Drizzle dark soy and sesame oil over everything.",
      "Garnish with spring onion and bring to table in the clay pot.",
    ],
    chef_notes: "The crispy rice crust at the bottom (guo ba) is the most prized part. The high heat at the end is essential — listen for the gentle crackling sound.",
    serving_suggestions: "Serve at the table in the clay pot. Scrape the golden crust from the bottom for a special treat.",
    nutrition_estimate: { calories: "465", protein_g: "24", carbohydrates_g: "58", fat_g: "14" },
    tags: ["Claypot", "Cantonese", "Street Food", "Chinese"],
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
  },
  {
    dish_name: "Congee (Jook / Rice Porridge)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Rice Preparations",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 60,
    total_time_minutes: 70,
    servings: 4,
    short_description: "China's ultimate healing comfort food — silky smooth rice porridge cooked until the grains dissolve, topped with century egg, ginger, spring onion and crispy you tiao.",
    ingredients: [
      { name: "Jasmine rice", quantity: "150", unit: "g" },
      { name: "Chicken stock", quantity: "1.5", unit: "litres" },
      { name: "Ginger", quantity: "4", unit: "slices" },
      { name: "Century egg (pidan)", quantity: "2", unit: "pieces" },
      { name: "Salted pork or chicken", quantity: "200", unit: "g" },
      { name: "Spring onion", quantity: "4", unit: "stalks" },
      { name: "White pepper", quantity: "1", unit: "tsp" },
      { name: "Sesame oil", quantity: "1", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "You tiao (fried dough sticks)", quantity: "2", unit: "pieces" },
    ],
    preparation_steps: [
      "Rinse rice and soak 30 minutes for faster cooking.",
      "Bring chicken stock to boil with ginger slices.",
      "Add rice and boil vigorously 10 minutes, then reduce to simmer.",
      "Simmer 45-50 minutes, stirring occasionally until grains dissolve completely.",
      "Shred chicken or pork into the congee. Season with salt and white pepper.",
      "Slice century eggs into wedges.",
      "Ladle into bowls and top with century egg, spring onion.",
      "Drizzle with sesame oil and soy sauce. Add crispy you tiao alongside.",
    ],
    chef_notes: "Congee should be as smooth as silk — cook until you cannot distinguish individual rice grains. A rice-to-water ratio of 1:10 ensures proper consistency. Worth every minute of cooking.",
    serving_suggestions: "Serve hot for breakfast or when feeling under the weather. The you tiao should be dipped into the congee.",
    nutrition_estimate: { calories: "285", protein_g: "16", carbohydrates_g: "38", fat_g: "8" },
    tags: ["Congee", "Healing", "Breakfast", "Cantonese"],
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
  },
  {
    dish_name: "Sticky Rice in Lotus Leaf (Lo Mai Gai)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Rice Preparations",
    difficulty_level: "hard",
    prep_time_minutes: 60,
    cook_time_minutes: 45,
    total_time_minutes: 105,
    servings: 6,
    short_description: "A dim sum masterpiece — glutinous rice stuffed with chicken, mushrooms, Chinese sausage and egg yolk, wrapped in a fragrant lotus leaf and steamed until tender and aromatic.",
    ingredients: [
      { name: "Glutinous rice", quantity: "500", unit: "g" },
      { name: "Dried lotus leaves", quantity: "6", unit: "pieces" },
      { name: "Chicken thigh", quantity: "300", unit: "g" },
      { name: "Chinese sausage", quantity: "2", unit: "pieces" },
      { name: "Dried shiitake mushrooms", quantity: "8", unit: "pieces" },
      { name: "Salted egg yolks", quantity: "6", unit: "pieces" },
      { name: "Oyster sauce", quantity: "3", unit: "tbsp" },
      { name: "Dark soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sesame oil", quantity: "2", unit: "tsp" },
      { name: "Spring onion", quantity: "4", unit: "stalks" },
    ],
    preparation_steps: [
      "Soak glutinous rice 4 hours. Soak dried lotus leaves and mushrooms 30 minutes.",
      "Steam rice 25 minutes until cooked. Season with oyster sauce and soy sauce.",
      "Marinate chicken with soy, oyster sauce and sesame oil. Pan-fry until golden.",
      "Slice sausage. Squeeze mushrooms and slice.",
      "Lay lotus leaf flat. Place large scoop of rice in centre.",
      "Add chicken, mushroom, sausage and salted egg yolk on top.",
      "Cover with more rice and wrap the lotus leaf tightly around.",
      "Steam parcels for 45 minutes until fragrant.",
    ],
    chef_notes: "The lotus leaf is not just a wrapper — it perfumes the rice with an irreplaceable floral, grassy aroma during steaming. Dried lotus leaves must be softened in hot water first.",
    serving_suggestions: "Serve at dim sum brunch. Unwrap at the table for the dramatic reveal of aroma.",
    nutrition_estimate: { calories: "485", protein_g: "22", carbohydrates_g: "68", fat_g: "14" },
    tags: ["Dim Sum", "Lotus Leaf", "Glutinous Rice", "Cantonese"],
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
  },
  {
    dish_name: "Steamed Egg White Rice (Bao Fan)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Rice Preparations",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 25,
    total_time_minutes: 35,
    servings: 4,
    short_description: "Simple, nourishing Cantonese rice cooked with preserved vegetables and pork — the everyday rice dish of millions of Chinese homes, fragrant and deeply satisfying.",
    ingredients: [
      { name: "Jasmine rice", quantity: "400", unit: "g" },
      { name: "Water", quantity: "480", unit: "ml" },
      { name: "Preserved mustard greens (mei cai)", quantity: "60", unit: "g" },
      { name: "Ground pork", quantity: "150", unit: "g" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Oyster sauce", quantity: "1", unit: "tbsp" },
      { name: "Sesame oil", quantity: "1", unit: "tsp" },
      { name: "Ginger", quantity: "2", unit: "slices" },
    ],
    preparation_steps: [
      "Rinse rice until water runs clear. Add to rice cooker or pot.",
      "Soak preserved mustard greens in water 15 minutes to reduce saltiness.",
      "Season pork with soy sauce and oyster sauce.",
      "Drain and squeeze mustard greens. Chop roughly.",
      "Place seasoned pork and mustard greens on top of uncooked rice.",
      "Cook rice normally — pork and greens steam on top.",
      "When done, drizzle sesame oil and fluff with chopsticks.",
    ],
    chef_notes: "Preserved mustard greens add a unique umami depth that fresh vegetables cannot replicate. Always soak to remove excess salt before using.",
    serving_suggestions: "Serve as part of a simple Chinese home meal with stir-fried greens and soup.",
    nutrition_estimate: { calories: "345", protein_g: "14", carbohydrates_g: "56", fat_g: "8" },
    tags: ["Home Cooking", "Simple", "Everyday", "Cantonese"],
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
  },

  // ── ADDITIONAL AUTHENTIC DISHES ────────────────────────────────────────────
  {
    dish_name: "Beggar's Chicken (Jiaohua Ji)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "hard",
    prep_time_minutes: 60,
    cook_time_minutes: 180,
    total_time_minutes: 240,
    servings: 4,
    short_description: "A legendary Chinese dish — a whole chicken stuffed with aromatics, wrapped in lotus leaves and clay, then baked for hours. The clay is cracked at the table for a dramatic reveal.",
    ingredients: [
      { name: "Whole chicken", quantity: "1.5", unit: "kg" },
      { name: "Dried lotus leaves", quantity: "4", unit: "pieces" },
      { name: "Shaoxing wine", quantity: "4", unit: "tbsp" },
      { name: "Dark soy sauce", quantity: "3", unit: "tbsp" },
      { name: "Five spice powder", quantity: "2", unit: "tsp" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Spring onion", quantity: "4", unit: "stalks" },
      { name: "Shiitake mushrooms", quantity: "6", unit: "pieces" },
      { name: "Chinese sausage", quantity: "2", unit: "pieces" },
      { name: "Air-dry clay or baking dough", quantity: "2", unit: "kg" },
    ],
    preparation_steps: [
      "Marinate whole chicken in soy sauce, Shaoxing wine and five spice overnight.",
      "Soak lotus leaves until pliable.",
      "Stuff chicken cavity with ginger, spring onion, mushrooms and sausage.",
      "Wrap chicken tightly in two layers of lotus leaves, then foil.",
      "Encase completely in clay or thick dough, sealing all edges.",
      "Bake at 200°C for 3 hours.",
      "Bring to the table and crack the clay shell dramatically.",
      "The fragrant steam release is part of the experience.",
    ],
    chef_notes: "This dish is about theatre as much as flavour. The clay seals in all moisture and the lotus leaf perfumes the chicken as it steams inside. Modern versions use baking dough instead of clay.",
    serving_suggestions: "Crack the clay shell at the table for maximum drama. Serve with steamed rice and vegetables.",
    nutrition_estimate: { calories: "485", protein_g: "42", carbohydrates_g: "12", fat_g: "28" },
    tags: ["Legendary", "Whole Chicken", "Traditional", "Chinese"],
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
  },
  {
    dish_name: "Red Braised Pork Belly (Hong Shao Rou)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 90,
    total_time_minutes: 110,
    servings: 4,
    short_description: "Chairman Mao's favourite dish — thick slabs of pork belly braised in soy sauce, Shaoxing wine and rock sugar until meltingly tender and lacquered with a glossy mahogany glaze.",
    ingredients: [
      { name: "Pork belly", quantity: "800", unit: "g" },
      { name: "Shaoxing wine", quantity: "4", unit: "tbsp" },
      { name: "Dark soy sauce", quantity: "3", unit: "tbsp" },
      { name: "Light soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Rock sugar", quantity: "40", unit: "g" },
      { name: "Ginger", quantity: "5", unit: "slices" },
      { name: "Spring onion", quantity: "4", unit: "stalks" },
      { name: "Star anise", quantity: "3", unit: "pieces" },
      { name: "Cinnamon stick", quantity: "1", unit: "piece" },
      { name: "Water", quantity: "300", unit: "ml" },
    ],
    preparation_steps: [
      "Blanch pork belly in boiling water 5 minutes. Rinse and cut into 4cm cubes.",
      "Melt rock sugar in a wok until amber caramel forms.",
      "Add pork belly and toss to coat in caramel.",
      "Add Shaoxing wine, soy sauces, ginger, spring onion and spices.",
      "Add water to just cover the pork.",
      "Braise covered on low heat for 1 hour.",
      "Remove lid and increase heat to reduce sauce until thick and glossy.",
      "Serve over steamed rice with braising sauce poured over.",
    ],
    chef_notes: "Rock sugar, not regular sugar, is essential for the glossy lacquered finish. The long braising time breaks down the collagen in pork belly into silky, jiggly gelatin.",
    serving_suggestions: "Serve over steamed white rice. The braising sauce is as precious as the pork itself.",
    nutrition_estimate: { calories: "520", protein_g: "28", carbohydrates_g: "18", fat_g: "38" },
    tags: ["Braised Pork", "Hunan", "Mao's Favourite", "Chinese"],
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
  },
  {
    dish_name: "Buddha's Delight (Luo Han Zhai)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 25,
    total_time_minutes: 55,
    servings: 4,
    short_description: "A magnificent Chinese New Year vegetarian dish — a medley of 18 dried and fresh ingredients including tofu skin, glass noodles, lotus root and mushrooms, braised in a rich vegetarian sauce.",
    ingredients: [
      { name: "Firm tofu", quantity: "200", unit: "g" },
      { name: "Dried lily buds", quantity: "30", unit: "g" },
      { name: "Dried wood ear mushrooms", quantity: "20", unit: "g" },
      { name: "Glass noodles", quantity: "100", unit: "g" },
      { name: "Lotus root", quantity: "150", unit: "g" },
      { name: "Napa cabbage", quantity: "200", unit: "g" },
      { name: "Dried shiitake mushrooms", quantity: "8", unit: "pieces" },
      { name: "Fried tofu puffs", quantity: "100", unit: "g" },
      { name: "Oyster sauce (or vegetarian)", quantity: "3", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sesame oil", quantity: "1", unit: "tsp" },
    ],
    preparation_steps: [
      "Soak all dried ingredients separately in warm water 20 minutes.",
      "Drain and reserve mushroom soaking water.",
      "Fry tofu until golden on all sides.",
      "Stir-fry ginger in hot oil. Add mushrooms and lily buds.",
      "Add all vegetables and tofu. Pour in mushroom soaking water.",
      "Add oyster sauce and soy sauce.",
      "Simmer 15 minutes until vegetables are tender.",
      "Add glass noodles last. Drizzle sesame oil before serving.",
    ],
    chef_notes: "Traditionally served on the first day of Chinese New Year as a cleansing, auspicious meal. Each ingredient carries symbolic meaning for luck and prosperity.",
    serving_suggestions: "Serve as a centrepiece dish for Chinese New Year celebrations with steamed rice.",
    nutrition_estimate: { calories: "245", protein_g: "12", carbohydrates_g: "32", fat_g: "9" },
    tags: ["Vegetarian", "Chinese New Year", "Buddhist", "Auspicious"],
    img: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80",
  },
  {
    dish_name: "Sichuan Boiled Fish (Shui Zhu Yu)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 25,
    cook_time_minutes: 20,
    total_time_minutes: 45,
    servings: 4,
    short_description: "A breathtaking Sichuan dish — silky fish fillets poached in a fiery broth of dried chillies, Sichuan peppercorns and bean paste, finished with smoking hot oil poured over to release the full aroma.",
    ingredients: [
      { name: "White fish fillets (grass carp or bass)", quantity: "600", unit: "g" },
      { name: "Dried red chillies", quantity: "20", unit: "pieces" },
      { name: "Sichuan peppercorns", quantity: "2", unit: "tbsp" },
      { name: "Doubanjiang (spicy bean paste)", quantity: "3", unit: "tbsp" },
      { name: "Bean sprouts", quantity: "200", unit: "g" },
      { name: "Egg white", quantity: "1", unit: "piece" },
      { name: "Cornstarch", quantity: "2", unit: "tbsp" },
      { name: "Garlic", quantity: "6", unit: "cloves" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Vegetable oil", quantity: "6", unit: "tbsp" },
      { name: "Chicken stock", quantity: "500", unit: "ml" },
    ],
    preparation_steps: [
      "Slice fish thinly. Marinate with egg white, cornstarch and salt.",
      "Blanch bean sprouts. Place in deep bowl.",
      "Fry doubanjiang in oil until fragrant and red oil separates.",
      "Add garlic and ginger. Add stock and bring to boil.",
      "Gently slide fish slices into broth. Cook 2-3 minutes only.",
      "Pour fish and broth over bean sprouts in bowl.",
      "Top with dried chillies, Sichuan peppercorns, garlic and spring onion.",
      "Heat oil until smoking. Pour over the toppings — stand back for the dramatic sizzle.",
    ],
    chef_notes: "The hot oil pour at the end is non-negotiable — it is what activates the Sichuan peppercorns' numbing ma la flavour. The fish must be velvet-smooth from the egg white marinade.",
    serving_suggestions: "Serve immediately with steamed rice. The numbing heat of Sichuan peppercorn is the defining experience.",
    nutrition_estimate: { calories: "320", protein_g: "34", carbohydrates_g: "12", fat_g: "16" },
    tags: ["Sichuan", "Spicy", "Ma La", "Fish"],
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
  },
  {
    dish_name: "Steamed Whole Fish with Ginger & Scallion",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 12,
    total_time_minutes: 27,
    servings: 4,
    short_description: "The quintessential Cantonese banquet dish — a whole fish steamed to perfect tenderness, draped with julienned ginger and spring onion, then finished with smoking hot oil and soy sauce.",
    ingredients: [
      { name: "Whole sea bass or red snapper", quantity: "800", unit: "g" },
      { name: "Ginger", quantity: "2", unit: "inch" },
      { name: "Spring onion", quantity: "6", unit: "stalks" },
      { name: "Light soy sauce", quantity: "4", unit: "tbsp" },
      { name: "Shaoxing wine", quantity: "2", unit: "tbsp" },
      { name: "Sesame oil", quantity: "1", unit: "tsp" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Vegetable oil", quantity: "4", unit: "tbsp" },
      { name: "Coriander", quantity: "4", unit: "sprigs" },
      { name: "Red chilli", quantity: "1", unit: "piece" },
    ],
    preparation_steps: [
      "Score fish on both sides with 3 diagonal cuts to the bone.",
      "Rub fish inside and out with ginger and Shaoxing wine.",
      "Place on steaming plate with spring onion underneath.",
      "Steam over high heat 10-12 minutes depending on size.",
      "Discard liquid that accumulates. Pour soy sauce mixed with sugar over fish.",
      "Top with fresh julienned ginger, spring onion, coriander and chilli.",
      "Heat oil until smoking — nearly burning.",
      "Pour oil over the fish — the sizzle is the cooking method.",
    ],
    chef_notes: "The fish is done when eyes turn white and flesh flakes at the thickest part. The smoking oil pour is essential — it partially cooks the fresh aromatics and releases their full fragrance.",
    serving_suggestions: "Serve at the centre of a Cantonese banquet. Serving a whole fish symbolises abundance and completeness.",
    nutrition_estimate: { calories: "265", protein_g: "36", carbohydrates_g: "6", fat_g: "11" },
    tags: ["Cantonese", "Steamed Fish", "Banquet", "Healthy"],
    img: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80",
  },
];

const japaneseCuisineData = [
  // ── SUSHI ──────────────────────────────────────────────────────────────────
  { dish_name:"Nigiri Sushi", state:"Japan", cuisine:"Japanese", category:"Sushi", difficulty_level:"Hard", prep_time_minutes:60, cook_time_minutes:30, total_time_minutes:90, servings:4, short_description:"The purest form of sushi — hand-pressed vinegared rice topped with the finest slices of raw fish. Each piece is a study in balance, simplicity and technique.", ingredients:[{name:"Sushi rice",quantity:"400",unit:"g"},{name:"Rice vinegar",quantity:"4",unit:"tbsp"},{name:"Sugar",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Fresh tuna (maguro)",quantity:"200",unit:"g"},{name:"Fresh salmon",quantity:"200",unit:"g"},{name:"Wasabi paste",quantity:"2",unit:"tbsp"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Pickled ginger",quantity:"4",unit:"tbsp"}], preparation_steps:["Cook sushi rice and season with rice vinegar, sugar and salt mixture while still warm.","Fan the rice while mixing to give it a glossy shine. Cool to room temperature.","Slice fish at 45-degree angle into pieces approximately 7cm x 3cm x 5mm thick.","Wet your hands with water-vinegar mixture to prevent sticking.","Take a small ball of rice (about 15g), press firmly into an oval shape.","Dab a tiny amount of wasabi on top of the rice.","Drape fish over the rice and press gently to adhere.","Serve immediately with soy sauce and pickled ginger."], chef_notes:"The rice temperature is critical — it should be body temperature when you form nigiri. Too cold and it becomes dense, too warm and the fish deteriorates.", serving_suggestions:"Serve with soy sauce for dipping, wasabi and pickled ginger to cleanse the palate between pieces.", nutrition_estimate:{calories:"280",protein_g:"18",carbohydrates_g:"38",fat_g:"5"}, tags:["Sushi","Traditional","Japanese","Raw Fish"], img:"https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80" },
  { dish_name:"Maki Sushi", state:"Japan", cuisine:"Japanese", category:"Sushi", difficulty_level:"Medium", prep_time_minutes:45, cook_time_minutes:30, total_time_minutes:75, servings:4, short_description:"Classic rolled sushi — vinegared rice and fillings wrapped in crisp nori seaweed. The most recognisable form of sushi worldwide.", ingredients:[{name:"Sushi rice",quantity:"400",unit:"g"},{name:"Nori sheets",quantity:"6",unit:"pieces"},{name:"Fresh tuna",quantity:"150",unit:"g"},{name:"Cucumber",quantity:"1",unit:"medium"},{name:"Avocado",quantity:"1",unit:"large"},{name:"Rice vinegar",quantity:"4",unit:"tbsp"},{name:"Sugar",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"}], preparation_steps:["Season cooked sushi rice with vinegar, sugar and salt. Cool completely.","Lay nori sheet shiny-side down on bamboo mat.","Spread thin layer of rice over nori leaving 2cm border at top.","Sprinkle sesame seeds over rice.","Place fillings in a line across the centre.","Roll firmly using the bamboo mat, applying gentle pressure.","Seal the edge with water.","Using a sharp wet knife, cut into 6-8 pieces with clean decisive strokes."], chef_notes:"A sharp knife is essential. Wet the blade between each cut. Press firmly but not so hard that the filling squeezes out.", serving_suggestions:"Arrange cut-side up on a platter. Serve with soy sauce, wasabi and pickled ginger.", nutrition_estimate:{calories:"265",protein_g:"12",carbohydrates_g:"42",fat_g:"6"}, tags:["Sushi","Maki","Japanese","Beginner Friendly"], img:"https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80" },
  { dish_name:"Temaki Sushi (Hand Roll)", state:"Japan", cuisine:"Japanese", category:"Sushi", difficulty_level:"Easy", prep_time_minutes:30, cook_time_minutes:20, total_time_minutes:50, servings:4, short_description:"A casual, cone-shaped hand roll of nori filled with rice, fish and vegetables — perfect for interactive dinner parties and home sushi nights.", ingredients:[{name:"Sushi rice",quantity:"300",unit:"g"},{name:"Nori sheets",quantity:"8",unit:"pieces"},{name:"Salmon sashimi",quantity:"150",unit:"g"},{name:"Tuna sashimi",quantity:"150",unit:"g"},{name:"Cucumber",quantity:"1",unit:"medium"},{name:"Avocado",quantity:"1",unit:"large"},{name:"Cream cheese",quantity:"50",unit:"g"},{name:"Wasabi",quantity:"2",unit:"tbsp"},{name:"Tobiko (fish roe)",quantity:"4",unit:"tbsp"}], preparation_steps:["Prepare all fillings — slice fish, julienne cucumber, slice avocado.","Cut nori sheets in half.","Hold half-nori sheet in palm.","Place small amount of rice on left side of nori.","Add wasabi and chosen fillings diagonally.","Roll into a cone shape from left to right.","Seal the point with a grain of rice.","Eat immediately — temaki goes soggy if left too long."], chef_notes:"Temaki is best eaten the moment it is made. Set up all ingredients as a spread and let everyone make their own — it makes for a wonderful interactive meal.", serving_suggestions:"Set up as a DIY sushi station with all fillings in separate bowls. Perfect for parties.", nutrition_estimate:{calories:"245",protein_g:"16",carbohydrates_g:"34",fat_g:"7"}, tags:["Sushi","Hand Roll","Party Food","Interactive"], img:"https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400&q=80" },
  { dish_name:"Uramaki (Inside-Out Roll)", state:"Japan", cuisine:"Japanese", category:"Sushi", difficulty_level:"Hard", prep_time_minutes:50, cook_time_minutes:30, total_time_minutes:80, servings:4, short_description:"The California and spicy tuna rolls that made sushi famous worldwide — rice on the outside, nori wrapping the fillings inside. A modern sushi innovation.", ingredients:[{name:"Sushi rice",quantity:"400",unit:"g"},{name:"Nori sheets",quantity:"4",unit:"pieces"},{name:"Imitation crab",quantity:"150",unit:"g"},{name:"Avocado",quantity:"2",unit:"large"},{name:"Cucumber",quantity:"1",unit:"medium"},{name:"Mayonnaise",quantity:"4",unit:"tbsp"},{name:"Sesame seeds",quantity:"4",unit:"tbsp"},{name:"Tobiko",quantity:"4",unit:"tbsp"},{name:"Sriracha",quantity:"1",unit:"tbsp"}], preparation_steps:["Cover bamboo mat with cling film.","Lay nori on mat and cover completely with seasoned rice.","Flip nori so rice is face down on the mat.","Place fillings on nori in a line.","Roll firmly using the mat, rice-side out.","Roll the completed roll in sesame seeds or tobiko.","Slice with sharp wet knife.","Drizzle with spicy mayo to serve."], chef_notes:"The plastic-wrapped mat is the key technique — it prevents rice from sticking. Use very sharp knife and wipe clean between cuts.", serving_suggestions:"Drizzle with Japanese mayo and sriracha. Serve on a slate board for visual impact.", nutrition_estimate:{calories:"310",protein_g:"11",carbohydrates_g:"46",fat_g:"10"}, tags:["Sushi","California Roll","Modern Japanese","Popular"], img:"https://images.unsplash.com/photo-1617196034295-9216b6b269b1?w=400&q=80" },
  { dish_name:"Chirashi Sushi", state:"Japan", cuisine:"Japanese", category:"Sushi", difficulty_level:"Medium", prep_time_minutes:40, cook_time_minutes:30, total_time_minutes:70, servings:4, short_description:"Scattered sushi — a beautiful bowl of seasoned rice topped with an artful arrangement of sashimi, vegetables and garnishes. Japan's most celebratory sushi dish.", ingredients:[{name:"Sushi rice",quantity:"500",unit:"g"},{name:"Tuna sashimi",quantity:"150",unit:"g"},{name:"Salmon sashimi",quantity:"150",unit:"g"},{name:"Prawn",quantity:"8",unit:"pieces"},{name:"Ikura (salmon roe)",quantity:"4",unit:"tbsp"},{name:"Tamago (egg omelette)",quantity:"2",unit:"pieces"},{name:"Cucumber",quantity:"1",unit:"medium"},{name:"Shiso leaves",quantity:"8",unit:"pieces"},{name:"Pickled ginger",quantity:"4",unit:"tbsp"}], preparation_steps:["Prepare seasoned sushi rice and spread in wide serving bowls.","Cook prawns until pink and cool. Slice tamago into rectangles.","Slice all sashimi at an angle into clean pieces.","Arrange sashimi, prawns and tamago artfully over the rice.","Place ikura in small clusters.","Tuck shiso leaves between pieces for colour and flavour.","Garnish with cucumber slices and pickled ginger.","Serve at room temperature."], chef_notes:"Chirashi is about visual beauty — arrange with colour contrast in mind. Use odd numbers of pieces for each item as Japanese aesthetic tradition dictates.", serving_suggestions:"Serve in individual lacquer bowls with soy sauce on the side. Perfect for celebrations.", nutrition_estimate:{calories:"420",protein_g:"28",carbohydrates_g:"52",fat_g:"9"}, tags:["Sushi","Celebration","Festive","Japanese"], img:"https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80" },
  { dish_name:"Sashimi Platter", state:"Japan", cuisine:"Japanese", category:"Sushi", difficulty_level:"Hard", prep_time_minutes:30, cook_time_minutes:0, total_time_minutes:30, servings:4, short_description:"The purest expression of Japanese cuisine — pristine slices of the freshest raw fish served without rice. A dish where only the quality of the fish matters.", ingredients:[{name:"Sashimi-grade tuna",quantity:"200",unit:"g"},{name:"Sashimi-grade salmon",quantity:"200",unit:"g"},{name:"Yellowtail (hamachi)",quantity:"150",unit:"g"},{name:"Scallop",quantity:"8",unit:"pieces"},{name:"Wasabi",quantity:"3",unit:"tbsp"},{name:"Soy sauce",quantity:"6",unit:"tbsp"},{name:"Daikon radish",quantity:"100",unit:"g"},{name:"Shiso leaves",quantity:"12",unit:"pieces"},{name:"Lemon",quantity:"1",unit:"piece"}], preparation_steps:["Ensure all fish is sashimi-grade and very cold (nearly frozen for easier slicing).","Grate daikon into fine shreds and squeeze out excess water.","Using the sharpest knife available, slice tuna against the grain at 45 degrees, 8mm thick.","Slice salmon with same technique.","Slice yellowtail slightly thinner than tuna.","Score scallops on top in a crosshatch pattern.","Arrange on a chilled plate over daikon with shiso leaves.","Add wasabi and serve immediately."], chef_notes:"Never use a serrated knife for sashimi. One clean pulling stroke creates a clean cut that preserves the texture. The fish must be at its freshest.", serving_suggestions:"Serve on ice-filled plate with soy sauce, wasabi and ponzu dipping sauce.", nutrition_estimate:{calories:"220",protein_g:"36",carbohydrates_g:"2",fat_g:"7"}, tags:["Sashimi","Raw Fish","Premium","Japanese"], img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80" },
  { dish_name:"Salmon Avocado Roll", state:"Japan", cuisine:"Japanese", category:"Sushi", difficulty_level:"Medium", prep_time_minutes:35, cook_time_minutes:20, total_time_minutes:55, servings:4, short_description:"The world's most beloved sushi roll — creamy avocado and buttery salmon wrapped in seasoned rice and nori. Rich, satisfying and universally adored.", ingredients:[{name:"Sushi rice",quantity:"300",unit:"g"},{name:"Fresh salmon",quantity:"200",unit:"g"},{name:"Ripe avocado",quantity:"2",unit:"large"},{name:"Nori sheets",quantity:"4",unit:"pieces"},{name:"Cream cheese",quantity:"60",unit:"g"},{name:"Lemon juice",quantity:"1",unit:"tbsp"},{name:"Sesame seeds",quantity:"3",unit:"tbsp"},{name:"Japanese mayo",quantity:"3",unit:"tbsp"}], preparation_steps:["Season sushi rice and cool completely.","Slice salmon into long strips, 1cm thick.","Halve and slice avocado, toss in lemon juice to prevent browning.","Lay nori on bamboo mat. Spread rice evenly.","Place salmon and avocado in a line across the centre.","Add a line of cream cheese alongside.","Roll firmly using the mat.","Coat outside in sesame seeds.","Slice into 8 pieces and drizzle with Japanese mayo."], chef_notes:"Choosing a ripe avocado is critical — it should yield to gentle pressure. Unripe avocado is hard and flavourless in sushi.", serving_suggestions:"Drizzle with Japanese mayo and serve with soy sauce.", nutrition_estimate:{calories:"340",protein_g:"16",carbohydrates_g:"40",fat_g:"14"}, tags:["Sushi","Salmon","Popular","Crowd Pleaser"], img:"https://images.unsplash.com/photo-1617196034295-9216b6b269b1?w=400&q=80" },
  { dish_name:"Dragon Roll", state:"Japan", cuisine:"Japanese", category:"Sushi", difficulty_level:"Hard", prep_time_minutes:50, cook_time_minutes:20, total_time_minutes:70, servings:4, short_description:"A showstopping sushi roll topped with thin avocado slices arranged to resemble dragon scales — as impressive visually as it is delicious.", ingredients:[{name:"Sushi rice",quantity:"400",unit:"g"},{name:"Tempura prawns",quantity:"8",unit:"pieces"},{name:"Avocado",quantity:"3",unit:"large"},{name:"Nori sheets",quantity:"4",unit:"pieces"},{name:"Cucumber",quantity:"1",unit:"medium"},{name:"Eel sauce",quantity:"4",unit:"tbsp"},{name:"Tobiko",quantity:"3",unit:"tbsp"},{name:"Japanese mayo",quantity:"3",unit:"tbsp"}], preparation_steps:["Prepare tempura prawns and cool slightly.","Season and cool sushi rice completely.","Make uramaki base with prawn and cucumber inside.","Slice avocado thinly and fan out.","Lay avocado slices over the top of the roll and press gently with cling film.","Using the mat, press the avocado into the curved shape of the roll.","Remove cling film and slice through.","Drizzle with eel sauce and Japanese mayo. Top with tobiko."], chef_notes:"The cling film technique is essential for shaping the avocado scales without them falling off during slicing.", serving_suggestions:"Present on a long slate board. Drizzle generously with eel sauce for the full visual impact.", nutrition_estimate:{calories:"385",protein_g:"14",carbohydrates_g:"48",fat_g:"16"}, tags:["Sushi","Showstopper","Dragon Roll","Creative"], img:"https://images.unsplash.com/photo-1617196034295-9216b6b269b1?w=400&q=80" },
  { dish_name:"Spicy Tuna Roll", state:"Japan", cuisine:"Japanese", category:"Sushi", difficulty_level:"Medium", prep_time_minutes:30, cook_time_minutes:20, total_time_minutes:50, servings:4, short_description:"Finely chopped tuna mixed with spicy sriracha mayo, rolled in seasoned rice and nori — bold, fiery and deeply satisfying.", ingredients:[{name:"Sushi rice",quantity:"300",unit:"g"},{name:"Fresh tuna",quantity:"250",unit:"g"},{name:"Sriracha sauce",quantity:"3",unit:"tbsp"},{name:"Japanese mayo",quantity:"4",unit:"tbsp"},{name:"Nori sheets",quantity:"4",unit:"pieces"},{name:"Sesame oil",quantity:"1",unit:"tsp"},{name:"Green onion",quantity:"3",unit:"stalks"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"}], preparation_steps:["Finely chop tuna into small pieces — not a paste, keep some texture.","Mix tuna with sriracha, Japanese mayo, sesame oil and green onion.","Taste and adjust heat level.","Season sushi rice and cool.","Lay nori on mat, spread rice evenly.","Spread spicy tuna mixture in a line across the centre.","Roll firmly and seal.","Roll in sesame seeds, slice and serve."], chef_notes:"The spicy tuna mixture should be made just before rolling — it deteriorates quickly. Adjust sriracha to taste but keep some noticeable heat.", serving_suggestions:"Drizzle with extra sriracha mayo and garnish with thinly sliced green onion.", nutrition_estimate:{calories:"295",protein_g:"18",carbohydrates_g:"38",fat_g:"9"}, tags:["Sushi","Spicy","Tuna","Bold"], img:"https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80" },
  { dish_name:"Tamago Sushi", state:"Japan", cuisine:"Japanese", category:"Sushi", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:25, total_time_minutes:45, servings:4, short_description:"Sweet Japanese omelette sushi — layers of thin egg cooked with mirin and sugar, wrapped around vinegared rice. A beloved sushi bar classic.", ingredients:[{name:"Eggs",quantity:"6",unit:"large"},{name:"Mirin",quantity:"3",unit:"tbsp"},{name:"Sugar",quantity:"2",unit:"tbsp"},{name:"Soy sauce",quantity:"1",unit:"tbsp"},{name:"Dashi stock",quantity:"4",unit:"tbsp"},{name:"Sushi rice",quantity:"250",unit:"g"},{name:"Nori strips",quantity:"4",unit:"pieces"},{name:"Vegetable oil",quantity:"2",unit:"tbsp"}], preparation_steps:["Whisk eggs with mirin, sugar, soy sauce and dashi until smooth.","Strain through fine sieve for perfectly smooth texture.","Heat rectangular tamagoyaki pan with thin layer of oil.","Pour thin layer of egg mixture, cook until just set.","Roll from one end to the other.","Push roll to far end, add oil, pour another thin layer of egg.","Continue building layers, rolling each time.","Cool completely, slice and place on pressed rice ovals.","Wrap nori strip around the base."], chef_notes:"The tamagoyaki pan (rectangular Japanese omelette pan) is ideal but a regular pan works. The key is very thin layers and rolling before the egg is fully set.", serving_suggestions:"Serve as part of a sushi platter. Excellent for those who prefer no raw fish.", nutrition_estimate:{calories:"195",protein_g:"10",carbohydrates_g:"28",fat_g:"6"}, tags:["Sushi","Vegetarian","Egg","Traditional"], img:"https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80" },

  // ── APPETIZERS ──────────────────────────────────────────────────────────────
  { dish_name:"Gyoza (Pan-Fried Dumplings)", state:"Japan", cuisine:"Japanese", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:45, cook_time_minutes:15, total_time_minutes:60, servings:4, short_description:"Japan's iconic pan-fried dumplings — crispy on the bottom, tender on top, filled with juicy pork and cabbage. A beloved izakaya staple.", ingredients:[{name:"Gyoza wrappers",quantity:"30",unit:"pieces"},{name:"Ground pork",quantity:"300",unit:"g"},{name:"Cabbage",quantity:"150",unit:"g"},{name:"Garlic",quantity:"3",unit:"cloves"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Soy sauce",quantity:"2",unit:"tbsp"},{name:"Sesame oil",quantity:"1",unit:"tbsp"},{name:"Green onion",quantity:"3",unit:"stalks"},{name:"Sesame oil for frying",quantity:"2",unit:"tbsp"}], preparation_steps:["Finely chop cabbage, sprinkle with salt, wait 10 minutes, then squeeze out all moisture.","Mix pork with cabbage, garlic, ginger, soy sauce, sesame oil and green onion.","Place filling in centre of wrapper. Fold and pleat one side to create 5-6 pleats.","Heat oil in pan over medium-high. Place gyoza flat-side down in rows.","Fry until golden brown on bottom — about 3 minutes.","Add 60ml water, cover immediately (it will spit).","Steam until water evaporates — about 5 minutes.","Remove lid and cook 1 more minute until bases are crispy again."], chef_notes:"The water-steam method creates the perfect gyoza — crispy on one side, soft and juicy on the other. Never flip them.", serving_suggestions:"Serve crispy-side up with soy-rice vinegar dipping sauce and chili oil.", nutrition_estimate:{calories:"285",protein_g:"16",carbohydrates_g:"30",fat_g:"11"}, tags:["Appetizer","Dumplings","Izakaya","Japanese"], img:"https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80" },
  { dish_name:"Takoyaki (Octopus Balls)", state:"Japan", cuisine:"Japanese", category:"Appetizers", difficulty_level:"Hard", prep_time_minutes:20, cook_time_minutes:25, total_time_minutes:45, servings:4, short_description:"Osaka's most beloved street food — crispy spherical dough balls filled with tender octopus, topped with takoyaki sauce, mayo, bonito flakes and aonori.", ingredients:[{name:"Takoyaki flour",quantity:"200",unit:"g"},{name:"Eggs",quantity:"3",unit:"large"},{name:"Dashi stock",quantity:"600",unit:"ml"},{name:"Cooked octopus",quantity:"200",unit:"g"},{name:"Tenkasu (tempura scraps)",quantity:"50",unit:"g"},{name:"Pickled ginger",quantity:"40",unit:"g"},{name:"Green onion",quantity:"4",unit:"stalks"},{name:"Takoyaki sauce",quantity:"6",unit:"tbsp"},{name:"Japanese mayo",quantity:"4",unit:"tbsp"},{name:"Katsuobushi (bonito flakes)",quantity:"20",unit:"g"},{name:"Aonori (green seaweed)",quantity:"2",unit:"tbsp"}], preparation_steps:["Mix takoyaki flour with dashi and eggs into smooth thin batter.","Heat takoyaki pan and brush generously with oil.","Fill each cavity to the brim with batter.","Add octopus piece, tenkasu, ginger and green onion to each.","When edges start to set, use skewer to rotate each ball 90 degrees.","Keep rotating until round and golden all over — about 10 minutes total.","Transfer to plate, drizzle with takoyaki sauce and mayo.","Top with bonito flakes and aonori. Serve immediately."], chef_notes:"The rotation technique is an art — you must rotate the ball while the inside is still liquid to form a perfect sphere. Takoyaki pan moulds are essential.", serving_suggestions:"Serve piping hot immediately — bonito flakes should be dancing from the heat.", nutrition_estimate:{calories:"310",protein_g:"18",carbohydrates_g:"34",fat_g:"12"}, tags:["Street Food","Osaka","Appetizer","Octopus"], img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80" },
  { dish_name:"Agedashi Tofu", state:"Japan", cuisine:"Japanese", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:15, total_time_minutes:35, servings:4, short_description:"Silken tofu dusted in starch, deep fried to a light crispy shell, served in a delicate dashi broth — one of Japan's most elegant appetisers.", ingredients:[{name:"Silken tofu",quantity:"600",unit:"g"},{name:"Potato starch",quantity:"6",unit:"tbsp"},{name:"Dashi stock",quantity:"300",unit:"ml"},{name:"Mirin",quantity:"3",unit:"tbsp"},{name:"Soy sauce",quantity:"3",unit:"tbsp"},{name:"Grated daikon",quantity:"100",unit:"g"},{name:"Grated ginger",quantity:"1",unit:"tsp"},{name:"Green onion",quantity:"2",unit:"stalks"},{name:"Oil for frying",quantity:"2",unit:"cups"}], preparation_steps:["Drain tofu, wrap in towel and press for 30 minutes to remove moisture.","Cut into large cubes.","Combine dashi, mirin and soy sauce in small pot. Heat gently.","Dust tofu cubes generously in potato starch, shaking off excess.","Deep fry at 180°C until light golden and crispy — about 3-4 minutes.","Place in individual bowls.","Pour warm dashi broth around (not over) the tofu.","Top with grated daikon, ginger and sliced green onion."], chef_notes:"The starch coating must be thin and even. Too thick and it becomes heavy. The broth should complement, not drown the tofu.", serving_suggestions:"Serve immediately in individual ceramic bowls — the crispy shell absorbs the broth over time.", nutrition_estimate:{calories:"175",protein_g:"9",carbohydrates_g:"18",fat_g:"8"}, tags:["Vegetarian","Tofu","Traditional","Japanese"], img:"https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80" },
  { dish_name:"Karaage (Japanese Fried Chicken)", state:"Japan", cuisine:"Japanese", category:"Appetizers", difficulty_level:"Easy", prep_time_minutes:30, cook_time_minutes:15, total_time_minutes:45, servings:4, short_description:"Japan's ultimate fried chicken — bite-sized pieces marinated in soy, ginger and garlic, double-fried to an impossibly juicy, crispy perfection.", ingredients:[{name:"Chicken thighs",quantity:"600",unit:"g"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Sake",quantity:"2",unit:"tbsp"},{name:"Mirin",quantity:"2",unit:"tbsp"},{name:"Garlic",quantity:"3",unit:"cloves"},{name:"Ginger",quantity:"1",unit:"inch"},{name:"Potato starch",quantity:"100",unit:"g"},{name:"Oil for frying",quantity:"2",unit:"cups"},{name:"Lemon",quantity:"2",unit:"pieces"}], preparation_steps:["Cut chicken thighs into bite-sized pieces.","Marinate with soy sauce, sake, mirin, garlic and ginger for 30 minutes minimum.","Remove chicken from marinade and pat dry.","Coat generously in potato starch.","First fry at 160°C for 4 minutes. Remove and rest 3 minutes.","Second fry at 180°C for 2 minutes until very crispy and golden.","Drain on wire rack.","Serve with lemon wedges and Japanese mayo."], chef_notes:"The double-fry technique is the secret to karaage. The first fry cooks the chicken through, the second fry creates that shattering crispy exterior.", serving_suggestions:"Serve hot with lemon wedges, Japanese mayo and shredded cabbage.", nutrition_estimate:{calories:"345",protein_g:"28",carbohydrates_g:"22",fat_g:"16"}, tags:["Fried Chicken","Popular","Izakaya","Japanese"], img:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80" },
  { dish_name:"Edamame with Sea Salt", state:"Japan", cuisine:"Japanese", category:"Appetizers", difficulty_level:"Easy", prep_time_minutes:5, cook_time_minutes:5, total_time_minutes:10, servings:4, short_description:"Young soybeans boiled or steamed and finished with flaky sea salt — Japan's most addictive, healthy snack and the perfect izakaya opener.", ingredients:[{name:"Fresh edamame in pods",quantity:"400",unit:"g"},{name:"Sea salt",quantity:"2",unit:"tbsp"},{name:"Water",quantity:"1",unit:"litre"},{name:"Sesame oil",quantity:"1",unit:"tsp"}], preparation_steps:["Trim both ends of edamame pods with scissors.","Rub pods with 1 tbsp salt and let sit 5 minutes.","Bring water to rolling boil with remaining salt.","Add edamame and boil 4-5 minutes until tender but still bright green.","Drain and immediately toss with a tiny drizzle of sesame oil.","Sprinkle with flaky sea salt.","Serve warm or at room temperature."], chef_notes:"Do not overcook edamame — they should be bright green and have a slight bite. Overcooked edamame turns yellow and mushy.", serving_suggestions:"Serve in a bowl with empty shells bowl alongside. Perfect with cold Japanese beer.", nutrition_estimate:{calories:"120",protein_g:"11",carbohydrates_g:"10",fat_g:"5"}, tags:["Healthy","Vegetarian","Izakaya","Quick"], img:"https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80" },
  { dish_name:"Yakitori (Grilled Chicken Skewers)", state:"Japan", cuisine:"Japanese", category:"Appetizers", difficulty_level:"Easy", prep_time_minutes:30, cook_time_minutes:15, total_time_minutes:45, servings:4, short_description:"Skewers of chicken grilled over charcoal and glazed with tare sauce — Japan's most beloved izakaya food, eaten with cold beer and good company.", ingredients:[{name:"Chicken thighs",quantity:"500",unit:"g"},{name:"Green onion",quantity:"6",unit:"stalks"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Mirin",quantity:"4",unit:"tbsp"},{name:"Sake",quantity:"2",unit:"tbsp"},{name:"Sugar",quantity:"2",unit:"tbsp"},{name:"Bamboo skewers",quantity:"12",unit:"pieces"},{name:"Shichimi (7-spice)",quantity:"1",unit:"tsp"}], preparation_steps:["Soak bamboo skewers in water 30 minutes.","Make tare sauce: combine soy sauce, mirin, sake and sugar. Simmer until slightly thickened.","Cut chicken thighs into 3cm pieces.","Thread chicken alternating with green onion pieces.","Grill over high heat, turning regularly.","Brush with tare sauce in the last 2 minutes.","Grill 1 more minute after final glaze.","Serve immediately with shichimi on the side."], chef_notes:"Charcoal gives authentic yakitori its smoky character but a hot grill pan works well at home. The tare sauce should caramelise on the final glaze, not burn.", serving_suggestions:"Serve piping hot immediately with cold beer. Arrange on a wooden board.", nutrition_estimate:{calories:"245",protein_g:"26",carbohydrates_g:"14",fat_g:"9"}, tags:["Grilled","Izakaya","Chicken","Japanese"], img:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80" },
  { dish_name:"Tempura Vegetables & Prawns", state:"Japan", cuisine:"Japanese", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:20, total_time_minutes:40, servings:4, short_description:"The lightest, crispiest batter imaginable — Japanese tempura transforms prawns and vegetables into golden, feather-light fritters served with tentsuyu dipping sauce.", ingredients:[{name:"Tiger prawns",quantity:"12",unit:"pieces"},{name:"Sweet potato",quantity:"1",unit:"medium"},{name:"Broccoli",quantity:"150",unit:"g"},{name:"Zucchini",quantity:"1",unit:"medium"},{name:"Cold water",quantity:"200",unit:"ml"},{name:"Egg",quantity:"1",unit:"large"},{name:"Flour",quantity:"180",unit:"g"},{name:"Dashi stock",quantity:"200",unit:"ml"},{name:"Soy sauce",quantity:"3",unit:"tbsp"},{name:"Mirin",quantity:"3",unit:"tbsp"},{name:"Grated daikon",quantity:"60",unit:"g"}], preparation_steps:["Make tentsuyu: combine dashi, soy and mirin. Heat gently.","Peel and devein prawns, keeping tails on.","Slice vegetables 5mm thick.","Make batter: whisk egg with ice-cold water. Add flour and stir minimally — lumps are fine, do not overmix.","Heat oil to 180°C.","Dip prawns and vegetables in batter and fry in small batches.","Fry until just golden — 2 minutes for prawns, 3 for vegetables.","Drain on rack immediately.","Serve with tentsuyu and grated daikon."], chef_notes:"Cold batter is the secret to light tempura. Use ice water or add ice cubes to the batter bowl. Never overmix — lumpy batter creates the characteristic light texture.", serving_suggestions:"Serve immediately after frying on paper-lined plates with tentsuyu dipping sauce.", nutrition_estimate:{calories:"285",protein_g:"16",carbohydrates_g:"36",fat_g:"9"}, tags:["Tempura","Fried","Light","Japanese"], img:"https://images.unsplash.com/photo-1617196034295-9216b6b269b1?w=400&q=80" },
  { dish_name:"Chawanmushi (Steamed Egg Custard)", state:"Japan", cuisine:"Japanese", category:"Appetizers", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:20, total_time_minutes:40, servings:4, short_description:"A silken, savory steamed egg custard hiding treasures of prawn, chicken and mushroom within — elegant, delicate and deeply Japanese.", ingredients:[{name:"Eggs",quantity:"4",unit:"large"},{name:"Dashi stock",quantity:"500",unit:"ml"},{name:"Soy sauce",quantity:"1",unit:"tbsp"},{name:"Mirin",quantity:"1",unit:"tbsp"},{name:"Prawns",quantity:"8",unit:"pieces"},{name:"Chicken breast",quantity:"100",unit:"g"},{name:"Shiitake mushrooms",quantity:"4",unit:"pieces"},{name:"Mitsuba or parsley",quantity:"4",unit:"sprigs"}], preparation_steps:["Make dashi and cool to room temperature. Season with soy and mirin.","Whisk eggs gently — avoid creating bubbles.","Strain egg mixture through fine sieve.","Slowly add cooled dashi to eggs while stirring.","Strain mixture again for perfectly smooth custard.","Place prawns, chicken and mushrooms in cups.","Pour custard mixture over fillings.","Steam on low heat for 12-15 minutes until just set.","Garnish with mitsuba and serve in cups."], chef_notes:"The low steam is critical — high heat creates bubbles and a rough texture. The custard should wobble like jelly when done, not be firm.", serving_suggestions:"Serve in the steaming cups with small spoons. Best enjoyed warm as a starter.", nutrition_estimate:{calories:"145",protein_g:"14",carbohydrates_g:"6",fat_g:"7"}, tags:["Steamed","Egg","Elegant","Traditional"], img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
  { dish_name:"Ebi Furai (Japanese Fried Prawns)", state:"Japan", cuisine:"Japanese", category:"Appetizers", difficulty_level:"Easy", prep_time_minutes:20, cook_time_minutes:10, total_time_minutes:30, servings:4, short_description:"Butterflied prawns coated in a crispy panko breadcrumb shell — one of Japan's most popular Western-influenced dishes, served with rich tartar sauce.", ingredients:[{name:"Tiger prawns",quantity:"12",unit:"large"},{name:"Panko breadcrumbs",quantity:"200",unit:"g"},{name:"Flour",quantity:"80",unit:"g"},{name:"Eggs",quantity:"2",unit:"large"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Pepper",quantity:"0.5",unit:"tsp"},{name:"Oil for frying",quantity:"2",unit:"cups"},{name:"Japanese tartar sauce",quantity:"6",unit:"tbsp"},{name:"Lemon",quantity:"2",unit:"pieces"}], preparation_steps:["Peel prawns leaving tails, devein and butterfly along back.","Score underside to prevent curling during frying.","Season with salt and pepper.","Dredge in flour, then egg, then panko, pressing firmly.","Deep fry at 175°C for 2-3 minutes until golden.","Drain on wire rack.","Serve with tartar sauce and lemon."], chef_notes:"Scoring the underside of each prawn is what keeps them straight and beautiful. Panko creates a dramatically lighter and crispier coating than regular breadcrumbs.", serving_suggestions:"Serve with Japanese tartar sauce, shredded cabbage and lemon wedges.", nutrition_estimate:{calories:"265",protein_g:"20",carbohydrates_g:"24",fat_g:"10"}, tags:["Fried","Prawns","Yoshoku","Popular"], img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80" },
  { dish_name:"Onigiri (Rice Balls)", state:"Japan", cuisine:"Japanese", category:"Appetizers", difficulty_level:"Easy", prep_time_minutes:20, cook_time_minutes:30, total_time_minutes:50, servings:4, short_description:"Japan's ultimate portable snack — seasoned rice balls filled with tuna mayo, pickled plum or salmon and wrapped in crispy nori. Comfort food in its purest form.", ingredients:[{name:"Japanese short-grain rice",quantity:"400",unit:"g"},{name:"Tuna",quantity:"100",unit:"g"},{name:"Japanese mayo",quantity:"3",unit:"tbsp"},{name:"Umeboshi (pickled plum)",quantity:"4",unit:"pieces"},{name:"Nori sheets",quantity:"4",unit:"pieces"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"},{name:"Salmon flakes",quantity:"80",unit:"g"}], preparation_steps:["Cook rice with slightly less water than usual for firmer texture.","Cool rice to body temperature.","Mix tuna with mayo for one filling.","Wet hands and rub with salt.","Take portion of rice, press into palm.","Make indentation, place filling inside.","Press into triangle shape with both hands, compressing firmly.","Wrap base with nori strip.","Roll in sesame seeds if desired."], chef_notes:"Wet and salted hands are essential — they prevent rice from sticking and lightly season the outside. Form while rice is still warm as cold rice won't hold shape.", serving_suggestions:"Best eaten within a few hours. Wrap nori just before eating to keep it crispy.", nutrition_estimate:{calories:"245",protein_g:"10",carbohydrates_g:"40",fat_g:"5"}, tags:["Rice Ball","Portable","Lunch","Japanese"], img:"https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80" },

  // ── SALADS ──────────────────────────────────────────────────────────────────
  { dish_name:"Wakame Seaweed Salad", state:"Japan", cuisine:"Japanese", category:"Salads", difficulty_level:"Easy", prep_time_minutes:15, cook_time_minutes:0, total_time_minutes:15, servings:4, short_description:"A refreshing Japanese salad of rehydrated wakame seaweed dressed in sesame oil, soy sauce and rice vinegar — light, umami-rich and deeply satisfying.", ingredients:[{name:"Dried wakame seaweed",quantity:"30",unit:"g"},{name:"Sesame oil",quantity:"2",unit:"tbsp"},{name:"Soy sauce",quantity:"2",unit:"tbsp"},{name:"Rice vinegar",quantity:"2",unit:"tbsp"},{name:"Sugar",quantity:"1",unit:"tsp"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"},{name:"Green onion",quantity:"2",unit:"stalks"},{name:"Cucumber",quantity:"1",unit:"medium"},{name:"Ginger",quantity:"0.5",unit:"inch"}], preparation_steps:["Soak dried wakame in cold water 10 minutes until rehydrated.","Drain and squeeze out excess water.","Slice cucumber thinly.","Mix sesame oil, soy sauce, rice vinegar, sugar and grated ginger into dressing.","Combine wakame and cucumber.","Pour dressing and toss gently.","Top with sesame seeds and sliced green onion.","Chill 10 minutes before serving."], chef_notes:"Do not over-soak wakame — it expands dramatically and becomes slimy if left too long. 10 minutes in cold water is perfect.", serving_suggestions:"Serve chilled as a starter or alongside grilled fish and rice.", nutrition_estimate:{calories:"65",protein_g:"2",carbohydrates_g:"7",fat_g:"4"}, tags:["Seaweed","Healthy","Vegan","Japanese"], img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80" },
  { dish_name:"Sunomono (Japanese Cucumber Salad)", state:"Japan", cuisine:"Japanese", category:"Salads", difficulty_level:"Easy", prep_time_minutes:20, cook_time_minutes:0, total_time_minutes:20, servings:4, short_description:"Paper-thin cucumber slices in a sweet rice vinegar dressing with prawns — Japan's classic refreshing palate cleanser.", ingredients:[{name:"Japanese cucumber",quantity:"2",unit:"large"},{name:"Cooked prawns",quantity:"12",unit:"pieces"},{name:"Rice vinegar",quantity:"4",unit:"tbsp"},{name:"Sugar",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Soy sauce",quantity:"1",unit:"tbsp"},{name:"Sesame seeds",quantity:"1",unit:"tbsp"},{name:"Wakame seaweed",quantity:"15",unit:"g"}], preparation_steps:["Slice cucumber paper-thin using mandoline or sharp knife.","Sprinkle with salt and let sit 10 minutes.","Squeeze cucumber firmly to remove all moisture.","Rehydrate wakame in cold water, drain.","Mix rice vinegar, sugar and soy sauce until sugar dissolves.","Combine cucumber, wakame and prawns.","Pour dressing over and toss.","Refrigerate 15 minutes and serve in small portions."], chef_notes:"Salting and squeezing the cucumber is essential — it removes bitterness and excess water that would dilute the dressing.", serving_suggestions:"Serve in small individual bowls as a palate-cleansing starter.", nutrition_estimate:{calories:"75",protein_g:"8",carbohydrates_g:"10",fat_g:"1"}, tags:["Cucumber","Refreshing","Light","Japanese"], img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80" },
  { dish_name:"Kani Salad (Crab Salad)", state:"Japan", cuisine:"Japanese", category:"Salads", difficulty_level:"Easy", prep_time_minutes:20, cook_time_minutes:0, total_time_minutes:20, servings:4, short_description:"A creamy, colourful Japanese crab salad with crunchy cucumber, carrot and a spicy Japanese mayo dressing — popular in Japanese restaurants worldwide.", ingredients:[{name:"Imitation crab sticks",quantity:"200",unit:"g"},{name:"Cucumber",quantity:"2",unit:"medium"},{name:"Carrot",quantity:"1",unit:"large"},{name:"Japanese mayo",quantity:"5",unit:"tbsp"},{name:"Sriracha",quantity:"2",unit:"tsp"},{name:"Mango",quantity:"1",unit:"medium"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"},{name:"Lemon juice",quantity:"1",unit:"tbsp"}], preparation_steps:["Shred crab sticks into thin strands.","Julienne cucumber and carrot into thin matchsticks.","Dice mango into small cubes.","Mix Japanese mayo with sriracha and lemon juice.","Combine crab, cucumber, carrot and mango.","Toss with spicy mayo dressing.","Garnish with sesame seeds.","Serve chilled."], chef_notes:"The combination of creamy mayo, sweet mango and spicy sriracha is what makes this salad irresistible. Use fresh mango for best results.", serving_suggestions:"Serve chilled in individual glasses or small bowls as a starter.", nutrition_estimate:{calories:"185",protein_g:"8",carbohydrates_g:"18",fat_g:"10"}, tags:["Crab","Creamy","Popular","Japanese Restaurant"], img:"https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80" },
  { dish_name:"Goma-ae (Sesame Spinach Salad)", state:"Japan", cuisine:"Japanese", category:"Salads", difficulty_level:"Easy", prep_time_minutes:15, cook_time_minutes:5, total_time_minutes:20, servings:4, short_description:"Blanched spinach tossed in a rich sesame paste dressing — one of Japan's most classic side dishes, eaten at every home table.", ingredients:[{name:"Spinach",quantity:"400",unit:"g"},{name:"White sesame seeds",quantity:"4",unit:"tbsp"},{name:"Soy sauce",quantity:"2",unit:"tbsp"},{name:"Mirin",quantity:"1",unit:"tbsp"},{name:"Sugar",quantity:"1",unit:"tsp"},{name:"Dashi stock",quantity:"2",unit:"tbsp"}], preparation_steps:["Toast sesame seeds in dry pan until fragrant and starting to pop.","Grind 3/4 of sesame seeds in mortar to a coarse paste.","Mix with soy sauce, mirin, sugar and dashi.","Blanch spinach in boiling water 30 seconds.","Transfer immediately to ice water to stop cooking.","Squeeze all water from spinach firmly.","Cut into 5cm lengths.","Toss with sesame dressing.","Top with remaining whole sesame seeds."], chef_notes:"The spinach must be very thoroughly squeezed — any residual water dilutes the dressing. The sesame paste should be chunky, not completely smooth.", serving_suggestions:"Serve at room temperature or slightly chilled in small mounds as a side.", nutrition_estimate:{calories:"110",protein_g:"5",carbohydrates_g:"8",fat_g:"7"}, tags:["Vegetarian","Sesame","Healthy","Traditional"], img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80" },
  { dish_name:"Hiyashi Chuka (Cold Ramen Salad)", state:"Japan", cuisine:"Japanese", category:"Salads", difficulty_level:"Medium", prep_time_minutes:30, cook_time_minutes:10, total_time_minutes:40, servings:4, short_description:"Japan's beloved summer noodle salad — cold ramen noodles topped with colourful toppings and doused in a tangy sesame-soy dressing. A seasonal Japanese favourite.", ingredients:[{name:"Ramen noodles",quantity:"320",unit:"g"},{name:"Cucumber",quantity:"2",unit:"medium"},{name:"Ham or chicken",quantity:"150",unit:"g"},{name:"Eggs",quantity:"3",unit:"large"},{name:"Cherry tomatoes",quantity:"12",unit:"pieces"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Rice vinegar",quantity:"4",unit:"tbsp"},{name:"Sesame oil",quantity:"2",unit:"tbsp"},{name:"Sugar",quantity:"2",unit:"tbsp"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"}], preparation_steps:["Cook noodles, rinse under cold water until completely cold.","Make thin omelette with eggs, cool and slice into strips.","Julienne cucumber. Slice ham or chicken.","Make dressing: combine soy sauce, vinegar, sesame oil and sugar.","Arrange noodles in bowls.","Top with cucumber, egg strips, ham and tomatoes in sections.","Pour dressing over just before serving.","Sprinkle sesame seeds and serve cold."], chef_notes:"Rinsing noodles in cold water until completely chilled is essential. The toppings should be arranged neatly in sections for visual appeal.", serving_suggestions:"Serve chilled in summer as a refreshing main dish. Add karashi (hot mustard) on the side.", nutrition_estimate:{calories:"345",protein_g:"18",carbohydrates_g:"48",fat_g:"10"}, tags:["Summer","Cold Noodles","Seasonal","Japanese"], img:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80" },

  // ── SOUPS & RAMEN ──────────────────────────────────────────────────────────
  { dish_name:"Tonkotsu Ramen", state:"Japan", cuisine:"Japanese", category:"Soups", difficulty_level:"Hard", prep_time_minutes:60, cook_time_minutes:720, total_time_minutes:780, servings:4, short_description:"Fukuoka's legendary pork bone ramen — a rich, creamy, opaque white broth from 12+ hours of simmering pork bones, topped with chashu pork, soft egg and nori.", ingredients:[{name:"Pork trotters",quantity:"1",unit:"kg"},{name:"Pork back fat",quantity:"300",unit:"g"},{name:"Chicken carcasses",quantity:"500",unit:"g"},{name:"Garlic",quantity:"8",unit:"cloves"},{name:"Ginger",quantity:"3",unit:"inch"},{name:"Ramen noodles",quantity:"400",unit:"g"},{name:"Pork belly (chashu)",quantity:"500",unit:"g"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Mirin",quantity:"4",unit:"tbsp"},{name:"Soft boiled eggs (marinated)",quantity:"4",unit:"pieces"},{name:"Nori",quantity:"4",unit:"pieces"},{name:"Green onion",quantity:"4",unit:"stalks"},{name:"Bamboo shoots",quantity:"100",unit:"g"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"}], preparation_steps:["Blanch pork bones in boiling water 5 minutes. Rinse thoroughly.","Cover bones with fresh water and boil vigorously uncovered for 4 hours — the vigorous boil creates the creamy white colour.","Continue simmering 8 more hours, adding water as needed.","Meanwhile, roll pork belly tightly, tie with string. Braise in soy, mirin, sake and water 2 hours.","Soft boil eggs 6.5 minutes, marinate in soy-mirin mixture 4 hours.","Strain broth. Season with salt and soy tare.","Cook ramen noodles al dente. Warm bowls.","Fill bowls with broth, add noodles.","Top with sliced chashu, halved marinated egg, nori, bamboo shoots, green onion and sesame seeds."], chef_notes:"The key to milky white tonkotsu broth is vigorous boiling — it emulsifies the collagen from the bones. Never let it drop to a gentle simmer during cooking.", serving_suggestions:"Serve piping hot immediately. Provide sesame seeds, ginger and pickled vegetables on the side.", nutrition_estimate:{calories:"680",protein_g:"38",carbohydrates_g:"62",fat_g:"28"}, tags:["Ramen","Fukuoka","Rich Broth","12-Hour Cook"], img:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80" },
  { dish_name:"Shoyu Ramen (Soy Sauce Ramen)", state:"Japan", cuisine:"Japanese", category:"Soups", difficulty_level:"Medium", prep_time_minutes:30, cook_time_minutes:120, total_time_minutes:150, servings:4, short_description:"Tokyo's classic clear soy-sauce ramen — a clean, complex chicken-dashi broth seasoned with soy tare, topped with chashu, narutomaki fish cake and soft egg.", ingredients:[{name:"Chicken carcasses",quantity:"1",unit:"kg"},{name:"Dashi kombu",quantity:"20",unit:"g"},{name:"Soy sauce",quantity:"6",unit:"tbsp"},{name:"Mirin",quantity:"4",unit:"tbsp"},{name:"Sake",quantity:"4",unit:"tbsp"},{name:"Ramen noodles",quantity:"400",unit:"g"},{name:"Chashu pork",quantity:"300",unit:"g"},{name:"Narutomaki fish cake",quantity:"8",unit:"slices"},{name:"Marinated eggs",quantity:"4",unit:"pieces"},{name:"Nori",quantity:"4",unit:"pieces"},{name:"Menma bamboo",quantity:"80",unit:"g"}], preparation_steps:["Simmer chicken carcasses with kombu and aromatics 2 hours.","Strain broth — it should be clear and golden.","Make soy tare: reduce soy sauce, mirin and sake together.","Season broth with tare to taste.","Cook ramen noodles and divide into warm bowls.","Ladle hot broth over noodles.","Top with sliced chashu, narutomaki, egg, nori and bamboo shoots."], chef_notes:"Shoyu ramen is about clarity and refinement. Skim fat and foam constantly during cooking. The broth should be beautifully clear and amber-coloured.", serving_suggestions:"Serve in wide, deep bowls. The toppings should be arranged neatly.", nutrition_estimate:{calories:"520",protein_g:"30",carbohydrates_g:"60",fat_g:"16"}, tags:["Ramen","Tokyo","Soy Sauce","Classic"], img:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80" },
  { dish_name:"Miso Ramen", state:"Japan", cuisine:"Japanese", category:"Soups", difficulty_level:"Medium", prep_time_minutes:30, cook_time_minutes:90, total_time_minutes:120, servings:4, short_description:"Sapporo's iconic miso ramen — a hearty, warming broth enriched with red miso paste, topped with ground pork, corn, butter and a perfectly cooked egg.", ingredients:[{name:"Chicken broth",quantity:"1.2",unit:"litres"},{name:"Red miso paste",quantity:"6",unit:"tbsp"},{name:"White miso paste",quantity:"3",unit:"tbsp"},{name:"Ground pork",quantity:"300",unit:"g"},{name:"Ramen noodles",quantity:"400",unit:"g"},{name:"Corn kernels",quantity:"200",unit:"g"},{name:"Butter",quantity:"4",unit:"tsp"},{name:"Bean sprouts",quantity:"150",unit:"g"},{name:"Bamboo shoots",quantity:"80",unit:"g"},{name:"Soft boiled eggs",quantity:"4",unit:"pieces"},{name:"Green onion",quantity:"4",unit:"stalks"},{name:"Garlic",quantity:"4",unit:"cloves"},{name:"Ginger",quantity:"1",unit:"inch"}], preparation_steps:["Fry ground pork with garlic and ginger until cooked.","Add miso pastes and fry in the pork fat for 1 minute.","Add chicken broth and bring to simmer.","Cook bean sprouts briefly in broth.","Cook noodles separately and divide into bowls.","Ladle miso broth and pork over noodles.","Top with corn, bean sprouts, bamboo shoots and egg.","Add a pat of butter on top and garnish with green onion."], chef_notes:"Frying the miso in fat before adding broth is the Sapporo technique that gives miso ramen its deep, complex flavour. Never boil miso aggressively.", serving_suggestions:"Serve immediately with the butter melting on top — the butter is not optional, it defines Sapporo miso ramen.", nutrition_estimate:{calories:"595",protein_g:"32",carbohydrates_g:"62",fat_g:"22"}, tags:["Ramen","Sapporo","Miso","Hearty"], img:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80" },
  { dish_name:"Miso Soup", state:"Japan", cuisine:"Japanese", category:"Soups", difficulty_level:"Easy", prep_time_minutes:5, cook_time_minutes:10, total_time_minutes:15, servings:4, short_description:"Japan's everyday soul food — a simple dashi broth dissolved with miso paste and filled with tofu, wakame and green onion. Eaten at virtually every Japanese meal.", ingredients:[{name:"Dashi stock",quantity:"800",unit:"ml"},{name:"White miso paste",quantity:"4",unit:"tbsp"},{name:"Silken tofu",quantity:"200",unit:"g"},{name:"Dried wakame",quantity:"10",unit:"g"},{name:"Green onion",quantity:"2",unit:"stalks"},{name:"Dashi kombu",quantity:"10",unit:"g"},{name:"Katsuobushi",quantity:"20",unit:"g"}], preparation_steps:["Make dashi: bring water to 60°C, add kombu, heat to 80°C, remove kombu.","Bring to boil, add katsuobushi, simmer 3 minutes. Strain.","Rehydrate wakame in water, drain.","Cut tofu into small cubes.","Heat dashi to a simmer. Never boil after adding miso.","Dissolve miso paste in a ladle of dashi first, then stir into pot.","Add tofu and wakame gently.","Serve immediately garnished with green onion."], chef_notes:"Never boil miso soup after adding the miso — it destroys the beneficial enzymes and dulls the flavour. Dissolving miso in a separate ladle before adding prevents lumps.", serving_suggestions:"Serve in lidded lacquer bowls as part of any Japanese meal.", nutrition_estimate:{calories:"65",protein_g:"5",carbohydrates_g:"6",fat_g:"2"}, tags:["Traditional","Everyday","Vegetarian","Japanese"], img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
  { dish_name:"Ochazuke (Green Tea Rice Soup)", state:"Japan", cuisine:"Japanese", category:"Soups", difficulty_level:"Easy", prep_time_minutes:5, cook_time_minutes:5, total_time_minutes:10, servings:2, short_description:"A comforting bowl of steamed rice with green tea poured over — Japan's late-night comfort food, topped with pickles, salmon flakes or salty plum.", ingredients:[{name:"Cooked Japanese rice",quantity:"300",unit:"g"},{name:"Matcha or green tea",quantity:"400",unit:"ml"},{name:"Salmon flakes",quantity:"80",unit:"g"},{name:"Umeboshi",quantity:"2",unit:"pieces"},{name:"Nori",quantity:"2",unit:"strips"},{name:"Sesame seeds",quantity:"1",unit:"tbsp"},{name:"Wasabi",quantity:"1",unit:"tsp"},{name:"Soy sauce",quantity:"1",unit:"tsp"}], preparation_steps:["Brew strong green tea.","Place warm rice in a bowl.","Arrange salmon flakes, torn nori and umeboshi on top.","Pour hot green tea over rice slowly.","Add tiny amount of wasabi to the side.","Sprinkle sesame seeds.","Drizzle with soy sauce.","Eat immediately."], chef_notes:"Ochazuke is Japan's ultimate comfort food — eaten when feeling unwell, after a night out or simply when you want something soothing. The tea should be strong and hot.", serving_suggestions:"Serve as a light supper or late-night snack. Perfect for using up leftover rice.", nutrition_estimate:{calories:"265",protein_g:"14",carbohydrates_g:"44",fat_g:"4"}, tags:["Comfort Food","Rice","Quick","Japanese"], img:"https://images.unsplash.com/photo-1576577445504-6af96477db52?w=400&q=80" },
  { dish_name:"Tonjiru (Pork Miso Soup)", state:"Japan", cuisine:"Japanese", category:"Soups", difficulty_level:"Easy", prep_time_minutes:15, cook_time_minutes:25, total_time_minutes:40, servings:4, short_description:"A hearty, substantial miso soup loaded with pork and root vegetables — Japan's ultimate winter warming soup, far more substantial than everyday miso soup.", ingredients:[{name:"Pork belly slices",quantity:"200",unit:"g"},{name:"Daikon radish",quantity:"200",unit:"g"},{name:"Carrot",quantity:"1",unit:"large"},{name:"Burdock root (gobo)",quantity:"100",unit:"g"},{name:"Konnyaku",quantity:"100",unit:"g"},{name:"Dashi stock",quantity:"800",unit:"ml"},{name:"Miso paste",quantity:"5",unit:"tbsp"},{name:"Sesame oil",quantity:"1",unit:"tbsp"},{name:"Green onion",quantity:"3",unit:"stalks"}], preparation_steps:["Cut all vegetables into bite-sized irregular chunks.","Stir-fry pork in sesame oil until colour changes.","Add burdock root and carrot, fry 2 minutes.","Add daikon and konnyaku.","Pour in dashi and bring to boil.","Simmer 15 minutes until vegetables are tender.","Dissolve miso in ladle of broth and add to pot.","Serve garnished with sliced green onion."], chef_notes:"Burdock root (gobo) is the defining ingredient of tonjiru — its earthy flavour is irreplaceable. Soak in cold water after cutting to prevent browning.", serving_suggestions:"Serve as a warming main course in winter with steamed rice.", nutrition_estimate:{calories:"275",protein_g:"16",carbohydrates_g:"22",fat_g:"14"}, tags:["Winter Soup","Hearty","Pork","Japanese"], img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
  { dish_name:"Zosui (Japanese Rice Porridge)", state:"Japan", cuisine:"Japanese", category:"Soups", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:20, total_time_minutes:30, servings:4, short_description:"A silky, healing Japanese rice porridge made with leftover rice simmered in dashi broth with egg — the first food eaten after illness and a symbol of Japanese home cooking.", ingredients:[{name:"Cooked rice",quantity:"400",unit:"g"},{name:"Dashi stock",quantity:"1",unit:"litre"},{name:"Soy sauce",quantity:"2",unit:"tbsp"},{name:"Sake",quantity:"2",unit:"tbsp"},{name:"Eggs",quantity:"3",unit:"large"},{name:"Chicken breast",quantity:"150",unit:"g"},{name:"Shiitake mushrooms",quantity:"4",unit:"pieces"},{name:"Green onion",quantity:"2",unit:"stalks"},{name:"Mitsuba",quantity:"4",unit:"sprigs"}], preparation_steps:["Bring dashi to boil with soy sauce and sake.","Add thinly sliced chicken and mushrooms.","Rinse cooked rice under cold water to remove excess starch.","Add rice to broth and simmer 10 minutes until soft.","Beat eggs lightly and pour in a thin stream while stirring.","Cook 1 minute until eggs are just set.","Season to taste.","Serve in bowls with green onion and mitsuba."], chef_notes:"Rinsing rice before adding removes excess starch which can make the porridge gluey. The egg should be added slowly while stirring to create silky threads.", serving_suggestions:"Serve as a healing meal when unwell or as a light supper.", nutrition_estimate:{calories:"245",protein_g:"16",carbohydrates_g:"36",fat_g:"4"}, tags:["Porridge","Healing","Comfort","Japanese"], img:"https://images.unsplash.com/photo-1576577445504-6af96477db52?w=400&q=80" },
  { dish_name:"Yakimono Soup (Clear Soup with Grilled Items)", state:"Japan", cuisine:"Japanese", category:"Soups", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:20, total_time_minutes:40, servings:4, short_description:"An elegant clear Japanese soup with grilled ingredients floating in a crystal-clear dashi broth — served at formal kaiseki meals and special occasions.", ingredients:[{name:"Dashi stock",quantity:"800",unit:"ml"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"Light soy sauce",quantity:"1",unit:"tbsp"},{name:"Sake",quantity:"2",unit:"tbsp"},{name:"Sea bream fillet",quantity:"200",unit:"g"},{name:"Prawn",quantity:"4",unit:"large"},{name:"Mitsuba",quantity:"4",unit:"sprigs"},{name:"Yuzu zest",quantity:"1",unit:"tsp"},{name:"Kombu",quantity:"15",unit:"g"}], preparation_steps:["Make superior dashi from kombu and katsuobushi.","Season with salt, light soy and sake.","Salt sea bream fillets and grill until golden.","Grill prawns until pink and fragrant.","Arrange grilled items in warmed bowls.","Pour crystal-clear hot broth gently over.","Add mitsuba sprig and tiny shaving of yuzu zest.","Serve covered to retain heat and aroma."], chef_notes:"This soup is about restraint and purity. The dashi must be flawless — crystal clear and deeply flavoured. The yuzu adds an aromatic lift without overpowering.", serving_suggestions:"Serve at special dinners in lidded ceramic bowls. The aroma released when the lid is lifted is part of the experience.", nutrition_estimate:{calories:"145",protein_g:"22",carbohydrates_g:"4",fat_g:"4"}, tags:["Elegant","Kaiseki","Clear Soup","Japanese"], img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
  { dish_name:"Nabe (Japanese Hot Pot)", state:"Japan", cuisine:"Japanese", category:"Soups", difficulty_level:"Easy", prep_time_minutes:30, cook_time_minutes:30, total_time_minutes:60, servings:4, short_description:"Japan's communal hot pot — a bubbling pot of kombu broth at the table shared by all, with each person adding their own fish, vegetables and tofu.", ingredients:[{name:"Kombu dashi",quantity:"1.5",unit:"litres"},{name:"Cod or tofu",quantity:"400",unit:"g"},{name:"Shiitake mushrooms",quantity:"8",unit:"pieces"},{name:"Enoki mushrooms",quantity:"150",unit:"g"},{name:"Napa cabbage",quantity:"300",unit:"g"},{name:"Firm tofu",quantity:"300",unit:"g"},{name:"Glass noodles",quantity:"100",unit:"g"},{name:"Ponzu sauce",quantity:"8",unit:"tbsp"},{name:"Green onion",quantity:"4",unit:"stalks"},{name:"Grated daikon",quantity:"100",unit:"g"}], preparation_steps:["Make kombu dashi and pour into tabletop pot or heavy pot.","Arrange all raw ingredients beautifully around the pot.","Bring broth to gentle simmer at the table.","Add ingredients in batches, starting with those that take longest.","Each person takes from the pot as items cook.","Dip into ponzu sauce with grated daikon.","At the end, cook udon or rice in the remaining broth."], chef_notes:"Nabe is about the experience as much as the food — cooking and eating together at the table. The final dish (shime) of noodles or rice in the remaining umami-rich broth is often everyone's favourite part.", serving_suggestions:"Set up as a communal tabletop experience. Provide individual ponzu bowls and condiments.", nutrition_estimate:{calories:"285",protein_g:"22",carbohydrates_g:"28",fat_g:"8"}, tags:["Hot Pot","Communal","Winter","Japanese"], img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
  { dish_name:"Kenchinjiru (Buddhist Vegetable Soup)", state:"Japan", cuisine:"Japanese", category:"Soups", difficulty_level:"Easy", prep_time_minutes:20, cook_time_minutes:25, total_time_minutes:45, servings:4, short_description:"A nourishing temple soup from Kamakura's Zen Buddhist temples — root vegetables and tofu simmered in kombu dashi with sesame oil. No meat, no fish.", ingredients:[{name:"Daikon radish",quantity:"200",unit:"g"},{name:"Carrot",quantity:"1",unit:"large"},{name:"Burdock root",quantity:"100",unit:"g"},{name:"Taro (satoimo)",quantity:"200",unit:"g"},{name:"Firm tofu",quantity:"200",unit:"g"},{name:"Konnyaku",quantity:"100",unit:"g"},{name:"Kombu dashi",quantity:"1",unit:"litre"},{name:"Sesame oil",quantity:"2",unit:"tbsp"},{name:"Soy sauce",quantity:"3",unit:"tbsp"},{name:"Sake",quantity:"2",unit:"tbsp"}], preparation_steps:["Press and crumble tofu. Fry in sesame oil until golden.","Add all cut vegetables and konnyaku.","Stir-fry briefly with tofu.","Pour in dashi and bring to boil.","Simmer 20 minutes until vegetables are tender.","Season with soy sauce and sake.","Serve in bowls with mitsuba garnish."], chef_notes:"This soup originates from Kencho-ji temple in Kamakura. Frying the tofu and vegetables in sesame oil before adding dashi is the defining technique.", serving_suggestions:"Serve as a warming, nourishing vegan meal with steamed rice.", nutrition_estimate:{calories:"165",protein_g:"8",carbohydrates_g:"22",fat_g:"7"}, tags:["Vegan","Buddhist","Temple Food","Healthy"], img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },

  // ── RICE PREPARATIONS ───────────────────────────────────────────────────────
  { dish_name:"Oyakodon (Chicken & Egg Rice Bowl)", state:"Japan", cuisine:"Japanese", category:"Rice Preparations", difficulty_level:"Easy", prep_time_minutes:15, cook_time_minutes:15, total_time_minutes:30, servings:4, short_description:"Parent and child rice bowl — tender chicken and softly set egg simmered in sweet dashi sauce over steamed rice. Japan's most comforting donburi.", ingredients:[{name:"Chicken thigh",quantity:"400",unit:"g"},{name:"Eggs",quantity:"6",unit:"large"},{name:"Onion",quantity:"1",unit:"large"},{name:"Dashi stock",quantity:"200",unit:"ml"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Mirin",quantity:"4",unit:"tbsp"},{name:"Sake",quantity:"2",unit:"tbsp"},{name:"Sugar",quantity:"1",unit:"tbsp"},{name:"Steamed rice",quantity:"600",unit:"g"},{name:"Nori",quantity:"2",unit:"strips"},{name:"Mitsuba or parsley",quantity:"4",unit:"sprigs"}], preparation_steps:["Slice chicken thighs into bite-sized pieces.","Slice onion into thin half-moons.","Combine dashi, soy sauce, mirin, sake and sugar in pan.","Bring to simmer. Add onion and cook 3 minutes.","Add chicken pieces. Simmer 4 minutes.","Lightly beat eggs — do not beat fully, keep some white streaks.","Pour egg over chicken in a circular motion.","Cover and cook on low heat 1 minute until egg is 70% set.","Remove from heat and slide over rice.","Garnish with nori and mitsuba."], chef_notes:"The egg must be slightly undercooked when you remove from heat — it continues cooking from the residual heat when poured over rice. Overcooked egg makes a dry, rubbery oyakodon.", serving_suggestions:"Serve immediately in deep bowls over hot steamed rice.", nutrition_estimate:{calories:"485",protein_g:"32",carbohydrates_g:"58",fat_g:"14"}, tags:["Donburi","Comfort Food","Egg","Japanese"], img:"https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80" },
  { dish_name:"Katsudon (Pork Cutlet Rice Bowl)", state:"Japan", cuisine:"Japanese", category:"Rice Preparations", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:20, total_time_minutes:40, servings:4, short_description:"Japan's most iconic donburi — crispy tonkatsu simmered with egg in sweet dashi over rice. Eaten before exams and competitions as a symbol of success.", ingredients:[{name:"Pork cutlets (tonkatsu)",quantity:"4",unit:"pieces"},{name:"Eggs",quantity:"6",unit:"large"},{name:"Onion",quantity:"1",unit:"large"},{name:"Dashi stock",quantity:"200",unit:"ml"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Mirin",quantity:"4",unit:"tbsp"},{name:"Sugar",quantity:"1",unit:"tbsp"},{name:"Panko breadcrumbs",quantity:"150",unit:"g"},{name:"Flour",quantity:"80",unit:"g"},{name:"Steamed rice",quantity:"600",unit:"g"}], preparation_steps:["Pound pork cutlets to even thickness. Season with salt and pepper.","Dredge in flour, egg, then panko.","Deep fry at 170°C until golden — about 5 minutes per side.","Rest and slice into strips.","Make sauce with dashi, soy and mirin. Simmer onion until soft.","Place tonkatsu strips in sauce. Pour beaten egg over.","Cover and cook until egg is set but still soft.","Slide over rice and serve immediately."], chef_notes:"Katsu is eaten before important events in Japan because katsu sounds like 'to win'. The egg coating the crispy tonkatsu is the genius of this dish.", serving_suggestions:"Serve in deep lacquer bowls. Provide Japanese pickles on the side.", nutrition_estimate:{calories:"620",protein_g:"36",carbohydrates_g:"68",fat_g:"22"}, tags:["Donburi","Pork Cutlet","Victory","Japanese"], img:"https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80" },
  { dish_name:"Takikomi Gohan (Mixed Rice)", state:"Japan", cuisine:"Japanese", category:"Rice Preparations", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:40, total_time_minutes:60, servings:4, short_description:"Japanese seasoned rice cooked with chicken, mushrooms and vegetables in a dashi-soy broth — the entire dish cooked together in one pot, absorbing all the umami.", ingredients:[{name:"Japanese rice",quantity:"400",unit:"g"},{name:"Chicken thigh",quantity:"200",unit:"g"},{name:"Gobo (burdock root)",quantity:"80",unit:"g"},{name:"Carrot",quantity:"1",unit:"medium"},{name:"Shiitake mushrooms",quantity:"6",unit:"pieces"},{name:"Aburaage (fried tofu skin)",quantity:"2",unit:"pieces"},{name:"Dashi stock",quantity:"450",unit:"ml"},{name:"Soy sauce",quantity:"3",unit:"tbsp"},{name:"Mirin",quantity:"2",unit:"tbsp"},{name:"Sake",quantity:"2",unit:"tbsp"}], preparation_steps:["Wash rice and soak 30 minutes. Drain.","Cut chicken, vegetables and mushrooms into small pieces.","Combine dashi, soy, mirin and sake.","Place rice in heavy pot. Arrange all ingredients over rice.","Pour dashi mixture over.","Cook covered on high until boiling, then low heat 12 minutes.","Rest covered 10 minutes. Do not lift lid during cooking.","Fold ingredients gently into rice and serve."], chef_notes:"Never lift the lid during cooking — the steam is what cooks the rice perfectly. The burdock root adds an irreplaceable earthy depth.", serving_suggestions:"Serve in individual rice bowls. Excellent as a meal on its own.", nutrition_estimate:{calories:"385",protein_g:"18",carbohydrates_g:"62",fat_g:"7"}, tags:["Rice","One Pot","Traditional","Japanese"], img:"https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80" },
  { dish_name:"Chahan (Japanese Fried Rice)", state:"Japan", cuisine:"Japanese", category:"Rice Preparations", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:10, total_time_minutes:20, servings:4, short_description:"Japanese fried rice — simpler and more restrained than Chinese fried rice, with a delicate soy butter flavour and light, separated grains. A beloved home staple.", ingredients:[{name:"Cooked cold rice",quantity:"600",unit:"g"},{name:"Eggs",quantity:"3",unit:"large"},{name:"Ham or bacon",quantity:"100",unit:"g"},{name:"Green onion",quantity:"4",unit:"stalks"},{name:"Soy sauce",quantity:"2",unit:"tbsp"},{name:"Butter",quantity:"2",unit:"tbsp"},{name:"Sesame oil",quantity:"1",unit:"tsp"},{name:"Salt",quantity:"0.5",unit:"tsp"},{name:"White pepper",quantity:"0.5",unit:"tsp"}], preparation_steps:["Use cold, day-old rice — fresh rice makes sticky fried rice.","Heat wok until smoking hot.","Add butter and immediately add beaten eggs.","Before eggs set fully, add cold rice and stir-fry rapidly.","Stir-fry on highest heat, breaking rice clumps.","Add ham and green onion.","Season with soy sauce, sesame oil, salt and pepper.","Toss rapidly for 2 more minutes.","Serve immediately."], chef_notes:"Day-old refrigerated rice is essential — fresh rice has too much moisture. High heat is everything — a cold wok makes soggy fried rice.", serving_suggestions:"Serve immediately in small rice bowls or alongside other dishes.", nutrition_estimate:{calories:"365",protein_g:"14",carbohydrates_g:"58",fat_g:"9"}, tags:["Fried Rice","Quick","Everyday","Japanese"], img:"https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80" },
  { dish_name:"Onigiri Rice Sandwich (Onigirazu)", state:"Japan", cuisine:"Japanese", category:"Rice Preparations", difficulty_level:"Easy", prep_time_minutes:20, cook_time_minutes:20, total_time_minutes:40, servings:4, short_description:"The modern Japanese rice sandwich — rice and colourful fillings wrapped tightly in nori, sliced to reveal beautiful layers. The trendiest convenience food from Japanese konbini.", ingredients:[{name:"Sushi rice",quantity:"500",unit:"g"},{name:"Nori sheets",quantity:"4",unit:"pieces"},{name:"Salmon fillet",quantity:"200",unit:"g"},{name:"Avocado",quantity:"2",unit:"large"},{name:"Cucumber",quantity:"1",unit:"medium"},{name:"Japanese mayo",quantity:"4",unit:"tbsp"},{name:"Eggs",quantity:"2",unit:"large"},{name:"Soy sauce",quantity:"2",unit:"tbsp"}], preparation_steps:["Season and cool sushi rice.","Grill or pan-fry salmon. Flake into pieces.","Make thin egg omelette and cool.","Slice avocado and cucumber.","Lay nori sheet diagonally on plastic wrap.","Place rice in centre. Add fillings on top. Cover with more rice.","Fold nori over to wrap completely.","Wrap tightly in plastic film. Press firmly and rest 5 minutes.","Slice through the middle with a sharp knife."], chef_notes:"Pressing firmly and resting is essential for onigirazu to hold its shape when sliced. The dramatic cross-section should reveal clean, colourful layers.", serving_suggestions:"Wrap in parchment paper as portable lunch. Reveal the layers when opened.", nutrition_estimate:{calories:"395",protein_g:"20",carbohydrates_g:"52",fat_g:"12"}, tags:["Trendy","Portable","Konbini","Japanese"], img:"https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80" },
  { dish_name:"Maze Gohan (Mixed Rice Bowl)", state:"Japan", cuisine:"Japanese", category:"Rice Preparations", difficulty_level:"Easy", prep_time_minutes:15, cook_time_minutes:15, total_time_minutes:30, servings:4, short_description:"A richly flavoured rice bowl where toppings are mixed into the rice by the diner — raw egg yolk, pickled vegetables and seasoned minced meat create a luxurious umami bomb.", ingredients:[{name:"Steamed rice",quantity:"600",unit:"g"},{name:"Ground beef",quantity:"250",unit:"g"},{name:"Egg yolks",quantity:"4",unit:"pieces"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Sake",quantity:"2",unit:"tbsp"},{name:"Mirin",quantity:"2",unit:"tbsp"},{name:"Green onion",quantity:"4",unit:"stalks"},{name:"Sesame oil",quantity:"1",unit:"tbsp"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"},{name:"Nori strips",quantity:"4",unit:"strips"}], preparation_steps:["Stir-fry ground beef until cooked. Season with soy sauce, sake and mirin.","Divide steamed rice into bowls.","Top rice with seasoned beef.","Create a well in the centre and place a raw egg yolk.","Arrange nori strips, green onion and sesame seeds around.","Drizzle with sesame oil.","At the table, mix everything thoroughly into rice.","Eat immediately."], chef_notes:"The raw egg yolk must be fresh and high quality — it acts as a sauce when mixed. The act of mixing is part of the experience.", serving_suggestions:"Serve in deep bowls. Mix vigorously at the table for the full effect.", nutrition_estimate:{calories:"445",protein_g:"22",carbohydrates_g:"56",fat_g:"14"}, tags:["Rice Bowl","Egg Yolk","Umami","Japanese"], img:"https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80" },
  { dish_name:"Kamaage Udon", state:"Japan", cuisine:"Japanese", category:"Rice Preparations", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:15, total_time_minutes:25, servings:4, short_description:"Thick udon noodles served directly from their cooking water into a hot dashi broth — Kagawa prefecture's most beloved noodle dish, valued for simplicity and quality.", ingredients:[{name:"Fresh udon noodles",quantity:"600",unit:"g"},{name:"Dashi stock",quantity:"800",unit:"ml"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Mirin",quantity:"4",unit:"tbsp"},{name:"Grated daikon",quantity:"100",unit:"g"},{name:"Green onion",quantity:"4",unit:"stalks"},{name:"Ginger",quantity:"1",unit:"tsp"},{name:"Tempura flakes",quantity:"4",unit:"tbsp"}], preparation_steps:["Combine dashi, soy and mirin. Heat gently — this is the dipping broth.","Bring large pot of water to vigorous boil.","Cook udon noodles until tender — fresh udon takes only 3 minutes.","Serve noodles directly in cooking water in a pot.","Dip noodles into hot broth with daikon, ginger and onion.","Alternatively, pour hot broth over noodles.","Top with tempura flakes."], chef_notes:"Kamaage udon is about simplicity — the quality of the udon noodles is everything. Fresh udon from a Japanese market is ideal.", serving_suggestions:"Serve noodles in their cooking water and broth separately for dipping style.", nutrition_estimate:{calories:"345",protein_g:"11",carbohydrates_g:"68",fat_g:"3"}, tags:["Udon","Noodles","Simple","Kagawa"], img:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80" },
  { dish_name:"Tekkadon (Tuna Rice Bowl)", state:"Japan", cuisine:"Japanese", category:"Rice Preparations", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:20, total_time_minutes:40, servings:4, short_description:"A glorious donburi of fresh tuna sashimi marinated in soy and mirin, fanned over warm sushi rice — simple, luxurious and deeply satisfying.", ingredients:[{name:"Sashimi-grade tuna",quantity:"400",unit:"g"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Mirin",quantity:"2",unit:"tbsp"},{name:"Sake",quantity:"1",unit:"tbsp"},{name:"Sesame oil",quantity:"1",unit:"tsp"},{name:"Sushi rice",quantity:"600",unit:"g"},{name:"Wasabi",quantity:"2",unit:"tbsp"},{name:"Nori",quantity:"4",unit:"strips"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"},{name:"Green onion",quantity:"2",unit:"stalks"}], preparation_steps:["Slice tuna into 5mm thick slices.","Marinate in soy sauce, mirin and sake for 15 minutes.","Prepare sushi rice.","Divide warm rice into bowls.","Arrange marinated tuna over rice.","Add wasabi to one side.","Garnish with nori strips, sesame seeds and green onion.","Drizzle remaining marinade over."], chef_notes:"Only use sashimi-grade tuna for this dish. The marinade time is important — too long and the tuna becomes too salty and loses its texture.", serving_suggestions:"Serve immediately once assembled. Provide extra soy sauce on the side.", nutrition_estimate:{calories:"420",protein_g:"30",carbohydrates_g:"56",fat_g:"8"}, tags:["Tuna","Donburi","Sashimi","Premium"], img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80" },
  { dish_name:"Gomoku Gohan (Five Ingredient Rice)", state:"Japan", cuisine:"Japanese", category:"Rice Preparations", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:40, total_time_minutes:60, servings:6, short_description:"Traditional Japanese mixed rice with five classic ingredients — chicken, carrot, burdock, shiitake and aburaage, cooked together in seasoned dashi.", ingredients:[{name:"Japanese rice",quantity:"500",unit:"g"},{name:"Chicken thigh",quantity:"200",unit:"g"},{name:"Carrot",quantity:"1",unit:"large"},{name:"Burdock root",quantity:"80",unit:"g"},{name:"Dried shiitake mushrooms",quantity:"6",unit:"pieces"},{name:"Aburaage",quantity:"2",unit:"pieces"},{name:"Dashi from shiitake",quantity:"450",unit:"ml"},{name:"Soy sauce",quantity:"3",unit:"tbsp"},{name:"Mirin",quantity:"2",unit:"tbsp"},{name:"Salt",quantity:"0.5",unit:"tsp"}], preparation_steps:["Soak shiitake in 500ml water overnight — save soaking water as dashi.","Dice all ingredients finely and evenly.","Wash and drain rice.","Combine shiitake dashi with soy, mirin and salt.","Place rice in pot. Arrange all ingredients on top.","Pour dashi to just cover.","Cook covered on medium-high until boiling, then low 12 minutes.","Rest 10 minutes. Fold gently to mix."], chef_notes:"The shiitake soaking water is the secret ingredient — it has deep umami that regular dashi lacks. Never discard it.", serving_suggestions:"Serve in individual rice bowls. Makes excellent bento box filling.", nutrition_estimate:{calories:"355",protein_g:"16",carbohydrates_g:"60",fat_g:"5"}, tags:["Traditional","Five Ingredients","One Pot","Japanese"], img:"https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80" },
  { dish_name:"Unadon (Grilled Eel Rice Bowl)", state:"Japan", cuisine:"Japanese", category:"Rice Preparations", difficulty_level:"Medium", prep_time_minutes:15, cook_time_minutes:20, total_time_minutes:35, servings:4, short_description:"A luxurious Japanese rice bowl topped with kabayaki eel — lacquered with sweet soy tare and grilled to a caramelised glaze over steamed rice. Japan's summer stamina food.", ingredients:[{name:"Prepared kabayaki eel",quantity:"4",unit:"fillets"},{name:"Steamed rice",quantity:"600",unit:"g"},{name:"Eel sauce (tare)",quantity:"6",unit:"tbsp"},{name:"Soy sauce",quantity:"2",unit:"tbsp"},{name:"Mirin",quantity:"4",unit:"tbsp"},{name:"Sugar",quantity:"2",unit:"tbsp"},{name:"Sake",quantity:"2",unit:"tbsp"},{name:"Sansho pepper",quantity:"1",unit:"tsp"},{name:"Nori",quantity:"2",unit:"sheets"}], preparation_steps:["Make tare: combine soy, mirin, sugar and sake. Simmer until slightly thickened.","Heat prepared eel under grill or in pan.","Brush generously with tare during heating.","Continue brushing and heating until lacquered and caramelised.","Divide hot rice into lacquer bowls.","Lay eel over rice.","Brush with final coat of tare.","Sprinkle sansho pepper.","Serve with nori on the side."], chef_notes:"Sansho pepper is the essential final touch for unadon — its numbing, citrusy heat perfectly complements the rich eel. Never skip it.", serving_suggestions:"Serve in deep lacquer boxes (jubako) traditionally. Eaten especially on Doyo no Ushi no Hi (midsummer).", nutrition_estimate:{calories:"520",protein_g:"28",carbohydrates_g:"62",fat_g:"18"}, tags:["Eel","Premium","Summer","Japanese"], img:"https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80" },

  // ── MAIN COURSES ────────────────────────────────────────────────────────────
  { dish_name:"Chicken Katsu Curry", state:"Japan", cuisine:"Japanese", category:"Main Courses", difficulty_level:"Medium", prep_time_minutes:30, cook_time_minutes:40, total_time_minutes:70, servings:4, short_description:"Japan's most beloved western-influenced dish — crispy panko chicken cutlet served alongside a rich, mildly spiced Japanese curry sauce over steamed rice.", ingredients:[{name:"Chicken breast",quantity:"4",unit:"pieces"},{name:"Panko breadcrumbs",quantity:"200",unit:"g"},{name:"Eggs",quantity:"2",unit:"large"},{name:"Flour",quantity:"80",unit:"g"},{name:"Japanese curry roux",quantity:"4",unit:"blocks"},{name:"Onion",quantity:"2",unit:"large"},{name:"Carrot",quantity:"2",unit:"medium"},{name:"Potato",quantity:"2",unit:"large"},{name:"Water",quantity:"700",unit:"ml"},{name:"Steamed rice",quantity:"600",unit:"g"},{name:"Tonkatsu sauce",quantity:"4",unit:"tbsp"}], preparation_steps:["Make curry: fry onion until golden, add carrot and potato.","Add water and simmer 15 minutes until vegetables are tender.","Add curry roux blocks and stir until dissolved. Simmer 10 minutes.","Pound chicken breasts to even thickness.","Bread chicken in flour, egg, then panko.","Deep fry at 170°C for 5-6 minutes until golden.","Slice katsu diagonally.","Serve rice in a plate, katsu alongside, curry poured next to katsu.","Drizzle tonkatsu sauce over katsu."], chef_notes:"Japanese curry is distinctly different from Indian curry — it is mild, slightly sweet and very thick. S&B or Vermont curry roux blocks are authentic and essential.", serving_suggestions:"Serve on a plate with rice, katsu and curry in three distinct sections.", nutrition_estimate:{calories:"685",protein_g:"42",carbohydrates_g:"78",fat_g:"22"}, tags:["Curry","Katsu","Popular","Yoshoku"], img:"https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=400&q=80" },
  { dish_name:"Beef Sukiyaki", state:"Japan", cuisine:"Japanese", category:"Main Courses", difficulty_level:"Medium", prep_time_minutes:30, cook_time_minutes:25, total_time_minutes:55, servings:4, short_description:"Japan's most celebratory hot pot — thinly sliced premium beef cooked in a sweet soy broth at the table and dipped in raw egg. A dish reserved for special occasions.", ingredients:[{name:"Wagyu or premium beef sirloin",quantity:"600",unit:"g"},{name:"Firm tofu",quantity:"300",unit:"g"},{name:"Napa cabbage",quantity:"300",unit:"g"},{name:"Shiitake mushrooms",quantity:"8",unit:"pieces"},{name:"Enoki mushrooms",quantity:"150",unit:"g"},{name:"Konjac noodles",quantity:"200",unit:"g"},{name:"Soy sauce",quantity:"6",unit:"tbsp"},{name:"Mirin",quantity:"6",unit:"tbsp"},{name:"Sake",quantity:"4",unit:"tbsp"},{name:"Sugar",quantity:"3",unit:"tbsp"},{name:"Raw eggs",quantity:"4",unit:"pieces"}], preparation_steps:["Arrange all ingredients on platters around the table.","Heat cast iron or heavy pot. Rub with beef fat.","Lay first slices of beef and sear briefly.","Add soy sauce, mirin, sake and sugar directly.","Add vegetables and tofu around the beef.","Each person beats a raw egg in their bowl.","Take cooked items from the pot and dip in beaten egg before eating.","Replenish ingredients and adjust seasoning as you eat."], chef_notes:"The raw egg dip is not optional — it is the defining element of sukiyaki. It cools the hot meat and adds a silky richness. Use very fresh eggs.", serving_suggestions:"Cook and eat communally at the table. Serve with steamed rice.", nutrition_estimate:{calories:"480",protein_g:"34",carbohydrates_g:"22",fat_g:"28"}, tags:["Hot Pot","Beef","Special Occasion","Communal"], img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80" },
  { dish_name:"Salmon Teriyaki", state:"Japan", cuisine:"Japanese", category:"Main Courses", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:15, total_time_minutes:25, servings:4, short_description:"A Japanese classic — salmon glazed with a glossy teriyaki sauce of soy, mirin and sake, pan-fried to a lacquered finish. One of Japan's most internationally loved dishes.", ingredients:[{name:"Salmon fillets",quantity:"4",unit:"pieces"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Mirin",quantity:"4",unit:"tbsp"},{name:"Sake",quantity:"2",unit:"tbsp"},{name:"Sugar",quantity:"1",unit:"tbsp"},{name:"Sesame seeds",quantity:"2",unit:"tbsp"},{name:"Vegetable oil",quantity:"2",unit:"tbsp"},{name:"Steamed rice",quantity:"600",unit:"g"},{name:"Green onion",quantity:"2",unit:"stalks"}], preparation_steps:["Mix soy sauce, mirin, sake and sugar for teriyaki sauce.","Pat salmon dry with paper towels.","Heat oil in pan over medium-high heat.","Place salmon skin-side up and cook 3 minutes.","Flip to skin side and cook 2 more minutes.","Pour teriyaki sauce over salmon.","Reduce heat and keep turning salmon, coating in sauce.","Cook until sauce is thick and caramelised — about 3 more minutes.","Serve over rice with sesame seeds and green onion."], chef_notes:"The caramelisation of the sauce is what creates that glossy lacquered finish. Keep turning the salmon in the thickening sauce over medium-low heat.", serving_suggestions:"Serve over steamed rice with blanched broccoli and miso soup.", nutrition_estimate:{calories:"395",protein_g:"34",carbohydrates_g:"30",fat_g:"16"}, tags:["Teriyaki","Salmon","Quick","Japanese"], img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80" },
  { dish_name:"Tonkatsu (Pork Cutlet)", state:"Japan", cuisine:"Japanese", category:"Main Courses", difficulty_level:"Easy", prep_time_minutes:20, cook_time_minutes:15, total_time_minutes:35, servings:4, short_description:"Japan's quintessential Western-influenced dish — thick pork cutlet coated in panko and fried to a crispy golden perfection, served with shredded cabbage and tonkatsu sauce.", ingredients:[{name:"Pork loin cutlets",quantity:"4",unit:"thick pieces"},{name:"Panko breadcrumbs",quantity:"200",unit:"g"},{name:"Eggs",quantity:"2",unit:"large"},{name:"Flour",quantity:"80",unit:"g"},{name:"Salt",quantity:"1",unit:"tsp"},{name:"White pepper",quantity:"0.5",unit:"tsp"},{name:"Oil for frying",quantity:"2",unit:"cups"},{name:"Tonkatsu sauce",quantity:"6",unit:"tbsp"},{name:"Shredded cabbage",quantity:"200",unit:"g"},{name:"Japanese mustard",quantity:"1",unit:"tbsp"}], preparation_steps:["Pound pork cutlets to 1.5cm thickness.","Score the edges to prevent curling.","Season with salt and pepper.","Dredge in flour, beaten egg, then panko.","Press panko firmly to adhere.","Deep fry at 165°C for 6-7 minutes until golden.","Do not crowd the pan.","Rest on wire rack 3 minutes before slicing.","Slice and serve with tonkatsu sauce."], chef_notes:"The lower frying temperature ensures the pork cooks through without burning the panko. Resting after frying allows the juices to redistribute.", serving_suggestions:"Serve with shredded cabbage, rice, miso soup and tonkatsu sauce.", nutrition_estimate:{calories:"480",protein_g:"32",carbohydrates_g:"34",fat_g:"24"}, tags:["Pork Cutlet","Yoshoku","Crispy","Japanese"], img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80" },
  { dish_name:"Shabu-Shabu", state:"Japan", cuisine:"Japanese", category:"Main Courses", difficulty_level:"Easy", prep_time_minutes:30, cook_time_minutes:20, total_time_minutes:50, servings:4, short_description:"Thinly sliced beef swished through a bubbling kombu broth at the table — the sound of the swishing gives this beloved Japanese hot pot its name.", ingredients:[{name:"Wagyu beef sirloin, paper thin",quantity:"600",unit:"g"},{name:"Napa cabbage",quantity:"300",unit:"g"},{name:"Tofu",quantity:"300",unit:"g"},{name:"Enoki mushrooms",quantity:"150",unit:"g"},{name:"Carrot",quantity:"1",unit:"large"},{name:"Kombu",quantity:"20",unit:"g"},{name:"Water",quantity:"1.5",unit:"litres"},{name:"Sesame ponzu sauce",quantity:"8",unit:"tbsp"},{name:"Goma dare (sesame sauce)",quantity:"8",unit:"tbsp"},{name:"Green onion",quantity:"4",unit:"stalks"}], preparation_steps:["Make kombu broth: soak kombu in water 30 minutes, heat to 80°C.","Arrange all ingredients decoratively on platters.","Set up broth at table over portable burner.","Dip each thin slice of beef into broth and swish 2-3 times.","Beef cooks in 5-10 seconds.","Also cook vegetables, tofu and mushrooms in broth.","Dip into ponzu or sesame sauce.","Finish meal by cooking udon in the remaining broth."], chef_notes:"Shabu-shabu beef must be paper thin — ask the butcher to slice it on a meat slicer. Wagyu is ideal but any good sirloin works when sliced thin enough.", serving_suggestions:"Set up as a communal tabletop experience. Provide both ponzu and sesame dipping sauces.", nutrition_estimate:{calories:"350",protein_g:"32",carbohydrates_g:"12",fat_g:"20"}, tags:["Hot Pot","Beef","Communal","Wagyu"], img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80" },
  { dish_name:"Niku Jaga (Meat and Potato Stew)", state:"Japan", cuisine:"Japanese", category:"Main Courses", difficulty_level:"Easy", prep_time_minutes:15, cook_time_minutes:30, total_time_minutes:45, servings:4, short_description:"Japan's beloved home stew — beef, potato and onion simmered in soy-mirin broth. Called Japan's answer to pot roast, it is pure, nostalgic comfort food.", ingredients:[{name:"Beef sirloin slices",quantity:"300",unit:"g"},{name:"Potatoes",quantity:"4",unit:"large"},{name:"Onion",quantity:"2",unit:"large"},{name:"Carrot",quantity:"1",unit:"large"},{name:"Shirataki noodles",quantity:"150",unit:"g"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Mirin",quantity:"4",unit:"tbsp"},{name:"Sake",quantity:"3",unit:"tbsp"},{name:"Sugar",quantity:"2",unit:"tbsp"},{name:"Dashi stock",quantity:"300",unit:"ml"}], preparation_steps:["Cut potatoes into large chunks. Rinse under cold water.","Slice onion thickly. Cut carrot into chunks.","Blanch shirataki noodles and cut.","Stir-fry beef until colour changes.","Add onion and cook 2 minutes.","Add dashi, soy, mirin, sake and sugar.","Add potatoes, carrot and noodles.","Cover and simmer 20 minutes until potatoes are tender.","Leave covered 10 minutes before serving."], chef_notes:"Nikujaga is Japan's definition of 'okaasan no taste' (mother's flavour). The potatoes should be tender but not falling apart. The broth is the soul of the dish.", serving_suggestions:"Serve in deep bowls with steamed rice and pickled vegetables.", nutrition_estimate:{calories:"365",protein_g:"20",carbohydrates_g:"48",fat_g:"10"}, tags:["Comfort Food","Home Cooking","Stew","Japanese"], img:"https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&q=80" },
  { dish_name:"Yakizakana (Grilled Salt Mackerel)", state:"Japan", cuisine:"Japanese", category:"Main Courses", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:15, total_time_minutes:25, servings:4, short_description:"The most essential Japanese dinner table dish — whole mackerel seasoned simply with salt and grilled until the skin is crispy and fragrant. Simplicity is perfection.", ingredients:[{name:"Mackerel fillets",quantity:"4",unit:"pieces"},{name:"Salt",quantity:"2",unit:"tbsp"},{name:"Sake",quantity:"2",unit:"tbsp"},{name:"Grated daikon",quantity:"100",unit:"g"},{name:"Sudachi or lemon",quantity:"2",unit:"pieces"},{name:"Soy sauce",quantity:"2",unit:"tbsp"}], preparation_steps:["Score mackerel skin in crosshatch pattern.","Rub generously with salt on both sides.","Sprinkle sake and let marinate 20 minutes.","Pat dry with paper towels.","Grill skin-side up under high heat until skin is crispy and charred — 7 minutes.","Flip and cook flesh side 5 more minutes.","Serve with grated daikon and citrus."], chef_notes:"Salt-grilled fish is one of the great pillars of Japanese cooking. The crosshatch cut in the skin prevents curling and helps the salt penetrate.", serving_suggestions:"Serve with grated daikon mixed with soy sauce, steamed rice and miso soup.", nutrition_estimate:{calories:"285",protein_g:"28",carbohydrates_g:"2",fat_g:"18"}, tags:["Grilled Fish","Traditional","Healthy","Everyday"], img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80" },
  { dish_name:"Yudofu (Simmered Tofu)", state:"Japan", cuisine:"Japanese", category:"Main Courses", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:15, total_time_minutes:25, servings:4, short_description:"Kyoto's most celebrated winter dish — silken tofu gently simmered in kombu broth and eaten with simple condiments. A Zen Buddhist dish of profound simplicity.", ingredients:[{name:"Silken tofu",quantity:"800",unit:"g"},{name:"Kombu",quantity:"20",unit:"g"},{name:"Water",quantity:"1",unit:"litre"},{name:"Soy sauce",quantity:"6",unit:"tbsp"},{name:"Mirin",quantity:"3",unit:"tbsp"},{name:"Katsuobushi",quantity:"20",unit:"g"},{name:"Green onion",quantity:"4",unit:"stalks"},{name:"Grated ginger",quantity:"2",unit:"tsp"},{name:"Yuzu zest",quantity:"1",unit:"tsp"}], preparation_steps:["Place kombu in pot with water. Bring slowly to 80°C.","Cut tofu into large cubes.","Add tofu to kombu broth. Heat very gently — do not boil.","Make dipping sauce: heat soy and mirin together.","Place katsuobushi in sauce — the heat makes it dance.","Serve tofu in the pot at the table.","Scoop tofu into individual bowls.","Add condiments to dipping sauce: onion, ginger, yuzu.","Dip tofu gently and eat."], chef_notes:"Yudofu is a meditation on simplicity. Never boil the tofu — it should barely simmer. The quality of the tofu is everything in this dish.", serving_suggestions:"Serve at the table in the simmering pot. A Kyoto winter tradition.", nutrition_estimate:{calories:"145",protein_g:"12",carbohydrates_g:"8",fat_g:"6"}, tags:["Tofu","Vegan","Kyoto","Zen Buddhist"], img:"https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80" },
  { dish_name:"Hambagu (Japanese Hamburg Steak)", state:"Japan", cuisine:"Japanese", category:"Main Courses", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:20, total_time_minutes:40, servings:4, short_description:"Japan's beloved adaptation of Hamburg steak — a juicy, flavourful patty made with beef and pork, served with a tangy Japanese demi-glace sauce. A family favourite.", ingredients:[{name:"Ground beef",quantity:"300",unit:"g"},{name:"Ground pork",quantity:"200",unit:"g"},{name:"Onion",quantity:"1",unit:"large"},{name:"Breadcrumbs",quantity:"4",unit:"tbsp"},{name:"Milk",quantity:"4",unit:"tbsp"},{name:"Egg",quantity:"1",unit:"large"},{name:"Nutmeg",quantity:"0.25",unit:"tsp"},{name:"Soy sauce",quantity:"2",unit:"tbsp"},{name:"Mirin",quantity:"2",unit:"tbsp"},{name:"Ketchup",quantity:"4",unit:"tbsp"},{name:"Worcestershire sauce",quantity:"2",unit:"tbsp"},{name:"Butter",quantity:"1",unit:"tbsp"}], preparation_steps:["Fry onion until golden and cool completely.","Mix beef, pork, onion, breadcrumbs soaked in milk, egg, nutmeg and seasoning.","Knead mixture well until sticky.","Shape into oval patties, pressing out air pockets.","Make indentation in centre with thumb (prevents puffing).","Cook in pan 4 minutes per side until cooked through.","Make sauce: deglaze pan with soy, mirin, ketchup and Worcestershire.","Finish with butter for gloss.","Pour sauce over hambagu."], chef_notes:"The indentation in the centre is the essential hambagu technique — it prevents the patty from puffing up and allows even cooking.", serving_suggestions:"Serve with steamed rice, shredded cabbage and Japanese potato salad.", nutrition_estimate:{calories:"420",protein_g:"28",carbohydrates_g:"18",fat_g:"26"}, tags:["Yoshoku","Hamburg","Family Food","Japanese"], img:"https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&q=80" },
  { dish_name:"Saba Misoni (Mackerel in Miso)", state:"Japan", cuisine:"Japanese", category:"Main Courses", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:20, total_time_minutes:30, servings:4, short_description:"Mackerel simmered in a rich miso and ginger broth until tender and deeply flavoured — one of Japan's most prized and nutritious home-cooked dishes.", ingredients:[{name:"Mackerel fillets",quantity:"4",unit:"pieces"},{name:"White miso paste",quantity:"4",unit:"tbsp"},{name:"Mirin",quantity:"4",unit:"tbsp"},{name:"Sake",quantity:"4",unit:"tbsp"},{name:"Sugar",quantity:"2",unit:"tbsp"},{name:"Soy sauce",quantity:"1",unit:"tbsp"},{name:"Ginger",quantity:"2",unit:"inch"},{name:"Water",quantity:"200",unit:"ml"},{name:"Green onion",quantity:"3",unit:"stalks"}], preparation_steps:["Score mackerel skin and blanch in boiling water 30 seconds.","Rinse under cold water to remove any fishiness.","Combine water, sake, mirin, sugar and soy in pan. Bring to boil.","Add mackerel skin-side up.","Mix miso with a little of the broth and add to pan.","Add ginger slices.","Simmer 12-15 minutes, spooning sauce over mackerel regularly.","Reduce sauce until glossy and coating.","Garnish with sliced green onion."], chef_notes:"Blanching the mackerel before simmering removes any strong fishy odour and ensures a clean flavour. The sauce should be thick and glossy at the end.", serving_suggestions:"Serve over steamed rice with miso soup and pickled vegetables.", nutrition_estimate:{calories:"340",protein_g:"30",carbohydrates_g:"18",fat_g:"16"}, tags:["Mackerel","Miso","Traditional","Healthy"], img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80" },

  // ── DESSERTS ────────────────────────────────────────────────────────────────
  { dish_name:"Matcha Cheesecake", state:"Japan", cuisine:"Japanese", category:"Desserts", difficulty_level:"Hard", prep_time_minutes:30, cook_time_minutes:60, total_time_minutes:90, servings:8, short_description:"A Japanese jiggly cheesecake infused with premium matcha — impossibly light, soufflé-like in texture with a deep earthy green tea flavour. Japan's most beloved modern dessert.", ingredients:[{name:"Cream cheese",quantity:"250",unit:"g"},{name:"Eggs",quantity:"5",unit:"large"},{name:"Matcha powder",quantity:"3",unit:"tbsp"},{name:"Sugar",quantity:"120",unit:"g"},{name:"Milk",quantity:"100",unit:"ml"},{name:"Butter",quantity:"50",unit:"g"},{name:"Flour",quantity:"50",unit:"g"},{name:"Lemon juice",quantity:"1",unit:"tbsp"},{name:"Vanilla extract",quantity:"1",unit:"tsp"}], preparation_steps:["Separate eggs. Melt cream cheese with milk and butter.","Sift matcha and flour into cheese mixture.","Add egg yolks, lemon juice and vanilla. Mix smooth.","Beat egg whites with sugar to stiff peaks.","Fold meringue gently into cheese mixture in three additions.","Pour into lined springform pan.","Bake in water bath at 160°C for 60 minutes.","Turn off oven and leave inside 15 more minutes.","Cool completely before removing. Dust with matcha powder."], chef_notes:"The water bath and slow cooling are what create the jiggly, soufflé-like texture. Opening the oven too early causes collapse.", serving_suggestions:"Serve chilled with fresh whipped cream and a dusting of matcha powder.", nutrition_estimate:{calories:"285",protein_g:"7",carbohydrates_g:"26",fat_g:"17"}, tags:["Matcha","Cheesecake","Jiggly","Japanese Dessert"], img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
  { dish_name:"Mochi Ice Cream", state:"Japan", cuisine:"Japanese", category:"Desserts", difficulty_level:"Medium", prep_time_minutes:30, cook_time_minutes:10, total_time_minutes:40, servings:8, short_description:"Ice cream wrapped in a soft, pillowy glutinous rice wrapper — Japan's most playful, internationally beloved sweet. Chewy, cold and irresistible.", ingredients:[{name:"Glutinous rice flour (mochiko)",quantity:"200",unit:"g"},{name:"Sugar",quantity:"80",unit:"g"},{name:"Water",quantity:"200",unit:"ml"},{name:"Matcha or food colouring",quantity:"1",unit:"tbsp"},{name:"Ice cream (various flavours)",quantity:"500",unit:"ml"},{name:"Potato starch for dusting",quantity:"4",unit:"tbsp"},{name:"Condensed milk",quantity:"2",unit:"tbsp"}], preparation_steps:["Scoop ice cream into balls, freeze solid on lined tray.","Mix mochiko with sugar, water and matcha.","Microwave for 2 minutes, stir, microwave 1 more minute.","Stir vigorously until smooth and elastic.","Dust work surface with potato starch.","Roll mochi thin, cut into circles.","Work quickly — place frozen ice cream ball in centre.","Gather edges and pinch to seal.","Freeze sealed-side down immediately.","Freeze at least 1 hour before serving."], chef_notes:"Speed is essential — mochi becomes sticky and ice cream melts quickly. Keep everything cold and work with one piece at a time.", serving_suggestions:"Serve frozen, 5 minutes out of the freezer. Arrange on a platter for visual impact.", nutrition_estimate:{calories:"195",protein_g:"3",carbohydrates_g:"34",fat_g:"6"}, tags:["Mochi","Ice Cream","Sweet","Japanese Dessert"], img:"https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80" },
  { dish_name:"Dorayaki (Sweet Pancakes)", state:"Japan", cuisine:"Japanese", category:"Desserts", difficulty_level:"Easy", prep_time_minutes:15, cook_time_minutes:20, total_time_minutes:35, servings:8, short_description:"The beloved Japanese pancake sandwich filled with sweet red bean paste — made famous by Doraemon, beloved by everyone. Soft, honey-sweetened pancakes hugging a generous filling of anko.", ingredients:[{name:"Eggs",quantity:"3",unit:"large"},{name:"Sugar",quantity:"80",unit:"g"},{name:"Honey",quantity:"2",unit:"tbsp"},{name:"Mirin",quantity:"1",unit:"tbsp"},{name:"Flour",quantity:"150",unit:"g"},{name:"Baking soda",quantity:"0.5",unit:"tsp"},{name:"Water",quantity:"60",unit:"ml"},{name:"Sweet red bean paste (anko)",quantity:"300",unit:"g"},{name:"Butter",quantity:"1",unit:"tsp"}], preparation_steps:["Beat eggs with sugar and honey until pale.","Add mirin and water.","Sift flour and baking soda into egg mixture. Fold gently.","Rest batter 15 minutes.","Heat pan over medium-low with tiny amount of butter.","Pour small circles of batter.","When bubbles appear across surface, flip gently.","Cook 1 more minute.","Sandwich two pancakes with generous anko filling."], chef_notes:"The honey gives dorayaki its distinctive dark golden colour. Medium-low heat is essential — too hot and the outside burns before the inside cooks.", serving_suggestions:"Serve at room temperature. Best eaten the same day they're made.", nutrition_estimate:{calories:"195",protein_g:"5",carbohydrates_g:"36",fat_g:"4"}, tags:["Dorayaki","Anko","Sweet","Japanese"], img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
  { dish_name:"Warabi Mochi", state:"Japan", cuisine:"Japanese", category:"Desserts", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:15, total_time_minutes:25, servings:4, short_description:"A delicate, wobbly Japanese dessert made from bracken starch — translucent, barely-there in texture, dusted with roasted soybean flour and drizzled with kuromitsu syrup.", ingredients:[{name:"Warabimochiko (bracken starch)",quantity:"100",unit:"g"},{name:"Sugar",quantity:"80",unit:"g"},{name:"Water",quantity:"500",unit:"ml"},{name:"Kinako (roasted soybean flour)",quantity:"6",unit:"tbsp"},{name:"Kuromitsu (black sugar syrup)",quantity:"4",unit:"tbsp"},{name:"Matcha powder",quantity:"1",unit:"tsp"}], preparation_steps:["Mix warabimochiko with sugar and water until smooth.","Cook over medium heat, stirring constantly.","When mixture becomes translucent and thick and leaves the sides, it's done.","Pour onto kinako-dusted tray.","Cool to room temperature, then refrigerate 30 minutes.","Cut into cubes with a wet knife.","Dust generously with kinako mixed with matcha.","Drizzle with kuromitsu to serve."], chef_notes:"The constant stirring is essential — lumps form instantly if you stop. The mixture is ready when it's completely translucent and pulls cleanly from the pan.", serving_suggestions:"Serve chilled, dusted with kinako and drizzled with kuromitsu syrup.", nutrition_estimate:{calories:"185",protein_g:"3",carbohydrates_g:"42",fat_g:"2"}, tags:["Traditional","Vegetarian","Summer","Japanese"], img:"https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80" },
  { dish_name:"Annmitsu", state:"Japan", cuisine:"Japanese", category:"Desserts", difficulty_level:"Easy", prep_time_minutes:20, cook_time_minutes:15, total_time_minutes:35, servings:4, short_description:"A classic Japanese parfait of kanten jelly, sweet red beans, fruit and mochi, drizzled with black sugar syrup — the quintessential old-fashioned Japanese sweet shop dessert.", ingredients:[{name:"Agar-agar (kanten)",quantity:"4",unit:"g"},{name:"Water",quantity:"400",unit:"ml"},{name:"Sweet red bean paste",quantity:"100",unit:"g"},{name:"Shiratama mochi balls",quantity:"12",unit:"pieces"},{name:"Mixed seasonal fruit",quantity:"200",unit:"g"},{name:"Kuromitsu",quantity:"4",unit:"tbsp"},{name:"Matcha ice cream",quantity:"4",unit:"scoops"},{name:"Canned mandarin",quantity:"1",unit:"can"}], preparation_steps:["Dissolve agar in water, boil 2 minutes.","Pour into tray and cool until set.","Cut agar jelly into cubes.","Make shiratama: knead rice flour with water, roll into balls.","Boil shiratama until they float.","Transfer to cold water.","Arrange jelly cubes in individual bowls.","Add beans, mochi, fruit and ice cream.","Drizzle generously with kuromitsu."], chef_notes:"Annmitsu is all about the variety of textures — wobbly jelly, chewy mochi, soft beans and creamy ice cream all together. The kuromitsu is not optional.", serving_suggestions:"Serve in glass bowls to show off the beautiful layers and colours.", nutrition_estimate:{calories:"245",protein_g:"4",carbohydrates_g:"52",fat_g:"4"}, tags:["Traditional","Japanese Sweet Shop","Parfait","Summer"], img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
  { dish_name:"Matcha Roll Cake", state:"Japan", cuisine:"Japanese", category:"Desserts", difficulty_level:"Hard", prep_time_minutes:30, cook_time_minutes:12, total_time_minutes:42, servings:8, short_description:"A feather-light matcha sponge rolled around lightly sweetened whipped cream — elegant, beautiful and quintessentially Japanese in its restrained sweetness.", ingredients:[{name:"Eggs",quantity:"4",unit:"large"},{name:"Sugar",quantity:"80",unit:"g"},{name:"Flour",quantity:"50",unit:"g"},{name:"Matcha powder",quantity:"2",unit:"tbsp"},{name:"Butter",quantity:"20",unit:"g"},{name:"Heavy cream",quantity:"300",unit:"ml"},{name:"Sugar for cream",quantity:"2",unit:"tbsp"},{name:"Matcha for cream",quantity:"1",unit:"tbsp"},{name:"Vanilla",quantity:"0.5",unit:"tsp"}], preparation_steps:["Beat eggs and sugar over warm water until thick and tripled in volume.","Fold in sifted matcha and flour very gently.","Add melted butter.","Pour onto lined baking sheet and spread evenly.","Bake 10-12 minutes at 180°C until just set.","Turn onto parchment while still warm.","Peel off paper and roll up with parchment inside. Cool.","Beat cream with sugar, matcha and vanilla to soft peaks.","Unroll sponge, spread cream, re-roll.","Refrigerate 1 hour before slicing."], chef_notes:"Rolling the sponge while warm is the key technique — it sets the memory for the shape and prevents cracking when re-rolled with cream.", serving_suggestions:"Serve in 2cm slices on white plates with a dusting of matcha.", nutrition_estimate:{calories:"245",protein_g:"5",carbohydrates_g:"24",fat_g:"15"}, tags:["Matcha","Roll Cake","Baking","Japanese Dessert"], img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
  { dish_name:"Kakigori (Shaved Ice)", state:"Japan", cuisine:"Japanese", category:"Desserts", difficulty_level:"Easy", prep_time_minutes:10, cook_time_minutes:0, total_time_minutes:10, servings:4, short_description:"Japan's beloved summer dessert — finely shaved ice flavoured with matcha syrup, condensed milk and sweet red beans. Lighter than snow, an essential part of Japanese summer.", ingredients:[{name:"Ice blocks",quantity:"4",unit:"large"},{name:"Matcha syrup",quantity:"8",unit:"tbsp"},{name:"Condensed milk",quantity:"6",unit:"tbsp"},{name:"Sweet red beans",quantity:"100",unit:"g"},{name:"Mochi balls",quantity:"8",unit:"pieces"},{name:"Strawberry syrup",quantity:"4",unit:"tbsp"},{name:"Lemon syrup",quantity:"4",unit:"tbsp"}], preparation_steps:["Shave ice using a kakigori machine or blender until fine like powder.","Mound shaved ice high in a bowl or glass.","Slowly drizzle matcha syrup over ice — pour slowly for even penetration.","Add condensed milk.","Top with red beans and mochi balls.","Add alternative syrups on different sections.","Serve immediately."], chef_notes:"The key to authentic kakigori is the quality of ice and how fine it is shaved. True kakigori ice is so fine it's almost like powder, melting on the tongue instantly.", serving_suggestions:"Serve immediately in a tall glass or bowl. A summer staple at Japanese festivals.", nutrition_estimate:{calories:"165",protein_g:"3",carbohydrates_g:"38",fat_g:"2"}, tags:["Summer","Shaved Ice","Festival","Japanese"], img:"https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80" },
  { dish_name:"Taiyaki (Fish-Shaped Waffles)", state:"Japan", cuisine:"Japanese", category:"Desserts", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:20, total_time_minutes:40, servings:8, short_description:"Fish-shaped street food waffles filled with sweet red bean paste — one of Japan's most iconic and beloved street sweets, eaten at festivals and outdoor markets.", ingredients:[{name:"Flour",quantity:"200",unit:"g"},{name:"Sugar",quantity:"40",unit:"g"},{name:"Baking powder",quantity:"1",unit:"tsp"},{name:"Eggs",quantity:"2",unit:"large"},{name:"Milk",quantity:"200",unit:"ml"},{name:"Vegetable oil",quantity:"2",unit:"tbsp"},{name:"Sweet red bean paste",quantity:"300",unit:"g"},{name:"Vanilla extract",quantity:"1",unit:"tsp"},{name:"Custard cream",quantity:"200",unit:"g"}], preparation_steps:["Mix flour, sugar and baking powder.","Whisk in eggs, milk, oil and vanilla into smooth batter.","Rest batter 15 minutes.","Heat taiyaki mould until very hot. Brush with oil.","Fill one side of mould halfway with batter.","Add a generous spoon of anko or custard in centre.","Cover with more batter.","Close mould and cook 2-3 minutes per side.","Unmould and serve immediately."], chef_notes:"The mould must be very hot to create that crispy waffle exterior. Taiyaki should be eaten immediately — the crispy exterior softens within minutes.", serving_suggestions:"Serve piping hot as a street snack. Fill with anko, custard or chocolate.", nutrition_estimate:{calories:"215",protein_g:"5",carbohydrates_g:"38",fat_g:"5"}, tags:["Street Food","Festival","Waffle","Japanese"], img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
  { dish_name:"Parfait (Japanese Style)", state:"Japan", cuisine:"Japanese", category:"Desserts", difficulty_level:"Medium", prep_time_minutes:30, cook_time_minutes:0, total_time_minutes:30, servings:2, short_description:"Japan's extravagant dessert culture in one glass — layers of matcha ice cream, cornflakes, red beans, jelly, whipped cream and seasonal fruit towering above the glass.", ingredients:[{name:"Matcha ice cream",quantity:"4",unit:"scoops"},{name:"Whipped cream",quantity:"200",unit:"ml"},{name:"Cornflakes",quantity:"50",unit:"g"},{name:"Sweet red beans",quantity:"80",unit:"g"},{name:"Kanten jelly cubes",quantity:"100",unit:"g"},{name:"Fresh strawberries",quantity:"8",unit:"pieces"},{name:"Mochi balls",quantity:"4",unit:"pieces"},{name:"Matcha syrup",quantity:"3",unit:"tbsp"},{name:"Wafer roll",quantity:"2",unit:"pieces"}], preparation_steps:["Chill tall parfait glasses.","Layer cornflakes at base.","Add kanten jelly cubes.","Add a scoop of matcha ice cream.","Add red beans.","Pipe or spoon whipped cream.","Add another scoop of ice cream.","Arrange strawberries and mochi.","Drizzle matcha syrup.","Top with wafer roll.","Serve immediately."], chef_notes:"Japanese parfaits are an art form — the layering must be done with precision for the visual effect when served. Height and visual impact are as important as flavour.", serving_suggestions:"Serve tall in a parfait glass immediately. The cornflakes provide a crucial crunchy base before they soften.", nutrition_estimate:{calories:"345",protein_g:"6",carbohydrates_g:"52",fat_g:"14"}, tags:["Parfait","Indulgent","Cafe Culture","Japanese Dessert"], img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
  { dish_name:"Mitarashi Dango", state:"Japan", cuisine:"Japanese", category:"Desserts", difficulty_level:"Medium", prep_time_minutes:20, cook_time_minutes:15, total_time_minutes:35, servings:6, short_description:"Chewy rice flour dumplings on bamboo skewers glazed with a sweet soy sauce — one of Japan's oldest street sweets, sold at temples and festivals for centuries.", ingredients:[{name:"Joshinko (rice flour)",quantity:"100",unit:"g"},{name:"Shiratamako (glutinous rice flour)",quantity:"100",unit:"g"},{name:"Water",quantity:"180",unit:"ml"},{name:"Soy sauce",quantity:"4",unit:"tbsp"},{name:"Mirin",quantity:"4",unit:"tbsp"},{name:"Sugar",quantity:"4",unit:"tbsp"},{name:"Potato starch",quantity:"1",unit:"tbsp"},{name:"Water for sauce",quantity:"100",unit:"ml"}], preparation_steps:["Mix both flours together.","Gradually add water and knead into smooth dough.","Roll into small balls slightly smaller than a marble.","Boil in water until they float, then 2 more minutes.","Transfer to ice water.","Thread 3-4 onto bamboo skewers.","Make glaze: combine soy, mirin, sugar and dissolved starch.","Heat until thickened and glossy.","Grill or pan-fry skewers until lightly browned.","Brush with warm glaze generously."], chef_notes:"The combination of two rice flours creates the perfect chewy yet tender texture. The dango should be slightly browned before glazing.", serving_suggestions:"Serve warm at room temperature. A classic Japanese festival sweet.", nutrition_estimate:{calories:"185",protein_g:"3",carbohydrates_g:"42",fat_g:"0"}, tags:["Dango","Street Food","Festival","Traditional"], img:"https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80" },
];

const thaiCuisineData = [
  // ── APPETIZERS ──────────────────────────────────────────────────────────────
  {
    dish_name: "Chicken Satay with Peanut Sauce",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 30,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Tender coconut-marinated chicken skewers grilled over charcoal and served with a rich, spiced peanut sauce and tangy cucumber relish — Thailand's most exported street food snack.",
    ingredients: [
      { name: "Chicken breast", quantity: "500", unit: "g" },
      { name: "Coconut milk", quantity: "200", unit: "ml" },
      { name: "Turmeric powder", quantity: "1", unit: "tsp" },
      { name: "Lemongrass", quantity: "2", unit: "stalks" },
      { name: "Peanut butter", quantity: "4", unit: "tbsp" },
      { name: "Red curry paste", quantity: "2", unit: "tbsp" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" },
      { name: "Palm sugar", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Slice chicken into thin strips. Marinate with coconut milk, turmeric, lemongrass and fish sauce for 2 hours.",
      "Thread onto pre-soaked bamboo skewers.",
      "Make peanut sauce: simmer coconut milk with red curry paste, peanut butter, fish sauce and palm sugar.",
      "Grill skewers over high heat for 3-4 minutes each side until caramelized.",
      "Serve with warm peanut sauce and fresh cucumber relish."
    ],
    chef_notes: "The turmeric in the marinade gives satay its characteristic golden-yellow color. Real charcoal grilling is what creates the smoky, slightly charred exterior that defines authentic Thai satay.",
    serving_suggestions: "Serve with ajat (cucumber relish in sweetened vinegar) and peanut sauce.",
    flavor_profile: ["savory", "nutty", "aromatic", "slightly smoky"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    tags: ["Street Food", "Grilled", "Classic", "Party Food"]
  },
  {
    dish_name: "Tod Mun Pla (Thai Fish Cakes)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Bouncy, spiced Thai fish cakes made with red curry paste and kaffir lime leaves — a popular street food with a unique springy texture achieved by beating the fish paste until elastic.",
    ingredients: [
      { name: "White fish fillets", quantity: "400", unit: "g" },
      { name: "Red curry paste", quantity: "2", unit: "tbsp" },
      { name: "Kaffir lime leaves, finely sliced", quantity: "4", unit: "pieces" },
      { name: "Long beans, sliced", quantity: "50", unit: "g" },
      { name: "Fish sauce", quantity: "1", unit: "tbsp" },
      { name: "Egg", quantity: "1", unit: "piece" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Oil for frying", quantity: "1", unit: "cup" }
    ],
    preparation_steps: [
      "Process fish fillets in a food processor until a smooth paste.",
      "Add curry paste, fish sauce, egg and sugar. Process until the mixture becomes sticky and elastic.",
      "Stir in kaffir lime leaves and long beans by hand.",
      "Shape into round flat cakes about 1cm thick.",
      "Shallow fry at 175°C for 3 minutes each side until deeply golden. Serve with sweet chili sauce."
    ],
    chef_notes: "The 'beating' of the paste in the processor activates the fish protein and creates the characteristic springy, bouncy texture. Under-mixed paste produces dense, heavy cakes.",
    serving_suggestions: "Serve with sweet chili sauce and a classic cucumber relish.",
    flavor_profile: ["spicy", "aromatic", "springy", "savory"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
    tags: ["Street Food", "Seafood", "Thai Classic", "Appetizer"]
  },
  {
    dish_name: "Miang Kham (Betel Leaf Wraps)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 6,
    short_description: "Thailand's most elegant one-bite appetizer — wild betel or spinach leaves used as edible cups for a collection of fresh ingredients: dried shrimp, roasted coconut, ginger, lime, peanuts and a sweet palm sugar sauce.",
    ingredients: [
      { name: "Fresh betel or spinach leaves", quantity: "24", unit: "pieces" },
      { name: "Dried shrimp", quantity: "3", unit: "tbsp" },
      { name: "Toasted coconut", quantity: "4", unit: "tbsp" },
      { name: "Fresh ginger, diced", quantity: "3", unit: "tbsp" },
      { name: "Lime, diced with skin", quantity: "1", unit: "piece" },
      { name: "Roasted peanuts", quantity: "3", unit: "tbsp" },
      { name: "Palm sugar", quantity: "3", unit: "tbsp" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Make the sweet sauce: cook palm sugar, fish sauce and dried shrimp in a pan until thick.",
      "Prepare all fresh ingredients into small, uniform pieces.",
      "Arrange betel leaves in a cup shape on a serving platter.",
      "Fill each leaf with a selection of all ingredients.",
      "Add a small spoonful of the sweet sauce and fold leaf around the filling to eat in one bite."
    ],
    chef_notes: "Miang Kham is designed to be eaten in one or two bites — the explosion of six different flavors (bitter, sour, salty, sweet, spicy, savory) simultaneously is the whole point of the dish.",
    serving_suggestions: "Serve as an elaborate cocktail snack or elegant party appetizer.",
    flavor_profile: ["complex", "fresh", "sweet-sour-spicy", "aromatic"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    tags: ["Elegant", "Traditional", "Party Food", "One-Bite"]
  },

  // ── SOUPS ────────────────────────────────────────────────────────────────────
  {
    dish_name: "Tom Yum Goong (Spicy Prawn Soup)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Thailand's most iconic soup — a fiery, sour broth fragrant with lemongrass, galangal, kaffir lime leaves and fresh chilies, loaded with plump prawns. A UNESCO-recognized culinary treasure.",
    ingredients: [
      { name: "Tiger prawns", quantity: "400", unit: "g" },
      { name: "Lemongrass", quantity: "3", unit: "stalks" },
      { name: "Galangal", quantity: "5", unit: "slices" },
      { name: "Kaffir lime leaves", quantity: "6", unit: "pieces" },
      { name: "Bird's eye chilies", quantity: "5", unit: "pieces" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Lime juice", quantity: "4", unit: "tbsp" },
      { name: "Straw mushrooms", quantity: "150", unit: "g" }
    ],
    preparation_steps: [
      "Bruise lemongrass, galangal and kaffir lime leaves. Simmer in water 10 minutes to infuse.",
      "Add mushrooms and whole chilies to the broth.",
      "Add prawns and cook 3 minutes until just cooked through.",
      "Remove from heat. Season with fish sauce and lime juice — add these OFF the heat.",
      "Garnish with coriander and serve immediately."
    ],
    chef_notes: "The four aromatics (lemongrass, galangal, kaffir lime leaves, chilies) are bruised rather than chopped — they flavor the broth but are NOT eaten. Add fish sauce and lime juice after removing from heat to preserve their fresh brightness.",
    serving_suggestions: "Serve in individual bowls with steamed jasmine rice alongside.",
    flavor_profile: ["sour", "spicy", "aromatic", "citrusy"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&q=80",
    tags: ["Iconic", "Spicy", "Street Food", "UNESCO Heritage"]
  },
  {
    dish_name: "Tom Kha Gai (Coconut Chicken Soup)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "The gentler, creamier sibling of Tom Yum — a fragrant coconut milk broth with chicken, galangal and mushrooms, brightened with lime and fish sauce. Rich, mellow and deeply comforting.",
    ingredients: [
      { name: "Chicken thighs, sliced", quantity: "400", unit: "g" },
      { name: "Coconut milk", quantity: "400", unit: "ml" },
      { name: "Chicken broth", quantity: "400", unit: "ml" },
      { name: "Galangal", quantity: "5", unit: "slices" },
      { name: "Lemongrass", quantity: "2", unit: "stalks" },
      { name: "Kaffir lime leaves", quantity: "5", unit: "pieces" },
      { name: "Oyster mushrooms", quantity: "150", unit: "g" },
      { name: "Fish sauce and lime juice", quantity: "3", unit: "tbsp each" }
    ],
    preparation_steps: [
      "Bring coconut milk and broth to a gentle simmer. Add bruised aromatics.",
      "Infuse 10 minutes on low heat.",
      "Add chicken and mushrooms. Simmer gently 8-10 minutes.",
      "Remove from heat. Season with fish sauce, lime juice and a pinch of sugar.",
      "Serve garnished with coriander and fresh red chili slices."
    ],
    chef_notes: "Never boil coconut milk vigorously — gentle simmering keeps it smooth and creamy. Boiling causes it to break and become grainy.",
    serving_suggestions: "Serve as a soup course or over steamed rice as a light main meal.",
    flavor_profile: ["creamy", "aromatic", "mildly spicy", "tangy"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
    tags: ["Comfort Food", "Coconut", "Mild", "Classic"]
  },

  // ── SALADS ───────────────────────────────────────────────────────────────────
  {
    dish_name: "Som Tum (Green Papaya Salad)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "The national salad of Thailand — shredded unripe green papaya pounded with garlic, chilies, fish sauce, lime and palm sugar in a traditional wooden mortar. Bold, crunchy, fiery and refreshing.",
    ingredients: [
      { name: "Green papaya", quantity: "400", unit: "g" },
      { name: "Bird's eye chilies", quantity: "3", unit: "pieces" },
      { name: "Garlic", quantity: "3", unit: "cloves" },
      { name: "Cherry tomatoes", quantity: "6", unit: "pieces" },
      { name: "Long beans", quantity: "60", unit: "g" },
      { name: "Dried shrimp", quantity: "2", unit: "tbsp" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" },
      { name: "Lime juice", quantity: "3", unit: "tbsp" },
      { name: "Palm sugar", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Peel and julienne green papaya using a shredder or cleaver technique.",
      "Pound garlic and chilies in a large mortar until broken.",
      "Add long beans and tomatoes, bruise gently (don't pulverize).",
      "Add papaya, dried shrimp, fish sauce, lime and palm sugar. Pound and toss repeatedly.",
      "Taste for the balance of spicy, sour, sweet and salty. Serve with sticky rice."
    ],
    chef_notes: "Som Tum should be pounded, not stirred — the bruising action releases the aromatic compounds. The flavor balance of spicy-sour-sweet-salty-savory is key: adjust until all four are present simultaneously.",
    serving_suggestions: "Serve with sticky rice and grilled chicken (khao niao and gai yang).",
    flavor_profile: ["spicy", "sour", "sweet", "crunchy", "fresh"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80",
    tags: ["Isaan", "National Dish", "Street Food", "Healthy"]
  },
  {
    dish_name: "Larb Gai (Spicy Chicken Salad)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Thailand's sacred national 'salad' — minced chicken tossed with toasted rice powder, fish sauce, lime, dried chilies and fresh herbs. Served at room temperature, it is the definitive dish of Northeastern Thailand.",
    ingredients: [
      { name: "Ground chicken", quantity: "400", unit: "g" },
      { name: "Uncooked rice", quantity: "3", unit: "tbsp" },
      { name: "Dried red chilies", quantity: "3", unit: "pieces" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Lime juice", quantity: "4", unit: "tbsp" },
      { name: "Shallots, sliced", quantity: "4", unit: "pieces" },
      { name: "Fresh mint and coriander", quantity: "1", unit: "large bunch" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Dry-toast uncooked rice in a pan until golden. Grind coarsely — this is khao khua (toasted rice powder).",
      "Toast dried chilies briefly and grind.",
      "Cook ground chicken with a little water — do not add oil. Cook until just done.",
      "Remove from heat. Add fish sauce, lime juice, shallots, toasted rice powder and dried chili.",
      "Fold in fresh herbs. Serve at room temperature with fresh vegetables."
    ],
    chef_notes: "Toasted rice powder (khao khua) is the defining ingredient of larb — it adds a nutty crunch that is impossible to replicate with anything else. Make it fresh for each batch.",
    serving_suggestions: "Serve with sticky rice, raw cabbage, mint and long beans.",
    flavor_profile: ["sour", "herby", "savory", "toasty", "fresh"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80",
    tags: ["Isaan", "National Salad", "Healthy", "Low Fat"]
  },

  // ── MAIN COURSES ─────────────────────────────────────────────────────────────
  {
    dish_name: "Pad Thai",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Thailand's national noodle dish — flat rice noodles stir-fried over high heat with eggs, tofu or shrimp, in a sweet-savory tamarind-based sauce, topped with bean sprouts, peanuts and a squeeze of lime.",
    ingredients: [
      { name: "Flat rice noodles (sen lek)", quantity: "400", unit: "g" },
      { name: "Tiger shrimp", quantity: "200", unit: "g" },
      { name: "Firm tofu", quantity: "150", unit: "g" },
      { name: "Eggs", quantity: "3", unit: "pieces" },
      { name: "Tamarind paste", quantity: "3", unit: "tbsp" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Palm sugar", quantity: "2", unit: "tbsp" },
      { name: "Bean sprouts and roasted peanuts", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Soak rice noodles in room-temp water 30 minutes until pliable but not soft.",
      "Mix tamarind, fish sauce and palm sugar for the Pad Thai sauce.",
      "Wok-fry tofu until golden. Push to side, fry shrimp briefly. Push aside.",
      "Add noodles and sauce. Toss on high heat until noodles absorb liquid.",
      "Push to side, scramble eggs, mix with noodles. Serve topped with bean sprouts, peanuts, lime and dried chili."
    ],
    chef_notes: "Wok hei (breath of the wok) requires extremely high heat — this is why restaurant Pad Thai tastes different. Cook in small portions at the highest heat to achieve the characteristic char and smokiness.",
    serving_suggestions: "Serve with a small dish of fish sauce, sugar, dried chili and vinegar for self-seasoning.",
    flavor_profile: ["sweet", "sour", "savory", "nutty", "smoky"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&q=80",
    tags: ["National Dish", "Street Food", "Noodles", "Iconic"]
  },
  {
    dish_name: "Thai Green Curry (Gaeng Keow Wan)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 25,
    servings: 4,
    short_description: "The jewel of Thai cuisine — chicken or vegetables in a vibrant, aromatic green curry sauce made from fresh green chilies, lemongrass, galangal and coconut milk. The greenest, most fragrant of all Thai curries.",
    ingredients: [
      { name: "Chicken thighs", quantity: "500", unit: "g" },
      { name: "Coconut milk", quantity: "400", unit: "ml" },
      { name: "Green curry paste", quantity: "3", unit: "tbsp" },
      { name: "Thai eggplants", quantity: "200", unit: "g" },
      { name: "Kaffir lime leaves", quantity: "6", unit: "pieces" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Palm sugar", quantity: "1", unit: "tbsp" },
      { name: "Thai basil leaves", quantity: "1", unit: "large handful" }
    ],
    preparation_steps: [
      "Fry green curry paste in thick coconut cream skimmed from the top of the can, until oil separates.",
      "Add chicken and cook until no longer pink on outside.",
      "Add remaining coconut milk and eggplants. Simmer 15 minutes.",
      "Season with fish sauce and palm sugar. Tear in kaffir lime leaves.",
      "Remove from heat and fold in fresh Thai basil. Serve with jasmine rice."
    ],
    chef_notes: "Frying the curry paste in thick coconut cream (not oil) is the authentic technique — it 'blooms' the paste and creates a richer, more deeply flavored curry. Thai basil goes in at the very end, off the heat.",
    serving_suggestions: "Serve with steamed jasmine rice and a refreshing cucumber salad.",
    flavor_profile: ["aromatic", "creamy", "spicy", "fresh", "herby"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&q=80",
    tags: ["Iconic", "Curry", "Coconut", "Aromatic"]
  },
  {
    dish_name: "Khao Pad (Thai Fried Rice)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Main Courses",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Thailand's everyday fried rice — a rapid wok-tossed dish of day-old jasmine rice with egg, vegetables and your choice of protein in an umami-rich oyster and fish sauce seasoning.",
    ingredients: [
      { name: "Day-old jasmine rice", quantity: "4", unit: "cups" },
      { name: "Eggs", quantity: "3", unit: "pieces" },
      { name: "Prawns or chicken", quantity: "300", unit: "g" },
      { name: "Garlic", quantity: "4", unit: "cloves" },
      { name: "Oyster sauce", quantity: "2", unit: "tbsp" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" },
      { name: "Spring onions and tomatoes", quantity: "1", unit: "portion" },
      { name: "White sugar", quantity: "1", unit: "tsp" }
    ],
    preparation_steps: [
      "Get wok screaming hot. Fry minced garlic in oil until golden.",
      "Add protein and cook quickly on high heat.",
      "Push to sides, crack eggs into center and scramble partially.",
      "Add rice and break up clumps while stir-frying vigorously.",
      "Season with oyster sauce, fish sauce and sugar. Serve with lime wedge and cucumber."
    ],
    chef_notes: "Day-old refrigerated rice is essential — fresh rice has too much moisture and creates a mushy result. Each grain should be separate after frying. Maximum heat is critical throughout.",
    serving_suggestions: "Serve with fresh cucumber slices, spring onions, lime wedge and fish sauce chili.",
    flavor_profile: ["savory", "umami", "smoky", "simple"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80",
    tags: ["Everyday", "Street Food", "Quick", "Wok"]
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    dish_name: "Mango Sticky Rice (Khao Niao Mamuang)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Desserts",
    difficulty_level: "easy",
    prep_time_minutes: 30,
    cook_time_minutes: 30,
    servings: 4,
    short_description: "Thailand's most celebrated dessert — sweet, fragrant coconut sticky rice paired with perfectly ripe Nam Dok Mai mangoes and drizzled with sweet coconut cream. Simple perfection in every bite.",
    ingredients: [
      { name: "Glutinous rice", quantity: "400", unit: "g" },
      { name: "Ripe mangoes", quantity: "4", unit: "pieces" },
      { name: "Coconut milk", quantity: "400", unit: "ml" },
      { name: "Sugar", quantity: "5", unit: "tbsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Toasted sesame seeds or mung beans", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Soak glutinous rice 6-8 hours or overnight. Steam for 25-30 minutes until translucent.",
      "Warm coconut milk with sugar and salt until dissolved. Do not boil.",
      "Remove rice from steamer and immediately mix with 3/4 of the coconut sauce.",
      "Let rice absorb sauce for 15 minutes — it will become creamy and sticky.",
      "Serve alongside sliced ripe mango, drizzled with remaining coconut sauce and sprinkled with sesame seeds."
    ],
    chef_notes: "The rice absorbs the coconut sauce best when it's still hot from the steamer — this is when the starches are most receptive. Wait for the rice to cool to room temperature before serving.",
    serving_suggestions: "Serve at room temperature alongside chilled, sliced ripe mango.",
    flavor_profile: ["sweet", "creamy", "tropical", "fragrant"],
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
    tags: ["Iconic", "Summer Dessert", "Traditional", "Simple"]
  },
  {
    dish_name: "Khanom Krok (Coconut Pancakes)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 15,
    cook_time_minutes: 15,
    servings: 6,
    short_description: "Tiny, soft Thai street dessert pancakes made in a special cast iron pan — a crispy coconut rice flour base with a creamy, slightly savory coconut custard center. The contrast of textures is enchanting.",
    ingredients: [
      { name: "Rice flour", quantity: "150", unit: "g" },
      { name: "Coconut milk", quantity: "300", unit: "ml" },
      { name: "Coconut cream", quantity: "150", unit: "ml" },
      { name: "Sugar", quantity: "3", unit: "tbsp" },
      { name: "Salt", quantity: "0.5", unit: "tsp" },
      { name: "Spring onion greens", quantity: "2", unit: "stalks" },
      { name: "Corn kernels", quantity: "3", unit: "tbsp" }
    ],
    preparation_steps: [
      "Make base batter: rice flour with half the coconut milk and sugar.",
      "Make top batter: coconut cream with a pinch of salt.",
      "Heat khanom krok pan (hemispherical moulds) and grease well.",
      "Fill 3/4 full with base batter. Cook until edges set.",
      "Add a spoonful of coconut cream topping with corn or spring onion. Cover and cook until custard just sets."
    ],
    chef_notes: "The half-savory, half-sweet character of khanom krok is intentional — Thai desserts often play with this contrast. The salt in the coconut cream topping amplifies the sweetness.",
    serving_suggestions: "Serve fresh from the pan, two per serving, as an afternoon snack.",
    flavor_profile: ["sweet", "creamy", "coconutty", "slightly salty"],
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
    tags: ["Street Dessert", "Traditional", "Coconut", "Sweet"]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
const koreanCuisineData = [
  // ── APPETIZERS ──────────────────────────────────────────────────────────────
  {
    dish_name: "Pajeon (Korean Scallion Pancakes)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Crispy-edged, chewy-centered Korean savory pancakes stuffed with bundles of spring onions — traditionally eaten on rainy days with makgeolli rice wine. A beloved Korean comfort food snack.",
    ingredients: [
      { name: "Spring onions", quantity: "8", unit: "bunches" },
      { name: "All-purpose flour", quantity: "150", unit: "g" },
      { name: "Cornstarch", quantity: "50", unit: "g" },
      { name: "Ice cold water", quantity: "200", unit: "ml" },
      { name: "Egg", quantity: "1", unit: "piece" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Rice vinegar", quantity: "1", unit: "tbsp" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Cut spring onions into 15cm lengths.",
      "Make a thin batter with flour, cornstarch, ice cold water and egg — lumps are fine.",
      "Dip spring onion bundles in batter. Lay flat in a thin layer in an oiled pan.",
      "Fry on medium-high heat until golden and crispy on one side. Flip carefully.",
      "Serve with soy-vinegar dipping sauce mixed with sesame oil and sesame seeds."
    ],
    chef_notes: "Ice cold water and NOT over-mixing the batter creates the characteristic light, crispy texture. Over-mixing develops gluten and makes the pancake doughy rather than crunchy.",
    serving_suggestions: "Serve with makgeolli (Korean rice wine) or cold beer on a rainy day.",
    flavor_profile: ["savory", "oniony", "crispy", "chewy"],
    dietary_tags: ["vegetarian", "dairy-free"],
    img: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80",
    tags: ["Comfort Food", "Rainy Day", "Vegetarian", "Street Food"]
  },
  {
    dish_name: "Japchae (Glass Noodle Stir-Fry)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Silky sweet potato glass noodles stir-fried with colorful vegetables, spinach and beef in a sweet sesame-soy sauce — Korea's most popular party dish and a staple at every celebration.",
    ingredients: [
      { name: "Sweet potato glass noodles (dangmyeon)", quantity: "200", unit: "g" },
      { name: "Beef sirloin, julienned", quantity: "200", unit: "g" },
      { name: "Spinach", quantity: "150", unit: "g" },
      { name: "Carrots", quantity: "1", unit: "medium" },
      { name: "Shiitake mushrooms", quantity: "4", unit: "pieces" },
      { name: "Sesame oil", quantity: "3", unit: "tbsp" },
      { name: "Soy sauce", quantity: "3", unit: "tbsp" },
      { name: "Sugar", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Cook noodles in boiling water 6 minutes. Rinse and cut into shorter lengths. Season with soy sauce, sesame oil and sugar.",
      "Cook each vegetable separately in a wok with sesame oil — they all have different cooking times.",
      "Marinate beef in soy sauce, sugar, garlic and sesame oil. Stir-fry quickly.",
      "Combine noodles with all cooked vegetables and beef. Toss with additional sesame oil and soy sauce.",
      "Serve at room temperature garnished with egg omelette strips and sesame seeds."
    ],
    chef_notes: "Cooking each ingredient separately before combining is the Korean technique that prevents everything from turning into one grey mass. The noodles should be well-seasoned on their own before mixing.",
    serving_suggestions: "Serve at room temperature as a party banchan or main course.",
    flavor_profile: ["sweet-savory", "silky", "sesame", "colorful"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
    tags: ["Party Food", "Celebration", "Glass Noodles", "Classic"]
  },
  {
    dish_name: "Tteokbokki (Spicy Rice Cakes)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Korea's most beloved street food — chewy cylindrical rice cakes in a fiery, slightly sweet gochujang sauce. Served sizzling from street stalls across Seoul, they are addictive, satisfying and impossible to stop eating.",
    ingredients: [
      { name: "Garaetteok (cylinder rice cakes)", quantity: "400", unit: "g" },
      { name: "Gochujang", quantity: "4", unit: "tbsp" },
      { name: "Gochugaru (Korean chili flakes)", quantity: "1", unit: "tbsp" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" },
      { name: "Sugar", quantity: "2", unit: "tbsp" },
      { name: "Fish cakes", quantity: "200", unit: "g" },
      { name: "Dashi or anchovy broth", quantity: "400", unit: "ml" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Separate rice cakes by soaking in cold water 10 minutes if fresh, or as per pack if frozen.",
      "Bring anchovy broth to a boil. Add gochujang, gochugaru, soy sauce and sugar.",
      "Add rice cakes and fish cakes. Cook on medium heat 10-12 minutes, stirring often.",
      "Sauce will thicken as rice cakes cook and release starch.",
      "Serve in bowls garnished with spring onions and a hard-boiled egg."
    ],
    chef_notes: "The sauce needs constant stirring — rice cakes stick together and to the pan easily. The starch released from the rice cakes naturally thickens the sauce to the right glossy consistency.",
    serving_suggestions: "Serve piping hot as street food with fish cakes and boiled eggs.",
    flavor_profile: ["spicy", "chewy", "sweet-savory", "addictive"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80",
    tags: ["Street Food", "Iconic", "Spicy", "Comfort Food"]
  },

  // ── SOUPS ────────────────────────────────────────────────────────────────────
  {
    dish_name: "Kimchi Jjigae (Kimchi Stew)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 30,
    servings: 4,
    short_description: "Korea's most comforting stew — well-fermented kimchi cooked with pork and tofu in a rich, spicy-sour broth. The cornerstone of Korean home cooking, made from leftovers and eaten with every meal.",
    ingredients: [
      { name: "Aged kimchi", quantity: "400", unit: "g" },
      { name: "Pork belly, sliced", quantity: "200", unit: "g" },
      { name: "Firm tofu", quantity: "300", unit: "g" },
      { name: "Gochujang", quantity: "2", unit: "tbsp" },
      { name: "Gochugaru", quantity: "1", unit: "tbsp" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" },
      { name: "Sesame oil", quantity: "1", unit: "tbsp" },
      { name: "Water or dashi", quantity: "500", unit: "ml" }
    ],
    preparation_steps: [
      "Fry pork belly in a heavy pot until fat renders. Add kimchi and cook 5 minutes.",
      "Add gochujang, gochugaru and soy sauce. Fry 2 minutes more.",
      "Add water to cover. Bring to a boil and simmer 20 minutes.",
      "Add tofu cut into cubes. Simmer 5 minutes more.",
      "Finish with sesame oil and spring onions. Serve directly from pot at the table."
    ],
    chef_notes: "The more fermented the kimchi, the better the jjigae. Use kimchi that's been in the fridge for at least 3-4 weeks — the fermented sourness is what makes the broth extraordinary.",
    serving_suggestions: "Serve bubbling at the table with steamed rice and small banchan dishes.",
    flavor_profile: ["spicy", "sour", "savory", "rich", "fermented"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
    tags: ["Comfort Food", "Fermented", "Everyday", "Traditional"]
  },
  {
    dish_name: "Doenjang Jjigae (Soybean Paste Stew)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Korea's most beloved everyday stew — a deeply savory, pungent broth made from fermented soybean paste with zucchini, potato, mushrooms and silken tofu. More complex than miso soup and deeply nourishing.",
    ingredients: [
      { name: "Doenjang (fermented soybean paste)", quantity: "3", unit: "tbsp" },
      { name: "Anchovy and kelp broth", quantity: "600", unit: "ml" },
      { name: "Zucchini", quantity: "1", unit: "medium" },
      { name: "Potato", quantity: "1", unit: "medium" },
      { name: "Firm tofu", quantity: "200", unit: "g" },
      { name: "Shiitake mushrooms", quantity: "4", unit: "pieces" },
      { name: "Garlic", quantity: "3", unit: "cloves" },
      { name: "Green chili", quantity: "1", unit: "piece" }
    ],
    preparation_steps: [
      "Make anchovy-kelp broth by simmering dried anchovies and kelp 15 minutes. Strain.",
      "Dissolve doenjang in the broth. Add crushed garlic.",
      "Add potato cubes first (they take longest). After 5 minutes add zucchini and mushrooms.",
      "Add tofu and green chili. Simmer 5 more minutes.",
      "Taste and adjust with more doenjang if needed. Serve immediately with rice."
    ],
    chef_notes: "The anchovy-kelp broth base is fundamental — this is what separates Korean doenjang jjigae from Japanese miso soup. The funkiness of the fermented doenjang should be prominent, not subtle.",
    serving_suggestions: "A non-negotiable part of every Korean meal alongside steamed rice.",
    flavor_profile: ["pungent", "savory", "fermented", "earthy", "warming"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    tags: ["Everyday", "Traditional", "Fermented", "Healthy"]
  },

  // ── SALADS ───────────────────────────────────────────────────────────────────
  {
    dish_name: "Kongnamul Muchim (Seasoned Soybean Sprouts)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 5,
    cook_time_minutes: 5,
    servings: 4,
    short_description: "A crisp, refreshing Korean banchan (side dish) of blanched soybean sprouts dressed with sesame oil, garlic and gochugaru — simple, nutritious and present at virtually every Korean meal.",
    ingredients: [
      { name: "Soybean sprouts", quantity: "400", unit: "g" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Garlic, minced", quantity: "3", unit: "cloves" },
      { name: "Gochugaru (Korean chili flakes)", quantity: "1", unit: "tsp" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" },
      { name: "Salt", quantity: "0.5", unit: "tsp" },
      { name: "Sesame seeds", quantity: "1", unit: "tbsp" },
      { name: "Spring onions", quantity: "2", unit: "stalks" }
    ],
    preparation_steps: [
      "Blanch soybean sprouts in boiling salted water 2-3 minutes. Drain and rinse in cold water.",
      "Squeeze out excess water.",
      "Mix with sesame oil, soy sauce, garlic, gochugaru and salt.",
      "Toss well and let rest 5 minutes for flavors to meld.",
      "Garnish with sesame seeds and spring onions."
    ],
    chef_notes: "Never lift the lid during blanching — steam is what cooks the sprouts evenly. Over-cooking makes them mushy; under-cooking leaves a raw, beany flavor.",
    serving_suggestions: "Serve as banchan alongside rice, kimchi and other side dishes.",
    flavor_profile: ["fresh", "nutty", "slightly spicy", "sesame"],
    dietary_tags: ["vegetarian", "vegan", "dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    tags: ["Banchan", "Side Dish", "Healthy", "Quick"]
  },
  {
    dish_name: "Sigeumchi Namul (Korean Spinach Salad)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 2,
    servings: 4,
    short_description: "Delicately seasoned blanched spinach with a sesame-garlic dressing — one of the most essential Korean banchan dishes. Simple in ingredients yet extraordinary in flavor, it's a cornerstone of bibimbap and every Korean table.",
    ingredients: [
      { name: "Fresh spinach", quantity: "400", unit: "g" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Garlic, minced", quantity: "2", unit: "cloves" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" },
      { name: "Sesame seeds", quantity: "1", unit: "tbsp" },
      { name: "Spring onions", quantity: "1", unit: "stalk" }
    ],
    preparation_steps: [
      "Blanch spinach in boiling water for 30-45 seconds only.",
      "Plunge immediately into ice water to stop cooking and preserve color.",
      "Squeeze all water firmly — the spinach should be as dry as possible.",
      "Season with sesame oil, soy sauce, garlic and sesame seeds.",
      "Toss and serve at room temperature as a banchan."
    ],
    chef_notes: "The brief blanching and ice bath is the key technique — it maintains the vivid green color and silky texture. Squeezing dry is essential so the dressing coats rather than sits in water.",
    serving_suggestions: "Serve as part of a bibimbap or alongside rice as a classic banchan.",
    flavor_profile: ["silky", "savory", "sesame", "garlic"],
    dietary_tags: ["vegetarian", "vegan", "dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
    tags: ["Banchan", "Healthy", "Bibimbap", "Traditional"]
  },

  // ── MAIN COURSES ─────────────────────────────────────────────────────────────
  {
    dish_name: "Bibimbap",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 40,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Korea's most famous dish — 'mixed rice' of warm steamed rice topped with an artful arrangement of seasoned vegetables, gochujang-marinated beef, a fried egg and sesame oil, served in a scorching stone bowl.",
    ingredients: [
      { name: "Steamed white rice", quantity: "4", unit: "cups" },
      { name: "Beef sirloin, minced", quantity: "200", unit: "g" },
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Assorted vegetables (spinach, carrot, zucchini, mushrooms)", quantity: "400", unit: "g" },
      { name: "Gochujang", quantity: "4", unit: "tbsp" },
      { name: "Sesame oil", quantity: "3", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sesame seeds", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Marinate beef in soy sauce, sesame oil, garlic and gochujang. Cook in a hot pan.",
      "Season each vegetable separately with sesame oil and salt.",
      "Heat stone bowls (dolsot) until very hot. Coat with sesame oil and add rice.",
      "Arrange vegetables and beef in sections over rice like spokes of a wheel.",
      "Top with a fried egg. Serve with gochujang sauce. Mix everything together before eating."
    ],
    chef_notes: "The dolsot (stone bowl) should be screaming hot before adding rice — this creates the crunchy scorched rice crust (nurungji) at the bottom that is the most coveted part of dolsot bibimbap.",
    serving_suggestions: "Serve in heated stone bowls (dolsot) — the heat creates the legendary crusty rice bottom.",
    flavor_profile: ["complex", "nutty", "spicy", "savory", "varied textures"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
    tags: ["National Dish", "Iconic", "Stone Bowl", "Balanced"]
  },
  {
    dish_name: "Korean BBQ Beef Short Ribs (Galbi)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 480,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Cross-cut beef short ribs marinated in a sweet pear-soy marinade and grilled at the table — the most indulgent and beloved expression of Korean BBQ. The pear enzymes tenderize the beef to extraordinary tenderness.",
    ingredients: [
      { name: "Beef short ribs, cross-cut (flanken style)", quantity: "1", unit: "kg" },
      { name: "Asian pear", quantity: "1", unit: "medium" },
      { name: "Soy sauce", quantity: "100", unit: "ml" },
      { name: "Sugar", quantity: "3", unit: "tbsp" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Garlic", quantity: "6", unit: "cloves" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Soak ribs in cold water 1-2 hours to remove blood, changing water once.",
      "Blend pear with garlic, ginger, soy sauce, sugar and sesame oil.",
      "Marinate ribs in pear mixture for 6-8 hours minimum, overnight is ideal.",
      "Grill over high charcoal heat 3-4 minutes each side until caramelized and charred.",
      "Serve with lettuce cups, fermented kimchi, sliced garlic and ssamjang paste."
    ],
    chef_notes: "The grated pear (or kiwi) in the marinade is essential — it contains enzymes that break down tough meat fibers, making the short ribs extraordinarily tender. Never skip this ingredient.",
    serving_suggestions: "Serve grilled at the table, wrapped in perilla or lettuce leaves with kimchi and ssamjang.",
    flavor_profile: ["sweet", "savory", "caramelized", "smoky", "tender"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    tags: ["BBQ", "Special Occasion", "Marinated", "Iconic"]
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    dish_name: "Bingsu (Korean Shaved Ice)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Desserts",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "Korea's most beloved summer dessert — finely shaved milk ice with sweet red bean paste, mochi, fresh fruit and condensed milk. The ice is shaved so finely it melts instantly on the tongue like snow.",
    ingredients: [
      { name: "Whole milk, frozen in block", quantity: "500", unit: "ml" },
      { name: "Sweet red bean paste (pat)", quantity: "4", unit: "tbsp" },
      { name: "Mochi pieces", quantity: "100", unit: "g" },
      { name: "Fresh strawberries or mango", quantity: "200", unit: "g" },
      { name: "Condensed milk", quantity: "4", unit: "tbsp" },
      { name: "Fruit sauce or syrup", quantity: "3", unit: "tbsp" }
    ],
    preparation_steps: [
      "Freeze full-fat milk in shallow containers overnight until completely solid.",
      "Shave frozen milk using a bingsu machine or food processor with shaving blade.",
      "Pile shaved ice high in a bowl like a mountain.",
      "Top with sweet red bean paste, chewy mochi pieces and fresh fruit.",
      "Drizzle with condensed milk and fruit syrup."
    ],
    chef_notes: "True Korean bingsu uses milk ice, not water ice — this creates the characteristic silky, snow-like texture that melts on the tongue. Water ice creates a gritty, icy result.",
    serving_suggestions: "Serve immediately in a large shared bowl — bingsu waits for no one.",
    flavor_profile: ["sweet", "creamy", "cold", "fresh"],
    dietary_tags: ["vegetarian", "gluten-free"],
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
    tags: ["Summer Dessert", "Iconic", "Street Food", "Sharing"]
  },
  {
    dish_name: "Hotteok (Sweet Pancakes)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 90,
    cook_time_minutes: 15,
    servings: 6,
    short_description: "Korea's iconic winter street food — fluffy yeast pancakes filled with a cinnamon brown sugar and walnut filling that becomes a molten caramel when fried. Seoul's beloved winter warmer, served piping hot.",
    ingredients: [
      { name: "All-purpose flour", quantity: "300", unit: "g" },
      { name: "Instant yeast", quantity: "5", unit: "g" },
      { name: "Brown sugar", quantity: "100", unit: "g" },
      { name: "Cinnamon", quantity: "2", unit: "tsp" },
      { name: "Walnuts, chopped", quantity: "60", unit: "g" },
      { name: "Sugar", quantity: "2", unit: "tbsp" },
      { name: "Warm water", quantity: "200", unit: "ml" },
      { name: "Oil for frying", quantity: "4", unit: "tbsp" }
    ],
    preparation_steps: [
      "Make dough with flour, yeast, sugar and warm water. Knead and rest 1 hour.",
      "Mix brown sugar, cinnamon and chopped walnuts for filling.",
      "Flatten a ball of dough, place filling in center, gather edges and seal into a ball.",
      "Place in hot oiled pan, press flat with a spatula.",
      "Fry 2-3 minutes each side until golden. The filling will become liquid caramel inside."
    ],
    chef_notes: "The molten caramel filling is dangerously hot — warn guests before eating! The filling liquefies completely during frying. Eat carefully or wait 1-2 minutes after serving.",
    serving_suggestions: "Serve hot from the pan as a winter street food treat.",
    flavor_profile: ["sweet", "cinnamon", "caramel", "chewy"],
    dietary_tags: ["vegetarian", "dairy-free"],
    img: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80",
    tags: ["Winter Street Food", "Sweet", "Seoul", "Comfort"]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
const vietnameseCuisineData = [
  // ── APPETIZERS ──────────────────────────────────────────────────────────────
  {
    dish_name: "Goi Cuon (Fresh Spring Rolls)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 30,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Vietnamese fresh spring rolls of translucent rice paper filled with shrimp, pork, rice vermicelli and fresh herbs — eaten uncooked and dipped in hoisin-peanut sauce. Light, fresh and beautiful.",
    ingredients: [
      { name: "Rice paper rounds", quantity: "12", unit: "pieces" },
      { name: "Cooked shrimp", quantity: "200", unit: "g" },
      { name: "Pork belly, cooked and sliced", quantity: "150", unit: "g" },
      { name: "Rice vermicelli", quantity: "100", unit: "g" },
      { name: "Lettuce leaves", quantity: "4", unit: "pieces" },
      { name: "Fresh mint, Thai basil, coriander", quantity: "1", unit: "large bunch" },
      { name: "Hoisin sauce", quantity: "4", unit: "tbsp" },
      { name: "Crushed peanuts", quantity: "3", unit: "tbsp" }
    ],
    preparation_steps: [
      "Cook vermicelli per packet, rinse in cold water and drain.",
      "Prepare all fillings in separate bowls for assembly line.",
      "Dip one rice paper in warm water for 10-15 seconds until pliable.",
      "Place shrimp halves (pink side down), pork, noodles, lettuce and herbs in lower third. Roll and fold edges like a burrito.",
      "Serve immediately with hoisin sauce thinned with water and topped with crushed peanuts."
    ],
    chef_notes: "Work quickly when rolling — the rice paper softens as it rests. Slightly under-soaking produces easier rolling; over-soaked paper tears easily. The shrimp should be visible through the wrapper for the classic appearance.",
    serving_suggestions: "Serve fresh with hoisin-peanut dipping sauce and nuoc cham.",
    flavor_profile: ["fresh", "clean", "herby", "light"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1582878826629-33b7f57b2a3c?w=400&q=80",
    tags: ["Fresh", "Healthy", "Street Food", "Classic"]
  },
  {
    dish_name: "Banh Xeo (Sizzling Crepes)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Vietnam's sizzling savory rice crepes — crispy, lacy, turmeric-yellow rice flour pancakes filled with shrimp, pork and bean sprouts, eaten wrapped in lettuce and mustard greens with nuoc cham.",
    ingredients: [
      { name: "Rice flour", quantity: "200", unit: "g" },
      { name: "Coconut milk", quantity: "200", unit: "ml" },
      { name: "Turmeric powder", quantity: "1", unit: "tsp" },
      { name: "Shrimp, peeled", quantity: "200", unit: "g" },
      { name: "Pork belly, sliced", quantity: "150", unit: "g" },
      { name: "Bean sprouts", quantity: "200", unit: "g" },
      { name: "Spring onions", quantity: "3", unit: "stalks" },
      { name: "Fish sauce, lime, sugar", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Make batter: rice flour with coconut milk, turmeric, water and a pinch of salt.",
      "Fry pork belly in a hot pan until golden. Add shrimp.",
      "Push to one side, pour in a thin layer of batter. Swirl to cover pan.",
      "Cover and cook on high heat until crepe is crispy and lifts from pan.",
      "Add bean sprouts, fold in half. Serve with nuoc cham and fresh herbs for wrapping."
    ],
    chef_notes: "The name means 'sizzling cake' — the batter should hit a very hot, well-oiled pan and sizzle dramatically. This is what creates the characteristic lacy, crispy edges.",
    serving_suggestions: "Wrap pieces in mustard greens or lettuce with herbs. Dip in nuoc cham.",
    flavor_profile: ["crispy", "savory", "aromatic", "fresh"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
    tags: ["Street Food", "Crispy", "Southern Vietnam", "Sharing"]
  },
  {
    dish_name: "Chả Giò (Fried Spring Rolls)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 40,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Southern Vietnamese fried spring rolls — delicate, crunchy rice paper rolls filled with pork, crab meat, glass noodles and wood ear mushrooms. Wrapped in lettuce and herbs and dipped in nuoc cham.",
    ingredients: [
      { name: "Rice paper rounds", quantity: "12", unit: "pieces" },
      { name: "Ground pork", quantity: "200", unit: "g" },
      { name: "Crab meat", quantity: "100", unit: "g" },
      { name: "Glass noodles, soaked", quantity: "50", unit: "g" },
      { name: "Wood ear mushrooms", quantity: "30", unit: "g" },
      { name: "Shallots, minced", quantity: "3", unit: "pieces" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" },
      { name: "Oil for frying", quantity: "2", unit: "cups" }
    ],
    preparation_steps: [
      "Mix pork, crab, glass noodles, mushrooms, shallots and fish sauce.",
      "Soften rice paper rounds briefly in water — just 3-4 seconds.",
      "Add filling and roll tightly. The rice paper will firm up as it dries.",
      "Deep fry in batches at 160°C — low temperature first to crisp slowly.",
      "Drain and serve wrapped in lettuce with fresh herbs and nuoc cham."
    ],
    chef_notes: "The secret to shatteringly crispy chả giò is double-frying: once at low temp to cook through, then again at high temp just before serving for maximum crunch.",
    serving_suggestions: "Wrap in perilla or lettuce leaves with cucumber and mint. Dip in nuoc cham.",
    flavor_profile: ["crispy", "savory", "herbaceous", "light"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&q=80",
    tags: ["Fried", "Street Food", "Southern Vietnam", "Crispy"]
  },

  // ── SOUPS ────────────────────────────────────────────────────────────────────
  {
    dish_name: "Pho Bo (Beef Noodle Soup)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Soups",
    difficulty_level: "hard",
    prep_time_minutes: 60,
    cook_time_minutes: 360,
    servings: 4,
    short_description: "Vietnam's national dish and one of the world's greatest soups — a crystalline, deeply complex beef bone broth perfumed with charred ginger, charred onion and warming spices, served with rice noodles and paper-thin raw beef.",
    ingredients: [
      { name: "Beef bones (marrow and knuckle)", quantity: "2", unit: "kg" },
      { name: "Beef brisket", quantity: "400", unit: "g" },
      { name: "Fresh rice noodles (pho noodles)", quantity: "400", unit: "g" },
      { name: "Onion", quantity: "1", unit: "large" },
      { name: "Ginger", quantity: "3", unit: "inch" },
      { name: "Star anise, cloves, cinnamon, cardamom", quantity: "1", unit: "portion" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Rock sugar", quantity: "1", unit: "tbsp" }
    ],
    preparation_steps: [
      "Blanch bones in boiling water 10 minutes. Drain and scrub clean.",
      "Char onion and ginger directly over open flame until blackened. This creates the signature smoky sweetness.",
      "Simmer bones 6+ hours, skimming regularly. The broth should be clear, not cloudy.",
      "Toast spices and add to broth last hour. Season with fish sauce and rock sugar.",
      "Serve over noodles with paper-thin raw beef slices that cook in the hot broth."
    ],
    chef_notes: "Charring the onion and ginger is the defining step that separates great pho from ordinary beef soup. The broth must be clear — regular gentle simmering, constant skimming.",
    serving_suggestions: "Serve with a plate of bean sprouts, lime, fresh chilies, basil and hoisin and sriracha.",
    flavor_profile: ["complex", "aromatic", "clean", "warming", "umami"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1582878826629-33b7f57b2a3c?w=400&q=80",
    tags: ["National Dish", "Slow Cooked", "Iconic", "Clear Broth"]
  },
  {
    dish_name: "Bun Bo Hue (Spicy Beef Noodle Soup)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Soups",
    difficulty_level: "hard",
    prep_time_minutes: 45,
    cook_time_minutes: 180,
    servings: 4,
    short_description: "The spicy, lemongrass-scented broth from Hue, Vietnam's former imperial capital — bolder and more complex than pho, with round rice noodles, pork hock, sliced beef and a fiery shrimp paste flavor.",
    ingredients: [
      { name: "Pork hock and beef shank", quantity: "800", unit: "g" },
      { name: "Round rice noodles (bun)", quantity: "400", unit: "g" },
      { name: "Lemongrass", quantity: "4", unit: "stalks" },
      { name: "Shrimp paste (mam ruoc)", quantity: "2", unit: "tbsp" },
      { name: "Annatto oil or chili oil", quantity: "3", unit: "tbsp" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Pork blood cubes (optional)", quantity: "150", unit: "g" },
      { name: "Bean sprouts, lemon, fresh herbs", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Blanch pork hock and beef. Simmer in water with lemongrass 2-3 hours.",
      "Fry shrimp paste in annatto oil until fragrant.",
      "Add to broth with additional lemongrass, fish sauce and sugar.",
      "The broth should be rich red-orange from annatto and deeply flavored.",
      "Serve over thick round noodles with sliced meat, herbs and lime."
    ],
    chef_notes: "Mam ruoc (shrimp paste) is the ingredient that makes Bun Bo Hue distinctly different from Pho — it adds a pungent, oceanic depth that is characteristic of Central Vietnamese cooking.",
    serving_suggestions: "Serve with banana blossom, bean sprouts, fresh lemon and herbs.",
    flavor_profile: ["spicy", "lemongrass", "funky", "bold", "aromatic"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    tags: ["Hue", "Spicy", "Lemongrass", "Central Vietnam"]
  },

  // ── SALADS ───────────────────────────────────────────────────────────────────
  {
    dish_name: "Goi Ga (Vietnamese Chicken Salad)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 25,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "A refreshing Vietnamese salad of shredded poached chicken with cabbage, herbs and a punchy, zingy nuoc cham dressing — bright, fresh and deeply aromatic with the anise notes of Vietnamese coriander.",
    ingredients: [
      { name: "Chicken breast", quantity: "400", unit: "g" },
      { name: "White cabbage, shredded", quantity: "300", unit: "g" },
      { name: "Carrots, julienned", quantity: "100", unit: "g" },
      { name: "Vietnamese coriander (rau ram)", quantity: "1", unit: "bunch" },
      { name: "Mint leaves", quantity: "1", unit: "bunch" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Lime juice", quantity: "4", unit: "tbsp" },
      { name: "Crushed peanuts and crispy shallots", quantity: "4", unit: "tbsp" }
    ],
    preparation_steps: [
      "Poach chicken in salted water with ginger and lemongrass 15 minutes. Cool and shred finely.",
      "Massage cabbage with a pinch of salt, let rest 5 minutes, then squeeze dry.",
      "Make dressing: fish sauce, lime juice, sugar, garlic and chili.",
      "Toss chicken, cabbage, carrots and herbs with dressing.",
      "Top with crushed peanuts and crispy fried shallots."
    ],
    chef_notes: "Vietnamese coriander (rau ram) has a distinctive peppery, slightly citrusy flavor that sets this salad apart — if unavailable, use a combination of mint and regular coriander.",
    serving_suggestions: "Serve as a light main course or starter with rice crackers.",
    flavor_profile: ["fresh", "tangy", "herby", "crunchy"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80",
    tags: ["Healthy", "Light", "Poached", "Refreshing"]
  },
  {
    dish_name: "Goi Du Du (Green Papaya Salad, Vietnamese Style)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "Vietnam's version of green papaya salad — lighter and more herby than its Thai cousin, dressed with fish sauce, lime, chili and garlic, topped with Vietnamese coriander, dried shrimp and roasted peanuts.",
    ingredients: [
      { name: "Green papaya", quantity: "400", unit: "g" },
      { name: "Dried shrimp", quantity: "2", unit: "tbsp" },
      { name: "Garlic", quantity: "3", unit: "cloves" },
      { name: "Bird's eye chili", quantity: "2", unit: "pieces" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" },
      { name: "Lime juice", quantity: "3", unit: "tbsp" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Roasted peanuts and Vietnamese herbs", quantity: "4", unit: "tbsp" }
    ],
    preparation_steps: [
      "Peel and julienne green papaya.",
      "Pound garlic and chili in a mortar.",
      "Make dressing with pounded aromatics, fish sauce, lime and sugar.",
      "Toss papaya with dressing and dried shrimp.",
      "Garnish with roasted peanuts, Vietnamese coriander and crispy shallots."
    ],
    chef_notes: "The Vietnamese version is less pounded and more tossed than the Thai version — the papaya should retain its crunch rather than becoming bruised and soft.",
    serving_suggestions: "Serve as a refreshing side salad or light starter.",
    flavor_profile: ["fresh", "crunchy", "tangy", "herby"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80",
    tags: ["Fresh", "Healthy", "Street Food", "Summer"]
  },

  // ── MAIN COURSES ─────────────────────────────────────────────────────────────
  {
    dish_name: "Banh Mi Sandwich",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Main Courses",
    difficulty_level: "easy",
    prep_time_minutes: 30,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "A perfect fusion of French and Vietnamese culinary traditions — a crispy baguette filled with char-siu pork, Vietnamese cold cuts, pickled daikon and carrots, cucumber, coriander and a smear of liver pâté.",
    ingredients: [
      { name: "Vietnamese baguettes", quantity: "4", unit: "pieces" },
      { name: "Char siu or cold cut pork", quantity: "300", unit: "g" },
      { name: "Pork liver pâté", quantity: "4", unit: "tbsp" },
      { name: "Daikon, julienned", quantity: "150", unit: "g" },
      { name: "Carrots, julienned", quantity: "100", unit: "g" },
      { name: "Rice vinegar and sugar for pickling", quantity: "1", unit: "portion" },
      { name: "Fresh cucumber, coriander, jalapeño", quantity: "1", unit: "portion" },
      { name: "Maggi sauce or soy sauce", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Quick-pickle daikon and carrots in rice vinegar, sugar and salt for 20 minutes minimum.",
      "Toast baguette until crackling crispy on outside.",
      "Spread pâté on one side, mayonnaise on the other.",
      "Layer pork cold cuts, pickled vegetables, cucumber slices and fresh coriander.",
      "Add jalapeño slices and a splash of Maggi sauce. Eat immediately."
    ],
    chef_notes: "The Vietnamese baguette (banh mi) is lighter and crispier than French baguettes due to the combination of rice flour and wheat flour. The contrast of hot, crispy bread with cold, crunchy pickled vegetables is essential.",
    serving_suggestions: "Eat immediately while the bread is crispy. The best banh mi is consumed within 5 minutes of assembly.",
    flavor_profile: ["complex", "fresh", "crunchy", "savory-acidic", "layered"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    tags: ["Street Food", "Fusion", "UNESCO Heritage", "Quick"]
  },
  {
    dish_name: "Bo Luc Lac (Shaking Beef)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Tender, cubed beef filet seared at extremely high heat with garlic, oyster sauce and soy, served over watercress and red onion salad — the 'shaking' refers to the technique of tossing the wok vigorously during cooking.",
    ingredients: [
      { name: "Beef filet or sirloin", quantity: "500", unit: "g" },
      { name: "Garlic", quantity: "6", unit: "cloves" },
      { name: "Oyster sauce", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Watercress", quantity: "200", unit: "g" },
      { name: "Red onion", quantity: "1", unit: "medium" },
      { name: "Lime and black pepper", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Cut beef into 3cm cubes. Marinate in soy sauce, oyster sauce, sugar and garlic 30 minutes.",
      "Get wok scorching hot. Add beef in a single layer without crowding.",
      "Shake the wok vigorously while cooking for 2 minutes until edges sear and caramelize.",
      "Add minced garlic at the last minute and toss.",
      "Serve immediately over watercress and red onion salad with a lime and black pepper dressing."
    ],
    chef_notes: "The 'shaking' technique — vigorously tossing the wok — ensures even caramelization on all sides. The beef should be medium-rare in the center with deeply caramelized, crusty exterior.",
    serving_suggestions: "Serve over watercress salad with a lime-salt-pepper dipping sauce.",
    flavor_profile: ["caramelized", "garlicky", "savory", "tender"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    tags: ["Wok", "Premium", "Special Occasion", "High Heat"]
  },
  {
    dish_name: "Ca Kho To (Caramelized Fish in Claypot)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 15,
    cook_time_minutes: 45,
    servings: 4,
    short_description: "Fatty fish fillets slowly braised in a clay pot in a deeply caramelized coconut water and fish sauce reduction — a southern Vietnamese comfort food with intense sweet, salty and smoky flavors that perfume the entire kitchen.",
    ingredients: [
      { name: "Catfish or salmon steaks", quantity: "600", unit: "g" },
      { name: "Coconut water", quantity: "300", unit: "ml" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Sugar", quantity: "3", unit: "tbsp" },
      { name: "Garlic", quantity: "4", unit: "cloves" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Chili", quantity: "2", unit: "pieces" },
      { name: "Caramel sauce (from 2 tbsp sugar)", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Make dry caramel by cooking sugar until amber. Add fish sauce carefully — it will sizzle.",
      "Add coconut water, garlic and ginger.",
      "Add fish pieces. Braise over medium heat, turning occasionally.",
      "Cook 40-45 minutes until sauce reduces to a thick, glossy glaze.",
      "Serve directly in clay pot with steamed white rice."
    ],
    chef_notes: "The patience in this dish pays off — the slow reduction creates an intensely flavored, sticky glaze that coats the fish. Don't rush it. The combination of caramel bitterness and fish sauce creates an irreplaceable flavor.",
    serving_suggestions: "Serve in the clay pot over steamed white rice with a simple vegetable soup.",
    flavor_profile: ["caramelized", "sweet-salty", "rich", "warming"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80",
    tags: ["Southern Vietnam", "Comfort Food", "Clay Pot", "Traditional"]
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    dish_name: "Che Ba Mau (Three Color Dessert)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Desserts",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 6,
    short_description: "Vietnam's most vibrant and fun dessert — three distinct layers of sweet beans and jelly in a glass, topped with coconut cream and crushed ice. Each color represents a different ingredient and flavor.",
    ingredients: [
      { name: "Cooked red beans", quantity: "100", unit: "g" },
      { name: "Mung bean paste, cooked", quantity: "100", unit: "g" },
      { name: "Pandan jelly, cubed", quantity: "100", unit: "g" },
      { name: "Coconut cream", quantity: "200", unit: "ml" },
      { name: "Sugar syrup", quantity: "4", unit: "tbsp" },
      { name: "Crushed ice", quantity: "2", unit: "cups" },
      { name: "Salt", quantity: "0.5", unit: "tsp" }
    ],
    preparation_steps: [
      "Cook red beans and mung beans with sugar syrup separately until tender.",
      "Make pandan jelly with pandan extract and agar.",
      "Season coconut cream with a pinch of salt (this enhances sweetness).",
      "Layer in glasses: red beans at bottom, green pandan jelly, then yellow mung bean.",
      "Top with crushed ice and pour coconut cream over everything. Serve immediately."
    ],
    chef_notes: "The pinch of salt in the coconut cream is the Vietnamese trick that makes the sweetness more prominent — don't skip it. Serve immediately or the ice melts and layers mix.",
    serving_suggestions: "Serve as a refreshing summer dessert or afternoon sweet snack.",
    flavor_profile: ["sweet", "creamy", "refreshing", "tropical"],
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
    tags: ["Colorful", "Street Dessert", "Summer", "Traditional"]
  },
  {
    dish_name: "Banh Flan (Vietnamese Crème Caramel)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 40,
    servings: 6,
    short_description: "A Vietnamese-French fusion dessert — silky, dense crème caramel with a uniquely richer egg yolk ratio, often served with a splash of strong iced Vietnamese coffee poured over it. The French colonial influence at its most delicious.",
    ingredients: [
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Egg yolks", quantity: "4", unit: "pieces" },
      { name: "Condensed milk", quantity: "200", unit: "ml" },
      { name: "Fresh milk", quantity: "300", unit: "ml" },
      { name: "Sugar", quantity: "100", unit: "g" },
      { name: "Water", quantity: "30", unit: "ml" },
      { name: "Strong Vietnamese coffee (optional)", quantity: "4", unit: "tbsp" },
      { name: "Vanilla extract", quantity: "1", unit: "tsp" }
    ],
    preparation_steps: [
      "Make dark caramel with sugar and water. Pour into individual ramekins.",
      "Mix eggs, egg yolks, condensed milk, fresh milk and vanilla.",
      "Strain through a fine sieve for extreme smoothness.",
      "Pour over set caramel in ramekins.",
      "Steam in a bain-marie at 160°C for 35-40 minutes. Chill and invert."
    ],
    chef_notes: "The combination of condensed milk and fresh milk (no heavy cream) gives Vietnamese banh flan its characteristic denser, more eggy texture compared to French crème caramel. Serving it with strong iced coffee poured over is the modern Saigon way.",
    serving_suggestions: "Serve chilled with a drizzle of dark Vietnamese iced coffee.",
    flavor_profile: ["sweet", "caramel", "silky", "eggy"],
    dietary_tags: ["vegetarian", "gluten-free"],
    img: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80",
  },
];

// ─── HELPER ──────────────────────────────────────────────────────────────────
function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
function FusionChefAI() {
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
  const [aboutPage, setAboutPage] = useState(false);
  const [contactPage, setContactPage] = useState(false);
  const [privacyPage, setPrivacyPage] = useState(false);
  const [termsPage, setTermsPage] = useState(false);
  const [careersPage, setCareersPage] = useState(false);
  const [maharashtraPage, setMaharashtraPage] = useState(false);
  const [punjabPage, setPunjabPage] = useState(false);
  const [punjabCategory, setPunjabCategory] = useState("All");
  const [punjabSearch, setPunjabSearch] = useState("");
  const [punjabModal, setPunjabModal] = useState(null);
  const [punjabGuidePage, setPunjabGuidePage] = useState(false);
  const [maharashtraGuidePage, setMaharashtraGuidePage] = useState(false);
  const [japaneseGuidePage, setJapaneseGuidePage] = useState(false);
  const [chineseGuidePage, setChineseGuidePage] = useState(false);
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
  // ── Asian cuisine state ──
  const [chinesePage, setChinesePage] = useState(false);
  const [japanesePage, setJapanesePage] = useState(false);
  const [thaiPage, setThaiPage] = useState(false);
  const [koreanPage, setKoreanPage] = useState(false);
  const [vietnamesePage, setVietnamesePage] = useState(false);
  const [asianModal, setAsianModal] = useState(null);
  const [asianCategory, setAsianCategory] = useState("All");
  const [asianSearch, setAsianSearch] = useState("");
  const messagesEndRef = useRef(null);

  // ── Asian helper ──
  const getAsianData = () => {
    if (chinesePage) return { data: chineseCuisineData, name: "Chinese", flag: "🇨🇳", color: "#8B1A1A", setPage: setChinesePage };
    if (japanesePage) return { data: japaneseCuisineData, name: "Japanese", flag: "🇯🇵", color: "#BC002D", setPage: setJapanesePage };
    if (thaiPage) return { data: thaiCuisineData, name: "Thai", flag: "🇹🇭", color: "#1a3a7a", setPage: setThaiPage };
    if (koreanPage) return { data: koreanCuisineData, name: "Korean", flag: "🇰🇷", color: "#003478", setPage: setKoreanPage };
    if (vietnamesePage) return { data: vietnameseCuisineData, name: "Vietnamese", flag: "🇻🇳", color: "#9B1B30", setPage: setVietnamesePage };
    return null;
  };
  const asianActive = getAsianData();

  useEffect(() => { injectGA(); }, []);

  useEffect(() => {
    const pages = [
      [indianPage,"Indian Cuisine"],[maharashtraPage,"Maharashtra Cuisine"],[punjabPage,"Punjab Cuisine"],
      [maharashtraGuidePage,"Maharashtra Guide"],[punjabGuidePage,"Punjab Guide"],[japaneseGuidePage,"Japanese Guide"],[chineseGuidePage,"Chinese Guide"],
      [aboutPage,"About Us"],[contactPage,"Contact Us"],[privacyPage,"Privacy Policy"],
      [termsPage,"Terms of Use"],[careersPage,"Careers"],[cuisineExplorer,"Cuisine Explorer"],[recipeDB,"Recipe Database"],
      [chinesePage,"Chinese Cuisine"],[japanesePage,"Japanese Cuisine"],[thaiPage,"Thai Cuisine"],
      [koreanPage,"Korean Cuisine"],[vietnamesePage,"Vietnamese Cuisine"],
    ];
    const active = pages.find(([state]) => state);
    const title = active ? `Fusion Chef – ${active[1]}` : "Fusion Chef – 200+ Recipes from Every Corner of the World";
    document.title = title;
    gtagEvent("page_view", { page_title: title, page_location: window.location.href });
  }, [indianPage,maharashtraPage,punjabPage,maharashtraGuidePage,punjabGuidePage,japaneseGuidePage,chineseGuidePage,aboutPage,contactPage,privacyPage,termsPage,careersPage,cuisineExplorer,recipeDB,chinesePage,japanesePage,thaiPage,koreanPage,vietnamesePage]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [indianPage,maharashtraPage,punjabPage,maharashtraGuidePage,punjabGuidePage,japaneseGuidePage,chineseGuidePage,aboutPage,contactPage,privacyPage,termsPage,careersPage,cuisineExplorer,recipeDB,chinesePage,japanesePage,thaiPage,koreanPage,vietnamesePage]);

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

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setRecipeModal(null); setChefModal(null); setCatModal(null); setAsianModal(null); } };
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
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + GROQ_KEY },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "system", content: "You are Fusion Chef, a warm and creative culinary AI. When users ask for recipes, respond with a catchy dish name, 5-7 key ingredients, 3-4 brief cooking steps, and a helpful tip. Keep it enthusiastic and under 250 words." }, { role: "user", content: query }], max_tokens: 500, temperature: 0.8 })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Hmm, let me think on that...";
      setMessages(m => [...m, { role: "ai", content: reply }]);
    } catch { setMessages(m => [...m, { role: "ai", content: "Oops! My kitchen is a bit busy. Please try again in a moment. 🍳" }]); }
    setLoading(false);
  };

  const handleSearch = async (q) => {
    const query = (q || searchQuery).trim();
    if (!query) return;
    setSearchModal(true); setSearchLoading(true); setSearchResults([]);
    const local = trending.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.chef.toLowerCase().includes(query.toLowerCase())).map(r => ({ ...r, isAI: false }));
    setSearchResults(local);
    try {
      const GROQ_KEY = "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";
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + GROQ_KEY },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "system", content: 'You are Fusion Chef. Generate exactly 3 recipe suggestions. Respond ONLY with a valid JSON array: [{"title":"...","chef":"Chef Name","time":"30 min","difficulty":"easy","ingredients":["item1","item2","item3"],"steps":["Step 1","Step 2","Step 3"],"img":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80","isAI":true}]' }, { role: "user", content: "Search: " + query }], max_tokens: 1000, temperature: 0.7 })
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "[]";
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) { const aiRecipes = JSON.parse(jsonMatch[0]); setSearchResults(prev => [...prev, ...aiRecipes]); }
    } catch(e) { console.log("Search error:", e); }
    setSearchLoading(false);
  };

  const navLinks = [
    { label: "Trending", id: "trending" },
    { label: "Cuisines", id: "cuisine-explorer" },
    { label: "Recipes", id: "recipe-db" },
  ];

  // ── RECIPE CARD emoji/gradient helpers ──
  const cardEmojis = {"Appetizers":"🥟","Soups":"🍜","Main Courses":"🍛","Breads":"🫓","Rice Preparations":"🍚","Desserts":"🍮","Beverages":"☕","Tea":"🍵","Coffee":"☕","Salads":"🥗","Sides":"🫙"};
  const cardGradients = {"Appetizers":"#E8621A, #C9922A","Soups":"#4A7C59, #2E7D32","Main Courses":"#C0392B, #E8621A","Breads":"#C9922A, #8B4513","Rice Preparations":"#4A7C59, #C9922A","Desserts":"#9B59B6, #E8621A","Tea":"#1a6b3c, #2E7D32","Coffee":"#4a2c0a, #8B4513","Salads":"#2E7D32, #4A7C59","Sides":"#C9922A, #E8621A"};

  // ── SHARED DISH MODAL (used by Indian/Maharashtra/Punjab/Asian) ──
  const renderDishModal = (dish, onClose, cuisineName) => {
    if (!dish) return null;
    const emojis = cardEmojis;
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal">
            <div style={{height:"260px",overflow:"hidden",position:"relative",background:"#f5f0ea"}}>
              {dish.img ? <img src={dish.img} alt={dish.dish_name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}} /> : null}
              <div style={{display:dish.img?"none":"flex",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#E8621A,#C9922A)",fontSize:"5rem"}}>{emojis[dish.category]||"🍽"}</div>
            </div>
            <div className="modal-body">
              <div className="indian-cat-badge">{dish.category}</div>
              <h2>{dish.dish_name}</h2>
              {dish.short_description && <p style={{fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:"1.7",marginBottom:"1rem"}}>{dish.short_description}</p>}
              <div className="modal-meta">
                <span>⏱ Prep: {dish.prep_time_minutes} min</span>
                <span>🔥 Cook: {dish.cook_time_minutes} min</span>
                <span>🍽 {dish.servings} servings</span>
                <span className={`diff-badge diff-${dish.difficulty_level}`}>{dish.difficulty_level}</span>
              </div>
              <div style={{marginTop:"0.6rem"}}>
                {(dish.dietary_tags||[]).map((t,i)=><span key={i} className="diet-tag">{t}</span>)}
                {(dish.flavor_profile||[]).map((t,i)=><span key={i} className="flavor-tag">{t}</span>)}
                {(dish.tags||[]).slice(0,3).map((t,i)=><span key={i} className="flavor-tag">{t}</span>)}
              </div>
              <div className="modal-section-title">Ingredients</div>
              <ul className="modal-ingredients">
                {(dish.ingredients||[]).map((ing,i)=><li key={i}>{ing.quantity} {ing.unit} {ing.name}</li>)}
              </ul>
              <div className="modal-section-title">Instructions</div>
              <ol className="indian-modal-steps">
                {(dish.preparation_steps||[]).map((step,i)=><li key={i}>{step}</li>)}
              </ol>
              {dish.chef_notes && <><div className="modal-section-title">👨‍🍳 Chef Notes</div><p style={{fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:"1.7",background:"var(--cream)",padding:"0.8rem",borderRadius:"8px"}}>{dish.chef_notes}</p></>}
              {dish.serving_suggestions && <><div className="modal-section-title">🍽 Serving Suggestions</div><p style={{fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:"1.7"}}>{dish.serving_suggestions}</p></>}
              {dish.nutrition_estimate && Object.keys(dish.nutrition_estimate).length>0 && (
                <><div className="modal-section-title">Nutrition Estimate</div>
                <div className="nutrition-grid">
                  {Object.entries(dish.nutrition_estimate).map(([k,v])=>(<div key={k} className="nutrition-box"><strong>{v}</strong><span>{k.replace(/_/g," ")}</span></div>))}
                </div></>
              )}
              <div style={{marginTop:"1.2rem"}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── SHARED CUISINE PAGE RENDERER ──
  const renderCuisinePage = ({ data, name, flag, color, setPage, category, setCategory, search, setSearch, modal, setModal, categories, backLabel, guideBtn }) => {
    const emojis = cardEmojis;
    const grads = cardGradients;
    const filtered = data.filter(d => {
      const matchCat = category === "All" || d.category === category;
      const matchSearch = !search ||
        d.dish_name.toLowerCase().includes(search.toLowerCase()) ||
        (d.tags||[]).some(t=>t.toLowerCase().includes(search.toLowerCase())) ||
        (d.flavor_profile||[]).some(f=>f.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
    return (
      <div className="indian-page">
        <div className="indian-header" style={{background: color || "var(--charcoal)"}}>
          <button className="indian-back" onClick={()=>{setPage(false);setCategory("All");setSearch("");setModal(null);}}>{backLabel||"← Back"}</button>
          {guideBtn && guideBtn}
          <h1>{flag} {name} <em>Cuisine</em></h1>
          <input className="indian-search" placeholder="Search dishes..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div className="indian-content">
          <div className="indian-cats">
            {categories.map(cat=>(
              <button key={cat} className={`cat-pill${category===cat?" active":""}`} onClick={()=>setCategory(cat)}>{cat}</button>
            ))}
          </div>
          {filtered.length===0 ? (
            <div className="indian-empty">🔍 No dishes found. Try a different search!</div>
          ) : (
            <div className="indian-grid">
              {filtered.map((dish,i)=>(
                <div key={i} className="indian-card" onClick={()=>{
                  window.location.href=`/cuisine/${name.toLowerCase()}/${dish.category.toLowerCase().replace(/[^a-z0-9]+/g,"-")}/${dish.dish_name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;
                }}>
                  <div className="indian-card-img" style={{padding:0,overflow:"hidden",background:"#f5f0ea"}}>
                    {dish.img ? <img src={dish.img} alt={dish.dish_name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}} /> : null}
                    <div style={{display:dish.img?"none":"flex",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",flexDirection:"column",background:`linear-gradient(135deg, ${grads[dish.category]||"#E8621A, #C9922A"})`}}>
                      <span style={{fontSize:"2.5rem"}}>{emojis[dish.category]||"🍽"}</span>
                    </div>
                  </div>
                  <div className="indian-card-body">
                    <div className="indian-cat-badge">{dish.category}</div>
                    <h3>{dish.dish_name}</h3>
                    <p style={{fontSize:"0.78rem",color:"var(--text-muted)",marginTop:"0.3rem",lineHeight:"1.4"}}>{dish.short_description?dish.short_description.substring(0,80)+"...":""}</p>
                    <div className="indian-card-meta">
                      <span>⏱ {dish.prep_time_minutes+dish.cook_time_minutes} min</span>
                      <span className={`diff-badge diff-${dish.difficulty_level}`}>{dish.difficulty_level}</span>
                    </div>
                    <div style={{marginTop:"0.5rem"}}>
                      {(dish.dietary_tags||[]).slice(0,2).map((t,j)=><span key={j} className="diet-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {modal && renderDishModal(modal, ()=>setModal(null), name)}
      </div>
    );
  };

  return (
    <>
      <style>{styles}</style>

      {/* ── MODALS ── */}
      {recipeModal && (
        <div className="modal-overlay" onClick={()=>setRecipeModal(null)}>
          <div className="modal-wrapper" onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setRecipeModal(null)}>✕</button>
            <div className="modal">
              <img src={recipeModal.img} alt={recipeModal.title} className="modal-img" />
              <div className="modal-body">
                <div className="recipe-chef">{recipeModal.chef||"Fusion Chef"} {recipeModal.isAI&&<span className="ai-badge">✨ AI</span>}</div>
                <h2>{recipeModal.title||"Recipe"}</h2>
                <div className="modal-meta">
                  <span>⏱ {recipeModal.time||"30 min"}</span>
                  <span>📊 {recipeModal.difficulty?recipeModal.difficulty.charAt(0).toUpperCase()+recipeModal.difficulty.slice(1):"Easy"}</span>
                  <span>⭐ 4.8</span><span>🍽 2-4 servings</span>
                </div>
                <div className="modal-section-title">Ingredients</div>
                <ul className="modal-ingredients">{(recipeModal.ingredients||["Check recipe"]).map((ing,i)=><li key={i}>{ing}</li>)}</ul>
                <div className="modal-section-title">Instructions</div>
                <ol className="modal-steps">{(recipeModal.steps||["Follow instructions"]).map((step,i)=><li key={i}>{step}</li>)}</ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {chefModal && (
        <div className="modal-overlay" onClick={()=>setChefModal(null)}>
          <div className="modal-wrapper" onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setChefModal(null)}>✕</button>
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CUISINE EXPLORER ── */}
      {cuisineExplorer && (
        <div className="full-page">
          <div className="full-page-header">
            <button className="back-btn" onClick={()=>setCuisineExplorer(false)}>← Back</button>
            <h1>🌍 Cuisine <em>Explorer</em></h1>
          </div>
          <div className="full-page-content">
            {[
              { continent: "🌏 Asian Cuisines", cuisines: [
                { name: "🇮🇳 Indian", desc: "biryani, butter chicken, dosa", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", available: "indian", states: ["Maharashtra","Punjab"] },
                { name: "🇨🇳 Chinese", desc: "dim sum, Peking duck, stir-fries", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", available: "chinese" },
                { name: "🇯🇵 Japanese", desc: "sushi, ramen, tempura", img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", available: "japanese" },
                { name: "🇹🇭 Thai", desc: "pad thai, green curry, tom yum", img: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&q=80", available: "thai" },
                { name: "🇰🇷 Korean", desc: "kimchi, bibimbap, BBQ", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80", available: "korean" },
                { name: "🇻🇳 Vietnamese", desc: "pho, banh mi, fresh rolls", img: "https://images.unsplash.com/photo-1582878826629-33b7f57b2a3c?w=400&q=80", available: "vietnamese" },
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
              ]},
              { continent: "🌍 Middle Eastern Cuisines", cuisines: [
                { name: "🇱🇧 Lebanese", desc: "hummus, shawarma", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80" },
                { name: "🇮🇷 Iranian", desc: "kebabs, saffron rice", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80" },
                { name: "🇮🇱 Israeli", desc: "falafel, shakshouka", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80" },
              ]},
              { continent: "🌍 African Cuisines", cuisines: [
                { name: "🇲🇦 Moroccan", desc: "tagine, couscous", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80" },
                { name: "🇪🇹 Ethiopian", desc: "injera, doro wat", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80" },
                { name: "🇳🇬 Nigerian", desc: "jollof rice, egusi soup", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80" },
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
                    <div key={c.name} className="ce-card" onClick={()=>{
                      setCuisineExplorer(false);
                      if(c.available==="indian") setIndianPage(true);
                      else if(c.available==="chinese") setChinesePage(true);
                      else if(c.available==="japanese") setJapanesePage(true);
                      else if(c.available==="thai") setThaiPage(true);
                      else if(c.available==="korean") setKoreanPage(true);
                      else if(c.available==="vietnamese") setVietnamesePage(true);
                      else alert("🚧 "+c.name+" recipes coming soon!");
                    }}>
                      <div className="ce-card-img"><img src={c.img} alt={c.name} /><div className="ce-card-overlay"/></div>
                      <div className="ce-card-body">
                        <h3>{c.name}</h3><p>{c.desc}</p>
                        {c.available ? <span className="ce-available">✅ Available</span> : <span className="ce-coming">🚧 Coming Soon</span>}
                        {c.states&&c.states.length>0&&(
                          <div style={{marginTop:"0.4rem"}}>
                            {c.states.map(s=>(
                              <span key={s} onClick={e=>{e.stopPropagation();setCuisineExplorer(false);if(s==="Maharashtra")setMaharashtraPage(true);else if(s==="Punjab")setPunjabPage(true);window.scrollTo({top:0,behavior:"smooth"});}} style={{display:"inline-block",background:"rgba(232,98,26,0.15)",color:"var(--saffron)",fontSize:"0.68rem",padding:"0.2rem 0.6rem",borderRadius:"10px",marginRight:"0.3rem",cursor:"pointer",fontWeight:600}}>📍 {s}</span>
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

      {/* ── RECIPE DATABASE ── */}
      {recipeDB && (
        <div className="full-page">
          <div className="full-page-header">
            <button className="back-btn" onClick={()=>setRecipeDB(false)}>← Back</button>
            <h1>📖 Recipe <em>Database</em></h1>
          </div>
          <div className="full-page-content">
            <div className="rdb-filters">
              <div className="rdb-filters-row">
                <div className="rdb-filter-group" style={{flex:2}}>
                  <label>🔍 Search Recipes</label>
                  <input className="rdb-search-input" placeholder="Search by name, ingredient..." value={recipeDBSearch} onChange={e=>setRecipeDBSearch(e.target.value)} />
                </div>
                <div className="rdb-filter-group">
                  <label>🍽 Category</label>
                  <select className="rdb-select" value={recipeDBCategory} onChange={e=>setRecipeDBCategory(e.target.value)}>
                    <option value="All">All Categories</option>
                    {["Soups","Appetizers","Salads","Main Courses","Breads","Rice Preparations","Desserts","Tea","Coffee","Sides","Beverages"].map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="rdb-filter-group">
                  <label>📊 Difficulty</label>
                  <select className="rdb-select" value={recipeDBDifficulty} onChange={e=>setRecipeDBDifficulty(e.target.value)}>
                    <option value="All">All Levels</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className="rdb-filter-group">
                  <label>🌍 Cuisine</label>
                  <select className="rdb-select" value={recipeDBCuisine} onChange={e=>setRecipeDBCuisine(e.target.value)}>
                    <option value="All">All Cuisines</option>
                    <option value="Indian">🇮🇳 Indian</option>
                    <option value="Maharashtra">🍊 Maharashtra</option>
                    <option value="Punjab">🌾 Punjab</option>
                    <option value="Chinese">🇨🇳 Chinese</option>
                    <option value="Japanese">🇯🇵 Japanese</option>
                    <option value="Thai">🇹🇭 Thai</option>
                    <option value="Korean">🇰🇷 Korean</option>
                    <option value="Vietnamese">🇻🇳 Vietnamese</option>
                  </select>
                </div>
              </div>
            </div>
            {(()=>{
              const allRecipes = [...indianCuisineData,...maharashtraCuisineData,...punjabCuisineData,...chineseCuisineData,...japaneseCuisineData,...thaiCuisineData,...koreanCuisineData,...vietnameseCuisineData];
              const filtered = allRecipes.filter(d=>{
                const matchCat = recipeDBCategory==="All"||d.category===recipeDBCategory;
                const matchDiff = recipeDBDifficulty==="All"||d.difficulty_level===recipeDBDifficulty;
                const matchCuisine = recipeDBCuisine==="All"||d.cuisine===recipeDBCuisine||d.state===recipeDBCuisine;
                const matchSearch = !recipeDBSearch||d.dish_name.toLowerCase().includes(recipeDBSearch.toLowerCase())||(d.ingredients&&d.ingredients.some(i=>i.name.toLowerCase().includes(recipeDBSearch.toLowerCase())));
                return matchCat&&matchDiff&&matchCuisine&&matchSearch;
              });
              return (
                <>
                  <div className="rdb-count">Showing <strong>{filtered.length}</strong> of <strong>{allRecipes.length}</strong> recipes</div>
                  {filtered.length===0 ? <div className="rdb-empty"><p>🔍</p><p>No recipes found. Try different filters!</p></div> : (
                    <div className="rdb-grid">
                      {filtered.map((dish,i)=>(
                        <div key={i} className="rdb-card" onClick={()=>{
                          setRecipeDB(false);
                          const cuisineName=(dish.state||dish.cuisine||"indian").toLowerCase();
                          window.location.href=`/cuisine/${cuisineName}/${dish.category.toLowerCase().replace(/[^a-z0-9]+/g,"-")}/${dish.dish_name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;
                        }}>
                          <div className="rdb-card-img" style={{padding:0,overflow:"hidden"}}>
                            {dish.img?<img src={dish.img} alt={dish.dish_name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span>{cardEmojis[dish.category]||"🍽"}</span>}
                          </div>
                          <div className="rdb-card-body">
                            <div style={{display:"flex",gap:"0.4rem",marginBottom:"0.4rem",flexWrap:"wrap"}}>
                              <span className="rdb-cuisine-tag">{dish.cuisine||dish.state}</span>
                              <span className="indian-cat-badge">{dish.category}</span>
                            </div>
                            <h3>{dish.dish_name}</h3>
                            <div className="rdb-card-meta">
                              <span>⏱ {dish.prep_time_minutes+dish.cook_time_minutes} min</span>
                              <span>🍽 {dish.servings} servings</span>
                              <span className={`diff-badge diff-${dish.difficulty_level}`}>{dish.difficulty_level}</span>
                            </div>
                            <div style={{marginTop:"0.5rem"}}>
                              {(dish.dietary_tags||[]).slice(0,2).map((t,j)=><span key={j} className="diet-tag">{t}</span>)}
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

      {/* ── ASIAN CUISINE PAGES (shared renderer) ── */}
      {chinesePage && renderCuisinePage({ data: chineseCuisineData, name: "Chinese", flag: "🇨🇳", color: "#8B1A1A", setPage: setChinesePage, category: asianCategory, setCategory: setAsianCategory, search: asianSearch, setSearch: setAsianSearch, modal: asianModal, setModal: setAsianModal, categories: ["All","Appetizers","Soups","Salads","Main Courses","Rice Preparations","Desserts"], guideBtn: <button onClick={()=>{setChinesePage(false);setChineseGuidePage(true);}} style={{background:"rgba(139,26,26,0.15)",border:"1px solid #8B1A1A",color:"#8B1A1A",padding:"0.4rem 1rem",borderRadius:"20px",cursor:"pointer",fontSize:"0.8rem",fontWeight:600}}>📖 Cuisine Guide</button> })}
      {japanesePage && renderCuisinePage({ data: japaneseCuisineData, name: "Japanese", flag: "🇯🇵", color: "#BC002D", setPage: setJapanesePage, category: asianCategory, setCategory: setAsianCategory, search: asianSearch, setSearch: setAsianSearch, modal: asianModal, setModal: setAsianModal, categories: ["All","Sushi","Appetizers","Soups","Salads","Main Courses","Rice Preparations","Desserts"], guideBtn: <button onClick={()=>{setJapanesePage(false);setJapaneseGuidePage(true);}} style={{background:"rgba(188,0,45,0.15)",border:"1px solid #BC002D",color:"#BC002D",padding:"0.4rem 1rem",borderRadius:"20px",cursor:"pointer",fontSize:"0.8rem",fontWeight:600}}>📖 Cuisine Guide</button> })}
      {thaiPage && renderCuisinePage({ data: thaiCuisineData, name: "Thai", flag: "🇹🇭", color: "#1a3a7a", setPage: setThaiPage, category: asianCategory, setCategory: setAsianCategory, search: asianSearch, setSearch: setAsianSearch, modal: asianModal, setModal: setAsianModal, categories: ["All","Appetizers","Soups","Salads","Main Courses","Desserts"] })}
      {koreanPage && renderCuisinePage({ data: koreanCuisineData, name: "Korean", flag: "🇰🇷", color: "#003478", setPage: setKoreanPage, category: asianCategory, setCategory: setAsianCategory, search: asianSearch, setSearch: setAsianSearch, modal: asianModal, setModal: setAsianModal, categories: ["All","Appetizers","Soups","Salads","Main Courses","Desserts"] })}
      {vietnamesePage && renderCuisinePage({ data: vietnameseCuisineData, name: "Vietnamese", flag: "🇻🇳", color: "#9B1B30", setPage: setVietnamesePage, category: asianCategory, setCategory: setAsianCategory, search: asianSearch, setSearch: setAsianSearch, modal: asianModal, setModal: setAsianModal, categories: ["All","Appetizers","Soups","Salads","Main Courses","Desserts"] })}

      {/* ── INDIAN PAGE ── */}
      {indianPage && (
        <div className="indian-page">
          <div className="indian-header">
            <button className="indian-back" onClick={()=>setIndianPage(false)}>← Back</button>
            <h1>🇮🇳 Indian <em>Cuisine</em></h1>
            <input className="indian-search" placeholder="Search dishes..." value={indianSearch} onChange={e=>setIndianSearch(e.target.value)} />
          </div>
          <div className="indian-content">
            <div style={{background:"rgba(232,98,26,0.08)",borderRadius:"12px",padding:"1rem 1.2rem",marginBottom:"1.5rem",display:"flex",alignItems:"center",gap:"1rem",flexWrap:"wrap"}}>
              <span style={{fontSize:"0.85rem",color:"var(--charcoal)",fontWeight:600}}>🗺️ Explore by State:</span>
              <button onClick={()=>{setIndianPage(false);setMaharashtraPage(true);}} style={{background:"var(--saffron)",color:"white",border:"none",borderRadius:"20px",padding:"0.4rem 1rem",fontSize:"0.8rem",fontWeight:600,cursor:"pointer"}}>🍊 Maharashtra</button>
              <button onClick={()=>{setIndianPage(false);setPunjabPage(true);}} style={{background:"#4A7C59",color:"white",border:"none",borderRadius:"20px",padding:"0.4rem 1rem",fontSize:"0.8rem",fontWeight:600,cursor:"pointer"}}>🌾 Punjab</button>
              <span style={{fontSize:"0.75rem",color:"var(--text-muted)"}}>More states coming soon...</span>
            </div>
            <div className="indian-cats">
              {["All","Appetizers","Soups","Main Courses","Breads","Rice Preparations","Desserts","Beverages"].map(cat=>(
                <button key={cat} className={`cat-pill${indianCategory===cat?" active":""}`} onClick={()=>setIndianCategory(cat)}>{cat}</button>
              ))}
            </div>
            {(()=>{
              const filtered=indianCuisineData.filter(d=>{
                const matchCat=indianCategory==="All"||d.category===indianCategory;
                const matchSearch=!indianSearch||d.dish_name.toLowerCase().includes(indianSearch.toLowerCase())||d.flavor_profile.some(f=>f.toLowerCase().includes(indianSearch.toLowerCase()));
                return matchCat&&matchSearch;
              });
              return filtered.length===0?<div className="indian-empty">🔍 No dishes found.</div>:(
                <div className="indian-grid">
                  {filtered.map((dish,i)=>(
                    <div key={i} className="indian-card" onClick={()=>{window.location.href=`/cuisine/indian/${dish.category.toLowerCase().replace(/[^a-z0-9]+/g,"-")}/${dish.dish_name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;  }}>
                      <div className="indian-card-img" style={{padding:0,overflow:"hidden"}}>
                        {dish.img?<img src={dish.img} alt={dish.dish_name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span>{cardEmojis[dish.category]||"🍽"}</span>}
                      </div>
                      <div className="indian-card-body">
                        <div className="indian-cat-badge">{dish.category}</div>
                        <h3>{dish.dish_name}</h3>
                        <div className="indian-card-meta">
                          <span>⏱ {dish.prep_time_minutes+dish.cook_time_minutes} min</span>
                          <span>🍽 {dish.servings} servings</span>
                          <span className={`diff-badge diff-${dish.difficulty_level}`}>{dish.difficulty_level}</span>
                        </div>
                        <div style={{marginTop:"0.5rem"}}>{dish.dietary_tags.map((t,j)=><span key={j} className="diet-tag">{t}</span>)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
          {indianModal&&renderDishModal(indianModal,()=>setIndianModal(null),"Indian")}
        </div>
      )}

      {/* ── MAHARASHTRA PAGE ── */}
      {maharashtraPage && (
        <div className="indian-page">
          <div className="indian-header">
            <button className="indian-back" onClick={()=>setMaharashtraPage(false)}>← Back</button>
            <button onClick={()=>{setMaharashtraGuidePage(true);setMaharashtraPage(false);}} style={{background:"rgba(232,98,26,0.15)",border:"1px solid #E8621A",color:"#E8621A",padding:"0.4rem 1rem",borderRadius:"20px",cursor:"pointer",fontSize:"0.8rem",fontWeight:600}}>📖 Cuisine Guide</button>
            <h1>🍊 Maharashtra <em>Cuisine</em></h1>
            <input className="indian-search" placeholder="Search dishes..." value={maharashtraSearch} onChange={e=>setMaharashtraSearch(e.target.value)} />
          </div>
          <div className="indian-content">
            <div className="indian-cats">
              {["All","Soups","Appetizers","Salads","Main Courses","Breads","Rice Preparations","Desserts","Tea","Coffee","Sides"].map(cat=>(
                <button key={cat} className={`cat-pill${maharashtraCategory===cat?" active":""}`} onClick={()=>setMaharashtraCategory(cat)}>{cat}</button>
              ))}
            </div>
            {(()=>{
              const filtered=maharashtraCuisineData.filter(d=>{
                const matchCat=maharashtraCategory==="All"||d.category===maharashtraCategory;
                const matchSearch=!maharashtraSearch||d.dish_name.toLowerCase().includes(maharashtraSearch.toLowerCase())||d.tags.some(t=>t.toLowerCase().includes(maharashtraSearch.toLowerCase()));
                return matchCat&&matchSearch;
              });
              return filtered.length===0?<div className="indian-empty">🔍 No dishes found.</div>:(
                <div className="indian-grid">
                  {filtered.map((dish,i)=>(
                    <div key={i} className="indian-card" onClick={()=>{window.location.href=`/cuisine/maharashtra/${dish.category.toLowerCase().replace(/[^a-z0-9]+/g,"-")}/${dish.dish_name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;  }}>
                      <div className="indian-card-img" style={{padding:0,overflow:"hidden",background:"#f5f0ea"}}>
                        {dish.img?<img src={dish.img} alt={dish.dish_name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}/>:null}
                        <div style={{display:dish.img?"none":"flex",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",flexDirection:"column",background:`linear-gradient(135deg, ${cardGradients[dish.category]||"#E8621A, #C9922A"})`}}>
                          <span style={{fontSize:"2.5rem"}}>{cardEmojis[dish.category]||"🍽"}</span>
                        </div>
                      </div>
                      <div className="indian-card-body">
                        <div className="indian-cat-badge">{dish.category}</div>
                        <h3>{dish.dish_name}</h3>
                        <p style={{fontSize:"0.78rem",color:"var(--text-muted)",marginTop:"0.3rem",lineHeight:"1.4"}}>{dish.short_description?dish.short_description.substring(0,80)+"...":""}</p>
                        <div className="indian-card-meta">
                          <span>⏱ {dish.prep_time_minutes+dish.cook_time_minutes} min</span>
                          <span className={`diff-badge diff-${dish.difficulty_level.toLowerCase()}`}>{dish.difficulty_level}</span>
                        </div>
                        <div style={{marginTop:"0.5rem"}}>{dish.tags.slice(0,2).map((t,j)=><span key={j} className="diet-tag">{t}</span>)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
          {maharashtraModal&&renderDishModal(maharashtraModal,()=>setMaharashtraModal(null),"Maharashtra")}
        </div>
      )}

      {/* ── PUNJAB PAGE ── */}
      {punjabPage && (
        <div className="indian-page">
          <div className="indian-header">
            <button className="indian-back" onClick={()=>setPunjabPage(false)}>← Back</button>
            <button onClick={()=>{setPunjabGuidePage(true);setPunjabPage(false);}} style={{background:"rgba(74,124,89,0.15)",border:"1px solid #4A7C59",color:"#4A7C59",padding:"0.4rem 1rem",borderRadius:"20px",cursor:"pointer",fontSize:"0.8rem",fontWeight:600}}>📖 Cuisine Guide</button>
            <h1>🌾 Punjab <em>Cuisine</em></h1>
            <input className="indian-search" placeholder="Search dishes..." value={punjabSearch} onChange={e=>setPunjabSearch(e.target.value)} />
          </div>
          <div className="indian-content">
            <div className="indian-cats">
              {["All","Soups","Appetizers","Salads","Main Courses","Breads","Rice Preparations","Desserts","Tea","Coffee","Sides"].map(cat=>(
                <button key={cat} className={`cat-pill${punjabCategory===cat?" active":""}`} onClick={()=>setPunjabCategory(cat)}>{cat}</button>
              ))}
            </div>
            {(()=>{
              const filtered=punjabCuisineData.filter(d=>{
                const matchCat=punjabCategory==="All"||d.category===punjabCategory;
                const matchSearch=!punjabSearch||d.dish_name.toLowerCase().includes(punjabSearch.toLowerCase())||d.tags.some(t=>t.toLowerCase().includes(punjabSearch.toLowerCase()));
                return matchCat&&matchSearch;
              });
              return filtered.length===0?<div className="indian-empty">🔍 No dishes found.</div>:(
                <div className="indian-grid">
                  {filtered.map((dish,i)=>(
                    <div key={i} className="indian-card" onClick={()=>{window.location.href=`/cuisine/punjab/${dish.category.toLowerCase().replace(/[^a-z0-9]+/g,"-")}/${dish.dish_name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;  }}>
                      <div className="indian-card-img" style={{padding:0,overflow:"hidden",background:"#f5f0ea"}}>
                        {dish.img?<img src={dish.img} alt={dish.dish_name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}/>:null}
                        <div style={{display:dish.img?"none":"flex",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",flexDirection:"column",background:`linear-gradient(135deg, ${cardGradients[dish.category]||"#4A7C59, #2E7D32"})`}}>
                          <span style={{fontSize:"2.5rem"}}>{cardEmojis[dish.category]||"🍽"}</span>
                        </div>
                      </div>
                      <div className="indian-card-body">
                        <div className="indian-cat-badge">{dish.category}</div>
                        <h3>{dish.dish_name}</h3>
                        <p style={{fontSize:"0.78rem",color:"var(--text-muted)",marginTop:"0.3rem",lineHeight:"1.4"}}>{dish.short_description?dish.short_description.substring(0,80)+"...":""}</p>
                        <div className="indian-card-meta">
                          <span>⏱ {dish.prep_time_minutes+dish.cook_time_minutes} min</span>
                          <span className={`diff-badge diff-${dish.difficulty_level.toLowerCase()}`}>{dish.difficulty_level}</span>
                        </div>
                        <div style={{marginTop:"0.5rem"}}>{dish.tags.slice(0,2).map((t,j)=><span key={j} className="diet-tag">{t}</span>)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
          {punjabModal&&renderDishModal(punjabModal,()=>setPunjabModal(null),"Punjab")}
        </div>
      )}


      {/* ── CHINESE CUISINE GUIDE ── */}
      {chineseGuidePage && (
        <div className="full-page" style={{background:"#FDFAF6"}}>
          <div className="full-page-header" style={{background:"#8B1A1A"}}>
            <button className="back-btn" onClick={()=>setChineseGuidePage(false)}>← Back</button>
            <button className="back-btn" style={{marginLeft:"auto",background:"rgba(255,255,255,0.15)"}} onClick={()=>{setChineseGuidePage(false);setChinesePage(true);}}>🥢 Browse Recipes</button>
            <h1 style={{color:"white"}}>🇨🇳 Chinese <em>Cuisine Guide</em></h1>
          </div>
          <div className="full-page-content" style={{maxWidth:"860px",margin:"0 auto",padding:"2rem 1.5rem"}}>

            {/* Hero */}
            <div style={{background:"#8B1A1A",borderRadius:"16px",padding:"2.5rem",color:"white",marginBottom:"2rem",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",right:"-20px",top:"-20px",fontSize:"8rem",opacity:0.1}}>🐉</div>
              <div style={{fontSize:"0.8rem",letterSpacing:"3px",opacity:0.8,marginBottom:"0.5rem"}}>COMPLETE GUIDE</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",marginBottom:"0.8rem",color:"white"}}>The Dragon's Table — 5,000 Years of Chinese Cuisine</h2>
              <p style={{opacity:0.9,lineHeight:1.7,maxWidth:"580px"}}>Chinese cuisine is the world's oldest and most diverse culinary tradition. Spanning 5,000 years of history, 23 provinces and 1.4 billion tastes, it encompasses everything from delicate Cantonese dim sum to face-numbing Sichuan fire — and everything in between.</p>
              <div style={{display:"flex",gap:"1rem",marginTop:"1.5rem",flexWrap:"wrap"}}>
                {["🥟 Dumplings","🍜 Noodles","🦆 Peking Duck","🍱 Dim Sum","🌶️ Ma La"].map(t=>(
                  <span key={t} style={{background:"rgba(255,255,255,0.2)",padding:"0.3rem 0.8rem",borderRadius:"20px",fontSize:"0.8rem"}}>{t}</span>
                ))}
              </div>
            </div>

            {/* History */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#8B1A1A",marginBottom:"1rem",fontSize:"1.3rem"}}>📜 History & Origins</h3>
              <p style={{lineHeight:1.8,color:"#444",marginBottom:"1rem"}}>Chinese culinary history stretches back to the Neolithic period, with evidence of rice cultivation dating to 7000 BCE. The Zhou Dynasty (1046–256 BCE) codified the first formal rules of Chinese cooking and dining etiquette. Confucius himself wrote extensively on food — insisting that rice should never be too white, meat never cut against the grain, and meals should always be taken at regular hours.</p>
              <p style={{lineHeight:1.8,color:"#444",marginBottom:"1rem"}}>The Silk Road brought new ingredients — sesame, coriander, grapes and pomegranates — that transformed Chinese cooking from the Han Dynasty onwards. The Tang and Song dynasties (618–1279 CE) saw restaurant culture explode in cities like Hangzhou and Kaifeng, with menus offering hundreds of dishes to urban diners.</p>
              <p style={{lineHeight:1.8,color:"#444"}}>The Qing Dynasty (1644–1912) gave the world the imperial banquet tradition — an extravagant multi-course feast called Man-Han Quanxi with over 108 dishes across three days. Today, Chinese cuisine encompasses eight distinct regional culinary traditions, each as complex and proud as any national cuisine in the world.</p>
            </div>

            {/* Eight Cuisines */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#8B1A1A",marginBottom:"1rem",fontSize:"1.3rem"}}>🗺️ The Eight Great Regional Cuisines</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1rem"}}>
                {[
                  {region:"🥟 Cantonese (Yue)",province:"Guangdong",flavor:"Fresh, delicate, light",famous:"Dim sum, roast goose, steamed fish, congee",note:"The world's most exported Chinese cuisine — the origin of dim sum culture and Chinatown cooking"},
                  {region:"🌶️ Sichuan (Chuan)",province:"Sichuan",flavor:"Ma La — numbing and spicy",famous:"Mapo tofu, kung pao, dan dan noodles, hot pot",note:"The most internationally celebrated regional cuisine — the Sichuan peppercorn creates a unique numbing sensation"},
                  {region:"🦆 Beijing (Lu)",province:"Shandong / Beijing",flavor:"Rich, salty, robust",famous:"Peking duck, zhajiangmian, dumplings, lamb hotpot",note:"The imperial capital cuisine — refined, ceremonial and deeply satisfying"},
                  {region:"🍜 Shanghainese (Hu)",province:"Shanghai / Jiangsu",flavor:"Sweet, rich, red-braised",famous:"Xiaolongbao, red braised pork, hairy crab, lion's head",note:"Famous for red braising technique and the beloved soup dumplings of Din Tai Fung"},
                  {region:"🐟 Fujian (Min)",province:"Fujian",flavor:"Umami-rich, light broths",famous:"Buddha Jumps Over the Wall, oyster omelette, peanut soup",note:"A seafood-forward cuisine known for its extraordinary umami depth and complex broths"},
                  {region:"🫙 Hunan (Xiang)",province:"Hunan",flavor:"Hot, sour, smoky",famous:"Chairman Mao's red braised pork, smoked meats, stinky tofu",note:"Even spicier than Sichuan but without the numbing — pure, direct chilli heat"},
                  {region:"🥩 Zhejiang (Zhe)",province:"Zhejiang",flavor:"Fresh, tender, mild",famous:"Dongpo pork, West Lake fish, longjing tea chicken",note:"Refined and elegant — uses Longjing tea as an ingredient in famous dishes"},
                  {region:"🍖 Anhui (Hui)",province:"Anhui",flavor:"Wild, earthy, preserved",famous:"Hairy tofu, braised soft-shell turtle, stinky pike",note:"Makes bold use of wild game, mountain plants and preserved ingredients"},
                ].map(r=>(
                  <div key={r.region} style={{background:"#FDF5F5",borderRadius:"10px",padding:"1.2rem",border:"1px solid #f0dede"}}>
                    <strong style={{color:"#8B1A1A",display:"block",marginBottom:"0.2rem"}}>{r.region}</strong>
                    <div style={{fontSize:"0.72rem",color:"#888",marginBottom:"0.3rem"}}>{r.province}</div>
                    <div style={{fontSize:"0.78rem",color:"#C9922A",fontWeight:600,marginBottom:"0.3rem"}}>Flavour: {r.flavor}</div>
                    <div style={{fontSize:"0.76rem",color:"#555",marginBottom:"0.4rem"}}>🍽 {r.famous}</div>
                    <p style={{fontSize:"0.74rem",color:"#777",lineHeight:1.5,fontStyle:"italic"}}>{r.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Essential Ingredients */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#8B1A1A",marginBottom:"1rem",fontSize:"1.3rem"}}>🥢 Essential Ingredients & Sauces</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"0.8rem"}}>
                {[
                  {name:"Soy Sauce",desc:"The cornerstone — light soy for seasoning, dark soy for colour and braising"},
                  {name:"Shaoxing Wine",desc:"Fermented rice wine — essential for marinades, sauces and eliminating gaminess"},
                  {name:"Oyster Sauce",desc:"Thick, sweet-savoury sauce from oyster extracts — the secret of Cantonese stir-fries"},
                  {name:"Doubanjiang",desc:"Sichuan's sacred spicy bean paste — the soul of Sichuan cooking"},
                  {name:"Sesame Oil",desc:"Always added at the end — a finishing oil, never for cooking at high heat"},
                  {name:"Five Spice",desc:"Star anise, cinnamon, cloves, fennel and Sichuan pepper — the aroma of Chinese cooking"},
                  {name:"Sichuan Peppercorn",desc:"Not pepper at all — a citrus family berry that creates unique numbing ma sensation"},
                  {name:"Dried Chilli",desc:"Facing heaven chillies and Sichuan chillies — dried for stir-fries, fresh for heat"},
                  {name:"Black Vinegar",desc:"Chinkiang vinegar — malty, complex, used in dumplings and braises"},
                  {name:"Cornstarch",desc:"Velveting ingredient for silky meat — also thickens sauces and creates glossy finishes"},
                  {name:"Fermented Black Beans",desc:"Intensely savoury preserved beans — the base of black bean sauce"},
                  {name:"Hoisin Sauce",desc:"Sweet, thick plum-based sauce — Peking duck's essential companion"},
                ].map(i=>(
                  <div key={i.name} style={{background:"#FDF5F5",borderRadius:"8px",padding:"0.9rem",border:"1px solid #f0dede"}}>
                    <strong style={{color:"#8B1A1A",fontSize:"0.85rem",display:"block"}}>{i.name}</strong>
                    <p style={{fontSize:"0.75rem",color:"#666",marginTop:"0.3rem",lineHeight:1.5}}>{i.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooking Techniques */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#8B1A1A",marginBottom:"1rem",fontSize:"1.3rem"}}>🔥 Essential Chinese Cooking Techniques</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"0.8rem"}}>
                {[
                  {tech:"Wok Hei (鑊氣)",desc:"The breath of the wok — the smoky, slightly charred flavour only achievable at extremely high heat in a well-seasoned wok"},
                  {tech:"Velveting (上漿)",desc:"Marinating meat in egg white and cornstarch before cooking — creates silky, tender texture impossible to achieve otherwise"},
                  {tech:"Red Braising (紅燒)",desc:"Slow braising in soy sauce, rice wine and sugar until deeply mahogany coloured and meltingly tender"},
                  {tech:"Bang Bang (拍)",desc:"Smashing vegetables like cucumber with the flat of a knife — breaks cell walls to absorb dressings better"},
                  {tech:"Dry Frying (乾炒)",desc:"Frying without oil or with very little oil until ingredients are slightly charred and concentrated"},
                  {tech:"Twice Cooking (回鍋)",desc:"Boiling then stir-frying — creates a distinctive texture and allows deeply flavoured sauce to penetrate"},
                ].map(t=>(
                  <div key={t.tech} style={{background:"#FDF5F5",borderRadius:"8px",padding:"1rem",borderLeft:"3px solid #8B1A1A"}}>
                    <strong style={{color:"#8B1A1A",fontSize:"0.88rem",display:"block"}}>{t.tech}</strong>
                    <p style={{fontSize:"0.78rem",color:"#666",marginTop:"0.4rem",lineHeight:1.6}}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dim Sum Guide */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#8B1A1A",marginBottom:"0.5rem",fontSize:"1.3rem"}}>🥟 The World of Dim Sum</h3>
              <p style={{lineHeight:1.8,color:"#444",marginBottom:"1rem",fontSize:"0.9rem"}}>Dim sum — literally "touch the heart" — is the Cantonese tradition of yum cha (drinking tea) accompanied by small dishes. Originating in teahouses along the Silk Road, it evolved into one of the world's great culinary traditions. A proper dim sum brunch can feature over 100 different items.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0.8rem"}}>
                {[
                  {item:"Har Gow",desc:"Translucent shrimp dumplings — the benchmark dish by which a dim sum chef is judged"},
                  {item:"Siu Mai",desc:"Open-topped pork and prawn dumplings with a bright orange roe crown"},
                  {item:"Char Siu Bao",desc:"BBQ pork buns — both steamed (fluffy) and baked (glazed) versions"},
                  {item:"Cheung Fun",desc:"Silky rice noodle rolls filled with prawn, beef or char siu, doused in soy sauce"},
                  {item:"Egg Tart",desc:"Flaky pastry shell holding a smooth, barely-set egg custard — Macanese-Portuguese influence"},
                  {item:"Turnip Cake",desc:"Pan-fried rice flour cake with daikon and dried shrimp — crispy outside, soft inside"},
                  {item:"Chicken Feet",desc:"Phoenix claws — braised in black bean sauce until gelatinously tender"},
                  {item:"Lo Mai Gai",desc:"Glutinous rice with chicken and sausage wrapped in a fragrant lotus leaf"},
                ].map(d=>(
                  <div key={d.item} style={{background:"#FDF5F5",borderRadius:"8px",padding:"0.9rem",borderLeft:"3px solid #C9922A"}}>
                    <strong style={{color:"#C9922A",fontSize:"0.85rem"}}>{d.item}</strong>
                    <p style={{fontSize:"0.75rem",color:"#666",marginTop:"0.3rem",lineHeight:1.5}}>{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dining Customs */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#8B1A1A",marginBottom:"1rem",fontSize:"1.3rem"}}>🥢 Dining Culture & Etiquette</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:"0.8rem"}}>
                {[
                  {rule:"Lazy Susan",desc:"The rotating centrepiece of Chinese round tables — dishes are shared by all and spun to reach everyone"},
                  {rule:"Tea Culture",desc:"Tea is poured for elders first, then working down by age — tap two fingers to say thank you without interrupting conversation"},
                  {rule:"Bones on table",desc:"It is perfectly acceptable to place bones and shells on the table or a side plate — never in your rice bowl"},
                  {rule:"Pouring alcohol",desc:"Never pour your own drink. Fill others' glasses and someone will fill yours. Gan bei means bottoms up"},
                  {rule:"Offering food",desc:"Placing choice morsels in someone else's bowl is a high compliment — use the reverse end of your chopsticks"},
                  {rule:"Finishing your bowl",desc:"In some regions, emptying your bowl signals you want more. In others, leaving a little shows the host provided abundantly"},
                  {rule:"Fish etiquette",desc:"Never flip a whole fish at the table — in fishing communities it symbolises a boat capsizing"},
                  {rule:"Ordering culture",desc:"Order more dishes than people — generosity is the essence of Chinese hospitality"},
                ].map(c=>(
                  <div key={c.rule} style={{background:"#FDF5F5",borderRadius:"8px",padding:"0.9rem",borderLeft:"3px solid #8B1A1A"}}>
                    <strong style={{color:"#8B1A1A",fontSize:"0.85rem",display:"block"}}>{c.rule}</strong>
                    <p style={{fontSize:"0.78rem",color:"#666",marginTop:"0.3rem",lineHeight:1.6}}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Festival Foods */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#8B1A1A",marginBottom:"1rem",fontSize:"1.3rem"}}>🎊 Festival & Celebration Foods</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0.8rem"}}>
                {[
                  {festival:"🧧 Chinese New Year",foods:"Dumplings (jiaozi) symbolise wealth, whole fish for abundance, tang yuan for family unity, nian gao for prosperity"},
                  {festival:"🥮 Mid-Autumn Festival",foods:"Mooncakes filled with lotus paste and salted egg yolk — eaten while gazing at the full moon"},
                  {festival:"🐉 Dragon Boat Festival",foods:"Zongzi — glutinous rice stuffed with pork and wrapped in bamboo leaves to commemorate poet Qu Yuan"},
                  {festival:"⛄ Winter Solstice (Dongzhi)",foods:"Tang yuan — glutinous rice balls in sweet ginger soup — symbolising family reunion"},
                  {festival:"🎂 Birthdays",foods:"Long-life noodles (changshou mian) — never cut — eaten unbroken to ensure longevity"},
                  {festival:"👶 Red Egg Ceremony",foods:"Red-dyed hard boiled eggs given to guests at a baby's one-month celebration — red symbolises luck"},
                ].map(f=>(
                  <div key={f.festival} style={{background:"#FDF5F5",borderRadius:"8px",padding:"0.9rem",border:"1px solid #f0dede"}}>
                    <strong style={{color:"#8B1A1A",fontSize:"0.85rem",display:"block",marginBottom:"0.3rem"}}>{f.festival}</strong>
                    <p style={{fontSize:"0.76rem",color:"#666",lineHeight:1.5}}>{f.foods}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Must Try */}
            <div style={{background:"linear-gradient(135deg,#8B1A1A,#5C0E0E)",borderRadius:"12px",padding:"1.8rem",marginBottom:"2rem",color:"white"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",marginBottom:"1rem",fontSize:"1.3rem"}}>⭐ 10 Must-Try Chinese Dishes</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0.6rem"}}>
                {[
                  "🦆 Peking Duck — Beijing's greatest imperial dish",
                  "🥟 Xiaolongbao — Shanghai's legendary soup dumplings",
                  "🌶️ Mapo Tofu — Sichuan's silky, fiery masterpiece",
                  "🍜 Dan Dan Noodles — street food of Chengdu",
                  "🥩 Red Braised Pork — Mao's beloved hong shao rou",
                  "🫕 Sichuan Hot Pot — the communal fire pot experience",
                  "🍱 Dim Sum Brunch — yum cha at its finest",
                  "🍚 Claypot Rice — Cantonese street food perfection",
                  "🐟 Sichuan Boiled Fish — fiery, silky, numbing",
                  "🥮 Mooncake — Mid-Autumn Festival's iconic sweet",
                ].map((d,i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,0.12)",borderRadius:"8px",padding:"0.7rem",fontSize:"0.82rem",lineHeight:1.5}}>{d}</div>
                ))}
              </div>
            </div>

            <div style={{textAlign:"center",paddingBottom:"2rem"}}>
              <button onClick={()=>{setChineseGuidePage(false);setChinesePage(true);}} style={{background:"#8B1A1A",color:"white",border:"none",padding:"0.9rem 2.5rem",borderRadius:"25px",fontSize:"1rem",fontWeight:600,cursor:"pointer"}}>
                🥢 Browse All Chinese Recipes →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── JAPANESE CUISINE GUIDE ── */}
      {japaneseGuidePage && (
        <div className="full-page" style={{background:"#FDFAF6"}}>
          <div className="full-page-header" style={{background:"#BC002D"}}>
            <button className="back-btn" onClick={()=>setJapaneseGuidePage(false)}>← Back</button>
            <button className="back-btn" style={{marginLeft:"auto",background:"rgba(255,255,255,0.15)"}} onClick={()=>{setJapaneseGuidePage(false);setJapanesePage(true);}}>🍱 Browse Recipes</button>
            <h1 style={{color:"white"}}>🇯🇵 Japanese <em>Cuisine Guide</em></h1>
          </div>
          <div className="full-page-content" style={{maxWidth:"860px",margin:"0 auto",padding:"2rem 1.5rem"}}>

            {/* Hero banner */}
            <div style={{background:"#BC002D",borderRadius:"16px",padding:"2.5rem",color:"white",marginBottom:"2rem",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",right:"-20px",top:"-20px",fontSize:"8rem",opacity:0.1}}>🗾</div>
              <div style={{fontSize:"0.8rem",letterSpacing:"3px",opacity:0.8,marginBottom:"0.5rem"}}>COMPLETE GUIDE</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",marginBottom:"0.8rem",color:"white"}}>The Art & Soul of Japanese Cuisine</h2>
              <p style={{opacity:0.9,lineHeight:1.7,maxWidth:"580px"}}>Japanese cuisine — washoku — is a UNESCO Intangible Cultural Heritage. Rooted in the philosophy of harmony, seasonality and respect for ingredients, it is one of the world's most refined and health-conscious food cultures.</p>
              <div style={{display:"flex",gap:"1rem",marginTop:"1.5rem",flexWrap:"wrap"}}>
                {["🍣 Sushi","🍜 Ramen","🍱 Bento","🍡 Wagashi","🥢 Washoku"].map(t=>(
                  <span key={t} style={{background:"rgba(255,255,255,0.2)",padding:"0.3rem 0.8rem",borderRadius:"20px",fontSize:"0.8rem"}}>{t}</span>
                ))}
              </div>
            </div>

            {/* History */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#BC002D",marginBottom:"1rem",fontSize:"1.3rem"}}>📜 History & Origins</h3>
              <p style={{lineHeight:1.8,color:"#444",marginBottom:"1rem"}}>Japanese culinary history spans over 2,000 years, shaped by geography, religion and foreign influence. The Yayoi period (300 BCE) introduced rice cultivation from China, establishing rice as the sacred cornerstone of Japanese culture. Buddhism's arrival in the 6th century brought vegetarianism and refined the art of preparing plant-based foods.</p>
              <p style={{lineHeight:1.8,color:"#444",marginBottom:"1rem"}}>The Edo period (1603–1868) saw the flowering of Japanese cuisine in its modern form — sushi stalls appeared on Tokyo streets, soba and udon shops opened on every corner, and the concept of kaiseki (multi-course haute cuisine) developed in Kyoto's tea houses. The Meiji era (1868) brought Western influence, creating yoshoku (Western-style Japanese food) including katsu, curry and hambagu.</p>
              <p style={{lineHeight:1.8,color:"#444"}}>Today Japan has more Michelin-starred restaurants than any other country — a testament to a culinary culture that values perfection, technique and the profound philosophy that a meal should nourish body, mind and soul simultaneously.</p>
            </div>

            {/* Philosophy */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#BC002D",marginBottom:"1rem",fontSize:"1.3rem"}}>🧘 Philosophy: Washoku & Wabi-Sabi</h3>
              <p style={{lineHeight:1.8,color:"#444",marginBottom:"1rem"}}>Washoku — traditional Japanese food culture — is built on five principles: five flavours (sweet, sour, salty, bitter, umami), five colours (white, red, yellow, green, black) and five cooking methods (raw, simmered, grilled, steamed, fried). A traditional Japanese meal achieves all five of each.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem",marginTop:"1rem"}}>
                {[
                  {title:"Ichiju Sansai",desc:"One soup, three sides — the traditional Japanese meal structure built around steamed rice"},
                  {title:"Mottainai",desc:"Zero waste philosophy — every part of every ingredient is used with reverence"},
                  {title:"Shun",desc:"Eating with the seasons — ingredients at their peak ripeness hold spiritual significance"},
                  {title:"Ma",desc:"The art of negative space — empty space on a plate is as important as what fills it"},
                  {title:"Umami",desc:"The fifth taste — discovered by Japanese scientist Kikunae Ikeda in 1908 from kombu dashi"},
                  {title:"Omotenashi",desc:"Selfless hospitality — anticipating a guest's needs before they are expressed"},
                ].map(p=>(
                  <div key={p.title} style={{background:"#FDF8F8",borderRadius:"8px",padding:"1rem",borderLeft:"3px solid #BC002D"}}>
                    <strong style={{color:"#BC002D",fontSize:"0.9rem"}}>{p.title}</strong>
                    <p style={{fontSize:"0.82rem",color:"#666",marginTop:"0.3rem",lineHeight:1.6}}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Cuisines */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#BC002D",marginBottom:"1rem",fontSize:"1.3rem"}}>🗾 Regional Cuisines of Japan</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1rem"}}>
                {[
                  {region:"🏙️ Tokyo (Kanto)",specialty:"Shoyu ramen, monjayaki, edomae sushi, tempura",note:"Bold, soy-forward flavours — the capital's cuisine reflects its fast-paced energy"},
                  {region:"🌸 Kyoto (Kansai)",specialty:"Kaiseki, yudofu, obanzai, kyo-wagashi",note:"The most refined and elegant cuisine — light broths, seasonal vegetables, centuries-old traditions"},
                  {region:"🐙 Osaka (Kansai)",specialty:"Takoyaki, okonomiyaki, kushikatsu, udon",note:"Kuidaore — 'eat until you drop' — Osaka is Japan's street food capital"},
                  {region:"🍜 Fukuoka (Kyushu)",specialty:"Tonkotsu ramen, mentaiko, hakata udon, motsu nabe",note:"Home of tonkotsu — the richest, creamiest ramen broth in Japan"},
                  {region:"🦀 Hokkaido",specialty:"Miso ramen, jingisukan, seafood, corn butter",note:"Japan's coldest, richest prefecture — famous for dairy, seafood and hearty winter dishes"},
                  {region:"🍡 Nagoya (Chubu)",specialty:"Hitsumabushi, miso katsu, tebasaki, kishimen",note:"Nagoya-meshi — uniquely bold flavours using hatcho miso and distinctive local ingredients"},
                ].map(r=>(
                  <div key={r.region} style={{background:"#FDF8F8",borderRadius:"10px",padding:"1.2rem",border:"1px solid #f0e8e8"}}>
                    <strong style={{color:"#BC002D",display:"block",marginBottom:"0.4rem"}}>{r.region}</strong>
                    <div style={{fontSize:"0.8rem",color:"#C9922A",marginBottom:"0.4rem",fontWeight:600}}>{r.specialty}</div>
                    <p style={{fontSize:"0.78rem",color:"#666",lineHeight:1.5}}>{r.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Essential Ingredients */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#BC002D",marginBottom:"1rem",fontSize:"1.3rem"}}>🥢 Essential Ingredients</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"0.8rem"}}>
                {[
                  {name:"Dashi",desc:"The foundation stock — kombu + katsuobushi — the soul of Japanese cooking"},
                  {name:"Miso",desc:"Fermented soybean paste — white (shiro), red (aka) and mixed (awase) varieties"},
                  {name:"Soy Sauce (Shoyu)",desc:"Brewed from soybeans and wheat — light, dark and tamari varieties"},
                  {name:"Mirin",desc:"Sweet rice wine — adds gloss and gentle sweetness to sauces and glazes"},
                  {name:"Sake",desc:"Rice wine used in cooking to eliminate fishy odours and add depth"},
                  {name:"Rice Vinegar",desc:"Mild, slightly sweet — essential for sushi rice and sunomono"},
                  {name:"Wasabi",desc:"Japanese mountain horseradish — pungent, clean heat unlike chilli"},
                  {name:"Nori",desc:"Dried seaweed sheets — used in sushi, onigiri and as a garnish"},
                  {name:"Katsuobushi",desc:"Dried, fermented and smoked skipjack tuna — shaved into delicate flakes for dashi"},
                  {name:"Kombu",desc:"Dried kelp — the other half of dashi, rich in natural glutamates"},
                  {name:"Mochigome",desc:"Glutinous rice used for mochi, sekihan and wagashi sweets"},
                  {name:"Yuzu",desc:"Japanese citrus — intensely aromatic zest used in sauces, dressings and desserts"},
                ].map(i=>(
                  <div key={i.name} style={{background:"#FDF8F8",borderRadius:"8px",padding:"0.9rem",border:"1px solid #f0e8e8"}}>
                    <strong style={{color:"#BC002D",fontSize:"0.85rem",display:"block"}}>{i.name}</strong>
                    <p style={{fontSize:"0.75rem",color:"#666",marginTop:"0.3rem",lineHeight:1.5}}>{i.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sushi Guide */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#BC002D",marginBottom:"1rem",fontSize:"1.3rem"}}>🍣 The World of Sushi</h3>
              <p style={{lineHeight:1.8,color:"#444",marginBottom:"1.2rem"}}>Sushi is not just raw fish — it is the precise combination of shari (vinegared rice) with neta (toppings or fillings). The word sushi refers to the seasoned rice, not the fish. Modern sushi as we know it was invented in Edo-period Tokyo as a fast food sold from street stalls.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"0.8rem"}}>
                {[
                  {type:"Nigiri",desc:"Hand-pressed rice oval topped with fish or seafood — the purest sushi form"},
                  {type:"Maki",desc:"Nori-wrapped rice and filling rolls — the most globally recognised"},
                  {type:"Uramaki",desc:"Inside-out rolls with rice on the outside — California roll style"},
                  {type:"Temaki",desc:"Hand-rolled cone of nori — casual, fun and made to order"},
                  {type:"Chirashi",desc:"Scattered sushi — toppings arranged beautifully over a bowl of rice"},
                  {type:"Oshi",desc:"Pressed sushi from Osaka — rice and toppings pressed in a wooden mould"},
                  {type:"Inari",desc:"Vinegared rice stuffed into sweet fried tofu pouches"},
                  {type:"Sashimi",desc:"Pure raw fish without rice — the highest expression of seafood freshness"},
                ].map(s=>(
                  <div key={s.type} style={{background:"#FDF8F8",borderRadius:"8px",padding:"0.9rem",borderLeft:"3px solid #BC002D"}}>
                    <strong style={{color:"#BC002D",fontSize:"0.85rem"}}>{s.type}</strong>
                    <p style={{fontSize:"0.75rem",color:"#666",marginTop:"0.3rem",lineHeight:1.5}}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ramen Guide */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#BC002D",marginBottom:"1rem",fontSize:"1.3rem"}}>🍜 The Four Great Ramen Styles</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem"}}>
                {[
                  {style:"Shoyu (Soy)",origin:"Tokyo",broth:"Clear, amber chicken-soy broth",toppings:"Chashu, narutomaki, menma bamboo, nori",note:"The oldest and most classic style — delicate yet complex"},
                  {style:"Shio (Salt)",origin:"Hakodate",broth:"Pale golden, the clearest of all ramen broths",toppings:"Butter corn, seafood, light chashu",note:"The most delicate style — the quality of the dashi is everything"},
                  {style:"Miso",origin:"Sapporo",broth:"Rich, hearty miso-based broth with pork fat",toppings:"Corn, butter, bean sprouts, ground pork",note:"Hokkaido's cold winters inspired this robust, warming bowl"},
                  {style:"Tonkotsu (Pork Bone)",origin:"Fukuoka",broth:"Creamy, opaque white from 12+ hours of boiling",toppings:"Chashu, soft egg, nori, black garlic oil",note:"The richest, most indulgent ramen — beloved worldwide"},
                ].map(r=>(
                  <div key={r.style} style={{background:"#FDF8F8",borderRadius:"10px",padding:"1.2rem",border:"1px solid #f0e8e8"}}>
                    <strong style={{color:"#BC002D",fontSize:"0.95rem",display:"block"}}>{r.style}</strong>
                    <div style={{fontSize:"0.75rem",color:"#888",marginBottom:"0.4rem"}}>Origin: {r.origin}</div>
                    <div style={{fontSize:"0.8rem",color:"#444",marginBottom:"0.3rem"}}><strong>Broth:</strong> {r.broth}</div>
                    <div style={{fontSize:"0.78rem",color:"#666",marginBottom:"0.4rem"}}><strong>Toppings:</strong> {r.toppings}</div>
                    <p style={{fontSize:"0.75rem",color:"#888",lineHeight:1.5,fontStyle:"italic"}}>{r.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dining Customs */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#BC002D",marginBottom:"1rem",fontSize:"1.3rem"}}>🥢 Dining Customs & Etiquette</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"0.8rem"}}>
                {[
                  {rule:"Itadakimasu",desc:"Said before every meal — literally 'I humbly receive' — expressing gratitude to all who created the food"},
                  {rule:"Gochisousama",desc:"Said after eating — 'it was a feast' — thanking the chef and those who prepared the meal"},
                  {rule:"Slurping",desc:"Slurping ramen and noodles is encouraged — it cools the noodles and signals appreciation to the chef"},
                  {rule:"Chopstick etiquette",desc:"Never stab food, pass food chopstick to chopstick, or stand chopsticks upright in rice — all associated with funeral rites"},
                  {rule:"Pouring drinks",desc:"Pour for others before yourself — it is rude to pour your own drink when others are empty"},
                  {rule:"Oshibori",desc:"The wet towel provided before meals is only for cleaning hands — never use it to wipe your face"},
                  {rule:"Soy sauce",desc:"Never pour soy sauce directly over rice — use a small dish for dipping. Use sparingly on sushi"},
                  {rule:"Izakaya culture",desc:"Japanese pub dining where food and drink are inseparable — food is ordered to complement drinks throughout the evening"},
                ].map(c=>(
                  <div key={c.rule} style={{background:"#FDF8F8",borderRadius:"8px",padding:"0.9rem",borderLeft:"3px solid #C9922A"}}>
                    <strong style={{color:"#C9922A",fontSize:"0.85rem",display:"block"}}>{c.rule}</strong>
                    <p style={{fontSize:"0.78rem",color:"#666",marginTop:"0.3rem",lineHeight:1.6}}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasonal & Festival Foods */}
            <div style={{background:"white",borderRadius:"12px",padding:"1.8rem",marginBottom:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#BC002D",marginBottom:"1rem",fontSize:"1.3rem"}}>🌸 Seasonal & Festival Foods</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0.8rem"}}>
                {[
                  {season:"🌸 Spring (Haru)",foods:"Sakura mochi, hanami dango, bamboo shoots, tai (sea bream) for New Year"},
                  {season:"☀️ Summer (Natsu)",foods:"Kakigori (shaved ice), hiyashi chuka, somen noodles, unagi for midsummer stamina"},
                  {season:"🍁 Autumn (Aki)",foods:"Sanma (pacific saury), matsutake mushroom, chestnuts, tsukimi dango for moon viewing"},
                  {season:"❄️ Winter (Fuyu)",foods:"Nabe hot pot, osechi ryori (New Year), ozoni mochi soup, warming oden"},
                  {season:"🎋 Tanabata (July 7)",foods:"Somen noodles symbolising the Milky Way — eaten on the star festival"},
                  {season:"🎑 Otsukimi",foods:"Tsukimi dango — white rice dumplings piled in a pyramid to honour the autumn moon"},
                ].map(s=>(
                  <div key={s.season} style={{background:"#FDF8F8",borderRadius:"8px",padding:"0.9rem",border:"1px solid #f0e8e8"}}>
                    <strong style={{color:"#BC002D",fontSize:"0.85rem",display:"block",marginBottom:"0.3rem"}}>{s.season}</strong>
                    <p style={{fontSize:"0.78rem",color:"#666",lineHeight:1.5}}>{s.foods}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Must Try */}
            <div style={{background:"linear-gradient(135deg,#BC002D,#8B001F)",borderRadius:"12px",padding:"1.8rem",marginBottom:"2rem",color:"white"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",marginBottom:"1rem",fontSize:"1.3rem"}}>⭐ 10 Must-Try Japanese Dishes</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0.6rem"}}>
                {[
                  "🍣 Omakase Sushi — trust the chef completely",
                  "🍜 Tonkotsu Ramen — Fukuoka's creamy masterpiece",
                  "🍱 Bento Box — the art of portable Japanese meals",
                  "🥩 Wagyu Sukiyaki — the finest beef in the world",
                  "🍡 Takoyaki — Osaka's irresistible octopus balls",
                  "🍛 Katsu Curry — Japan's most beloved comfort food",
                  "🫕 Shabu-Shabu — paper-thin beef swished in broth",
                  "🎂 Matcha Cheesecake — Japan's jiggly dessert wonder",
                  "🍢 Yakitori — charcoal-grilled chicken skewers",
                  "🍠 Oden — winter's ultimate simmered comfort pot",
                ].map((d,i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,0.12)",borderRadius:"8px",padding:"0.7rem",fontSize:"0.82rem",lineHeight:1.5}}>{d}</div>
                ))}
              </div>
            </div>

            <div style={{textAlign:"center",paddingBottom:"2rem"}}>
              <button onClick={()=>{setJapaneseGuidePage(false);setJapanesePage(true);}} style={{background:"#BC002D",color:"white",border:"none",padding:"0.9rem 2.5rem",borderRadius:"25px",fontSize:"1rem",fontWeight:600,cursor:"pointer"}}>
                🍱 Browse All Japanese Recipes →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SEARCH MODAL ── */}
      {searchModal && (
        <div className="modal-overlay" onClick={()=>setSearchModal(false)}>
          <div className="modal-wrapper" onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setSearchModal(false)}>✕</button>
            <div className="search-modal">
              <div className="search-modal-header">
                <h3>Results for "<em style={{color:"var(--saffron)"}}>{searchQuery}</em>"</h3>
                <span>{searchResults.length} found {searchLoading&&"· AI generating more..."}</span>
              </div>
              {searchLoading&&searchResults.length===0?<div className="search-loading"><div className="typing"><span/><span/><span/></div></div>:searchResults.length===0?<div className="search-empty"><p style={{fontSize:"2rem"}}>🔍</p><p>No recipes found.</p></div>:(
                <div className="search-results-grid">
                  {searchResults.map((r,i)=>(
                    <div key={i} className="search-result-card" onClick={()=>{setSearchModal(false);setRecipeModal(r);}}>
                      <div className="search-result-img"><img src={r.img} alt={r.title} onError={e=>e.target.src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80"}/></div>
                      <div className="search-result-body">
                        <div className="recipe-chef">{r.chef} {r.isAI&&<span className="ai-badge">✨ AI</span>}</div>
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

      {/* ── NAV ── */}
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div className="nav-logo" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
          <span style={{fontSize:"1.5rem"}}>🍴</span>
          <span className="logo-text">Fusion <span className="logo-ai">Chef</span></span>
        </div>
        <ul className="nav-links">
          {navLinks.map(l=>(<li key={l.label}><a onClick={()=>scrollToSection(l.id)}>{l.label}</a></li>))}
        </ul>
        <div className="nav-right">
          <button className="btn-ai" onClick={()=>setCuisineExplorer(true)}>🌍 Explore Cuisines</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-slides">
          {heroSlides.map((s,i)=>(
            <div key={i} className={`hero-slide${i===slide?" active":""}`} style={{backgroundImage:`url(${s.bg})`}}/>
          ))}
        </div>
        <div className="hero-overlay"/>
        <div className="hero-content" key={slide}>
          <span className="hero-tag">{heroSlides[slide].tag}</span>
          <h1>{heroSlides[slide].title}</h1>
          <p>{heroSlides[slide].desc}</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={()=>setCuisineExplorer(true)}>Explore Recipes</button>
            <button className="btn-outline" onClick={()=>{setRecipeDB(true);}}>📖 Recipe Database</button>
          </div>
        </div>
        <div className="hero-dots">
          {heroSlides.map((_,i)=>(<button key={i} className={`hero-dot${i===slide?" active":""}`} onClick={()=>setSlide(i)}/>))}
        </div>
      </section>

      {/* ── WORLD CUISINES ── */}
      <section className="section categories-section" id="categories">
        <div className="section-header">
          <div className="section-tag">🌍 Worldwide</div>
          <h2 className="section-title">Explore <em>World Cuisines</em></h2>
          <p className="section-sub">Click any cuisine to explore authentic recipes from around the globe.</p>
        </div>
        <div className="cat-grid">
          {[
            { name: "🇮🇳 Indian", desc: "biryani, butter chicken, dosa", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", id: "indian" },
            { name: "🇨🇳 Chinese", desc: "kung pao, dim sum, Peking duck", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", id: "chinese" },
            { name: "🇯🇵 Japanese", desc: "ramen, sushi, teriyaki", img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", id: "japanese" },
            { name: "🇹🇭 Thai", desc: "pad thai, green curry, satay", img: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&q=80", id: "thai" },
            { name: "🇰🇷 Korean", desc: "bibimbap, BBQ, kimchi", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80", id: "korean" },
            { name: "🇻🇳 Vietnamese", desc: "pho, banh mi, fresh rolls", img: "https://images.unsplash.com/photo-1582878826629-33b7f57b2a3c?w=400&q=80", id: "vietnamese" },
            { name: "🇮🇹 Italian", desc: "pasta, pizza, risotto", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80", id: "coming" },
            { name: "🇲🇽 Mexican", desc: "tacos, enchiladas, guacamole", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80", id: "coming" },
            { name: "🇫🇷 French", desc: "croissants, coq au vin", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", id: "coming" },
            { name: "🇬🇷 Greek", desc: "moussaka, souvlaki", img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80", id: "coming" },
            { name: "🇲🇦 Moroccan", desc: "tagine, couscous", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80", id: "coming" },
            { name: "🇪🇸 Spanish", desc: "paella, tapas, churros", img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&q=80", id: "coming" },
          ].map(c=>(
            <div key={c.name} className="cat-card" onClick={()=>{
              if(c.id==="indian") setIndianPage(true);
              else if(c.id==="chinese") setChinesePage(true);
              else if(c.id==="japanese") setJapanesePage(true);
              else if(c.id==="thai") setThaiPage(true);
              else if(c.id==="korean") setKoreanPage(true);
              else if(c.id==="vietnamese") setVietnamesePage(true);
              else alert("🚧 "+c.name+" recipes coming soon!");
            }}>
              <img src={c.img} alt={c.name}/>
              <div className="cat-overlay"/>
              <div className="cat-info">
                <h3>{c.name}</h3><span>{c.desc}</span>
                {c.id!=="coming"?<span style={{display:"inline-block",background:"var(--saffron)",color:"white",fontSize:"0.65rem",padding:"0.15rem 0.5rem",borderRadius:"10px",marginTop:"0.3rem"}}>✅ Available Now</span>:<span style={{display:"inline-block",background:"rgba(255,255,255,0.2)",color:"white",fontSize:"0.65rem",padding:"0.15rem 0.5rem",borderRadius:"10px",marginTop:"0.3rem"}}>🚧 Coming Soon</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRENDING ── */}
      <section className="section trending-section" id="trending">
        <div className="section-header">
          <div className="section-tag">🔥 Hot Right Now</div>
          <h2 className="section-title">Trending <em>This Week</em></h2>
          <p className="section-sub">Community favorites, curated fresh every week by our AI.</p>
        </div>
        <div className="trending-scroll" id="recipes">
          {trending.map((r,i)=>(
            <div key={i} className="recipe-card" onClick={()=>setRecipeModal(r)}>
              <div className="recipe-card-img">
                <img src={r.img} alt={r.title}/>
                <span className={`recipe-badge ${r.difficulty}`}>{r.difficulty.charAt(0).toUpperCase()+r.difficulty.slice(1)}</span>
                <button className={`heart-btn${liked[i]?" liked":""}`} onClick={e=>{e.stopPropagation();setLiked(l=>({...l,[i]:!l[i]}));}}>
                  {liked[i]?"❤️":"🤍"}
                </button>
              </div>
              <div className="recipe-card-body">
                <div className="recipe-chef">{r.chef}</div>
                <h3>{r.title}</h3>
                <div className="recipe-meta"><span>⏱ {r.time}</span><span>⭐ 4.{7+(i%3)}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHEFS ── */}
      <section className="section chefs-section" id="chefs">
        <div className="section-header">
          <div className="section-tag">Meet the Team</div>
          <h2 className="section-title">Featured <em>Chefs</em></h2>
          <p className="section-sub">World-class culinary talent, curated and celebrated by Fusion Chef.</p>
        </div>
        <div className="chefs-grid">
          {chefs.map(c=>(
            <div key={c.name} className="chef-card" onClick={()=>setChefModal(c)}>
              <img src={c.img} alt={c.name} className="chef-avatar"/>
              <h3>{c.name}</h3>
              <div className="chef-specialty">{c.specialty}</div>
              <div className="chef-followers">{c.followers} followers</div>
              <div className="chef-dish">{c.dish}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter-section">
        <h2>Get Weekly Recipes, Chef Tips & AI Picks</h2>
        <p>Join 420,000+ food lovers. Unsubscribe anytime.</p>
        {subscribed?(
          <p style={{color:"white",fontWeight:600,fontSize:"1.1rem"}}>🎉 You're in! Welcome to the Fusion Chef family.</p>
        ):(
          <div className="newsletter-form">
            <input className="newsletter-input" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)}/>
            <button className="newsletter-btn" onClick={()=>{if(email)setSubscribed(true);}}>Subscribe →</button>
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Fusion <em>Chef</em></h2>
            <p>Where every meal tells a story. AI-powered recipes, world-class chefs, and culinary inspiration — all in one place.</p>
            <div className="footer-socials">
              {["📘","📸","🐦","▶️","📌"].map((s,i)=><a key={i} className="social-btn" href="#">{s}</a>)}
            </div>
          </div>
          <div className="footer-col"><h4>Recipes</h4><ul>{["Breakfast","Lunch","Dinner","Baking","Vegetarian","Healthy"].map(l=><li key={l}><a href="#" onClick={()=>scrollToSection("categories")}>{l}</a></li>)}</ul></div>
          <div className="footer-col"><h4>Discover</h4><ul>{[["Chefs","chefs"],["Trending","trending"],["Cuisines","cuisine-explorer"],["Recipes","recipe-db"]].map(([l,id])=><li key={l}><a href="#" onClick={()=>scrollToSection(id)}>{l}</a></li>)}</ul></div>
          <div className="footer-col"><h4>Company</h4><ul>{["About Us","Careers","Press","Contact","Privacy","Terms"].map(l=><li key={l}><a href="#">{l}</a></li>)}</ul></div>
        </div>
        <div className="footer-bottom">
          © 2026 <strong style={{color:"var(--saffron)"}}>Fusion Chef</strong> by <strong style={{color:"var(--saffron)"}}>Anuj Vikas Lonkar</strong>. All rights reserved.
        </div>
      </footer>
    </>
  );
}


// ─── INDIVIDUAL RECIPE PAGE ───────────────────────────────────────────────────
function RecipePage({ allData }) {
  const { cuisine, category, dish } = useParams();
  const navigate = useNavigate();

  const dataSet = allData[cuisine] || [];
  const recipe = dataSet.find(
    r => toSlug(r.dish_name) === dish && toSlug(r.category) === category
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!recipe) return;
    const BASE_URL = "https://fusionchefy.vercel.app";
    const pageUrl = `${BASE_URL}/cuisine/${cuisine}/${category}/${dish}`;
    const title = `${recipe.dish_name} Recipe – Authentic ${cuisine.charAt(0).toUpperCase()+cuisine.slice(1)} Cuisine | Fusion Chef`;
    const description = recipe.short_description || `Learn how to make authentic ${recipe.dish_name} from ${cuisine} cuisine.`;
    document.title = title;
    const setMeta = (attr, key, value) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", value);
    };
    setMeta("name","description",description);
    setMeta("property","og:title",title);
    setMeta("property","og:description",description);
    setMeta("property","og:image",recipe.img||`${BASE_URL}/og-image.jpg`);
    setMeta("property","og:url",pageUrl);
    setMeta("property","og:type","article");
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel","canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", pageUrl);
    const schema = {
      "@context":"https://schema.org","@type":"Recipe",
      "name":recipe.dish_name,"description":description,
      "image":[recipe.img||""],"author":{"@type":"Organization","name":"Fusion Chef","url":BASE_URL},
      "prepTime":`PT${recipe.prep_time_minutes}M`,"cookTime":`PT${recipe.cook_time_minutes}M`,
      "totalTime":`PT${recipe.prep_time_minutes+recipe.cook_time_minutes}M`,
      "recipeYield":`${recipe.servings} servings`,"recipeCategory":recipe.category,
      "recipeCuisine":cuisine.charAt(0).toUpperCase()+cuisine.slice(1),
      "recipeIngredient":(recipe.ingredients||[]).map(i=>`${i.quantity} ${i.unit} ${i.name}`.trim()),
      "recipeInstructions":(recipe.preparation_steps||[]).map((step,idx)=>({ "@type":"HowToStep","position":idx+1,"text":step })),
    };
    let schemaEl = document.getElementById("recipe-schema");
    if (!schemaEl) { schemaEl = document.createElement("script"); schemaEl.id="recipe-schema"; schemaEl.type="application/ld+json"; document.head.appendChild(schemaEl); }
    schemaEl.textContent = JSON.stringify(schema);
    gtagEvent("page_view", { page_title: title, page_location: pageUrl });
    return () => { const s = document.getElementById("recipe-schema"); if(s) s.remove(); };
  }, [recipe]);

  if (!recipe) {
    return (
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#FFF8EE",fontFamily:"'DM Sans',sans-serif"}}>
        <div style={{fontSize:"4rem",marginBottom:"1rem"}}>🍽</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",marginBottom:"0.5rem"}}>Recipe not found</h2>
        <p style={{color:"#7A6A55",marginBottom:"1.5rem"}}>This dish might have moved or doesn't exist yet.</p>
        <button onClick={()=>{window.history.length>1?navigate(-1):navigate("/")}} style={{background:"#E8621A",color:"white",border:"none",padding:"0.8rem 2rem",borderRadius:"24px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>← Back to Fusion Chef</button>
      </div>
    );
  }

  const emojis = {"Appetizers":"🥟","Soups":"🍜","Main Courses":"🍛","Breads":"🫓","Rice Preparations":"🍚","Desserts":"🍮","Beverages":"☕","Tea":"🍵","Coffee":"☕","Salads":"🥗","Sides":"🫙"};

  return (
    <div style={{minHeight:"100vh",background:"#FFF8EE",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');:root{--saffron:#E8621A;--saffron-light:#F47B35;--cream:#FFF8EE;--cream-dark:#F5EDDB;--charcoal:#1C1C1C;--text-muted:#7A6A55;--green:#4A7C59;--gold:#C9922A;}`}</style>
      <div style={{background:"#1C1C1C",padding:"1rem 2rem",display:"flex",alignItems:"center",gap:"1rem",position:"sticky",top:0,zIndex:10}}>
        <button onClick={()=>{window.history.length>1?navigate(-1):navigate("/")}} style={{background:"transparent",border:"2px solid rgba(255,255,255,0.3)",color:"white",padding:"0.4rem 1rem",borderRadius:"24px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem"}}>← Back</button>
        <span style={{color:"#E8621A",fontSize:"1.4rem"}}>🍴</span>
        <span onClick={()=>navigate("/")} style={{fontFamily:"'Playfair Display',serif",color:"white",fontSize:"1.2rem",cursor:"pointer"}}>Fusion <em style={{color:"#E8621A"}}>Chef</em></span>
      </div>
      <div style={{height:"340px",overflow:"hidden",position:"relative",background:"#1C1C1C"}}>
        {recipe.img?<img src={recipe.img} alt={recipe.dish_name} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.85}}/>:<div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"8rem"}}>{emojis[recipe.category]||"🍽"}</div>}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(28,28,28,0.85) 0%,transparent 60%)"}}/>
        <div style={{position:"absolute",bottom:"2rem",left:"2.5rem",color:"white"}}>
          <div style={{display:"inline-block",background:"#E8621A",fontSize:"0.72rem",fontWeight:700,padding:"0.25rem 0.8rem",borderRadius:"12px",marginBottom:"0.5rem",textTransform:"uppercase",letterSpacing:"0.08em"}}>{recipe.category}</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,4vw,3rem)",lineHeight:1.15,textShadow:"0 2px 20px rgba(0,0,0,0.5)"}}>{recipe.dish_name}</h1>
          <div style={{display:"flex",gap:"1rem",marginTop:"0.6rem",fontSize:"0.85rem",opacity:0.85,flexWrap:"wrap"}}>
            <span>⏱ {recipe.prep_time_minutes+recipe.cook_time_minutes} min total</span>
            <span>🍽 {recipe.servings} servings</span>
            <span style={{background:recipe.difficulty_level==="easy"?"#4A7C59":recipe.difficulty_level==="medium"?"#C9922A":"#C0392B",padding:"0.1rem 0.6rem",borderRadius:"10px",fontSize:"0.72rem",fontWeight:700,textTransform:"capitalize"}}>{recipe.difficulty_level}</span>
          </div>
        </div>
      </div>
      <div style={{maxWidth:"860px",margin:"0 auto",padding:"2.5rem 1.5rem"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:"0.5rem",marginBottom:"2rem"}}>
          {(recipe.dietary_tags||[]).map((t,i)=><span key={i} style={{background:"rgba(74,124,89,0.15)",color:"#4A7C59",fontSize:"0.78rem",padding:"0.3rem 0.9rem",borderRadius:"20px",fontWeight:600}}>{t}</span>)}
          {(recipe.flavor_profile||[]).map((t,i)=><span key={i} style={{background:"#F5EDDB",color:"#1C1C1C",fontSize:"0.78rem",padding:"0.3rem 0.9rem",borderRadius:"20px"}}>{t}</span>)}
          {(recipe.tags||[]).slice(0,4).map((t,i)=><span key={i} style={{background:"rgba(232,98,26,0.1)",color:"#E8621A",fontSize:"0.78rem",padding:"0.3rem 0.9rem",borderRadius:"20px"}}>{t}</span>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem"}}>
          <div>
            <h2 style={{fontFamily:"'Playfair Display',serif",color:"#E8621A",fontSize:"1.4rem",marginBottom:"1rem",paddingBottom:"0.5rem",borderBottom:"2px solid #F5EDDB"}}>🧂 Ingredients</h2>
            <ul style={{listStyle:"none",padding:0}}>
              {(recipe.ingredients||[]).map((ing,i)=>(
                <li key={i} style={{padding:"0.5rem 0",borderBottom:"1px solid #F5EDDB",fontSize:"0.9rem",color:"#1C1C1C",display:"flex",justifyContent:"space-between"}}>
                  <span>{ing.name}</span><span style={{color:"#7A6A55",fontWeight:600}}>{ing.quantity} {ing.unit}</span>
                </li>
              ))}
            </ul>
          </div>
          {recipe.nutrition_estimate&&Object.keys(recipe.nutrition_estimate).length>0&&(
            <div>
              <h2 style={{fontFamily:"'Playfair Display',serif",color:"#E8621A",fontSize:"1.4rem",marginBottom:"1rem",paddingBottom:"0.5rem",borderBottom:"2px solid #F5EDDB"}}>📊 Nutrition</h2>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.8rem"}}>
                {Object.entries(recipe.nutrition_estimate).map(([k,v])=>(
                  <div key={k} style={{background:"#F5EDDB",borderRadius:"10px",padding:"0.8rem",textAlign:"center"}}>
                    <strong style={{display:"block",fontSize:"1.1rem",color:"#E8621A"}}>{v}</strong>
                    <span style={{fontSize:"0.72rem",color:"#7A6A55"}}>{k.replace(/_/g," ")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{marginTop:"2.5rem"}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",color:"#E8621A",fontSize:"1.4rem",marginBottom:"1.2rem",paddingBottom:"0.5rem",borderBottom:"2px solid #F5EDDB"}}>👨‍🍳 Instructions</h2>
          <ol style={{listStyle:"none",padding:0}}>
            {(recipe.preparation_steps||[]).map((step,i)=>(
              <li key={i} style={{padding:"1rem 0 1rem 3.5rem",borderBottom:"1px solid #F5EDDB",position:"relative",fontSize:"0.95rem",lineHeight:1.7,color:"#1C1C1C"}}>
                <span style={{position:"absolute",left:0,top:"1rem",width:"28px",height:"28px",background:"#E8621A",color:"white",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.78rem",fontWeight:700}}>{i+1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        {recipe.chef_notes&&<div style={{marginTop:"2rem",background:"rgba(232,98,26,0.08)",border:"1px solid rgba(232,98,26,0.2)",borderRadius:"14px",padding:"1.4rem"}}><h3 style={{fontFamily:"'Playfair Display',serif",color:"#E8621A",marginBottom:"0.6rem"}}>💡 Chef Notes</h3><p style={{fontSize:"0.92rem",color:"#1C1C1C",lineHeight:1.7}}>{recipe.chef_notes}</p></div>}
        {recipe.serving_suggestions&&<div style={{marginTop:"1.5rem",background:"#F5EDDB",borderRadius:"14px",padding:"1.4rem"}}><h3 style={{fontFamily:"'Playfair Display',serif",color:"#1C1C1C",marginBottom:"0.6rem"}}>🍽 Serving Suggestions</h3><p style={{fontSize:"0.92rem",color:"#7A6A55",lineHeight:1.7}}>{recipe.serving_suggestions}</p></div>}
        <div style={{marginTop:"2.5rem",background:"#1C1C1C",borderRadius:"16px",padding:"2rem",textAlign:"center"}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",color:"white",marginBottom:"0.5rem"}}>Share this recipe 🔗</h3>
          <input readOnly value={window.location.href} onClick={e=>{e.target.select();navigator.clipboard.writeText(window.location.href);}} style={{width:"100%",padding:"0.8rem 1.2rem",borderRadius:"8px",border:"none",fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",marginBottom:"0.5rem",cursor:"pointer"}}/>
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:"0.75rem"}}>Click the URL above to copy it</p>
        </div>
        <div style={{textAlign:"center",marginTop:"2rem"}}>
          <button onClick={()=>{window.history.length>1?navigate(-1):navigate("/")}} style={{background:"#E8621A",color:"white",border:"none",padding:"0.9rem 2.5rem",borderRadius:"30px",fontSize:"1rem",fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>← Explore More Recipes</button>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP WITH ROUTER ─────────────────────────────────────────────────────
function AppWithRouter() {
  const allData = {
    indian: indianCuisineData,
    maharashtra: maharashtraCuisineData,
    punjab: punjabCuisineData,
    chinese: chineseCuisineData,
    japanese: japaneseCuisineData,
    thai: thaiCuisineData,
    korean: koreanCuisineData,
    vietnamese: vietnameseCuisineData,
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cuisine/:cuisine/:category/:dish" element={<RecipePage allData={allData} />} />
        <Route path="*" element={<FusionChefAI />} />
      </Routes>
    </BrowserRouter>
  );
}

export { toSlug };
export default AppWithRouter;
