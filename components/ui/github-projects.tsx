"use client";

import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Fallback projects data - shown when GitHub API fails or is rate limited
const FALLBACK_PROJECTS = [
  {
    title: "Online Bookshop System",
    description: "A comprehensive online bookshop with full CRUD backend functionality. Features include book management, user authentication, and order processing.",
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    github: "https://github.com/samyog7901",
    demo: "#",
    featured: true,
  },
  {
    title: "Web Development Portfolio",
    description: "A showcase project demonstrating practical web development skills with modern UI/UX design principles and responsive layouts.",
    tags: ["React", "Tailwind CSS", "Next.js"],
    github: "https://github.com/samyog7901",
    demo: "#",
    featured: true,
  },
  {
    title: "MERN Stack Project",
    description: "An ongoing full-stack project built with the MERN stack (MongoDB, Express, React, Node.js) featuring real-time updates and modern architecture.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/samyog7901",
    demo: "#",
    featured: true,
  },
];

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork?: boolean;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
}

export function GitHubProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/samyog7901/repos?sort=updated&per_page=10"
        );

        if (!response.ok) {
          console.log("GitHub API error, using fallback projects");
          setUseFallback(true);
          setProjects(FALLBACK_PROJECTS);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("GitHub API response:", data);

        if (!Array.isArray(data) || data.length === 0) {
          console.log("No repos found, using fallback");
          setUseFallback(true);
          setProjects(FALLBACK_PROJECTS);
          setLoading(false);
          return;
        }

        // Filter out forks and convert to Project format
        const nonForkRepos = data.filter((repo: GitHubRepo) => !repo.fork);

        if (nonForkRepos.length === 0) {
          console.log("No non-fork repos, using fallback");
          setUseFallback(true);
          setProjects(FALLBACK_PROJECTS);
        } else {
          // Convert GitHub repos to our project format
          const formattedProjects: Project[] = nonForkRepos.slice(0, 6).map((repo: GitHubRepo) => ({
            title: repo.name.replace(/-/g, " "),
            description: repo.description || "A project showcasing development skills and practical implementations.",
            tags: repo.topics?.slice(0, 4) || [repo.language || "Code"],
            github: repo.html_url,
            demo: repo.homepage || "#",
            featured: true,
          }));
          setProjects(formattedProjects);
        }
      } catch (err) {
        console.error("GitHub API fetch failed:", err);
        setUseFallback(true);
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-card border border-border animate-pulse"
          >
            <div className="h-4 bg-secondary rounded w-3/4 mb-4" />
            <div className="h-3 bg-secondary rounded w-full mb-2" />
            <div className="h-3 bg-secondary rounded w-2/3 mb-4" />
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-secondary rounded" />
              <div className="h-5 w-16 bg-secondary rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <Github className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">No projects to display</p>
        <p className="text-sm text-muted-foreground">
          Add repositories to your GitHub to see them here
        </p>
      </div>
    );
  }

  return (
    <div>
      {useFallback && (
        <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm text-primary">
            Showing sample projects. Connect your GitHub to display real repositories.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <Github className="h-5 w-5 text-primary shrink-0" />
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {project.title}
                </h3>
              </div>
              {project.demo && project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  aria-label="View demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-3 min-h-14">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
              {project.demo && project.demo !== "#" && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

