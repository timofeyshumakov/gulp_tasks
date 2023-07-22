var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var sass = require('gulp-sass')(require('sass'));
var cssbeautify = require('gulp-cssbeautify');
var stripCssComments = require('gulp-strip-css-comments');
var rename = require("gulp-rename");
var rigger = require('gulp-rigger');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');


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

var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){ 
    return gulp.src(['css/style.sass']) 
	.pipe(cssbeautify())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
.pipe(stripCssComments())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		        require('cssnano')({
            preset: 'default',
        })
		.pipe(plumber())

        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true})) 

		 
});
gulp.task('jst', async ()=> {
    return gulp.src(['js/*.js']) 
        .pipe(rigger())
		.pipe(uglify())
        .pipe(gulp.dest('dist/'));
});
exports.default = 'jst';
