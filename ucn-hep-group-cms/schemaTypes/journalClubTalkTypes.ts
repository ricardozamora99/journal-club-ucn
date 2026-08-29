import {defineField, defineType} from 'sanity'

export const journalClubTalkType = defineType({
  name: 'journalClubTalk',
  title: 'Journal Club Talks',
  type: 'document',

  fields: [
    defineField({
      name: 'mainTopic',
      title: 'Main topic',
      type: 'string',
      description:
        'Short general topic, for example: Dark Matter, Neutrinos, QCD, Cosmology.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Talk title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'string',
      description:
        'Name of the speaker. For internal sessions this can also be "Group Members".',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'affiliation',
      title: 'Affiliation',
      type: 'string',
      description:
        'University, laboratory, institute, or research group.',
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description:
        'For example: 11:40–12:40.',
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description:
        'For example: UCN Physics Department, Room 515 or Online.',
    }),

    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 8,
      description:
        'Abstract or description of the Journal Club talk.',
    }),

    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isUpcoming',
      title: 'Is this the upcoming talk?',
      type: 'boolean',
      description:
        'Activate this only for the next Journal Club session. Only one talk should be marked as upcoming.',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      speaker: 'speaker',
      date: 'date',
      isUpcoming: 'isUpcoming',
      media: 'poster',
    },

    prepare({title, speaker, date, isUpcoming, media}) {
      const upcomingLabel = isUpcoming ? '★ UPCOMING · ' : ''

      return {
        title: `${upcomingLabel}${title ?? 'Untitled talk'}`,
        subtitle: `${speaker ?? 'No speaker'}${date ? ` · ${date}` : ''}`,
        media,
      }
    },
  },
})