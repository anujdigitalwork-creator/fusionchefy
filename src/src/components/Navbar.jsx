import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        
        {/* LEFT SIDE: Hamburger Menu + Logo Together */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Logo */}
          <h1 className="text-xl font-bold">Fusion Chef</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <a href="#trending">Trending</a>
          <a href="#cuisines">Cuisines</a>
          <a href="#recipes">Recipes</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        {/* RIGHT SIDE: Explore Cuisines Button */}
        <div className="flex items-center">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-full hidden md:block">
            Explore Cuisines
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col mt-4 gap-3 md:hidden">
          <a href="#trending">Trending</a>
          <a href="#cuisines">Cuisines</a>
          <a href="#recipes">Recipes</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>
      )}
    </nav>
  );
}
