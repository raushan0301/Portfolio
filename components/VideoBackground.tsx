'use client';

import { useEffect, useRef } from 'react';

export default function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.log('Video autoplay failed:', error);
            });
        }
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Video */}
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

            {/* Dark overlay — keeps text readable while letting video show */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Subtle vignette for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        </div>
    );
}
