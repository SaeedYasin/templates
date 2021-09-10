#!/usr/bin/env node
"use strict";

const express = require("express");
const router = express.Router();

const hw = require("../services/helloWorld");

router.get("/:tag?", async (req, res) => {
  const response = await hw.process(req.params.tag);
  if (response) {
    res.send(response);
    return;
  }
  res.status(500).send("Unable to process request");
});

module.exports = router;
