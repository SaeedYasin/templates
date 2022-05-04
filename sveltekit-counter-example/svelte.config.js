import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { imagetools } from 'vite-imagetools';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      plugins: [imagetools()],
      resolve: {
        alias: {
          $lib: path.resolve('./src/lib'),
          $assets: path.resolve('./src/assets'),
          $store: path.resolve('./src/store')
        }
      }
    }
  }
};

export default config;
