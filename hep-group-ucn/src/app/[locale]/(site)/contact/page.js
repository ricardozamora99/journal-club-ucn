import ContactIntro from "@/components/contact/Intro/ContactIntro";
import ContactGroups from "@/components/contact/ContactGroups/ContactGroups";
import ContactCTA from "@/components/contact/ContactCTA/ContactCTA";

import { client } from "@/sanity/lib/client";
import { CONTACT_QUERY } from "@/sanity/lib/queries";

export default async function ContactPage() {
  let people = [];
  let sanityError = false;

  try {
    people = await client.fetch(CONTACT_QUERY);
  } catch (error) {
    console.error("Error loading Contact data from Sanity:", error);
    sanityError = true;
  }

  const head =
    people.find((person) => person.isGroupHead === true) ?? null;

  return (
    <>
      <ContactIntro
        head={head}
        sanityError={sanityError}
      />

      <ContactGroups
        people={people}
        sanityError={sanityError}
      />

      <ContactCTA />
    </>
  );
}