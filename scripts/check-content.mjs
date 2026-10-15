import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

const checks = [
  [/(^|\W)Pure(\W|$)/iu, "restricted term: Pure"], [/Pure\s*&\s*Exotic/iu, "retired strapline"], [/Est\.\s*2026/iu, "unsupported establishment year"], [/(^|\W)Organic(\W|$)/iu, "restricted term: Organic"], [/Raw goat milk/iu, "restricted processing claim"], [/(^|\W)A2(\W|$)/u, "restricted A2 claim"], [/FSSAI-approved/iu, "restricted approval claim"], [/Antibiotic-free|Hormone-free|Preservative-free/iu, "restricted production claim"], [/Lactose-free|Easy to digest|Boosts immunity/iu, "restricted health claim"], [/InStock/iu, "invented availability schema"], [/Guaranteed fresh|Completely safe/iu, "restricted guarantee"], [/—/u, "em dash character"]
];
const extensions = /\.(astro|html|js|mjs|ts|css|json|xml|txt|svg)$/i;
async function filesAt(path) { const info = await stat(path); if (info.isFile()) return [path]; const entries = await readdir(path); return (await Promise.all(entries.filter((name) => name !== "node_modules").map((name) => filesAt(resolve(path, name))))).flat(); }
const paths = process.argv.slice(2); const files = (await Promise.all(paths.map((path) => filesAt(resolve(path))))).flat().filter((path) => extensions.test(path)); const failures = [];
for (const file of files) { const content = await readFile(file, "utf8"); for (const [pattern, label] of checks) if (pattern.test(content)) failures.push(`${file}: ${label}`); }
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`Content safety check passed across ${files.length} files.`);
