import { type Writable, type Readable, type Updater, writable, derived, get } from 'svelte/store';

type UndoableStore<T> = [
  Writable<T>,
  () => void,
  () => void,
  Readable<boolean>,
  Readable<boolean>,
  () => void
];

export default function undoable<T>(store: Writable<T>): UndoableStore<T> {
  const initial = get(store);

  const state = writable({
    value: initial,
    stack: [initial],
    index: 0
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

  const update = (fn: Updater<T>) => {
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

  const set = (value: T) => {
    update(() => value);
  };

  const cleanup = () => {
    const current = get(state);
    state.set({
      value: current.value,
      stack: [current.value],
      index: 0
    });
  };

  const value = derived(state, ({ value }) => value);
  const urdoStore: Writable<T> = { subscribe: value.subscribe, update, set };

  const canUndo = derived(state, ({ index }) => index > 0);
  const canRedo = derived(state, ({ index, stack }) => index < stack.length - 1);

  return [urdoStore, undo, redo, canUndo, canRedo, cleanup];
}
