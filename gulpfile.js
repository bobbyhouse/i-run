var gulp          = require('gulp');
var nodemon       = require('gulp-nodemon');
var babel         = require('gulp-babel');

gulp.task('server', function() {
    return nodemon({
        script: 'app.js',
        env: { 'PORT': 3000 }
    });
});

gulp.task('client', function() {
    return gulp.src('client/src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('public/dist'));
});