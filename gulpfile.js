var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var minify_css = require('gulp-minify-css');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var extend = require('gulp-extend');

var paths = {
  vendor_scripts: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/table-fixed-header/table-fixed-header.js',
    'bower_components/ScrollToFixed/jquery-scrolltofixed.js'
  ],
  scripts: 'public/scripts/**/*.js',
  vendor_styles: [
    'bower_components/bootstrap/dist/css/bootstrap.css'
  ],
  styles: 'public/styles/*.less',
  images: 'public/images/**/*',
  vendor_fonts: [
    'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.*'
  ],
  rev: [
    'public/build/scripts/*.js',
    'public/build/styles/*.css'
  ],
  manifest: [
    'public/build/scripts/*/rev-manifest.json',
    'public/build/styles/*/rev-manifest.json'
  ]
};

gulp.task('clean', function (callback) {
  del(['public/build'], callback);
});

gulp.task('vendor_scripts', ['clean'], function () {
  return gulp.src(paths.vendor_scripts)
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(rev())
    .pipe(gulp.dest('public/build/scripts/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/build/scripts/1'));
});

gulp.task('scripts', ['clean'], function () {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(rev())
    .pipe(gulp.dest('public/build/scripts/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/build/scripts/2'));
});

gulp.task('vendor_styles', ['clean'], function () {
  return gulp.src(paths.vendor_styles)
    .pipe(minify_css())
    .pipe(concat('vendor.css'))
    .pipe(rev())
    .pipe(gulp.dest('public/build/styles'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/build/styles/1'));
});

gulp.task('styles', ['clean'], function () {
  return gulp.src(paths.styles)
    .pipe(less())
    .pipe(minify_css())
    .pipe(concat('app.css'))
    .pipe(rev())
    .pipe(gulp.dest('public/build/styles'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/build/styles/2'));
});

gulp.task('images', ['clean'], function () {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('public/build/images'));
});

gulp.task('vendor_fonts', ['clean'], function () {
  return gulp.src(paths.vendor_fonts)
    .pipe(gulp.dest('public/build/fonts'));
});

gulp.task('manifest', function (callback) {
  gulp.src(paths.manifest)
    .pipe(clean({ force: true }))
    .pipe(extend('manifest.json'))
    .pipe(gulp.dest('public/build'));
});

gulp.task('dev_vendor_styles', function () {
  return gulp.src(paths.vendor_styles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public/styles/'));
});

gulp.task('dev_vendor_scripts', function () {
  return gulp.src(paths.vendor_scripts)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/scripts/'));
});

gulp.task('dev_styles', function () {
  return gulp.src(paths.styles)
    .pipe(less())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/styles/'));
});

gulp.task('watch', function () {
  gulp.start(['dev_vendor_styles']);
  gulp.start(['dev_vendor_scripts']);
  gulp.start(['dev_styles']);
  gulp.watch(paths.vendor_styles, ['dev_vendor_styles']);
  gulp.watch(paths.vendor_scripts, ['dev_vendor_scripts']);
  gulp.watch(paths.styles, ['dev_styles']);
});

gulp.task('build', ['vendor_scripts', 'scripts', 'vendor_styles', 'styles', 'vendor_fonts', 'images']);
gulp.task('deploy', ['manifest'])
