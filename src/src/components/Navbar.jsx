import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">Fusion Chef</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <a href="#trending">Trending</a>
          <a href="#cuisines">Cuisines</a>
          <a href="#recipes">Recipes</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
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
