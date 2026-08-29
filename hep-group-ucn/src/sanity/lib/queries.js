import { defineQuery } from "next-sanity";

export const PEOPLE_QUERY = defineQuery(`
  *[_type == "person"] | order(name asc) {
    _id,
    name,
    photo,
    countryCode,
    role,
    description,
    email,
    membershipStatus,
    startYear,
    endYear,
    currentlyAt,
    isGroupHead,
    office,
    phone,
    displayOrder,
    isJournalClubTeam,
  }
`);

export const CONTACT_QUERY = defineQuery(`
  *[
    _type == "person" &&
    membershipStatus == "current"
  ] | order(name asc) {
    _id,
    name,
    role,
    email,
    isGroupHead,
    office,
    phone
  }
`);

// Busca todos los documentos
// _type == "person"

// ↓
// ordénalos alfabéticamente

// ↓
// devuelve solo los campos que necesitamos
export const JOURNAL_CLUB_QUERY = defineQuery(`
  *[_type == "journalClubTalk"] | order(date desc) {
    _id,
    mainTopic,
    title,
    speaker,
    affiliation,
    date,
    time,
    location,
    abstract,
    poster,
    isUpcoming
  }
`);