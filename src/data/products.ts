export type ProductStatus =
  | "available-by-request"
  | "in-development"
  | "seasonal-not-current"
  | "planned";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  status: ProductStatus;
  requestable: boolean;
  planned: boolean;
  indicativePackSizes: string[];
  storageSummary?: string;
  image?: ImageMetadata;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  seoTitle?: string;
  seoDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  schemaEnabled: boolean;
}

export const products: Product[] = [
  {
    id: "fresh-goat-milk",
    slug: "/fresh-goat-milk",
    name: "Fresh Goat Milk",
    shortDescription: "Fresh goat milk offered in limited batches and carefully chilled.",
    longDescription: "Fresh goat milk from our small dairy in Kunjirwadi, offered subject to the current farm batch.",
    status: "available-by-request",
    requestable: true,
    planned: false,
    indicativePackSizes: ["500 ml", "1 litre"],
    storageSummary: "Keep refrigerated and follow the storage and use-by guidance supplied with the confirmed batch.",
    image: dairyImage,
    imageAlt: "Glass bottle and glass of milk on a light table",
    imageWidth: 1448,
    imageHeight: 1086,
    seoTitle: "Fresh Goat Milk Near Pune | Hello Honey Bunny",
    seoDescription: "Request fresh goat milk in indicative 500 ml and 1 litre sizes from Hello Honey Bunny in Kunjirwadi, near Pune. Confirm the current batch on WhatsApp.",
    primaryKeyword: "fresh goat milk near Pune",
    secondaryKeywords: ["goat milk in Pune", "fresh goat milk"],
    schemaEnabled: true
  },
  {
    id: "goat-milk-paneer",
    slug: "/goat-milk-paneer",
    name: "Goat Milk Paneer",
    shortDescription: "Paneer made from goat milk and prepared in limited batches.",
    longDescription: "Goat milk paneer from our small dairy in Kunjirwadi, offered subject to the current farm batch.",
    status: "available-by-request",
    requestable: true,
    planned: false,
    indicativePackSizes: ["200 g", "400 g"],
    storageSummary: "Keep refrigerated and follow the storage and use-by guidance supplied with the confirmed batch.",
    image: paneerImage,
    imageAlt: "Dairy products arranged on a light surface",
    imageWidth: 1122,
    imageHeight: 1402,
    seoTitle: "Goat Milk Paneer Near Pune | Hello Honey Bunny",
    seoDescription: "Request goat milk paneer in indicative 200 g and 400 g sizes from Hello Honey Bunny near Pune. Confirm availability and final pricing on WhatsApp.",
    primaryKeyword: "goat milk paneer",
    secondaryKeywords: ["goat paneer", "paneer made from goat milk"],
    schemaEnabled: true
  },
  {
    id: "goat-milk-curd",
    slug: "/products#in-development",
    name: "Goat Milk Curd",
    shortDescription: "Being developed gradually.",
    longDescription: "This product is being developed and cannot currently be requested.",
    status: "in-development",
    requestable: false,
    planned: true,
    indicativePackSizes: [],
    schemaEnabled: false
  },
  {
    id: "goat-cheese",
    slug: "/products#in-development",
    name: "Goat Cheese",
    shortDescription: "An artisanal cheese concept being developed gradually.",
    longDescription: "This product is being developed and cannot currently be requested.",
    status: "in-development",
    requestable: false,
    planned: true,
    indicativePackSizes: [],
    schemaEnabled: false
  }
];

export const requestableProducts = products.filter((product) => product.requestable && !product.planned);
export const plannedProducts = products.filter((product) => product.planned);

export const statusLabels: Record<ProductStatus, string> = {
  "available-by-request": "Subject to current batch availability",
  "in-development": "In development, not currently available",
  "seasonal-not-current": "Not currently available",
  "planned": "Planned, not currently available"
};

export function getProduct(id: string) {
  const product = products.find((item) => item.id === id);
  if (!product) throw new Error(`Unknown product: ${id}`);
  return product;
}
import type { ImageMetadata } from "astro";
import dairyImage from "../assets/images/dairy-still-life.webp";
import paneerImage from "../assets/images/product-collection-cutout.webp";
