const { Confirm } = require("enquirer");
const colors = require("ansi-colors");
const execa = require("execa");
const ora = require("ora");

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
    argv.splice(0, 2); // remove first two items
    let idx = argv.indexOf("--force");
    idx !== -1 ? argv.splice(idx, 1) : null;
    // start spinner
    const spinner = ora(colors.magenta("Installing modules...")).start();
    execa("npm", argv)
      .then(result => {
        spinner.stop();
      })
      .catch(err => console.log(err));
  }
}

module.exports = Runner;
