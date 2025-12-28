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
                                    onClick={() => setSelectedProject(project)}
                                >
                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent-primary)] text-[var(--bg-primary)] text-xs font-bold rounded-full">
                                            <FaStar className="text-xs" />
                                            FEATURED
                                        </div>
                                    )}

                                    {/* Project Image */}
                                    <div className="h-48 -mx-14 -mt-14 mb-8 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] flex items-center justify-center border-b border-[var(--border-primary)] overflow-hidden relative">
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

                                    {/* Content */}
                                    <div className={project.featured ? 'md:grid md:grid-cols-2 md:gap-8' : ''}>
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
                                            <p className="text-sm text-[var(--text-tertiary)] mb-5">{project.tagline}</p>

                                            {/* Description - 2-3 lines max */}
                                            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed line-clamp-3">
                                                {project.shortDescription}
                                            </p>
                                        </div>

                                        <div>
                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tech.slice(0, 5).map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs px-2.5 py-1 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded text-[var(--text-tertiary)]"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech.length > 5 && (
                                                    <span className="text-xs px-2.5 py-1 text-[var(--text-tertiary)]">
                                                        +{project.tech.length - 5} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Links - Improved Affordance */}
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
                                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] flex items-center gap-2 transition-all hover:gap-3 group/link"
                                                    >
                                                        <FaGithub className="text-base" />
                                                        <span className="group-hover/link:underline underline-offset-4">Source Code</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                    onClick={() => setSelectedProject(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg max-w-4xl w-full my-8 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors z-10"
                        >
                            <FaTimes className="text-2xl" />
                        </button>

                        <div className="p-8 md:p-12">
                            <div className="mb-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
                                    {selectedProject.title}
                                </h2>
                                <p className="text-[var(--text-secondary)] text-lg">{selectedProject.tagline}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedProject.tech.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] rounded text-sm text-[var(--text-secondary)]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="prose prose-invert max-w-none mb-8">
                                <ReactMarkdown
                                    components={{
                                        h2: ({ children }) => (
                                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-8 mb-4">{children}</h2>
                                        ),
                                        h3: ({ children }) => (
                                            <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">{children}</h3>
                                        ),
                                        p: ({ children }) => (
                                            <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">{children}</p>
                                        ),
                                        ul: ({ children }) => (
                                            <ul className="list-disc list-inside text-[var(--text-secondary)] mb-4 space-y-2">{children}</ul>
                                        ),
                                        li: ({ children }) => (
                                            <li className="text-[var(--text-secondary)]">{children}</li>
                                        ),
                                        strong: ({ children }) => (
                                            <strong className="text-[var(--accent-primary)] font-semibold">{children}</strong>
                                        ),
                                    }}
                                >
                                    {projectDetails[selectedProject.id] || ''}
                                </ReactMarkdown>
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-[var(--border-primary)]">
                                {selectedProject.links.live && (
                                    <a
                                        href={selectedProject.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--bg-primary)] font-medium rounded-lg hover:bg-[var(--accent-secondary)] transition-colors flex items-center gap-2"
                                    >
                                        <FaExternalLinkAlt /> View Live Demo
                                    </a>
                                )}
                                {selectedProject.links.github && (
                                    <a
                                        href={selectedProject.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 border border-[var(--border-primary)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors flex items-center gap-2"
                                    >
                                        <FaGithub /> View Source
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
