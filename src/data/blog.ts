import posts from "./blog.json";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  html: string;
};

/** Newest first. Addresses match the old site: /blogs/news/<slug>. */
export const blogPosts: BlogPost[] = (posts as BlogPost[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export const fmtDate = (d: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-MY", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
