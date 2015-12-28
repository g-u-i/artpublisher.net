var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var serverConfig = require('./serverConfig.json')
var browserSync = require('browser-sync').create();
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src('./app/assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/lodash/lodash.js',

      './bower_components/tabletop/src/tabletop.js',

      './bower_components/handlebars/handlebars.min.js',
      './bower_components/bootstrap/dist/js/bootstrap.js',
      './bower_components//bootstrap-select-sass/js/bootstrap-select.js',

      './bower_components/leaflet/dist/leaflet.js',
      './bower_components/leaflet-hash/leaflet-hash.js',

      './app/assets/js/isoCountries.js'
      ],
      {base: 'bower_components/'}
    )
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/assets/js/'));
});

gulp.task('templates', function(){
  gulp.src('./templates/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'ArtPubApp',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('app/assets/js/'));
});

gulp.task('serve', function() {
    browserSync.init({ server: "./app" });

    gulp.watch('./app/assets/scss/*.scss', ['sass']);
    gulp.watch('./templates/*.hbs', ['templates']);

    gulp.watch("./templates/*.hbs").on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task( 'deploy', ['build'], function () {

    var conn = ftp.create(serverConfig);
    var globs = [
        './app/assets/src/**',
        './app/assets/css/**',
        './app/assets/images/**',
        './app/assets/js/**',
        './app/assets/fonts/**',
        './app/index.html'
    ];

    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( '/' ) ) // only upload newer files
        .pipe( conn.dest( '/' ) );
});


gulp.task('build',['sass', 'js', 'templates']);
gulp.task('default', ['build', 'watch']);
