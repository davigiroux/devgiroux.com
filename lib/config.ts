export const siteConfig = {
  name: "DevGiroux",
  url: "https://devgiroux.com",
  description:
    "Personal blog about web development, programming, and technology.",
  author: {
    name: "DevGiroux",
    twitter: "@devgiroux",
    instagram: "@devgiroux",
    youtube: "@devgiroux",
    github: "devgiroux",
  },
  links: {
    twitter: "https://twitter.com/devgiroux",
    instagram: "https://instagram.com/devgiroux",
    youtube: "https://youtube.com/@devgiroux",
    github: "https://github.com/davigiroux",
  },
  // Giscus configuration - update after setting up your GitHub repo
  giscus: {
    repo: "devgiroux/blog-comments" as `${string}/${string}`,
    repoId: "R_kgDOQxbZL", // Get this from https://giscus.app
    category: "Announcements",
    categoryId: "DIC_kwDOQxbZLc4C0fO3", // Get this from https://giscus.app
  },
};

export type SiteConfig = typeof siteConfig;
