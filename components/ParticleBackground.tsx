'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT_DESKTOP = 600;
const PARTICLE_COUNT_MOBILE = 250;
const CONNECTION_DISTANCE = 2.2;
const MOUSE_INFLUENCE = 0.8;

function Particles() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const mousePos = useRef(new THREE.Vector2(0, 0));
    const { viewport, size } = useThree();

    const isMobile = size.width < 768;
    const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

    // Generate particle positions and velocities
    const { positions, velocities, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Spread particles in a wider area
            positions[i3] = (Math.random() - 0.5) * 16;
            positions[i3 + 1] = (Math.random() - 0.5) * 12;
            positions[i3 + 2] = (Math.random() - 0.5) * 8;

            // Slow random velocities
            velocities[i3] = (Math.random() - 0.5) * 0.008;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.008;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.004;

            // Color: cyan to purple gradient based on position
            const t = (positions[i3] + 8) / 16; // normalized x position
            // Cyan: rgb(6, 182, 212) → Purple: rgb(139, 92, 246)
            colors[i3] = THREE.MathUtils.lerp(6 / 255, 139 / 255, t);
            colors[i3 + 1] = THREE.MathUtils.lerp(182 / 255, 92 / 255, t);
            colors[i3 + 2] = THREE.MathUtils.lerp(212 / 255, 246 / 255, t);
        }

        return { positions, velocities, colors };
    }, [count]);

    // Line geometry for connections
    const lineGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const maxConnections = count * 6; // max connections per frame
        const linePositions = new Float32Array(maxConnections * 6);
        const lineColors = new Float32Array(maxConnections * 6);
        geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
        geo.setDrawRange(0, 0);
        return geo;
    }, [count]);

    // Track mouse
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const tempColor = useMemo(() => new THREE.Color(), []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const mx = mousePos.current.x * viewport.width * 0.5;
        const my = mousePos.current.y * viewport.height * 0.5;

        // Update particle positions
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Apply velocity
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];

            // Add subtle orbital motion
            positions[i3] += Math.sin(time * 0.1 + i * 0.01) * 0.002;
            positions[i3 + 1] += Math.cos(time * 0.12 + i * 0.015) * 0.002;

            // Mouse influence - gentle attraction/repulsion
            const dx = mx - positions[i3];
            const dy = my - positions[i3 + 1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 4) {
                const force = (1 - dist / 4) * MOUSE_INFLUENCE * delta;
                positions[i3] += dx * force * 0.05;
                positions[i3 + 1] += dy * force * 0.05;
            }

            // Wrap around boundaries
            if (positions[i3] > 9) positions[i3] = -9;
            if (positions[i3] < -9) positions[i3] = 9;
            if (positions[i3 + 1] > 7) positions[i3 + 1] = -7;
            if (positions[i3 + 1] < -7) positions[i3 + 1] = 7;
            if (positions[i3 + 2] > 5) positions[i3 + 2] = -5;
            if (positions[i3 + 2] < -5) positions[i3 + 2] = 5;

            // Update instanced mesh
            const scale = 0.02 + Math.sin(time + i) * 0.008;
            dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
            dummy.scale.setScalar(scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);

            // Update color based on current position
            const t = (positions[i3] + 9) / 18;
            tempColor.setRGB(
                THREE.MathUtils.lerp(6 / 255, 139 / 255, t),
                THREE.MathUtils.lerp(182 / 255, 92 / 255, t),
                THREE.MathUtils.lerp(212 / 255, 246 / 255, t)
            );
            meshRef.current.setColorAt(i, tempColor);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }

        // Update connection lines
        if (linesRef.current) {
            const linePos = lineGeometry.attributes.position.array as Float32Array;
            const lineCol = lineGeometry.attributes.color.array as Float32Array;
            let lineIndex = 0;
            const maxLines = count * 3;

            for (let i = 0; i < count && lineIndex < maxLines; i++) {
                for (let j = i + 1; j < count && lineIndex < maxLines; j++) {
                    const i3 = i * 3;
                    const j3 = j * 3;
                    const dx = positions[i3] - positions[j3];
                    const dy = positions[i3 + 1] - positions[j3 + 1];
                    const dz = positions[i3 + 2] - positions[j3 + 2];
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
                        const li = lineIndex * 6;
                        linePos[li] = positions[i3];
                        linePos[li + 1] = positions[i3 + 1];
                        linePos[li + 2] = positions[i3 + 2];
                        linePos[li + 3] = positions[j3];
                        linePos[li + 4] = positions[j3 + 1];
                        linePos[li + 5] = positions[j3 + 2];

                        const alpha = 1 - Math.sqrt(distSq) / CONNECTION_DISTANCE;
                        lineCol[li] = 6 / 255 * alpha;
                        lineCol[li + 1] = 182 / 255 * alpha;
                        lineCol[li + 2] = 212 / 255 * alpha;
                        lineCol[li + 3] = 6 / 255 * alpha;
                        lineCol[li + 4] = 182 / 255 * alpha;
                        lineCol[li + 5] = 212 / 255 * alpha;

                        lineIndex++;
                    }
                }
            }

            lineGeometry.setDrawRange(0, lineIndex * 2);
            lineGeometry.attributes.position.needsUpdate = true;
            lineGeometry.attributes.color.needsUpdate = true;
        }
    });

    return (
        <>
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <sphereGeometry args={[1, 8, 8]} />
                <meshBasicMaterial transparent opacity={0.8} />
            </instancedMesh>
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </>
    );
}

export default function ParticleBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="fixed inset-0 -z-10 bg-[var(--bg-primary)]" />
        );
    }

    return (
        <div className="fixed inset-0 -z-10">
            {/* Base dark background */}
            <div className="absolute inset-0 bg-[var(--bg-primary)]" />

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                style={{ position: 'absolute', inset: 0 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
            >
                <color attach="background" args={['#0a0a0a']} />
                <Particles />
            </Canvas>

            {/* Subtle vignette overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
                }}
            />
        </div>
    );
}
