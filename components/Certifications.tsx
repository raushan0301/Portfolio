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
    const isInView = useInView(ref, { margin: "0px", amount: 0.2 });

    const webDevCerts = certifications.filter(c => c.category === 'Web Development');
    const securityCerts = certifications.filter(c => c.category === 'Cybersecurity');

    const isInProgress = (date: string) => date.includes('Present') || date.includes('In Progress');

    const CertCard = ({ cert, index }: { cert: Certification; index: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card h-full flex flex-col"
        >
            {/* Title with Status Badge */}
            <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-tight flex-1">
                    {cert.title}
                </h3>
                {isInProgress(cert.date) ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                        <FaClock className="text-[10px]" />
                        In Progress
                    </span>
                ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                        <FaCheckCircle className="text-[10px]" />
                        Completed
                    </span>
                )}
            </div>

            {/* Issuer & Date - Smaller & Muted */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 mb-2 sm:mb-3">
                <p className="text-xs sm:text-sm font-medium text-[var(--accent-primary)]">
                    {cert.issuer}
                </p>
                <p className="text-[10px] sm:text-xs text-[var(--text-tertiary)]">{cert.date}</p>
            </div>

            {/* Description - Shorter & Lighter */}
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3 sm:mb-4 opacity-80">
                {cert.description}
            </p>

            {/* Bottom section - pushed to bottom with mt-auto */}
            <div className="mt-auto">
                {/* Tags - Smaller Pills with Lower Opacity */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {cert.skills.map((skill, idx) => (
                        <span
                            key={idx}
                            className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-full text-[var(--text-tertiary)] opacity-70 hover:opacity-100 transition-opacity"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* View Certificate Link - Only if available */}
                {cert.certificateUrl && (
                    <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors "
                    >
                        <FaExternalLinkAlt className="text-[10px] sm:text-xs " />
                        View Certificate
                    </a>
                )}
            </div>
        </motion.div>
    );

    return (
        <section id="certifications" className="section-spacing bg-[var(--bg-secondary)]">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Header */}
                    <div className="section-header mb-6 sm:mb-10">
                        <h2 className="section-title">Certifications & Learning</h2>
                        <div className="section-underline" />
                    </div>

                    {/* Web Development Section */}
                    {webDevCerts.length > 0 && (
                        <div className="mb-8 sm:mb-12">
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-1 sm:mb-2">
                                    Web Development
                                </h3>
                                <p className="text-sm text-[var(--text-tertiary)] opacity-70">
                                    Full-stack development courses covering frontend, backend, and deployment
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
                                {webDevCerts.map((cert, idx) => (
                                    <CertCard key={cert.id} cert={cert} index={idx} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Divider with proper spacing */}
                    {webDevCerts.length > 0 && securityCerts.length > 0 && (
                        <div style={{ paddingTop: '48px', paddingBottom: '30px' }}>
                            <div className="h-px bg-[var(--border-primary)]" />
                        </div>
                    )}

                    {/* Cybersecurity Section */}
                    {securityCerts.length > 0 && (
                        <div>
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-1 sm:mb-2">
                                    Cybersecurity & Ethical Hacking
                                </h3>
                                <p className="text-sm text-[var(--text-tertiary)] opacity-70">
                                    Security-focused learning and hands-on labs in ethical hacking & defense
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
                                {securityCerts.map((cert, idx) => (
                                    <CertCard key={cert.id} cert={cert} index={idx + webDevCerts.length} />
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
