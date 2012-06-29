var fs = require('fs');

var reTags = /<(\/)?xsl:([^\s>]+)\s*((?:[^=>]+="[^"]*"\s*)*)\s*(\/?)>/g;
var reXmlVer = /^<\?xml\s+version\s*=\s*(["'])[^\1]+\1[^?]*\?>/;
var reDoctype = /<!DOCTYPE xsl:stylesheet \[[^\]]*\]>/;

var replacer = {

    /**
     * Converts arguments string to object
     * 'match="/" mode="some"' -> {match: '/', mode: 'some'}
     * @param {String} attrs
     * @type Object
     */
    attrs: function(attrs) {
        var result = {};
        if (attrs) {
            attrs.split(' ').forEach(function(pair) {
                pair = pair.split('=');
                result[ pair[0] ] = (pair[1] || '').replace(/^"|"$/g, '');
            });
        }

        return result;
    },

    /**
     * Cleanup xsl from xml version, DOCTYPE and so on
     * @param {String} src
     * @type String
     */
    clean: function(src) {
        src = src.replace(reXmlVer, '');
        src = src.replace(reDoctype, '');
        return src;
    },

    /**
     * Replace xsl comments with Yate comments
     * @param {String} src
     * @type String
     */
    comments: function(src) {
        return src;
    },

    /**
     * Replace xsl constructions with yate ones
     * @param {String} src
     * @type String
     */
    tags: function(src) {
        var that = this;

        return src.replace(reTags, function() {
            var self = arguments[0];
            var close = !!arguments[1];
            var selfclose = !!arguments[4];
            var name = arguments[2];
            var attrs = replacer.attrs(arguments[3]);

            if (that.rules[name]) {
                return that.rules[name](attrs, close, selfclose);
            } else {
                return self;
            }
        });
    },

    /**
     * Rusles to conver xsl tags to yate
     * @type Object
     */
    rules: {
        'stylesheet': function() { return ''; },
        'if': function(attrs, close, selfclose) {
            if (close) {
                return '}'
            } else {
                return 'if ' + attrs.test + ' {';
            }
        },
        'apply-templates': function(attrs, close, selfclose) {
            var result = 'apply';

            if (close) {
                return '';
            }

            if (attrs.select) {
                result += ' ' + attrs.select;
            }
            if (attrs.mode) {
                result += ' ' + attrs.mode;
            }

            return result;

        },
        'template': function(attrs, close, selfclose) {
            var result = '';

            if (close) {
                result = '}';
            } else {
                result += 'match';

                if (attrs.match) {
                    result += ' ' + attrs.match;
                }
                if (attrs.mode) {
                    result += ' ' + attrs.mode;
                }

                result += ' {';

                if (selfclose) {
                    result += '}';
                }
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
        var result = src;

        result = replacer.clean(result);
        result = replacer.comments(result);
        result = replacer.tags(result);

        return result;
    }
};
