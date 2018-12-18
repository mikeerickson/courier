#!/usr/bin/env node

const colors = require("chalk");
const parser = require("yargs-parser");
const pkgInfo = require("./package.json");

// Load Commands
const Runner = require("./src/commands/Runner");

class CLI {
  constructor(argv) {
    this.command = argv[2];
    this.arguments = argv;
    this.handleCommands(this.command, this.arguments);
  }
  showHelp() {
    let help = `
${colors.yellow.bold("Usage")}:
  courier <command> [options]
  npm <command> [options]
  ${colors.magenta("Make sure you have aliased npm to run courier")}

  ${colors.green("NOTE: You can remove alias by executing `unlink npm`")}
    `;

    let options = `
${colors.yellow.bold("Options")}:
  --help, -h, -H    Shows help (this screen)
  --version, -V     Shows version
    `;
    console.log(`${help}\n${options}`);
  }
  showVersion() {
    console.log("");
    console.log(colors.cyan(`⚙️  ${pkgInfo.packageName} v${pkgInfo.version}`));
    console.log(colors.keyword("orange")(`   *** patched npm ***`));
    console.log(colors.yellow(`   ${pkgInfo.tagline}`));
  }
  handleCommands(command, argv) {
    const args = parser(argv);
    if (args.hasOwnProperty("_")) {
      delete args["_"];
    }

    // set default flags
    args.force = args.hasOwnProperty("force") ? args.force : false;
    args.f = args.hasOwnProperty("f") ? args.f : false;
    args.force || args.f ? (args.force = args.f = true) : null;

    let showHelp = args.hasOwnProperty("h") || args.hasOwnProperty("H") || args.hasOwnProperty("help");
    let showVersion = args.hasOwnProperty("-V") || args.hasOwnProperty("version");
    if (showHelp) {
      this.showVersion();
      this.showHelp();
      process.exit(1);
    }

    if (showVersion) {
      this.showVersion();
      process.exit(1);
    }

    switch (command) {
      case "i":
      case "install":
        new Runner(command, args);
        break;
      default:
        new Runner(command, args);
    }
  }
}

new CLI(process.argv);
