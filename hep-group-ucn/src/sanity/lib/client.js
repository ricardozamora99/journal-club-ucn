import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "cu620ne1",
  dataset: "production",
  apiVersion: "2026-08-09",
  useCdn: true,
});


// projectId  → your UCN HEP Sanity project
// dataset    → production
// apiVersion → fixes the API behavior to a date
// useCdn     → optimized published-content reads