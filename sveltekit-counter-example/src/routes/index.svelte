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

<section>
  <h1 class="title" title="From Svelte" use:tooltip>Hello World</h1>
  <h3>What's Up</h3>
  <p>
    Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Lorem
    ipsum dolor sit amet, consectetur adipiscing elit.
  </p>
  <Image meta={KittyImg} placeholder={KittyPlaceHolderImg} alt="kitty" loading="lazy" />
</section>

<Counter />

<style lang="scss">
  @use './src/scss/base' as *;

  section {
    @include flex_center;
  }

  h3 {
    align-self: center;
    text-align: center;
  }
</style>
