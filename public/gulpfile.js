var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var webpack = require('gulp-webpack');

gulp.task('less', function () {
	return 
		gulp.src('./dist/**/*.less')
			.pipe(
				less({
					paths: [ path.join(__dirname, 'less', 'includes') ]
				})
			)
			.pipe(gulp.dest('./public/css'));
});

gulp.task('minify-css', function() {
	return
		gulp.src('styles/*.css')
			.pipe(
				minifyCss({
					compatibility: 'ie8'
				})
			)
			.pipe(gulp.dest('dist'));
});

gulp.task('webpack', function() {
	return
		gulp.src('src/entry.js')
			.pipe(
				webpack( require('./webpack.config.js') )
			)
			.pipe( gulp.dest('dist/') );
});

var lessPath = [
	"src/common/lib-var.less", 
	"src/common/lib-mixins.less", 
	"src/common/lib-reset.less",
	"src/common/lib-lay.less",
	"src/common/icon.less",
	"src/common/base.less",
	"src/components/**/*.less",
	"src/pages/**/*.less"
];
// 合并less, 便于后续打包
gulp.task('concat-less', function() {
	return 
		gulp.src(lessPath)
			.pipe(concat('chat.less'))
			.pipe(gulp.dest('./dist/less/'));
});



