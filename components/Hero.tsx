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

            <div className="section-container relative z-10 py-16 pt-24 sm:py-20 sm:pt-28 md:py-20 md:pt-32 lg:pt-40 xl:pt-32 2xl:pt-20">
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
                        className="mb-6 sm:mb-8 flex justify-center"
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
                                className="flip-container relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] lg:w-[220px] lg:h-[220px] xl:w-[240px] xl:h-[240px] 2xl:w-[280px] 2xl:h-[280px] cursor-pointer"
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
                                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                                                Hi
                                            </h2>
                                            <motion.span
                                                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl inline-block"
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
                        className="mb-4 sm:mb-6 px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {name}
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 max-w-3xl mx-auto px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {tagline}
                    </motion.p>

                    {/* Subtitle */}
                    <motion.p
                        className="text-sm sm:text-base mb-2 text-[var(--text-tertiary)] px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {subtitle}
                    </motion.p>

                    {/* Focus areas */}
                    <motion.p
                        className="text-sm sm:text-base mb-8 sm:mb-12 gradient-text font-medium px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {focus}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <a
                            href="#projects"
                            className="button px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] flex items-center gap-2 text-xs sm:text-sm md:text-base whitespace-nowrap"
                        >
                            View Projects
                        </a>

                        <Link
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] flex items-center gap-2 text-xs sm:text-sm md:text-base whitespace-nowrap"
                        >
                            <FaGithub className="text-base sm:text-lg md:text-xl" />
                            GitHub
                        </Link>

                        <Link
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] flex items-center gap-2 text-xs sm:text-sm md:text-base whitespace-nowrap"
                        >
                            <FaLinkedin className="text-base sm:text-lg md:text-xl" />
                            LinkedIn
                        </Link>

                        <a
                            href={resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] flex items-center gap-2 text-xs sm:text-sm md:text-base whitespace-nowrap"
                        >
                            <FaFileDownload className="text-base sm:text-lg md:text-xl" />
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
