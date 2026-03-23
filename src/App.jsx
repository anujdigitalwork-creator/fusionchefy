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


import {
  indianCuisineData,
  maharashtraCuisineData,
  punjabCuisineData,
  chineseCuisineData,
  japaneseCuisineData,
  thaiCuisineData,
  koreanCuisineData,
  vietnameseCuisineData,
} from "./asianCuisineData.js";

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
