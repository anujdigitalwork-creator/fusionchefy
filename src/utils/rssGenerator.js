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

function flattenCuisine(data) {
  let all = [];

  Object.values(data).forEach((category) => {
    if (Array.isArray(category)) {
      all.push(...category);
    }
  });

  return all;
}

export function generateRss() {
  const allData = [
    ...flattenCuisine(indianCuisineData),
    ...flattenCuisine(maharashtraCuisineData),
    ...flattenCuisine(punjabCuisineData),
    ...flattenCuisine(chineseCuisineData),
    ...flattenCuisine(japaneseCuisineData),
    ...flattenCuisine(thaiCuisineData),
    ...flattenCuisine(koreanCuisineData),
    ...flattenCuisine(vietnameseCuisineData),
    ...flattenCuisine(indonesianCuisineData),
  ];

  const items = allData.map((dish) => {
    const slug = dish.dish_name.toLowerCase().replace(/\s+/g, "-");

    return `
<item>
<title>${dish.dish_name}</title>
<link>https://fusionchefy.vercel.app/cuisine/${dish.cuisine.toLowerCase()}/${dish.category.toLowerCase()}/${slug}</link>
<description>${dish.short_description || ""}</description>
<media:content url="https://fusionchefy.vercel.app${dish.img}" medium="image" />
</item>
`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>Fusion Chefy Recipes</title>
<link>https://fusionchefy.vercel.app</link>
<description>Auto-generated global fusion recipe feed</description>
${items}
</channel>
</rss>`;
}
