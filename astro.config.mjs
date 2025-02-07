// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import solidJs from '@astrojs/solid-js';

import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), solidJs(), tailwind()],
  adapter: netlify()
  // server: {
  //   port: process.env.PORT ? +process.env.PORT : 4000
  // }
});