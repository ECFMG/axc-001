import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
	title: 'agentCourses Docs',
	tagline: 'Harness engineering, agentic coding, and software quality',
	favicon: 'img/favicon.ico',
	future: {
		v4: {},
	},
	url: 'https://example.local',
	baseUrl: '/',
	organizationName: 'agentCourses',
	projectName: 'axc',
	onBrokenLinks: 'throw',
	markdown: {
		hooks: {
			onBrokenMarkdownLinks: 'warn',
		},
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},
	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],
	themeConfig: {
		navbar: {
			title: 'agentCourses',
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'docsSidebar',
					position: 'left',
					label: 'Docs',
				},
			],
		},
		footer: {
			style: 'dark',
			copyright: `Copyright © ${new Date().getFullYear()} agentCourses. MIT License.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
