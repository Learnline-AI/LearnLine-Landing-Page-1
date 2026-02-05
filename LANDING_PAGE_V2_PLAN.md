# LearnLine Landing Page v2 - Phased Build Plan

## Overview
Build a new landing page from the Figma design at `/v2` route, keeping the existing site intact until ready to swap.

**Figma Source:** `https://www.figma.com/design/WMUTkoCHBJ1z8JLH4WDsr8/Website-2?node-id=193-149`

---

## Tech Stack

| Technology | Purpose | Why |
|------------|---------|-----|
| React 19 | UI Framework | Matches Book-Ingestor codebase |
| Vite | Build Tool | Fast HMR, matches Book-Ingestor |
| TypeScript | Type Safety | Strict mode, matches Book-Ingestor |
| Tailwind CSS | Styling | Utility-first, matches Book-Ingestor |
| Framer Motion | Animations | Used in learnline-platform reference |

---

## Folder Structure

```
LearnLine-Landing-Page-1/
├── index.html                    # OLD (untouched)
├── student-login.html            # OLD (untouched)
├── teacher-login.html            # OLD (untouched)
├── ...other old files            # OLD (untouched)
│
└── v2/                           # NEW React app
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── index.html
    │
    ├── public/
    │   └── assets/
    │       ├── images/           # Extracted from Figma
    │       ├── videos/           # Toggle section videos
    │       └── icons/
    │
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css             # Tailwind imports
        │
        ├── components/
        │   ├── atoms/
        │   │   ├── Button.tsx
        │   │   ├── Badge.tsx
        │   │   ├── Toggle.tsx
        │   │   └── Logo.tsx
        │   │
        │   ├── molecules/
        │   │   ├── NavLinks.tsx
        │   │   ├── FeatureCard.tsx
        │   │   ├── ComparisonRow.tsx
        │   │   └── ProductMockup.tsx
        │   │
        │   └── organisms/
        │       ├── Navigation.tsx
        │       ├── HeroSection.tsx
        │       ├── FeatureCardsRow.tsx
        │       ├── HomeworkOpportunitySection.tsx
        │       ├── HowItWorksSection.tsx
        │       ├── ClearerPathsSection.tsx
        │       └── Footer.tsx
        │
        ├── hooks/
        │   └── useScrollAnimation.ts
        │
        ├── utils/
        │   └── animations.ts     # Framer Motion variants
        │
        └── types/
            └── index.ts
```

---

## Design Tokens (from Figma)

### Colors
```
Primary Background:    #FFFFFF (white)
Secondary Background:  #FAF9F6 (off-white)
Accent Coral:          #F99E78 (headings, highlights)
Text Primary:          #000000 (black)
Text Muted:            rgba(0,0,0,0.6)
Toggle Green:          #ABD6C2
Success Green:         (for "Better Way" badges)
Warning Red/Orange:    (for "Current Way" badges)
```

### Typography
```
Headings:      Plus Jakarta Sans (ExtraBold, 800)
Accent/Italic: Playfair Display (Black Italic)
Body:          Inter
```

### Effects
```
Neo-brutalist shadows: 8px 8px 0px 0px black
Border style:          2px solid black
Border radius:         Minimal (sharp corners mostly)
```

---

## Phased Build Plan

---

### PHASE 0: Project Setup
**Goal:** Initialize the v2 React app with all dependencies

**Tasks:**
1. Create `/v2` folder
2. Initialize Vite + React + TypeScript project
3. Install dependencies:
   - `tailwindcss`, `postcss`, `autoprefixer`
   - `framer-motion`
   - `@fontsource/plus-jakarta-sans`, `@fontsource/playfair-display`, `@fontsource/inter`
4. Configure Tailwind with design tokens
5. Set up folder structure (atoms/molecules/organisms)
6. Create base layout component
7. Verify `npm run dev` works at `localhost:5173`

**Deliverable:** Empty page loads with correct fonts and Tailwind working

---

### PHASE 1: Navigation
**Goal:** Sticky header with logo, links, and CTA button

