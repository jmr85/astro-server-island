// @ts-check
import { defineConfig,  envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import solidJs from '@astrojs/solid-js';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), solidJs(), tailwind()],
  output: "server",
  adapter: node({
    mode: 'standalone',
  }),
  env: {
    schema: {
      PORT: envField.number({ context: "server", default: 4000, access: "secret" })
    }
  },
  server: {
    port: import.meta.env.PORT
  }
  // server: {
  //   port: process.env.PORT ? +process.env.PORT : 4000
  // }
});