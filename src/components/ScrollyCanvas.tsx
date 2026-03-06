"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay"

const FRAME_COUNT = 120; // Exact count from the sequence folder
const FRAME_FORMAT = (index: number) =>
  `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.066s.png`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame index (0 to FRAME_COUNT - 1)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_FORMAT(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          // If first image is loaded and we haven't scrolled, render it
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) drawImage(ctx, canvasRef.current, loadedImages[0]);
          }
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawImage = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement
  ) => {
    const { width, height } = canvas;
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      drawHeight = height;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.round(latest);
    if (images[index] && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) drawImage(ctx, canvasRef.current, images[index]);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && images.length > 0) {
        // resize canvas internal resolution to match screen dimensions
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const currentFrame = Math.round(frameIndex.get());
        const ctx = canvasRef.current.getContext("2d");
        if (ctx && images[currentFrame]) {
          drawImage(ctx, canvasRef.current, images[currentFrame]);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    // Trigger immediately to setup canvas resolution correctly
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Pass the same scroll progress to the overlay for text animations */}
        <Overlay scrollProgress={scrollYProgress} />

        {/* Gradient fade to smooth the transition towards the Experience section */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#121212] to-transparent z-20 pointer-events-none" />
      </div>
    </div>
  );
}
