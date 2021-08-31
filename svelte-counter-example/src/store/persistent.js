import { writable } from "svelte/store";

const read = (key) => {
  try {
    return JSON.parse(localStorage[key]);
  } catch (e) {
    console.warn("key", key, "not found in local storage");
  }
};

export default function persistent(key, initial) {
  const store = writable(read(key) || initial, () => {
    return store.subscribe((value) => {
      localStorage[key] = JSON.stringify(value);
    });
  });

  return store;
}
