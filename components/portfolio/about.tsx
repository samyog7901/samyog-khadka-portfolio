"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Sparkles, Lightbulb, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "Building end-to-end web applications with modern technologies",
  },
  {
    icon: Sparkles,
    title: "Clean Code",
    description: "Writing maintainable and efficient code following best practices",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Turning complex challenges into elegant solutions",
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    description: "Constantly exploring new technologies and frameworks",
  },
];

export function About() {
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
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary/30"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-primary font-medium mb-2 tracking-wide">About</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
            About Myself
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I am a full-stack enthusiast passionate about learning and
                implementing development concepts that solve real-world
                problems. As a BCA student at SchEMS College (affiliated with
                Pokhara University), I continuously work on practical projects
                to strengthen my skills.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My journey in software development is driven by curiosity and a
                desire to create meaningful digital experiences. I believe in
                writing clean, maintainable code and staying up-to-date with the
                latest technologies in the ever-evolving web development
                landscape.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I&apos;m not coding, you can find me exploring new frameworks,
                contributing to open-source projects, or learning about system
                design and architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className={`p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <item.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
