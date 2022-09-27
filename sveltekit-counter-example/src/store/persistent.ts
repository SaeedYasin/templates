import { type Writable, writable } from 'svelte/store';
import { browser } from '$app/environment';

const read = <T>(key: string): T | undefined => {
  try {
    return JSON.parse(localStorage[key]);
  } catch (e) {
    console.warn('key', key, 'not found in local storage');
  }
};

export default function persistent<T>(key: string, initial: T): Writable<T> {
  const store: Writable<T> = writable(read(key) || initial, () => {
    return store.subscribe((value) => {
      if (browser) localStorage[key] = JSON.stringify(value);
    });
  });

  return store;
}
