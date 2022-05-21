<script lang="ts">
  import '../../node_modules/modern-normalize/modern-normalize.css';
  import PageContainer from '$lib/layout/PageContainer.svelte';
  import PageMain from '$lib/layout/PageMain.svelte';
</script>

<PageContainer>
  <PageMain>
    <slot />
  </PageMain>
  <footer>
    <p>&copy; 2022</p>
  </footer>
</PageContainer>

<style global lang="scss">
  @use './src/scss/global' as *;
</style>
