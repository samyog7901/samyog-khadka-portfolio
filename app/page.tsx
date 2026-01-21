import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { ExperienceTimeline } from "@/components/ui/experience-timeline";
// import { Projects } from "@/components/portfolio/projects";
import { Skills } from "@/components/portfolio/skills";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { GitHubProjects } from "@/components/ui/github-projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <ExperienceTimeline />
      
      <section id="projects" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
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
      </section>
      
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
