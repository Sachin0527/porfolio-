"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const projects = [
    {
        title: "Incident Solution Recommender",
        tech: "React.js / Node.js / Machine Learning",
        year: "2023",
        description: [
            "Built a machine learning utility using a Random Forest model to auto-suggest incident resolutions based on historical ticket data, improving prediction accuracy and reducing manual troubleshooting time.",
            "Enabled flexible hyperparameter tuning through external configuration files, allowing dynamic adjustment of model parameters without requiring code changes or redeployment.",
            "Developed a React.js-based dashboard integrated with a Node.js API to display prediction results, confidence scores, and recommended resolution steps for support teams.",
            "🏆 Winner – Global Innovation Program 2023, NTT DATA"
        ]
    },
    {
        title: "Real-Time Work Notes Notification Tool",
        tech: "Node.js / Express.js / REST APIs",
        year: "2023",
        description: [
            "Developed a lightweight notification engine with RESTful APIs (Node.js & Express.js) integrated with ticketing tools to trigger real-time alerts based on incident status and priority.",
            "Designed API endpoints to handle event-based notifications, enabling seamless communication between backend systems and external services.",
            "Improved operational efficiency by eliminating reliance on manual emails and automating status updates through centralized, API-driven notifications."
        ]
    },
    {
        title: "Learning Management System (LMS)",
        tech: "MERN Stack",
        year: "2023",
        description: [
            "Developed a full-stack LMS platform using MERN stack for managing courses, assignments, and user roles.",
            "Implemented user authentication, course enrollment, and admin dashboards with role-based access.",
            "Enabled instructors to upload resources, manage student performance, and automate attendance tracking."
        ]
    },
    {
        title: "Face Detection Attendance System",
        tech: "Python / Firebase / OpenCV",
        year: "2023",
        description: [
            "Developed a Face Detection Attendance System using facial recognition technology to automate attendance marking and reduce manual errors.",
            "Integrated Google Firebase for real-time data synchronization, secure storage, and instant attendance updates across devices.",
            "Designed and implemented an admin dashboard to monitor attendance records, generate reports, and manage user data efficiently.",
            "Optimized image processing and authentication workflows to ensure accurate face matching and improved system reliability."
        ]
    }
];

function ProjectCard({ p }: { p: typeof projects[0] }) {
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
            style={{
                perspective: 1000
            }}
            className="w-full"
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
                className="group relative backdrop-blur-xl bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[2rem] hover:bg-white/[0.04] hover:border-white/20 transition-colors duration-500 shadow-lg hover:shadow-2xl hover:shadow-white/5 cursor-pointer"
            >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />

                <div
                    style={{ transform: "translateZ(40px)" }}
                    className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-16"
                >
                    <div className="flex-1 md:max-w-xl lg:max-w-3xl">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-4 tracking-tight group-hover:text-blue-200 transition-colors duration-300">
                            {p.title}
                        </h3>

                        <ul className="space-y-4 text-gray-300/90 font-light mt-8">
                            {p.description.map((desc, j) => (
                                <li key={j} className="flex items-start text-[1.05rem] md:text-lg">
                                    <span className="text-blue-400 mr-4 mt-2.5 opacity-80">
                                        <svg width="8" height="8" viewBox="0 0 6 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3" cy="3" r="3" />
                                        </svg>
                                    </span>
                                    <span className="leading-relaxed">{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
                        <p className="text-blue-300/80 text-sm tracking-widest uppercase font-medium">
                            {p.tech}
                        </p>
                        <span className="text-gray-500 font-mono text-lg group-hover:text-gray-300 transition-colors duration-300 hidden md:block mt-8">
                            {p.year}
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section className="min-h-screen bg-[#121212] pt-32 pb-40 px-6 relative z-10 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-baseline justify-between mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-sm">
                        Selected Works
                    </h2>
                    <span className="text-gray-500 uppercase tracking-widest text-sm hidden sm:block">
                        01 &mdash; 04
                    </span>
                </div>

                <div className="flex flex-col gap-16">
                    {projects.map((p, i) => (
                        <ProjectCard key={i} p={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
