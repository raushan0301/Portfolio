'use client';

import { useEffect, useRef } from 'react';

export default function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Ensure video plays on mount
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.log('Video autoplay failed:', error);
            });
        }
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Video Background */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/videos/Background.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
    );
}
