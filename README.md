# Raushan Raj - Portfolio Website

A minimal, professional portfolio website for a Computer Engineering student with dual expertise in Full Stack Web Development and Cybersecurity.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations**: Framer Motion (minimal, professional)
- **Content**: JSON + Markdown (CMS-like structure)
- **Icons**: React Icons

## 📁 Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx             # Main page (loads all data)
│   └── globals.css          # Global styles and theme
├── components/
│   ├── Hero.tsx             # Hero section
│   ├── About.tsx            # About section
│   ├── Skills.tsx           # Dual skills section (Web Dev + Security)
│   ├── Projects.tsx         # Projects with modal details
│   ├── Experience.tsx       # Experience section
│   ├── Certifications.tsx   # Certifications & courses
│   ├── Timeline.tsx         # Career timeline
│   ├── Contact.tsx          # Contact section
│   ├── Navbar.tsx           # Navigation bar
│   └── Footer.tsx           # Footer
├── data/
│   ├── personal.json        # Personal info, about, contact
│   ├── skills.json          # Web dev & cybersecurity skills
│   ├── projects.json        # Project metadata
│   ├── experience.json      # Work experience
│   ├── certifications.json  # Certifications & courses
│   ├── timeline.json        # Career timeline events
│   └── projects/
│       ├── snaplocate.md    # SnapLocate case study
│       └── cryptocrafters.md # CryptoCrafters case study
└── public/                  # Static assets (images, resume, etc.)
```

## ✏️ How to Edit Content

All content is stored in easily editable JSON and Markdown files in the `/data` directory.

### Personal Information
**File**: `data/personal.json`

Edit your name, tagline, contact info, and about section:

```json
{
  "name": "Your Name",
  "tagline": "Your one-line pitch",
  "email": "your@email.com",
  "github": "https://github.com/yourusername",
  "linkedin": "https://linkedin.com/in/yourusername",
  "about": {
    "intro": "Your introduction...",
    "approach": "Your approach...",
    "current": "What you're doing now..."
  }
}
```

### Skills
**File**: `data/skills.json`

Update your web development and cybersecurity skills:

```json
{
  "webDevelopment": {
    "categories": [
      {
        "name": "Frontend",
        "skills": ["HTML", "CSS", "JavaScript", ...]
      }
    ]
  }
}
```

### Projects
**Files**: `data/projects.json` + `data/projects/*.md`

1. **Add project metadata** in `projects.json`:
```json
{
  "id": "project-id",
  "title": "Project Name",
  "tech": ["React", "Node.js"],
  "links": {
    "live": "https://...",
    "github": "https://..."
  },
  "detailsFile": "project-id.md"
}
```

2. **Create detailed case study** in `data/projects/project-id.md`:
```markdown
---
title: Project Name
problem: The problem you solved
solution: Your solution
---

## Problem Statement
Detailed description...

## Solution Overview
How you solved it...
```

### Experience
**File**: `data/experience.json`

Add internships, jobs, or learning experiences:

```json
{
  "title": "Job Title",
  "company": "Company Name",
  "period": "Jan 2024 - Present",
  "responsibilities": ["Task 1", "Task 2"],
  "technologies": ["Tech1", "Tech2"]
}
```

### Certifications
**File**: `data/certifications.json`

Add new certifications or courses:

```json
{
  "title": "Certification Name",
  "issuer": "Issuing Organization",
  "category": "Web Development" or "Cybersecurity",
  "skills": ["Skill1", "Skill2"]
}
```

### Timeline
**File**: `data/timeline.json`

Update your career progression:

```json
{
  "year": "2024",
  "title": "Phase Name",
  "description": "What happened",
  "milestones": ["Achievement 1", "Achievement 2"]
}
```

## 🎨 Theme Customization

Edit colors and styles in `app/globals.css`:

```css
:root {
  --accent-primary: #06b6d4;  /* Main accent color */
  --accent-secondary: #0891b2; /* Hover state */
  /* ... other variables */
}
```

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see your portfolio.

## 📦 Adding New Projects

1. Add project metadata to `data/projects.json`
2. Create `data/projects/your-project.md` with detailed case study
3. (Optional) Add project image to `public/projects/your-project.png`
4. The project will automatically appear on the site!

## 🔒 Security Features

- Server-side rendering for SEO
- No client-side secrets
- Proper meta tags for social sharing
- Semantic HTML for accessibility
- Focus states for keyboard navigation

## 📱 Responsive Design

The portfolio is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🎯 Design Philosophy

- **Minimal**: No flashy animations, clean layouts
- **Professional**: Serious tech aesthetic
- **Readable**: High contrast, clear typography
- **Fast**: Optimized for performance
- **Accessible**: Keyboard navigation, screen reader friendly

## 📄 License

Personal portfolio - all rights reserved.

---

**Built by Raushan Raj** | Full Stack Developer & Cybersecurity Enthusiast
