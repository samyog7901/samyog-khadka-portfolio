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

  useEffect(() => {
    const currentText = titles[currentIndex];
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;

    const handleTyping = () => {
      if (isDeleting) {
        setDisplayedText((prev) => currentText.slice(0, prev.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }
      } else {
        setDisplayedText((prev) => currentText.slice(0, prev.length + 1));
        if (displayedText === currentText) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, displayedText, isDeleting]);

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

