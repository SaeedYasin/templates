#!/usr/bin/env node
"use strict";

const hello = require("./routes/hello");
const events = require("./routes/events");
const cors = require("./middleware/cors");
const log = require("./common/logger");
const express = require("express");
const app = express();
const fs = require("fs");

log.INFO("Using config for", require("config").get("name"));

app.use(express.json());
app.use(cors);

app.use("/api/hello", hello);
app.use("/api/events", events);

const index = fs.readFileSync("./client/index.html", "utf8");
app.get("/", (req, res) => res.send(index));

const port = process.env.PORT || 5500;
app.listen(port, () => log.INFO(`Listening on port ${port}...`));
