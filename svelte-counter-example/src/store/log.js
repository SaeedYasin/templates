import { get } from "svelte/store";

const timeStamp = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  return [
    "[%c" +
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds) +
      "." +
      ("00" + milliseconds).slice(-3) +
      "%c]",
    "color: gold",
    "color: unset",
  ];
};

export default function log(store, name) {
  let previousValue = get(store);
  const unsubscribe = store.subscribe((value) => {
    const entryName = (name || "value") + ":";
    console.groupCollapsed(...timeStamp(), entryName, value);
    console.log("Previous", entryName, previousValue);
    console.groupEnd();
    previousValue = value;
  });
  return [store, unsubscribe];
}
