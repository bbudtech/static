/**
 *  Copyright 2017 Amardeep Rai
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// Modified by @huydhoang for use at BestBud, Inc.
// Upgrade code to Gulp v.4.0
// Customized workflow

"use strict";

const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const del = require("del");
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");

// Gulp task to minify CSS files
gulp.task(
  "styles",
  gulp.series(
    // Compile SASS and output to dist
    function() {
      return (
        gulp
          .src([
            "./src/assets/sass/main.scss",
            "./src/assets/sass/noscript.scss"
          ])
          // Compile SASS files
          .pipe(
            sass({
              outputStyle: "nested",
              precision: 10,
              includePaths: ["."],
              onError: console.error.bind(console, "Sass error:")
            })
          )
          // Auto-prefix css styles for cross browser compatibility
          .pipe(autoprefixer())
          // Minify the file
          .pipe(csso())
          // Output
          .pipe(gulp.dest("./dist/assets/css"))
      );
    },
    // Move additional css libs to dist
    function() {
      return gulp
        .src("./src/assets/.css/*")
        .pipe(gulp.dest("./dist/assets/css"));
    }
  )
);

// Gulp task to minify JavaScript files
gulp.task("scripts", function() {
  return (
    gulp
      .src("./src/assets/js/**/*.js")
      // Minify the file
      .pipe(uglify())
      // Output
      .pipe(gulp.dest("./dist/assets/js"))
  );
});

// Gulp task to minify images
gulp.task("images", function() {
  return (
    gulp
      .src([
        "./src/images/**/*.{jpg,jpeg,gif,png,svg}",
        "!./src/images/original/*"
      ])
      //Minify the file
      .pipe(imagemin())
      // Output
      .pipe(gulp.dest("./dist/images"))
  );
});

// Gulp task to minify HTML files
gulp.task("pages", function() {
  return gulp
    .src(["./src/**/*.html"])
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest("./dist"));
});

// Gulp task to copy webfonts from src to dist
gulp.task("webfonts", function() {
  return gulp
    .src(["./src/assets/webfonts/*.*"])
    .pipe(gulp.dest("./dist/assets/webfonts"));
});

// Clean output directory
gulp.task("clean", () => del(["dist", "./src/assets/css"]));

// Gulp task to minify all files
gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("styles", "scripts", "pages", "images", "webfonts")
  )
);

// Gulp watch for continuous development
gulp.task("dev", function() {
  return gulp.watch(
    [
      "src/*.html",
      "src/assets/sass",
      "src/assets/js",
      "src/assets/images",
      "src/assets/webfonts"
    ],
    gulp.series("clean", function() {
      return (
        gulp
          .src([
            "./src/assets/sass/main.scss",
            "./src/assets/sass/noscript.scss"
          ])
          // Compile SASS files
          .pipe(
            sass({
              outputStyle: "nested",
              precision: 10,
              includePaths: ["."],
              onError: console.error.bind(console, "Sass error:")
            })
          )
          // Auto-prefix css styles for cross browser compatibility
          .pipe(autoprefixer())
          // Minify the file
          .pipe(csso())
          // Output
          .pipe(gulp.dest("./src/assets/css"))
      );
    })
  );
});
