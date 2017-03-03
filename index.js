var gulp = require('gulp');
var through2 = require('through2');
var exec = require('child_process').exec;
var gutil = require('gulp-util');

module.exports = function (opt) {
  return through2.obj(function (file, enc, cb) {
    var that = this;
    // --------------------- PHP NGN COMMAND -----------------------------
    var cmd = 'php ' +
      (opt.ngnEnvFolder || './ngn-env') +
      '/run/run.php "new CliAccessArgsSingle(\'html ' + file.path + ' ' +
      opt.buildFolder + ' ' + opt.name + ' ' + opt.jsonFieldsFolder + '\', new JsBuildTool)" ngn-cs' +
      (opt.projectFolder ? ',' + opt.projectFolder : '');
    // -------------------------------------------------------------------
    exec(cmd,
      function (err, stdout) {
        if (err) {
          that.emit('error', new gutil.PluginError('ngn', stdout));
          that.push(file);
        } else {
          stdout = stdout.trim();
          var name = file.path.replace(/(.*)\/(.*)\.json/g, "$2");
          file.path = file.path.replace(/(.*)\.json/g, "$1.js");
          file.contents = new Buffer(stdout);
          gutil.log(stdout);
          that.push(file);
        }
        cb();
      });
  })
};

module.exports.reporter = function() {
   // dummy for backwork compability
	return through2.obj(function (file, enc, cb){
		this.push(file);
		cb();
	});
}