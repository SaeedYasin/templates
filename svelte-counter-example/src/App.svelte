<script>
  import PageCentered from "./components/layout/PageCentered.svelte";
  import Counter from "./components/counter/Counter.svelte";
  import tooltip from "./components/ui/popup/tooltip/tooltip.js";
  import Image from "svelte-image";
</script>

<PageCentered>
  <div class="title" title="From Svelte" use:tooltip>Hello World</div>
  <div class="imgContainer">
    <Image src="images/kitty.jpg" alt="kitty" /> <!-- try ratio="value%" attribute for width setting -->
  </div>
  <Counter />
  <!-- using title attribute sets the default tooltip -->
  <h3 title="From Svelte">The End</h3>
</PageCentered>

<style>
  .imgContainer {
    width: inherit;
    max-width: 600px;
    margin: 10px;
  }

  h3 {
    font-size: 20px;
    font-weight: normal;
    font-style: italic;
    padding: 0;
    margin: 0;
  }
</style>
