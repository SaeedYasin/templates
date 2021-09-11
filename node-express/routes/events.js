#!/usr/bin/env node
"use strict";

const express = require("express");
const router = express.Router();

const em = require("../services/eventsManager");
const log = require("../common/logger");
const _ = require("lodash");

router.get("/all", async (req, res) => {
  // These headers are required to make events work
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Tell the client to retry every 10 seconds if connectivity is lost
  res.write("retry: 10000\n\n");

  const ip = req.ip || req.socket.remoteAddress;
  const id = addClient({ ip, res });

  // Send a keep alive message every minute to keep
  // communication channel open, otherwise browser
  // will kill the inactive connection after every 2 minutes
  const timer = setInterval(() => {
    res.write(`data: keep alive\n\n`);
  }, 60 * 1000);

  res.on("close", () => {
    removeClient(id);
    clearInterval(timer);
  });
});

router.get("/:from", async (req, res) => {
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

const clients = [];

const _getFirstAvailableId = () => {
  return clients
    .map((client) => client.id)
    .sort((a, b) => a - b)
    .reduce((acc, id, idx, arr) => {
      if (idx !== id) {
        arr.splice(1); // break early
        acc = idx;
      } else if (idx + 1 === arr.length) {
        acc = arr.length;
      }
      return acc;
    }, 0);
};

const addClient = ({ ip, res }) => {
  const id = _getFirstAvailableId();
  clients.push({ id, ip, res });
  log.DEBUG("Events /all => Connection opened for client", id, "from ip", ip);
  log.INFO("Events /all => Total clients are", clients.length);
  return id;
};

const removeClient = (id) => {
  _.remove(clients, { id });
  log.DEBUG("Events /all => Connection closed for client", id);
  log.INFO("Events /all => Total clients are", clients.length);
};

const sendMessageToAll = (message) => {
  clients.forEach((client) => {
    client.res.write(`data: ${message}\n\n`);
  });
};

em.setMessageAllCb(sendMessageToAll);
module.exports = router;
