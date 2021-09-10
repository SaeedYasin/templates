#!/usr/bin/env node
"use strict";

const log = require("../common/logger");

class HelloWorld {
  constructor() {
    log.INFO("Hello World service loaded and ready");
  }

  process = async (tag) => {
    return `Hello World ${tag}`;
  };
}

module.exports = new HelloWorld();
