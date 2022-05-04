/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

/**
 * ts wilcard modules
 * - https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations
 * actual types
 * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
 */
declare module '*&imagetools' {
  const out: string;
  export default out;
}

declare module '*&imagetools&meta' {
  const out: {
    src: string; // URL of the generated image
    width: number; // Width of the image
    height: number; // Height of the image
    format: string; // Format of the generated image
  }[];
  export default out;
}
