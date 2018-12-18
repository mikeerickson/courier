const ora = require("ora");
const path = require("path");
const execa = require("execa");
const fs = require("fs-extra");
const colors = require("ansi-colors");
const parse = require("yargs-parser");
const exec = require("child_process").execSync;
const spawn = require("child_process").spawnSync;

const { Confirm } = require("enquirer");

class Runner {
  constructor(command, args) {
    if (command.toLowerCase() !== "install" && command.toLowerCase() !== "i") {
      this.execute(process.argv);
    } else {
      if (!args.force) {
        let lockFilename = path.join(process.env.PWD, "yarn.lock");
        if (fs.existsSync(lockFilename)) {
          console.log("");
          const prompt = new Confirm({
            name: "pkg",
            initial: "n",
            format() {
              return this.value === true ? "Yes" : "No";
            },
            message:
              colors.yellow(`⚠️  This project has been configured to use ${colors.cyan("yarn")}.\n`) +
              colors.cyan("Are you sure you wish to use npm?")
          });

          prompt
            .run()
            .then(answer => {
              answer ? this.executeCommand(process.argv) : console.log(colors.red("\n🚫 Execution Aborted"));
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
  execute(argv = []) {
    let args = argv.slice(2).join(" ");
    let cmd = "npm " + args;
    exec(cmd, { stdio: "inherit" });
  }
  executeDefault(argv = []) {
    argv.splice(0, 2); // remove first two items
    let modules = argv
      .join(" ")
      .replace("install", "")
      .replace("i", "");
    const spinner = ora(colors.yellow(`Running ${"npm"}${modules}...`)).start();
    execa("npm", argv)
      .then(result => {
        spinner.stop();
      })
      .catch(err => {
        console.error(err);
      });
  }

  executeCommand(argv) {
    argv.splice(0, 2); // remove first two items
    let args = parse(argv);

    let idx = argv.indexOf("--force");
    idx !== -1 ? argv.splice(idx, 1) : null;

    let idx2 = argv.indexOf("-f");
    idx2 !== -1 ? argv.splice(idx2, 1) : null;

    let forceStr = args.force || args.f ? " (with force) " : "";

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
