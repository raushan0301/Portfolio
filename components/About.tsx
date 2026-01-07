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
    const isInView = useInView(ref, { margin: "0px", amount: 0.2 });

    return (
        <section id="about" className="section-spacing bg-[var(--bg-secondary)] pt-20 sm:pt-24 md:pt-32 xl:pt-20">
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
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 sm:gap-12 md:gap-16">
                        {/* Left: Short intro */}
                        <div className="md:col-span-2">
                            <p className="text-base sm:text-lg leading-relaxed text-[var(--text-primary)] font-medium">
                                {intro}
                            </p>
                        </div>

                        {/* Right: Structured content */}
                        <div className="md:col-span-3 flex flex-col gap-6 sm:gap-8">
                            <div>
                                <h3 className="text-sm sm:text-base font-semibold text-[var(--accent-primary)] mb-3 sm:mb-4 uppercase tracking-wide">
                                    My Approach
                                </h3>
                                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                                    {approach}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm sm:text-base font-semibold text-[var(--accent-primary)] mb-3 sm:mb-4 uppercase tracking-wide">
                                    Currently
                                </h3>
                                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                                    {current}
                                </p>
                            </div>

                            {/* Key strengths as bullets */}
                            <div>
                                <h3 className="text-sm sm:text-base font-semibold text-[var(--accent-primary)] mb-3 sm:mb-4 uppercase tracking-wide">
                                    Core Strengths
                                </h3>
                                <ul className="flex flex-col gap-2 sm:gap-3">
                                    {[
                                        'Full-stack architecture & system design',
                                        'Role-based access control implementation',
                                        'Production-grade code quality',
                                        'Security-first development mindset'
                                    ].map((strength, idx) => (
                                        <li key={idx} className="flex items-start text-sm sm:text-base text-[var(--text-secondary)]">
                                            <span className="text-[var(--accent-primary)] mr-2 sm:mr-3 mt-1">✓</span>
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
