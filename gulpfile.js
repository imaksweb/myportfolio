'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts/'
    }
};

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
};

// scss
function styles() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest));
};

// webpack
function scripts() {
    return gulp.src('src/scripts/main.js')
        .pipe(gulpWebpack(webpackConfig, webpack)) 
        .pipe(gulp.dest(paths.scripts.dest));
}

// очистка
function clean() {
    return del(paths.root);
};

// галповский вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.scripts.src, scripts);
};

// локальный сервер
function serve() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
};

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.watch = watch;
exports.serve = serve;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(templates, styles, scripts),
    gulp.parallel(watch, serve)
));