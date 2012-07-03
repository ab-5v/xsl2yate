
var XPath = {
    tokenize: function(xpath) {
    },
    replace: function(xpath) {
        var result = '';

        if (!xpath) {
            return result;
        }

        if (/^(?:\/|\.|\.\.)$/.test(xpath)) {
            return xpath;
        }

        xpath = xpath.replace(/@/g, '');

        var char0 = xpath.charAt(0);

        if (char0 === '/') {
            result += '/';
            xpath = xpath.substr(1);
        }

        xpath = xpath.replace(/\.\.\//g, '.');

        result += xpath.split('/').map(function(s, i) {
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
