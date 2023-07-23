var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var sass = require('gulp-sass')(require('sass'));
var cssbeautify = require('gulp-cssbeautify');
var stripCssComments = require('gulp-strip-css-comments');
var rename = require("gulp-rename");
var rigger = require('gulp-rigger');
var uglify = require('gulp-uglify');
var cssnano = require('cssnano');
var autoprefixer = require('gulp-autoprefixer');


// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", reload);
	
});





exports.default = () => (
	gulp.src('css\\style.css')
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))

		.pipe(cssbeautify())
		.pipe(stripCssComments())
		.pipe(gulp.dest('dist'))
);
gulp.task('jst', async ()=> {
    return gulp.src(['js/*.js']) 
        .pipe(rigger())
		.pipe(uglify())
        .pipe(gulp.dest('dist/'));
});
exports.jst = 'jst';
exports.sass = 'sass';
