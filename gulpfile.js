var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var serverConfig = require('./serverConfig.json')
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('./app/assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/tabletop/src/tabletop.js',
      './bower_components/lodash/lodash.js',
      './bower_components/d3/d3.js',
      './bower_components/handlebars/handlebars.min.js',
      './bower_components/bootstrap/dist/js/bootstrap.js',
      './bower_components/leaflet.markercluster/dist/leaflet.markercluster-src.js',
      './bower_components/masonry/dist/masonry.pkgd.js'
       ],
      {base: 'bower_components/'}
    )
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/assets/js/'));
});


gulp.task('serve', function() {
    browserSync.init({ server: "./app" });

    gulp.watch('./app/assets/scss/*.scss', ['sass']);
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

gulp.task('build',['sass', 'js']);
gulp.task('default', ['build', 'watch']);
