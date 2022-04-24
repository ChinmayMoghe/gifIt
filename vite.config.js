import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import crossOriginIsolation from "vite-plugin-cross-origin-isolation";

export default defineConfig({
  plugins: [
    react(),
    /*fix for ffmpeg - https://github.com/chaosprint/vite-plugin-cross-origin-isolation
     *issue - https://github.com/ffmpegwasm/ffmpeg.wasm/issues/263
     */
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          next();
        });
      },
    },
  ],
});
