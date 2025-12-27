import { createClient } from '@sanity/client';


export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "auren1",
  useCdn: true,
});


export interface SanityImageSource {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export function urlFor(source: SanityImageSource): string {
  if (!source?.asset?._ref) return "/placeholder.svg";

  const ref = source.asset._ref;
  const [, id, dimensions, format] = ref.split("-");

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "auren1";

  if (!projectId) return "/placeholder.svg";

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}