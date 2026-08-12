import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { demoCodePlugin } from "./src/demo-code-plugin";
import { snippets } from "./src/snippets";

export default defineConfig({
  base: "/tiny-flex/",
  plugins: [tailwindcss(), demoCodePlugin(snippets)],
  resolve: {
    alias: {
      "tiny-flex": fileURLToPath(new URL("../../packages/tiny-flex/src/index.ts", import.meta.url)),
    },
  },
});
