
const fs = require("fs");
let content = fs.readFileSync("src/app/api/cakes/route.ts", "utf8");
content = content.replace(
  /function sanitizeImageUrl\(url: any\): string \{[\s\S]*?return '\/cakes\/WhiteForest%20400\.jpeg';\r?\n\}/,
  `function sanitizeImageUrl(url: any): string {
  if (typeof url !== "string") return "/cakes/WhiteForest%20400.jpeg";
  const trimmed = url.trim();
  if (trimmed.includes("..")) return "/cakes/WhiteForest%20400.jpeg";
  if (trimmed.startsWith("data:image/")) return trimmed;
  if (trimmed.startsWith("/") || trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed.slice(0, 1000);
  return "/cakes/WhiteForest%20400.jpeg";
}`
);
fs.writeFileSync("src/app/api/cakes/route.ts", content, "utf8");

