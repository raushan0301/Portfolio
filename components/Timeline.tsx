'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface TimelineEvent {
    id: string;
    year: string;
    title: string;
    description: string;
    milestones: string[];
}

interface TimelineProps {
    events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: '0px', amount: 0.1 });

    return (
        <section id="timeline" className="section-spacing">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-header">
                        <h2 className="section-title">Timeline</h2>
                        <div className="section-underline" />
                    </div>

                    <div className="relative max-w-3xl">
                        {/* Animated vertical line */}
                        <motion.div
                            className="absolute left-4 sm:left-5 top-0 w-px bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-purple)] to-transparent"
                            initial={{ height: 0 }}
                            animate={isInView ? { height: '100%' } : { height: 0 }}
                            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                        />

                        <div className="flex flex-col gap-8 sm:gap-10">
                            {events.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.12 }}
                                    className="relative flex items-start gap-6 sm:gap-8 pl-12 sm:pl-14"
                                >
                                    {/* Glowing animated dot */}
                                    <div className="absolute left-0 top-1 flex items-center justify-center">
                                        <motion.div
                                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-card border border-[var(--accent-primary)]/40 flex items-center justify-center"
                                            animate={isInView ? {
                                                boxShadow: [
                                                    '0 0 0 0 rgba(6,182,212,0.4)',
                                                    '0 0 0 8px rgba(6,182,212,0)',
                                                ]
                                            } : {}}
                                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                        >
                                            <span className="text-[10px] font-bold text-[var(--accent-primary)]">
                                                {event.year.slice(-2)}
                                            </span>
                                        </motion.div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                            <span className="text-xs font-semibold text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-0.5 rounded">
                                                {event.year}
                                            </span>
                                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                                                {event.title}
                                            </h3>
                                        </div>
                                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
