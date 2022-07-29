// Основний модуль
import gulp from "gulp";
//  Імпорт шляшу
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plagins.js";
// Передаємо значення в глобальну змінну
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}
// Імпорт задач 
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js"
import { scss } from "./gulp/tasks/scss.js"
import { js } from "./gulp/tasks/js.js"
import { images } from "./gulp/tasks/images.js"
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js"
import { svgSprive } from "./gulp/tasks/svgSprive.js"
import { zip } from "./gulp/tasks/zip.js";
import {ftp } from "./gulp/tasks/ftp.js";

//  Спостерігач за змінами в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);  //gulp.series(html,ftp)
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprive }

// Послідовність обробки шрифтів
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

// Основні задачі
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// ПОбудова сценарію виконання задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deploZIP = gulp.series(reset, mainTasks, zip);
const deploFTP = gulp.series(reset, mainTasks, ftp);
// Експорт сценарію
export { dev }
export { build }
export { deploZIP }
export { deploFTP }

// Виконання сценарію за замовчуванням
gulp.task('default', dev);