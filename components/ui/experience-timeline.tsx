"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, GraduationCap, Briefcase, Code2, ExternalLink } from "lucide-react";

interface TimelineItem {
  id: number;
  type: "education" | "experience" | "certification";
  title: string;
  organization: string;
  location?: string;
  date: string;
  description: string;
  icon: React.ElementType;
  link?: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: "education",
    title: "Bachelor of Computer Application (BCA)",
    organization: "SchEMS College (Pokhara University)",
    location: "Kathmandu, Nepal",
    date: "2023 - Present",
    description:
      "Currently pursuing BCA with focus on software development, database management and web technologies. Active participant in coding competitions and technical events.",
    icon: GraduationCap,
  },
  {
    id: 2,
    type: "experience",
    title: "Full Stack Developer",
    organization: "Self-Employed / Freelance",
    location: "Remote",
    date: "2025 - Present",
    description:
      "Building web applications using MERN stack. Developing practical projects to solve real-world problems. Contributing to open-source projects and learning new technologies.",
    icon: Briefcase,
  },
  {
    id: 3,
    type: "certification",
    title: "MERN Developer",
    organization: "Digital Pathshala Itahari",
    location: "Online",
    date: "2024-2025",
    description:
      "Completed MERN Developer certification. Developed Ecommerce platform as a major project using MongoDB, Express.js, React and Node.js stack.",
    icon: Code2,
    link: "https://www.digitalpathshalanepal.com/",
  },
  {
    id: 4,
    type: "certification",
    title: "Web Development Bootcamp",
    organization: "Digital Pathshala Itahari",
    location: "Online",
    date: "2023",
    description:
      "Completed comprehensive web development course covering HTML, CSS, JavaScript, React, Node.js, and MongoDB. Built multiple projects during the program.",
    icon: Code2,
    link: "https://www.digitalpathshalanepal.com/",
  },
  {
    id: 5,
    type: "education",
    title: "Higher Secondary Education",
    organization: "CCRC College",
    location: "Kathmandu, Nepal",
    date: "2020 - 2022",
    description:
      "Completed +2 in Science stream with focus on Computer Science. Developed initial interest in programming and software development.",
    icon: GraduationCap,
  },
];

export function ExperienceTimeline() {
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

  const getTypeColor = (type: TimelineItem["type"]) => {
    switch (type) {
      case "education":
        return "bg-primary/10 text-primary border-primary/20";
      case "experience":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "certification":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <section id="journey" ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-primary font-medium mb-2 tracking-wide">
            Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Experience & Education
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            My academic background and professional journey in software
            development.
          </p>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative flex items-start gap-6 ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center border-2 ${getTypeColor(
                      item.type
                    )} z-10 ${
                      isVisible
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-0"
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                      transitionDuration: "0.5s",
                    }}
                  >
                    <item.icon className="h-7 w-7" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-20 md:ml-0 w-full md:w-[calc(50%-4rem)] ${
                      index % 2 === 0 ? "md:text-left" : "md:text-left"
                    }`}
                  >
                    <div
                      className={`p-6 rounded-2xl bg-card border border-border hover:shadow hover:shadow-green-200 hover:border-primary/50 transition-all duration-200 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                      style={{
                        transitionDelay: `${index * 150 + 100}ms`,
                      }}
                    >
                      {/* Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            item.type === "education"
                              ? "bg-primary/10 text-primary"
                              : item.type === "experience"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-amber-500/10 text-amber-500"
                          }`}
                        >
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
                        {item.title}
                      </h3>

                      {/* Organization */}
                      <p className="text-primary font-medium mb-3">
                        {item.organization}
                      </p>

                      {/* Date and Location */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>{item.date}</span>
                        </span>
                        {item.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span>{item.location}</span>
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {/* Link */}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-3 transition-colors"
                        >
                          View Certificate
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Badge } from "@/components/ui/badge";

