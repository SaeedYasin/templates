<script>
  export let name;
</script>

<h1>Hello {name}!</h1>

<div>
  <p>SASS is working!</p>
</div>

<style lang="scss">
  $color: red;

  h1 {
    color: $color;
  }

  div {
    background: green;

    > p {
      color: #fff;
    }
  }
</style>
