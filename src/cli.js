const colors = require("chalk");
const parser = require("yargs-parser");
const pkgInfo = require("../package.json");

// Load Commands
const npm = require("./commands/npm");

/**
 * CLI class
 *
 * @class CLI
 */
class CLI {
  /**
   *Creates an instance of CLI.
   * @param {*} argv
   * @memberof CLI
   */
  constructor(argv) {
    this.command = argv[2];
    this.arguments = parser(argv);
    delete this.arguments["_"];

    if (this.command === undefined) {
      this.showHelp();
      process.exit(1);
    } else {
      this.handleCommands(this.command, argv);
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
   * getArguments
   *
   * @returns
   * @memberof CLI
   */
  getArguments() {
    return this.arguments;
  }

  /**
   * argumentHasOption
   *
   * @param {string} [key=""]
   * @returns
   * @memberof CLI
   */
  argumentHasOption(key = "") {
    return this.arguments.hasOwnProperty(key);
  }

  /**
   * getOptionValue
   *
   * @param {*} key
   * @param {string} [defaultValue=""]
   * @returns
   * @memberof CLI
   */
  getOptionValue(key, defaultValue = "") {
    if (this.argumentHasOption(key)) {
      return this.arguments[key];
    } else {
      return defaultValue;
    }
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
    let showVersion = args.hasOwnProperty("V") || args.hasOwnProperty("version");
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
        new npm(command, args);
        break;
      default:
        new npm(command, args);
    }
  }
}

module.exports = CLI;
