#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { getFiglet, getLayout, getHelpMessage } = require("./helpers/arts.js");
const { resolvePath } = require("./helpers/nw-fs.js");
const convert = require("./helpers/functions.js");
const chalk = require("chalk");
const { basename } = require("path");
// const { getHelp } = require("yargs");

const argv = yargs(hideBin(process.argv));
// argv.wrap(50);
// argv.usage("Convert and minify images to WebP");
// argv.epilogue(chalk.yellow("https://github.com/thusarasenanayake/node-webp"));
argv.help(false);

const log = console.log;

argv.command({
  command: "help",
  describe: "Show help",
  handler: async function () {
    log(await getHelpMessage());
  },
});

argv.option("watch", {
  alias: "w",
  type: "boolean",
});

argv
  .command({
    command: "*",
    // describe: "",
    handler: async function (inputs) {
      const paths = inputs._;
      
      if (paths.length === 0 || inputs.h || inputs.help) {
        // return console.log(await getLayout(await getHelp()));
        return console.log(await getHelpMessage());
      }

      if (paths.length !== 1 && inputs.w) {
        // return console.log(await getLayout(await getHelp()));
        return console.log(await getHelpMessage());
      }

      log(chalk.cyanBright("\n\n" + (await getFiglet())));

      const options = {
        watch: inputs.w ? true : false,
      };

      paths.forEach((path) => {
        // only used by watch mode
        options.dir = path;
        try {
          const cleanPath = resolvePath(path);
          convert(cleanPath, options, function (err) {
            if (err) {
              log(chalk.red(`node-webp: ${err.message}`));
            } else {
              log(
                chalk.green(
                  `node-webp: converted successfully ('${basename(path)}')`
                )
              );
            }
          });
        } catch (err) {
          log(chalk.red("node-webp: " + err.message));
        }
      });
    },
  })
  .usage("node-webp cat.png dog.png images/");

// .check((argv, options) => {
//   // console.log(options);
//   const paths = argv._;
//   if (paths.length === 0) {
//     throw new Error(chalk.red("node-webp: at least one path is required"));
//   } else {
//     return true;
//   }
// })

argv.parse();
