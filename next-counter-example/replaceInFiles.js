// For static export, we need to replace all the /_next/ paths
// in assets in the index.html with _next/

const replace = require("replace-in-file");
const options = {
  // You may need to modify the file address to suite your project
  files: "./out/index.html",
  from: [/src="\//g, /href="\//g],
  to: ['src="', 'href="'],
};
(async function () {
  try {
    const results = await replace(options);
    console.log("Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
