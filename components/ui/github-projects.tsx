"use client";

import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

export function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/samyog7901/repos?sort=updated&per_page=6"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
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

  if (error) {
    return (
      <div className="text-center py-12">
        <Github className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">{error}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Showing sample projects instead
        </p>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {repo.name.replace(/-/g, " ")}
              </h3>
            </div>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {repo.description ||
              "A project showcasing development skills and practical implementations."}
          </p>

          {/* Language & Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
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

          {/* Topics/Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics?.slice(0, 3).map((topic: string) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>

          {/* Action Button */}
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View Repository
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
}

