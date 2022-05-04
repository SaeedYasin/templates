<script lang="ts">
  import '../app.css';
  import PageCentered from '$lib/layout/PageCentered.svelte';
</script>

<PageCentered>
  <main>
    <slot />
  </main>

  <footer>
    <p>&copy; 2022</p>
  </footer>
</PageCentered>
