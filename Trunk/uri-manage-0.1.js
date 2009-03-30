/* 
 * Url Manage
 * Version 0.1
 * Parses and recombine parts of URLs
 *
 * MIT License
 * 
 * Author: Igor Golodnitsky
 * Author email: webprogmaster@gmail.com
 * 
 *
 * Based on: uri parse by Steven Levithan
 * =====================================================
 * Examples:
 * =====================================================
 * Take any string where your url stayed
 *   var url = 'http://www.google.com'.url() // -> returns Url object
 *   
 *   url.attr('protocol', 'https'); // parts of url change
 *   url.param('id', 25); // query string change params
 *   url.param({id: 25, name: 'xuxel'}); // extend current params with object
 
*/


String.prototype.url = function() {
    return new Uri(parseUri(this));
}

var Uri = function(parsed) {
    this.parsed = parsed;
}

Uri.prototype = {
    attr: function(name, value) {
        return this.getset(this.parsed, name, value);
    },
    param: function(name, value) {
        return this.getset(this.parsed.queryKey, name, value);
    },
    getset: function(inner, name, value) {

        if (typeof (name) === 'object') {
            // like extend
            for (var key in name) {
                inner[key] = name[key];
            }
        }
        else {
            if (value) {
                // set
                inner[name] = value;
            }
            else {
                // get
                return inner[name];
            }
        }
        this.reload();
        return this;
    },
    reload: function() {
        this.parsed = parseUri(this.string());
    },
    string: function() {
        var o = this.parsed;

        var qs = '';
        for (var key in o.queryKey) {
            qs += key + '=' + o.queryKey[key] + '&';
        }
        qs = qs.slice(0, qs.length - 1);

        return o.protocol + '://' + o.host + (o.port ? ':' + o.port : '') + o.path + '?' + qs;
    }
}