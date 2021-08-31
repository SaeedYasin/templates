<script>
  import PageCentered from "./components/layout/PageCentered.svelte";
  import Counter from "./components/counter/Counter.svelte";

  let show = true;

  setTimeout(() => {
    show = false;
  }, 3000);

  setTimeout(() => {
    show = true;
  }, 6000);
</script>

<PageCentered>
  {#if show}
    <Counter />
  {/if}
</PageCentered>
