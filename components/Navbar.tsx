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

            // Detect active section
            const sections = ['about', 'skills', 'projects', 'experience', 'timeline', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

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
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
                ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-primary)]'
                : 'bg-transparent'
                }`}
        >
            <div className="section-container">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">
                        RR
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.href.substring(1);
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`text-sm transition-all duration-200 relative ${isActive
                                            ? 'text-[var(--accent-primary)]'
                                            : 'text-[var(--text-secondary)] opacity-70 hover:opacity-100 hover:text-[var(--accent-primary)]'
                                        }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent-primary)]"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* Mobile menu button - simplified for now */}
                    <div className="md:hidden">
                        <button className="text-[var(--text-primary)]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
