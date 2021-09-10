#!/usr/bin/env node
"use strict";

const args = require("./argParser");

class Logger {
  constructor() {
    this.verbose = args.verbose;
  }

  timeStamp = () => {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return (
      "[" +
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds) +
      "." +
      ("00" + milliseconds).slice(-3) +
      "]"
    );
  };

  ERROR = (...args) => {
    console.log("\x1B[1;31mERROR:", this.timeStamp(), ...args, "\x1B[m");
  };

  WARN = (...args) => {
    this.verbose >= 0 &&
      console.log("\x1B[1;33mWARN:", this.timeStamp() + "\x1B[m", ...args);
  };

  INFO = (...args) => {
    this.verbose >= 1 &&
      console.log("\x1B[1;36mINFO:", this.timeStamp() + "\x1B[m", ...args);
  };

  DEBUG = (...args) => {
    this.verbose >= 2 &&
      console.log("\x1B[1;32mDEBUG:", this.timeStamp() + "\x1B[m", ...args);
  };
}

module.exports = new Logger();
