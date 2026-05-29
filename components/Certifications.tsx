'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCheckCircle, FaClock, FaExternalLinkAlt } from 'react-icons/fa';

interface Certification {
    id: string;
    title: string;
    issuer: string;
    date: string;
    category: string;
    description: string;
    skills: string[];
    certificateUrl?: string;
}

interface CertificationsProps {
    certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: '0px', amount: 0.15 });

    const isInProgress = (date: string) =>
        date.includes('Present') || date.includes('In Progress');

    return (
        <section id="certifications" className="section-spacing" style={{ background: 'rgba(17,17,17,0.7)', backdropFilter: 'blur(8px)' }}>
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-header mb-6 sm:mb-10">
                        <h2 className="section-title">Certifications</h2>
                        <div className="section-underline" />
                    </div>

                    {/* Single unified compact grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="card flex flex-col gap-3"
                            >
                                {/* Title + status badge */}
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-snug flex-1">
                                        {cert.title}
                                    </h3>
                                    {isInProgress(cert.date) ? (
                                        <span className="flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                                            <FaClock className="text-[8px]" />
                                            In Progress
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-[10px] font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                                            <FaCheckCircle className="text-[8px]" />
                                            Done
                                        </span>
                                    )}
                                </div>

                                {/* Issuer + date */}
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-medium text-[var(--accent-primary)]">
                                        {cert.issuer}
                                    </span>
                                    <span className="text-[10px] text-[var(--text-tertiary)]">
                                        {cert.date}
                                    </span>
                                </div>

                                {/* Skills pills */}
                                <div className="flex flex-wrap gap-1">
                                    {cert.skills.slice(0, 4).map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] px-2 py-0.5 glass-card border border-[var(--glass-border)] rounded-full text-[var(--text-tertiary)]"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {cert.skills.length > 4 && (
                                        <span className="text-[10px] text-[var(--text-tertiary)] px-1">
                                            +{cert.skills.length - 4}
                                        </span>
                                    )}
                                </div>

                                {/* Certificate link */}
                                {cert.certificateUrl && (
                                    <a
                                        href={cert.certificateUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors mt-auto"
                                    >
                                        <FaExternalLinkAlt className="text-[10px]" />
                                        View Certificate
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
