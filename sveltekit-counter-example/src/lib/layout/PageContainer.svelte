<div class="container">
  <div class="content">
    <slot />
  </div>
</div>

<style lang="scss">
  @use './src/scss/base' as *;

  .container {
    @include flex_center;
    margin: $container-margin;
    width: calc(100vw - 2 * $container-margin);
  }

  .content {
    align-self: center;
    @include flex_center;
    max-width: $container-max-width;
    width: min($container-max-width, 100vw - 2 * $container-margin);
  }
</style>
