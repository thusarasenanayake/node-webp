const { statSync } = require("fs");
const { resolve, extname, basename } = require("path");

const allowedImgTypes = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".bmp",
  ".tiff",
  ".webp"
];

module.exports = function resolvePath(path) {
  try {
    const fullPath = resolve(path);

    if (statSync(fullPath).isDirectory()) {
      return fullPath + `/**/*{${allowedImgTypes.toString()}}`;
    } else {
      if (isImage(fullPath)) {
        return fullPath;
      } else {
        throw new Error(`unsupported file type ('${extname(path)}')`);
      }
    }
  } catch (err) {
    if (err.code == "ENOENT")
      throw new Error(`no such file or directory ('${basename(path)}')`);
    else {
      throw new Error(err.message);
    }
  }
};

function isImage(filePath) {
  const fileExtension = extname(filePath);
  return fileExtension && allowedImgTypes.includes(fileExtension);
}
