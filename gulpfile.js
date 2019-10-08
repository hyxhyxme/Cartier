const gulp = require("gulp");
const babel = require("gulp-babel");
const ugligy = require("gulp-uglify");
const webserver = require("gulp-webserver");
const sass = require("gulp-sass");


gulp.task("server",["build"],()=>{
    gulp.src("./dist")
        .pipe(webserver({
            livereload:true,
            proxies:[{
                source:'/Cartier',
                target:'https://www.cartier.cn/zh-cn/%E7%B3%BB%E5%88%97/%E9%85%8D%E4%BB%B6%E7%B3%BB%E5%88%97/%E7%9A%AE%E5%85%B7/%E9%80%81%E7%BB%99%E4%BB%96%E7%9A%84%E6%89%8B%E6%8F%90%E5%8C%85/must-de-cartier%E7%B3%BB%E5%88%97.productlistingservletv2.json'
            }]
        }))
    gulp.watch("./src/**/*.js",["compileJS"]);
    gulp.watch("./src/**/*.html",["compileHTML"]);
    gulp.watch("./src/**/*.scss",["compileCSS"]);
    gulp.watch("./src/static/**/*.*",["compileStatic"]);
})

gulp.task("build", ()=>{
    gulp.src("./src/scripts/**/*.js",{
        base:"./src"
    }) .pipe(babel({
        presets : ["@babel/env"]
    })).pipe(gulp.dest("./dist"));
    gulp.src("./src/pages/**/*.js",{
        base:"./src"
    }).pipe(babel({
        presets : ["@babel/env"]
    })).pipe(gulp.dest("./dist"));
    gulp.src("./src/pages/**/*.html",{
        base:"./src"
    }).pipe(gulp.dest("./dist"));
    gulp.src("./src/styles/**/*.scss",{
        base:"./src"
    }).pipe(sass({
        outputStyle:"expanded"
    })).on('error',sass.logError)
    .pipe(gulp.dest("./dist"));
    gulp.src("./src/static/**/*.*",{
        base:"./src"
    }).pipe(gulp.dest("./dist"))
})


gulp.task("compileJS",()=>{
    gulp.src("./src/pages/**/*.js",{
        base:"./src"
    }).pipe(babel({
        presets : ["@babel/env"]
    })).pipe(gulp.dest("./dist"));
    gulp.src("./src/scripts/**/*.js",{
        base:"./src"
    }).pipe(babel({
        presets : ["@babel/env"]
    })).pipe(gulp.dest("./dist"));
})


gulp.task("compileHTML",()=>{
    gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist"))
})

gulp.task("compileCSS",()=>{
    gulp.src("./src/**/*.scss")
        .pipe(sass({
            outputStyle:"expanded"
        }))
        .on('error',sass.logError)
        .pipe(gulp.dest("./dist"))
})

gulp.task("compileStatic",()=>{
    gulp.src("./src/static/**/*.*",{
        base:"./src"
    }).pipe(gulp.dest("./dist"))
})