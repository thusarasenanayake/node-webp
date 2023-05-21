#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { getFiglet, getLayout, getHelpMessage } = require("./helpers/arts.js");
const resolvePath = require("./helpers/nw-fs.js");
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

argv
  .command({
    command: "help",
    describe: "Show help",
    handler: async function () {
      log(await getHelpMessage());
    },
  })

argv
  .command({
    command: "*",
    // describe: "",
    handler: async function (inputs) {
      const paths = inputs._;

      if (paths.length === 0 || inputs.h) {
        // return console.log(await getLayout(await getHelp()));
        return console.log(await getHelpMessage())
      }

      log(chalk.cyanBright("\n\n" + (await getFiglet())));

      paths.forEach((path) => {
        try {
          const cleanPath = resolvePath(path);
          convert(cleanPath, function (err) {
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
  // .check((argv, options) => {
  //   // console.log(options);
  //   const paths = argv._;
  //   if (paths.length === 0) {
  //     throw new Error(chalk.red("node-webp: at least one path is required"));
  //   } else {
  //     return true;
  //   }
  // })
  .usage("node-webp cat.png dog.png images/");

argv.parse();
