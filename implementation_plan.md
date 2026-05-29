# Portfolio Redesign — Less Text, More Visual Impact + Interactive 3D Background

Transform the current text-heavy portfolio into a modern, immersive experience with an interactive 3D particle background, reduced text density, and premium visual design.

## User Review Required

> [!IMPORTANT]
> **3D Library Choice**: I'll use **Three.js** via `@react-three/fiber` + `@react-three/drei` — this is the de-facto standard for 3D in React. It adds ~150KB gzipped but delivers a stunning interactive particle field that responds to mouse movement. This replaces the current `VideoBackground.mp4` video file (which is likely much larger).

> [!WARNING]
> **Removing the Video Background**: The current `VideoBackground.tsx` plays a `.mp4` file. The new 3D particle background will **replace** it entirely. The video file will remain in `/public/videos/` but won't be loaded. If you want to keep the video as a fallback, let me know.

> [!IMPORTANT]
> **Text Reduction Strategy**: I'll significantly trim text across all sections. Here's the approach:
> - **About**: Remove the 3 paragraphs + bullet list → replace with a compact 2-line intro + 3 visual stat cards
> - **Experience**: Remove bullet-point responsibilities → keep only title, company, period, tech stack, and a single-line description
> - **Certifications**: Remove descriptions → keep title, issuer, date, status badge, and skills as compact pills
> - **Timeline**: Remove milestone bullet lists → keep year, title, single-line description with a cleaner visual timeline
> - **Projects**: Keep mostly as-is (already card-based) but tighten the text

## Open Questions

> [!NOTE]
> **Color palette**: Currently using cyan (#06b6d4) as accent. The 3D particles will use this same cyan with a subtle purple gradient for depth. If you'd prefer a different color scheme (e.g., violet/purple, green, or a warmer tone), let me know.

## Proposed Changes

### New Dependency: React Three Fiber

Install `@react-three/fiber` and `@react-three/drei` for the interactive 3D background.

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

---

### 3D Background Component

#### [NEW] [ParticleBackground.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/ParticleBackground.tsx)

Replaces `VideoBackground.tsx`. Features:
- **Interactive particle field**: ~800 floating particles with depth (z-axis)
- **Mouse-reactive**: Particles gently drift toward/away from cursor
- **Gradient coloring**: Particles transition from cyan to purple based on position
- **Connecting lines**: Nearby particles connect with faint lines (constellation effect)
- **Smooth ambient motion**: Slow orbital rotation for life-like movement
- **Performance**: Uses instanced meshes for GPU-efficient rendering
- **Mobile-friendly**: Reduces particle count on smaller screens

---

### Design System Overhaul

#### [MODIFY] [globals.css](file:///Users/raushanraj/Downloads/Portfolio/app/globals.css)

- Add glassmorphism utility classes (`glass-card`, `glass-card-strong`)
- Add new CSS variables for glass effects and gradients
- Enhance card styles with frosted glass look (semi-transparent backgrounds + backdrop-blur)
- Add subtle animated gradient border for section headers
- Update section-underline to use animated gradient
- Add glow effects and micro-animation keyframes

---

### Component Redesigns (Less Text, More Visual)

#### [MODIFY] [Hero.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/Hero.tsx)

- Keep the profile photo flip interaction
- **Trim text**: Remove `subtitle` (university info) and `focus` lines → move them into a single subtle badge
- Add an animated typing effect for the tagline
- Make CTA buttons use glassmorphism with subtle glow on hover
- Add floating decorative orbs behind the hero content

#### [MODIFY] [About.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/About.tsx)

**Major text reduction:**
- Replace the 3 verbose paragraphs with a clean **2-line intro**
- Replace "Core Strengths" bullet list with **4 visual icon cards** (compact, icon + label)
- Remove "My Approach" and "Currently" subsections entirely — the info becomes implicit through projects/experience
- Add a subtle animated accent line

#### [MODIFY] [Skills.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/Skills.tsx)

- Remove `description` text from each skill section
- Use a **single unified grid** instead of two separate cards
- Skills become interactive pills with hover glow effects
- Category headers become minimal dividers
- Add subtle entrance animations per skill pill (staggered)

#### [MODIFY] [Projects.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/Projects.tsx)

- Keep the card layout and modal
- **Trim card text**: Remove `shortDescription` paragraph — keep just title, tagline, tech stack, and links
- Featured project gets a larger card with subtle gradient border
- Add image hover parallax effect
- Tighten the modal header

#### [MODIFY] [Experience.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/Experience.tsx)

**Major text reduction:**
- Remove the entire "Key Responsibilities" bullet list
- Keep: **Title** (large) → Company • Location • Period (single muted line) → Tech stack pills
- Optional: one-line `description` in italics
- Cards become compact, scannable rows instead of dense blocks

#### [MODIFY] [Certifications.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/Certifications.tsx)

**Major text reduction:**
- Remove `description` paragraph from each cert card
- Keep: Title, Issuer, Date, Status badge, Skills pills, Certificate link
- Merge the two sections (Web Dev + Security) into a single compact grid
- Remove section sub-headers and descriptions

#### [MODIFY] [Timeline.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/Timeline.tsx)

**Major text reduction:**
- Remove `milestones` bullet list
- Keep: Year badge + Title + single-line description
- Timeline dots become glowing animated nodes
- Add animated line that "draws" as you scroll

#### [MODIFY] [Contact.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/Contact.tsx)

- Trim the paragraph text to a single impactful line
- Make buttons larger with glassmorphism styling
- Add a subtle animated gradient underline on the heading

#### [MODIFY] [Navbar.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/Navbar.tsx)

- Enhance the pill navbar with stronger glassmorphism
- Add a subtle animated border glow when scrolled
- No text changes needed

#### [MODIFY] [Footer.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/Footer.tsx)

- Keep minimal — no changes needed

#### [MODIFY] [AvailableBadge.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/AvailableBadge.tsx)

- Enhance with glassmorphism styling to match new design

#### [MODIFY] [SecurityBadge.tsx](file:///Users/raushanraj/Downloads/Portfolio/components/SecurityBadge.tsx)

- Enhance with glassmorphism styling to match new design

---

### Page Assembly

#### [MODIFY] [page.tsx](file:///Users/raushanraj/Downloads/Portfolio/app/page.tsx)

- Replace `<VideoBackground />` with `<ParticleBackground />`
- Remove unused imports

#### [MODIFY] [layout.tsx](file:///Users/raushanraj/Downloads/Portfolio/app/layout.tsx)

- Add the `Space Grotesk` font (modern, geometric) alongside Inter for headings
- Add preconnect for the font

---

## Verification Plan

### Automated Tests
- `npm run build` — ensure no TypeScript errors or build failures
- Visual inspection via `npm run dev` at `http://localhost:3000`

### Manual Verification
- Check 3D background renders and responds to mouse movement
- Verify text density is visibly reduced across all sections
- Confirm glassmorphism effects look good on dark background
- Test mobile responsiveness (particle count reduction, layout integrity)
- Verify all interactive elements (project modal, navbar, badges) still work
