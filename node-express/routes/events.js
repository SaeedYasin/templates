#!/usr/bin/env node
"use strict";

const express = require("express");
const router = express.Router();

const em = require("../services/eventsManager");
const log = require("../common/logger");

router.get("/all", (req, res) => {
  // These headers are required to make events work
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Tell the client to retry every 10 seconds if connectivity is lost
  res.write("retry: 10000\n\n");

  const ip = req.ip || req.socket.remoteAddress;
  const id = em.addClient({ ip, res });
  res.write(`event: clientid\ndata: ${id}\n\n`);

  // Send a keep alive message every minute to keep
  // communication channel open, otherwise browser
  // will kill the inactive connection after every 2 minutes
  const timer = setInterval(() => {
    res.write(`data: keep alive\n\n`);
  }, 60 * 1000);

  res.on("close", () => {
    em.removeClient(id);
    clearInterval(timer);
  });
});

router.get("/:from", (req, res) => {
  const { from } = req.params;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.write("retry: 10000\n\n");

  const ip = req.ip || req.socket.remoteAddress;
  log.DEBUG("Events => Connection opened from ip", ip);

  const sendMessage = (message) => {
    res.write(`data: ${message}\n\n`);
  };
  em.handleConnection(from, sendMessage);

  const timer = setInterval(() => {
    res.write(`data: keep alive\n\n`);
  }, 60 * 1000);

  res.on("close", () => {
    em.handleDisconnect(from);
    clearInterval(timer);
  });
});

module.exports = router;
