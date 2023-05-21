const boxen = require("boxen");
const chalk = require("chalk");
const figlet = require("figlet");
// let boxen;

// const dynamicImport = async () => {
//   boxen = await import("boxen");
// };

async function getLayout(string) {
  try {
    // await dynamicImport();
    let figlet = await getFiglet();
    string = figlet + string;

    // return boxen.default(string, {
    return boxen(string, {
      title: "Convert and minify images to WebP",
      titleAlignment: "center",
      borderColor: "cyanBright",
      borderStyle: "round",
      padding: 1,
      margin: 1,
      // fullscreen:true
    });
  } catch (error) {
    console.log(error);
    return string;
  }
}

function getFiglet(text = "node webp") {
  return new Promise(function (resolve, reject) {
    figlet(
      text,
      {
        // width:30
      },
      function (err, data) {
        if (data) resolve(data + "\n\n");
        if (err) reject(err);
      }
    );
  });
}

async function getHelpMessage() {
  const text = `
node-webp cat.png dog.png images/

Commands:
  node-webp help   Show help

Options:
      --version    Show version number                                  
  -h, --help       Show help    

Bugs:
  ${chalk.yellow("https://github.com/thusarasenanayake/node-webp")}

`;
  return await getLayout(text);
}

module.exports = {
  getFiglet,
  getLayout,
  getHelpMessage,
};
