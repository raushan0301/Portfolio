'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Detect active section - check in reverse order (bottom to top)
            const sections = ['about', 'skills', 'projects', 'experience', 'timeline', 'contact'];

            // Check if we're near the bottom of the page (for Contact section)
            const isNearBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;
            if (isNearBottom) {
                setActiveSection('contact');
                return;
            }

            // Check sections in reverse order to prioritize lower sections
            const current = [...sections].reverse().find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Section is active if its top is above the middle of viewport
                    return rect.top <= window.innerHeight / 2 && rect.bottom >= 100;
                }
                return false;
            });

            if (current) setActiveSection(current);
        };

        handleScroll(); // Run on mount
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const navItems = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Timeline', href: '#timeline' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4"
        >
            {/* Floating pill container */}
            <div
                className={`transition-all duration-300 rounded-full flex items-center gap-6 ${scrolled
                    ? 'bg-[var(--bg-primary)]/90 backdrop-blur-xl border border-[var(--border-primary)] shadow-xl'
                    : 'bg-[var(--bg-primary)]/80 backdrop-blur-lg border border-[var(--border-primary)]/60 shadow-lg'
                    }`}
                style={{
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                }}
            >
                {/* Profile Picture - Clickable link to Hero */}
                <a
                    href="#"
                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--border-primary)] flex-shrink-0 transition-all duration-200 hover:border-[var(--accent-primary)] hover:scale-105 cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </a>

                {/* Navigation Items - All links */}
                <div className="flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.substring(1);
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-all duration-200 whitespace-nowrap relative pb-1 ${isActive
                                    ? 'text-[var(--accent-primary)]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {item.name}
                                {/* Active indicator - underline */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavSection"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)]"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </div>
            </div>
        </motion.nav>
    );
}
