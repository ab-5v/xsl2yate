var fs = require('fs');
var exec = require('child_process').exec;

module.exports = function(name, cb) {
    var bin = __dirname + '/../../bin/xsl2yate';
    var src = __dirname + '/../fixtures/' + name + '.xsl';
    var ref = __dirname + '/../fixtures/' + name + '.yate';
    var res = __dirname + '/tmp';

    exec(bin + ' ' + src + ' ' + res, function(err) {
        if (err) return cb(err);

        try {
            var result = fs.readFileSync(res, 'utf8');
            var reference = fs.readFileSync(ref, 'utf8');
            fs.unlinkSync(res);
        } catch(err) {
            console.log(err);
            return cb(err);
        }

        cb(null, result, reference);
    });
};
