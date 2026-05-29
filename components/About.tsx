'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AboutProps {
    intro: string;
    approach: string;
    current: string;
}

const strengths = [
    { icon: '🏗️', label: 'Full-Stack Architecture', sub: 'End-to-end system design' },
    { icon: '🔐', label: 'Security-First Dev', sub: 'RBAC, auth & hardening' },
    { icon: '⚡', label: 'Production Quality', sub: 'Scalable, maintainable code' },
    { icon: '🛡️', label: 'Ethical Hacking', sub: 'CEH v13 & CND v3 labs' },
];

export default function About({ intro }: Pick<AboutProps, 'intro'>) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: '0px', amount: 0.2 });

    // Compact intro: first two sentences max
    const compactIntro = intro.split('.').slice(0, 2).join('.') + '.';

    return (
        <section id="about" className="section-spacing pt-20 sm:pt-24 md:pt-32 xl:pt-20" style={{ background: 'rgba(17,17,17,0.5)', backdropFilter: 'blur(8px)' }}>
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

                    {/* Compact 2-line intro */}
                    <motion.p
                        className="text-base sm:text-lg leading-relaxed text-[var(--text-primary)] font-medium mb-8 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {compactIntro}
                    </motion.p>

                    {/* 4 visual icon cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        {strengths.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
                                className="card flex flex-col items-center text-center gap-2 py-5 px-3 group cursor-default"
                            >
                                <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </span>
                                <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] leading-tight">
                                    {item.label}
                                </span>
                                <span className="text-[10px] sm:text-xs text-[var(--text-tertiary)] leading-snug">
                                    {item.sub}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
