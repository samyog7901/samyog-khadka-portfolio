"use client";

import { useEffect, useRef, useState } from "react";
import { SkillBars } from "@/components/ui/skill-bars";

const skillCategories = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "Python", "REST APIs"],
  },
  {
    name: "Database",
    skills: ["MongoDB", "PostgreSQL", "MySQL"],
  },
  {
    name: "Tools & Others",
    skills: ["Git/GitHub", "Docker", "Postman", "VS Code"],
  },
];

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary/30"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-primary font-medium mb-2 tracking-wide">
            Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Technologies I work with to bring ideas to life. I&apos;m constantly
            learning and adding new tools to my arsenal.
          </p>

          <SkillBars />
        </div>
      </div>
    </section>
  );
}
