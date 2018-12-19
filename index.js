#!/usr/bin/env node

const colors = require("chalk");
const repeating = require("repeating");
const terminalInfo = require("window-size");
const pkg = require("./package.json");
const updateNotifier = require("update-notifier");
const pleaseUpgradeNode = require("please-upgrade-node");

const CLI = require("./src/cli");

// check node version
pleaseUpgradeNode(pkg, {
  exitCode: 0,
  message: requiredVersion => {
    return colors.red(`\n 🚫  ${pkg.packageName} requires Node version ` + requiredVersion + " or greater.");
  }
});

// check for any cli updates
updateNotifier({ pkg }).notify();

if (process.env.PWD === process.env.OLDPWD) {
  console.log("");
  console.log(colors.red(repeating(terminalInfo.width, "=")));
  console.log(colors.red("🚫  WARNING: You are executing this command in the current development directory!"));
  console.log(colors.red(repeating(terminalInfo.width, "=")));
}

new CLI(process.argv);
