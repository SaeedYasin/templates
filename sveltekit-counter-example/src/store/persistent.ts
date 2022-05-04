import { type Writable, writable } from 'svelte/store';
import { browser } from '$app/env';

const read = (key: string): number | undefined => {
  try {
    return JSON.parse(localStorage[key]);
  } catch (e) {
    console.warn('key', key, 'not found in local storage');
  }
};

export default function persistent(key: string, initial: number): Writable<number> {
  const store: Writable<number> = writable(read(key) || initial, () => {
    return store.subscribe((value) => {
      if (browser) localStorage[key] = JSON.stringify(value);
    });
  });

  return store;
}
