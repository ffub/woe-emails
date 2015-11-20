var gulp = require('gulp');
var combineQueries = require('gulp-combine-media-queries');
var nunjucks = require('gulp-nunjucks-html');
var inlinesource = require('gulp-inline-source');
var sass = require('gulp-sass');
var ghPages = require('gulp-gh-pages');

// Compile Sass
gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compact'
    }))
    .pipe(combineQueries())
    .pipe(gulp.dest('src/css'));
});

// Compile templates
gulp.task('templates', function () {
  return gulp.src('src/templates/**.html')
    .pipe(nunjucks({
      searchPaths: ['src/templates']
    }))
    .pipe(inlinesource())
    .pipe(gulp.dest('output'));
});

// Deploy to Github Pages
gulp.task('deploy', function() {
  return gulp.src('./output/**/*')
    .pipe(ghPages());
});

// Default Task
gulp.task('default', ['sass', 'templates']);