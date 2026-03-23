# Shirley Ji — Premium Real Estate Advisory

A multi-page, single-HTML-app website for Shirley Ji, a premium education-first real estate advisory firm for first-time homebuyers.

## File Structure

```
├── index.html   — Main HTML document (all pages, nav, footer, chatbot, preloader)
├── style.css    — All styles (design tokens, layout, components, animations)
├── main.js      — All JavaScript (navigation, calculator, calendar, chatbot, animation layer)
└── README.md    — This file
```

## Pages

| Page | ID | Description |
|---|---|---|
| Home | `page-home` | Hero, stats, who we are, process steps, testimonials, philosophy, why choose us, FTB timeline, partners, CTA |
| Calculator | `page-calculator` | Interactive mortgage calculator with sliders |
| Buyer Guide | `page-guide` | Step-by-step first-time buyer guide |
| About | `page-about` | Team, values, company story |
| Insights | `page-blog` | Blog/article grid |
| Contact | `page-contact` | Contact form + info |
| Booking | `page-booking` | Interactive calendar + time slot booking form |

## Features

- **SPA Navigation** — All pages are in-DOM; `go(page)` switches between them with a diagonal iris page transition
- **Preloader** — Word-reveal animation ("Find Your Home.") with progress bar and panel split on exit
- **Mortgage Calculator** — Real-time EMI calculation with sliders for price, down payment, rate, and term
- **Booking Calendar** — Month calendar with past-date/Sunday disabling, time slot selection, and confirmation form
- **AI Chatbot** — Floating assistant powered by the Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Scroll Progress Bar** — Gold gradient bar at the very top of the viewport
- **Section Nav Dots** — Fixed right-side dots for home page sections
- **Counter Animation** — Stats bar numbers count up on scroll into view
- **Scroll Reveal** — `.fade-up` elements animate in via IntersectionObserver
- **Hero Word Reveal** — h1 words slide up sequentially after preloader exits
- **Image Fade-in** — Images fade in on load
- **Ripple Effect** — Click ripple on primary/dark buttons
- **Glow Dividers** — Accent divider lines glow when scrolled into view
- **Responsive** — Breakpoints at 1024px and 768px with mobile nav hamburger

## Local Development

No build step required. Serve from any static file server:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then open `http://localhost:8080`.

> **Note:** The AI chatbot requires an Anthropic API key. The API call is made from the browser — configure CORS or a proxy as needed for production deployments.

## Design Tokens (CSS Variables)

| Variable | Value | Use |
|---|---|---|
| `--bg` | `#F5F2ED` | Page background |
| `--bg2` | `#EDEAE3` | Secondary background |
| `--surface` | `#FFFFFF` | Cards / panels |
| `--fg` | `#1C1917` | Primary text / dark sections |
| `--accent` | `#B5651D` | Brand orange-brown |
| `--accent2` | `#2D4A3E` | Brand forest green |
| `--gold` | `#C9A96E` | Gold highlights |
| `--serif` | Cormorant Garamond | Headings |
| `--sans` | Outfit | Body text |

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses `IntersectionObserver`, `requestAnimationFrame`, `clip-path`, `backdrop-filter`, and ES6+ syntax.
