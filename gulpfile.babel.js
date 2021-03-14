'use strict';

// Импорт плагинов
import { basename } from 'path';
import gulp from 'gulp';
import webpack from 'webpack';
import clean from 'gulp-clean';
import cached from 'gulp-cached';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import webpackStream from 'webpack-stream';
import htmlWebpackPlugin from 'html-webpack-plugin';
import miniCssExtractPlugin from 'mini-css-extract-plugin';
import faviconsWebpackPlugin from 'favicons-webpack-plugin';
import ignoreEmitWebpackPlugin from 'ignore-emit-webpack-plugin';
import imageMinimizerWebpackPlugin from 'image-minimizer-webpack-plugin';

// Пути к файлам
const paths = {
    html: { src: 'src/**/*.html', dest: 'dist' },
    css: { src: 'src/**/*.scss', dest: 'dist' },
    js: { src: 'src/**/*.js', dest: 'dist' },
    img: { src: 'src/**/!(favicon)*.+(jpg|jpeg|png|svg|gif)', dest: 'dist' },
    font: { src: 'src/**/*.+(eot|ttf|woff|woff2)', dest: 'dist' },
    favicon: { src: 'src/blocks/favicon/favicon.png' }
}

// Параметры сжатия изображений
const imageMinimizerOptions = [
    ['mozjpeg', { quality: 90, progressive: true }],
    ['optipng', { optimizationLevel: 5 }],
    ['gifsicle', { interlaced: true }],
    ['svgo', { plugins: [{ removeViewBox: false, collapseGroups: true }]}]
]

// Очистка директории dist
function clear() {
    return gulp.src('dist/!(php)*', { read: false })
        .pipe(clean());
}

// Обработка HTML
function html() {
    return gulp.src(paths.html.src)
        .pipe(webpackStream({
            mode: 'production',
            entry: './src/main/main.html',
            module: {
                rules: [
                    {
                        test: /\.html$/i,
                        loader: 'html-loader',
                        options: { sources: false }
                    }
                ]
            },
            plugins: [
                new htmlWebpackPlugin({ template: './src/main/main.html', filename: 'index.html' }),
                new faviconsWebpackPlugin({ logo: paths.favicon.src, cache: true, prefix: 'favicon/', inject: htmlPlugin => basename(htmlPlugin.options.filename) === 'index.html' }),
                new imageMinimizerWebpackPlugin({ minimizerOptions: { plugins: imageMinimizerOptions }}),
                new ignoreEmitWebpackPlugin(/\.js?$/)
            ]
        }, webpack))
        .on('error', function(error) {
            console.log(error);
            this.emit('end');
        })
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

// Обработка CSS
function css() {
    return gulp.src(paths.css.src)
        .pipe(plumber(function(error) {
            console.log(error);
            this.emit('end');
        }))
        .pipe(webpackStream({
            mode: 'production',
            entry: './src/main/main.scss',
            devtool: 'source-map',
            module: {
                rules: [
                    {
                        test: /\.scss$/i,
                        use: [
                            { loader: 'style-loader' },
                            { loader: miniCssExtractPlugin.loader, options: { esModule: false }},
                            { loader: 'css-loader?url=false'},
                            { loader: 'postcss-loader', options: { postcssOptions: { plugins: [ 'autoprefixer' ]}}},
                            { loader: 'sass-loader', options: { webpackImporter: false, sassOptions: { includePaths: ['node_modules'], outputStyle: 'compressed' }}}
                        ]
                    }
                ]
            },
            plugins: [
                new miniCssExtractPlugin({ filename: 'css/style.min.css' }),
                new ignoreEmitWebpackPlugin(/\.js?$/)
            ]
        }, webpack))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.stream());
}

// Обработка JS
function js() {
    return gulp.src(paths.js.src)
        .pipe(plumber(function(error) {
            console.log(error);
            this.emit('end');
        }))
        .pipe(webpackStream({
            mode: 'production',
            entry: './src/main/main.js',
            output: {
                filename: 'js/script.min.js'
            },
            devtool: 'source-map',
            module: {
                rules: [
                    {
                        test: /\.js?$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader'
                    }
                ]
            }
        }, webpack))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
}

// Обработка изображений
function img() {
    return gulp.src(paths.img.src)
        .pipe(cached())
        .pipe(webpackStream({
            mode: 'production',
            module: {
                rules: [
                    {
                        test: /\.(jpe?g|png|gif|svg)$/i,
                        use: [
                            { loader: 'file-loader?name=[name].[ext]' }
                        ]
                    }
                ]
            },
            plugins: [
                new imageMinimizerWebpackPlugin({ minimizerOptions: { plugins: imageMinimizerOptions }}),
                new ignoreEmitWebpackPlugin(/\.js?$/)
            ]
        }, webpack))
        .pipe(rename({ dirname: 'img' }))
        .pipe(gulp.dest(paths.img.dest))
        .pipe(browserSync.stream());
}

// Обработка шрифтов
function font() {
    return gulp.src(paths.font.src)
        .pipe(webpackStream({
            mode: 'production',
            module: {
                rules: [
                    {
                        test: /\.(eot|ttf|woff|woff2)$/i,
                        use: [
                            { loader: 'file-loader?name=[name].[ext]' }
                        ]
                    }
                ]
            },
            plugins: [
                new ignoreEmitWebpackPlugin(/\.js?$/)
            ]
        }, webpack))
        .pipe(rename({ dirname: 'font' }))
        .pipe(gulp.dest(paths.font.dest))
        .pipe(browserSync.stream());
}

// Отслеживание изменений
function watchFiles() {
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.css.src, css);
    gulp.watch(paths.js.src, js);
    gulp.watch(paths.img.src, img);
    gulp.watch(paths.font.src, font);
}

// Веб-сервер
function liveServer() {
    browserSync.init({ server: { baseDir: 'dist' }, port: 3000 });
}

// Группа задач
const build = gulp.series(clear, gulp.parallel(html, css, js, img, font));
const watch = gulp.parallel(watchFiles, liveServer);

// Экспорт задач
export { clear, html, css, js, img, font, build, watch };