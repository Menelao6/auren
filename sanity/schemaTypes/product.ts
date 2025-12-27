
export const productSchema = {
  name: 'product',
  title: 'Product',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'priceCents',
      title: 'Price (in cents)',
      type: 'number',
      description: 'Enter price in cents (e.g., 2500 for $25.00)',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'discountPercent',
      title: 'Discount Percent',
      type: 'number',
      description: 'Discount percentage (0-100)',
      initialValue: 0,
      validation: (Rule: any) => Rule.min(0).max(100),
    },
    {
      name: 'outOfStock',
      title: 'Out of Stock',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this product in featured sections',
      initialValue: false,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      price: 'priceCents',
      category: 'category.title',
    },
    prepare(selection: { title: string; media: any; price: number; category: string }) {
      const { title, media, price, category } = selection;
      return {
        title,
        subtitle: `${category || 'No category'} - $${(price / 100).toFixed(2)}`,
        media,
      };
    },
  },
};

export default productSchema;
