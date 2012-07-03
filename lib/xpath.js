
var reToken = /([a-z/$@.*]+)(?!\s*\()/g;
var reOperator = /(div|mod|or|and|&lt;=|&gt;=|&gt;|&lt;|!=|=)/g;

var XPath = {
    /**
     * Split xpath to xpath tokens
     * @param {String}
     * @type String
     */
    replace: function(xpath) {
        xpath = xpath.replace(reOperator, XPath.operator);
        xpath = xpath.replace(reToken, XPath.token);
        return xpath;
    },

    /**
     * Converts xpath operator to jpath operator
     * @param {String} self
     * @param {String} operator
     */
    operator: function(self, operator) {
        if (operator in XPath.operators) {
            return XPath.operators[operator];
        } else {
            return operator;
        }
    },

    operators: {
        'div': '/',
        'mod': '%',
        'or': '||',
        'and': '&&',
        '&lt;=': '<=',
        '&gt;=': '>=',
        '&lt;': '<',
        '&gt;': '>',
        '=': '==',
        '!=': '!='
    },

    /**
     * Converts xpath tokens to to jpath
     * @param {String} self
     * @param {String} token
     * @type String
     */
    token: function(self, token) {
        var result = '';

        if (!token) {
            return result;
        }

        if (/^(?:\/|\.|\.\.)$/.test(token)) {
            return token;
        }

        token = token.replace(/@/g, '');

        var char0 = token.charAt(0);

        if (char0 === '/') {
            result += '/';
            token = token.substr(1);
        }

        token = token.replace(/\.\.\//g, '.');

        result += token.split('/').map(function(s, i) {
            var result = '';
            if (i === 0 && char0 === '$') {
                return s.substr(1);
            } else {
                return /^[\.]+$/.test(s) ? s : '.' + s;
            }
        }).join('');

        return result;
    }
};

module.exports = XPath;
