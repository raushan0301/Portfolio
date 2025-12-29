'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SkillCategory {
    name: string;
    skills: string[];
}

interface SkillSection {
    title: string;
    description: string;
    categories: SkillCategory[];
}

interface SkillsProps {
    webDevelopment: SkillSection;
    cybersecurity: SkillSection;
}

export default function Skills({ webDevelopment, cybersecurity }: SkillsProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const SkillCard = ({ section, index }: { section: SkillSection; index: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="card h-full hover:border-[var(--accent-primary)] transition-colors"
        >
            {/* Card Title */}
            <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">
                {section.title}
            </h3>
            <p className="text-sm text-[var(--text-tertiary)] mb-6">{section.description}</p>

            {/* 2-Column Grid Layout */}
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
                {section.categories.map((category, idx) => (
                    <div key={idx}>
                        {/* Stronger Category Header */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-1 h-1 rounded-full bg-[var(--accent-primary)]"></span>
                            <h4 className="text-xs font-bold text-[var(--text-primary)]">
                                {category.name}
                            </h4>
                        </div>

                        {/* Skills with Max 4-5 per row */}
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, skillIdx) => (
                                <span
                                    key={skillIdx}
                                    className="px-2.5 py-1 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded text-xs text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors whitespace-nowrap"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <section id="skills" className="section-spacing">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-header">
                        <h2 className="section-title">Skills & Expertise</h2>
                        <div className="section-underline" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        <SkillCard section={webDevelopment} index={0} />
                        <SkillCard section={cybersecurity} index={1} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}