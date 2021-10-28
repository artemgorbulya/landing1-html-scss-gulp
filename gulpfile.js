const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const minifyjs = require('gulp-minify');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const deletedir = require('del');

function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        server: { baseDir: './' }, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}


//сжатие и копирование картинок в dist
function images() {
    return src('src/img/**/*')
        .pipe(imagemin())
        .pipe(dest('dist/img/'))
}

function startwatch() {

    // Мониторим папку-источник изображений и выполняем images(), если есть изменения
    watch('src/img/**/*', images);
    watch('src/js/*.js', scripts);
    watch('src/scss/*.scss', styles);
    watch('./index.html').on('change', browserSync.reload);

}


//очистка папки dist
function cleandist() {
    return deletedir('dist/**/*', { force: true })
}

function scripts() {
    return src([ // Берём файлы из источников
         // Пример подключения библиотеки
        'src/js/*.js', // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
    ])
        .pipe(concat('scripts.min.js')) // Конкатенируем в один файл
         .pipe(uglify()) // Сжимаем JavaScript
        .pipe(dest('dist/')) // Выгружаем готовый файл в папку назначения
        .pipe(browserSync.stream())

}

function styles() {
    return src('src/scss/*.scss') // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concat('styles.min.css')) // Конкатенируем в файл app.min.js
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
        .pipe(cleanCSS( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
        .pipe(dest('dist/')) // Выгрузим результат в папку "app/css/"
        .pipe(browserSync.stream())

}


exports.images = images;
exports.clean = cleandist;
exports.scripts = scripts;
exports.styles = styles;
exports.browsersync = browsersync;
exports.startwatch = startwatch;

exports.build = series(cleandist, styles, scripts, images);
exports.dev = parallel(images, styles, scripts, browsersync, startwatch);