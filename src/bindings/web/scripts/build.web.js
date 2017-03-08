var common = require('../../../../scripts/build.common');
var path = require('path');
var fs = require('fs-extra');
var rollup = require('rollup');
var compiler = require(common.distPath('compiler'));


var task = 'build ionic-web';
console.log(task);


var componentSrcDir = common.srcPath('components');
var componentDestDir = common.distPath('transpiled-web/components');
var entryFile = common.distPath('transpiled-web/bindings/web/src/ionic-web.js');
var outputFile = common.distPath('ionic-web/dist/ionic.web.js');


compiler.compileComponents(componentSrcDir, componentDestDir).then(() => {

  fs.ensureDirSync(path.dirname(outputFile));

  rollup.rollup({
    entry: entryFile

  }).then(function(bundle) {
    var result = bundle.generate({
      format: 'umd'
    });

    fs.writeFileSync(outputFile, result.code);

    console.log(task, 'bundle:', outputFile);
  });

});
