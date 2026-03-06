"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Database, Layout, Server, Cog, BrainCircuit, Globe, Settings, Cpu, Coffee, FileCode, Terminal } from "lucide-react";
import { ReactNode } from "react";

function TiltWrapper({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay }}
            style={{ perspective: 1000 }}
            className={`w-full ${className || ''}`}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateY,
                    rotateX,
                    transformStyle: "preserve-3d",
                }}
            >
                <div style={{ transform: "translateZ(30px)" }}>
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
}

type Skill = {
    name: string;
    iconUrl?: string;
    iconComponent?: ReactNode;
};

type SkillCategory = {
    title: string;
    icon: ReactNode;
    skills: Skill[];
};

const skillCategories: SkillCategory[] = [
    {
        title: "Languages & Databases",
        icon: <Database className="w-6 h-6 md:w-8 md:h-8 mr-4 text-blue-400" />,
        skills: [
            { name: "Java", iconComponent: <Coffee className="w-6 h-6 text-white" /> },
            { name: "JavaScript", iconUrl: "https://cdn.simpleicons.org/javascript/white" },
            { name: "Python", iconUrl: "https://cdn.simpleicons.org/python/white" },
            { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/white" },
            { name: "PostgreSQL", iconUrl: "https://cdn.simpleicons.org/postgresql/white" },
        ]
    },
    {
        title: "Frontend Technologies",
        icon: <Layout className="w-6 h-6 md:w-8 md:h-8 mr-4 text-emerald-400" />,
        skills: [
            { name: "React.js", iconUrl: "https://cdn.simpleicons.org/react/white" },
            { name: "Redux", iconUrl: "https://cdn.simpleicons.org/redux/white" },
            { name: "HTML5", iconUrl: "https://cdn.simpleicons.org/html5/white" },
            { name: "CSS3", iconComponent: <FileCode className="w-6 h-6 text-white" /> },
            { name: "JSX", iconUrl: "https://cdn.simpleicons.org/react/white" },
            { name: "Context API", iconUrl: "https://cdn.simpleicons.org/react/white" },
            { name: "Hooks", iconUrl: "https://cdn.simpleicons.org/react/white" },
            { name: "Responsive Design", iconComponent: <Globe className="w-6 h-6 text-white" /> },
        ]
    },
    {
        title: "Backend Technologies",
        icon: <Server className="w-6 h-6 md:w-8 md:h-8 mr-4 text-purple-400" />,
        skills: [
            { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/white" },
            { name: "Express.js", iconUrl: "https://cdn.simpleicons.org/express/white" },
            { name: "Django", iconUrl: "https://cdn.simpleicons.org/django/white" },
            { name: "JSON", iconUrl: "https://cdn.simpleicons.org/json/white" },
            { name: "JWT", iconUrl: "https://cdn.simpleicons.org/jsonwebtokens/white" },
            { name: "RESTful APIs", iconComponent: <Globe className="w-6 h-6 text-white" /> },
            { name: "SOAP", iconComponent: <Cog className="w-6 h-6 text-white" /> },
        ]
    },
    {
        title: "DevOps & Tools",
        icon: <Cog className="w-6 h-6 md:w-8 md:h-8 mr-4 text-orange-400" />,
        skills: [
            { name: "Git", iconUrl: "https://cdn.simpleicons.org/git/white" },
            { name: "GitHub", iconUrl: "https://cdn.simpleicons.org/github/white" },
            { name: "Docker", iconUrl: "https://cdn.simpleicons.org/docker/white" },
            { name: "Jenkins", iconUrl: "https://cdn.simpleicons.org/jenkins/white" },
            { name: "VS Code", iconComponent: <Terminal className="w-6 h-6 text-white" /> },
            { name: "Postman", iconUrl: "https://cdn.simpleicons.org/postman/white" },
            { name: "SoapUI", iconComponent: <Settings className="w-6 h-6 text-white" /> },
            { name: "Agile/Scrum", iconUrl: "https://cdn.simpleicons.org/jira/white" },
        ]
    },
    {
        title: "AI/ML & GEN AI Tools",
        icon: <BrainCircuit className="w-6 h-6 md:w-8 md:h-8 mr-4 text-pink-400" />,
        skills: [
            { name: "Claude", iconUrl: "https://cdn.simpleicons.org/anthropic/white" },
            { name: "Machine Learning", iconComponent: <BrainCircuit className="w-6 h-6 text-white" /> },
            { name: "LLM Integration", iconComponent: <Cpu className="w-6 h-6 text-white" /> },
            { name: "aXet", iconComponent: <Globe className="w-6 h-6 text-white" /> },
        ]
    }
];

export default function Skills() {
    return (
        <section className="min-h-screen bg-[#121212] pt-32 pb-40 px-6 relative z-10 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-baseline justify-between mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-sm">
                        Tech Stack
                    </h2>
                    <span className="text-gray-500 uppercase tracking-widest text-sm hidden sm:block">
                        SKILLS &mdash; EXPERTISE
                    </span>
                </div>

                <div className="flex flex-col gap-16">
                    {skillCategories.map((category, i) => (
                        <TiltWrapper key={i} delay={i * 0.1}>
                            <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-12 hover:bg-white/[0.03] hover:border-white/20 transition-all duration-500 shadow-xl group">
                                {/* Subtle inner glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />

                                <div className="flex items-center mb-10 pb-6 border-b border-white/5 relative z-10">
                                    {category.icon}
                                    <h3 className="text-2xl md:text-3xl text-white font-medium tracking-tight">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-12 relative z-10">
                                    {category.skills.map((skill, j) => (
                                        <motion.div
                                            key={j}
                                            whileHover={{ y: -5, scale: 1.05 }}
                                            className="flex flex-col items-center justify-center group/skill cursor-pointer"
                                        >
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover/skill:bg-white/10 group-hover/skill:border-white/20 transition-all duration-300 shadow-md">
                                                {skill.iconUrl ? (
                                                    <img
                                                        src={skill.iconUrl}
                                                        alt={`${skill.name} logo`}
                                                        className="w-8 h-8 md:w-10 md:h-10 opacity-70 group-hover/skill:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                    />
                                                ) : (
                                                    <div className="opacity-70 group-hover/skill:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                        {skill.iconComponent}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-sm md:text-base text-gray-400 group-hover/skill:text-white transition-colors duration-300 font-medium text-center tracking-wide">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </TiltWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
