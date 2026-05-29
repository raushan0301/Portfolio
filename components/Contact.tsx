'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

interface ContactProps {
    email: string;
    github: string;
    linkedin: string;
}

export default function Contact({ email, github, linkedin }: ContactProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: '0px', amount: 0.2 });

    const buttons = [
        {
            href: `mailto:${email}`,
            icon: FaEnvelope,
            label: 'Send Email',
            external: false,
        },
        {
            href: linkedin,
            icon: FaLinkedin,
            label: 'LinkedIn',
            external: true,
        },
        {
            href: github,
            icon: FaGithub,
            label: 'GitHub',
            external: true,
        },
    ];

    return (
        <section id="contact" className="section-spacing" style={{ background: 'rgba(17,17,17,0.5)', backdropFilter: 'blur(8px)' }}>
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="section-header text-center">
                        <h2 className="section-title text-center">Get In Touch</h2>
                        <div className="section-underline-center" />
                    </div>

                    <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-10 px-4 max-w-xl mx-auto">
                        Open to full-stack and cybersecurity roles — let's build something great together.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                        {buttons.map(({ href, icon: Icon, label, external }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={external ? '_blank' : undefined}
                                rel={external ? 'noopener noreferrer' : undefined}
                                className="glass-button px-6 sm:px-8 py-3 sm:py-4 text-[var(--text-primary)] font-medium rounded-lg flex items-center justify-center gap-2.5 text-sm sm:text-base"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Icon className="text-lg sm:text-xl text-[var(--accent-primary)]" />
                                {label}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
