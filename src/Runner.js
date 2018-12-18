const { Confirm } = require("enquirer");
const colors = require("ansi-colors");
const execa = require("execa");

class Runner {
  constructor(command, args) {
    if (args.hasOwnProperty("force") && !args.force) {
      const prompt = new Confirm({
        name: "pkg",
        message: "Are you sure you wish to use npm?"
      });

      prompt
        .run()
        .then(answer => this.executeCommand(process.argv))
        .catch(console.error);
    } else {
      this.executeCommand(process.argv);
    }
  }
  executeCommand(argv) {
    // remove element 0..1
    // remove --force
  }
}

module.exports = Runner;
