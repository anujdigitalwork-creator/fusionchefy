import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChefHat, Star, Clock, Users, ArrowRight, Heart, Share2, Info, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

// --- Mock Data ---
const cuisineTypes = [
  { id: 'italian', name: 'Italian', icon: '🍝', description: 'Pasta, pizza, and rich flavors from Italy', color: 'from-red-500 to-orange-500' },
  { id: 'indian', name: 'Indian', icon: '🍛', description: 'Spicy curries and aromatic biryanis', color: 'from-yellow-500 to-orange-500' },
  { id: 'chinese', name: 'Chinese', icon: '🥟', description: 'Dim sum, stir-fries, and noodle dishes', color: 'from-red-600 to-red-800' },
  { id: 'mexican', name: 'Mexican', icon: '🌮', description: 'Tacos, burritos, and zesty salsas', color: 'from-green-500 to-red-500' },
  { id: 'japanese', name: 'Japanese', icon: '🍣', description: 'Sushi, ramen, and delicate flavors', color: 'from-pink-400 to-red-500' },
  { id: 'french', name: 'French', icon: '🥐', description: 'Pastries, sauces, and fine dining', color: 'from-blue-400 to-indigo-500' },
  { id: 'thai', name: 'Thai', icon: '🍜', description: 'Sweet, sour, salty, and spicy balance', color: 'from-purple-500 to-pink-500' },
  { id: 'mediterranean', name: 'Mediterranean', icon: '🥗', description: 'Fresh olive oil, grains, and seafood', color: 'from-teal-400 to-blue-500' },
];

