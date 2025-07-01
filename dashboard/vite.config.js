import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect"; // ✅ Import it here

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: "dist/bundle-report.html",
      gzipSize: true,
      brotliSize: true,
    }),
    Inspect(), // ✅ Use it here
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || /react(\/|$)/.test(id))
              return "react-core";
            if (id.includes("react-router-dom")) return "router";
            if (id.includes("@reduxjs/toolkit") || id.includes("react-redux"))
              return "redux";
            if (id.includes("framer-motion")) return "framer";
            if (id.includes("sonner")) return "toast";
            if (
              id.includes("@heroicons") ||
              id.includes("lucide-react") ||
              id.includes("shadcn")
            )
              return "ui-lib";
            if (id.includes("react-icons")) return "icons";
            if (id.includes("@radix-ui")) return "radix";
            return "vendor";
          }

          if (id.includes("src/pages/Dashboard")) return "dashboard";
          if (id.includes("src/pages/Login")) return "auth-login";
          if (id.includes("src/pages/ForgotPassword")) return "auth-forgot";
          if (id.includes("src/pages/ResetPassword")) return "auth-reset";
          if (id.includes("src/pages/Timeline")) return "timeline";
          if (id.includes("src/pages/Projects")) return "projects";
          if (id.includes("src/pages/Skill")) return "skills";
          if (id.includes("src/pages/subcomponents")) return "subpages";
          if (id.includes("src/layout/AdminLayout")) return "layout";
          if (id.includes("src/store") || id.includes("redux"))
            return "redux-store";

          return undefined;
        },
      },
    },
  },
});
