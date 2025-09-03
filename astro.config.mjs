// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// plugins
import tailwindcss from '@tailwindcss/vite';
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import { viewTransitions } from "astro-vtbot/starlight-view-transitions";
import starlightGiscus from 'starlight-giscus'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Drug Factory',
			description: '布的游戏与前端开发日志',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/pinowine' }],
			customCss: ['./src/styles/global.css'],
			defaultLocale: 'root',
			locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},
			plugins: [
				starlightUtils({
					multiSidebar: {
						switcherStyle: "dropdown",
					},
				}),
				viewTransitions(),
				starlightGiscus({
					repo: 'pinowine/devlog-site',
					repoId: 'R_kgDOPpEJ-Q',
					category: 'Announcements',
					categoryId: 'DIC_kwDOPpEJ-c4Cu6rX',
					inputPosition: 'top',
					lazy: true,
					theme: 'catppuccin_mocha'
				}),
			],
			sidebar: [
				{
					label: '游戏', autogenerate: { directory: 'games' }
				},
				{
					label: '网页', autogenerate: { directory: 'webs' }
				}
			],
			components: {
				Hero: './src/components/Hero.astro',
				Header: './src/components/Header.astro',
				PageFrame: './src/components/PageFrame.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				PageSidebar: './src/components/PageSidebar.astro'
			}
		}),
		react(),
		mdx(),
		sitemap(),
	],
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		shikiConfig: {
			theme: 'one-dark-pro',
			wrap: true,
		},
	},
});
