import fs from "fs";
import { generateRss } from "../src/utils/generateRss.js";

const rss = generateRss();

fs.writeFileSync("./public/rss.xml", rss);

console.log("RSS generated successfully");
