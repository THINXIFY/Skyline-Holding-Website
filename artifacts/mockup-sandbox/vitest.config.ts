import { defineConfig } from "vitest/config";

// Kept separate from vite.config.ts so tests do not load the Replit/preview
// plugins used by the dev server.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
