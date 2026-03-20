// ─── ASIAN CUISINE DATA ───────────────────────────────────────────────────────
// Chinese, Japanese, Thai, Korean, Vietnamese
// Categories: Appetizers, Salads, Soups, Main Courses, Desserts
// ─────────────────────────────────────────────────────────────────────────────

export const chineseCuisineData = [
  // ── APPETIZERS ──────────────────────────────────────────────────────────────
  {
    dish_name: "Pork & Ginger Dumplings (Jiaozi)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 45,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Hand-folded dumplings filled with seasoned pork and ginger, steamed or pan-fried until golden. A Chinese New Year staple and everyday comfort food across northern China.",
    ingredients: [
      { name: "Ground pork", quantity: "300", unit: "g" },
      { name: "Dumpling wrappers", quantity: "30", unit: "pieces" },
      { name: "Napa cabbage", quantity: "200", unit: "g" },
      { name: "Fresh ginger", quantity: "2", unit: "inch" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Spring onions", quantity: "3", unit: "stalks" },
      { name: "Garlic", quantity: "3", unit: "cloves" }
    ],
    preparation_steps: [
      "Salt the napa cabbage and let stand 10 minutes. Squeeze out all moisture.",
      "Mix ground pork with cabbage, ginger, garlic, soy sauce, sesame oil and spring onions.",
      "Place 1 tsp filling on each wrapper, moisten edges with water and pleat to seal.",
      "Pan-fry in oil until golden on the bottom, then add water and cover to steam 8 minutes.",
      "Serve with black vinegar and chili oil dipping sauce."
    ],
    chef_notes: "The pleating technique is the mark of a skilled dumpling maker — aim for at least 7 pleats per dumpling. The key is squeezing every drop of moisture from the cabbage.",
    serving_suggestions: "Serve with Chinkiang black vinegar, soy sauce, julienned ginger and chili oil.",
    flavor_profile: ["savory", "umami", "gingery", "crispy"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
    tags: ["Street Food", "New Year", "Northern China", "Comfort Food"]
  },
  {
    dish_name: "Crispy Spring Rolls",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Golden, shatteringly crisp rolls filled with seasoned pork, cabbage and glass noodles — a dim sum classic found in teahouses across China.",
    ingredients: [
      { name: "Spring roll wrappers", quantity: "12", unit: "pieces" },
      { name: "Ground pork", quantity: "200", unit: "g" },
      { name: "Cabbage, shredded", quantity: "150", unit: "g" },
      { name: "Carrots, julienned", quantity: "100", unit: "g" },
      { name: "Glass noodles, soaked", quantity: "50", unit: "g" },
      { name: "Oyster sauce", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" },
      { name: "Oil for frying", quantity: "2", unit: "cups" }
    ],
    preparation_steps: [
      "Stir-fry pork in a hot wok, then add vegetables and cook until wilted.",
      "Add glass noodles, oyster sauce and soy sauce. Cool filling completely.",
      "Place filling on wrapper, fold sides in and roll tightly. Seal edge with flour paste.",
      "Deep fry at 175°C for 4-5 minutes until deep golden and crispy.",
      "Drain on paper and serve immediately with sweet chili sauce."
    ],
    chef_notes: "The filling MUST be completely cooled before wrapping — hot filling creates steam that bursts the wrapper during frying. Roll tightly with no air pockets.",
    serving_suggestions: "Serve with sweet chili dipping sauce and a squeeze of lemon.",
    flavor_profile: ["crispy", "savory", "umami"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&q=80",
    tags: ["Dim Sum", "Fried", "Party Food", "Classic"]
  },
  {
    dish_name: "Char Siu Bao (BBQ Pork Buns)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Appetizers",
    difficulty_level: "hard",
    prep_time_minutes: 90,
    cook_time_minutes: 20,
    servings: 6,
    short_description: "Pillowy steamed buns filled with sticky, caramelized BBQ pork — the undisputed king of dim sum. The iconic white bun with its characteristic split top is a hallmark of Cantonese teahouses.",
    ingredients: [
      { name: "All-purpose flour", quantity: "300", unit: "g" },
      { name: "Pork shoulder, diced", quantity: "400", unit: "g" },
      { name: "Hoisin sauce", quantity: "3", unit: "tbsp" },
      { name: "Oyster sauce", quantity: "2", unit: "tbsp" },
      { name: "Five spice powder", quantity: "1", unit: "tsp" },
      { name: "Sugar", quantity: "3", unit: "tbsp" },
      { name: "Instant yeast", quantity: "5", unit: "g" },
      { name: "Baking powder", quantity: "1", unit: "tsp" }
    ],
    preparation_steps: [
      "Marinate pork in hoisin, oyster sauce, five spice and sugar for 2 hours.",
      "Roast marinated pork at 200°C for 25 minutes, basting twice. Cool and dice finely.",
      "Make dough with flour, yeast, sugar and water. Rest 1 hour until doubled.",
      "Divide dough, flatten each piece, add pork filling and seal into round buns.",
      "Steam on parchment squares at high heat for 15 minutes until puffed and white."
    ],
    chef_notes: "The characteristic split on top of char siu bao happens naturally from steam pressure during steaming. Don't over-fill or the buns won't have room to expand.",
    serving_suggestions: "Serve fresh from the steamer at dim sum with jasmine tea.",
    flavor_profile: ["sweet", "savory", "caramelized", "pillowy"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80",
    tags: ["Dim Sum", "Steamed", "Cantonese", "Classic"]
  },
  {
    dish_name: "Scallion Pancakes (Cong You Bing)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 30,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Crispy, flaky layered flatbreads studded with fragrant spring onions — a beloved Shanghai street food made by rolling and coiling the dough to create hundreds of buttery layers.",
    ingredients: [
      { name: "All-purpose flour", quantity: "250", unit: "g" },
      { name: "Spring onions", quantity: "6", unit: "stalks" },
      { name: "Sesame oil", quantity: "3", unit: "tbsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Boiling water", quantity: "150", unit: "ml" },
      { name: "Oil for frying", quantity: "4", unit: "tbsp" }
    ],
    preparation_steps: [
      "Mix flour with boiling water, knead into smooth dough. Rest 30 minutes.",
      "Roll dough thin, brush generously with sesame oil and scatter spring onions.",
      "Roll up into a log, then coil into a spiral. Flatten gently into a round.",
      "Fry in oil on medium heat for 3-4 minutes each side until golden and crispy.",
      "Serve cut into wedges with soy dipping sauce."
    ],
    chef_notes: "The lamination from rolling and coiling is what creates the flaky layers. Don't skip the resting time — it makes rolling much easier.",
    serving_suggestions: "Serve with soy-vinegar dipping sauce or enjoy as a breakfast street food.",
    flavor_profile: ["crispy", "savory", "sesame", "oniony"],
    dietary_tags: ["vegetarian", "vegan", "dairy-free"],
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80",
    tags: ["Street Food", "Vegetarian", "Shanghai", "Breakfast"]
  },
  {
    dish_name: "Steamed Egg with Soy (Chawanmushi-style)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Silky smooth steamed eggs with a texture smoother than tofu, finished with soy sauce and sesame oil. A comforting Chinese home cooking classic that requires nothing more than eggs, broth and patience.",
    ingredients: [
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Chicken broth, warm", quantity: "300", unit: "ml" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sesame oil", quantity: "1", unit: "tsp" },
      { name: "Spring onions", quantity: "2", unit: "stalks" },
      { name: "Salt", quantity: "0.5", unit: "tsp" }
    ],
    preparation_steps: [
      "Beat eggs gently without creating foam. Strain through a fine sieve.",
      "Mix with warm (not hot) chicken broth at a 1:1.5 ratio of egg to broth.",
      "Pour into bowls, cover tightly with plastic wrap.",
      "Steam over medium-low heat for 12-14 minutes until just set with a slight wobble.",
      "Drizzle with soy sauce and sesame oil, garnish with spring onions."
    ],
    chef_notes: "The secret is NOT whisking vigorously — air bubbles create holes in the silky texture. Steam on medium-low; high heat produces a pitted, rubbery custard.",
    serving_suggestions: "Serve as a starter or alongside rice and stir-fried vegetables.",
    flavor_profile: ["silky", "savory", "umami", "delicate"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    tags: ["Steamed", "Comfort Food", "Quick", "Cantonese"]
  },

  // ── SOUPS ────────────────────────────────────────────────────────────────────
  {
    dish_name: "Hot & Sour Soup (Suan La Tang)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "A classic Sichuan soup of complex contrasts — thick, egg-ribboned broth that is simultaneously sour from black vinegar, spicy from white pepper, savory from mushrooms and silky from tofu.",
    ingredients: [
      { name: "Chicken broth", quantity: "1", unit: "litre" },
      { name: "Firm tofu", quantity: "150", unit: "g" },
      { name: "Wood ear mushrooms", quantity: "30", unit: "g" },
      { name: "Bamboo shoots", quantity: "80", unit: "g" },
      { name: "Eggs", quantity: "2", unit: "pieces" },
      { name: "Chinkiang black vinegar", quantity: "3", unit: "tbsp" },
      { name: "White pepper", quantity: "1", unit: "tsp" },
      { name: "Cornstarch", quantity: "3", unit: "tbsp" }
    ],
    preparation_steps: [
      "Soak wood ear mushrooms 20 minutes, then slice thinly.",
      "Bring broth to a boil, add tofu, mushrooms and bamboo shoots.",
      "Add soy sauce, vinegar and white pepper.",
      "Stir cornstarch with cold water and slowly pour into simmering soup to thicken.",
      "Pour beaten egg in a slow stream while stirring to create ribbons. Serve hot."
    ],
    chef_notes: "Add vinegar OFF the heat or at the very end — boiling drives away the aroma. White pepper gives the 'hot', vinegar gives the 'sour'. Don't skimp on either.",
    serving_suggestions: "Serve as a starter before a Chinese meal or with steamed rice.",
    flavor_profile: ["sour", "spicy", "umami", "silky"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    tags: ["Sichuan", "Classic", "Quick", "Warming"]
  },
  {
    dish_name: "Wonton Soup",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Soups",
    difficulty_level: "medium",
    prep_time_minutes: 40,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Delicate pork-and-shrimp wontons swimming in a clear, deeply flavored broth — a Cantonese comfort food staple. The thin, silky wrappers and the aromatic broth are what make this dish sublime.",
    ingredients: [
      { name: "Wonton wrappers", quantity: "24", unit: "pieces" },
      { name: "Ground pork", quantity: "200", unit: "g" },
      { name: "Shrimp, peeled and minced", quantity: "150", unit: "g" },
      { name: "Chicken broth", quantity: "1.5", unit: "litres" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Bok choy", quantity: "2", unit: "heads" }
    ],
    preparation_steps: [
      "Mix pork and shrimp with soy sauce, sesame oil, ginger and spring onions.",
      "Place a teaspoon of filling in each wrapper. Wet edges and fold into triangle, then bring corners together.",
      "Simmer broth with ginger and spring onions for 20 minutes. Season well.",
      "Cook wontons in boiling water for 3-4 minutes until they float and filling is cooked.",
      "Transfer wontons to bowls, ladle hot broth over, add blanched bok choy."
    ],
    chef_notes: "Never boil wontons directly in your broth — it muddies the clear, delicate broth. Cook them separately in plain water and transfer to the serving bowls.",
    serving_suggestions: "Serve with chili oil drizzle and a side of wontons for dipping.",
    flavor_profile: ["delicate", "umami", "savory", "silky"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
    tags: ["Cantonese", "Comfort Food", "Classic", "Dim Sum"]
  },
  {
    dish_name: "Mapo Tofu Soup",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "A Sichuan classic transformed into a deeply satisfying soup — silken tofu and ground pork in a fiery, numbing broth of doubanjiang and Sichuan peppercorns. Bold, spicy and utterly addictive.",
    ingredients: [
      { name: "Silken tofu", quantity: "400", unit: "g" },
      { name: "Ground pork", quantity: "150", unit: "g" },
      { name: "Doubanjiang (spicy bean paste)", quantity: "2", unit: "tbsp" },
      { name: "Chicken broth", quantity: "500", unit: "ml" },
      { name: "Sichuan peppercorns, ground", quantity: "1", unit: "tsp" },
      { name: "Garlic", quantity: "4", unit: "cloves" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Fry doubanjiang in oil until oil turns red and fragrant.",
      "Add ground pork and cook until browned. Add garlic and ginger.",
      "Pour in broth and bring to a simmer.",
      "Gently add silken tofu cut into cubes — do not stir aggressively.",
      "Finish with ground Sichuan pepper, spring onions and a drizzle of chili oil."
    ],
    chef_notes: "Doubanjiang is the soul of this dish — don't substitute. Silken tofu is non-negotiable for the texture. The Sichuan peppercorn gives the characteristic numbing 'ma' sensation.",
    serving_suggestions: "Serve over steamed white rice to balance the heat.",
    flavor_profile: ["spicy", "numbing", "umami", "bold"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80",
    tags: ["Sichuan", "Spicy", "Quick", "Numbing"]
  },

  // ── SALADS ───────────────────────────────────────────────────────────────────
  {
    dish_name: "Smashed Cucumber Salad (Pai Huang Gua)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "A refreshing northern Chinese cold appetizer of smashed cucumbers marinated in garlic, rice vinegar, sesame oil and chili oil — crunchy, garlicky and impossibly refreshing.",
    ingredients: [
      { name: "English cucumbers", quantity: "2", unit: "large" },
      { name: "Garlic", quantity: "4", unit: "cloves" },
      { name: "Rice vinegar", quantity: "2", unit: "tbsp" },
      { name: "Sesame oil", quantity: "1", unit: "tbsp" },
      { name: "Chili oil", quantity: "1", unit: "tbsp" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" }
    ],
    preparation_steps: [
      "Smash cucumbers with the flat of a cleaver until they crack open. Cut into bite-sized pieces.",
      "Salt cucumbers and leave 10 minutes. Drain any liquid.",
      "Crush garlic and mix with rice vinegar, soy sauce, sesame oil, chili oil and sugar.",
      "Toss cucumbers with dressing 5 minutes before serving.",
      "Garnish with sesame seeds and fresh coriander."
    ],
    chef_notes: "Smashing rather than slicing creates jagged edges that absorb the dressing better. Salting and draining removes bitterness and excess water for a crunchier result.",
    serving_suggestions: "Serve as a refreshing starter or side dish at room temperature.",
    flavor_profile: ["refreshing", "garlicky", "tangy", "crunchy"],
    dietary_tags: ["vegetarian", "vegan", "dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
    tags: ["Vegetarian", "Cold Dish", "Quick", "Refreshing"]
  },
  {
    dish_name: "Sichuan Cold Noodle Salad (Liang Mian)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Chilled wheat noodles tossed in a complex sauce of sesame paste, chili oil, black vinegar and Sichuan pepper — a summer staple that delivers a symphony of spicy, numbing, tangy and savory sensations.",
    ingredients: [
      { name: "Fresh wheat noodles", quantity: "400", unit: "g" },
      { name: "Chinese sesame paste", quantity: "3", unit: "tbsp" },
      { name: "Chili oil", quantity: "2", unit: "tbsp" },
      { name: "Black vinegar", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sichuan pepper oil", quantity: "1", unit: "tsp" },
      { name: "Cucumber, julienned", quantity: "1", unit: "medium" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Cook noodles until just tender. Drain and rinse under cold water immediately.",
      "Toss with a little sesame oil to prevent sticking. Chill.",
      "Whisk sesame paste with soy sauce, vinegar, chili oil, a pinch of sugar and water until smooth.",
      "Toss chilled noodles with sauce, julienned cucumber and spring onions.",
      "Top with chili oil, Sichuan pepper oil and crushed peanuts."
    ],
    chef_notes: "Chinese sesame paste (made from roasted sesame seeds) is much more intense than Middle Eastern tahini — don't substitute. Rinsing noodles in cold water is essential for the right texture.",
    serving_suggestions: "Serve cold as a street food style snack or light summer meal.",
    flavor_profile: ["spicy", "nutty", "tangy", "numbing"],
    dietary_tags: ["vegetarian", "dairy-free"],
    img: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80",
    tags: ["Sichuan", "Cold Noodles", "Street Food", "Summer"]
  },

  // ── MAIN COURSES ─────────────────────────────────────────────────────────────
  {
    dish_name: "Kung Pao Chicken (Gong Bao Ji Ding)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "The world-famous Sichuan stir-fry of diced chicken with dried chilies, Sichuan peppercorns and peanuts in a glossy, sweet-spicy-sour sauce. Authentic Kung Pao is complex, numbing and deeply satisfying.",
    ingredients: [
      { name: "Chicken breast, diced", quantity: "500", unit: "g" },
      { name: "Dried red chilies", quantity: "8", unit: "pieces" },
      { name: "Sichuan peppercorns", quantity: "1", unit: "tsp" },
      { name: "Roasted peanuts", quantity: "80", unit: "g" },
      { name: "Soy sauce", quantity: "3", unit: "tbsp" },
      { name: "Chinkiang black vinegar", quantity: "2", unit: "tbsp" },
      { name: "Sugar", quantity: "2", unit: "tbsp" },
      { name: "Garlic and ginger", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Marinate chicken in soy sauce, Shaoxing wine and cornstarch for 15 minutes.",
      "Mix sauce: soy sauce, vinegar, sugar, chicken broth and cornstarch.",
      "Wok-fry chilies and Sichuan pepper in oil until fragrant. Remove chilies.",
      "Stir-fry chicken on high heat until just cooked. Add garlic and ginger.",
      "Pour in sauce, toss until glossy, add peanuts and spring onions last."
    ],
    chef_notes: "The wok must be screaming hot — this dish lives and dies by wok hei (the breath of the wok). Cook in small batches so the temperature never drops. The vinegar and sugar ratio creates the unique 'lychee sauce' flavor.",
    serving_suggestions: "Serve over steamed white rice or with steamed jasmine rice.",
    flavor_profile: ["spicy", "numbing", "sweet", "tangy", "savory"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80",
    tags: ["Sichuan", "Stir-Fry", "Iconic", "Spicy"]
  },
  {
    dish_name: "Peking Duck (Beijing Kaoya)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "hard",
    prep_time_minutes: 1440,
    cook_time_minutes: 90,
    servings: 4,
    short_description: "China's most celebrated dish — lacquered duck with impossibly thin, crackling skin served with Mandarin pancakes, hoisin sauce and cucumber. A Beijing imperial classic that requires patience but delivers spectacular results.",
    ingredients: [
      { name: "Whole duck", quantity: "1", unit: "kg" },
      { name: "Maltose syrup", quantity: "3", unit: "tbsp" },
      { name: "Mandarin pancakes", quantity: "16", unit: "pieces" },
      { name: "Hoisin sauce", quantity: "4", unit: "tbsp" },
      { name: "Cucumber, julienned", quantity: "1", unit: "medium" },
      { name: "Spring onions", quantity: "6", unit: "stalks" },
      { name: "Five spice powder", quantity: "2", unit: "tsp" },
      { name: "Salt", quantity: "2", unit: "tsp" }
    ],
    preparation_steps: [
      "Clean duck and air-dry in refrigerator uncovered for 24-48 hours — this is critical for crispy skin.",
      "Blanch duck with boiling water, dry again. Brush with maltose-water glaze.",
      "Season cavity with five spice and salt. Roast at 200°C for 45 minutes, then 220°C for 30 minutes.",
      "Rest 15 minutes. Carve the crispy skin and meat separately.",
      "Serve skin and meat on warm pancakes with hoisin, cucumber and spring onions."
    ],
    chef_notes: "Air-drying is the single most important step — 48 hours gives near-restaurant results. The maltose glaze creates that characteristic mahogany lacquer color.",
    serving_suggestions: "Serve in two courses — first the skin, then the meat — as is traditional in Beijing restaurants.",
    flavor_profile: ["rich", "crispy", "caramelized", "sweet-savory"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&q=80",
    tags: ["Beijing", "Imperial", "Special Occasion", "Iconic"]
  },
  {
    dish_name: "Sweet & Sour Pork (Gu Lao Rou)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Tender, twice-fried pork pieces in a vibrant glossy sauce of pineapple, bell peppers and tomato ketchup — a Cantonese classic that has become one of the world's most beloved Chinese dishes.",
    ingredients: [
      { name: "Pork tenderloin", quantity: "400", unit: "g" },
      { name: "Pineapple chunks", quantity: "150", unit: "g" },
      { name: "Bell peppers", quantity: "2", unit: "pieces" },
      { name: "Tomato ketchup", quantity: "4", unit: "tbsp" },
      { name: "Rice vinegar", quantity: "3", unit: "tbsp" },
      { name: "Sugar", quantity: "3", unit: "tbsp" },
      { name: "Cornstarch", quantity: "4", unit: "tbsp" },
      { name: "Egg", quantity: "1", unit: "piece" }
    ],
    preparation_steps: [
      "Cut pork into bite-sized pieces, coat in egg and cornstarch batter.",
      "Deep fry at 180°C until golden. Remove, rest 2 minutes, fry again for extra crunch.",
      "Stir-fry bell peppers and pineapple briefly in a hot wok.",
      "Add sauce of ketchup, vinegar, sugar, water and cornstarch. Stir until glossy.",
      "Toss fried pork in the sauce immediately before serving."
    ],
    chef_notes: "Double-frying is the secret to pork that stays crispy in the sauce. Add the pork to the sauce at the LAST moment — only toss right before serving.",
    serving_suggestions: "Serve immediately over steamed white rice with jasmine tea.",
    flavor_profile: ["sweet", "tangy", "crispy", "colorful"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    tags: ["Cantonese", "Classic", "Family Favorite", "Stir-Fry"]
  },
  {
    dish_name: "Dan Dan Noodles",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Sichuan's most famous street food noodle dish — wheat noodles in a complex sauce of sesame paste, doubanjiang, preserved vegetables and spiced minced pork with Sichuan peppercorn numbing heat.",
    ingredients: [
      { name: "Fresh wheat noodles", quantity: "400", unit: "g" },
      { name: "Ground pork", quantity: "200", unit: "g" },
      { name: "Chinese sesame paste", quantity: "3", unit: "tbsp" },
      { name: "Doubanjiang", quantity: "1", unit: "tbsp" },
      { name: "Ya Cai (preserved vegetables)", quantity: "3", unit: "tbsp" },
      { name: "Chili oil", quantity: "3", unit: "tbsp" },
      { name: "Sichuan peppercorns, toasted", quantity: "1", unit: "tsp" },
      { name: "Chicken broth", quantity: "200", unit: "ml" }
    ],
    preparation_steps: [
      "Fry pork with doubanjiang and ya cai until fragrant and well-colored.",
      "Mix sauce base in each bowl: sesame paste, soy sauce, chili oil, Sichuan pepper oil, broth and vinegar.",
      "Cook noodles, drain and divide into bowls.",
      "Ladle spiced minced pork over noodles.",
      "Garnish with spring onions, ground Sichuan pepper and additional chili oil."
    ],
    chef_notes: "Ya Cai (Yibin preserved mustard greens) is essential for the authentic texture and funk — available in Asian grocery stores. Don't skip the toasted and ground Sichuan peppercorn finish.",
    serving_suggestions: "Serve in individual bowls — each person mixes their own noodles before eating.",
    flavor_profile: ["spicy", "numbing", "savory", "nutty", "complex"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
    tags: ["Sichuan", "Street Food", "Noodles", "Iconic"]
  },
  {
    dish_name: "Mapo Tofu (Ma Po Dou Fu)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Main Courses",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Soft silken tofu in a fiery, numbing Sichuan sauce of doubanjiang, fermented black beans and ground pork — one of China's most iconic dishes, packing extraordinary flavor into deceptively simple ingredients.",
    ingredients: [
      { name: "Silken tofu", quantity: "600", unit: "g" },
      { name: "Ground pork", quantity: "150", unit: "g" },
      { name: "Doubanjiang", quantity: "2", unit: "tbsp" },
      { name: "Fermented black beans", quantity: "1", unit: "tbsp" },
      { name: "Sichuan peppercorns, ground", quantity: "1.5", unit: "tsp" },
      { name: "Garlic and ginger", quantity: "2", unit: "tbsp" },
      { name: "Chicken broth", quantity: "300", unit: "ml" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Fry doubanjiang and fermented black beans in oil until oil turns deep red.",
      "Add garlic, ginger and pork. Cook until pork is done.",
      "Add broth and bring to a simmer.",
      "Carefully add silken tofu cut in cubes — it's very fragile.",
      "Thicken with cornstarch slurry, finish with Sichuan pepper. Garnish with spring onions."
    ],
    chef_notes: "Handle the silken tofu with extreme care — use a spatula or spoon to gently fold it in, never stir. The ground Sichuan peppercorn should be added right at the end for maximum numbing impact.",
    serving_suggestions: "Absolutely must be served with steamed white rice — the numbing heat needs a neutral base.",
    flavor_profile: ["numbing", "spicy", "umami", "silky"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80",
    tags: ["Sichuan", "Iconic", "Spicy", "Tofu"]
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    dish_name: "Mango Pudding",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Desserts",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 0,
    servings: 6,
    short_description: "A silky, intensely flavored Cantonese dessert made with ripe Alphonso mango and cream — smooth, cool and vibrantly colored. A Hong Kong dim sum institution that is simpler to make than it looks.",
    ingredients: [
      { name: "Ripe mango pulp", quantity: "400", unit: "g" },
      { name: "Heavy cream", quantity: "200", unit: "ml" },
      { name: "Gelatin sheets", quantity: "4", unit: "pieces" },
      { name: "Sugar", quantity: "60", unit: "g" },
      { name: "Coconut milk", quantity: "100", unit: "ml" },
      { name: "Fresh mango for garnish", quantity: "1", unit: "piece" }
    ],
    preparation_steps: [
      "Bloom gelatin in cold water for 5 minutes.",
      "Heat coconut milk with sugar until dissolved. Squeeze excess water from gelatin and melt in.",
      "Blend mango pulp until smooth. Mix with coconut milk mixture and cream.",
      "Pour into serving glasses or moulds. Refrigerate 4 hours until set.",
      "Serve unmoulded with fresh mango, evaporated milk drizzle and a mint leaf."
    ],
    chef_notes: "Use the ripest, most fragrant mangoes you can find — Alphonso or Ataulfo varieties give the best flavor and color. The evaporated milk drizzle is the classic Hong Kong garnish.",
    serving_suggestions: "Serve chilled garnished with fresh mango and evaporated milk.",
    flavor_profile: ["sweet", "tropical", "creamy", "silky"],
    dietary_tags: ["gluten-free", "vegetarian"],
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
    tags: ["Dim Sum", "Hong Kong", "Cold Dessert", "Summer"]
  },
  {
    dish_name: "Tang Yuan (Glutinous Rice Balls)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 40,
    cook_time_minutes: 10,
    servings: 6,
    short_description: "Chewy glutinous rice balls filled with a molten black sesame paste, served in sweet ginger broth. Eaten at the Lantern Festival and Winter Solstice, Tang Yuan symbolizes family reunion and togetherness.",
    ingredients: [
      { name: "Glutinous rice flour", quantity: "250", unit: "g" },
      { name: "Black sesame seeds, toasted", quantity: "150", unit: "g" },
      { name: "Butter", quantity: "50", unit: "g" },
      { name: "Sugar", quantity: "80", unit: "g" },
      { name: "Fresh ginger", quantity: "2", unit: "inch" },
      { name: "Brown sugar", quantity: "60", unit: "g" },
      { name: "Water", quantity: "500", unit: "ml" }
    ],
    preparation_steps: [
      "Grind toasted sesame seeds to a paste. Mix with soft butter and sugar. Freeze in small balls.",
      "Knead glutinous rice flour with warm water into a smooth, pliable dough.",
      "Flatten a ball of dough in your palm, place frozen sesame filling in center. Seal smoothly.",
      "Simmer ginger and brown sugar in water for the serving broth.",
      "Cook Tang Yuan in boiling water until they float. Transfer to ginger broth and serve."
    ],
    chef_notes: "Freezing the sesame filling is critical — it must be solid when you wrap it so it doesn't break through the delicate wrapper. The balls are done when they float.",
    serving_suggestions: "Serve 3-4 balls per person in warm ginger broth. The number 3 is traditional.",
    flavor_profile: ["chewy", "nutty", "sweet", "warming"],
    dietary_tags: ["vegetarian", "dairy-free"],
    img: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80",
    tags: ["Festival Food", "Lantern Festival", "Traditional", "Chewy"]
  },
  {
    dish_name: "Egg Tarts (Dan Ta)",
    cuisine: "Chinese",
    country_of_origin: "China",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 25,
    servings: 8,
    short_description: "Flaky, buttery pastry shells filled with smooth, wobbly egg custard — a Hong Kong bakery classic inspired by Portuguese pastel de nata. The contrast between the crisp shell and silky custard is perfection.",
    ingredients: [
      { name: "All-purpose flour", quantity: "200", unit: "g" },
      { name: "Butter", quantity: "120", unit: "g" },
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Sugar", quantity: "80", unit: "g" },
      { name: "Evaporated milk", quantity: "100", unit: "ml" },
      { name: "Hot water", quantity: "150", unit: "ml" },
      { name: "Vanilla extract", quantity: "0.5", unit: "tsp" }
    ],
    preparation_steps: [
      "Make pastry by rubbing butter into flour with sugar until breadcrumb texture. Add egg yolk and cold water to bind.",
      "Press pastry into tart moulds. Refrigerate 20 minutes.",
      "Dissolve sugar in hot water. Cool, then mix with eggs, evaporated milk and vanilla.",
      "Strain custard and pour into pastry shells.",
      "Bake at 180°C for 20-25 minutes until custard is just set with a slight wobble."
    ],
    chef_notes: "The custard should wobble like jelly when you take it out — residual heat continues cooking. Overbaked tarts have a pitted, rubbery surface.",
    serving_suggestions: "Serve warm from the oven at dim sum or as an afternoon snack with tea.",
    flavor_profile: ["buttery", "sweet", "eggy", "silky"],
    dietary_tags: ["vegetarian"],
    img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80",
    tags: ["Hong Kong", "Dim Sum", "Baked", "Classic"]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
export const japaneseCuisineData = [
  // ── APPETIZERS ──────────────────────────────────────────────────────────────
  {
    dish_name: "Gyoza (Pan-Fried Dumplings)",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 40,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Japanese dumplings with crispy bottoms and juicy pork-cabbage filling — distinct from Chinese jiaozi with their characteristic crescent shape and the steam-fry technique that creates a delicate crispy-chewy skin.",
    ingredients: [
      { name: "Gyoza wrappers", quantity: "30", unit: "pieces" },
      { name: "Ground pork", quantity: "250", unit: "g" },
      { name: "Napa cabbage", quantity: "200", unit: "g" },
      { name: "Garlic", quantity: "3", unit: "cloves" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sake", quantity: "1", unit: "tbsp" }
    ],
    preparation_steps: [
      "Salt and squeeze all water from cabbage. Mix with pork, garlic, ginger, soy, sake and sesame oil.",
      "Place filling on wrapper, fold in half and pleat one side against the flat side.",
      "Heat oil in a flat pan, add gyoza flat-side down and fry until golden (2-3 min).",
      "Add water to pan (it will sizzle dramatically), cover and steam 5-6 minutes.",
      "Uncover and fry until water evaporates and bottoms re-crisp. Serve immediately."
    ],
    chef_notes: "The distinct Japanese pleating technique (7-8 pleats on one side only) creates the characteristic moon shape. The steam-fry method gives both a crispy bottom and juicy filling.",
    serving_suggestions: "Serve with soy-rice vinegar dipping sauce and a touch of togarashi chili.",
    flavor_profile: ["crispy", "savory", "juicy", "garlicky"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
    tags: ["Izakaya", "Street Food", "Classic", "Pan-Fried"]
  },
  {
    dish_name: "Edamame with Sea Salt",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 2,
    cook_time_minutes: 5,
    servings: 4,
    short_description: "The perfect Japanese bar snack — young soybeans boiled or steamed in their pods and finished with flaky sea salt. Simple, addictive and essential at every izakaya.",
    ingredients: [
      { name: "Fresh or frozen edamame in pods", quantity: "400", unit: "g" },
      { name: "Sea salt", quantity: "2", unit: "tsp" },
      { name: "Water", quantity: "1", unit: "litre" }
    ],
    preparation_steps: [
      "Rub edamame pods with salt to remove fuzz.",
      "Boil in well-salted water for 4-5 minutes until pods are bright green and beans are tender.",
      "Drain and immediately toss with flaky sea salt.",
      "Serve hot or at room temperature in the pods."
    ],
    chef_notes: "Rubbing salt into the pods before cooking not only seasons them from the outside but also helps retain their vibrant green color. Do not overcook — they should have a slight resistance when bitten.",
    serving_suggestions: "Serve as an izakaya snack with cold Japanese beer or sake.",
    flavor_profile: ["fresh", "clean", "savory", "nutty"],
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    tags: ["Izakaya", "Vegan", "Quick", "Bar Food"]
  },
  {
    dish_name: "Agedashi Tofu",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Delicate, barely-there crispy tofu served in a warm dashi broth — one of Japan's most elegant preparations. The thin cornstarch coating creates a translucent, almost ghostly crust that soaks up the umami broth.",
    ingredients: [
      { name: "Silken or soft tofu", quantity: "400", unit: "g" },
      { name: "Potato starch or cornstarch", quantity: "4", unit: "tbsp" },
      { name: "Dashi broth", quantity: "300", unit: "ml" },
      { name: "Mirin", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Grated daikon", quantity: "4", unit: "tbsp" },
      { name: "Grated ginger", quantity: "1", unit: "tsp" },
      { name: "Oil for frying", quantity: "1", unit: "cup" }
    ],
    preparation_steps: [
      "Drain tofu thoroughly. Press between paper towels for 30 minutes.",
      "Cut into cubes and dust lightly but completely in potato starch.",
      "Fry in 170°C oil for 3-4 minutes until a delicate golden crust forms.",
      "Warm dashi with mirin and soy sauce.",
      "Place fried tofu in bowls, pour warm dashi around (not over) the tofu. Top with grated daikon and ginger."
    ],
    chef_notes: "The dashi is poured around rather than over the tofu to preserve the delicate coating. Silken tofu is traditional but soft tofu is easier to handle for beginners.",
    serving_suggestions: "Serve as a refined starter at Japanese meals, garnished with katsuobushi (bonito flakes).",
    flavor_profile: ["delicate", "umami", "silky", "crispy"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    tags: ["Izakaya", "Vegetarian", "Elegant", "Traditional"]
  },
  {
    dish_name: "Takoyaki (Octopus Balls)",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Osaka's most beloved street food — spherical savory pancakes filled with tender octopus, crispy on the outside and molten-creamy inside, topped with okonomiyaki sauce, mayo and dancing bonito flakes.",
    ingredients: [
      { name: "Takoyaki flour or all-purpose flour", quantity: "200", unit: "g" },
      { name: "Octopus, cooked and diced", quantity: "200", unit: "g" },
      { name: "Eggs", quantity: "3", unit: "pieces" },
      { name: "Dashi broth", quantity: "600", unit: "ml" },
      { name: "Okonomiyaki sauce", quantity: "4", unit: "tbsp" },
      { name: "Japanese mayo", quantity: "4", unit: "tbsp" },
      { name: "Katsuobushi (bonito flakes)", quantity: "2", unit: "tbsp" },
      { name: "Aonori (green seaweed powder)", quantity: "1", unit: "tsp" }
    ],
    preparation_steps: [
      "Make thin batter with flour, eggs and dashi. Season with soy and ginger.",
      "Heat takoyaki pan and grease each cavity well.",
      "Pour batter to fill each cavity. Add octopus pieces and pickled ginger.",
      "When edges set, rotate balls 90° using skewers to form spheres. Keep rotating.",
      "Cook until fully spherical and golden. Serve topped with sauce, mayo, bonito and aonori."
    ],
    chef_notes: "A takoyaki pan (cast iron with hemispherical moulds) is essential. The rotating technique requires practice — the balls should be turned 4-6 times for perfect spheres.",
    serving_suggestions: "Serve immediately as a street food snack while piping hot.",
    flavor_profile: ["savory", "umami", "crispy-creamy", "smoky"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
    tags: ["Osaka", "Street Food", "Seafood", "Iconic"]
  },

  // ── SOUPS ────────────────────────────────────────────────────────────────────
  {
    dish_name: "Tonkotsu Ramen",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Soups",
    difficulty_level: "hard",
    prep_time_minutes: 60,
    cook_time_minutes: 720,
    servings: 4,
    short_description: "The king of Japanese ramen — a rich, creamy, opaque broth made from pork bones boiled for 12+ hours, served with thin noodles, chashu pork belly, soft-boiled eggs and nori. Hakata-style and utterly magnificent.",
    ingredients: [
      { name: "Pork neck bones", quantity: "2", unit: "kg" },
      { name: "Fresh ramen noodles", quantity: "400", unit: "g" },
      { name: "Pork belly for chashu", quantity: "600", unit: "g" },
      { name: "Soy sauce", quantity: "100", unit: "ml" },
      { name: "Mirin", quantity: "80", unit: "ml" },
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Nori sheets", quantity: "4", unit: "pieces" },
      { name: "Spring onions and bamboo shoots", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Blanch pork bones in boiling water 5 minutes, drain and scrub clean.",
      "Boil bones vigorously for 12 hours, adding water to maintain level. The vigorous boil creates the milky color.",
      "Roll pork belly tightly, tie with twine and braise in soy-mirin-sake for 2 hours. Rest overnight.",
      "Marinate soft-boiled eggs in chashu braising liquid for at least 6 hours.",
      "Strain broth, season with tare sauce. Serve over noodles topped with chashu, egg, nori and spring onions."
    ],
    chef_notes: "The SECRET to tonkotsu's milky white color and creamy texture is maintaining a VIGOROUS boil throughout — this emulsifies the collagen and fat. A gentle simmer produces clear, thin broth.",
    serving_suggestions: "Serve in pre-warmed bowls immediately. Customize with togarashi, garlic oil or extra tare.",
    flavor_profile: ["rich", "creamy", "umami", "porky", "deeply savory"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
    tags: ["Ramen", "Hakata", "Slow Cooked", "Iconic"]
  },
  {
    dish_name: "Miso Soup (Miso Shiru)",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 5,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Japan's soul food — a daily ritual soup of fermented miso paste dissolved in dashi broth with tofu and wakame. Deceptively simple, with profound nutritional depth and a deeply comforting umami flavor.",
    ingredients: [
      { name: "Dashi broth", quantity: "800", unit: "ml" },
      { name: "White or red miso paste", quantity: "4", unit: "tbsp" },
      { name: "Silken tofu", quantity: "150", unit: "g" },
      { name: "Wakame seaweed", quantity: "2", unit: "tbsp" },
      { name: "Spring onions", quantity: "2", unit: "stalks" }
    ],
    preparation_steps: [
      "Soak wakame in cold water 5 minutes until rehydrated. Drain.",
      "Bring dashi to a gentle simmer — do not boil.",
      "Dissolve miso paste in a ladle with a little broth, then stir into the pot.",
      "Add diced tofu and wakame. Heat briefly — do not boil after adding miso.",
      "Serve immediately garnished with spring onions."
    ],
    chef_notes: "NEVER boil miso soup — boiling kills the beneficial bacteria and dulls the complex fermented flavor. It should be heated gently and served immediately.",
    serving_suggestions: "Serve at every Japanese meal — breakfast, lunch and dinner.",
    flavor_profile: ["umami", "savory", "fermented", "warming"],
    dietary_tags: ["vegetarian", "dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    tags: ["Everyday", "Traditional", "Quick", "Healthy"]
  },

  // ── SALADS ───────────────────────────────────────────────────────────────────
  {
    dish_name: "Sunomono (Japanese Cucumber Salad)",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "Thinly sliced cucumbers in a sweet-tart rice vinegar dressing — a refreshing Japanese summer side dish with the delicate flavors of toasted sesame and shredded crab or shrimp.",
    ingredients: [
      { name: "Japanese cucumbers", quantity: "2", unit: "medium" },
      { name: "Rice vinegar", quantity: "3", unit: "tbsp" },
      { name: "Sugar", quantity: "1.5", unit: "tbsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Soy sauce", quantity: "1", unit: "tsp" },
      { name: "Sesame seeds", quantity: "2", unit: "tsp" },
      { name: "Crab sticks or cooked shrimp", quantity: "100", unit: "g" }
    ],
    preparation_steps: [
      "Slice cucumbers paper-thin using a mandoline. Salt and let stand 10 minutes.",
      "Squeeze out all excess liquid — this is essential for the right texture.",
      "Dissolve sugar and salt in rice vinegar. Add soy sauce.",
      "Toss cucumber and seafood in the vinegar dressing.",
      "Serve chilled, garnished with toasted sesame seeds."
    ],
    chef_notes: "Salting and squeezing the cucumber is crucial — it draws out bitterness and excess water, allowing the delicate dressing to be properly absorbed rather than diluted.",
    serving_suggestions: "Serve as a palate cleanser between courses or alongside sashimi.",
    flavor_profile: ["refreshing", "tangy", "sweet", "delicate"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
    tags: ["Vegetarian", "Refreshing", "Summer", "Traditional"]
  },
  {
    dish_name: "Wakame Seaweed Salad",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "Vibrant green rehydrated wakame seaweed in a sesame-ginger dressing — a staple of Japanese restaurants worldwide, packed with minerals and offering a satisfying oceanic umami flavor.",
    ingredients: [
      { name: "Dried wakame seaweed", quantity: "30", unit: "g" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Rice vinegar", quantity: "2", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Ginger, grated", quantity: "1", unit: "tsp" },
      { name: "Sesame seeds", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Soak wakame in cold water 5-10 minutes until fully rehydrated.",
      "Blanch in boiling water for 30 seconds to achieve vibrant green color. Cool in ice water.",
      "Whisk together sesame oil, rice vinegar, soy sauce, sugar and grated ginger.",
      "Drain wakame and toss with dressing.",
      "Serve topped with toasted sesame seeds and a drizzle of chili oil."
    ],
    chef_notes: "The quick blanch is the key to the vivid green color you see in restaurants. Without it, the rehydrated seaweed remains dark and less appealing.",
    serving_suggestions: "Serve as a starter alongside miso soup and rice.",
    flavor_profile: ["oceanic", "sesame", "tangy", "umami"],
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    tags: ["Healthy", "Vegan", "Nutrient-Rich", "Quick"]
  },

  // ── MAIN COURSES ─────────────────────────────────────────────────────────────
  {
    dish_name: "Chicken Katsu Curry",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 40,
    servings: 4,
    short_description: "Japan's most beloved comfort meal — golden panko-breaded chicken cutlets served over steamed rice with a thick, mildly spiced curry sauce made from Japanese curry roux. A weekly staple in Japanese homes.",
    ingredients: [
      { name: "Chicken breasts", quantity: "4", unit: "pieces" },
      { name: "Panko breadcrumbs", quantity: "150", unit: "g" },
      { name: "Japanese curry roux blocks", quantity: "100", unit: "g" },
      { name: "Potatoes, diced", quantity: "2", unit: "medium" },
      { name: "Carrots, diced", quantity: "2", unit: "medium" },
      { name: "Onions", quantity: "2", unit: "large" },
      { name: "Steamed Japanese rice", quantity: "4", unit: "portions" },
      { name: "Oil for frying", quantity: "2", unit: "cups" }
    ],
    preparation_steps: [
      "Pound chicken breasts to even thickness. Season, coat in flour, egg and panko.",
      "Deep fry at 170°C for 6-7 minutes until deeply golden. Rest on a rack.",
      "Caramelize onions in oil 15 minutes. Add carrots and potatoes, add water and simmer 15 minutes.",
      "Remove from heat and dissolve curry roux blocks into the broth. Return to low heat 5 minutes.",
      "Slice katsu. Serve rice with curry sauce alongside, katsu slices on top."
    ],
    chef_notes: "Japanese curry is notably milder and sweeter than Indian curry — the roux-based sauce has a thick, glossy texture. Caramelizing the onions deeply is what gives the curry its signature sweetness.",
    serving_suggestions: "Serve with fukujinzuke (red pickled vegetables) on the side.",
    flavor_profile: ["mild", "sweet", "savory", "crispy"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=400&q=80",
    tags: ["Comfort Food", "Katsu", "Popular", "Family Favorite"]
  },
  {
    dish_name: "Salmon Teriyaki",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Main Courses",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 12,
    servings: 4,
    short_description: "Glazy, caramelized salmon fillets in a classic four-ingredient teriyaki sauce — one of Japan's most universally beloved cooking techniques that creates a beautiful, lacquered finish.",
    ingredients: [
      { name: "Salmon fillets", quantity: "4", unit: "pieces" },
      { name: "Soy sauce", quantity: "3", unit: "tbsp" },
      { name: "Mirin", quantity: "3", unit: "tbsp" },
      { name: "Sake", quantity: "2", unit: "tbsp" },
      { name: "Sugar", quantity: "1", unit: "tbsp" },
      { name: "Sesame seeds", quantity: "1", unit: "tbsp" },
      { name: "Spring onions", quantity: "2", unit: "stalks" }
    ],
    preparation_steps: [
      "Pat salmon completely dry — moisture prevents proper caramelization.",
      "Mix soy sauce, mirin, sake and sugar for the teriyaki sauce.",
      "Sear salmon skin-side up in a hot, lightly oiled pan for 3 minutes until golden.",
      "Flip, add teriyaki sauce and cook 4-5 minutes, basting constantly until sauce becomes glossy and caramelized.",
      "Serve over steamed rice with pickled ginger and sesame seeds."
    ],
    chef_notes: "The four-ingredient teriyaki sauce (equal parts soy, mirin, sake with a little sugar) is a Japanese kitchen cornerstone that works for chicken, beef and vegetables too.",
    serving_suggestions: "Serve over Japanese rice with steamed broccoli and miso soup.",
    flavor_profile: ["sweet-savory", "caramelized", "rich", "umami"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&q=80",
    tags: ["Healthy", "Quick", "Classic", "Grilled"]
  },
  {
    dish_name: "Beef Sukiyaki",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "A beloved Japanese hot pot of thinly sliced wagyu beef, tofu, vegetables and glass noodles cooked tableside in a sweet soy-based broth and dipped in raw egg — one of Japan's most ceremonial and indulgent dishes.",
    ingredients: [
      { name: "Thinly sliced beef (wagyu or ribeye)", quantity: "400", unit: "g" },
      { name: "Firm tofu", quantity: "300", unit: "g" },
      { name: "Napa cabbage", quantity: "200", unit: "g" },
      { name: "Shirataki noodles", quantity: "200", unit: "g" },
      { name: "Soy sauce", quantity: "80", unit: "ml" },
      { name: "Mirin", quantity: "80", unit: "ml" },
      { name: "Sake", quantity: "80", unit: "ml" },
      { name: "Sugar", quantity: "3", unit: "tbsp" }
    ],
    preparation_steps: [
      "Prepare warishita sauce by combining soy, mirin, sake and sugar.",
      "Heat a cast iron sukiyaki pan at the table. Sear a few beef slices with a little sugar.",
      "Add warishita sauce, then arrange all vegetables, tofu and noodles around beef.",
      "Simmer until vegetables are tender, adding more sauce as needed.",
      "Each person dips ingredients in lightly beaten raw egg before eating."
    ],
    chef_notes: "The raw egg dip is non-negotiable in authentic sukiyaki — it enriches and slightly cools the hot ingredients, creating a custardy coating. Use the freshest eggs available.",
    serving_suggestions: "Serve as a communal tabletop hot pot at the center of the dining table.",
    flavor_profile: ["sweet-savory", "rich", "umami", "warming"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    tags: ["Hot Pot", "Wagyu", "Special Occasion", "Traditional"]
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    dish_name: "Mochi Ice Cream",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 5,
    servings: 8,
    short_description: "Bite-sized spheres of creamy ice cream wrapped in a pillowy, sweet glutinous rice cake — a Japanese-American innovation that has become one of the most beloved Japanese desserts worldwide.",
    ingredients: [
      { name: "Glutinous rice flour (mochiko)", quantity: "200", unit: "g" },
      { name: "Sugar", quantity: "100", unit: "g" },
      { name: "Water", quantity: "200", unit: "ml" },
      { name: "Vanilla ice cream", quantity: "400", unit: "g" },
      { name: "Potato starch or cornstarch for dusting", quantity: "4", unit: "tbsp" },
      { name: "Food coloring (optional)", quantity: "1", unit: "few drops" }
    ],
    preparation_steps: [
      "Scoop ice cream into small balls, place on parchment and freeze solid (at least 1 hour).",
      "Mix mochiko, sugar and water. Microwave 2 minutes, stir, 2 more minutes until translucent.",
      "Dust work surface with potato starch. Knead mochi until smooth. Cool slightly.",
      "Flatten small mochi rounds, place frozen ice cream ball in center, wrap and seal.",
      "Return to freezer. Remove 5 minutes before serving."
    ],
    chef_notes: "The mochi must be warm and pliable when wrapping — work quickly before it cools and becomes too stiff. The frozen solid ice cream is essential to prevent melting during assembly.",
    serving_suggestions: "Serve in pastel-colored paper cups in a variety of flavors.",
    flavor_profile: ["chewy", "sweet", "creamy", "cold"],
    dietary_tags: ["vegetarian", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
    tags: ["Modern Japanese", "Ice Cream", "Party Dessert", "Chewy"]
  },
  {
    dish_name: "Matcha Cheesecake",
    cuisine: "Japanese",
    country_of_origin: "Japan",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 60,
    servings: 8,
    short_description: "A Japanese-style soufflé cheesecake infused with ceremonial grade matcha — incredibly light, cloud-like in texture, subtly bitter from the green tea and paired with white chocolate for balance.",
    ingredients: [
      { name: "Cream cheese", quantity: "250", unit: "g" },
      { name: "Ceremonial matcha powder", quantity: "3", unit: "tbsp" },
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Sugar", quantity: "100", unit: "g" },
      { name: "Cream", quantity: "100", unit: "ml" },
      { name: "Butter", quantity: "30", unit: "g" },
      { name: "Flour", quantity: "30", unit: "g" }
    ],
    preparation_steps: [
      "Melt cream cheese with butter and cream. Whisk in matcha and flour until smooth.",
      "Add egg yolks one at a time.",
      "Whisk egg whites to stiff peaks, gradually adding sugar.",
      "Gently fold egg whites into cheese mixture in thirds.",
      "Bake in a water bath at 160°C for 60 minutes. Cool in oven with door ajar."
    ],
    chef_notes: "The water bath (bain-marie) is essential — it creates the gentle, even heat that results in the characteristic jiggly, soufflé-like Japanese cheesecake texture.",
    serving_suggestions: "Serve dusted with matcha powder and accompanied by fresh berries and whipped cream.",
    flavor_profile: ["earthy", "sweet", "bitter", "light", "airy"],
    dietary_tags: ["vegetarian"],
    img: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80",
    tags: ["Matcha", "Baked", "Elegant", "Cafe Style"]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
export const thaiCuisineData = [
  // ── APPETIZERS ──────────────────────────────────────────────────────────────
  {
    dish_name: "Chicken Satay with Peanut Sauce",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 30,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Tender coconut-marinated chicken skewers grilled over charcoal and served with a rich, spiced peanut sauce and tangy cucumber relish — Thailand's most exported street food snack.",
    ingredients: [
      { name: "Chicken breast", quantity: "500", unit: "g" },
      { name: "Coconut milk", quantity: "200", unit: "ml" },
      { name: "Turmeric powder", quantity: "1", unit: "tsp" },
      { name: "Lemongrass", quantity: "2", unit: "stalks" },
      { name: "Peanut butter", quantity: "4", unit: "tbsp" },
      { name: "Red curry paste", quantity: "2", unit: "tbsp" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" },
      { name: "Palm sugar", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Slice chicken into thin strips. Marinate with coconut milk, turmeric, lemongrass and fish sauce for 2 hours.",
      "Thread onto pre-soaked bamboo skewers.",
      "Make peanut sauce: simmer coconut milk with red curry paste, peanut butter, fish sauce and palm sugar.",
      "Grill skewers over high heat for 3-4 minutes each side until caramelized.",
      "Serve with warm peanut sauce and fresh cucumber relish."
    ],
    chef_notes: "The turmeric in the marinade gives satay its characteristic golden-yellow color. Real charcoal grilling is what creates the smoky, slightly charred exterior that defines authentic Thai satay.",
    serving_suggestions: "Serve with ajat (cucumber relish in sweetened vinegar) and peanut sauce.",
    flavor_profile: ["savory", "nutty", "aromatic", "slightly smoky"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    tags: ["Street Food", "Grilled", "Classic", "Party Food"]
  },
  {
    dish_name: "Tod Mun Pla (Thai Fish Cakes)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Bouncy, spiced Thai fish cakes made with red curry paste and kaffir lime leaves — a popular street food with a unique springy texture achieved by beating the fish paste until elastic.",
    ingredients: [
      { name: "White fish fillets", quantity: "400", unit: "g" },
      { name: "Red curry paste", quantity: "2", unit: "tbsp" },
      { name: "Kaffir lime leaves, finely sliced", quantity: "4", unit: "pieces" },
      { name: "Long beans, sliced", quantity: "50", unit: "g" },
      { name: "Fish sauce", quantity: "1", unit: "tbsp" },
      { name: "Egg", quantity: "1", unit: "piece" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Oil for frying", quantity: "1", unit: "cup" }
    ],
    preparation_steps: [
      "Process fish fillets in a food processor until a smooth paste.",
      "Add curry paste, fish sauce, egg and sugar. Process until the mixture becomes sticky and elastic.",
      "Stir in kaffir lime leaves and long beans by hand.",
      "Shape into round flat cakes about 1cm thick.",
      "Shallow fry at 175°C for 3 minutes each side until deeply golden. Serve with sweet chili sauce."
    ],
    chef_notes: "The 'beating' of the paste in the processor activates the fish protein and creates the characteristic springy, bouncy texture. Under-mixed paste produces dense, heavy cakes.",
    serving_suggestions: "Serve with sweet chili sauce and a classic cucumber relish.",
    flavor_profile: ["spicy", "aromatic", "springy", "savory"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
    tags: ["Street Food", "Seafood", "Thai Classic", "Appetizer"]
  },
  {
    dish_name: "Miang Kham (Betel Leaf Wraps)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 6,
    short_description: "Thailand's most elegant one-bite appetizer — wild betel or spinach leaves used as edible cups for a collection of fresh ingredients: dried shrimp, roasted coconut, ginger, lime, peanuts and a sweet palm sugar sauce.",
    ingredients: [
      { name: "Fresh betel or spinach leaves", quantity: "24", unit: "pieces" },
      { name: "Dried shrimp", quantity: "3", unit: "tbsp" },
      { name: "Toasted coconut", quantity: "4", unit: "tbsp" },
      { name: "Fresh ginger, diced", quantity: "3", unit: "tbsp" },
      { name: "Lime, diced with skin", quantity: "1", unit: "piece" },
      { name: "Roasted peanuts", quantity: "3", unit: "tbsp" },
      { name: "Palm sugar", quantity: "3", unit: "tbsp" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Make the sweet sauce: cook palm sugar, fish sauce and dried shrimp in a pan until thick.",
      "Prepare all fresh ingredients into small, uniform pieces.",
      "Arrange betel leaves in a cup shape on a serving platter.",
      "Fill each leaf with a selection of all ingredients.",
      "Add a small spoonful of the sweet sauce and fold leaf around the filling to eat in one bite."
    ],
    chef_notes: "Miang Kham is designed to be eaten in one or two bites — the explosion of six different flavors (bitter, sour, salty, sweet, spicy, savory) simultaneously is the whole point of the dish.",
    serving_suggestions: "Serve as an elaborate cocktail snack or elegant party appetizer.",
    flavor_profile: ["complex", "fresh", "sweet-sour-spicy", "aromatic"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    tags: ["Elegant", "Traditional", "Party Food", "One-Bite"]
  },

  // ── SOUPS ────────────────────────────────────────────────────────────────────
  {
    dish_name: "Tom Yum Goong (Spicy Prawn Soup)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Thailand's most iconic soup — a fiery, sour broth fragrant with lemongrass, galangal, kaffir lime leaves and fresh chilies, loaded with plump prawns. A UNESCO-recognized culinary treasure.",
    ingredients: [
      { name: "Tiger prawns", quantity: "400", unit: "g" },
      { name: "Lemongrass", quantity: "3", unit: "stalks" },
      { name: "Galangal", quantity: "5", unit: "slices" },
      { name: "Kaffir lime leaves", quantity: "6", unit: "pieces" },
      { name: "Bird's eye chilies", quantity: "5", unit: "pieces" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Lime juice", quantity: "4", unit: "tbsp" },
      { name: "Straw mushrooms", quantity: "150", unit: "g" }
    ],
    preparation_steps: [
      "Bruise lemongrass, galangal and kaffir lime leaves. Simmer in water 10 minutes to infuse.",
      "Add mushrooms and whole chilies to the broth.",
      "Add prawns and cook 3 minutes until just cooked through.",
      "Remove from heat. Season with fish sauce and lime juice — add these OFF the heat.",
      "Garnish with coriander and serve immediately."
    ],
    chef_notes: "The four aromatics (lemongrass, galangal, kaffir lime leaves, chilies) are bruised rather than chopped — they flavor the broth but are NOT eaten. Add fish sauce and lime juice after removing from heat to preserve their fresh brightness.",
    serving_suggestions: "Serve in individual bowls with steamed jasmine rice alongside.",
    flavor_profile: ["sour", "spicy", "aromatic", "citrusy"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&q=80",
    tags: ["Iconic", "Spicy", "Street Food", "UNESCO Heritage"]
  },
  {
    dish_name: "Tom Kha Gai (Coconut Chicken Soup)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "The gentler, creamier sibling of Tom Yum — a fragrant coconut milk broth with chicken, galangal and mushrooms, brightened with lime and fish sauce. Rich, mellow and deeply comforting.",
    ingredients: [
      { name: "Chicken thighs, sliced", quantity: "400", unit: "g" },
      { name: "Coconut milk", quantity: "400", unit: "ml" },
      { name: "Chicken broth", quantity: "400", unit: "ml" },
      { name: "Galangal", quantity: "5", unit: "slices" },
      { name: "Lemongrass", quantity: "2", unit: "stalks" },
      { name: "Kaffir lime leaves", quantity: "5", unit: "pieces" },
      { name: "Oyster mushrooms", quantity: "150", unit: "g" },
      { name: "Fish sauce and lime juice", quantity: "3", unit: "tbsp each" }
    ],
    preparation_steps: [
      "Bring coconut milk and broth to a gentle simmer. Add bruised aromatics.",
      "Infuse 10 minutes on low heat.",
      "Add chicken and mushrooms. Simmer gently 8-10 minutes.",
      "Remove from heat. Season with fish sauce, lime juice and a pinch of sugar.",
      "Serve garnished with coriander and fresh red chili slices."
    ],
    chef_notes: "Never boil coconut milk vigorously — gentle simmering keeps it smooth and creamy. Boiling causes it to break and become grainy.",
    serving_suggestions: "Serve as a soup course or over steamed rice as a light main meal.",
    flavor_profile: ["creamy", "aromatic", "mildly spicy", "tangy"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
    tags: ["Comfort Food", "Coconut", "Mild", "Classic"]
  },

  // ── SALADS ───────────────────────────────────────────────────────────────────
  {
    dish_name: "Som Tum (Green Papaya Salad)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "The national salad of Thailand — shredded unripe green papaya pounded with garlic, chilies, fish sauce, lime and palm sugar in a traditional wooden mortar. Bold, crunchy, fiery and refreshing.",
    ingredients: [
      { name: "Green papaya", quantity: "400", unit: "g" },
      { name: "Bird's eye chilies", quantity: "3", unit: "pieces" },
      { name: "Garlic", quantity: "3", unit: "cloves" },
      { name: "Cherry tomatoes", quantity: "6", unit: "pieces" },
      { name: "Long beans", quantity: "60", unit: "g" },
      { name: "Dried shrimp", quantity: "2", unit: "tbsp" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" },
      { name: "Lime juice", quantity: "3", unit: "tbsp" },
      { name: "Palm sugar", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Peel and julienne green papaya using a shredder or cleaver technique.",
      "Pound garlic and chilies in a large mortar until broken.",
      "Add long beans and tomatoes, bruise gently (don't pulverize).",
      "Add papaya, dried shrimp, fish sauce, lime and palm sugar. Pound and toss repeatedly.",
      "Taste for the balance of spicy, sour, sweet and salty. Serve with sticky rice."
    ],
    chef_notes: "Som Tum should be pounded, not stirred — the bruising action releases the aromatic compounds. The flavor balance of spicy-sour-sweet-salty-savory is key: adjust until all four are present simultaneously.",
    serving_suggestions: "Serve with sticky rice and grilled chicken (khao niao and gai yang).",
    flavor_profile: ["spicy", "sour", "sweet", "crunchy", "fresh"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80",
    tags: ["Isaan", "National Dish", "Street Food", "Healthy"]
  },
  {
    dish_name: "Larb Gai (Spicy Chicken Salad)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Thailand's sacred national 'salad' — minced chicken tossed with toasted rice powder, fish sauce, lime, dried chilies and fresh herbs. Served at room temperature, it is the definitive dish of Northeastern Thailand.",
    ingredients: [
      { name: "Ground chicken", quantity: "400", unit: "g" },
      { name: "Uncooked rice", quantity: "3", unit: "tbsp" },
      { name: "Dried red chilies", quantity: "3", unit: "pieces" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Lime juice", quantity: "4", unit: "tbsp" },
      { name: "Shallots, sliced", quantity: "4", unit: "pieces" },
      { name: "Fresh mint and coriander", quantity: "1", unit: "large bunch" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Dry-toast uncooked rice in a pan until golden. Grind coarsely — this is khao khua (toasted rice powder).",
      "Toast dried chilies briefly and grind.",
      "Cook ground chicken with a little water — do not add oil. Cook until just done.",
      "Remove from heat. Add fish sauce, lime juice, shallots, toasted rice powder and dried chili.",
      "Fold in fresh herbs. Serve at room temperature with fresh vegetables."
    ],
    chef_notes: "Toasted rice powder (khao khua) is the defining ingredient of larb — it adds a nutty crunch that is impossible to replicate with anything else. Make it fresh for each batch.",
    serving_suggestions: "Serve with sticky rice, raw cabbage, mint and long beans.",
    flavor_profile: ["sour", "herby", "savory", "toasty", "fresh"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80",
    tags: ["Isaan", "National Salad", "Healthy", "Low Fat"]
  },

  // ── MAIN COURSES ─────────────────────────────────────────────────────────────
  {
    dish_name: "Pad Thai",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Thailand's national noodle dish — flat rice noodles stir-fried over high heat with eggs, tofu or shrimp, in a sweet-savory tamarind-based sauce, topped with bean sprouts, peanuts and a squeeze of lime.",
    ingredients: [
      { name: "Flat rice noodles (sen lek)", quantity: "400", unit: "g" },
      { name: "Tiger shrimp", quantity: "200", unit: "g" },
      { name: "Firm tofu", quantity: "150", unit: "g" },
      { name: "Eggs", quantity: "3", unit: "pieces" },
      { name: "Tamarind paste", quantity: "3", unit: "tbsp" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Palm sugar", quantity: "2", unit: "tbsp" },
      { name: "Bean sprouts and roasted peanuts", quantity: "1", unit: "portion" }
    ],
    preparation_steps: [
      "Soak rice noodles in room-temp water 30 minutes until pliable but not soft.",
      "Mix tamarind, fish sauce and palm sugar for the Pad Thai sauce.",
      "Wok-fry tofu until golden. Push to side, fry shrimp briefly. Push aside.",
      "Add noodles and sauce. Toss on high heat until noodles absorb liquid.",
      "Push to side, scramble eggs, mix with noodles. Serve topped with bean sprouts, peanuts, lime and dried chili."
    ],
    chef_notes: "Wok hei (breath of the wok) requires extremely high heat — this is why restaurant Pad Thai tastes different. Cook in small portions at the highest heat to achieve the characteristic char and smokiness.",
    serving_suggestions: "Serve with a small dish of fish sauce, sugar, dried chili and vinegar for self-seasoning.",
    flavor_profile: ["sweet", "sour", "savory", "nutty", "smoky"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&q=80",
    tags: ["National Dish", "Street Food", "Noodles", "Iconic"]
  },
  {
    dish_name: "Thai Green Curry (Gaeng Keow Wan)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 20,
    cook_time_minutes: 25,
    servings: 4,
    short_description: "The jewel of Thai cuisine — chicken or vegetables in a vibrant, aromatic green curry sauce made from fresh green chilies, lemongrass, galangal and coconut milk. The greenest, most fragrant of all Thai curries.",
    ingredients: [
      { name: "Chicken thighs", quantity: "500", unit: "g" },
      { name: "Coconut milk", quantity: "400", unit: "ml" },
      { name: "Green curry paste", quantity: "3", unit: "tbsp" },
      { name: "Thai eggplants", quantity: "200", unit: "g" },
      { name: "Kaffir lime leaves", quantity: "6", unit: "pieces" },
      { name: "Fish sauce", quantity: "3", unit: "tbsp" },
      { name: "Palm sugar", quantity: "1", unit: "tbsp" },
      { name: "Thai basil leaves", quantity: "1", unit: "large handful" }
    ],
    preparation_steps: [
      "Fry green curry paste in thick coconut cream skimmed from the top of the can, until oil separates.",
      "Add chicken and cook until no longer pink on outside.",
      "Add remaining coconut milk and eggplants. Simmer 15 minutes.",
      "Season with fish sauce and palm sugar. Tear in kaffir lime leaves.",
      "Remove from heat and fold in fresh Thai basil. Serve with jasmine rice."
    ],
    chef_notes: "Frying the curry paste in thick coconut cream (not oil) is the authentic technique — it 'blooms' the paste and creates a richer, more deeply flavored curry. Thai basil goes in at the very end, off the heat.",
    serving_suggestions: "Serve with steamed jasmine rice and a refreshing cucumber salad.",
    flavor_profile: ["aromatic", "creamy", "spicy", "fresh", "herby"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&q=80",
    tags: ["Iconic", "Curry", "Coconut", "Aromatic"]
  },
  {
    dish_name: "Khao Pad (Thai Fried Rice)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Main Courses",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 10,
    servings: 4,
    short_description: "Thailand's everyday fried rice — a rapid wok-tossed dish of day-old jasmine rice with egg, vegetables and your choice of protein in an umami-rich oyster and fish sauce seasoning.",
    ingredients: [
      { name: "Day-old jasmine rice", quantity: "4", unit: "cups" },
      { name: "Eggs", quantity: "3", unit: "pieces" },
      { name: "Prawns or chicken", quantity: "300", unit: "g" },
      { name: "Garlic", quantity: "4", unit: "cloves" },
      { name: "Oyster sauce", quantity: "2", unit: "tbsp" },
      { name: "Fish sauce", quantity: "2", unit: "tbsp" },
      { name: "Spring onions and tomatoes", quantity: "1", unit: "portion" },
      { name: "White sugar", quantity: "1", unit: "tsp" }
    ],
    preparation_steps: [
      "Get wok screaming hot. Fry minced garlic in oil until golden.",
      "Add protein and cook quickly on high heat.",
      "Push to sides, crack eggs into center and scramble partially.",
      "Add rice and break up clumps while stir-frying vigorously.",
      "Season with oyster sauce, fish sauce and sugar. Serve with lime wedge and cucumber."
    ],
    chef_notes: "Day-old refrigerated rice is essential — fresh rice has too much moisture and creates a mushy result. Each grain should be separate after frying. Maximum heat is critical throughout.",
    serving_suggestions: "Serve with fresh cucumber slices, spring onions, lime wedge and fish sauce chili.",
    flavor_profile: ["savory", "umami", "smoky", "simple"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80",
    tags: ["Everyday", "Street Food", "Quick", "Wok"]
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    dish_name: "Mango Sticky Rice (Khao Niao Mamuang)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Desserts",
    difficulty_level: "easy",
    prep_time_minutes: 30,
    cook_time_minutes: 30,
    servings: 4,
    short_description: "Thailand's most celebrated dessert — sweet, fragrant coconut sticky rice paired with perfectly ripe Nam Dok Mai mangoes and drizzled with sweet coconut cream. Simple perfection in every bite.",
    ingredients: [
      { name: "Glutinous rice", quantity: "400", unit: "g" },
      { name: "Ripe mangoes", quantity: "4", unit: "pieces" },
      { name: "Coconut milk", quantity: "400", unit: "ml" },
      { name: "Sugar", quantity: "5", unit: "tbsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Toasted sesame seeds or mung beans", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Soak glutinous rice 6-8 hours or overnight. Steam for 25-30 minutes until translucent.",
      "Warm coconut milk with sugar and salt until dissolved. Do not boil.",
      "Remove rice from steamer and immediately mix with 3/4 of the coconut sauce.",
      "Let rice absorb sauce for 15 minutes — it will become creamy and sticky.",
      "Serve alongside sliced ripe mango, drizzled with remaining coconut sauce and sprinkled with sesame seeds."
    ],
    chef_notes: "The rice absorbs the coconut sauce best when it's still hot from the steamer — this is when the starches are most receptive. Wait for the rice to cool to room temperature before serving.",
    serving_suggestions: "Serve at room temperature alongside chilled, sliced ripe mango.",
    flavor_profile: ["sweet", "creamy", "tropical", "fragrant"],
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
    tags: ["Iconic", "Summer Dessert", "Traditional", "Simple"]
  },
  {
    dish_name: "Khanom Krok (Coconut Pancakes)",
    cuisine: "Thai",
    country_of_origin: "Thailand",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 15,
    cook_time_minutes: 15,
    servings: 6,
    short_description: "Tiny, soft Thai street dessert pancakes made in a special cast iron pan — a crispy coconut rice flour base with a creamy, slightly savory coconut custard center. The contrast of textures is enchanting.",
    ingredients: [
      { name: "Rice flour", quantity: "150", unit: "g" },
      { name: "Coconut milk", quantity: "300", unit: "ml" },
      { name: "Coconut cream", quantity: "150", unit: "ml" },
      { name: "Sugar", quantity: "3", unit: "tbsp" },
      { name: "Salt", quantity: "0.5", unit: "tsp" },
      { name: "Spring onion greens", quantity: "2", unit: "stalks" },
      { name: "Corn kernels", quantity: "3", unit: "tbsp" }
    ],
    preparation_steps: [
      "Make base batter: rice flour with half the coconut milk and sugar.",
      "Make top batter: coconut cream with a pinch of salt.",
      "Heat khanom krok pan (hemispherical moulds) and grease well.",
      "Fill 3/4 full with base batter. Cook until edges set.",
      "Add a spoonful of coconut cream topping with corn or spring onion. Cover and cook until custard just sets."
    ],
    chef_notes: "The half-savory, half-sweet character of khanom krok is intentional — Thai desserts often play with this contrast. The salt in the coconut cream topping amplifies the sweetness.",
    serving_suggestions: "Serve fresh from the pan, two per serving, as an afternoon snack.",
    flavor_profile: ["sweet", "creamy", "coconutty", "slightly salty"],
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
    tags: ["Street Dessert", "Traditional", "Coconut", "Sweet"]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
export const koreanCuisineData = [
  // ── APPETIZERS ──────────────────────────────────────────────────────────────
  {
    dish_name: "Pajeon (Korean Scallion Pancakes)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Crispy-edged, chewy-centered Korean savory pancakes stuffed with bundles of spring onions — traditionally eaten on rainy days with makgeolli rice wine. A beloved Korean comfort food snack.",
    ingredients: [
      { name: "Spring onions", quantity: "8", unit: "bunches" },
      { name: "All-purpose flour", quantity: "150", unit: "g" },
      { name: "Cornstarch", quantity: "50", unit: "g" },
      { name: "Ice cold water", quantity: "200", unit: "ml" },
      { name: "Egg", quantity: "1", unit: "piece" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Rice vinegar", quantity: "1", unit: "tbsp" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Cut spring onions into 15cm lengths.",
      "Make a thin batter with flour, cornstarch, ice cold water and egg — lumps are fine.",
      "Dip spring onion bundles in batter. Lay flat in a thin layer in an oiled pan.",
      "Fry on medium-high heat until golden and crispy on one side. Flip carefully.",
      "Serve with soy-vinegar dipping sauce mixed with sesame oil and sesame seeds."
    ],
    chef_notes: "Ice cold water and NOT over-mixing the batter creates the characteristic light, crispy texture. Over-mixing develops gluten and makes the pancake doughy rather than crunchy.",
    serving_suggestions: "Serve with makgeolli (Korean rice wine) or cold beer on a rainy day.",
    flavor_profile: ["savory", "oniony", "crispy", "chewy"],
    dietary_tags: ["vegetarian", "dairy-free"],
    img: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80",
    tags: ["Comfort Food", "Rainy Day", "Vegetarian", "Street Food"]
  },
  {
    dish_name: "Japchae (Glass Noodle Stir-Fry)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Appetizers",
    difficulty_level: "medium",
    prep_time_minutes: 30,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Silky sweet potato glass noodles stir-fried with colorful vegetables, spinach and beef in a sweet sesame-soy sauce — Korea's most popular party dish and a staple at every celebration.",
    ingredients: [
      { name: "Sweet potato glass noodles (dangmyeon)", quantity: "200", unit: "g" },
      { name: "Beef sirloin, julienned", quantity: "200", unit: "g" },
      { name: "Spinach", quantity: "150", unit: "g" },
      { name: "Carrots", quantity: "1", unit: "medium" },
      { name: "Shiitake mushrooms", quantity: "4", unit: "pieces" },
      { name: "Sesame oil", quantity: "3", unit: "tbsp" },
      { name: "Soy sauce", quantity: "3", unit: "tbsp" },
      { name: "Sugar", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Cook noodles in boiling water 6 minutes. Rinse and cut into shorter lengths. Season with soy sauce, sesame oil and sugar.",
      "Cook each vegetable separately in a wok with sesame oil — they all have different cooking times.",
      "Marinate beef in soy sauce, sugar, garlic and sesame oil. Stir-fry quickly.",
      "Combine noodles with all cooked vegetables and beef. Toss with additional sesame oil and soy sauce.",
      "Serve at room temperature garnished with egg omelette strips and sesame seeds."
    ],
    chef_notes: "Cooking each ingredient separately before combining is the Korean technique that prevents everything from turning into one grey mass. The noodles should be well-seasoned on their own before mixing.",
    serving_suggestions: "Serve at room temperature as a party banchan or main course.",
    flavor_profile: ["sweet-savory", "silky", "sesame", "colorful"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
    tags: ["Party Food", "Celebration", "Glass Noodles", "Classic"]
  },
  {
    dish_name: "Tteokbokki (Spicy Rice Cakes)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Appetizers",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Korea's most beloved street food — chewy cylindrical rice cakes in a fiery, slightly sweet gochujang sauce. Served sizzling from street stalls across Seoul, they are addictive, satisfying and impossible to stop eating.",
    ingredients: [
      { name: "Garaetteok (cylinder rice cakes)", quantity: "400", unit: "g" },
      { name: "Gochujang", quantity: "4", unit: "tbsp" },
      { name: "Gochugaru (Korean chili flakes)", quantity: "1", unit: "tbsp" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" },
      { name: "Sugar", quantity: "2", unit: "tbsp" },
      { name: "Fish cakes", quantity: "200", unit: "g" },
      { name: "Dashi or anchovy broth", quantity: "400", unit: "ml" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Separate rice cakes by soaking in cold water 10 minutes if fresh, or as per pack if frozen.",
      "Bring anchovy broth to a boil. Add gochujang, gochugaru, soy sauce and sugar.",
      "Add rice cakes and fish cakes. Cook on medium heat 10-12 minutes, stirring often.",
      "Sauce will thicken as rice cakes cook and release starch.",
      "Serve in bowls garnished with spring onions and a hard-boiled egg."
    ],
    chef_notes: "The sauce needs constant stirring — rice cakes stick together and to the pan easily. The starch released from the rice cakes naturally thickens the sauce to the right glossy consistency.",
    serving_suggestions: "Serve piping hot as street food with fish cakes and boiled eggs.",
    flavor_profile: ["spicy", "chewy", "sweet-savory", "addictive"],
    dietary_tags: ["dairy-free"],
    img: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80",
    tags: ["Street Food", "Iconic", "Spicy", "Comfort Food"]
  },

  // ── SOUPS ────────────────────────────────────────────────────────────────────
  {
    dish_name: "Kimchi Jjigae (Kimchi Stew)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 30,
    servings: 4,
    short_description: "Korea's most comforting stew — well-fermented kimchi cooked with pork and tofu in a rich, spicy-sour broth. The cornerstone of Korean home cooking, made from leftovers and eaten with every meal.",
    ingredients: [
      { name: "Aged kimchi", quantity: "400", unit: "g" },
      { name: "Pork belly, sliced", quantity: "200", unit: "g" },
      { name: "Firm tofu", quantity: "300", unit: "g" },
      { name: "Gochujang", quantity: "2", unit: "tbsp" },
      { name: "Gochugaru", quantity: "1", unit: "tbsp" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" },
      { name: "Sesame oil", quantity: "1", unit: "tbsp" },
      { name: "Water or dashi", quantity: "500", unit: "ml" }
    ],
    preparation_steps: [
      "Fry pork belly in a heavy pot until fat renders. Add kimchi and cook 5 minutes.",
      "Add gochujang, gochugaru and soy sauce. Fry 2 minutes more.",
      "Add water to cover. Bring to a boil and simmer 20 minutes.",
      "Add tofu cut into cubes. Simmer 5 minutes more.",
      "Finish with sesame oil and spring onions. Serve directly from pot at the table."
    ],
    chef_notes: "The more fermented the kimchi, the better the jjigae. Use kimchi that's been in the fridge for at least 3-4 weeks — the fermented sourness is what makes the broth extraordinary.",
    serving_suggestions: "Serve bubbling at the table with steamed rice and small banchan dishes.",
    flavor_profile: ["spicy", "sour", "savory", "rich", "fermented"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
    tags: ["Comfort Food", "Fermented", "Everyday", "Traditional"]
  },
  {
    dish_name: "Doenjang Jjigae (Soybean Paste Stew)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Soups",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Korea's most beloved everyday stew — a deeply savory, pungent broth made from fermented soybean paste with zucchini, potato, mushrooms and silken tofu. More complex than miso soup and deeply nourishing.",
    ingredients: [
      { name: "Doenjang (fermented soybean paste)", quantity: "3", unit: "tbsp" },
      { name: "Anchovy and kelp broth", quantity: "600", unit: "ml" },
      { name: "Zucchini", quantity: "1", unit: "medium" },
      { name: "Potato", quantity: "1", unit: "medium" },
      { name: "Firm tofu", quantity: "200", unit: "g" },
      { name: "Shiitake mushrooms", quantity: "4", unit: "pieces" },
      { name: "Garlic", quantity: "3", unit: "cloves" },
      { name: "Green chili", quantity: "1", unit: "piece" }
    ],
    preparation_steps: [
      "Make anchovy-kelp broth by simmering dried anchovies and kelp 15 minutes. Strain.",
      "Dissolve doenjang in the broth. Add crushed garlic.",
      "Add potato cubes first (they take longest). After 5 minutes add zucchini and mushrooms.",
      "Add tofu and green chili. Simmer 5 more minutes.",
      "Taste and adjust with more doenjang if needed. Serve immediately with rice."
    ],
    chef_notes: "The anchovy-kelp broth base is fundamental — this is what separates Korean doenjang jjigae from Japanese miso soup. The funkiness of the fermented doenjang should be prominent, not subtle.",
    serving_suggestions: "A non-negotiable part of every Korean meal alongside steamed rice.",
    flavor_profile: ["pungent", "savory", "fermented", "earthy", "warming"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    tags: ["Everyday", "Traditional", "Fermented", "Healthy"]
  },

  // ── SALADS ───────────────────────────────────────────────────────────────────
  {
    dish_name: "Kongnamul Muchim (Seasoned Soybean Sprouts)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 5,
    cook_time_minutes: 5,
    servings: 4,
    short_description: "A crisp, refreshing Korean banchan (side dish) of blanched soybean sprouts dressed with sesame oil, garlic and gochugaru — simple, nutritious and present at virtually every Korean meal.",
    ingredients: [
      { name: "Soybean sprouts", quantity: "400", unit: "g" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Garlic, minced", quantity: "3", unit: "cloves" },
      { name: "Gochugaru (Korean chili flakes)", quantity: "1", unit: "tsp" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" },
      { name: "Salt", quantity: "0.5", unit: "tsp" },
      { name: "Sesame seeds", quantity: "1", unit: "tbsp" },
      { name: "Spring onions", quantity: "2", unit: "stalks" }
    ],
    preparation_steps: [
      "Blanch soybean sprouts in boiling salted water 2-3 minutes. Drain and rinse in cold water.",
      "Squeeze out excess water.",
      "Mix with sesame oil, soy sauce, garlic, gochugaru and salt.",
      "Toss well and let rest 5 minutes for flavors to meld.",
      "Garnish with sesame seeds and spring onions."
    ],
    chef_notes: "Never lift the lid during blanching — steam is what cooks the sprouts evenly. Over-cooking makes them mushy; under-cooking leaves a raw, beany flavor.",
    serving_suggestions: "Serve as banchan alongside rice, kimchi and other side dishes.",
    flavor_profile: ["fresh", "nutty", "slightly spicy", "sesame"],
    dietary_tags: ["vegetarian", "vegan", "dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    tags: ["Banchan", "Side Dish", "Healthy", "Quick"]
  },
  {
    dish_name: "Sigeumchi Namul (Korean Spinach Salad)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Salads",
    difficulty_level: "easy",
    prep_time_minutes: 10,
    cook_time_minutes: 2,
    servings: 4,
    short_description: "Delicately seasoned blanched spinach with a sesame-garlic dressing — one of the most essential Korean banchan dishes. Simple in ingredients yet extraordinary in flavor, it's a cornerstone of bibimbap and every Korean table.",
    ingredients: [
      { name: "Fresh spinach", quantity: "400", unit: "g" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Garlic, minced", quantity: "2", unit: "cloves" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" },
      { name: "Sesame seeds", quantity: "1", unit: "tbsp" },
      { name: "Spring onions", quantity: "1", unit: "stalk" }
    ],
    preparation_steps: [
      "Blanch spinach in boiling water for 30-45 seconds only.",
      "Plunge immediately into ice water to stop cooking and preserve color.",
      "Squeeze all water firmly — the spinach should be as dry as possible.",
      "Season with sesame oil, soy sauce, garlic and sesame seeds.",
      "Toss and serve at room temperature as a banchan."
    ],
    chef_notes: "The brief blanching and ice bath is the key technique — it maintains the vivid green color and silky texture. Squeezing dry is essential so the dressing coats rather than sits in water.",
    serving_suggestions: "Serve as part of a bibimbap or alongside rice as a classic banchan.",
    flavor_profile: ["silky", "savory", "sesame", "garlic"],
    dietary_tags: ["vegetarian", "vegan", "dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
    tags: ["Banchan", "Healthy", "Bibimbap", "Traditional"]
  },

  // ── MAIN COURSES ─────────────────────────────────────────────────────────────
  {
    dish_name: "Bibimbap",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 40,
    cook_time_minutes: 20,
    servings: 4,
    short_description: "Korea's most famous dish — 'mixed rice' of warm steamed rice topped with an artful arrangement of seasoned vegetables, gochujang-marinated beef, a fried egg and sesame oil, served in a scorching stone bowl.",
    ingredients: [
      { name: "Steamed white rice", quantity: "4", unit: "cups" },
      { name: "Beef sirloin, minced", quantity: "200", unit: "g" },
      { name: "Eggs", quantity: "4", unit: "pieces" },
      { name: "Assorted vegetables (spinach, carrot, zucchini, mushrooms)", quantity: "400", unit: "g" },
      { name: "Gochujang", quantity: "4", unit: "tbsp" },
      { name: "Sesame oil", quantity: "3", unit: "tbsp" },
      { name: "Soy sauce", quantity: "2", unit: "tbsp" },
      { name: "Sesame seeds", quantity: "2", unit: "tbsp" }
    ],
    preparation_steps: [
      "Marinate beef in soy sauce, sesame oil, garlic and gochujang. Cook in a hot pan.",
      "Season each vegetable separately with sesame oil and salt.",
      "Heat stone bowls (dolsot) until very hot. Coat with sesame oil and add rice.",
      "Arrange vegetables and beef in sections over rice like spokes of a wheel.",
      "Top with a fried egg. Serve with gochujang sauce. Mix everything together before eating."
    ],
    chef_notes: "The dolsot (stone bowl) should be screaming hot before adding rice — this creates the crunchy scorched rice crust (nurungji) at the bottom that is the most coveted part of dolsot bibimbap.",
    serving_suggestions: "Serve in heated stone bowls (dolsot) — the heat creates the legendary crusty rice bottom.",
    flavor_profile: ["complex", "nutty", "spicy", "savory", "varied textures"],
    dietary_tags: ["gluten-free", "dairy-free"],
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
    tags: ["National Dish", "Iconic", "Stone Bowl", "Balanced"]
  },
  {
    dish_name: "Korean BBQ Beef Short Ribs (Galbi)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Main Courses",
    difficulty_level: "medium",
    prep_time_minutes: 480,
    cook_time_minutes: 15,
    servings: 4,
    short_description: "Cross-cut beef short ribs marinated in a sweet pear-soy marinade and grilled at the table — the most indulgent and beloved expression of Korean BBQ. The pear enzymes tenderize the beef to extraordinary tenderness.",
    ingredients: [
      { name: "Beef short ribs, cross-cut (flanken style)", quantity: "1", unit: "kg" },
      { name: "Asian pear", quantity: "1", unit: "medium" },
      { name: "Soy sauce", quantity: "100", unit: "ml" },
      { name: "Sugar", quantity: "3", unit: "tbsp" },
      { name: "Sesame oil", quantity: "2", unit: "tbsp" },
      { name: "Garlic", quantity: "6", unit: "cloves" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Spring onions", quantity: "3", unit: "stalks" }
    ],
    preparation_steps: [
      "Soak ribs in cold water 1-2 hours to remove blood, changing water once.",
      "Blend pear with garlic, ginger, soy sauce, sugar and sesame oil.",
      "Marinate ribs in pear mixture for 6-8 hours minimum, overnight is ideal.",
      "Grill over high charcoal heat 3-4 minutes each side until caramelized and charred.",
      "Serve with lettuce cups, fermented kimchi, sliced garlic and ssamjang paste."
    ],
    chef_notes: "The grated pear (or kiwi) in the marinade is essential — it contains enzymes that break down tough meat fibers, making the short ribs extraordinarily tender. Never skip this ingredient.",
    serving_suggestions: "Serve grilled at the table, wrapped in perilla or lettuce leaves with kimchi and ssamjang.",
    flavor_profile: ["sweet", "savory", "caramelized", "smoky", "tender"],
    dietary_tags: ["dairy-free", "gluten-free"],
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    tags: ["BBQ", "Special Occasion", "Marinated", "Iconic"]
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    dish_name: "Bingsu (Korean Shaved Ice)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Desserts",
    difficulty_level: "easy",
    prep_time_minutes: 15,
    cook_time_minutes: 0,
    servings: 4,
    short_description: "Korea's most beloved summer dessert — finely shaved milk ice with sweet red bean paste, mochi, fresh fruit and condensed milk. The ice is shaved so finely it melts instantly on the tongue like snow.",
    ingredients: [
      { name: "Whole milk, frozen in block", quantity: "500", unit: "ml" },
      { name: "Sweet red bean paste (pat)", quantity: "4", unit: "tbsp" },
      { name: "Mochi pieces", quantity: "100", unit: "g" },
      { name: "Fresh strawberries or mango", quantity: "200", unit: "g" },
      { name: "Condensed milk", quantity: "4", unit: "tbsp" },
      { name: "Fruit sauce or syrup", quantity: "3", unit: "tbsp" }
    ],
    preparation_steps: [
      "Freeze full-fat milk in shallow containers overnight until completely solid.",
      "Shave frozen milk using a bingsu machine or food processor with shaving blade.",
      "Pile shaved ice high in a bowl like a mountain.",
      "Top with sweet red bean paste, chewy mochi pieces and fresh fruit.",
      "Drizzle with condensed milk and fruit syrup."
    ],
    chef_notes: "True Korean bingsu uses milk ice, not water ice — this creates the characteristic silky, snow-like texture that melts on the tongue. Water ice creates a gritty, icy result.",
    serving_suggestions: "Serve immediately in a large shared bowl — bingsu waits for no one.",
    flavor_profile: ["sweet", "creamy", "cold", "fresh"],
    dietary_tags: ["vegetarian", "gluten-free"],
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
    tags: ["Summer Dessert", "Iconic", "Street Food", "Sharing"]
  },
  {
    dish_name: "Hotteok (Sweet Pancakes)",
    cuisine: "Korean",
    country_of_origin: "Korea",
    category: "Desserts",
    difficulty_level: "medium",
    prep_time_minutes: 90,
    cook_time_minutes: 15,
    servings: 6,
    short_description: "Korea's iconic winter street food — fluffy yeast pancakes filled with a cinnamon brown sugar and walnut filling that becomes a molten caramel when fried. Seoul's beloved winter warmer, served piping hot.",
    ingredients: [
      { name: "All-purpose flour", quantity: "300", unit: "g" },
      { name: "Instant yeast", quantity: "5", unit: "g" },
      { name: "Brown sugar", quantity: "100", unit: "g" },
      { name: "Cinnamon", quantity: "2", unit: "tsp" },
      { name: "Walnuts, chopped", quantity: "60", unit: "g" },
      { name: "Sugar", quantity: "2", unit: "tbsp" },
      { name: "Warm water", quantity: "200", unit: "ml" },
      { name: "Oil for frying", quantity: "4", unit: "tbsp" }
    ],
    preparation_steps: [
      "Make dough with flour, yeast, sugar and warm water. Knead and rest 1 hour.",
      "Mix brown sugar, cinnamon and chopped walnuts for filling.",
      "Flatten a ball of dough, place filling in center, gather edges and seal into a ball.",
      "Place in hot oiled pan, press flat with a spatula.",
      "Fry 2-3 minutes each side until golden. The filling will become liquid caramel inside."
    ],
    chef_notes: "The molten caramel filling is dangerously hot — warn guests before eating! The filling liquefies completely during frying. Eat carefully or wait 1-2 minutes after serving.",
    serving_suggestions: "Serve hot from the pan as a winter street food treat.",
    flavor_profile: ["sweet", "cinnamon", "caramel", "chewy"],
    dietary_tags: ["vegetarian", "dairy-free"],
    img: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=400&q=80",
    tags: ["Winter Street Food", "Sweet", "Seoul", "Comfort"]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
export const vietnameseCuisineData = [
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
    tags: ["French Fusion", "Chilled", "Caramel", "Colonial Heritage"]
  }
];
