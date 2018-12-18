const ora = require("ora");
const execa = require("execa");
const colors = require("ansi-colors");

const { Confirm } = require("enquirer");

class Runner {
  constructor(command, args) {
    if (args.hasOwnProperty("force") && !args.force) {
      const prompt = new Confirm({
        name: "pkg",
        message: "Are you sure you wish to use npm?"
      });

      prompt
        .run()
        .then(answer => {
          answer ? this.executeCommand(process.argv) : process.exit(1);
        })
        .catch(console.error);
    } else {
      this.executeCommand(process.argv);
    }
  }
  executeCommand(argv) {
    argv.splice(0, 2); // remove first two items
    let idx = argv.indexOf("--force");
    idx !== -1 ? argv.splice(idx, 1) : null;
    // start spinner
    const spinner = ora(colors.yellow("Installing modules...")).start();
    execa("npm", argv)
      .then(result => {
        spinner.stop();
      })
      .catch(err => console.log(err));
  }
}

module.exports = Runner;
