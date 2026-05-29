'use client';

import { motion } from 'framer-motion';

export default function AvailableBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="hidden sm:block fixed bottom-8 right-8 z-50"
        >
            <motion.div
                className="flex flex-col items-center gap-2 bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border border-green-500/20 rounded-2xl shadow-[0_0_20px_rgba(74,222,128,0.08)] cursor-default"
                whileHover={{ scale: 1.05, borderColor: 'rgba(74,222,128,0.4)' }}
                style={{
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                }}
            >
                {/* Pulsing green dot */}
                <div className="relative flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-60" />
                </div>

                {/* Text */}
                <div className="text-center">
                    <div className="text-xs font-semibold text-green-400">
                        Available
                    </div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">
                        for Work
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
