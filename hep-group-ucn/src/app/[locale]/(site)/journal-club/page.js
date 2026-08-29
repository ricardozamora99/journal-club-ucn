import About from "@/components/journal-club/About/About";
import Speakers from "@/components/journal-club/Speakers/Speakers";
import Team from "@/components/journal-club/Team/Team";
import Join from "@/components/journal-club/Join/Join";
import Hero from "@/components/journal-club/Hero/Hero";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

import { JOURNAL_CLUB_QUERY, PEOPLE_QUERY, } from "@/sanity/lib/queries";

function prepareTalk(talk) {
  return {
    ...talk,

    mainTopic: talk.mainTopic?.trim() ?? "",
    title: talk.title?.trim() ?? "",
    speaker: talk.speaker?.trim() ?? "",
    affiliation: talk.affiliation?.trim() ?? "",
    time: talk.time?.trim() ?? "",
    location: talk.location?.trim() ?? "",
    abstract: talk.abstract?.trim() ?? "",

    isUpcoming: talk.isUpcoming === true,

    posterUrl: talk.poster
      ? urlFor(talk.poster)
          .width(1600)
          .quality(90)
          .url()
      : null,
  };
}
function preparePerson(person) {
  return {
    ...person,

    name: person.name?.trim() ?? "",

    imageUrl: person.photo
      ? urlFor(person.photo)
          .width(700)
          .height(700)
          .fit("crop")
          .url()
      : null,
  };
}

export default async function JournalClubPage() {
  let talks = [];
  let sanityError = false;
  let journalClubTeam = [];
  let peopleSanityError = false;

  try {
    const sanityTalks = await client.fetch(
      JOURNAL_CLUB_QUERY
    );

    talks = sanityTalks.map(prepareTalk);
  } catch (error) {
    console.error(
      "Error loading Journal Club talks from Sanity:",
      error
    );

    sanityError = true;
  }

  try {
  const sanityPeople = await client.fetch(PEOPLE_QUERY);

  journalClubTeam = sanityPeople
    .map(preparePerson)
    .filter(
      (person) =>
        person.membershipStatus === "current" &&
        person.isJournalClubTeam === true
    )
    .sort((a, b) => {
      const orderA =
        typeof a.displayOrder === "number"
          ? a.displayOrder
          : Number.MAX_SAFE_INTEGER;

      const orderB =
        typeof b.displayOrder === "number"
          ? b.displayOrder
          : Number.MAX_SAFE_INTEGER;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return a.name.localeCompare(b.name);
    })
    .slice(0, 4);
} catch (error) {
  console.error(
    "Error loading Journal Club team from Sanity:",
    error
  );

  peopleSanityError = true;
}

  return (
    <main>
      <Hero />

      <About />

      <Speakers
        talks={talks}
        sanityError={sanityError}
      />

      <Team
  members={journalClubTeam}
  sanityError={peopleSanityError}
/>

      <Join />
    </main>
  );
}