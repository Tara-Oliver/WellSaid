import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), jsconfigPaths()],
	base: "/",
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
