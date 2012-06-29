var fs = require('fs');

var re = /<(\/)?xsl:([^\s]+)\s?((?:[^=]+="[^"]*"\s*)*)\s*(\/?)>/g;

var replacer = {
    attrs: function(attrs) {
        return attrs && attrs.split(' ').map(function(pair) {
            var attr = {};

            pair = pair.split('=');
            attr[pair[0]] = pair[1].replace(/^"|"$/g, '');

            return attr;
        });
    },
    replace: function() {
        var args = Array.prototype.slice.apply(arguments);
        var self = args.shift();
        var name = args.shift();
        if (this.rules[name]) {
            return this.rules[name].apply(this, args);
        } else {
            return self;
        }
    },
    rules: {
        'template': function(attrs, close, selfclose) {
            var result = '';

            if (selfclose) {
               result = '';
            } else if (close) {
                result = '}';
            } else {
                result += 'match';
                if (attrs.match) {
                    result += ' ' + attrs.match;
                }
                if (attrs.mode) {
                    result += ' ' + attrs.mode
                }
                result += ' {'
            }

            return result;
        },
        'text': function(attrs, close) {
            return '"';
        }
    }
};

module.exports = {
    do: function(src, dest) {
        var src = fs.readFileSync(src, 'utf8');
        var result = this.transform(src);
        if (dest) {
            fs.writeFileSync(dest, result, 'utf8');
        } else {
            console.log(result);
        }
    },

    /**
     * Changes xslt constructions to yate constructions
     * @param {String} src
     * @type String
     */
    transform: function(src) {
        return src.replace(re, function() {
            var self = arguments[0];
            var close = !!arguments[1];
            var selfclose = !!arguments[4];
            var name = arguments[2];
            var attrs = replacer.attrs(arguments[3]);

            return replacer.replace(self, name, attrs, close, selfclose);
        });
    }
};
