const gulp = require('gulp');
const clean = require('gulp-clean');
const webpack = require('webpack');
const gutil = require('gulp-util');
const webpackDistConf = require('./conf/webpack.dist');


gulp.task('cleanPublishDir',cleanPublishDir);

gulp.task('webpack:dist', done => {
  process.env.NODE_ENV = 'production';
  webpackWrapper(false, webpackDistConf, done);
});

gulp.task('default', gulp.series('cleanPublishDir','webpack:dist'));


function cleanPublishDir(){
  return gulp.src('./dist', {read: false})
        .pipe(clean({force: true}));
};


function webpackWrapper(watch, conf, done) {
  const webpackBundler = webpack(conf);

  const webpackChangeHandler = (err, stats) => {
    gutil.log(stats.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false
    }));
    if (done) {
      done();
      done = null;
    } else {
      browserSync.reload();
    }
  };

  if (watch) {
    webpackBundler.watch(200, webpackChangeHandler);
  } else {
    webpackBundler.run(webpackChangeHandler);
  }
}
