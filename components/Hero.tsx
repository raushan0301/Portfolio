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
                    {/* Profile Photo - 3D Flip on Hover */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8 flex justify-center"
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="relative group"
                            style={{ perspective: '1000px' }}
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                            {/* Flip container */}
                            <div
                                className="flip-container relative w-[280px] h-[280px] cursor-pointer"
                                style={{
                                    transformStyle: 'preserve-3d',
                                }}
                                onMouseEnter={(e) => {
                                    const front = e.currentTarget.querySelector('.flip-front') as HTMLElement;
                                    const back = e.currentTarget.querySelector('.flip-back') as HTMLElement;
                                    if (front && back) {
                                        front.style.transform = 'rotateY(180deg)';
                                        back.style.transform = 'rotateY(0deg)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const front = e.currentTarget.querySelector('.flip-front') as HTMLElement;
                                    const back = e.currentTarget.querySelector('.flip-back') as HTMLElement;
                                    if (front && back) {
                                        front.style.transform = 'rotateY(0deg)';
                                        back.style.transform = 'rotateY(-180deg)';
                                    }
                                }}
                            >
                                {/* Front side */}
                                <div
                                    className="flip-front absolute w-full h-full rounded-2xl overflow-hidden border-2 border-[var(--border-primary)] group-hover:border-[var(--accent-primary)]"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(0deg)',
                                        transition: 'transform 0.7s ease-in-out, border-color 0.3s',
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    <img
                                        src="/profile.jpg"
                                        alt="Raushan Raj"
                                        width={280}
                                        height={280}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Back side (flipped) */}
                                <div
                                    className="flip-back absolute w-full h-full rounded-2xl overflow-hidden border-2 border-[var(--accent-primary)]"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(-180deg)',
                                        transition: 'transform 0.7s ease-in-out',
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    <img
                                        src="/profile.jpg"
                                        alt="Raushan Raj"
                                        width={280}
                                        height={280}
                                        className="w-full h-full object-cover scale-110"
                                    />
                                    {/* Enhanced gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/40 to-[var(--accent-secondary)]/40 backdrop-blur-sm" />

                                    {/* Hi with wave emoji */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="text-center"
                                        >
                                            <h2 className="text-6xl font-bold text-white mb-2">
                                                Hi
                                            </h2>
                                            <motion.span
                                                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                                className="text-7xl inline-block"
                                            >
                                                👋
                                            </motion.span>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

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
                            className="button px-6 py-3 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] flex items-center gap-2"
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
                            target="_blank"
                            rel="noopener noreferrer"
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
