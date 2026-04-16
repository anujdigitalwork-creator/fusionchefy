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
} from "../data";

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
  return text.toLowerCase().replace(/\s+/g, "-");
}

export function buildRssString() {
  const items = allData.map((dish) => {
    const slug = slugify(dish.dish_name);

    return `
<item>
<title>${dish.dish_name}</title>
<link>https://fusionchefy.vercel.app/cuisine/${dish.cuisine.toLowerCase()}/${dish.category.toLowerCase()}/${slug}</link>
<description>${dish.short_description || ""}</description>
<media:content url="https://fusionchefy.vercel.app${dish.img}" />
</item>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
<title>Fusion Chefy Recipes</title>
<link>https://fusionchefy.vercel.app</link>
<description>Auto RSS Feed</description>
${items}
</channel>
</rss>`;
}
