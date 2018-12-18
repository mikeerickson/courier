#!/usr/bin/env node

"use strict";
const meow = require("meow");
const Runner = require("./src/Runner");

const cli = meow(
  `
    Usage
      $ foo <input>

    Options
      --force, -f  Execute without confirmation

    Examples
      $ courier install
      $ courier install --force

`,
  {
    flags: {
      force: {
        type: "boolean",
        alias: "f"
      }
    }
  }
);

new Runner(cli.input[0], cli.flags);
