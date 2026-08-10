import PeopleHero from "@/components/people/Hero/PeopleHero";
import CurrentMembers from "@/components/people/CurrentMembers/CurrentMembers";
import AlumniSection from "@/components/people/Alumni/AlumniSection";
import CTA from "@/components/home/CTA/CTA";

import { client } from "@/sanity/lib/client";
import { PEOPLE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

function preparePerson(person) {
  return {
    ...person,

    // Avoid accidental spaces at the beginning/end of names
    name: person.name?.trim() ?? "",

    // Convert the Sanity image object into a URL usable by next/image
    imageUrl: person.photo
      ? urlFor(person.photo)
          .width(1200)
          .height(1020)
          .fit("crop")
          .url()
      : null,
  };
}

export default async function PeoplePage() {
  let people = [];
  let sanityError = false;

  try {
    const sanityPeople = await client.fetch(PEOPLE_QUERY);

    people = sanityPeople.map(preparePerson);
  } catch (error) {
    console.error("Error loading People from Sanity:", error);
    sanityError = true;
  }

  return (
    <>
      <PeopleHero />

      <CurrentMembers
        people={people}
        sanityError={sanityError}
      />

      <AlumniSection
        people={people}
        sanityError={sanityError}
      />

      <CTA />
    </>
  );
}