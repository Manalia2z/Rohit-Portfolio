# PRD — Rohit Dhongade Portfolio

## Original Problem Statement
Portfolio Website for Rohit Rajendra Dhongade (brother) — diploma Mechanical Engineer / automotive technician. Requirements: single-page site, 5–8 animated sections, 3D visuals/car blueprints while scrolling, hover animations, hobbies + work experience + own family workshop (Sai Service, two-wheeler servicing).

## User Choices (locked)
- Vehicle theme: **Only Cars** (workshop section shows the family two-wheeler shop)
- Workshop: **Sai Service** · Professor Chowk, Ahmednagar, Maharashtra · services: two-wheeler servicing, repairing, maintenance, oil change, periodic maintenance
- Hobbies: Bike riding & mechanics, Gaming, Turf, Cricket
- No professional photo — silhouette placeholder used
- Design theme: Industrial + Dark automotive (Obsidian #0A0A0A + Electric Blaze #FF3B30)

## Architecture
- **Frontend**: React 19 + Framer Motion 11 + Tailwind + Sonner (single page, section-scroll routing)
- **Backend**: FastAPI + MongoDB (POST/GET `/api/contact`, `/api/health`)
- **Styling**: Chakra Petch (headings) + JetBrains Mono (body), no Three.js — 3D achieved via CSS 3D transforms, SVG blueprints, and Framer Motion parallax

## What's Been Implemented (2026-07)
- Sticky nav w/ 8-section jump links + active underline + mobile drawer
- Hero: parallax Mercedes background, staggered name reveal, live-simulated RPM tachometer widget, animated SVG blueprint car (rotating rim spokes, headlamp glow, hover 3D tilt)
- About: portrait silhouette card with reticle, quick-stat grid, achievements, animated 4-cylinder engine cutaway (pumping pistons + rotating crank gear)
- Skills: 8 animated tachometer dials with sweep-on-view, marquee ticker
- Experience: vertical red-rail timeline with Mercedes-Benz + Hyundai job cards
- Education: two industrial-styled cards with score progress bars
- Workshop: **Sai Service** hero card, parallax workshop background, 4 stat tiles, 5 service rows w/ hover reveal, toolbay image
- Hobbies: 4 icon cards with rotating gear rings on hover
- Contact: 4 contact cards + working form (POST /api/contact) with sonner toasts + footer

## Test Status
- Backend: 8/8 pytest passed (health, contact validation, persistence)
- Frontend: all 8 sections render, animations play, form submits, toasts fire

## Backlog (P1)
- Add downloadable resume PDF button in Hero
- Add real photos of Rohit + Sai Service workshop when provided
- Certifications section if any obtained
- Contact form: forward to email (Resend/SendGrid integration)

## Backlog (P2)
- Multilingual toggle (Marathi/Hindi/English)
- Testimonials from garage customers
- OG image + SEO meta for LinkedIn preview
