'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    SiReact, SiNextdotjs, SiNodedotjs, SiFirebase, SiPostgresql,
    SiJavascript, SiTailwindcss, SiGithub, SiSupabase,
    SiExpress, SiHtml5, SiCss3,
} from 'react-icons/si';
import {
    FaShieldAlt, FaNetworkWired, FaSearch, FaFlask,
    FaCode, FaDatabase, FaLayerGroup, FaServer,
} from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';

interface SkillCategory {
    name: string;
    skills: string[];
}

interface SkillSection {
    title: string;
    description: string;
    categories: SkillCategory[];
}

interface SkillsProps {
    webDevelopment: SkillSection;
    cybersecurity: SkillSection;
}

// Map skill names to icons
const skillIcons: Record<string, React.ReactNode> = {
    'HTML': <SiHtml5 className="text-orange-400" />,
    'CSS': <SiCss3 className="text-blue-400" />,
    'JavaScript': <SiJavascript className="text-yellow-400" />,
    'React (Component Architecture)': <SiReact className="text-cyan-400" />,
    'Next.js': <SiNextdotjs className="text-white" />,
    'Tailwind CSS': <SiTailwindcss className="text-sky-400" />,
    'Node.js': <SiNodedotjs className="text-green-400" />,
    'Express.js': <SiExpress className="text-gray-400" />,
    'Firebase (Auth, Firestore)': <SiFirebase className="text-yellow-500" />,
    'PostgreSQL': <SiPostgresql className="text-blue-500" />,
    'Supabase (Row Level Security)': <SiSupabase className="text-green-500" />,
    'Git & GitHub': <SiGithub className="text-white" />,
};

// Category icon mapping
const categoryIcons: Record<string, React.ReactNode> = {
    'Frontend Engineering': <FaCode className="text-cyan-400" />,
    'Backend Engineering': <FaServer className="text-purple-400" />,
    'Data & Infrastructure': <FaDatabase className="text-blue-400" />,
    'Engineering Focus': <FaLayerGroup className="text-emerald-400" />,
    'Fundamentals': <MdSecurity className="text-red-400" />,
    'Network & Endpoint': <FaNetworkWired className="text-orange-400" />,
    'Ethical Hacking': <FaSearch className="text-yellow-400" />,
    'Hands-on Labs & Training': <FaFlask className="text-green-400" />,
};

// Section color accent
const sectionColors: Record<string, string> = {
    'Web Dev': 'from-cyan-500/20 to-purple-500/10 border-cyan-500/20',
    'Security': 'from-red-500/10 to-orange-500/10 border-orange-500/20',
};

const sectionLabelColors: Record<string, string> = {
    'Web Dev': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    'Security': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
};

export default function Skills({ webDevelopment, cybersecurity }: SkillsProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: '0px', amount: 0.1 });

    const webCategories = webDevelopment.categories.map(c => ({ ...c, section: 'Web Dev' }));
    const secCategories = cybersecurity.categories.map(c => ({ ...c, section: 'Security' }));

    return (
        <section id="skills" className="section-spacing">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-header">
                        <h2 className="section-title">Skills</h2>
                        <div className="section-underline" />
                    </div>

                    {/* Web Development Row */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FaCode className="text-cyan-400 text-base" />
                            <span className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-widest">
                                Web Development
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                            {webCategories.map((category, idx) => (
                                <SkillCard
                                    key={idx}
                                    category={category}
                                    idx={idx}
                                    isInView={isInView}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Security Row */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <FaShieldAlt className="text-orange-400 text-base" />
                            <span className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-widest">
                                Cybersecurity & Ethical Hacking
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-orange-500/30 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                            {secCategories.map((category, idx) => (
                                <SkillCard
                                    key={idx}
                                    category={category}
                                    idx={webCategories.length + idx}
                                    isInView={isInView}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function SkillCard({
    category,
    idx,
    isInView,
}: {
    category: { name: string; skills: string[]; section: string };
    idx: number;
    isInView: boolean;
}) {
    const icon = categoryIcons[category.name];
    const colorClass = sectionColors[category.section] ?? '';
    const labelClass = sectionLabelColors[category.section] ?? '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
            className={`relative rounded-xl border bg-gradient-to-br ${colorClass} p-4 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-300`}
            style={{ backdropFilter: 'blur(12px)' }}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-lg">{icon}</span>
                    <h4 className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                        {category.name}
                    </h4>
                </div>
            </div>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, skillIdx) => {
                    const skillIcon = skillIcons[skill];
                    return (
                        <motion.span
                            key={skillIdx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: idx * 0.06 + skillIdx * 0.03 }}
                            className="skill-pill flex items-center gap-1 px-2 py-0.5 rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[10px] sm:text-[11px] text-[var(--text-secondary)] cursor-default whitespace-nowrap"
                        >
                            {skillIcon && <span className="text-[10px]">{skillIcon}</span>}
                            {/* Shorten long skill names for cleaner display */}
                            {skill.replace(' (Component Architecture)', '').replace(' (Auth, Firestore)', '').replace(' (Row Level Security)', '').replace(' & GitHub', ' / GitHub')}
                        </motion.span>
                    );
                })}
            </div>
        </motion.div>
    );
}