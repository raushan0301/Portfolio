'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


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

    const handleNavClick = (href: string) => {
        setMobileMenuOpen(false);
        // Smooth scroll handled by anchor
    };

    const handleProfileClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // On mobile, toggle menu; on desktop, scroll to top
        if (window.innerWidth < 768) {
            setMobileMenuOpen(!mobileMenuOpen);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="fixed top-6 left-0 right-0 z-50 px-4"
            >
                {/* Desktop: Centered pill container */}
                <div className="hidden md:flex justify-center">
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
                        {/* Profile Picture - Desktop */}
                        <a
                            href="#"
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-[var(--border-primary)] flex-shrink-0 transition-all duration-200 hover:border-[var(--accent-primary)] hover:scale-105 cursor-pointer"
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

                        {/* Desktop Navigation Items */}
                        <div className="flex items-center gap-4 lg:gap-6 xl:gap-8">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.substring(1);
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={`text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap relative pb-1 ${isActive
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
                </div>

                {/* Mobile: Same profile as desktop */}
                <div className="md:hidden flex justify-end">
                    <a
                        href="#"
                        onClick={handleProfileClick}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden 
      border-2 border-[var(--border-primary)] 
      transition-all duration-200 
      hover:border-[var(--accent-primary)] hover:scale-105
      cursor-pointer"
                    >
                        <img
                            src="/profile.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </a>
                </div>

            </motion.nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 sm:top-24 left-4 right-4 z-30 md:hidden bg-[var(--bg-primary)]/95 backdrop-blur-xl border border-[var(--border-primary)] rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col py-2">
                            {navItems.map((item, index) => {
                                const isActive = activeSection === item.href.substring(1);
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => handleNavClick(item.href)}
                                        className={`px-6 py-3 text-base font-medium transition-all duration-200 ${isActive
                                            ? 'text-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                                            }`}
                                    >
                                        {item.name}
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
