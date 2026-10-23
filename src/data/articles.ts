export interface ArticleSummary {
  path: string;
  title: string;
  seoTitle?: string;
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
    path: "/journal/goat-milk-near-me-pune",
    title: "Looking for Goat Milk Near You in Pune? Here's Where to Start",
    seoTitle: "Goat Milk Near Me in Pune | Check Local Delivery",
    description: "Searching for goat milk near you in Pune? See areas where Hello Honey Bunny considers fresh goat milk delivery, and how to check availability and pricing.",
    topic: "Local delivery guide",
    datePublished: "2026-10-23",
    dateModified: "2026-10-23",
    displayDate: "23 October 2026",
    readingTime: "7 minute read",
    image: "/assets/images/editorial/pune-delivery-landscape.webp",
    imageAlt: "Illustrated fresh goat milk delivery route connecting Kunjirwadi with Pune neighbourhoods",
    imageWidth: 1672,
    imageHeight: 941
  },
  {
    path: "/journal/why-goat-milk-availability-varies-pune",
    title: "Why Fresh Goat Milk Isn't Always Available in Pune",
    seoTitle: "Fresh Goat Milk Availability in Pune | Hello Honey Bunny",
    description: "Looking for fresh goat milk in Pune? Learn why availability changes, how to check current batches and how delivery requests work around Pune and PCMC.",
    topic: "Batch availability",
    datePublished: "2026-10-23",
    dateModified: "2026-10-23",
    displayDate: "23 October 2026",
    readingTime: "6 minute read",
    image: "/assets/images/editorial/dairy-still-life.webp",
    imageAlt: "Fresh goat milk arranged in a warm small-batch dairy still life",
    imageWidth: 1448,
    imageHeight: 1086
  },
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
