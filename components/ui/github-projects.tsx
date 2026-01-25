"use client";

import { useEffect, useState } from "react";
import { Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Vercel deployment URL patterns
const VERCEL_DOMAINS = [
  "vercel.app",
  "vercel.dev",
  "now.sh",
  "cloudflareapps.com",
  "pages.dev",
  "netlify.app",
  "railway.app",
];

// Fallback Vercel-deployed projects - shown when GitHub API fails or is rate limited
const FALLBACK_PROJECTS = [
  {
    title: "Web Development Portfolio",
    description: "A showcase project demonstrating practical web development skills with modern UI/UX design principles and responsive layouts.",
    tags: ["React", "Tailwind CSS", "Next.js"],
    github: "https://github.com/samyog7901/samyog-portfolio",
    demo: "https://samyog-portfolio.vercel.app",
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

// Helper function to check if URL is a valid Vercel deployment
function isValidDeployment(url: string): boolean {
  if (!url || url.trim() === "") return false;
  return VERCEL_DOMAINS.some((domain) => url.includes(domain));
}

// Helper function to check if a URL returns a valid response (not 404)
async function isDemoAccessible(url: string): Promise<boolean> {
  if (!url || url.trim() === "") return false;
  
  try {
    // Use no-cors to avoid CORS issues, just check if we can reach it
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    });
    return true;
  } catch (error) {
    console.log(`Demo URL not accessible: ${url}`);
    return false;
  }
}

export function GitHubProjects() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_PROJECT_COUNT = 6;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/samyog7901/repos?sort=updated&per_page=100"
        );

        if (!response.ok) {
          console.log("GitHub API error, using fallback projects");
          setUseFallback(true);
          setAllProjects(FALLBACK_PROJECTS);
          setDisplayProjects(FALLBACK_PROJECTS.slice(0, INITIAL_PROJECT_COUNT));
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("GitHub API response:", data);

        if (!Array.isArray(data) || data.length === 0) {
          console.log("No repos found, using fallback");
          setUseFallback(true);
          setAllProjects(FALLBACK_PROJECTS);
          setDisplayProjects(FALLBACK_PROJECTS.slice(0, INITIAL_PROJECT_COUNT));
          setLoading(false);
          return;
        }

        // Filter out forks and convert to Project format
        const nonForkRepos = data.filter((repo: GitHubRepo) => !repo.fork);

        if (nonForkRepos.length === 0) {
          console.log("No non-fork repos, using fallback");
          setUseFallback(true);
          setAllProjects(FALLBACK_PROJECTS);
          setDisplayProjects(FALLBACK_PROJECTS.slice(0, INITIAL_PROJECT_COUNT));
        } else {
          // Convert GitHub repos to our project format
          const formattedProjects: Project[] = nonForkRepos.map((repo: GitHubRepo) => ({
            title: repo.name.replace(/-/g, " "),
            description: repo.description || "A project showcasing development skills and practical implementations.",
            tags: repo.topics?.slice(0, 4) || [repo.language || "Code"],
            github: repo.html_url,
            demo: repo.homepage || "",
            featured: true,
          }));

          // Only show projects with demo URLs (frontend projects)
          const frontendProjects = formattedProjects.filter((project) =>
            project.demo && project.demo.trim() !== ""
          );

          // Check which demo URLs are actually accessible
          const accessibleDemos: Record<string, boolean> = {};
          for (const project of frontendProjects) {
            if (isValidDeployment(project.demo)) {
              const isAccessible = await isDemoAccessible(project.demo);
              accessibleDemos[project.demo] = isAccessible;
              // Add small delay to avoid rate limiting
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          }

          // Categorize projects
          const projectsWithWorkingDemo = frontendProjects.filter(
            (project) => isValidDeployment(project.demo) && accessibleDemos[project.demo]
          );
          
          const projectsWithBrokenDemo = frontendProjects.filter(
            (project) => project.demo && project.demo.trim() !== "" && 
            (!isValidDeployment(project.demo) || !accessibleDemos[project.demo])
          );

          // Only show frontend projects (both working and broken demos)
          const allDisplayProjects = [...projectsWithWorkingDemo, ...projectsWithBrokenDemo];

          console.log(`Found ${projectsWithWorkingDemo.length} projects with working demos and ${projectsWithBrokenDemo.length} projects with broken/empty demos`);

          if (allDisplayProjects.length === 0) {
            console.log("No projects found, using fallback");
            setUseFallback(true);
            setAllProjects(FALLBACK_PROJECTS);
            setDisplayProjects(FALLBACK_PROJECTS.slice(0, INITIAL_PROJECT_COUNT));
          } else {
            setAllProjects(allDisplayProjects);
            setDisplayProjects(allDisplayProjects.slice(0, INITIAL_PROJECT_COUNT));
          }
        }
      } catch (err) {
        console.error("GitHub API fetch failed:", err);
        setUseFallback(true);
        setAllProjects(FALLBACK_PROJECTS);
        setDisplayProjects(FALLBACK_PROJECTS.slice(0, INITIAL_PROJECT_COUNT));
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Toggle between showing all projects or just the initial ones
  const toggleShowMore = () => {
    if (showAll) {
      setDisplayProjects(allProjects.slice(0, INITIAL_PROJECT_COUNT));
    } else {
      setDisplayProjects(allProjects);
    }
    setShowAll(!showAll);
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

  if (allProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <Github className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">No frontend projects with demo URLs found</p>
        <p className="text-sm text-muted-foreground">
          Add demo URLs to your GitHub repositories to see them here
        </p>
      </div>
    );
  }

  return (
    <div>
      {useFallback && (
        <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm text-primary">
            Showing sample frontend projects. Connect your GitHub to display your repositories with demo URLs.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProjects.map((project, index) => {
          // Check if this is a frontend project (has valid Vercel deployment)
          const isFrontend = isValidDeployment(project.demo);

          return (
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
                {isFrontend && project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-label="View live site"
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
                {isFrontend && project.demo ? (
                  <Badge variant="default" className="text-xs bg-green-600">
                    Frontend
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    Not Deployed
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                </Button>
                {isFrontend && project.demo && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More / Show Less Button */}
      {allProjects.length > INITIAL_PROJECT_COUNT && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={toggleShowMore}
            className="min-w-40"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show More ({allProjects.length - INITIAL_PROJECT_COUNT} more)
              </>
            )}
          </Button>
        </div>
      )}

      {/* Project count info */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {displayProjects.length} of {allProjects.length} frontend projects
        </p>
      </div>
    </div>
  );
}
