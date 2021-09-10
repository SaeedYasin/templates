#!/usr/bin/env node
"use strict";

const args = require("yargs")
  //.usage("Usage: $0 -c [config-file-path]")
  //.example("$0 -c config.json")
  //.describe("c", "Config file to be used")
  //.demandOption(["c"])
  .count("verbose")
  .alias("v", "verbose")
  .help("h")
  .alias("h", "help").argv;

module.exports = args;
