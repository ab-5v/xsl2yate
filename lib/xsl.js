var XPath = require('./xpath');

var reTags = /<(\/)?xsl:([^\s>]+)\s*((?:[^=>]+="[^"]*"\s*)*)\s*(\/?)>/g;
var reXmlVer = /^<\?xml\s+version\s*=\s*(["'])[^\1]+\1[^?]*\?>/;
var reDoctype = /<!DOCTYPE xsl:stylesheet \[[^\]]*\]>/;
var reCommentStart = /<!--/g;
var reCommentEnd = /-->/g;
var reAttrSplit = /\s(?![^(]*\)|[^\[]*\]|\|)/;
var reInline = /\{([^}]+)\}/g

var XSL = {

    /**
     * Converts interpolated xpath
     * @param {String} src
     * @type String
     */
    inline: function(src) {
        return src.replace(reInline, function(self, xpath) {
            return '{' + XPath.replace(xpath) + '}';
        });
    },

    /**
     * Converts arguments string to object
     * 'match="/" mode="some"' -> {match: '/', mode: 'some'}
     * @param {String} attrs
     * @type Object
     */
    attrs: function(attrs) {

        var arr = [];
        var last = 0;
        var result = {};
        var reAttrSplit = /\s+/g;

        if (attrs) {
            attrs.replace(/\s+/g, function(matched, index, full) {
                var before = full.substr(0, index);
                var parity = true;

                [ before.replace(/[^\[\]]+/g, '').length,
                    before.replace(/[^()]+/g, '').length,
                    before.replace(/[^']+/g, '').length,
                    before.replace(/[^"]+/g, '').length

                ].forEach(function(n) {
                    if (n % 2) {
                        parity = false;
                    }
                });

                if (parity) {
                    arr.push(full.substr(last, index - last));
                    last = index + matched.length;
                }

                return matched;
            });

            arr.push(attrs.substr(last));


            arr.forEach(function(pair) {
                pair = pair.split('=');
                var name = pair.shift();
                var value = pair.join('=');

                if (/select|match|use|test/.test(name)) {
                    value = XPath.replace(value);
                }

                result[ name ] = value.replace(/^"|"$/g, '');
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
        src = src.replace(reCommentStart, '/*');
        src = src.replace(reCommentEnd, '*/');
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
            var attrs = XSL.attrs(arguments[3]);

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
        'attribute': function(attrs, close) {
            result = '';
            if (close) {
                result = ')'
            } else {
                result = '@' + attrs.name + ' = ('
            }
            return result;
        },
        'value-of': function(attrs, close) {
            return !close ? attrs.select : '';
        },
        'variable': function(attrs, close, selfclose) {
            var result = '';
            if (close) {
                result += ')'
            } else {
                result += attrs.name + ' = ';
                if (selfclose) {
                    result += attrs.select;
                } else {
                    result += '(';
                }
            }
            return result;
        },
        'choose': function(attrs, close) {
            this.whenCount = 0;
            return '';
        },
        'when': function(attrs, close) {
            if (close) {
                return '}';
            } else {
                this.whenCount++;
                return (this.whenCount - 1 ? 'else if ' : 'if ') + attrs.test + ' {';
            }
        },
        'otherwise': function(attrs, close) {
            if (close) {
                return '}';
            } else {
                return 'else {';
            }
        },
        'if': function(attrs, close, selfclose) {
            if (close) {
                return '}'
            } else {
                return 'if ' + attrs.test + ' {';
            }
        },
        'key': function(attrs) {
            return 'key ' + attrs.name + ' (' + attrs.match + ', ' + attrs.use + ') { . }';
        },
        'apply-templates': function(attrs, close, selfclose) {
            var result = 'apply';

            if (close) {
                return ')';
            }

            if (attrs.select) {
                result += ' ' + attrs.select;
            }
            if (attrs.mode) {
                result += ' ' + attrs.mode;
            }

            if (!close && !selfclose) {
                result += ' (';
            }

            return result;

        },
        'call-template': function(attrs, close, selfclose) {
            var result = '';
            if (close) {
                result += ')';
            } else {
                result += attrs.name + '(';
                if (selfclose) {
                    result += ')';
                }
            }

            return result;
        },
        'with-param': function(attrs, close, selfclose) {
            var result = '';
            if (!close) {
                if (attrs.select) {
                    result += attrs.select + ',';
                }
            }
            return result;
        },
        'template': function(attrs, close, selfclose) {
            var result = '';

            if (close) {
                result = '}';
            } else {
                if (attrs.name) {
                    result += 'func ' + attrs.name + '()';
                } else {
                    result += 'match';

                    if (attrs.match) {
                        result += ' ' + attrs.match;
                    }
                    if (attrs.mode) {
                        result += ' ' + attrs.mode;
                    }
                }

                result += ' {';

                if (selfclose) {
                    result += '}';
                }
            }

            return result;
        },
        'include': function(attrs, close, selfclose) {
            var result = '';

            if (close) {
                result = '';
            } else {
                result += 'include ';
                if (attrs.href) {
                    result += '"' + attrs.href.replace(/\.xsl$/, '.yate') + '"';
                }
            }

            return result;
        },
        'text': function(attrs, close) {
            return '"';
        }
    }
};

module.exports = XSL;
