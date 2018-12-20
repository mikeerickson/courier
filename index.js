#!/usr/bin/env node

const colors = require("chalk");
const updateNotifier = require("update-notifier");
const pleaseUpgradeNode = require("please-upgrade-node");

const pkg = require("./package.json");
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

// instantiate CLI process
new CLI(process.argv);
