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
    const isInView = useInView(ref, { margin: "0px", amount: 0.2 });

    return (
        <section id="contact" className="section-spacing bg-[var(--bg-secondary)]">
            <div className="section-container ">
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

                    <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] mb-8 sm:mb-12 px-4">
                        I'm currently looking for opportunities in full-stack development and cybersecurity roles.
                        Whether you have a question or just want to connect, feel free to reach out.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
                        <a
                            href={`mailto:${email}`}
                            className="px-5 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            <FaEnvelope className="text-lg sm:text-xl" />
                            Send Email
                        </a>

                        <Link
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            <FaLinkedin className="text-lg sm:text-xl" />
                            LinkedIn
                        </Link>

                        <Link
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            <FaGithub className="text-lg sm:text-xl" />
                            GitHub
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
