export default {
  name: 'category',
  title: 'Menu category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'category name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image of category',
      type: 'image',
    },
  ],
}

