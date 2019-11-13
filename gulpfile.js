const {series, src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const inject = require('gulp-inject');

sass.compiler = require('node-sass');


function copyHtml(cb){
  src('src/*.html')
    .pipe(dest('dist/'))
    cb()
}

function onSass(cb){
  return src('src/assets/main.sass')
    .pipe(sass())
    .pipe(dest('dist/'))
}

function concatScript(){
  return src('./src/**/*.js')
    .pipe(concat('app.js'))
    .pipe(dest('./dist/'));
}

function devTask(){
  watch('src/**/*.*', {}, function(cb){
    src('src/*.html')
      .pipe(dest('dist/'))

      cb()
  })
}

function onInject(){
  const sources = src(['./dist/*.js', './dist/*.css'], {read: false});

  return src('./dist/index.html')
    .pipe(inject(sources, { relative: true}))
    .pipe(dest('./dist'))
}


module.exports.build = series(copyHtml, onSass, concatScript, onInject);
module.exports.dev = devTask;