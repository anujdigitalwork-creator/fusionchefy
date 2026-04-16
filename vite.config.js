import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import { generateRss } from "./src/utils/generateRss";

function rssPlugin() {
  return {
    name: "rss-plugin",
    closeBundle() {
      const rss = generateRss();
      fs.writeFileSync("public/rss.xml", rss);
      console.log("RSS generated successfully");
    },
  };
}

export default defineConfig({
  plugins: [react(), rssPlugin()],
});
