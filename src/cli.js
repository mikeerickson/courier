const pkgInfo = require("../package.json");
const parser = require("yargs-parser");
const colors = require("chalk");

// Load Commands
const Runner = require("./commands/Runner");

/**
 * CLI class
 *
 * @class CLI
 */
class CLI {
  constructor(argv) {
    let command = argv[2];
    if (command === undefined) {
      this.showHelp();
      process.exit(1);
    } else {
      this.handleCommands(command, argv);
    }
  }

  /**
   * showHelp()
   *
   * @returns
   * @memberof CLI
   */
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
    let helpMessage = `${help}\n${options}`;
    console.log(helpMessage);
    return helpMessage;
  }

  /**
   * showVersion()
   *
   * @memberof CLI
   */
  showVersion() {
    console.log("");
    console.log(colors.cyan(`⚙️  ${pkgInfo.packageName} v${pkgInfo.version}`));
    console.log(colors.keyword("orange")(`   *** patched npm ***`));
    console.log(colors.yellow(`   ${pkgInfo.tagline}`));
  }

  /**
   * setDefaultArguments
   *
   * @param {*} args
   * @returns
   * @memberof CLI
   */
  setDefaultFlags(args) {
    if (args.hasOwnProperty("_")) {
      delete args["_"];
    }

    args.force = args.hasOwnProperty("force") ? args.force : false;
    args.f = args.hasOwnProperty("f") ? args.f : false;
    args.force || args.f ? (args.force = args.f = true) : null;
    return args;
  }

  /**
   * handleCommands(command: string, args: array)
   *
   * @param {*} command
   * @param {*} argv
   * @memberof CLI
   */
  handleCommands(command, argv) {
    // convert array of args to argument object
    let args = parser(argv);

    // setup all default flags
    args = this.setDefaultFlags(args);

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

    /**
     * Commands:
     * create switch statement as we could had different commands in the future which may call
     * different command classes
     */
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

module.exports = CLI;
