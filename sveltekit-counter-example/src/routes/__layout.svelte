<script lang="ts">
  import '../../node_modules/modern-normalize/modern-normalize.css';
  import PageCentered from '$lib/layout/PageCentered.svelte';
</script>

<div class="dark">
  <PageCentered>
    <main>
      <slot />
    </main>

    <footer>
      <p>&copy; 2022</p>
    </footer>
  </PageCentered>
</div>

<style global lang="scss">
  @use './src/scss/global' as *;
</style>
