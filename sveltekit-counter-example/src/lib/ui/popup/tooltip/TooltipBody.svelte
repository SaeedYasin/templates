<script lang="ts">
  export let title: string | null;
  export let x: number;
  export let y: number;
</script>

<div style="top: {y + 5}px; left: {x + 5}px;">
  {title}
</div>

<style>
  div {
    border: 1px solid var(--text-color);
    box-shadow: 1px 1px 1px var(--text-color);
    background: var(--bg-color);
    border-radius: 4px;
    padding: 4px;
    font-size: 1rem;
    line-height: 1;
    position: absolute;
  }
</style>
