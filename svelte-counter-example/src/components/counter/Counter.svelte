<script>
  import { onDestroy } from "svelte";
  import countSlice from "../../store/count.js";
  const { count, actions, urdo, cleanup } = countSlice;
  const { increment, decrement } = actions;
  const { undo, redo, canUndo, canRedo } = urdo;

  onDestroy(cleanup);

  const handleKeydown = (e) => {
    if (e.ctrlKey) {
      if (e.which === 89) {
        e.preventDefault();
        redo(); // (Ctrl+Y)
      } else if (e.which === 90) {
        e.preventDefault();
        undo(); // (Ctrl+Z)
      }
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="title">Count: {$count}</div>
<div>
  <button class="btn btn-success" on:click={increment}>+</button>
  <button class="btn btn-danger" on:click={decrement}>-</button>
</div>
<div>
  <button class="btn btn-warning" on:click={undo} disabled={!$canUndo}>
    <img src="images/undo.png" alt="undo" width="20px" height="20px" />
  </button>
  <button class="btn btn-info" on:click={redo} disabled={!$canRedo}>
    <img src="images/redo.png" alt="redo" width="20px" height="20px" />
  </button>
</div>

<style lang="scss">
  :global(.title) {
    font-size: 50px;
  }

  .btn {
    $primary: #007bff;
    $secondary: #6c757d;
    $success: #28a745;
    $info: #17a2b8;
    $warning: #ffc107;
    $danger: #dc3545;
    $extrude-size: 3px;

    position: relative;
    top: 0px;
    width: 80px;
    height: 25px;
    margin: 7px;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    font-size: 20px;
    text-shadow: 0 0 1px #fff;
    user-select: none;
    transition: All 250ms ease;

    &:active {
      position: relative;
      top: $extrude-size;
      box-shadow: none !important;
    }

    &:disabled {
      pointer-events: none;
      background-color: $secondary;
      border: 1px solid darken($secondary, 5%);
      box-shadow: 0px $extrude-size 0px darken($secondary, 5%);
    }

    &-success {
      color: white;
      background-color: $success;
      border: 1px solid darken($success, 5%);
      box-shadow: 0px $extrude-size 0px darken($success, 5%);
    }

    &-danger {
      color: white;
      background-color: $danger;
      border: 1px solid darken($danger, 5%);
      box-shadow: 0px $extrude-size 0px darken($danger, 5%);
    }

    &-warning {
      color: white;
      background-color: $warning;
      border: 1px solid darken($warning, 5%);
      box-shadow: 0px $extrude-size 0px darken($warning, 5%);
    }

    &-info {
      color: white;
      background-color: $info;
      border: 1px solid darken($info, 5%);
      box-shadow: 0px $extrude-size 0px darken($info, 5%);
    }
  }
</style>
