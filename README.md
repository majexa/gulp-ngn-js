Requirements
------------
- PHP 5.6 CLI installed
- Download Ngn components
```bash
mkdir ngn-env
cd ngn-env
git clone https://github.com/majexa/ngn.git
git clone https://github.com/majexa/ngn-cs.git
git clone https://github.com/majexa/run.git
git clone https://github.com/mootools/mootools-core
git clone https://github.com/mootools/mootools-more
```

Usage
-----

Contents of index.html
```html
<script>
new Ngn.SomeClass();
</script>
```

Next gulp task will parse `<script>` tags in index.html and build all founded NgnJS classes with it dependencies.
```javascript
var gulp = require('gulp');
var ngnJs = require('gulp-ngn-js');

gulp.task('build', function () {
  var opt = {
    buildFolder: 'build/m',
    name: 'main'
  };
  var reportOptions = {
    err: true,
    stderr: true,
    stdout: true
  };
  gulp.src('index.html', {read: false})
    .pipe(ngnJs(opt))
    .pipe(ngnJs.reporter(reportOptions))
});
```