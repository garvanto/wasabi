# Wasabi ($WASABI) — Meme Coin Website Design

**Date:** 2026-04-19  
**Type:** Hype landing page, single page, max vibes

---

## Overview

A high-energy, single-page meme coin website for $WASABI — a spicy cheese meme coin on Solana. The site should feel professional yet chaotic, with dark/fire aesthetics matching the existing banner art. Built with plain HTML/CSS/JS (no framework) for fast loading and easy GitHub Pages deployment.

---

## Assets

- **Logo:** Kawaii green wasabi blob (provided PNG)
- **Banner:** Dark chaos artwork — wasabi holding money, fire, rockets, green candles, "EXIT POVERTY" sign
- **Tagline:** "STAY SPICY. PRINT MONEY. MELT FACES."
- **CA:** `DSZeB6pCzZsM43gTz7jakiYeCafinsNMKcpeB1FApump`
- **Socials:** Telegram, Twitter/X, Dexscreener

---

## Color Palette

| Token | Value |
|-------|-------|
| Background | `#080808` |
| Primary Green | `#6FFF00` |
| Glow Green | `#39FF14` (neon) |
| Fire Orange | `#FF6B00` |
| Fire Yellow | `#FFD700` |
| Text | `#FFFFFF` |
| Muted | `#888888` |

---

## Typography

- **Headings:** "Bangers" (Google Fonts) — bold, condensed, meme energy
- **Body/UI:** "Space Grotesk" — clean, modern, readable
- **Accent/CA:** monospace — `JetBrains Mono`

---

## Page Sections

### 1. Hero
- Full-width banner image as background with dark overlay
- Animated floating wasabi logo (gentle bob up/down)
- Mascot eyes track cursor position
- Big glowing tagline: "STAY SPICY. PRINT MONEY. MELT FACES."
- CA display box with one-click copy (flashes green + "COPIED!" feedback)
- CTA buttons: "BUY NOW" (→ Dexscreener) + "JOIN COMMUNITY" (→ Telegram)
- Fire particle embers drifting upward across the page

### 2. About / Stats
- 3 stat cards: "100% Community", "Zero Tax", "Solana Speed"
- Short punchy copy: "Wasabi isn't just a condiment. It's a lifestyle. It burns. It heals. It makes you rich."
- Subtle card hover: green glow border + lift

### 3. Spicy-O-Meter (Interactive)
- Vertical heat gauge fixed to right side of screen
- Fills as user scrolls: MILD → HOT → SPICY → FACE MELTING → ASCENDED
- Wasabi mascot face changes at each level (5 states via CSS classes)
- Glowing color shifts from green → yellow → orange → red → white/transcendent

### 4. How to Buy
- 4 steps with icons:
  1. Get SOL (Phantom/Coinbase)
  2. Set up Phantom Wallet
  3. Swap on Raydium with CA
  4. WAGMI — welcome to the spicy side
- Animated step numbers with fire glow

### 5. Wasabi Wisdom Slot Machine (Interactive)
- 3-reel slot machine UI
- Pull lever / click button to spin
- Random meme phrases per reel (e.g. "BUY", "HOLD", "EAT FACES")
- "Share on Twitter" button posts result

### 6. "MELT MY FACE" Button Section
- Big glowing button in its own section
- On click:
  - Screen shake (CSS keyframe animation)
  - Fire spreads from screen edges (canvas overlay)
  - Mascot goes into "chaos mode" (spinning, scaling)
  - Flash message: "FACE MELTED. YOU ARE NOW NGMI-PROOF."
  - Resets after 3 seconds

### 7. Footer
- Logo + tagline
- Social links: Telegram, Twitter/X, Dexscreener
- CA repeated (copy button)
- Disclaimer: "Not financial advice. Just spicy vibes."

---

## Interactive Details

### Cursor Fire Trail
- Canvas overlay (pointer-events: none) across full page
- Each mousemove spawns a particle: tiny circle, green/orange, fades out over ~600ms
- Particles drift upward slightly as they fade

### Mascot Eye Tracking
- Two eye elements positioned over the logo in hero
- On mousemove: calculate angle from eye center to cursor, move pupil max 4px in that direction

### Spicy-O-Meter Scroll Logic
- `IntersectionObserver` or scroll % to determine fill level
- 5 thresholds: 0%, 25%, 50%, 75%, 100% of page
- SVG or CSS clip-path gauge that fills vertically

### Slot Machine
- Pure CSS animation for spinning reels
- JS controls spin duration + random stop position per reel
- Reels stagger-stop: reel 1 → reel 2 → reel 3 (classic slot feel)

---

## Tech Stack

- **HTML/CSS/JS** — no framework, fast load
- **Canvas API** — fire particles + cursor trail
- **Google Fonts** — Bangers, Space Grotesk, JetBrains Mono
- **No dependencies** — fully self-contained, deploys to GitHub Pages

---

## GitHub Setup

- Repo: `wasabi` (public)
- Deploy: GitHub Pages from `main` branch root (`index.html`)

---

## Success Criteria

- Loads in under 2 seconds
- CA copy works on mobile and desktop
- All 3 social links open correctly
- Spicy-O-Meter visible and functional on scroll
- Site looks clean and shareable — something the community wants to post
