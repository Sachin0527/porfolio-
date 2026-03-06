"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({
    scrollProgress,
}: {
    scrollProgress: MotionValue<number>;
}) {
    // Section 1 (0% scroll) fades out as user scrolls
    const y1 = useTransform(scrollProgress, [0, 0.2], [0, -100]);
    const opacity1 = useTransform(scrollProgress, [0, 0.1, 0.2], [1, 1, 0]);

    // Section 2 (30% scroll) 
    const y2 = useTransform(scrollProgress, [0.2, 0.3, 0.45], [100, 0, -100]);
    const opacity2 = useTransform(
        scrollProgress,
        [0.2, 0.3, 0.4, 0.45],
        [0, 1, 1, 0]
    );

    // Section 3 (60% scroll)
    const y3 = useTransform(scrollProgress, [0.5, 0.6, 0.75], [100, 0, -100]);
    const opacity3 = useTransform(
        scrollProgress,
        [0.5, 0.6, 0.7, 0.75],
        [0, 1, 1, 0]
    );

    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="relative w-full h-full max-w-7xl mx-auto px-6">
                {/* Section 1 */}
                <motion.div
                    style={{ y: y1, opacity: opacity1 }}
                    className="absolute inset-0 flex flex-col justify-center items-center text-center pb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
                        Sachin Kumar.
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-gray-300 font-light drop-shadow-md">
                        Creative Developer.
                    </p>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    style={{ y: y2, opacity: opacity2 }}
                    className="absolute inset-0 flex flex-col justify-center items-start text-left pb-20 md:pr-[20%]"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-xl text-white drop-shadow-lg leading-tight">
                        I build digital experiences.
                    </h2>
                    <p className="mt-8 text-lg md:text-xl text-gray-300 font-light drop-shadow-md max-w-2xl leading-relaxed">
                        Full-Stack Developer with 3+ years of experience in designing, developing, and maintaining scalable web applications. Proficient in backend API development, frontend UI implementation, database management, and application performance optimization. Experienced in AI-enabled solutions, production support, and Agile-based project delivery.
                    </p>
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    style={{ y: y3, opacity: opacity3 }}
                    className="absolute inset-0 flex flex-col justify-center items-end text-right pb-20 md:pl-[20%]"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-xl text-white drop-shadow-lg leading-tight">
                        Bridging design and engineering.
                    </h2>
                </motion.div>
            </div>
        </div>
    );
}
