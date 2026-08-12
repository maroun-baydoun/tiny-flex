import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
      fileName: "tiny-flex",
      formats: ["es"],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
