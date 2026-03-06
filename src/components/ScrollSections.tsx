"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";

export default function ScrollSections() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

    return (
        <div ref={containerRef} className="relative">
            {/* The Continuous Scroll Progress Line connecting all sections */}
            <motion.div
                style={{ opacity }}
                className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/10 z-0 hidden md:block"
            >
                <motion.div
                    style={{ scaleY, transformOrigin: "top" }}
                    className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"
                />
            </motion.div>

            <div className="relative z-10 w-full flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <Experience />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <Projects />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <Skills />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <Contact />
                </motion.div>
            </div>
        </div>
    );
}
