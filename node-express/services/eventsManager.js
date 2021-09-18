#!/usr/bin/env node
"use strict";

const log = require("../common/logger");

class EventsManager {
  constructor() {
    this.allEventClients = [];

    this.count = 0;
    setInterval(() => {
      this.sendMessageToAll(this.count++);
    }, 3000);
  }

  _getFirstAvailableId = (clients) => {
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

  addClient = ({ ip, res }) => {
    const id = this._getFirstAvailableId(this.allEventClients);
    this.allEventClients.push({ id, ip, res });
    log.DEBUG("Events /all => Connection opened for client", id, "from ip", ip);
    log.INFO("Events /all => Total clients are", this.allEventClients.length);
    return id;
  };

  removeClient = (id) => {
    this.allEventClients = this.allEventClients.filter((client) => client.id !== id);
    log.DEBUG("Events /all => Connection closed for client", id);
    log.INFO("Events /all => Total clients are", this.allEventClients.length);
  };

  sendMessageToAll = (message) => {
    this.allEventClients.forEach((client) => {
      client.res.write(`data: ${message}\n\n`);
    });
  };

  handleConnection = (from, sendMessage) => {
    sendMessage(`Hello ${from}`);
  };

  handleDisconnect = (from) => {};
}

module.exports = new EventsManager();
