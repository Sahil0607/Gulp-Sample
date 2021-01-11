const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
    - - Top Level Function --
    gulp.task - Define Task
    gulp.src - Point file to use
    gulp.dest - Point to folder to output
    gulp.watch - Point file or folder for changes
*/

// Log message
gulp.task('message', (done) => {
     console.log('Gulp is running ...');
     done();
});

// Copy html file
gulp.task('CopyHtml', (done) => {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done();
});

// Image min
gulp.task('imageMin', (done) => {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
    done();
});

// Uglify js file
gulp.task('minifyJs', (done) => {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    done();
});

// complie sass
gulp.task('sass', (done) => {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
    done();
});

gulp.task('scripts', (done) => {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js')) // Concate multiple file in 1
        .pipe(uglify())     // minify file
        .pipe(gulp.dest('dist/js'));
    done();
})
// Default task
gulp.task('run', gulp.series('message', 'CopyHtml', 'imageMin', 'scripts', 'sass'));
// minifyJs is already use in concate so not use in gulp.series.

// Watcher on file location and task
gulp.task('watch', (done) => {
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('CopyHtml'));
    done();
});

gulp.task('default', gulp.series('run', 'watch'));

