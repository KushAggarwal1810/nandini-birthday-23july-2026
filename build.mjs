import { cpSync, copyFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/server", { recursive: true });
mkdirSync("dist/.openai", { recursive: true });

for (const file of ["index.html", "styles.css", "script.js"]) {
  copyFileSync(file, `dist/${file}`);
}
cpSync("assets", "dist/assets", { recursive: true });
copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");

writeFileSync(
  "dist/server/index.js",
  `export default {
  async fetch(request, env) {
    if (env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return env.ASSETS.fetch(request);
    }
    return new Response("Birthday site assets are unavailable.", { status: 503 });
  }
};
`,
);
