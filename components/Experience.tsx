'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    type: string;
    description: string;
    responsibilities: string[];
    technologies: string[];
}

interface ExperienceProps {
    experiences: Experience[];
}

export default function Experience({ experiences }: ExperienceProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const getTypeIcon = (type: string) => {
        if (type.toLowerCase().includes('learning')) {
            return <FaGraduationCap className="text-xs" />;
        }
        return <FaBriefcase className="text-xs" />;
    };

    return (
        <section id="experience" className="section-spacing">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Header */}
                    <div className="section-header mb-10">
                        <h2 className="section-title">Experience</h2>
                        <div className="section-underline" />
                    </div>

                    {/* Increased gap between cards from gap-8 to gap-10 */}
                    <div className="flex flex-col gap-10">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="card max-w-4xl"
                                style={{ paddingTop: '20px', paddingBottom: '20px' }}
                            >
                                {/* Role Title - Largest, Most Dominant */}
                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2 leading-tight">
                                    {exp.title}
                                </h3>

                                {/* Meta Info - All Together, Muted, Single Line */}
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span className="text-sm font-medium text-[var(--accent-primary)]">
                                        {exp.company}
                                    </span>
                                    <span className="text-xs text-[var(--text-tertiary)] opacity-60">•</span>
                                    <span className="text-xs text-[var(--text-tertiary)] opacity-70">
                                        {exp.location}
                                    </span>
                                    <span className="text-xs text-[var(--text-tertiary)] opacity-60">•</span>
                                    <span className="text-xs text-[var(--text-tertiary)] opacity-70">
                                        {exp.period}
                                    </span>
                                    <span className="text-xs text-[var(--text-tertiary)] opacity-60">•</span>
                                    <span className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-full text-[var(--text-tertiary)] opacity-70">
                                        {getTypeIcon(exp.type)}
                                        {exp.type}
                                    </span>
                                </div>

                                {/* One-line Summary - Higher Contrast, Italic */}
                                <p className="text-sm text-[var(--text-primary)] italic leading-relaxed mb-4 opacity-85 font-medium">
                                    {exp.description}
                                </p>

                                {/* Key Responsibilities - Smaller Heading */}
                                <div className="mb-4">
                                    <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wide mb-2 opacity-70">
                                        Key Responsibilities
                                    </h4>
                                    {/* Compact Bullets - Reduced size and contrast */}
                                    <ul className="space-y-1.5">
                                        {exp.responsibilities.slice(0, 4).map((resp, idx) => (
                                            <li key={idx} className="text-sm text-[var(--text-secondary)] flex items-start opacity-75">
                                                <span className="text-[var(--accent-primary)] mr-2 mt-0.5 text-xs opacity-60">•</span>
                                                <span className="leading-relaxed">{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tech Stack - More Visible */}
                                <div className="pt-3 border-t border-[var(--border-primary)]">
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-full text-[var(--text-primary)] font-medium hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)] transition-all"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
