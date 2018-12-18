const ora = require("ora");
const path = require("path");
const execa = require("execa");
const fs = require("fs-extra");
const colors = require("ansi-colors");

const { Confirm } = require("enquirer");

class Runner {
  constructor(command, args) {
    if (command.toLowerCase() !== "install" && command.toLowerCase() !== "i") {
      this.executeDefault(process.argv);
    } else {
      if (args.hasOwnProperty("force") && !args.force) {
        let lockFilename = path.join(process.env.PWD, "yarn.lock");
        if (fs.existsSync(lockFilename)) {
          const prompt = new Confirm({
            name: "pkg",
            initial: "n",
            message:
              colors.yellow(`⚠️  This project has been configured to use ${colors.cyan("yarn")}.\n`) +
              colors.cyan("Are you sure you wish to use npm?")
          });

          prompt
            .run()
            .then(answer => {
              answer ? this.executeCommand(process.argv) : console.log(colors.red("🚫 Execution Aborted"));
            })
            .catch(console.error);
        } else {
          this.executeCommand(process.argv);
        }
      } else {
        this.executeCommand(process.argv);
      }
    }
  }
  executeDefault(argv = []) {
    argv.splice(0, 2); // remove first two items
    execa("npm", argv)
      .then(result => {
        /* success */
      })
      .catch(err => {
        console.error(err);
      });
  }

  executeCommand(argv) {
    argv.splice(0, 2); // remove first two items
    let idx = argv.indexOf("--force");
    idx !== -1 ? argv.splice(idx, 1) : null;
    let forceStr = idx !== -1 ? " (with force) " : "";

    let modules = argv
      .join(" ")
      .replace("install", "")
      .replace("i", "");

    // start spinner
    const spinner = ora(colors.yellow(`Running ${"npm"}${modules}${colors.magenta(forceStr)}...`)).start();
    execa("npm", argv)
      .then(result => {
        spinner.stop();
      })
      .catch(err => {
        spinner.stop();
        console.error(colors.red(err.stderr));
      });
  }
}

module.exports = Runner;
