var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var sass = require('gulp-sass')(require('sass'));
var cssbeautify = require('gulp-cssbeautify');
var stripCssComments = require('gulp-strip-css-comments');
var rename = require("gulp-rename");
var rigger = require('gulp-rigger');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var svgmin =require('gulp-svgmin');

// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('serve', (cb) =>{

 gulp.src('projtect_tmplate/source/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('dist/'));
	cb();
});


exports.watchers = () => {
	 
	    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
	
  gulp.watch("*.sass", (done) => {
	gulp.src('css\\style.css')
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(cssbeautify())
		.pipe(stripCssComments())
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({stream: true})) 
    done();
  });

  gulp.watch("*.html").on("change", reload);
  
  gulp.watch("*.pug", (done) => {
   gulp.src('*.pug')
    .pipe(pug({}))
    .pipe(gulp.dest('dist/'));
      done();
  });
  
   gulp.watch("*.js", (done) => {
	   gulp.src(['js/*.js']) 
        .pipe(rigger())
		.pipe(uglify())
        .pipe(gulp.dest('dist/'));
    done();
  });
};

exports.defaultTask = (cb) => {
  gulp.src('../sourse/*.svg')
  
    .pipe(svgmin())
 .pipe(gulp.dest('../img'))
	cb();
};

