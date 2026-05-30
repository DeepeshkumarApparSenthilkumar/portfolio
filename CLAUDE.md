# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview production build locally
npm run lint      # ESLint (flat config, eslint.config.js)
```

No test suite configured.

## Architecture

Single-page React portfolio. **All logic lives in one file: `src/App.jsx`** (~987 lines). No routing, no separate component files, no backend.

### Data layer

`PORTFOLIO_DATA` object at the top of `src/App.jsx` is the single source of truth for all content — profile, projects, articles, experience, education, skills, social links, and impact metrics. To update any content, edit this object only.

### Component structure (all in `src/App.jsx`)

| Component | Purpose |
|---|---|
| `PORTFOLIO_DATA` | Centralized content object |
| `FormattedDescription` | Parses `\n\n`-delimited paragraphs; detects `Label: text` pattern and bolds the label |
| `SectionHeader` | Reusable section title with icon, gradient divider, optional right slot |
| `AIAutomationVisualizer` | Animated 3-node workflow diagram (Data → LLM → Action) rendered in the hero |
| `ProjectCard` | Glassmorphism card with expandable description; links render only when not `"#"` |
| `ArticleCard` | External link card for Medium articles |
| `ExperienceItem` | Timeline item used for both work experience and education |
| `App` | Root — manages scroll state, mouse position, mobile menu, active section via `IntersectionObserver` |

### Styling

- **Tailwind CSS** with a custom dark theme. Custom tokens in `tailwind.config.js`:
  - `bg-deepDark` → `#050506` (page background)
  - `animate-pulse-slow` → 4s pulse
- **Global CSS classes** defined in `src/index.css`:
  - `.glass-panel` — subtle frosted glass (3% white bg, blur 10px)
  - `.glass-card` — stronger glass for project/article cards (gradient, blur 12px)
  - `.bg-grid-pattern` — dot grid overlay used inside the visualizer
  - `.glow-text` / `.glow-box` — cyan glow helpers
- Accent palette: cyan (`#06b6d4`) for primary, purple for articles/education, emerald for status indicators.

### Animations

Framer Motion throughout. Key patterns:
- Cards use `whileInView` with `viewport: { once: true }` — animate once on first scroll into view
- `useScroll` + `useSpring` drives the top progress bar via `scaleX`
- `AIAutomationVisualizer` uses infinite `animate` loops for the flowing connector particles and rotating border rings
- `AnimatePresence` wraps mobile menu and scroll-to-top button for enter/exit transitions

### Ignored files

Root-level `App.jsx`, `main.jsx`, `App.css`, `index.css` are outdated duplicates of the `/src/` versions — ignore them. `articles.json` and `medium_feed.xml` are unused data files.

### Extending

- **New project**: append an object to `PORTFOLIO_DATA.projects`. Set `links.github` or `links.demo` to `"#"` to hide that link button.
- **New section**: add a `<section id="...">` in `App`, add the id to the `sectionIds` array in the `IntersectionObserver` effect, and add a nav link to `navLinks`.
- **New skill**: append a string to `PORTFOLIO_DATA.skills`.
- **Color changes**: edit `tailwind.config.js` for tokens; edit `src/index.css` for glass/glow utilities.
