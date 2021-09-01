<script>
  import PageCentered from "./components/layout/PageCentered.svelte";
  import Counter from "./components/counter/Counter.svelte";
  import Image from "svelte-image";
</script>

<PageCentered>
  <div class="title">Hello World</div>
  <div class="imgContainer">
    <Image src="images/kitty.jpg" alt="kitty" />
  </div>
  <Counter />
</PageCentered>

<style>
  .imgContainer {
    width: inherit;
    max-width: 600px;
    margin: 10px;
  }
</style>
