<!--
  @component
  takes the output of a vite-imagetools import (using the `meta` output format)
  and generates a `<picture>` with `<source>` tags and an `<img>`.

  Original code from,
  https://gitlab.com/benblazak/homepage/-/blob/0cb4a432b3b3e9697f1a4a796d203884de59bb7f/src/lib/Image.svelte

  Usage:

  - in svelte file
    - typescript
      ```typescript
      import Image from "$lib/Image.svelte";
      import me from "$lib/assets/me.jpg?w=200;400&format=webp;png&imagetools&meta";
      import placeHolderImg from '$lib/assets/me.jpg?w=200&webp&blur=20&quality=30&imagetools';
      ```
    - html
      ```html
      <span><Image meta="{me}" placeholder="{placeHolderImg}" alt="me" /></span>
      ```

  Notes:

  - the `&imagetools` in the usage above is to make typescript happy. there are
    other workarounds, if you'd prefer a differnet one
    https://github.com/JonasKruckenberg/imagetools/issues/160

  Assumptions:

  - this counts on vite-imagetools returning metadata objects in the same order
    as the query values are specified
    - e.g. for `?width=100;200&format=webp;png&meta` we expect the source with
      `width=100` to come before the one with `width=200`, and likewise for
      `webp` and `png`
    - i don't think this is guaranteed, so hopefully it doesn't change. looks
      like it depends on this bit of code
      https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/lib/resolve-configs.ts#L17
-->
<script lang="ts">
  export let meta: { src: string; width: number; height: number; format: string }[];
  // If there is only one, vite-imagetools won't wrap the object in an array
  if (!(meta instanceof Array)) meta = [meta];

  // All images Map by format
  const sources = new Map<string, typeof meta>();
  meta.map((m) => sources.set(m.format, []));
  meta.map((m) => sources.get(m.format)?.push(m));

  // Fallback image: first resolution of last format
  const lastImage = sources.get([...sources.keys()].slice(-1)[0]);
  const image = lastImage ? lastImage[0] : { src: '', width: 0, height: 0, format: '' };

  export let placeholder: string | undefined = undefined;
  const style =
    placeholder &&
    `background: url(${placeholder}) no-repeat; width: ${image.width}; height: ${image.height};`;

  export let sizes = `${image.width}px`;
  export let loading: string | undefined = undefined;
  export let alt: string;
</script>

<picture width={image.width} height={image.height}>
  {#each [...sources.entries()] as [format, meta]}
    <source
      {sizes}
      type="image/{format}"
      srcset={meta.map((m) => `${m.src} ${m.width}w`).join(', ')}
    />
  {/each}
  <img src={image.src} width={image.width} height={image.height} {alt} {loading} {style} />
</picture>
