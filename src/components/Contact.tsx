"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Phone, Linkedin, Github, ArrowDownToLine, MapPin } from "lucide-react";

function TiltWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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

export default function Contact() {
    return (
        <section className="bg-[#121212] pt-32 pb-40 px-6 relative z-10 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-20 gap-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-sm">
                        Get In Touch
                    </h2>
                    <span className="text-gray-500 uppercase tracking-widest text-sm">
                        CONTACT &mdash; CONNECT
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <TiltWrapper>
                            <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-lg backdrop-blur-sm">
                                <p className="text-xl text-gray-300 font-light leading-relaxed mb-12">
                                    Feel free to reach out for collaborations, career opportunities, or just to say hi. I&apos;m always open to discussing new projects and creative ideas.
                                </p>

                                <div className="flex flex-col gap-8">
                                    <motion.a
                                        whileHover={{ x: 10 }}
                                        href="mailto:sachinkumar27fc@gmail.com"
                                        className="flex items-center gap-6 group w-fit"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300">
                                            <Mail className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-medium">Email</span>
                                            <span className="text-xl text-white font-medium tracking-tight">sachinkumar27fc@gmail.com</span>
                                        </div>
                                    </motion.a>

                                    <motion.a
                                        whileHover={{ x: 10 }}
                                        href="tel:9934775912"
                                        className="flex items-center gap-6 group w-fit"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300">
                                            <Phone className="w-6 h-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-medium">Phone</span>
                                            <span className="text-xl text-white font-medium tracking-tight">+91 9934775912</span>
                                        </div>
                                    </motion.a>

                                    <motion.div
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-6 group w-fit"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
                                            <MapPin className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-medium">Location</span>
                                            <span className="text-xl text-white font-medium tracking-tight">Noida, India</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </TiltWrapper>
                    </div>

                    {/* Action Cards */}
                    <div className="flex flex-col gap-6 w-full lg:max-w-md ml-auto">
                        <TiltWrapper>
                            <a
                                href="https://www.linkedin.com/in/sachin-kumar-singh-b29165162/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500 flex items-center justify-between group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 block w-full"
                            >
                                <div className="flex items-center gap-6">
                                    <Linkedin className="w-8 h-8 text-[#0a66c2]" />
                                    <span className="text-xl font-medium tracking-wide text-white group-hover:text-blue-200 transition-colors">LinkedIn Profile</span>
                                </div>
                                <svg className="w-6 h-6 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </a>
                        </TiltWrapper>

                        <TiltWrapper>
                            <a
                                href="https://github.com/Sachin0527"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-500 flex items-center justify-between group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 block w-full"
                            >
                                <div className="flex items-center gap-6">
                                    <Github className="w-8 h-8 text-white" />
                                    <span className="text-xl font-medium tracking-wide text-white group-hover:text-purple-200 transition-colors">GitHub Profile</span>
                                </div>
                                <svg className="w-6 h-6 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </a>
                        </TiltWrapper>

                        <TiltWrapper>
                            <a
                                href="/resume/Sachin_KumarCV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border border-blue-500/30 rounded-[2rem] p-8 hover:from-blue-600/30 hover:to-emerald-600/30 transition-all duration-500 flex items-center justify-between group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 mt-4 block w-full"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-xl font-medium tracking-wide text-white group-hover:text-blue-100 transition-colors">Download Resume</span>
                                        <span className="text-sm text-gray-300/80 font-light">PDF Document</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                        <ArrowDownToLine className="w-5 h-5 text-white group-hover:translate-y-1 transition-transform duration-300" />
                                    </div>
                                </div>
                            </a>
                        </TiltWrapper>
                    </div>
                </div>
            </div>
        </section>
    );
}
