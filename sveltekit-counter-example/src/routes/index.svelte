<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Counter from '$lib/counter/Counter.svelte';
  import tooltip from '$lib/ui/popup/tooltip/tooltip';
  import Image from '$lib/ui/Image.svelte';
  import KittyImg from '$assets/images/kitty.jpg?w=500;1000;1500&webp&imagetools&meta';
  import KittyPlaceHolderImg from '$assets/images/kitty.jpg?w=500&webp&blur=20&quality=30&imagetools';
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Sveltekit Counter Example" />
</svelte:head>

<div class="title" title="From Svelte" use:tooltip>Hello World</div>
<Image meta={KittyImg} placeholder={KittyPlaceHolderImg} alt="kitty" />

<Counter />

<style lang="scss">
</style>
