'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const tinypng = require('gulp-tinypng');

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
    },
    images: {
        src: 'src/images/*.{jpg,png}',
        dest: 'build/assets/images/'
    },
    fonts: {
        src: 'src/fonts/**/*.{woff,woff2}',
        dest: 'build/assets/fonts'
    }
};

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
};

// scss
function styles_dev() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest));
};

function styles_build() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest));
};

// images
function images_dev() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
};

function images_build() {
    return gulp.src(paths.images.src)
        .pipe(tinypng('sKMWeC_PI-Hg0mDj_YuMRQYMHPVg71Y4'))
        .pipe(gulp.dest(paths.images.dest));
};

// fonts
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

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
    gulp.watch(paths.styles.src, styles_dev);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images_dev);
    gulp.watch(paths.fonts.src, fonts);
};

// локальный сервер
function serve() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
};

// exports.templates = templates;
// exports.styles_dev = styles_dev;
// exports.clean = clean;
// exports.watch = watch;
// exports.serve = serve;
// exports.imagemin_dev = imagemin_dev;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(templates, styles_dev, scripts, images_dev, fonts),
    gulp.parallel(watch, serve)
));

gulp.task('build', gulp.series(
    clean,
    gulp.parallel(templates, styles_build, scripts, images_build, fonts),
    gulp.parallel(watch, serve)
));