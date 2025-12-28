'use client';

import { motion } from 'framer-motion';
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
    const isInView = useInView(ref, { once: true, margin: "-100px" });

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
                        <h2 className="section-title">Career Timeline</h2>
                        <div className="section-underline" />
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-primary)] transform md:-translate-x-1/2" />

                        <div className="space-y-16">
                            {events.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        } flex-col md:gap-8`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[var(--accent-primary)] rounded-full transform md:-translate-x-1/2 border-4 border-[var(--bg-primary)] z-10" />

                                    {/* Content */}
                                    <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:text-left md:pr-12' : 'md:pl-12'}`}>
                                        <div className="card">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-sm font-semibold text-[var(--accent-primary)] bg-[var(--bg-secondary)] px-3 py-1 rounded">
                                                    {event.year}
                                                </span>
                                                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                                                    {event.title}
                                                </h3>
                                            </div>
                                            <p className="text-[var(--text-secondary)] mb-4">{event.description}</p>
                                            <ul className="space-y-2">
                                                {event.milestones.slice(0, 3).map((milestone, idx) => (
                                                    <li key={idx} className="text-sm text-[var(--text-secondary)] flex items-start">
                                                        <span className="text-[var(--accent-primary)] mr-2">✓</span>
                                                        <span>{milestone}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className="hidden md:block flex-1" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
