'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
import Link from 'next/link';

interface HeroProps {
    name: string;
    tagline: string;
    subtitle: string;
    focus: string;
    github: string;
    linkedin: string;
    resume: string;
}

export default function Hero({ name, tagline, subtitle, focus, github, linkedin, resume }: HeroProps) {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-secondary)] pointer-events-none" />

            <div className="section-container relative z-10 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Name */}
                    <motion.h1
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {name}
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        className="text-xl mb-4 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {tagline}
                    </motion.p>

                    {/* Subtitle */}
                    <motion.p
                        className="text-base mb-2 text-[var(--text-tertiary)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {subtitle}
                    </motion.p>

                    {/* Focus areas */}
                    <motion.p
                        className="text-base mb-12 gradient-text font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {focus}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-wrap gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <a
                            href="#projects"
                            className="button px-6 py-3 bg-[var(--accent-primary)] text-[var(--bg-primary)] font-medium rounded-lg hover:bg-[var(--accent-secondary)]"
                        >
                            View Projects
                        </a>

                        <Link
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button px-6 py-3 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] flex items-center gap-2"
                        >
                            <FaGithub className="text-xl" />
                            GitHub
                        </Link>

                        <Link
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button px-6 py-3 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] flex items-center gap-2"
                        >
                            <FaLinkedin className="text-xl" />
                            LinkedIn
                        </Link>

                        <a
                            href={resume}
                            download
                            className="button px-6 py-3 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] flex items-center gap-2"
                        >
                            <FaFileDownload className="text-xl" />
                            Resume
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                <a href="#about" className="block">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-[var(--border-primary)] rounded-full flex items-start justify-center p-2"
                    >
                        <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full" />
                    </motion.div>
                </a>
            </motion.div>
        </section>
    );
}
