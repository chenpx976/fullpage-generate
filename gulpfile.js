var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var LessPluginCleanCSS = require('less-plugin-clean-css'),
  LessPluginAutoPrefix = require('less-plugin-autoprefix'),
  cleancss = new LessPluginCleanCSS({
    advanced: true
  }),
  autoprefix = new LessPluginAutoPrefix({
    browsers: ["last 10 versions"]
  });
var path = require('path');
var gls = require('gulp-live-server');

var server = gls.static('build', 8001);

gulp.task('scripts', function() {
  gulp.src('app/js/main.js')
    .pipe(plugins.browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('less', function() {
  return gulp.src('./app/less/**/*.less')
    .pipe(plugins.less({
      plugins: [autoprefix, cleancss]
    }))
    // .pipe(plugins.minifyCss())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('static', function() {
  gulp.src('./app/img/**/*')
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('serve', function() {
  server.start();
});

gulp.task('watch', ['server'], function() {
  gulp.watch('./app/less/**/*.less', ['less']);
  gulp.watch('./app/js/**/*.js', ['scripts']);
  gulp.watch('./app/img/**/*', ['static']);
  gulp.watch('./build/**/*', function() {
    server.notify.apply(server, arguments);
  });
});
gulp.task('server', ['scripts', 'less', 'static', 'serve']);

gulp.task('default', ['server', 'watch']);