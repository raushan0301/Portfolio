'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AboutProps {
    intro: string;
    approach: string;
    current: string;
}

export default function About({ intro, approach, current }: AboutProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="section-spacing bg-[var(--bg-secondary)]">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-header">
                        <h2 className="section-title">About</h2>
                        <div className="section-underline" />
                    </div>

                    {/* Two-column layout */}
                    <div className="grid md:grid-cols-5 gap-12 md:gap-16">
                        {/* Left: Short intro */}
                        <div className="md:col-span-2">
                            <p className="text-lg leading-relaxed text-[var(--text-primary)] font-medium">
                                {intro}
                            </p>
                        </div>

                        {/* Right: Structured content */}
                        <div className="md:col-span-3 space-y-8">
                            <div>
                                <h3 className="text-base font-semibold text-[var(--accent-primary)] mb-4 uppercase tracking-wide">
                                    My Approach
                                </h3>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {approach}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-base font-semibold text-[var(--accent-primary)] mb-4 uppercase tracking-wide">
                                    Currently
                                </h3>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {current}
                                </p>
                            </div>

                            {/* Key strengths as bullets */}
                            <div>
                                <h3 className="text-base font-semibold text-[var(--accent-primary)] mb-4 uppercase tracking-wide">
                                    Core Strengths
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        'Security-first development mindset',
                                        'Full-stack architecture & system design',
                                        'Role-based access control implementation',
                                        'Production-grade code quality'
                                    ].map((strength, idx) => (
                                        <li key={idx} className="flex items-start text-[var(--text-secondary)]">
                                            <span className="text-[var(--accent-primary)] mr-3 mt-1">✓</span>
                                            <span>{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
