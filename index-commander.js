#!/usr/bin/env node

/**
 * Module dependencies.
 */

const colors = require("chalk");
const program = require("commander");
const pkgInfo = require("./package.json");

const showVersion = () => {
  return "show version";
};

const showHelp = () => {
  console.log("showHelp");
};
program.version("0.1.0").option("-f, --force", "Force npm execution");

program.on("--help", function() {
  console.log("");
  console.log("Examples:");
  console.log("  $ custom-help --help");
  console.log("  $ custom-help -h");
});

program.parse(process.argv);

console.log("here");
// console.log("you ordered a pizza with:");
// if (program.peppers) console.log("  - peppers");
// if (program.pineapple) console.log("  - pineapple");
// if (program.bbqSauce) console.log("  - bbq");
// console.log("  - %s cheese", program.cheese);
