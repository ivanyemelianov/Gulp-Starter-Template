const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// Compiler
function stylesheet() {
    //1. Find my sass
    return gulp.src('./sass/**/*.sass')
    //2. Pass it thru compiler
        .pipe(sass())
    //3. Save compiled css
        .pipe(cleanCSS())
        .pipe(gulp.dest('./css'))
    //4. Stream changes across browsers
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        /*port: 3000,
        proxy: 'http://website.loc/'*/
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./sass/**/*.sass', stylesheet);
    gulp.watch('./**/*.php', stylesheet).on('change', browserSync.reload);
}

exports.stylesheet = stylesheet;
exports.watch = watch;