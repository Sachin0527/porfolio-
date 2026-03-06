"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const experiences = [
    {
        role: "Info Tech Analyst",
        company: "NTT DATA",
        period: "2025 - Present",
        location: "Noida, India",
        highlights: [
            "Responsible for designing and supporting AI-enabled web applications, ensuring scalable architecture and seamless user experience."
        ]
    },
    {
        role: "Sr. Associate Developer",
        company: "NTT DATA",
        period: "2022 - 2025",
        location: "Noida, India",
        highlights: [
            "Focused on developing and maintaining secure, high-performance backend systems and responsive web applications."
        ]
    }
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0], index: number }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="relative w-full"
            style={{ perspective: 1000 }}
        >
            {/* Timeline Node */}
            <div className="absolute -left-[21px] md:-left-[37px] top-8 w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center border border-white/10 z-20">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]" />
            </div>

            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateY,
                    rotateX,
                    transformStyle: "preserve-3d",
                }}
                className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-12 hover:bg-white/[0.04] transition-colors duration-500 ml-6 md:ml-12 shadow-lg relative cursor-pointer group w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)]"
            >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />

                <div
                    style={{ transform: "translateZ(30px)" }}
                    className="relative z-10"
                >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                        <div>
                            <h3 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-2 group-hover:text-blue-200 transition-colors duration-300">
                                {exp.role}
                            </h3>
                            <h4 className="text-xl md:text-2xl text-blue-400 font-light tracking-wide mb-4">
                                {exp.company}
                            </h4>
                        </div>
                        <div className="flex flex-col md:items-end gap-2 text-gray-400 font-mono">
                            <span className="bg-white/5 py-1.5 px-4 rounded-full text-sm border border-white/10 w-fit md:w-auto">
                                {exp.period}
                            </span>
                            <span className="flex items-center text-sm mt-1">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {exp.location}
                            </span>
                        </div>
                    </div>

                    <ul className="space-y-5 text-gray-300/90 font-light">
                        {exp.highlights.map((highlight, j) => (
                            <li key={j} className="flex items-start text-base md:text-lg">
                                <span className="text-blue-500 mr-4 mt-2.5 opacity-70">
                                    <svg width="8" height="8" viewBox="0 0 6 6" fill="currentColor">
                                        <circle cx="3" cy="3" r="3" />
                                    </svg>
                                </span>
                                <span className="leading-relaxed leading-8">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Experience() {
    return (
        <section className="min-h-screen bg-[#121212] pt-32 pb-40 px-6 relative z-10 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-baseline justify-between mb-24">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-sm">
                        Experience
                    </h2>
                    <span className="text-gray-500 uppercase tracking-widest text-sm hidden sm:block">
                        CAREER &mdash; TIMELINE
                    </span>
                </div>

                <div className="relative pl-4 md:pl-8 border-l border-white/10 space-y-20">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={index} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
