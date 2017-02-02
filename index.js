var exec = require('gulp-exec');

module.exports = function(opt) {
  var cmd = 'php ./ngn-env/run/run.php "new CliAccessArgsSingle(\'html <%= file.path %> ' + //
    opt.buildFolder + ' ' + opt.name + '\', new JsBuildTool)" ngn-cs';
  return exec(cmd, {
    continueOnError: false,
      pipeStdout: true
  });
};
module.exports.reporter = exec.reporter;
