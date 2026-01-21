"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitHubProjects } from "@/components/ui/github-projects";

const projects = [
  {
    title: "Online Bookshop System",
    description:
      "A comprehensive online bookshop with full CRUD backend functionality. Features include book management, user authentication, and order processing.",
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "Web Development Portfolio",
    description:
      "A showcase project demonstrating practical web development skills with modern UI/UX design principles and responsive layouts.",
    tags: ["React", "Tailwind CSS", "Next.js"],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "MERN Stack Project",
    description:
      "An ongoing full-stack project built with the MERN stack (MongoDB, Express, React, Node.js) featuring real-time updates and modern architecture.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    github: "#",
    demo: "#",
    featured: true,
  },
];

export function Projects() {
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
    <section id="projects" ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-primary font-medium mb-2 tracking-wide">Work</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            My Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Here are some of the projects I&apos;ve worked on. Each project
            represents a step in my journey as a developer, showcasing different
            skills and technologies.
          </p>

          <GitHubProjects />
        </div>
      </div>
    </section>
  );
}
