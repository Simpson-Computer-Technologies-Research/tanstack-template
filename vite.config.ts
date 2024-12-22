import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import path from "path";

export default ({}) => {
  return defineConfig({
    plugins: [TanStackRouterVite(), viteReact()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5173,
    },
  });
};
