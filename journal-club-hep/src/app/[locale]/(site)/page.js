import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Calendar from "@/components/sections/Calendar/Calendar";
import Speakers from "@/components/sections/Speakers/Speakers";
import Papers from "@/components/sections/Papers/Papers";
import Join from "@/components/sections/Join/Join";
import Team from "@/components/sections/Team/Team";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Calendar />
      <Speakers />
      <Papers />
      <Join />
      <Team />
    </main>
  );
}
