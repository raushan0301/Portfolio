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
    const isInView = useInView(ref, { margin: "0px", amount: 0.2 });

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
                        <div className="absolute left-2 sm:left-0 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-primary)] transform md:-translate-x-1/2" />

                        <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
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
                                    <div className="absolute left-2 sm:left-0 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-[var(--accent-primary)] rounded-full transform md:-translate-x-1/2 border-2 sm:border-4 border-[var(--bg-primary)] z-10" />

                                    {/* Content */}
                                    <div className={`flex-1 ml-6 sm:ml-8 md:ml-0 ${index % 2 === 0 ? 'md:text-left md:pr-12' : 'md:pl-12'}`}>
                                        <div className="card">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                                <span className="text-xs sm:text-sm font-semibold text-[var(--accent-primary)] bg-[var(--bg-secondary)] px-2 sm:px-3 py-1 rounded w-fit">
                                                    {event.year}
                                                </span>
                                                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                                                    {event.title}
                                                </h3>
                                            </div>
                                            <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] mb-3 sm:mb-4">{event.description}</p>
                                            <ul className="flex flex-col gap-1.5 sm:gap-2">
                                                {event.milestones.slice(0, 3).map((milestone, idx) => (
                                                    <li key={idx} className="text-xs sm:text-sm text-[var(--text-secondary)] flex items-start">
                                                        <span className="text-[var(--accent-primary)] mr-1.5 sm:mr-2">✓</span>
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
