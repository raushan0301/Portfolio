import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Timeline from '@/components/Timeline';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoBackground from '@/components/VideoBackground';

// Load data from JSON files
function loadJSON(filename: string) {
  const filePath = path.join(process.cwd(), 'data', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Load markdown project details
function loadProjectDetails() {
  const projectsDir = path.join(process.cwd(), 'data', 'projects');
  const files = fs.readdirSync(projectsDir);
  const details: { [key: string]: string } = {};

  files.forEach((filename) => {
    if (filename.endsWith('.md')) {
      const filePath = path.join(projectsDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { content } = matter(fileContents);
      const id = filename.replace('.md', '');
      details[id] = content;
    }
  });

  return details;
}

export default function Home() {
  // Load all data
  const personal = loadJSON('personal.json');
  const skills = loadJSON('skills.json');
  const projects = loadJSON('projects.json');
  const experience = loadJSON('experience.json');
  const certifications = loadJSON('certifications.json');
  const timeline = loadJSON('timeline.json');
  const projectDetails = loadProjectDetails();

  return (
    <main className="min-h-screen">
      {/* Animated Video Background */}
      <VideoBackground />

      <Navbar />

      <Hero
        name={personal.name}
        tagline={personal.tagline}
        subtitle={personal.subtitle}
        focus={personal.focus}
        github={personal.github}
        linkedin={personal.linkedin}
        resume={personal.resume}
      />

      <About
        intro={personal.about.intro}
        approach={personal.about.approach}
        current={personal.about.current}
      />

      <Skills
        webDevelopment={skills.webDevelopment}
        cybersecurity={skills.cybersecurity}
      />

      <Projects
        projects={projects}
        projectDetails={projectDetails}
      />

      <Experience experiences={experience} />

      <Certifications certifications={certifications} />

      <Timeline events={timeline} />

      <Contact
        email={personal.email}
        github={personal.github}
        linkedin={personal.linkedin}
      />

      <Footer />
    </main>
  );
}
