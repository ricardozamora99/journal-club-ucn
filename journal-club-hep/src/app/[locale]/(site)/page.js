import Hero from "@/components/sections/Hero/Hero";
import ProcessSteps from "@/components/sections/ProcessSteps/ProcessSteps";
import ServicesGrid from "@/components/sections/ServicesGrid/ServicesGrid";
import FeaturedProjects from "@/components/sections/FeaturedProjects/FeaturedProjects";
import Overview from "@/components/sections/Overview/Overview";


export default function HomePage({ params }) {
  const { locale } = params;

  return (
    <>
      <Hero locale={locale} />
      <Overview />
      
      <ProcessSteps />
      <ServicesGrid />

      <FeaturedProjects locale={locale} />
    </>
  );
}
