#!/usr/bin/env node
"use strict";

const hello = require("./routes/hello");
const cors = require("./middleware/cors");
const log = require("./common/logger");
const express = require("express");
const app = express();

log.INFO("Using config for", require("config").get("name"));

app.use(express.json());
app.use(cors);

app.use("/api/hello", hello);

const port = process.env.PORT || 5500;
app.listen(port, () => log.INFO(`Listening on port ${port}...`));