**Components to build:**
- `atoms/Logo.tsx` - LearnLine logo
- `atoms/Button.tsx` - Neo-brutalist button style (black border, shadow)
- `molecules/NavLinks.tsx` - METHOD, CURRICULUM, COMMUNITY, REVIEWS, LOG IN
- `organisms/Navigation.tsx` - Full sticky nav bar

**Animations:**
- Subtle shadow on scroll (nav gets shadow when scrolled)
- Button hover: shadow shift effect

**Responsive:**
- Desktop: Full nav links visible
- Mobile: Hamburger menu with slide-out drawer

**Figma Reference:** Top of `193:149`

---

### PHASE 2: Hero Section
**Goal:** Main headline with product mockup

**Components to build:**
- `organisms/HeroSection.tsx`
- `molecules/ProductMockup.tsx` - The "CHARACTER ENGINE" preview window

**Content:**
- Headline: "The world needs training with *impact*" (impact in Playfair italic coral)
- Subtext: "Transform homework into adaptive mastery learning. Same 20 minutes, measurable outcomes daily."
- CTA: "REQUEST A DEMO" button
- Social proof: Avatar stack + "+12K STUDENTS"
- Right side: Product mockup with neo-brutalist frame

**Animations:**
- Text fade-in + slide-up on load (staggered)
- Product mockup subtle float animation
- Button hover effect

**Responsive:**
- Desktop: Two-column (text left, mockup right)
- Mobile: Stacked (text top, mockup below)

---

### PHASE 3: Feature Cards Row
**Goal:** Horizontal scrollable feature icons

**Components to build:**
- `atoms/Badge.tsx` - Small label badges
- `molecules/FeatureCard.tsx` - Icon + two labels card
- `organisms/FeatureCardsRow.tsx` - Horizontal row/scroll container

**Features (10 cards):**
1. VOICE PRACTICE / SPEAKING CONFIDENCE
2. AI COMPANION / VOICE RECOGNITION
3. CONTEXT LEARNING / REAL CONVERSATIONS
4. REAL-TIME AI (icon)
5. SPEECH FEEDBACK / DAILY TASKS
6. EASY TO UNDERSTAND / PRONUNCIATION COACH
7. PROGRESS TRACKER / SMART CHALLENGES

**Animations:**
- Staggered fade-in on scroll into view
- Subtle hover lift on each card

**Responsive:**
- Desktop: All cards visible in row
- Mobile: Horizontal scroll with snap points

---

### PHASE 4: "Every Homework Hour" Section (Toggle)
**Goal:** Interactive toggle between "Current Way" and "Better Way"

**Components to build:**
- `atoms/Toggle.tsx` - The sliding toggle switch
- `molecules/ComparisonRow.tsx` - Label + badge row
- `organisms/HomeworkOpportunitySection.tsx` - Full section

**Layout:**
```
[  VIDEO/ILLUSTRATION  ] | [ Headline + Comparison Table ]
                         |
[    TOGGLE SWITCH     ] | [ LEARNING MEASURED  |  BADGE  ]
                         | [ GAP DETECTION      |  BADGE  ]
                         | [ TEACHER TIME       |  BADGE  ]
                         | [ COST TO PARENTS    |  BADGE  ]
```

**Two States:**

| State | Left Side | Badges |
|-------|-----------|--------|
| Current Way | Sad illustration VIDEO (Doubt, DUE, HELP?, MARKING) | NEVER, AFTER EXAMS, 2HR GRADING, $$$ |
| Better Way | Happy illustration VIDEO (SUCCESS!, ON TRACK, FLOW) | EVERY SESSION, 3 MINUTES, 0 GRADING, 10X CHEAPER |

**Animations:**
- Toggle: Spring physics slide
- Left side: Video crossfade/swap with `AnimatePresence`
- Badges: Color morph + text swap animation
- Layout: Smooth `layout` animation for repositioning

**Responsive:**
- Desktop: Two-column
- Mobile: Stacked (video top, table below, toggle between)

---

### PHASE 5: "How It Works" Section (Interactive Learning Loop)
**Goal:** Interactive circular diagram showing the learning cycle

**Components to build:**
- `organisms/HowItWorksSection.tsx`
- Custom SVG/Canvas component for the loop diagram

