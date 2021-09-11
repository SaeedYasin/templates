#!/usr/bin/env node
"use strict";

class EventsManager {
  constructor() {
    this.sendMessageToAll = undefined;

    this.count = 0;
    setInterval(() => {
      this.sendMessageToAll(this.count++);
    }, 3000);
  }

  setMessageAllCb = (cb) => {
    this.sendMessageToAll = cb;
  };

  sendMessageToAll = (message) => {
    if (this.sendMessageToAll) {
      this.sendMessageToAll(message);
    }
  };

  handleConnection = (from, sendMessage) => {
    sendMessage(`Hello ${from}`);
  };

  handleDisconnect = (from) => {};
}

module.exports = new EventsManager();
