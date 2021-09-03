import undoable from "./undoable.js";
import persistent from "./persistent.js";
import log from "./log.js";
import config from "../config.js";

const storeLabel = "count";
const [countStore, logCleanup] = log(persistent(storeLabel, 10), storeLabel);
const [count, _undo, _redo, canUndo, canRedo, urdoCleanup] =
  undoable(countStore);

const increment = () => {
  count.update((count) => +count + 1);

  // send this action to backend
  console.log("Sending increment action to", config.apiUrl);
};

const decrement = () => {
  count.update((count) => +count - 1);

  // send this action to backend
  console.log("Sending decrement action to", config.apiUrl);
};

const undo = () => {
  _undo();
};

const redo = () => {
  _redo();
};

const cleanup = () => {
  logCleanup();
  urdoCleanup();
};

export default {
  count: {
    subscribe: count.subscribe,
  },
  actions: {
    increment,
    decrement,
  },
  urdo: { undo, redo, canUndo, canRedo },
  cleanup,
};
