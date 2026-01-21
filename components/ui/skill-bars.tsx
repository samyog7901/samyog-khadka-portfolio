"use client";

import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

interface SkillCategoryProps {
  name: string;
  skills: Skill[];
}

function SkillBar({ skill }: { skill: Skill }) {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate the bar width
          setTimeout(() => setWidth(skill.level), 100);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [skill.level]);

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-primary to-primary/60 rounded-full transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${width}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export function SkillBars() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 95 },
        { name: "HTML/CSS", level: 95 },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express", level: 80 },
        { name: "Python", level: 70 },
        { name: "REST APIs", level: 85 },
      ],
    },
    {
      name: "Database",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 70 },
        { name: "MySQL", level: 75 },
      ],
    },
    {
      name: "Tools & DevOps",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 60 },
        { name: "Postman", level: 85 },
        { name: "VS Code", level: 95 },
      ],
    },
  ];

  return (
    <div ref={sectionRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {skillCategories.map((category, categoryIndex) => (
        <div
          key={category.name}
          className={`p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: `${categoryIndex * 150}ms` }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-primary" />
            {category.name}
          </h3>
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <div
                key={skill.name}
                className={`transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{
                  transitionDelay: `${categoryIndex * 150 + skillIndex * 50}ms`,
                }}
              >
                <SkillBar skill={skill} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

