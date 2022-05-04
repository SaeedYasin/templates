<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Image from '$lib/ui/Image.svelte';
  import undoSrc from '$assets/images/undo.png?webp&w=20&imagetools';
  import redoSrc from '$assets/images/redo.png?webp&w=20&imagetools';
  import KittyImg from '$assets/images/kitty.jpg?w=500;1000;1500&webp&imagetools&meta';
  import KittyPlaceHolderImg from '$assets/images/kitty.jpg?w=500&webp&blur=20&quality=30&imagetools';
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Sveltekit Counter Example" />
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Image meta={KittyImg} placeholder={KittyPlaceHolderImg} alt="kitty" />
<img src={undoSrc} alt="undo" />
<img src={redoSrc} alt="redo" />

<style lang="scss">
  h1 {
    font-size: 2em;
    margin: 0;
  }
</style>
