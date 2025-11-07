"use client";
import React, { useEffect } from "react";
// import { motion } from "framer-motion";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Texts = () => {
  useEffect(() => {
    const split = new SplitType(".text", {
      types: "words,chars",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#text",
        start: "top top",
        end: "bottom+=1000 bottom",
        scrub: 0,
        pin: true,
      },
    });

    // tl.to(split.chars, {
    //   duration: 1.5,
    //   color: "white",
    //   stagger: 0.5,
    // });

    tl.to(split.chars, {
      duration: 1.5,
      color: "lightpink",
      stagger: 0.5,
      delay: -1,
    });
  }, []);
  return (
    <div id="text" className="flex-center min-h-screen relative p-4">
      <h1 className="text font-bold text max-w-[500px] text-[2em] uppercase tracking-wider transition-all text-pink-500/10 text-center">
        We’re developers and vibe coders — we just want to copy, paste, and stay
        in full control of our projects
      </h1>
      <div className="-z-10 flex-center blur-[100px] absolute size-[550px] opacity-50 rounded-full bg-linear-to-br from-primary to-primary-light"></div>
    </div>
  );
};

export default Texts;
