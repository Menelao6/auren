// GROQ queries for Sanity

export const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  description,
  images,
  priceCents,
  discountPercent,
  outOfStock,
  featured,
  "categoryData": category->{ _id, title, slug }
}`;

export const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && category->slug.current == $category] | order(_createdAt desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  description,
  images,
  priceCents,
  discountPercent,
  outOfStock,
  featured,
  "categoryData": category->{ _id, title, slug }
}`;

export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && featured == true][0...8] | order(_createdAt desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  description,
  images,
  priceCents,
  discountPercent,
  outOfStock,
  featured,
  "categoryData": category->{ _id, title, slug }
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  description,
  images,
  priceCents,
  discountPercent,
  outOfStock,
  featured,
  "categoryData": category->{ _id, title, slug }
}`;

export const PRODUCTS_BY_IDS_QUERY = `*[_type == "product" && _id in $ids] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  description,
  images,
  priceCents,
  discountPercent,
  outOfStock,
  featured,
  "categoryData": category->{ _id, title, slug }
}`;

export const CATEGORIES_QUERY = `*[_type == "category"] | order(sortOrder asc) {
  _id,
  _type,
  _createdAt,
  title,
  slug,
  sortOrder
}`;
