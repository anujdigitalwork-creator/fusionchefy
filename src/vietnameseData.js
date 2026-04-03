// ─────────────────────────────────────────────────────────────────────────────
// Vietnamese Cuisine Data - Fusion Chefy
// ─────────────────────────────────────────────────────────────────────────────

const vietnameseCuisineData = [
  // ── APPETIZERS ──────────────────────────────────────────────────────────────
  {
    dish_name: "Goi Cuon (Fresh Spring Rolls)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 30,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Vietnamese fresh spring rolls of translucent rice paper filled with shrimp, pork, rice vermicelli and fresh herbs — eaten uncooked and dipped in hoisin-peanut sauce. Light, fresh and beautiful.",
    ingredients: [
      { name: "Rice paper rounds", quantity: "12", unit: "pieces" },
      { name: "Cooked shrimp", quantity: "200", unit: "g" },
      { name: "Pork belly, cooked and sliced", quantity: "150", unit: "g" },
      { name: "Rice vermicelli", quantity: "100", unit: "g" },
      { name: "Lettuce leaves", quantity: "4", unit: "pieces" },
      { name: "Fresh mint, Thai basil, coriander", quantity: "1", unit: "large bunch" },
      { name: "Hoisin sauce", quantity: "4", unit: "tbsp" },
      { name: "Crushed peanuts", quantity: "3", unit: "tbsp" }
    ],
    preparation_steps: [
      "Cook vermicelli per packet, rinse in cold water and drain.",
      "Prepare all fillings in separate bowls for assembly line.",
      "Dip one rice paper in warm water for 10-15 seconds until pliable.",
      "Place shrimp halves (pink side down), pork, noodles, lettuce and herbs in lower third. Roll and fold edges like a burrito.",
      "Serve immediately with hoisin sauce thinned with water and topped with crushed peanuts."
    ],
    chef_notes: "Work quickly when rolling — the rice paper softens as it rests. Slightly under-soaking produces easier rolling; over-soaked paper tears easily. The shrimp should be visible through the wrapper for the classic appearance.",
    serving_suggestions: "Serve fresh with hoisin-peanut dipping sauce and nuoc cham.",
    flavor_profile: ["fresh", "clean", "herby", "light"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1582878826629-33b7f57b2a3c?w=400&q=80",
    tags: ["Fresh", "Healthy", "Street Food", "Classic"]
  },
  {
    dish_name: "Banh Xeo (Sizzling Crepes)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Vietnam's sizzling savory rice crepes — crispy, lacy, turmeric-yellow rice flour pancakes filled with shrimp, pork and bean sprouts, eaten wrapped in lettuce and mustard greens with nuoc cham.",
    ingredients: [
      { name: "Rice flour", quantity: "200", unit: "g" },
      { name: "Coconut milk", quantity: "200", unit: "ml" },
      { name: "Turmeric powder", quantity: "1", unit: "tsp" },
      { name: "Shrimp, peeled", quantity: "200", unit: "g" },
      { name: "Pork belly, sliced", quantity: "150", unit: "g" },
      { name: "Bean sprouts", quantity: "200", unit: "g" },
      { name: "Spring onions", quantity: "3", unit: "stalks" },
      { name: "Fish sauce, lime, sugar", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Make batter: rice flour with coconut milk, turmeric, water and a pinch of salt.",
      "Fry pork belly in a hot pan until golden. Add shrimp.",
      "Push to one side, pour in a thin layer of batter. Swirl to cover pan.",
      "Cover and cook on high heat until crepe is crispy and lifts from pan.",
      "Add bean sprouts, fold in half. Serve with nuoc cham and fresh herbs for wrapping."
    ],
    chef_notes: "The name means 'sizzling cake' — the batter should hit a very hot, well-oiled pan and sizzle dramatically. This is what creates the characteristic lacy, crispy edges.",
    serving_suggestions: "Wrap pieces in mustard greens or lettuce with herbs. Dip in nuoc cham.",
    flavor_profile: ["crispy", "savory", "aromatic", "fresh"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
    tags: ["Street Food", "Crispy", "Southern Vietnam", "Sharing"]
  },
  {
    dish_name: "Chả Giò (Fried Spring Rolls)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 40,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Southern Vietnamese fried spring rolls — delicate, crunchy rice paper rolls filled with pork, crab meat, glass noodles and wood ear mushrooms. Wrapped in lettuce and herbs and dipped in nuoc cham.",
    ingredients: [
      { name: "Rice paper rounds", quantity: "12", unit: "pieces" },
      { name: "Ground pork", quantity: "200", unit: "g" },
      { name: "Crab meat", quantity: "100", unit: "g" },
      { name: "Glass noodles, soaked", quantity: "50", unit: "g" },
      { name: "Wood ear mushrooms", quantity: "30", unit: "g" },
      { name: "Shallots, minced", quantity: "3", unit: "pieces" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" },
      { name: "Oil for frying", quantity: "2", unit: "cups" }
    ],
    preparation_steps: [
      "Mix pork, crab, glass noodles, mushrooms, shallots and fish sauce.",
      "Soften rice paper rounds briefly in water — just 3-4 seconds.",
      "Add filling and roll tightly. The rice paper will firm up as it dries.",
      "Deep fry in batches at 160°C — low temperature first to crisp slowly.",
      "Drain and serve wrapped in lettuce with fresh herbs and nuoc cham."
    ],
    chef_notes: "The secret to shatteringly crispy chả giò is double-frying: once at low temp to cook through, then again at high temp just before serving for maximum crunch.",
    serving_suggestions: "Wrap in perilla or lettuce leaves with cucumber and mint. Dip in nuoc cham.",
    flavor_profile: ["crispy", "savory", "herbaceous", "light"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&q=80",
    tags: ["Fried", "Street Food", "Southern Vietnam", "Crispy"]
  },

  // ── SOUPS ────────────────────────────────────────────────────────────────────
  {
    dish_name: "Pho Bo (Beef Noodle Soup)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Soups",
    difficulty_level: "hard",
    prep_time_minutes: 60,
    cook_time_minutes: 360,
    servings: 4,
    short_description: "Vietnam's national dish and one of the world's greatest soups — a crystalline, deeply complex beef bone broth perfumed with charred ginger, charred onion and warming spices, served with rice noodles and paper-thin raw beef.",
    ingredients: [
      { name: "Beef bones (marrow and knuckle)", quantity: "2", unit: "kg" },
      { name: "Beef brisket", quantity: "400", unit: "g" },
      { name: "Fresh rice noodles (pho noodles)", quantity: "400", unit: "g" },
      { name: "Onion", quantity: "1", unit: "large" },
      { name: "Ginger", quantity: "3", unit: "inch" },
      { name: "Star anise, cloves, cinnamon, cardamom", quantity: "1", unit: "portion" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Rock sugar", quantity: "1", unit: "tbsp" }
    ],
    preparation_steps: [
      "Blanch bones in boiling water 10 minutes. Drain and scrub clean.",
      "Char onion and ginger directly over open flame until blackened. This creates the signature smoky sweetness.",
      "Simmer bones 6+ hours, skimming regularly. The broth should be clear, not cloudy.",
      "Toast spices and add to broth last hour. Season with fish sauce and rock sugar.",
      "Serve over noodles with paper-thin raw beef slices that cook in the hot broth."
    ],
    chef_notes: "Charring the onion and ginger is the defining step that separates great pho from ordinary beef soup. The broth must be clear — regular gentle simmering, constant skimming.",
    serving_suggestions: "Serve with a plate of bean sprouts, lime, fresh chilies, basil and hoisin and sriracha.",
    flavor_profile: ["complex", "aromatic", "clean", "warming", "umami"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1582878826629-33b7f57b2a3c?w=400&q=80",
    tags: ["National Dish", "Slow Cooked", "Iconic", "Clear Broth"]
  },
  {
    dish_name: "Bun Bo Hue (Spicy Beef Noodle Soup)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Soups",
    difficulty_level: "hard",
    prep_time_minutes: 45,
    cook_time_minutes: 180,
    servings: 4,
    short_description: "The spicy, lemongrass-scented broth from Hue, Vietnam's former imperial capital — bolder and more complex than pho, with round rice noodles, pork hock, sliced beef and a fiery shrimp paste flavor.",
    ingredients: [
      { name: "Pork hock and beef shank", quantity: "800", unit: "g" },
      { name: "Round rice noodles (bun)", quantity: "400", unit: "g" },
      { name: "Lemongrass", quantity: "4", unit: "stalks" },
      { name: "Shrimp paste (mam ruoc)", quantity: "2", unit: "tbsp" },
      { name: "Annatto oil or chili oil", quantity: "3", unit: "tbsp" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Pork blood cubes (optional)", quantity: "150", unit: "g" },
      { name: "Bean sprouts, lemon, fresh herbs", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Blanch pork hock and beef. Simmer in water with lemongrass 2-3 hours.",
      "Fry shrimp paste in annatto oil until fragrant.",
      "Add to broth with additional lemongrass, fish sauce and sugar.",
      "The broth should be rich red-orange from annatto and deeply flavored.",
      "Serve over thick round noodles with sliced meat, herbs and lime."
    ],
    chef_notes: "Mam ruoc (shrimp paste) is the ingredient that makes Bun Bo Hue distinctly different from Pho — it adds a pungent, oceanic depth that is characteristic of Central Vietnamese cooking.",
    serving_suggestions: "Serve with banana blossom, bean sprouts, fresh lemon and herbs.",
    flavor_profile: ["spicy", "lemongrass", "funky", "bold", "aromatic"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    tags: ["Hue", "Spicy", "Lemongrass", "Central Vietnam"]
  },

  // ── SALADS ───────────────────────────────────────────────────────────────────
  {
    dish_name: "Goi Ga (Vietnamese Chicken Salad)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 25,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "A refreshing Vietnamese salad of shredded poached chicken with cabbage, herbs and a punchy, zingy nuoc cham dressing — bright, fresh and deeply aromatic with the anise notes of Vietnamese coriander.",
    ingredients: [
      { name: "Chicken breast", quantity: "400", unit: "g" },
      { name: "White cabbage, shredded", quantity: "300", unit: "g" },
      { name: "Carrots, julienned", quantity: "100", unit: "g" },
      { name: "Vietnamese coriander (rau ram)", quantity: "1", unit: "bunch" },
      { name: "Mint leaves", quantity: "1", unit: "bunch" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Lime juice", quantity: "4", unit: "tbsp" },
      { name: "Crushed peanuts and crispy shallots", quantity: "4", unit: "tbsp" }
    ],
    preparation_steps: [
      "Poach chicken in salted water with ginger and lemongrass 15 minutes. Cool and shred finely.",
      "Massage cabbage with a pinch of salt, let rest 5 minutes, then squeeze dry.",
      "Make dressing: fish sauce, lime juice, sugar, garlic and chili.",
      "Toss chicken, cabbage, carrots and herbs with dressing.",
      "Top with crushed peanuts and crispy fried shallots."
    ],
    chef_notes: "Vietnamese coriander (rau ram) has a distinctive peppery, slightly citrusy flavor that sets this salad apart — if unavailable, use a combination of mint and regular coriander.",
    serving_suggestions: "Serve as a light main course or starter with rice crackers.",
    flavor_profile: ["fresh", "tangy", "herby", "crunchy"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80",
    tags: ["Healthy", "Light", "Poached", "Refreshing"]
  },
  {
    dish_name: "Goi Du Du (Green Papaya Salad, Vietnamese Style)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "Vietnam's version of green papaya salad — lighter and more herby than its Thai cousin, dressed with fish sauce, lime, chili and garlic, topped with Vietnamese coriander, dried shrimp and roasted peanuts.",
    ingredients: [
      { name: "Green papaya", quantity: "400", unit: "g" },
      { name: "Dried shrimp", quantity: "2", unit: "tbsp" },
      { name: "Garlic", quantity: "3", unit: "cloves" },
      { name: "Bird's eye chili", quantity: "2", unit: "pieces" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" },
      { name: "Lime juice", quantity: "3", unit: "tbsp" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Roasted peanuts and Vietnamese herbs", quantity: "4", unit: "tbsp" }
    ],
    preparation_steps: [
      "Peel and julienne green papaya.",
      "Pound garlic and chili in a mortar.",
      "Make dressing with pounded aromatics, fish sauce, lime and sugar.",
      "Toss papaya with dressing and dried shrimp.",
      "Garnish with roasted peanuts, Vietnamese coriander and crispy shallots."
    ],
    chef_notes: "The Vietnamese version is less pounded and more tossed than the Thai version — the papaya should retain its crunch rather than becoming bruised and soft.",
    serving_suggestions: "Serve as a refreshing side salad or light starter.",
    flavor_profile: ["fresh", "crunchy", "tangy", "herby"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80",
    tags: ["Fresh", "Healthy", "Street Food", "Summer"]
  },

  // ── MAIN COURSES ─────────────────────────────────────────────────────────────
  {
    dish_name: "Banh Mi Sandwich",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Main Courses",
    difficulty_level: "easy",
    prep_time_minutes: 30,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "A perfect fusion of French and Vietnamese culinary traditions — a crispy baguette filled with char-siu pork, Vietnamese cold cuts, pickled daikon and carrots, cucumber, coriander and a smear of liver pâté.",
    ingredients: [
      { name: "Vietnamese baguettes", quantity: "4", unit: "pieces" },
      { name: "Char siu or cold cut pork", quantity: "300", unit: "g" },
      { name: "Pork liver pâté", quantity: "4", unit: "tbsp" },
      { name: "Daikon, julienned", quantity: "150", unit: "g" },
      { name: "Carrots, julienned", quantity: "100", unit: "g" },
      { name: "Rice vinegar and sugar for pickling", quantity: "1", unit: "portion" },
      { name: "Fresh cucumber, coriander, jalapeño", quantity: "1", unit: "portion" },
      { name: "Maggi sauce or soy sauce", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Quick-pickle daikon and carrots in rice vinegar, sugar and salt for 20 minutes minimum.",
      "Toast baguette until crackling crispy on outside.",
      "Spread pâté on one side, mayonnaise on the other.",
      "Layer pork cold cuts, pickled vegetables, cucumber slices and fresh coriander.",
      "Add jalapeño slices and a splash of Maggi sauce. Eat immediately."
    ],
    chef_notes: "The Vietnamese baguette (banh mi) is lighter and crispier than French baguettes due to the combination of rice flour and wheat flour. The contrast of hot, crispy bread with cold, crunchy pickled vegetables is essential.",
    serving_suggestions: "Eat immediately while the bread is crispy. The best banh mi is consumed within 5 minutes of assembly.",
    flavor_profile: ["complex", "fresh", "crunchy", "savory-acidic", "layered"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    tags: ["Street Food", "Fusion", "UNESCO Heritage", "Quick"]
  },
  {
    dish_name: "Bo Luc Lac (Shaking Beef)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Tender, cubed beef filet seared at extremely high heat with garlic, oyster sauce and soy, served over watercress and red onion salad — the 'shaking' refers to the technique of tossing the wok vigorously during cooking.",
    ingredients: [
      { name: "Beef filet or sirloin", quantity: "500", unit: "g" },
      { name: "Garlic", quantity: "6", unit: "cloves" },
      { name: "Oyster sauce", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Watercress", quantity: "200", unit: "g" },
      { name: "Red onion", quantity: "1", unit: "medium" },
      { name: "Lime and black pepper", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Cut beef into 3cm cubes. Marinate in soy sauce, oyster sauce, sugar and garlic 30 minutes.",
      "Get wok scorching hot. Add beef in a single layer without crowding.",
      "Shake the wok vigorously while cooking for 2 minutes until edges sear and caramelize.",
      "Add minced garlic at the last minute and toss.",
      "Serve immediately over watercress and red onion salad with a lime and black pepper dressing."
    ],
    chef_notes: "The 'shaking' technique — vigorously tossing the wok — ensures even caramelization on all sides. The beef should be medium-rare in the center with deeply caramelized, crusty exterior.",
    serving_suggestions: "Serve over watercress salad with a lime-salt-pepper dipping sauce.",
    flavor_profile: ["caramelized", "garlicky", "savory", "tender"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    tags: ["Wok", "Premium", "Special Occasion", "High Heat"]
  },
  {
    dish_name: "Ca Kho To (Caramelized Fish in Claypot)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 15,
    cook_time_minutes: 45,
    servings: 4,
    short_description: "Fatty fish fillets slowly braised in a clay pot in a deeply caramelized coconut water and fish sauce reduction — a southern Vietnamese comfort food with intense sweet, salty and smoky flavors that perfume the entire kitchen.",
    ingredients: [
      { name: "Catfish or salmon steaks", quantity: "600", unit: "g" },
      { name: "Coconut water", quantity: "300", unit: "ml" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Sugar", quantity: "3", unit: "tbsp" },
      { name: "Garlic", quantity: "4", unit: "cloves" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Chili", quantity: "2", unit: "pieces" },
      { name: "Caramel sauce (from 2 tbsp sugar)", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Make dry caramel by cooking sugar until amber. Add fish sauce carefully — it will sizzle.",
      "Add coconut water, garlic and ginger.",
      "Add fish pieces. Braise over medium heat, turning occasionally.",
      "Cook 40-45 minutes until sauce reduces to a thick, glossy glaze.",
      "Serve directly in clay pot with steamed white rice."
    ],
    chef_notes: "The patience in this dish pays off — the slow reduction creates an intensely flavored, sticky glaze that coats the fish. Don't rush it. The combination of caramel bitterness and fish sauce creates an irreplaceable flavor.",
    serving_suggestions: "Serve in the clay pot over steamed white rice with a simple vegetable soup.",
    flavor_profile: ["caramelized", "sweet-salty", "rich", "warming"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80",
    tags: ["Southern Vietnam", "Comfort Food", "Clay Pot", "Traditional"]
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    dish_name: "Che Ba Mau (Three Color Dessert)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Desserts",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 6,
    short_description: "Vietnam's most vibrant and fun dessert — three distinct layers of sweet beans and jelly in a glass, topped with coconut cream and crushed ice. Each color represents a different ingredient and flavor.",
    ingredients: [
      { name: "Cooked red beans", quantity: "100", unit: "g" },
      { name: "Mung bean paste, cooked", quantity: "100", unit: "g" },
      { name: "Pandan jelly, cubed", quantity: "100", unit: "g" },
      { name: "Coconut cream", quantity: "200", unit: "ml" },
      { name: "Sugar syrup", quantity: "4", unit: "tbsp" },
      { name: "Crushed ice", quantity: "2", unit: "cups" },
      { name: "Salt", quantity: "0.5", unit: "tsp" }
    ],
    preparation_steps: [
      "Cook red beans and mung beans with sugar syrup separately until tender.",
      "Make pandan jelly with pandan extract and agar.",
      "Season coconut cream with a pinch of salt (this enhances sweetness).",
      "Layer in glasses: red beans at bottom, green pandan jelly, then yellow mung bean.",
      "Top with crushed ice and pour coconut cream over everything. Serve immediately."
    ],
    chef_notes: "The pinch of salt in the coconut cream is the Vietnamese trick that makes the sweetness more prominent — don't skip it. Serve immediately or the ice melts and layers mix.",
    serving_suggestions: "Serve as a refreshing summer dessert or afternoon sweet snack.",
    flavor_profile: ["sweet", "creamy", "refreshing", "tropical"],
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
    tags: ["Colorful", "Street Dessert", "Summer", "Traditional"]
  },
  {
    dish_name: "Banh Flan (Vietnamese Crème Caramel)",
    cuisine: "Vietnamese",
    country_of_origin: "Vietnam",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 40,
    servings: 6,
    short_description: "A Vietnamese-French fusion dessert — silky, dense crème caramel with a uniquely richer egg yolk ratio, often served with a splash of strong iced Vietnamese coffee poured over it. The French colonial influence at its most delicious.",
    ingredients: [
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Egg yolks", quantity: "4", unit: "pieces" },
      { name: "Condensed milk", quantity: "200", unit: "ml" },
      { name: "Fresh milk", quantity: "300", unit: "ml" },
      { name: "Sugar", quantity: "100", unit: "g" },
      { name: "Water", quantity: "30", unit: "ml" },
      { name: "Strong Vietnamese coffee (optional)", quantity: "4", unit: "tbsp" },
      { name: "Vanilla extract", quantity: "1", unit: "tsp" }
    ],
    preparation_steps: [
      "Make dark caramel with sugar and water. Pour into individual ramekins.",
      "Mix eggs, egg yolks, condensed milk, fresh milk and vanilla.",
      "Strain through a fine sieve for extreme smoothness.",
      "Pour over set caramel in ramekins.",
      "Steam in a bain-marie at 160°C for 35-40 minutes. Chill and invert."
    ],
    chef_notes: "The combination of condensed milk and fresh milk (no heavy cream) gives Vietnamese banh flan its characteristic denser, more eggy texture compared to French crème caramel. Serving it with strong iced coffee poured over is the modern Saigon way.",
    serving_suggestions: "Serve chilled with a drizzle of dark Vietnamese iced coffee.",
    flavor_profile: ["sweet", "caramel", "silky", "eggy"],
    dietary_tags: ["vegetarian", "gluten-free"],
    img: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80",
  },
];

export { vietnameseCuisineData };
