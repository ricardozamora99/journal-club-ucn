import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Calendar from "@/components/sections/Calendar/Calendar";
import Speakers from "@/components/sections/Speakers/Speakers";
import Join from "@/components/sections/Join/Join";
import Team from "@/components/sections/Team/Team";

export default function Page() {
  return (
    <main>
      <section id="top">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="calendar">
        <Calendar />
      </section>

      <section id="speakers">
        <Speakers />
      </section>

      <section id="join">
        <Join />
      </section>

      <section id="team">
        <Team />
      </section>
    </main>
  );
}

