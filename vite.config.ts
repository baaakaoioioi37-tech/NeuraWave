import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

function nitroServerJsShim() {
  return {
    name: "nitro-server-js-shim",
    apply: "build",
    closeBundle() {
      const serverDir = join(process.cwd(), "dist", "server");
      const ssrDir = join(serverDir, "_ssr");
      const serverJs = join(serverDir, "server.js");
      if (!existsSync(serverDir)) return;
      const ssrFiles = existsSync(ssrDir)
        ? Array.from(new Set(require("node:fs").readdirSync(ssrDir))).filter((file) => file.startsWith("server-") && file.endsWith(".mjs"))
        : [];
      const serverFile = ssrFiles[0] ?? "server-JEu8mPSk.mjs";
      writeFileSync(
        serverJs,
        `import server from './_ssr/${serverFile}';\nconst _server = server?.default ?? server;\nexport default { fetch: _server.fetch.bind(_server) };\n`
      );
    },
  };
}

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  nitro: {
    preset: "node-server",
    output: {
      dir: "dist",
      publicDir: "dist/client",
      serverDir: "dist/server",
    },
  },
  plugins: [nitroServerJsShim()],
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