**The Learning Loop (8 steps, clockwise):**
```
        Plan
    Track    Learn
  Improve      Diagnose
    Test      Adapt
      Practice
```

**Center:** Orange circle with icon

**Interactions:**
- Click on any step → highlights that step, shows description
- Optional: Auto-rotate through steps
- Hover: Step enlarges slightly

**Right side:** Product interface mockup (changes based on selected step?)

**Tabs below:** VISION | TEACHER | PARENT | SCHOOL (toggle different content views)

**Animations:**
- Loop rotates subtly on idle
- Step pulse animation when selected
- `whileHover` scale effect on steps

**Responsive:**
- Desktop: Loop left, mockup right
- Mobile: Loop top, tabs below, mockup hidden or simplified

---

### PHASE 6: "Clearer Paths to Fluency" Section
**Goal:** Final value prop section with product preview

**Components to build:**
- `organisms/ClearerPathsSection.tsx`

**Content:**
- Headline: "CLEARER PATHS TO FLUENCY."
- Subtext: "Learn with absolute clarity on where you are and exactly where you are going next."
- Bullet points with checkmarks:
  - Real-time feedback on every spoken phrase
  - Pronunciation accuracy scoring
  - Daily clarity on your fluency progress
- Right side: Product interface mockup with chat/input

**Animations:**
- Fade-in on scroll
- Checkmarks animate in sequentially
- Mockup subtle float

**Responsive:**
- Desktop: Two-column
- Mobile: Stacked

---

### PHASE 7: Footer & Polish
**Goal:** Footer and final polish

**Tasks:**
1. Build Footer component (if needed from Figma)
2. Add scroll-to-top functionality
3. Performance optimization:
   - Lazy load images
   - Optimize video loading
4. Accessibility audit:
   - Keyboard navigation
   - ARIA labels
   - Focus states
5. Cross-browser testing
6. Final responsive QA

---

### PHASE 8: Integration & Swap
**Goal:** Replace old site with new

**Tasks:**
1. Final review with stakeholder
2. Extract v2 build to root:
   - Backup old files to `/archive` folder
   - Move v2 build output to root
3. Update any deployment configs
4. DNS/hosting verification
5. Launch

---

## Animation Reference (from learnline-platform)

### Entry Animations
```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
```

### Staggered Children
```tsx
// Parent
variants={{
  visible: { transition: { staggerChildren: 0.1 } }
}}

// Child
variants={{
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}}
```

### Layout Animations (for toggle)
```tsx
<motion.div layout transition={{ type: "spring", stiffness: 300, damping: 25 }}>
```

### Hover Effects
```tsx
whileHover={{ y: -8, boxShadow: "12px 12px 0px 0px black" }}
```

---

## Assets to Extract from Figma

### Images
- [ ] LearnLine logo
- [ ] Character Engine mockup
- [ ] "Current Way" illustration (sad student)
- [ ] "Better Way" illustration (happy student)
- [ ] Feature card icons (10)
- [ ] Learning loop center icon
- [ ] Product interface mockups (multiple)
- [ ] Background textures (if any)

### Videos (to be provided)
- [ ] "Current Way" toggle video
- [ ] "Better Way" toggle video

---

## Commands

```bash
# Start development
cd v2 && npm run dev
# Opens at localhost:5173

# Build for production
cd v2 && npm run build

# Preview production build
cd v2 && npm run preview
```

---

## Timeline Estimate

| Phase | Complexity |
|-------|------------|
| Phase 0: Setup | Low |
| Phase 1: Navigation | Low |
| Phase 2: Hero | Medium |
| Phase 3: Feature Cards | Medium |
| Phase 4: Toggle Section | High (video + state) |
| Phase 5: Learning Loop | High (interactive SVG) |
| Phase 6: Clearer Paths | Medium |
| Phase 7: Polish | Medium |
| Phase 8: Swap | Low |

---

## Notes

- All animations use Framer Motion for consistency
- Neo-brutalist style: black borders, offset shadows, sharp corners
- Mobile-first responsive approach
- TypeScript strict mode throughout
- ESLint + Prettier for code quality (matching Book-Ingestor standards)
