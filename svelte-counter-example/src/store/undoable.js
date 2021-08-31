import { writable, derived, get } from "svelte/store";

export default function undoable(store) {
  const initial = get(store);

  const state = writable({
    value: initial,
    stack: [initial],
    index: 0,
  });

  const undo = () => {
    state.update(({ stack, index, value }) => {
      if (index > 0) store.set((value = stack[--index]));
      return { value, stack, index };
    });
  };

  const redo = () => {
    state.update(({ stack, index, value }) => {
      if (index < stack.length - 1) store.set((value = stack[++index]));
      return { value, stack, index };
    });
  };

  const update = (fn) => {
    store.update((old_value) => {
      const value = fn(old_value);

      state.update(({ stack, index }) => {
        stack.length = ++index; // clear forward history
        stack[index] = value;
        return { value, stack, index };
      });

      return value;
    });
  };

  const set = (value) => {
    update(() => value);
  };

  const cleanup = () => {
    const current = get(state);
    state.set({
      value: current.value,
      stack: [current.value],
      index: 0,
    });
  };

  const value = derived(state, ({ value }) => value);
  const urdoStore = { subscribe: value.subscribe, update, set };

  const canUndo = derived(state, ({ index }) => index > 0);
  const canRedo = derived(
    state,
    ({ index, stack }) => index < stack.length - 1
  );

  return [urdoStore, undo, redo, canUndo, canRedo, cleanup];
}
