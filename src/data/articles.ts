export interface ArticleSummary {
  path: string;
  title: string;
  description: string;
  topic: string;
  datePublished: string;
  dateModified: string;
  displayDate: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

export const articles: ArticleSummary[] = [
  {
    path: "/journal/goat-milk-benefits-nutrition",
    title: "Goat Milk Benefits and Nutrition: A Practical Guide",
    description: "A careful guide to goat milk nutrition, lactose, allergy questions and the difference between food information and medical claims.",
    topic: "Nutrition and responsible answers",
    datePublished: "2026-09-27",
    dateModified: "2026-09-27",
    displayDate: "27 September 2026",
    readingTime: "8 minute read",
    image: "/assets/images/editorial/goat-milk-nutrition-guide.webp",
    imageAlt: "Illustration of goat milk, a drinking glass and a goat in a Deccan farm landscape",
    imageWidth: 1448,
    imageHeight: 1086
  },
  {
    path: "/journal/how-to-buy-fresh-goat-milk-pune",
    title: "How to Buy Fresh Goat Milk in Pune: What to Check Before Ordering",
    description: "A practical checklist covering source, batch availability, storage, quantity and delivery before ordering goat milk in Pune.",
    topic: "Buying guide",
    datePublished: "2026-09-27",
    dateModified: "2026-09-27",
    displayDate: "27 September 2026",
    readingTime: "6 minute read",
    image: "/assets/images/editorial/buy-goat-milk-pune.webp",
    imageAlt: "Illustration of fresh milk bottles beginning a local delivery journey towards Pune",
    imageWidth: 1448,
    imageHeight: 1086
  },
  {
    path: "/journal/goat-milk-vs-cow-milk",
    title: "Goat Milk vs Cow Milk: Nutrition, Lactose and Everyday Differences",
    description: "A restrained comparison of nutrition, lactose, protein, taste and cooking without claiming that one milk is universally better.",
    topic: "Food comparison",
    datePublished: "2026-09-27",
    dateModified: "2026-09-27",
    displayDate: "27 September 2026",
    readingTime: "7 minute read",
    image: "/assets/images/editorial/goat-milk-vs-cow-milk.webp",
    imageAlt: "Balanced illustration of two milk vessels with a goat and cow in neighbouring fields",
    imageWidth: 1448,
    imageHeight: 1086
  },
  {
    path: "/journal/how-to-store-fresh-goat-milk",
    title: "How to Store Fresh Goat Milk Safely",
    description: "Practical cold-chain, refrigeration, clean-container and batch-specific storage guidance for fresh goat milk customers.",
    topic: "Storage and handling",
    datePublished: "2026-09-27",
    dateModified: "2026-09-27",
    displayDate: "27 September 2026",
    readingTime: "5 minute read",
    image: "/assets/images/editorial/store-goat-milk-safely.webp",
    imageAlt: "Illustration of an upright milk bottle stored neatly on a refrigerator shelf",
    imageWidth: 1448,
    imageHeight: 1086
  }
];

export function getArticle(path: string) {
  const article = articles.find((item) => item.path === path);
  if (!article) throw new Error(`Unknown article: ${path}`);
  return article;
}
