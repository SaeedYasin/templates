import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import { visualizer } from "rollup-plugin-visualizer";
import { preprocess } from "svelte/compiler";
import sveltePreprocess from "svelte-preprocess";
import image from "svelte-image";

const production = !process.env.ROLLUP_WATCH;
const analyze = process.env.ANALYZE;

const visualizerOptions = {
  sourcemap: true,
  gzipSize: true,
  brotliSize: true,
};

const analyzer = [
  analyze &&
    visualizer({
      ...visualizerOptions,
      ...{
        filename: "treemap.html",
        template: "treemap",
      },
    }),
  analyze &&
    visualizer({
      ...visualizerOptions,
      ...{
        filename: "sunburst.html",
        template: "sunburst",
      },
    }),
  analyze &&
    visualizer({
      ...visualizerOptions,
      ...{
        filename: "network.html",
        template: "network",
      },
    }),
];

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

// This is workaround for the issue mentioned in here,
// https://github.com/sveltejs/svelte/pull/6031
// https://github.com/sveltejs/svelte/pull/4282
// The issue is svelte-image needs to run after sveltePreprocess
// so sass is already processed when code is given to svelte-image.
// But the current preprocessor for svelte doesn't respect the order
// For example, preprocess: [sveltePreprocess(), image()]
// should work, but it doesn't respect the order. So, below we are
// hijacking this process and enforcing the order of execution.
function runOthersBeforeImage(otherProcessors) {
  return {
    markup: async ({ content, filename }) => {
      const otherProcessorsReturn = await preprocess(content, otherProcessors, {
        filename,
      });
      content = otherProcessorsReturn.code;

      const { code } = await image({
        publicDir: "./public/",
        placeholder: "blur",
      }).markup({
        content,
        filename,
      });

      return {
        ...otherProcessorsReturn,
        code,
      };
    },
    script: otherProcessors.script,
    style: otherProcessors.style,
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      preprocess: [
        runOthersBeforeImage(
          sveltePreprocess({
            postcss: true,
          })
        ),
      ],
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    // Always add this add the end
    // Use rollup-plugin-visualizer cli to add mulitple routes
    // compiled outputs together into a single html output
    ...analyzer,
  ],
  watch: {
    clearScreen: false,
  },
};
