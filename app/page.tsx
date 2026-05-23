import Hero from "@/components/Hero";
import CoreSkills from "@/components/CoreSkills";
import FeaturedProjects from "@/components/FeaturedProjects";
import Timeline from "@/components/Timeline";
import GitHubActivity from "@/components/GitHubActivity";
import ResumeDownload from "@/components/ResumeDownload";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CoreSkills />
      <FeaturedProjects />
      <Timeline />
      <GitHubActivity />
      <ResumeDownload />
    </>
  );
}
