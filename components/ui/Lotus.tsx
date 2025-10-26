"use client";

import { motion, Variants } from "framer-motion";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface LotusProps {
  size?: string;
  gradient?: string;
  petalCount?: number;
  animatePetals?: boolean; // ✅ toggle flicker animation
}

const Lotus: React.FC<LotusProps> = ({
  size = "h-[600px] w-[280px]",
  gradient = "bg-gradient-to-b from-[2%] from-pink-700/80 via-[40%] via-pink-400 to-[70%] to-white/70",
  petalCount = 7,
  animatePetals = true,
}) => {
  const centerIndex = Math.floor(petalCount / 2);
  const angleSpread = 150;
  const startAngle = -angleSpread / 2;

  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = startAngle + (i * angleSpread) / (petalCount - 1);
    const distanceFromCenter = Math.abs(i - centerIndex);
    const opacity = 0.8 - distanceFromCenter * 0.2;
    return { angle, opacity, distanceFromCenter };
  });

  const petalRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ Animate from center outward
  const petalVariants: Variants = {
    hidden: { opacity: 0, scaleY: 0, rotate: 0 },
    visible: (i: number) => {
      const distance = petals[i].distanceFromCenter;
      return {
        opacity: petals[i].opacity,
        scaleY: 1,
        rotate: petals[i].angle,
        transition: {
          duration: 1,
          delay: distance * 0.15,
          ease: "easeInOut",
        },
      };
    },
  };

  // ✅ Flickering animation (can be toggled)
  useEffect(() => {
    if (!animatePetals) return; // 🔒 skip if disabled

    const interval = setInterval(() => {
      petalRefs.current.forEach((el, i) => {
        if (!el) return;

        const baseAngle = petals[i].angle;
        const flickAngle = baseAngle + (Math.random() * 6 - 3);

        gsap.to(el, {
          rotate: flickAngle,
          duration: 0.4,
          ease: "power1.inOut",
          delay: i * 0.1,
        });

        gsap.to(el, {
          rotate: baseAngle,
          duration: 0.4,
          ease: "power1.inOut",
          delay: 0.5 + i * 0.1,
        });
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [animatePetals, petals]);

  return (
    <div className="relative flex items-center justify-center min-w-20">
      {petals.map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={petalVariants}
          ref={(el) => {
            petalRefs.current[index] = el;
          }}
          className={`absolute ${gradient} ${size}`}
          style={{
            clipPath: "ellipse(50% 50% at 50% 50%)",
            transformOrigin: "center bottom",
          }}
        />
      ))}
    </div>
  );
};

export default Lotus;
