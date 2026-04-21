# Flappy Wasabi — Game Design

## Goal
A standalone browser game at `wasabicheese.com/game` where players fly the $WASABI mascot through wasabi squeeze tubes, compete on a global leaderboard, and share scores on X.

## Architecture
- `game.html` — standalone page, links back to main site
- `game.js` — full game engine (HTML5 Canvas, pure JS, no libraries)
- `game.css` — game-specific styles
- Supabase (free tier) — global leaderboard, one `scores` table
- `index.html` — gets a PLAY button added to the hero section

## Game Mechanics
- **Character:** wasabi blob mascot (`assets/logo.png`), physics-based gravity + flap
- **Obstacles:** paired wasabi squeeze tubes (top + bottom), green cylinder with nozzle tip, drawn on canvas
- **Controls:** spacebar / mouse click / tap (mobile)
- **Score:** number of tube pairs passed = Scoville Units
- **Difficulty:** speed and gap size scale every 10 points
- **Heat ranks:**
  - 0–9: MILD
  - 10–24: SPICY
  - 25–49: FACE MELTING
  - 50+: NUCLEAR

## Game States
1. **Start** — title, "TAP TO START", top 5 leaderboard fetched from Supabase
2. **Playing** — game loop running, score shown live with heat rank
3. **Dead** — red splatter + screen shake, then game over panel
4. **Game Over Panel** — score, heat rank, username input, SHARE ON X + SUBMIT SCORE buttons, top 10 leaderboard

## Game Over Flow
1. Show score + heat rank
2. Username input field (max 20 chars)
3. SHARE ON X → opens Twitter Web Intent:
   `"I scored {score} Scoville units at {rank} heat in Flappy Wasabi! Can you beat me? wasabicheese.com/game $WASABI"`
4. SUBMIT SCORE → posts to Supabase `scores` table, refreshes leaderboard

## Supabase Schema
```sql
create table scores (
  id bigint generated always as identity primary key,
  username text not null,
  score integer not null,
  created_at timestamptz default now()
);
-- RLS: public can insert and select
```

## Visual Style
- Dark background matching main site (`#080808`)
- Same font stack: Bangers (headings), Space Grotesk (body), JetBrains Mono (score)
- Floating cheese + chili deco particles in background (same as main site)
- Green neon glow aesthetic throughout
- Obstacles: green wasabi tubes with darker stroke
- Death effect: red particle splatter from mascot position
- Score display: neon green, top center, "42 SCOVILLE"

## Landing Page Change
Add to `#hero-buttons` in `index.html`:
```html
<a href="/game" class="btn btn-primary">PLAY GAME</a>
```
