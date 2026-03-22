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
];

// ─────────────────────────────────────────────────────────────────────────────
const japaneseCuisineData = [
  // ── APPETIZERS ──────────────────────────────────────────────────────────────
  {
    dish_name: "Gyoza (Pan-Fried Dumplings)",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 40,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Japanese dumplings with crispy bottoms and juicy pork-cabbage filling — distinct from Chinese jiaozi with their characteristic crescent shape and the steam-fry technique that creates a delicate crispy-chewy skin.",
    ingredients: [
      { name: "Gyoza wrappers", quantity: "30", unit: "pieces" },
      { name: "Ground pork", quantity: "250", unit: "g" },
      { name: "Napa cabbage", quantity: "200", unit: "g" },
      { name: "Garlic", quantity: "3", unit: "cloves" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sake", quantity: "1", unit: "tbsp" }
    ],
    preparation_steps: [
      "Salt and squeeze all water from cabbage. Mix with pork, garlic, ginger, soy, sake and sesame oil.",
      "Place filling on wrapper, fold in half and pleat one side against the flat side.",
      "Heat oil in a flat pan, add gyoza flat-side down and fry until golden (2-3 min).",
      "Add water to pan (it will sizzle dramatically), cover and steam 5-6 minutes.",
      "Uncover and fry until water evaporates and bottoms re-crisp. Serve immediately."
    ],
    chef_notes: "The distinct Japanese pleating technique (7-8 pleats on one side only) creates the characteristic moon shape. The steam-fry method gives both a crispy bottom and juicy filling.",
    serving_suggestions: "Serve with soy-rice vinegar dipping sauce and a touch of togarashi chili.",
    flavor_profile: ["crispy", "savory", "juicy", "garlicky"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
    tags: ["Izakaya", "Street Food", "Classic", "Pan-Fried"]
  },
  {
    dish_name: "Edamame with Sea Salt",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 2,
    cook_time_minutes: 5,
    servings: 4,
    short_description: "The perfect Japanese bar snack — young soybeans boiled or steamed in their pods and finished with flaky sea salt. Simple, addictive and essential at every izakaya.",
    ingredients: [
      { name: "Fresh or frozen edamame in pods", quantity: "400", unit: "g" },
      { name: "Sea salt", quantity: "2", unit: "tsp" },
      { name: "Water", quantity: "1", unit: "litre" }
    ],
    preparation_steps: [
      "Rub edamame pods with salt to remove fuzz.",
      "Boil in well-salted water for 4-5 minutes until pods are bright green and beans are tender.",
      "Drain and immediately toss with flaky sea salt.",
      "Serve hot or at room temperature in the pods."
    ],
    chef_notes: "Rubbing salt into the pods before cooking not only seasons them from the outside but also helps retain their vibrant green color. Do not overcook — they should have a slight resistance when bitten.",
    serving_suggestions: "Serve as an izakaya snack with cold Japanese beer or sake.",
    flavor_profile: ["fresh", "clean", "savory", "nutty"],
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    tags: ["Izakaya", "Vegan", "Quick", "Bar Food"]
  },
  {
    dish_name: "Agedashi Tofu",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Delicate, barely-there crispy tofu served in a warm dashi broth — one of Japan's most elegant preparations. The thin cornstarch coating creates a translucent, almost ghostly crust that soaks up the umami broth.",
    ingredients: [
      { name: "Silken or soft tofu", quantity: "400", unit: "g" },
      { name: "Potato starch or cornstarch", quantity: "4", unit: "tbsp" },
      { name: "Dashi broth", quantity: "300", unit: "ml" },
      { name: "Mirin", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Grated daikon", quantity: "4", unit: "tbsp" },
      { name: "Grated ginger", quantity: "1", unit: "tsp" },
      { name: "Oil for frying", quantity: "1", unit: "cup" }
    ],
    preparation_steps: [
      "Drain tofu thoroughly. Press between paper towels for 30 minutes.",
      "Cut into cubes and dust lightly but completely in potato starch.",
      "Fry in 170°C oil for 3-4 minutes until a delicate golden crust forms.",
      "Warm dashi with mirin and soy sauce.",
      "Place fried tofu in bowls, pour warm dashi around (not over) the tofu. Top with grated daikon and ginger."
    ],
    chef_notes: "The dashi is poured around rather than over the tofu to preserve the delicate coating. Silken tofu is traditional but soft tofu is easier to handle for beginners.",
    serving_suggestions: "Serve as a refined starter at Japanese meals, garnished with katsuobushi (bonito flakes).",
    flavor_profile: ["delicate", "umami", "silky", "crispy"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    tags: ["Izakaya", "Vegetarian", "Elegant", "Traditional"]
  },
  {
    dish_name: "Takoyaki (Octopus Balls)",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Osaka's most beloved street food — spherical savory pancakes filled with tender octopus, crispy on the outside and molten-creamy inside, topped with okonomiyaki sauce, mayo and dancing bonito flakes.",
    ingredients: [
      { name: "Takoyaki flour or all-purpose flour", quantity: "200", unit: "g" },
      { name: "Octopus, cooked and diced", quantity: "200", unit: "g" },
      { name: "Eggs", quantity: "3", unit: "pieces" },
      { name: "Dashi broth", quantity: "600", unit: "ml" },
      { name: "Okonomiyaki sauce", quantity: "4", unit: "tbsp" },
      { name: "Japanese mayo", quantity: "4", unit: "tbsp" },
      { name: "Katsuobushi (bonito flakes)", quantity: "2", unit: "tbsp" },
      { name: "Aonori (green seaweed powder)", quantity: "1", unit: "tsp" }
    ],
    preparation_steps: [
      "Make thin batter with flour, eggs and dashi. Season with soy and ginger.",
      "Heat takoyaki pan and grease each cavity well.",
      "Pour batter to fill each cavity. Add octopus pieces and pickled ginger.",
      "When edges set, rotate balls 90° using skewers to form spheres. Keep rotating.",
      "Cook until fully spherical and golden. Serve topped with sauce, mayo, bonito and aonori."
    ],
    chef_notes: "A takoyaki pan (cast iron with hemispherical moulds) is essential. The rotating technique requires practice — the balls should be turned 4-6 times for perfect spheres.",
    serving_suggestions: "Serve immediately as a street food snack while piping hot.",
    flavor_profile: ["savory", "umami", "crispy-creamy", "smoky"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
    tags: ["Osaka", "Street Food", "Seafood", "Iconic"]
  },

  // ── SOUPS ────────────────────────────────────────────────────────────────────
  {
    dish_name: "Tonkotsu Ramen",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Soups",
    difficulty_level: "hard",
    prep_time_minutes: 60,
    cook_time_minutes: 720,
    servings: 4,
    short_description: "The king of Japanese ramen — a rich, creamy, opaque broth made from pork bones boiled for 12+ hours, served with thin noodles, chashu pork belly, soft-boiled eggs and nori. Hakata-style and utterly magnificent.",
    ingredients: [
      { name: "Pork neck bones", quantity: "2", unit: "kg" },
      { name: "Fresh ramen noodles", quantity: "400", unit: "g" },
      { name: "Pork belly for chashu", quantity: "600", unit: "g" },
      { name: "Soy sauce", quantity: "100", unit: "ml" },
      { name: "Mirin", quantity: "80", unit: "ml" },
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Nori sheets", quantity: "4", unit: "pieces" },
      { name: "Spring onions and bamboo shoots", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Blanch pork bones in boiling water 5 minutes, drain and scrub clean.",
      "Boil bones vigorously for 12 hours, adding water to maintain level. The vigorous boil creates the milky color.",
      "Roll pork belly tightly, tie with twine and braise in soy-mirin-sake for 2 hours. Rest overnight.",
      "Marinate soft-boiled eggs in chashu braising liquid for at least 6 hours.",
      "Strain broth, season with tare sauce. Serve over noodles topped with chashu, egg, nori and spring onions."
    ],
    chef_notes: "The SECRET to tonkotsu's milky white color and creamy texture is maintaining a VIGOROUS boil throughout — this emulsifies the collagen and fat. A gentle simmer produces clear, thin broth.",
    serving_suggestions: "Serve in pre-warmed bowls immediately. Customize with togarashi, garlic oil or extra tare.",
    flavor_profile: ["rich", "creamy", "umami", "porky", "deeply savory"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
    tags: ["Ramen", "Hakata", "Slow Cooked", "Iconic"]
  },
  {
    dish_name: "Miso Soup (Miso Shiru)",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 5,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Japan's soul food — a daily ritual soup of fermented miso paste dissolved in dashi broth with tofu and wakame. Deceptively simple, with profound nutritional depth and a deeply comforting umami flavor.",
    ingredients: [
      { name: "Dashi broth", quantity: "800", unit: "ml" },
      { name: "White or red miso paste", quantity: "4", unit: "tbsp" },
      { name: "Silken tofu", quantity: "150", unit: "g" },
      { name: "Wakame seaweed", quantity: "2", unit: "tbsp" },
      { name: "Spring onions", quantity: "2", unit: "stalks" }
    ],
    preparation_steps: [
      "Soak wakame in cold water 5 minutes until rehydrated. Drain.",
      "Bring dashi to a gentle simmer — do not boil.",
      "Dissolve miso paste in a ladle with a little broth, then stir into the pot.",
      "Add diced tofu and wakame. Heat briefly — do not boil after adding miso.",
      "Serve immediately garnished with spring onions."
    ],
    chef_notes: "NEVER boil miso soup — boiling kills the beneficial bacteria and dulls the complex fermented flavor. It should be heated gently and served immediately.",
    serving_suggestions: "Serve at every Japanese meal — breakfast, lunch and dinner.",
    flavor_profile: ["umami", "savory", "fermented", "warming"],
    dietary_tags: ["vegetarian", "dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    tags: ["Everyday", "Traditional", "Quick", "Healthy"]
  },

  // ── SALADS ───────────────────────────────────────────────────────────────────
  {
    dish_name: "Sunomono (Japanese Cucumber Salad)",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "Thinly sliced cucumbers in a sweet-tart rice vinegar dressing — a refreshing Japanese summer side dish with the delicate flavors of toasted sesame and shredded crab or shrimp.",
    ingredients: [
      { name: "Japanese cucumbers", quantity: "2", unit: "medium" },
      { name: "Rice vinegar", quantity: "3", unit: "tbsp" },
      { name: "Sugar", quantity: "1.5", unit: "tbsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Soy sauce", quantity: "1", unit: "tsp" },
      { name: "Sesame seeds", quantity: "2", unit: "tsp" },
      { name: "Crab sticks or cooked shrimp", quantity: "100", unit: "g" }
    ],
    preparation_steps: [
      "Slice cucumbers paper-thin using a mandoline. Salt and let stand 10 minutes.",
      "Squeeze out all excess liquid — this is essential for the right texture.",
      "Dissolve sugar and salt in rice vinegar. Add soy sauce.",
      "Toss cucumber and seafood in the vinegar dressing.",
      "Serve chilled, garnished with toasted sesame seeds."
    ],
    chef_notes: "Salting and squeezing the cucumber is crucial — it draws out bitterness and excess water, allowing the delicate dressing to be properly absorbed rather than diluted.",
    serving_suggestions: "Serve as a palate cleanser between courses or alongside sashimi.",
    flavor_profile: ["refreshing", "tangy", "sweet", "delicate"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
    tags: ["Vegetarian", "Refreshing", "Summer", "Traditional"]
  },
  {
    dish_name: "Wakame Seaweed Salad",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "Vibrant green rehydrated wakame seaweed in a sesame-ginger dressing — a staple of Japanese restaurants worldwide, packed with minerals and offering a satisfying oceanic umami flavor.",
    ingredients: [
      { name: "Dried wakame seaweed", quantity: "30", unit: "g" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Rice vinegar", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Ginger, grated", quantity: "1", unit: "tsp" },
      { name: "Sesame seeds", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Soak wakame in cold water 5-10 minutes until fully rehydrated.",
      "Blanch in boiling water for 30 seconds to achieve vibrant green color. Cool in ice water.",
      "Whisk together sesame oil, rice vinegar, soy sauce, sugar and grated ginger.",
      "Drain wakame and toss with dressing.",
      "Serve topped with toasted sesame seeds and a drizzle of chili oil."
    ],
    chef_notes: "The quick blanch is the key to the vivid green color you see in restaurants. Without it, the rehydrated seaweed remains dark and less appealing.",
    serving_suggestions: "Serve as a starter alongside miso soup and rice.",
    flavor_profile: ["oceanic", "sesame", "tangy", "umami"],
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    tags: ["Healthy", "Vegan", "Nutrient-Rich", "Quick"]
  },

  // ── MAIN COURSES ─────────────────────────────────────────────────────────────
  {
    dish_name: "Chicken Katsu Curry",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 40,
    servings: 4,
    short_description: "Japan's most beloved comfort meal — golden panko-breaded chicken cutlets served over steamed rice with a thick, mildly spiced curry sauce made from Japanese curry roux. A weekly staple in Japanese homes.",
    ingredients: [
      { name: "Chicken breasts", quantity: "4", unit: "pieces" },
      { name: "Panko breadcrumbs", quantity: "150", unit: "g" },
      { name: "Japanese curry roux blocks", quantity: "100", unit: "g" },
      { name: "Potatoes, diced", quantity: "2", unit: "medium" },
      { name: "Carrots, diced", quantity: "2", unit: "medium" },
      { name: "Onions", quantity: "2", unit: "large" },
      { name: "Steamed Japanese rice", quantity: "4", unit: "portions" },
      { name: "Oil for frying", quantity: "2", unit: "cups" }
    ],
    preparation_steps: [
      "Pound chicken breasts to even thickness. Season, coat in flour, egg and panko.",
      "Deep fry at 170°C for 6-7 minutes until deeply golden. Rest on a rack.",
      "Caramelize onions in oil 15 minutes. Add carrots and potatoes, add water and simmer 15 minutes.",
      "Remove from heat and dissolve curry roux blocks into the broth. Return to low heat 5 minutes.",
      "Slice katsu. Serve rice with curry sauce alongside, katsu slices on top."
    ],
    chef_notes: "Japanese curry is notably milder and sweeter than Indian curry — the roux-based sauce has a thick, glossy texture. Caramelizing the onions deeply is what gives the curry its signature sweetness.",
    serving_suggestions: "Serve with fukujinzuke (red pickled vegetables) on the side.",
    flavor_profile: ["mild", "sweet", "savory", "crispy"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=400&q=80",
    tags: ["Comfort Food", "Katsu", "Popular", "Family Favorite"]
  },
  {
    dish_name: "Salmon Teriyaki",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Main Courses",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 12,
    servings: 4,
    short_description: "Glazy, caramelized salmon fillets in a classic four-ingredient teriyaki sauce — one of Japan's most universally beloved cooking techniques that creates a beautiful, lacquered finish.",
    ingredients: [
      { name: "Salmon fillets", quantity: "4", unit: "pieces" },
      { name: "Soy sauce", quantity: "3", unit: "tbsp" },
      { name: "Mirin", quantity: "3", unit: "tbsp" },
      { name: "Sake", quantity: "2", unit: "tbsp" },
      { name: "Sugar", quantity: "1", unit: "tbsp" },
      { name: "Sesame seeds", quantity: "1", unit: "tbsp" },
      { name: "Spring onions", quantity: "2", unit: "stalks" }
    ],
    preparation_steps: [
      "Pat salmon completely dry — moisture prevents proper caramelization.",
      "Mix soy sauce, mirin, sake and sugar for the teriyaki sauce.",
      "Sear salmon skin-side up in a hot, lightly oiled pan for 3 minutes until golden.",
      "Flip, add teriyaki sauce and cook 4-5 minutes, basting constantly until sauce becomes glossy and caramelized.",
      "Serve over steamed rice with pickled ginger and sesame seeds."
    ],
    chef_notes: "The four-ingredient teriyaki sauce (equal parts soy, mirin, sake with a little sugar) is a Japanese kitchen cornerstone that works for chicken, beef and vegetables too.",
    serving_suggestions: "Serve over Japanese rice with steamed broccoli and miso soup.",
    flavor_profile: ["sweet-savory", "caramelized", "rich", "umami"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&q=80",
    tags: ["Healthy", "Quick", "Classic", "Grilled"]
  },
  {
    dish_name: "Beef Sukiyaki",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "A beloved Japanese hot pot of thinly sliced wagyu beef, tofu, vegetables and glass noodles cooked tableside in a sweet soy-based broth and dipped in raw egg — one of Japan's most ceremonial and indulgent dishes.",
    ingredients: [
      { name: "Thinly sliced beef (wagyu or ribeye)", quantity: "400", unit: "g" },
      { name: "Firm tofu", quantity: "300", unit: "g" },
      { name: "Napa cabbage", quantity: "200", unit: "g" },
      { name: "Shirataki noodles", quantity: "200", unit: "g" },
      { name: "Soy sauce", quantity: "80", unit: "ml" },
      { name: "Mirin", quantity: "80", unit: "ml" },
      { name: "Sake", quantity: "80", unit: "ml" },
      { name: "Sugar", quantity: "3", unit: "tbsp" }
    ],
    preparation_steps: [
      "Prepare warishita sauce by combining soy, mirin, sake and sugar.",
      "Heat a cast iron sukiyaki pan at the table. Sear a few beef slices with a little sugar.",
      "Add warishita sauce, then arrange all vegetables, tofu and noodles around beef.",
      "Simmer until vegetables are tender, adding more sauce as needed.",
      "Each person dips ingredients in lightly beaten raw egg before eating."
    ],
    chef_notes: "The raw egg dip is non-negotiable in authentic sukiyaki — it enriches and slightly cools the hot ingredients, creating a custardy coating. Use the freshest eggs available.",
    serving_suggestions: "Serve as a communal tabletop hot pot at the center of the dining table.",
    flavor_profile: ["sweet-savory", "rich", "umami", "warming"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    tags: ["Hot Pot", "Wagyu", "Special Occasion", "Traditional"]
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    dish_name: "Mochi Ice Cream",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 5,
    servings: 8,
    short_description: "Bite-sized spheres of creamy ice cream wrapped in a pillowy, sweet glutinous rice cake — a Japanese-American innovation that has become one of the most beloved Japanese desserts worldwide.",
    ingredients: [
      { name: "Glutinous rice flour (mochiko)", quantity: "200", unit: "g" },
      { name: "Sugar", quantity: "100", unit: "g" },
      { name: "Water", quantity: "200", unit: "ml" },
      { name: "Vanilla ice cream", quantity: "400", unit: "g" },
      { name: "Potato starch or cornstarch for dusting", quantity: "4", unit: "tbsp" },
      { name: "Food coloring (optional)", quantity: "1", unit: "few drops" }
    ],
    preparation_steps: [
      "Scoop ice cream into small balls, place on parchment and freeze solid (at least 1 hour).",
      "Mix mochiko, sugar and water. Microwave 2 minutes, stir, 2 more minutes until translucent.",
      "Dust work surface with potato starch. Knead mochi until smooth. Cool slightly.",
      "Flatten small mochi rounds, place frozen ice cream ball in center, wrap and seal.",
      "Return to freezer. Remove 5 minutes before serving."
    ],
    chef_notes: "The mochi must be warm and pliable when wrapping — work quickly before it cools and becomes too stiff. The frozen solid ice cream is essential to prevent melting during assembly.",
    serving_suggestions: "Serve in pastel-colored paper cups in a variety of flavors.",
    flavor_profile: ["chewy", "sweet", "creamy", "cold"],
    dietary_tags: ["vegetarian", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
    tags: ["Modern Japanese", "Ice Cream", "Party Dessert", "Chewy"]
  },
  {
    dish_name: "Matcha Cheesecake",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 60,
    servings: 8,
    short_description: "A Japanese-style soufflé cheesecake infused with ceremonial grade matcha — incredibly light, cloud-like in texture, subtly bitter from the green tea and paired with white chocolate for balance.",
    ingredients: [
      { name: "Cream cheese", quantity: "250", unit: "g" },
      { name: "Ceremonial matcha powder", quantity: "3", unit: "tbsp" },
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Sugar", quantity: "100", unit: "g" },
      { name: "Cream", quantity: "100", unit: "ml" },
      { name: "Butter", quantity: "30", unit: "g" },
      { name: "Flour", quantity: "30", unit: "g" }
    ],
    preparation_steps: [
      "Melt cream cheese with butter and cream. Whisk in matcha and flour until smooth.",
      "Add egg yolks one at a time.",
      "Whisk egg whites to stiff peaks, gradually adding sugar.",
      "Gently fold egg whites into cheese mixture in thirds.",
      "Bake in a water bath at 160°C for 60 minutes. Cool in oven with door ajar."
    ],
    chef_notes: "The water bath (bain-marie) is essential — it creates the gentle, even heat that results in the characteristic jiggly, soufflé-like Japanese cheesecake texture.",
    serving_suggestions: "Serve dusted with matcha powder and accompanied by fresh berries and whipped cream.",
    flavor_profile: ["earthy", "sweet", "bitter", "light", "airy"],
    dietary_tags: ["vegetarian"],
    img: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80",
    tags: ["Matcha", "Baked", "Elegant", "Cafe Style"]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
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
      [maharashtraGuidePage,"Maharashtra Guide"],[punjabGuidePage,"Punjab Guide"],
      [aboutPage,"About Us"],[contactPage,"Contact Us"],[privacyPage,"Privacy Policy"],
      [termsPage,"Terms of Use"],[careersPage,"Careers"],[cuisineExplorer,"Cuisine Explorer"],[recipeDB,"Recipe Database"],
      [chinesePage,"Chinese Cuisine"],[japanesePage,"Japanese Cuisine"],[thaiPage,"Thai Cuisine"],
      [koreanPage,"Korean Cuisine"],[vietnamesePage,"Vietnamese Cuisine"],
    ];
    const active = pages.find(([state]) => state);
    const title = active ? `Fusion Chef – ${active[1]}` : "Fusion Chef – Authentic World Recipes Powered by AI";
    document.title = title;
    gtagEvent("page_view", { page_title: title, page_location: window.location.href });
  }, [indianPage,maharashtraPage,punjabPage,maharashtraGuidePage,punjabGuidePage,aboutPage,contactPage,privacyPage,termsPage,careersPage,cuisineExplorer,recipeDB,chinesePage,japanesePage,thaiPage,koreanPage,vietnamesePage]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [indianPage,maharashtraPage,punjabPage,maharashtraGuidePage,punjabGuidePage,aboutPage,contactPage,privacyPage,termsPage,careersPage,cuisineExplorer,recipeDB,chinesePage,japanesePage,thaiPage,koreanPage,vietnamesePage]);

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
  const renderCuisinePage = ({ data, name, flag, color, setPage, category, setCategory, search, setSearch, modal, setModal, categories, backLabel }) => {
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
      {chinesePage && renderCuisinePage({ data: chineseCuisineData, name: "Chinese", flag: "🇨🇳", color: "#8B1A1A", setPage: setChinesePage, category: asianCategory, setCategory: setAsianCategory, search: asianSearch, setSearch: setAsianSearch, modal: asianModal, setModal: setAsianModal, categories: ["All","Appetizers","Soups","Salads","Main Courses","Desserts"] })}
      {japanesePage && renderCuisinePage({ data: japaneseCuisineData, name: "Japanese", flag: "🇯🇵", color: "#BC002D", setPage: setJapanesePage, category: asianCategory, setCategory: setAsianCategory, search: asianSearch, setSearch: setAsianSearch, modal: asianModal, setModal: setAsianModal, categories: ["All","Appetizers","Soups","Salads","Main Courses","Desserts"] })}
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
          © 2025 Fusion Chef by <strong style={{color:"var(--saffron)"}}>Chef Anuj Vikas Lonkar</strong>. All rights reserved. Powered by <span style={{color:"var(--saffron)"}}>Anthropic Claude</span>.
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