const recipesByCuisine = {
  italian: [
    { id: 101, name: 'Margherita Pizza', time: '30 min', servings: 4, difficulty: 'Easy', rating: 4.8, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80', ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella', 'Basil'], instructions: ['Roll dough', 'Add sauce', 'Top with cheese', 'Bake at 450°F'] },
    { id: 102, name: 'Spaghetti Carbonara', time: '25 min', servings: 2, difficulty: 'Medium', rating: 4.9, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80', ingredients: ['Spaghetti', 'Eggs', 'Pecorino Cheese', 'Guanciale', 'Black Pepper'], instructions: ['Boil pasta', 'Fry guanciale', 'Mix eggs and cheese', 'Combine all'] },
    { id: 103, name: 'Lasagna', time: '60 min', servings: 6, difficulty: 'Hard', rating: 4.7, image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=500&q=80', ingredients: ['Lasagna sheets', 'Meat sauce', 'Bechamel', 'Parmesan'], instructions: ['Layer sheets', 'Add sauces', 'Bake until golden'] },
  ],
  indian: [
    { id: 201, name: 'Butter Chicken', time: '45 min', servings: 4, difficulty: 'Medium', rating: 4.9, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=500&q=80', ingredients: ['Chicken', 'Yogurt', 'Tomato puree', 'Butter', 'Cream', 'Spices'], instructions: ['Marinate chicken', 'Grill chicken', 'Make sauce', 'Simmer together'] },
    { id: 202, name: 'Palak Paneer', time: '35 min', servings: 3, difficulty: 'Easy', rating: 4.6, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80', ingredients: ['Spinach', 'Paneer', 'Onions', 'Tomatoes', 'Cream'], instructions: ['Blanch spinach', 'Puree', 'Sauté spices', 'Add paneer'] },
    { id: 203, name: 'Biryani', time: '60 min', servings: 5, difficulty: 'Hard', rating: 4.9, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80', ingredients: ['Basmati Rice', 'Chicken/Mutton', 'Yogurt', 'Saffron', 'Fried Onions'], instructions: ['Soak rice', 'Cook meat', 'Layer rice and meat', 'Dum cook'] },
  ],
  chinese: [
    { id: 301, name: 'Kung Pao Chicken', time: '30 min', servings: 3, difficulty: 'Medium', rating: 4.7, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=500&q=80', ingredients: ['Chicken', 'Peanuts', 'Chili peppers', 'Soy sauce', 'Vinegar'], instructions: ['Dice chicken', 'Stir fry', 'Add sauce', 'Garnish with peanuts'] },
    { id: 302, name: 'Dim Sum', time: '45 min', servings: 4, difficulty: 'Hard', rating: 4.8, image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=500&q=80', ingredients: ['Dough', 'Pork filling', 'Shrimp', 'Vegetables'], instructions: ['Make dough', 'Fill', 'Steam'] },
  ],
  mexican: [
    { id: 401, name: 'Tacos Al Pastor', time: '40 min', servings: 4, difficulty: 'Medium', rating: 4.8, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=80', ingredients: ['Pork', 'Pineapple', 'Corn tortillas', 'Cilantro', 'Onion'], instructions: ['Marinate pork', 'Grill', 'Serve on tortillas'] },
    { id: 402, name: 'Guacamole', time: '15 min', servings: 4, difficulty: 'Easy', rating: 4.9, image: 'https://images.unsplash.com/photo-1604542031651-5494cc18e5f7?auto=format&fit=crop&w=500&q=80', ingredients: ['Avocado', 'Lime', 'Cilantro', 'Tomato', 'Onion'], instructions: ['Mash avocado', 'Mix ingredients', 'Season'] },
  ],
  japanese: [
    { id: 501, name: 'Sushi Rolls', time: '50 min', servings: 2, difficulty: 'Hard', rating: 4.9, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80', ingredients: ['Sushi rice', 'Nori', 'Fish', 'Cucumber', 'Avocado'], instructions: ['Cook rice', 'Place on nori', 'Add fillings', 'Roll tightly'] },
    { id: 502, name: 'Ramen', time: '120 min', servings: 2, difficulty: 'Hard', rating: 4.8, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80', ingredients: ['Ramen noodles', 'Broth', 'Pork belly', 'Egg', 'Green onions'], instructions: ['Make broth', 'Cook noodles', 'Assemble bowl'] },
  ],
  french: [
    { id: 601, name: 'Croissants', time: '180 min', servings: 8, difficulty: 'Hard', rating: 4.9, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80', ingredients: ['Flour', 'Butter', 'Yeast', 'Milk', 'Sugar'], instructions: ['Make dough', 'Laminate with butter', 'Shape', 'Bake'] },
    { id: 602, name: 'Coq au Vin', time: '90 min', servings: 4, difficulty: 'Medium', rating: 4.7, image: 'https://images.unsplash.com/photo-1534939561126-855f86251031?auto=format&fit=crop&w=500&q=80', ingredients: ['Chicken', 'Red wine', 'Mushrooms', 'Bacon', 'Pearl onions'], instructions: ['Brown chicken', 'Sauté veggies', 'Simmer in wine'] },
  ],
  thai: [
    { id: 701, name: 'Pad Thai', time: '30 min', servings: 2, difficulty: 'Medium', rating: 4.8, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=500&q=80', ingredients: ['Rice noodles', 'Shrimp/Tofu', 'Eggs', 'Bean sprouts', 'Peanuts', 'Tamarind paste'], instructions: ['Soak noodles', 'Stir fry ingredients', 'Add sauce', 'Garnish'] },
    { id: 702, name: 'Green Curry', time: '40 min', servings: 3, difficulty: 'Medium', rating: 4.7, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80', ingredients: ['Green curry paste', 'Coconut milk', 'Chicken', 'Bamboo shoots', 'Thai basil'], instructions: ['Fry paste', 'Add coconut milk', 'Simmer chicken', 'Add veggies'] },
  ],
  mediterranean: [
    { id: 801, name: 'Greek Salad', time: '15 min', servings: 2, difficulty: 'Easy', rating: 4.6, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=500&q=80', ingredients: ['Cucumber', 'Tomatoes', 'Feta', 'Olives', 'Olive oil'], instructions: ['Chop veggies', 'Add cheese/olives', 'Drizzle oil'] },
    { id: 802, name: 'Hummus', time: '10 min', servings: 4, difficulty: 'Easy', rating: 4.8, image: 'https://images.unsplash.com/photo-1577906096429-07d752840671?auto=format&fit=crop&w=500&q=80', ingredients: ['Chickpeas', 'Tahini', 'Lemon', 'Garlic', 'Olive oil'], instructions: ['Blend all ingredients', 'Adjust seasoning', 'Serve with pita'] },
  ],
};

const trending = [
  { id: 101, name: 'Margherita Pizza', cuisine: 'Italian', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80' },
  { id: 201, name: 'Butter Chicken', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=500&q=80' },
  { id: 501, name: 'Sushi Rolls', cuisine: 'Japanese', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80' },
];

// --- Components ---

const Navbar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-orange-600 font-bold text-xl">
            <ChefHat size={32} />
            <span>FusionChefy</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/recipes" className="text-gray-700 hover:text-orange-600 transition">Recipes</Link>
            {/* FIXED: Changed id from 'cuisines' to 'cuisine-explorer' to match route */}
            <a href="#cuisine-explorer" className="text-gray-700 hover:text-orange-600 transition">Global Cuisine</a>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 transition">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition">Contact</Link>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Mobile Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col space-y-4 shadow-lg">
          <Link to="/recipes" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-orange-600">Recipes</Link>
          {/* REMOVED: Trending link from mobile menu */}
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-orange-600">About Us</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-orange-600">Contact</Link>
          
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-4 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <div className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white py-24">
    <div className="absolute inset-0 bg-black opacity-30"></div>
    <div className="relative max-w-7xl mx-auto px-4 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">Master Global Cuisines</h1>
      <p className="text-xl md:text-2xl mb-8">Discover authentic recipes from around the world</p>
      <a href="#cuisine-explorer" className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-flex items-center">
        Explore Cuisines <ArrowRight className="ml-2" size={20} />
      </a>
    </div>
  </div>
);

const CuisineExplorer = () => (
  <section id="cuisine-explorer" className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Explore Global Cuisines</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cuisineTypes.map((cuisine) => (
          <Link key={cuisine.id} to={`/cuisine/${cuisine.id}`} className="group">
            <div className={`bg-gradient-to-br ${cuisine.color} rounded-2xl p-8 text-white shadow-lg transform group-hover:scale-105 transition duration-300`}>
              <div className="text-6xl mb-4">{cuisine.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{cuisine.name}</h3>
              <p className="opacity-90">{cuisine.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const RecipeCard = ({ recipe }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
    <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{recipe.name}</h3>
        <span className="flex items-center text-yellow-500 font-bold"><Star size={16} className="mr-1" fill="currentColor"/> {recipe.rating}</span>
      </div>
      <div className="flex items-center text-gray-600 text-sm mb-4 space-x-4">
        <span className="flex items-center"><Clock size={16} className="mr-1"/> {recipe.time}</span>
        <span className="flex items-center"><Users size={16} className="mr-1"/> {recipe.servings} servings</span>
      </div>
      <Link to={`/recipe/${recipe.id}`} className="block w-full bg-orange-600 text-white text-center py-2 rounded-lg hover:bg-orange-700 transition">View Recipe</Link>
    </div>
  </div>
);

const HomePage = () => (
  <>
    <Hero />
    <CuisineExplorer />
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Featured Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(recipesByCuisine).flat().slice(0, 6).map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  </>
);

const CuisinePage = () => {
  const { id } = useParams();
  const cuisine = cuisineTypes.find(c => c.id === id);
  const recipes = recipesByCuisine[id] || [];

  if (!cuisine) return <div className="p-8 text-center">Cuisine not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className={`bg-gradient-to-r ${cuisine.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-8xl mb-4">{cuisine.icon}</div>
          <h1 className="text-5xl font-bold mb-4">{cuisine.name} Cuisine</h1>
          <p className="text-xl opacity-90">{cuisine.description}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Popular {cuisine.name} Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allRecipes = Object.values(recipesByCuisine).flat();
  const recipe = allRecipes.find(r => r.id === parseInt(id));

  if (!recipe) return <div className="p-8 text-center">Recipe not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 bg-white rounded-2xl shadow-xl overflow-hidden">
        <img src={recipe.image} alt={recipe.name} className="w-full h-96 object-cover" />
        <div className="p-8">
          <button onClick={() => navigate(-1)} className="mb-4 text-orange-600 hover:underline flex items-center">← Back</button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.name}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600 mb-8">
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full"><Clock size={18} className="mr-2"/> {recipe.time}</span>
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full"><Users size={18} className="mr-2"/> {recipe.servings} Servings</span>
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full"><Star size={18} className="mr-2" fill="#fbbf24"/> {recipe.rating}</span>
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">{recipe.difficulty}</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center text-gray-700"><div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>{ing}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="text-gray-700"><span className="font-bold text-orange-600 mr-2">{i + 1}.</span>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="min-h-screen bg-gray-50 pt-16 pb-12">
    <div className="max-w-4xl mx-auto px-4 bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About FusionChefy</h1>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Welcome to <strong>FusionChefy</strong>, your ultimate destination for exploring global cuisines! 
        Our mission is to bring authentic recipes from every corner of the world to your kitchen.
      </p>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Whether you are a beginner cook or a seasoned chef, our collection of Italian, Indian, Chinese, Mexican, Japanese, French, Thai, and Mediterranean recipes will inspire your next culinary adventure.
      </p>
      <div className="text-center mt-12">
        <ChefHat size={64} className="mx-auto text-orange-600 mb-4" />
        <p className="text-gray-500 italic">"Cooking is love made visible."</p>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="min-h-screen bg-gray-50 pt-16 pb-12">
    <div className="max-w-4xl mx-auto px-4 bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Get in Touch</h3>
          <p className="text-gray-700 mb-6">Have a question or a recipe request? We'd love to hear from you!</p>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700"><Mail className="mr-3 text-orange-600"/> hello@fusionchefy.com</div>
            <div className="flex items-center text-gray-700"><Phone className="mr-3 text-orange-600"/> +1 (555) 123-4567</div>
            <div className="flex items-center text-gray-700"><MapPin className="mr-3 text-orange-600"/> 123 Culinary Ave, Food City</div>
          </div>
        </div>
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
          <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
          <textarea rows="4" placeholder="Message" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
          <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition">Send Message</button>
        </form>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center space-x-2 text-orange-500 font-bold text-xl mb-4">
          <ChefHat size={32} />
          <span>FusionChefy</span>
        </div>
        <p className="text-gray-400">Bringing global flavors to your home kitchen.</p>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-4">Discover</h4>
        <ul className="space-y-2 text-gray-400">
          {/* REMOVED: Trending link from footer */}
          <li><Link to="/recipes" className="hover:text-orange-500 transition">Recipes</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-4">Company</h4>
        <ul className="space-y-2 text-gray-400">
          <li><Link to="/about" className="hover:text-orange-500 transition">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-orange-500 transition">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-4">Follow Us</h4>
        <div className="flex space-x-4">
          <Facebook className="hover:text-orange-500 cursor-pointer transition" />
          <Twitter className="hover:text-orange-500 cursor-pointer transition" />
          <Instagram className="hover:text-orange-500 cursor-pointer transition" />
          <Youtube className="hover:text-orange-500 cursor-pointer transition" />
        </div>
      </div>
    </div>
    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
      © {new Date().getFullYear()} FusionChefy. All rights reserved.
    </div>
  </footer>
);

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (term) => {
    if (!term.trim()) {
      setSearchResults(null);
      return;
    }
    const allRecipes = Object.values(recipesByCuisine).flat();
    const filtered = allRecipes.filter(r => 
      r.name.toLowerCase().includes(term.toLowerCase()) || 
      r.ingredients.some(i => i.toLowerCase().includes(term.toLowerCase()))
    );
    setSearchResults(filtered);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar onSearch={handleSearch} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={searchResults ? <SearchResultsPage results={searchResults} /> : <HomePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/cuisine/:id" element={<CuisinePage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<div className="p-8 text-center text-2xl">404 - Page Not Found</div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

// Helper components for search and listing
const SearchResultsPage = ({ results }) => (
  <div className="max-w-7xl mx-auto px-4 py-16">
    <h2 className="text-3xl font-bold mb-8">Search Results</h2>
    {results.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {results.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </div>
    ) : (
      <p className="text-xl text-gray-600">No recipes found. Try searching for "pizza", "chicken", or "spicy".</p>
    )}
  </div>
);

const RecipesPage = () => {
  const allRecipes = Object.values(recipesByCuisine).flat();
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-8 text-center">All Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;
