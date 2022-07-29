import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';   //Стискає CSS файли
import webpcss from 'gulp-webpcss';  // Виводить WEBP зображення 
import autoprefixer from 'gulp-autoprefixer' // Додавання вендорних префіксів
import groupCssMediaQuerues from 'gulp-group-css-media-queries'; // Угрупування медіа запитів 

const sass = gulpSass(dartSass);


export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                massage: "Error: <%= error.massage %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQuerues()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ['last 3 versions'],
                    cascade: true
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: '.webp',
                    noWebpClass: '.no-webp'
                })

            ))

                //Розкоментувати коли потрібний не стиснутий дубиль файлів стилів
                .pipe(app.gulp.dest(app.path.build.css))
                .pipe(
                    app.plugins.if(
                        app.isBuild,
                        cleanCss()
                    )
                )
                .pipe(rename({
                    extname: ".min.css"
                }))
                .pipe(app.gulp.dest(app.path.build.css))
                .pipe(app.plugins.browsersync.stream())
     
}