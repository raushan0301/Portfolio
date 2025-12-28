# Content Editing Guide

This guide explains how to easily update your portfolio content without touching any code.

## 📝 Quick Start

All your content lives in the `/data` folder as JSON and Markdown files. Simply edit these files to update your portfolio!

## 🎯 What You Can Edit

### 1. Personal Information (`data/personal.json`)

**What to update:**
- Your name, tagline, and contact information
- About section text
- Social media links

**Example:**
```json
{
  "name": "Raushan Raj",
  "email": "your.email@example.com",
  "github": "https://github.com/yourusername",
  "linkedin": "https://linkedin.com/in/yourusername"
}
```

**When to edit:** 
- When you get a new email address
- When you update your LinkedIn profile
- When you want to change your tagline

---

### 2. Skills (`data/skills.json`)

**What to update:**
- Web development skills (Frontend, Backend, Databases)
- Cybersecurity skills
- Skill categories and descriptions

**How to add a new skill:**
```json
{
  "webDevelopment": {
    "categories": [
      {
        "name": "Frontend",
        "skills": ["HTML", "CSS", "JavaScript", "React", "Vue.js"]
        // Just add "Vue.js" to the array!
      }
    ]
  }
}
```

**When to edit:**
- When you learn a new technology
- When you want to reorganize your skills
- When you want to emphasize different areas

---

### 3. Projects (`data/projects.json` + `data/projects/*.md`)

**Adding a new project (3 steps):**

**Step 1:** Add project metadata to `data/projects.json`:
```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "tagline": "Short description",
  "category": "Full Stack Web Application",
  "tech": ["React", "Node.js", "MongoDB"],
  "year": "2025",
  "featured": true,
  "links": {
    "live": "https://myproject.com",
    "github": "https://github.com/yourusername/myproject"
  },
  "image": "/projects/myproject.png",
  "shortDescription": "Brief overview for the card",
  "detailsFile": "my-new-project.md"
}
```

**Step 2:** Create `data/projects/my-new-project.md`:
```markdown
---
title: My New Project
problem: What problem did you solve?
solution: How did you solve it?
---

## Problem Statement
Describe the problem in detail...

## Solution Overview
Explain your solution...

## Architecture & Tech Stack
**Frontend:**
- React for UI
- Tailwind for styling

**Backend:**
- Node.js with Express
- MongoDB for database

## Security Considerations
- Authentication implementation
- Data validation
- API security

## Impact
What was the result?
```

**Step 3:** (Optional) Add project image to `public/projects/myproject.png`

**When to edit:**
- When you complete a new project
- When you want to update project details
- When you add new features to existing projects

---

### 4. Experience (`data/experience.json`)

**Adding a new job/internship:**
```json
{
  "id": "unique-id",
  "title": "Software Engineer",
  "company": "Tech Company",
  "location": "City, Country",
  "period": "Jan 2025 - Present",
  "type": "Full-time",
  "description": "Brief overview of the role",
  "responsibilities": [
    "Built scalable web applications",
    "Implemented security features",
    "Collaborated with team members"
  ],
  "technologies": ["React", "Node.js", "AWS"]
}
```

**When to edit:**
- When you start a new job or internship
- When your responsibilities change
- When you complete a significant project at work

---

### 5. Certifications (`data/certifications.json`)

**Adding a new certification:**
```json
{
  "id": "cert-id",
  "title": "AWS Certified Developer",
  "issuer": "Amazon Web Services",
  "date": "2025",
  "category": "Web Development",  // or "Cybersecurity"
  "description": "What you learned",
  "skills": ["AWS", "Cloud Computing", "DevOps"]
}
```

**When to edit:**
- When you complete a new course or certification
- When you want to highlight specific learning achievements

---

### 6. Career Timeline (`data/timeline.json`)

**Adding a new milestone:**
```json
{
  "id": "phase-id",
  "year": "2025",
  "title": "Professional Growth",
  "description": "What happened during this period",
  "milestones": [
    "Started full-time position",
    "Led major project",
    "Learned new technology"
  ]
}
```

**When to edit:**
- At the end of each year
- When you reach a major career milestone
- When you want to show your growth journey

---

## 🎨 Customizing Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  /* Change these values */
  --accent-primary: #06b6d4;     /* Main accent (cyan) */
  --accent-secondary: #0891b2;   /* Hover state */
  
  /* Or try different colors */
  --accent-primary: #10b981;     /* Green */
  --accent-primary: #8b5cf6;     /* Purple */
  --accent-primary: #3b82f6;     /* Blue */
}
```

---

## 🚀 Seeing Your Changes

After editing any file:

1. **Save the file**
2. **The website updates automatically** (if dev server is running)
3. **Refresh your browser** if changes don't appear

---

## ✅ Best Practices

### For Projects:
- ✅ Write clear problem statements
- ✅ Explain your technical decisions
- ✅ Highlight security considerations
- ✅ Include measurable impact
- ❌ Don't just list features

### For Skills:
- ✅ Only list skills you're comfortable discussing
- ✅ Organize by proficiency level
- ✅ Keep it updated
- ❌ Don't add every technology you've touched once

### For Experience:
- ✅ Use action verbs (Built, Implemented, Designed)
- ✅ Quantify achievements when possible
- ✅ Focus on impact, not just tasks
- ❌ Don't write generic job descriptions

### For Timeline:
- ✅ Show intentional progression
- ✅ Highlight key learning moments
- ✅ Connect milestones to your goals
- ❌ Don't just list dates

---

## 🔧 Common Tasks

### "I want to add a new project"
1. Edit `data/projects.json` (add metadata)
2. Create `data/projects/project-name.md` (add details)
3. Save both files
4. Refresh browser

### "I learned a new skill"
1. Open `data/skills.json`
2. Find the right category
3. Add the skill to the array
4. Save and refresh

### "I got a new certification"
1. Open `data/certifications.json`
2. Copy an existing entry
3. Update with your new certification
4. Save and refresh

### "I want to update my contact info"
1. Open `data/personal.json`
2. Update email, GitHub, or LinkedIn
3. Save and refresh

---

## 📱 Testing Your Changes

Before deploying:
1. ✅ Check all sections scroll smoothly
2. ✅ Click on project cards to test modals
3. ✅ Verify all links work
4. ✅ Test on mobile (resize browser)
5. ✅ Check for typos

---

## 🆘 Troubleshooting

**Changes not showing?**
- Make sure you saved the file
- Check the terminal for errors
- Try hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

**Project modal not opening?**
- Check that `detailsFile` matches the `.md` filename
- Verify the markdown file exists in `data/projects/`

**Skills not displaying?**
- Check JSON syntax (commas, brackets, quotes)
- Use a JSON validator if needed

---

## 💡 Pro Tips

1. **Keep backups** before making major changes
2. **Edit one file at a time** to catch errors easily
3. **Use consistent formatting** in your content
4. **Update regularly** to keep portfolio fresh
5. **Test on different devices** before sharing

---

## 📚 File Reference

```
data/
├── personal.json          → Your info, about, contact
├── skills.json           → Web dev & security skills
├── projects.json         → Project metadata
├── experience.json       → Jobs & internships
├── certifications.json   → Courses & certs
├── timeline.json         → Career milestones
└── projects/
    ├── snaplocate.md     → Project case study
    └── cryptocrafters.md → Project case study
```

---

**Need help?** Check the main README.md for technical details or contact information.
