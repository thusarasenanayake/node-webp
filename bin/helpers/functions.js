const { src, dest, task } = require("gulp");
const imagemin = require("gulp-imagemin");
const gulpWebp = require("gulp-webp");

module.exports = function convert(srcPath, done) {
  task("convert", function (cb) {
    try {
      return (
        src(srcPath)
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
  task("convert")(done);
};
