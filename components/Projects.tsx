'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaUsers, FaEye, FaArrowRight } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import Image from 'next/image';

interface Project {
    id: string;
    title: string;
    tagline: string;
    category: string;
    tech: string[];
    year: string;
    featured: boolean;
    links: {
        live?: string;
        github?: string;
    };
    image: string;
    shortDescription: string;
    detailsFile: string;
}

interface ProjectsProps {
    projects: Project[];
    projectDetails: { [key: string]: string };
}

const SNAPLOCATE_STATS = [
    { icon: FaUsers, value: '920+', label: 'Active Users', color: 'from-cyan-400 to-teal-400' },
    { icon: FaEye, value: '19K+', label: 'Page Views', color: 'from-purple-400 to-pink-400' },
];

export default function Projects({ projects, projectDetails }: ProjectsProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px", amount: 0.1 });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeTab, setActiveTab] = useState<'summary' | 'engineering' | 'impact'>('summary');

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setActiveTab('summary');
    };

    const featuredProject = projects.find(p => p.featured);
    const regularProjects = projects.filter(p => !p.featured);

    return (
        <>
            <section id="projects" className="section-spacing">
                <div className="section-container">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="section-header">
                            <h2 className="section-title">Projects</h2>
                            <div className="section-underline" />
                        </div>

                        {/* ══════════════════════════════════════════════
                            FEATURED PROJECT — Premium Showcase Card
                        ══════════════════════════════════════════════ */}
                        {featuredProject && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="mb-8 sm:mb-10"
                            >
                                {/* Outer glow wrapper */}
                                <div
                                    className="relative rounded-2xl p-px cursor-pointer group"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(6,182,212,0.5) 0%, rgba(139,92,246,0.3) 50%, rgba(6,182,212,0.2) 100%)',
                                        boxShadow: '0 0 60px rgba(6,182,212,0.08), 0 0 120px rgba(139,92,246,0.05)',
                                    }}
                                    onClick={() => handleProjectClick(featuredProject)}
                                >
                                    {/* Inner card */}
                                    <div
                                        className="relative rounded-2xl overflow-hidden"
                                        style={{ background: 'linear-gradient(145deg, #0d1117 0%, #0a1628 40%, #110d1e 100%)' }}
                                    >
                                        {/* Ambient background glow blobs */}
                                        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.07] blur-3xl pointer-events-none"
                                            style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
                                        <div className="absolute bottom-0 left-20 w-72 h-72 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
                                            style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />

                                        <div className="relative z-10 p-6 sm:p-8 lg:p-10">

                                            {/* ── TOP ROW: badge + year ── */}
                                            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase"
                                                    style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)', color: '#06b6d4' }}>
                                                    <HiSparkles className="text-sm" />
                                                    Featured Project
                                                </div>
                                                <span className="text-xs text-[var(--text-tertiary)]">
                                                    {featuredProject.year} · {featuredProject.category}
                                                </span>
                                            </div>

                                            {/* ── MAIN CONTENT: text left, screenshot right ── */}
                                            <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start">

                                                {/* LEFT: Text content */}
                                                <div className="flex-1 min-w-0">
                                                    {/* Title */}
                                                    <h3
                                                        className="text-4xl sm:text-5xl font-black mb-3 leading-none tracking-tight"
                                                        style={{
                                                            background: 'linear-gradient(135deg, #e5e5e5 30%, #06b6d4 100%)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            backgroundClip: 'text',
                                                        }}
                                                    >
                                                        {featuredProject.title}
                                                    </h3>

                                                    {/* Tagline */}
                                                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-7 max-w-lg" style={{ margin: 0, marginBottom: '1.75rem' }}>
                                                        {featuredProject.tagline}
                                                    </p>

                                                    {/* Stats row */}
                                                    <div className="flex flex-wrap gap-4 mb-7">
                                                        {SNAPLOCATE_STATS.map(({ icon: Icon, value, label, color }, i) => (
                                                            <div key={i} className="flex flex-col gap-0.5">
                                                                <div className="flex items-baseline gap-1.5">
                                                                    <span
                                                                        className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${color}`}
                                                                        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                                                                    >
                                                                        {value}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-medium">
                                                                    <Icon className="text-[10px] opacity-60" />
                                                                    {label}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {/* Divider between stats */}
                                                        <div className="self-stretch w-px bg-[var(--border-primary)] mx-1 hidden sm:block" />
                                                    </div>

                                                    {/* Tech stack */}
                                                    <div className="flex flex-wrap gap-1.5 mb-8">
                                                        {featuredProject.tech.map((tech, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-[11px] px-2.5 py-1 rounded-md font-medium"
                                                                style={{
                                                                    background: 'rgba(255,255,255,0.04)',
                                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                                    color: 'var(--text-secondary)',
                                                                }}
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Action buttons */}
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        {featuredProject.links.live && (
                                                            <a
                                                                href={featuredProject.links.live}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
                                                                style={{
                                                                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                                                                    color: '#000',
                                                                    boxShadow: '0 0 20px rgba(6,182,212,0.3)',
                                                                }}
                                                            >
                                                                <FaExternalLinkAlt className="text-xs" />
                                                                Live Demo
                                                            </a>
                                                        )}
                                                        {featuredProject.links.github && (
                                                            <a
                                                                href={featuredProject.links.github}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.03]"
                                                                style={{
                                                                    background: 'rgba(255,255,255,0.06)',
                                                                    border: '1px solid rgba(255,255,255,0.12)',
                                                                    color: 'var(--text-secondary)',
                                                                }}
                                                            >
                                                                <FaGithub className="text-sm" />
                                                                Source Code
                                                            </a>
                                                        )}
                                                        <button
                                                            className="ml-auto flex items-center gap-1.5 text-xs font-medium transition-all duration-200 group-hover:gap-2.5"
                                                            style={{ color: 'rgba(6,182,212,0.7)' }}
                                                        >
                                                            View Case Study
                                                            <FaArrowRight className="text-[10px]" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* RIGHT: Browser mockup screenshot */}
                                                <div className="xl:w-[48%] flex-shrink-0 w-full">
                                                    <div
                                                        className="relative rounded-xl overflow-hidden group-hover:scale-[1.01] transition-transform duration-500"
                                                        style={{
                                                            boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
                                                        }}
                                                    >
                                                        {/* Browser chrome bar */}
                                                        <div
                                                            className="flex items-center gap-1.5 px-3 py-2.5"
                                                            style={{ background: '#1c1c1e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                                                        >
                                                            {/* Traffic lights */}
                                                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                                                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                                                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                                                            {/* URL bar */}
                                                            <div
                                                                className="flex-1 mx-3 px-3 py-0.5 rounded text-[10px] text-center"
                                                                style={{
                                                                    background: 'rgba(255,255,255,0.05)',
                                                                    color: 'rgba(255,255,255,0.35)',
                                                                    fontFamily: 'monospace',
                                                                }}
                                                            >
                                                                snaplocate.in
                                                            </div>
                                                        </div>

                                                        {/* Screenshot */}
                                                        <div className="relative aspect-[16/10] bg-[#0d1117]">
                                                            {featuredProject.image ? (
                                                                <Image
                                                                    src={featuredProject.image}
                                                                    alt={featuredProject.title}
                                                                    fill
                                                                    className="object-cover object-top"
                                                                />
                                                            ) : (
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <span className="text-4xl font-black opacity-10 text-white">{featuredProject.title}</span>
                                                                </div>
                                                            )}
                                                            {/* Subtle bottom fade */}
                                                            <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                                                                style={{ background: 'linear-gradient(to top, #0d1117, transparent)' }} />
                                                        </div>
                                                    </div>

                                                    {/* "Live" indicator below mockup */}
                                                    <div className="flex items-center justify-center gap-2 mt-3">
                                                        <span className="relative flex h-1.5 w-1.5">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22c55e' }} />
                                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#22c55e' }} />
                                                        </span>
                                                        <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'rgba(34,197,94,0.7)' }}>
                                                            Live · snaplocate.in
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── REGULAR PROJECTS GRID ── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {regularProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                    className="card overflow-hidden cursor-pointer group"
                                    onClick={() => handleProjectClick(project)}
                                >
                                    {/* Project Image */}
                                    <div className="relative -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 mb-4 sm:mb-5 h-36 sm:h-44 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] border-b border-[var(--border-primary)] overflow-hidden">
                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300"
                                            />
                                        ) : (
                                            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[var(--text-tertiary)] opacity-20">
                                                {project.title}
                                            </span>
                                        )}
                                    </div>

                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-2 mb-2 text-[10px] text-[var(--text-tertiary)]">
                                        <span>{project.year}</span>
                                        <span>·</span>
                                        <span>{project.category}</span>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[var(--text-tertiary)] mb-3 leading-relaxed" style={{ margin: 0, marginBottom: '0.75rem' }}>
                                        {project.tagline}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tech.slice(0, 5).map((tech, idx) => (
                                            <span key={idx} className="text-[10px] sm:text-xs px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded text-[var(--text-secondary)] opacity-80">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 5 && (
                                            <span className="text-xs px-2 text-[var(--text-secondary)] opacity-60">+{project.tech.length - 5} more</span>
                                        )}
                                    </div>

                                    {/* Links */}
                                    <div className="flex flex-wrap gap-3 pt-3 border-t border-[var(--border-secondary)]">
                                        {project.links.live && (
                                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                                                className="text-xs font-medium text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] flex items-center gap-1.5 transition-all group/link">
                                                <FaExternalLinkAlt className="text-xs" />
                                                <span className="group-hover/link:underline underline-offset-4">Live Demo</span>
                                            </a>
                                        )}
                                        {project.links.github && (
                                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                                                className="text-xs text-[var(--text-secondary)] opacity-70 hover:text-[var(--accent-primary)] hover:opacity-100 flex items-center gap-1.5 transition-all group/link">
                                                <FaGithub className="text-sm" />
                                                <span className="group-hover/link:underline underline-offset-4">Source Code</span>
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                PROJECT DETAIL MODAL
            ══════════════════════════════════════════════ */}
            {selectedProject && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
                    onClick={() => setSelectedProject(null)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col relative mx-2 sm:mx-4 md:mx-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Sticky Header */}
                        <div className="sticky top-0 z-20 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-3 sm:pb-4 rounded-t-lg">
                            <button onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors z-10">
                                <FaTimes className="text-xl md:text-2xl" />
                            </button>

                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2 pr-10">
                                {selectedProject.title}
                            </h2>

                            {/* Stats in modal for featured */}
                            {selectedProject.featured && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {SNAPLOCATE_STATS.map(({ icon: Icon, value, label, color }, i) => (
                                        <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs"
                                            style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
                                            <Icon className="text-[10px]" style={{ color: '#06b6d4' }} />
                                            <span className={`font-bold bg-gradient-to-r ${color}`}
                                                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                                {value}
                                            </span>
                                            <span className="text-[var(--text-tertiary)]">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-xs sm:text-sm text-[var(--text-secondary)] opacity-80 mb-3 leading-relaxed" style={{ margin: 0, marginBottom: '0.75rem' }}>
                                {selectedProject.tagline}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {selectedProject.tech.map((tech, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] rounded text-[10px] text-[var(--text-secondary)] opacity-80">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-0.5 border-b border-[var(--border-secondary)] overflow-x-auto">
                                {[{ id: 'summary', label: 'Summary' }, { id: 'engineering', label: 'Engineering' }, { id: 'impact', label: 'Impact' }].map((tab) => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                                        className={`px-4 py-2 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === tab.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}>
                                        {tab.label}
                                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)]" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
                            <div className="prose prose-invert max-w-none">
                                <ReactMarkdown
                                    rehypePlugins={[rehypeSanitize]}
                                    components={{
                                        h2: ({ children }) => {
                                            const text = String(children);
                                            if (activeTab === 'summary' && !text.includes('Summary')) return null;
                                            if (activeTab === 'engineering' && !text.includes('Engineering')) return null;
                                            if (activeTab === 'impact' && !text.includes('Impact')) return null;
                                            return null;
                                        },
                                        h3: ({ children }) => (
                                            <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6 mb-3">{children}</h3>
                                        ),
                                        p: ({ children, node }) => {
                                            const hasBlockLevelStrong = node?.children?.some((child: any) => {
                                                if (child.type === 'element' && child.tagName === 'strong') {
                                                    const text = child.children?.[0]?.value || '';
                                                    return ['Problem', 'Solution', 'Why it matters', 'System Design',
                                                        'Key Engineering Decisions', 'Impact Metrics', 'Frontend', 'Backend', 'ONE-LINER'].includes(text);
                                                }
                                                return false;
                                            });
                                            if (hasBlockLevelStrong) return <>{children}</>;
                                            return <p className="text-sm text-[var(--text-secondary)] opacity-90 mb-3 leading-relaxed">{children}</p>;
                                        },
                                        ul: ({ children }) => <ul className="flex flex-col gap-2 mb-6">{children}</ul>,
                                        li: ({ children }) => (
                                            <li className="text-sm text-[var(--text-secondary)] opacity-90 flex items-start gap-3 leading-relaxed">
                                                <span className="text-[var(--accent-primary)] mt-1 text-xs">•</span>
                                                <span className="flex-1">{children}</span>
                                            </li>
                                        ),
                                        strong: ({ children }) => {
                                            const text = String(children);
                                            if (text === 'ONE-LINER') return (
                                                <div className="mb-6 pb-6 border-b border-[var(--border-primary)]">
                                                    <h3 className="text-sm uppercase tracking-wide text-[var(--text-tertiary)] opacity-70 mb-3">{children}</h3>
                                                </div>
                                            );
                                            if (['Problem', 'Solution', 'Why it matters', 'System Design', 'Key Engineering Decisions', 'Impact Metrics'].includes(text)) return (
                                                <div className="mt-8 mb-4">
                                                    <h3 className="uppercase tracking-wide text-[var(--text-tertiary)] opacity-70 mb-3 font-medium" style={{ fontSize: '15px' }}>{children}</h3>
                                                </div>
                                            );
                                            if (text === 'Frontend' || text === 'Backend') return (
                                                <div className="mt-5 mb-2"><h4 className="text-sm font-medium text-[var(--text-primary)]">{children}</h4></div>
                                            );
                                            return <strong className="text-[var(--text-primary)] font-medium">{children}</strong>;
                                        },
                                        hr: () => null,
                                    }}
                                >
                                    {(() => {
                                        const content = projectDetails[selectedProject.id] || '';
                                        const sections = content.split('## ');
                                        const filtered = sections.filter(section => {
                                            if (activeTab === 'summary') return section.startsWith('Summary');
                                            if (activeTab === 'engineering') return section.startsWith('Engineering');
                                            if (activeTab === 'impact') return section.startsWith('Impact');
                                            return false;
                                        });
                                        return '## ' + filtered.join('## ');
                                    })()}
                                </ReactMarkdown>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] px-6 py-3 rounded-b-lg" />
                    </motion.div>
                </div>
            )}
        </>
    );
}
