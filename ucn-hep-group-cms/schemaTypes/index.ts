// Here are the schema types of the document schemas defined in your project.
// Import them and add them to the schemaTypes array to make them
// available in Sanity Studio.

import {personType} from './personTypes'
import {journalClubTalkType} from './journalClubTalkTypes'

export const schemaTypes = [
  personType,
  journalClubTalkType,
]