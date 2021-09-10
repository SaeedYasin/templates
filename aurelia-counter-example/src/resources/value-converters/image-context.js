"use strict";

const imageContext = require.context(
  "../../../static",
  true,
  /^\.\/.*\.(jpe?g|png|gif)$/i
);

export class ImageContextValueConverter {
  toView(name) {
    const key = imageContext.keys().find((k) => {
      return k.includes(name);
    });
    if (key) return imageContext(key).default;
    else return null;
  }
}
