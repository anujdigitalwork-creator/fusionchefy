import fs from "fs";
import path from "path";

import {
  indianCuisineData,
  maharashtraCuisineData,
  punjabCuisineData,
  chineseCuisineData,
  japaneseCuisineData,
  thaiCuisineData,
  koreanCuisineData,
  vietnameseCuisineData,
  indonesianCuisineData
} from "../data/index.js";

const SITE_URL = "https://fusionchefy.vercel.app";

const allData = [
  ...indianCuisineData,
  ...maharashtraCuisineData,
  ...punjabCuisineData,
  ...chineseCuisineData,
  ...japaneseCuisineData,
  ...thaiCuisineData,
  ...koreanCuisineData,
  ...vietnameseCuisineData,
  ...indonesianCuisineData,
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

function generateRss() {
  const items = allData.map((dish) => {
    const slug = slugify(dish.dish_name);

    return `
<item>
<title>${dish.dish_name}</title>
<link>${SITE_URL}/cuisine/${dish.cuisine.toLowerCase()}/${dish.category.toLowerCase()}/${slug}</link>
<description>${dish.short_description || ""}</description>
<media:content url="${SITE_URL}${dish.img}" medium="image" />
</item>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>Fusion Chefy Recipes</title>
<link>${SITE_URL}</link>
<description>Auto-generated Fusion Recipe Feed</description>
${items}
</channel>
</rss>`;
}

const outputPath = path.resolve("public/rss.xml");

fs.writeFileSync(outputPath, generateRss());

console.log("RSS generated successfully from all recipes");
