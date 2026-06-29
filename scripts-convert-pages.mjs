import { readFile, writeFile } from "node:fs/promises";

const pages = {
  index: { active: "", path: "/", image: "/assets/images/editorial/farm-morning.webp", preload: "/assets/images/editorial/farm-morning.webp" },
  about: { active: "about", path: "/about.html", image: "/assets/images/editorial/goat-portrait.webp" },
  products: { active: "products", path: "/products.html", image: "/assets/images/editorial/dairy-still-life.webp" },
  shop: { active: "shop", path: "/shop.html", image: "/assets/images/editorial/dairy-still-life.webp" },
  gallery: { active: "gallery", path: "/gallery.html", image: "/assets/images/editorial/farm-morning.webp" },
  faq: { active: "faq", path: "/faq.html", image: "/assets/images/editorial/farm-morning.webp" },
  contact: { active: "contact", path: "/contact.html", image: "/assets/images/editorial/goat-portrait.webp" }
};

for (const [name, config] of Object.entries(pages)) {
  const html = await readFile(`${name}.html`, "utf8");
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1].replaceAll("&amp;", "&") ?? "";
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "";
  const schemaText = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)?.[1];
  let main = html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1].trim() ?? "";
  main = main
    .replaceAll('src="assets/', 'src="/assets/')
    .replace(/href="(about|products|shop|gallery|faq|contact|index)\.html/g, 'href="/$1.html');

  const schemaDeclaration = schemaText ? `\nconst schema = ${schemaText};\n` : "\n";
  const schemaProp = schemaText ? "\n  schema={schema}" : "";
  const preloadProp = config.preload ? `\n  preloadImage="${config.preload}"` : "";
  const source = `---\nimport BaseLayout from "../layouts/BaseLayout.astro";\n${schemaDeclaration}---\n\n<BaseLayout\n  title=${JSON.stringify(title)}\n  description=${JSON.stringify(description)}\n  canonicalPath="${config.path}"\n  activePage="${config.active}"\n  image="${config.image}"${preloadProp}${schemaProp}\n>\n  <main id="main">\n${main}\n  </main>\n</BaseLayout>\n`;
  await writeFile(`src/pages/${name}.astro`, source);
}
