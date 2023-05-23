const chalk = require("chalk");
const { src, dest, task, watch } = require("gulp");
const imagemin = require("gulp-imagemin");
const gulpWebp = require("gulp-webp");
const { resolvePath } = require("./nw-fs");
const { resolve } = require("path");

module.exports = function convert(path, options, done) {
  const resolvedPath = resolvePath(path);

  task("convert", function (cb) {
    try {
      return (
        src(resolvedPath)
          .on("error", function (err) {
            cb(err);
          })

          // .pipe(
          //   imagemin(
          //     [
          //       imagemin.gifsicle({ interlaced: true }),
          //       imagemin.mozjpeg({ quality: 75, progressive: true }),
          //       imagemin.optipng({ optimizationLevel: 5 }),
          //       imagemin.svgo({
          //         plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          //       }),
          //     ],
          //     {
          //       silent:true
          //     }
          //   )
          // )

          .on("error", function (err) {
            cb(err);
          })

          .pipe(gulpWebp())

          .on("error", function (err) {
            cb(err);
          })

          .pipe(dest("output"))

          .on("end", function () {
            cb();
          })
      );
    } catch (err) {
      return cb(err);
    }
  });
  if (options.watch) {
    task("convert")(done);

    // if (!isDir(options.dir))
    //   return log(
    //     chalk.red("node-webp: only directories are supported in watch mode")
    //   );

    watch(resolvedPath, () => task("convert")(done));
    console.log(chalk.green(`node-webp: watching on ${path}`));
  } else {
    task("convert")(done);
  }
};
