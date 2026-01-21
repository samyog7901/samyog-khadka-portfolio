"use client";

import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

export function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
// Fallback sample projects when GitHub API fails or rate limited
const FALLBACK_PROJECTS: GitHubRepo[] = [
  {
    id: 1,
    name: "online-bookshop-system",
    description: "A comprehensive online bookshop with full CRUD backend functionality. Features include book management, user authentication, and order processing.",
    html_url: "https://github.com/samyog7901",
    homepage: "",
    stargazers_count: 45,
    forks_count: 12,
    language: "Node.js",
    topics: ["nodejs", "express", "mongodb", "rest-api"],
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "portfolio-website",
    description: "A showcase project demonstrating practical web development skills with modern UI/UX design principles and responsive layouts.",
    html_url: "https://github.com/samyog7901",
    homepage: "",
    stargazers_count: 78,
    forks_count: 15,
    language: "TypeScript",
    topics: ["react", "tailwind", "nextjs", "typescript"],
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "mern-stack-project",
    description: "An ongoing full-stack project built with the MERN stack featuring real-time updates and modern architecture.",
    html_url: "https://github.com/samyog7901",
    homepage: "",
    stargazers_count: 62,
    forks_count: 23,
    language: "JavaScript",
    topics: ["mongodb", "express", "react", "nodejs"],
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "task-management-app",
    description: "A modern task management application with drag-and-drop functionality and real-time collaboration features.",
    html_url: "https://github.com/samyog7901",
    homepage: "",
    stargazers_count: 89,
    forks_count: 34,
    language: "Python",
    topics: ["python", "django", "postgresql", "websocket"],
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "weather-dashboard",
    description: "A beautiful weather dashboard with location-based forecasts and interactive charts using weather API.",
    html_url: "https://github.com/samyog7901",
    homepage: "",
    stargazers_count: 156,
    forks_count: 45,
    language: "JavaScript",
    topics: ["javascript", "api", "charts", "responsive"],
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: "e-commerce-platform",
    description: "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
    html_url: "https://github.com/samyog7901",
    homepage: "",
    stargazers_count: 234,
    forks_count: 67,
    language: "TypeScript",
    topics: ["typescript", "nextjs", "stripe", "tailwind"],
    updated_at: new Date().toISOString(),
  },
];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/samyog7901/repos?sort=updated&per_page=10"
        );
        
        if (!response.ok) {
          console.log("GitHub API error, using fallback projects");
          setRepos(FALLBACK_PROJECTS);
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        console.log("GitHub API response:", data);
        
        if (!Array.isArray(data) || data.length === 0) {
          console.log("No repos found, using fallback");
          setRepos(FALLBACK_PROJECTS);
          setLoading(false);
          return;
        }
        
        // Filter out forks and show real repos, fallback if none
        const nonForkRepos = data.filter((repo: GitHubRepo) => !repo.fork);
        if (nonForkRepos.length === 0) {
          setRepos(FALLBACK_PROJECTS);
        } else {
          setRepos(nonForkRepos.slice(0, 6));
        }
        console.log("Setting repos:", nonForkRepos.slice(0, 6));
      } catch (err) {
        console.error("GitHub API fetch failed:", err);
        setRepos(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

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

  if (repos.length === 0) {
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
    <div ref={sectionRef}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, index) => (
          <div
            key={repo.id}
            className={`group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <Github className="h-5 w-5 text-primary shrink-0" />
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {repo.name.replace(/-/g, " ")}
                </h3>
              </div>
              {repo.homepage && repo.homepage.length > 0 && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  aria-label="View demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 min-h-10">
              {repo.description ||
                "A project showcasing development skills and practical implementations."}
            </p>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3 w-3" />
                  {repo.forks_count}
                </span>
              </div>
              <span>{formatDate(repo.updated_at)}</span>
            </div>

            {(repo.topics || []).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {(repo.topics || []).slice(0, 3).map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            )}

            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View Repository
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

