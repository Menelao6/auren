
export const categorySchema = {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Order in which categories appear (lower numbers first)',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      sortOrder: 'sortOrder',
    },
    prepare(selection: { title: string; sortOrder: number }) {
      const { title, sortOrder } = selection;
      return {
        title,
        subtitle: `Sort order: ${sortOrder || 0}`,
      };
    },
  },
};

export default categorySchema;
