var fs = require('fs');
var XSL = require('./xsl');
var XPath = require('./xpath');
var bea = require('./bea')

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

        result = XSL.clean(result);
        result = XSL.comments(result);
        result = XSL.tags(result);

        result = bea(result);

        return result;
    },

    jpath: function(xpath) {
        return XPath.replace(xpath);
    }
};
