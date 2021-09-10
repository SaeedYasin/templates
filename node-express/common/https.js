#!/usr/bin/env node
"use strict";

const axios = require("axios");
const fs = require("fs");
const _ = require("lodash");
const log = require("../common/logger");

class Https {
  constructor() {
    this.cookieFile = "local/cookies.json";
    this.cookies = {};
    if (fs.existsSync(this.cookieFile)) {
      this.cookies = JSON.parse(fs.readFileSync(this.cookieFile));
    } else {
      fs.writeFileSync(this.cookieFile, JSON.stringify(this.cookies));
    }
    this._useCookies();
  }

  useBaseUrl = (url) => {
    axios.defaults.baseURL = url;
  };

  useHeader = (header, value) => {
    axios.defaults.headers.common[header] = value;
  };

  _saveCookies = () => {
    fs.writeFile(this.cookieFile, JSON.stringify(this.cookies), () => {
      log.INFO("Cookies saved into cookies.json file");
    });
  };

  _useCookies = () => {
    axios.defaults.headers.common["Cookie"] = _.map(
      this.cookies,
      (value, key) => key + "=" + value
    ).join("; ");
  };

  addCookies = (cookies) => {
    cookies
      .map((c) => c.split(";")[0].split("="))
      .reduce((acc, e) => {
        acc[e[0]] = e[1];
        return acc;
      }, this.cookies);

    this._useCookies();
    this._saveCookies();

    log.INFO("Https: now using these cookies", axios.defaults.headers.common["Cookie"]);
  };

  get = async (...args) => {
    return await axios.get(...args);
  };

  put = (...args) => {
    return axios.put(...args);
  };

  post = (...args) => {
    return axios.post(...args);
  };

  delete = (...args) => {
    return axios.delete(...args);
  };
}

module.exports = new Https();
