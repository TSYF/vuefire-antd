/// <reference types="vitest"/>
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from 'vite'
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	plugins: [
		vue(),
		Components({
			resolvers: [AntDesignVueResolver()],
		}),
	],
	test: {
		deps: {
			inline: [
				"ant-design-vue"
			]
		},
	}
});
