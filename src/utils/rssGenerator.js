import { japaneseCuisineData } from "../data/japaneseCuisineData";
import { thaiCuisineData } from "../data/thaiCuisineData";
import { koreanCuisineData } from "../data/koreanCuisineData";
import { vietnameseCuisineData } from "../data/vietnameseCuisineData";

const allData = [
  ...japaneseCuisineData,
  ...thaiCuisineData,
  ...koreanCuisineData,
  ...vietnameseCuisineData,
];

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

export function generateRss() {
  let items = "";

  allData.forEach((dish) => {
    const slug = slugify(dish.dish_name);
    const imageUrl = `https://fusionchefy.vercel.app${dish.img}`;

    items += `
<item>
<title>${dish.dish_name}</title>
<link>https://fusionchefy.vercel.app/cuisine/${dish.cuisine.toLowerCase()}/${dish.category.toLowerCase()}/${slug}</link>
<description>${dish.short_description}</description>
<media:content url="${imageUrl}" medium="image" />
</item>
    `;
  });

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>Fusion Chefy Recipes</title>
<link>https://fusionchefy.vercel.app</link>
<description>Latest recipes from Fusion Chefy</description>
${items}
</channel>
</rss>`;
}
