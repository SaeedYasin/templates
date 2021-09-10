#!/usr/bin/env node
"use strict";

const config = require("config");

module.exports = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", config.get("origin"));
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
  res.header("Access-Control-Expose-Headers", "x-auth-token");

  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};
