import type { APIRoute } from "astro";
import { site } from "../config/site";
const routes = ["/", "/fresh-goat-milk", "/goat-milk-paneer", "/products", "/request-a-batch", "/our-farm", "/for-chefs-and-retailers", "/faqs", "/contact", "/privacy"];
export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${site.url}${route}</loc></url>`).join("")}</urlset>`, { headers: { "Content-Type": "application/xml" } });
