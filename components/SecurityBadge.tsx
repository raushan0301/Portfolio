'use client';

import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

export default function SecurityBadge() {
    const [isExpanded, setIsExpanded] = useState(false);

    const securityFeatures = [
        { name: 'Content Security Policy', icon: FaShieldAlt },
        { name: 'XSS Protection', icon: FaLock },
        { name: 'Clickjacking Prevention', icon: FaCheckCircle },
        { name: 'MIME Sniffing Protection', icon: FaCheckCircle },
        { name: 'Markdown Sanitization', icon: FaCheckCircle },
        { name: 'Image Security', icon: FaCheckCircle },
        { name: '0 Vulnerabilities', icon: FaCheckCircle },
        { name: 'HTTPS Enforced', icon: FaLock },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="hidden sm:block fixed bottom-8 left-8 z-50"
        >
            <div
                className="relative"
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                {/* Compact Badge */}
                <motion.div
                    className="flex items-center gap-2 bg-[var(--bg-primary)]/90 backdrop-blur-xl border border-green-500/30 rounded-2xl shadow-2xl cursor-pointer"
                    style={{
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                    }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="relative flex items-center justify-center">
                        <FaShieldAlt className="text-green-500 text-xl" />
                        <div className="absolute inset-0 animate-ping opacity-20">
                            <FaShieldAlt className="text-green-500 text-xl" />
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs font-semibold text-green-400">
                            Secured
                        </div>
                        <div className="text-[10px] text-[var(--text-secondary)]">
                            10/10
                        </div>
                    </div>
                </motion.div>

                {/* Expanded Details */}
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-0 mb-2 bg-[var(--bg-secondary)]/95 backdrop-blur-xl border border-[var(--border-primary)] rounded-xl shadow-2xl p-4 min-w-[280px]"
                    >
                        <div className="mb-3 pb-3 border-b border-[var(--border-primary)]">
                            <h4 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                                <FaShieldAlt className="text-green-500" />
                                Security Features
                            </h4>
                            <p className="text-xs text-[var(--text-secondary)] mt-1">
                                Enterprise-grade protection
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            {securityFeatures.map((feature, index) => (
                                <motion.div
                                    key={feature.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className="flex items-center gap-2 text-xs"
                                >
                                    <feature.icon className="text-green-500 text-sm flex-shrink-0" />
                                    <span className="text-[var(--text-secondary)]">
                                        {feature.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-3 pt-3 border-t border-[var(--border-primary)]">
                            <a
                                href="/SECURITY.md"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors flex items-center gap-1"
                            >
                                View Security Docs →
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
