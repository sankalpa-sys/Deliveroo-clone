export default {
  name: 'featured',
  title: 'Featured menu categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Featured category name',
      type: 'string',
    },
    {
      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: (Rule) => Rule.max(200)
    },
    {
      name: 'restaurants',
      title: 'Restaurants',
      type: 'array',
      of: [{type: "reference",to:[{type: "restaurant"}]}]
    },

  ],

}