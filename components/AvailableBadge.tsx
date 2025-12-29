'use client';

import { motion } from 'framer-motion';

export default function AvailableBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="fixed bottom-8 right-8 z-50"
        >
            <div
                className="flex flex-col items-center gap-2 bg-[var(--bg-primary)]/90 backdrop-blur-xl border border-green-500/30 rounded-2xl shadow-2xl"
                style={{
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                }}
            >
                {/* Pulsing green dot */}
                <div className="relative flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Text */}
                <div className="text-center">
                    <div className="text-sm font-semibold text-green-400">
                        Available
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                        for Work
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
