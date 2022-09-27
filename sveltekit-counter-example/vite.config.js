import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), imagetools()],
  resolve: {
    alias: {
      // $lib: path.resolve('./src/lib'), // $lib is available by default in sveltekit
      $assets: path.resolve('./src/assets'),
      $store: path.resolve('./src/store')
    }
  }
};

export default config;
