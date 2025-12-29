'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaStar } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
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

export default function Projects({ projects, projectDetails }: ProjectsProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeTab, setActiveTab] = useState<'summary' | 'engineering' | 'impact'>('summary');

    // Reset tab when project changes
    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setActiveTab('summary');
    };

    return (
        <>
            <section id="projects" className="section-spacing bg-[var(--bg-secondary)]">
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

                        <div className="grid md:grid-cols-2 gap-6">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`card overflow-hidden cursor-pointer group relative ${project.featured
                                        ? 'md:col-span-2 border-[var(--accent-primary)]/30 shadow-lg shadow-[var(--accent-primary)]/10'
                                        : ''
                                        }`}
                                    onClick={() => handleProjectClick(project)}
                                >
                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent-primary)] text-[var(--bg-primary)] text-xs font-bold rounded-full">
                                            <FaStar className="text-xs" />
                                            FEATURED
                                        </div>
                                    )}

                                    {/* Project Image - Reduced height for featured */}
                                    <div className={`-mx-14 -mt-14 mb-8 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] flex items-center justify-center border-b border-[var(--border-primary)] overflow-hidden relative ${project.featured ? 'h-40' : 'h-48'
                                        }`}>
                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300"
                                            />
                                        ) : (
                                            <span className="text-3xl font-bold text-[var(--text-tertiary)] opacity-20">
                                                {project.title}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content - No 2-column for featured */}
                                    <div>
                                        {/* Meta row */}
                                        <div className="flex items-center gap-3 mb-5 text-xs text-[var(--text-tertiary)]">
                                            <span>{project.year}</span>
                                            <span>•</span>
                                            <span>{project.category}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className={`font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-3 ${project.featured ? 'text-3xl' : 'text-2xl'
                                            }`}>
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-[var(--text-tertiary)] mb-4">{project.tagline}</p>

                                        {/* Description - Capped at 2 lines */}
                                        <p className="text-[var(--text-secondary)] mb-4 leading-relaxed line-clamp-2">
                                            {project.shortDescription}
                                        </p>

                                        {/* Tech Stack - Consistent across all cards */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.slice(0, 5).map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs px-2.5 py-1 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded text-[var(--text-secondary)] opacity-80"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech.length > 5 && (
                                                <span className="text-xs px-2.5 py-1 text-[var(--text-secondary)] opacity-60">
                                                    +{project.tech.length - 5} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Links - Clear Hierarchy */}
                                        <div className="flex gap-4 pt-4 border-t border-[var(--border-secondary)]">
                                            {project.links.live && (
                                                <a
                                                    href={project.links.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] flex items-center gap-2 transition-all hover:gap-3 group/link"
                                                >
                                                    <FaExternalLinkAlt className="text-base" />
                                                    <span className="group-hover/link:underline underline-offset-4">Live Demo</span>
                                                </a>
                                            )}
                                            {project.links.github && (
                                                <a
                                                    href={project.links.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-sm text-[var(--text-secondary)] opacity-70 hover:text-[var(--accent-primary)] hover:opacity-100 flex items-center gap-2 transition-all hover:gap-3 group/link"
                                                >
                                                    <FaGithub className="text-base" />
                                                    <span className="group-hover/link:underline underline-offset-4">Source Code</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Project Detail Modal with Tabs */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedProject(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Sticky Header */}
                        <div className="sticky top-0 z-20 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] px-8 pt-6 pb-4 rounded-t-lg">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors"
                            >
                                <FaTimes className="text-2xl" />
                            </button>

                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2 pr-12">
                                {selectedProject.title}
                            </h2>
                            <p className="text-[var(--text-secondary)] opacity-80 mb-4 leading-relaxed">{selectedProject.tagline}</p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedProject.tech.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] rounded text-xs text-[var(--text-secondary)] opacity-80"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-1 border-b border-[var(--border-secondary)]">
                                {[
                                    { id: 'summary', label: 'Summary' },
                                    { id: 'engineering', label: 'Engineering' },
                                    { id: 'impact', label: 'Impact' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`px-5 py-2.5 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                            ? 'text-[var(--accent-primary)]'
                                            : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                                            }`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto px-8 py-8">
                            <div className="prose prose-invert max-w-none">
                                <ReactMarkdown
                                    components={{
                                        h2: ({ children }) => {
                                            const text = String(children);

                                            // Filter content based on active tab - hide section headers
                                            if (activeTab === 'summary' && !text.includes('Summary')) return null;
                                            if (activeTab === 'engineering' && !text.includes('Engineering')) return null;
                                            if (activeTab === 'impact' && !text.includes('Impact')) return null;

                                            // Don't render the section header itself
                                            return null;
                                        },
                                        h3: ({ children }) => (
                                            <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6 mb-3">{children}</h3>
                                        ),
                                        p: ({ children, node }) => {
                                            // Check if this paragraph contains only a strong tag with section headings
                                            const hasBlockLevelStrong = node?.children?.some((child: any) => {
                                                if (child.type === 'element' && child.tagName === 'strong') {
                                                    const text = child.children?.[0]?.value || '';
                                                    return ['Problem', 'Solution', 'Why it matters', 'System Design',
                                                        'Key Engineering Decisions', 'Impact Metrics', 'Frontend',
                                                        'Backend', 'ONE-LINER'].includes(text);
                                                }
                                                return false;
                                            });

                                            // If it contains block-level strong tags, return Fragment to avoid p > div nesting
                                            if (hasBlockLevelStrong) {
                                                return <>{children}</>;
                                            }

                                            // Otherwise render as normal paragraph
                                            return (
                                                <p className="text-sm text-[var(--text-secondary)] opacity-90 mb-3 leading-relaxed max-w-none">{children}</p>
                                            );
                                        },
                                        ul: ({ children }) => (
                                            <ul className="space-y-2 mb-8">{children}</ul>
                                        ),
                                        li: ({ children }) => (
                                            <li className="text-sm text-[var(--text-secondary)] opacity-90 flex items-start gap-3 leading-relaxed">
                                                <span className="text-[var(--accent-primary)] mt-1 text-xs">•</span>
                                                <span className="flex-1">{children}</span>
                                            </li>
                                        ),
                                        strong: ({ children }) => {
                                            const text = String(children);

                                            // ONE-LINER - biggest, most prominent
                                            if (text === 'ONE-LINER') {
                                                return (
                                                    <div className="mb-6 pb-6 border-b border-[var(--border-primary)]">
                                                        <h3 className="text-sm uppercase tracking-wide text-[var(--text-tertiary)] opacity-70 mb-3">{children}</h3>
                                                    </div>
                                                );
                                            }

                                            // Section headings (Problem, Solution, Why it matters, etc.)
                                            if (text === 'Problem' || text === 'Solution' || text === 'Why it matters' ||
                                                text === 'System Design' || text === 'Key Engineering Decisions' ||
                                                text === 'Impact Metrics') {
                                                return (
                                                    <div className="mt-8 mb-4">
                                                        <h3
                                                            className="uppercase tracking-wide text-[var(--text-tertiary)] opacity-70 mb-3 font-medium"
                                                            style={{ fontSize: '17px' }}
                                                        >
                                                            {children}
                                                        </h3>
                                                    </div>
                                                );
                                            }

                                            // Subsections (Frontend, Backend)
                                            if (text === 'Frontend' || text === 'Backend') {
                                                return (
                                                    <div className="mt-6 mb-2">
                                                        <h4 className="text-sm font-medium text-[var(--text-primary)]">{children}</h4>
                                                    </div>
                                                );
                                            }

                                            // Inline bold
                                            return (
                                                <strong className="text-[var(--text-primary)] font-medium">{children}</strong>
                                            );
                                        },
                                        hr: () => {
                                            // Hide HR separators
                                            return null;
                                        },
                                    }}
                                >
                                    {(() => {
                                        const content = projectDetails[selectedProject.id] || '';
                                        const sections = content.split('## ');

                                        // Filter to show only the active tab's content
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

                        {/* Sticky Footer - Removed CTAs */}
                        <div className="sticky bottom-0 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] px-8 py-4 rounded-b-lg flex gap-4">
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
