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
    const isInView = useInView(ref, { margin: '0px', amount: 0.2 });

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
                    <div className="section-header mb-10">
                        <h2 className="section-title">Experience</h2>
                        <div className="section-underline" />
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-5">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="card max-w-4xl"
                            >
                                {/* Top row: title + type badge */}
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-tight">
                                        {exp.title}
                                    </h3>
                                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs px-2 py-1 glass-card border border-[var(--glass-border)] rounded-full text-[var(--text-tertiary)] whitespace-nowrap flex-shrink-0">
                                        {getTypeIcon(exp.type)}
                                        {exp.type}
                                    </span>
                                </div>

                                {/* Meta — company • location • period on one muted line */}
                                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                                    <span className="text-xs sm:text-sm font-medium text-[var(--accent-primary)]">
                                        {exp.company}
                                    </span>
                                    <span className="text-[10px] text-[var(--text-tertiary)]">•</span>
                                    <span className="text-[10px] sm:text-xs text-[var(--text-tertiary)]">
                                        {exp.location}
                                    </span>
                                    <span className="text-[10px] text-[var(--text-tertiary)]">•</span>
                                    <span className="text-[10px] sm:text-xs text-[var(--text-tertiary)]">
                                        {exp.period}
                                    </span>
                                </div>

                                {/* Single-line description */}
                                <p className="text-xs sm:text-sm text-[var(--text-secondary)] italic leading-relaxed mb-4">
                                    {exp.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="pt-3 border-t border-[var(--glass-border)] flex flex-wrap gap-1.5">
                                    {exp.technologies.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="skill-pill text-[10px] sm:text-xs px-2 sm:px-3 py-1 glass-card border border-[var(--glass-border)] rounded-full text-[var(--text-secondary)] font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
