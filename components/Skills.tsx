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
    const isInView = useInView(ref, { margin: '0px', amount: 0.15 });

    const allCategories = [
        ...webDevelopment.categories.map(c => ({ ...c, section: 'Web Dev' })),
        ...cybersecurity.categories.map(c => ({ ...c, section: 'Security' })),
    ];

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
                        <h2 className="section-title">Skills</h2>
                        <div className="section-underline" />
                    </div>

                    {/* Unified grid of all categories */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                        {allCategories.map((category, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: idx * 0.06 }}
                                className="card"
                            >
                                {/* Category header — minimal divider style */}
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                                        {category.name}
                                    </h4>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--glass-border)] text-[var(--text-tertiary)]">
                                        {category.section}
                                    </span>
                                </div>

                                {/* Interactive skill pills */}
                                <div className="flex flex-wrap gap-1.5">
                                    {category.skills.map((skill, skillIdx) => (
                                        <motion.span
                                            key={skillIdx}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3, delay: idx * 0.06 + skillIdx * 0.03 }}
                                            className="skill-pill px-2 sm:px-2.5 py-0.5 sm:py-1 glass-card border border-[var(--glass-border)] rounded text-[10px] sm:text-xs text-[var(--text-secondary)] cursor-default whitespace-nowrap"
                                        >
                                            {skill}
                                        </motion.span>
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