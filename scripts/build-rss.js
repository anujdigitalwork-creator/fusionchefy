import fs from "fs";

const allData = [
  {
    dish_name: "Vada Pav",
    cuisine: "maharashtra",
    category: "appetizers",
    short_description: "Iconic Mumbai street food",
    img: "/images/maharashtra/appetizers/vada-pav.jpg"
  },
  {
    dish_name: "Butter Chicken",
    cuisine: "indian",
    category: "main-course",
    short_description: "Creamy tomato chicken curry",
    img: "/images/india/main-course/butter-chicken.jpg"
  }
];

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

function generateRss() {
  const items = allData.map((dish) => {
    const slug = slugify(dish.dish_name);

    return `
<item>
<title>${dish.dish_name}</title>
<link>https://fusionchefy.vercel.app/cuisine/${dish.cuisine}/${dish.category}/${slug}</link>
<description>${dish.short_description}</description>
<media:content url="https://fusionchefy.vercel.app${dish.img}" />
</item>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
<title>Fusion Chefy Recipes</title>
<link>https://fusionchefy.vercel.app</link>
<description>RSS Feed</description>
${items}
</channel>
</rss>`;
}

fs.writeFileSync("./public/rss.xml", generateRss());

console.log("RSS generated successfully");
