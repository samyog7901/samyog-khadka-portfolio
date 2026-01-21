"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const titles = [
  "Full Stack Developer",
  "BCA Student",
  "Problem Solver",
  "Tech Enthusiast",
];

export function TypewriterTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentText = titles[currentIndex];
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;
    const transitionDelay = 300;

    const handleTyping = () => {
      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText((prev) => currentText.slice(0, prev.length - 1));
        } else {
          // Deletion complete - pause before starting next title
          setIsPaused(true);
          setTimeout(() => {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % titles.length);
            setIsPaused(false);
          }, transitionDelay);
        }
      } else {
        if (displayedText.length < currentText.length) {
          setDisplayedText((prev) => currentText.slice(0, prev.length + 1));
        } else {
          // Typing complete - pause before starting deletion
          setIsPaused(true);
          setTimeout(() => {
            setIsDeleting(true);
            setIsPaused(false);
          }, pauseDuration);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, displayedText, isDeleting, isPaused]);

  return (
    <span className="text-primary">
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-6 ml-1 align-middle bg-primary"
      />
    </span>
  );
}

