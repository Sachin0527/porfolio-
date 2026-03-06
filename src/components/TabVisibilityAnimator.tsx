"use client";

import { useEffect } from "react";

export default function TabVisibilityAnimator() {
    useEffect(() => {
        // When user switches away to another tab and comes back, run the pop-up animation
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                // Add an animation class to the body to trigger a CSS 3D pop up animation
                document.body.classList.remove("tab-switch-animation");

                // Trigger a reflow to restart the animation
                void document.body.offsetWidth;

                document.body.classList.add("tab-switch-animation");
            }
        };

        // Add the listener
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            // Clean up
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.body.classList.remove("tab-switch-animation");
        };
    }, []);

    // This component doesn't render anything visible
    return null;
}
