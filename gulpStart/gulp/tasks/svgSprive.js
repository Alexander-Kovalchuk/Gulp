import svgSptite from 'gulp-svg-sprite';
export const svgSprive = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                mesaage: "Error: <%=error.message %>"
            })
        ))
.pipe(svgSptite({
    mode:{
        stact:{
            sprite:`../icons/icons.svg`,
            // Створити сторінку з переліком іконок
            example:true
        }
    }
}))

        .pipe(app.gulp.dest(`${app.path.build.images}`));
}