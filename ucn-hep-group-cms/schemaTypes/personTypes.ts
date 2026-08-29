import {defineField, defineType} from 'sanity'

export const personType = defineType({
  name: 'person',
  title: 'People',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true,},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'countryCode',
      title: 'Country code',
      type: 'string',
      description: 'Two-letter country code, for example: CO, CL, BR.',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(2)
          .uppercase(),
    }),

    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Professor', value: 'professor'},
          {title: 'Postdoctoral Researcher', value: 'postdoc'},
          {title: 'PhD Student', value: 'phd'},
          {title: 'MSc Student', value: 'msc'},
          {title: 'Undergraduate Student', value: 'undergraduate'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Research interests / description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description:
        'Stored for the Contact page. It does not need to appear on the People page.',
      validation: (Rule) => Rule.email(),
    }),

    defineField({
      name: 'membershipStatus',
      title: 'Membership status',
      type: 'string',
      options: {
        list: [
          {title: 'Current member', value: 'current'},
          {title: 'Former member', value: 'former'},
        ],
        layout: 'radio',
      },
      initialValue: 'current',
      validation: (Rule) => Rule.required(),
    }),

    // ---------------------------------------------------------
    // Former members
    // ---------------------------------------------------------

    defineField({
      name: 'startYear',
      title: 'Start year at UCN / group',
      type: 'number',
      hidden: ({document}) => document?.membershipStatus !== 'former',
      validation: (Rule) => Rule.integer(),
    }),

    defineField({
      name: 'endYear',
      title: 'End year at UCN / group',
      type: 'number',
      hidden: ({document}) => document?.membershipStatus !== 'former',
      validation: (Rule) => Rule.integer(),
    }),

    defineField({
      name: 'currentlyAt',
      title: 'Currently at',
      type: 'string',
      description:
        'Current institution and/or position, for example: University of Valencia — Postdoctoral Researcher.',
      hidden: ({document}) => document?.membershipStatus !== 'former',
    }),

    // ---------------------------------------------------------
    // Group head
    // ---------------------------------------------------------

    defineField({
      name: 'isGroupHead',
      title: 'Group head',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'office',
      title: 'Office',
      type: 'string',
      hidden: ({document}) => document?.isGroupHead !== true,
    }),

    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      hidden: ({document}) => document?.isGroupHead !== true,
    }),

    // ---------------------------------------------------------
    // Website ordering
    // ---------------------------------------------------------

    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      description:
        'Optional. Lower numbers appear first on the website.',
      validation: (Rule) => Rule.integer().min(0),
    }),

      defineField({
    name: 'isJournalClubTeam',
    title: 'Journal Club team',
    type: 'boolean',
    description:
      'Show this current member in the Journal Club Team section.',
    initialValue: false,
  }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'photo',
      role: 'role',
      status: 'membershipStatus',
    },

    prepare({title, media, role, status}) {
      const roles: Record<string, string> = {
        professor: 'Professor',
        postdoc: 'Postdoctoral Researcher',
        phd: 'PhD Student',
        msc: 'MSc Student',
        undergraduate: 'Undergraduate Student',
      }

      return {
        title,
        media,
        subtitle: `${roles[role] ?? role ?? ''} · ${
          status === 'former' ? 'Former member' : 'Current member'
        }`,
      }
    },
  },
})