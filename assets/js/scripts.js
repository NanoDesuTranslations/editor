// $nd object for app-specific debug utilities
var $nd = (function () {
    var objND = {};
    objND.assert = function (fTest, message) {
        if (fTest) return;
        if (window.console && console.assert) {
            window.console.assert(fTest, message);
        }
        debugger; // TODO: do we need a switch to enable this?
    }

    objND.warn = function (s) {
        if (window.console && console.error) {
            window.console.error(s);
        } else if (window.console && console.log) {
            window.console.log(s);
        }
        // Enhancement? log to a debug DIV inside the page.
    }

    objND.string2Int0 = function(s) {
        if (typeof s == "number") return s; // In the odd case that we already have a number, return that.
        if (typeof s == "string") {
            var n = parseInt(s);
            if (isNaN(n)) n=0;
            return n;
        } else {
            return 0;
        }
    }

    // string2IntIfInt - returns the integer parsed from a string, if possible.
    //   If not, returns the original string.
    objND.string2IntIfInt = function(s) {
        if (typeof s == "number") return s; // In the odd case that we already have a number, return that.
        if (typeof s == "string") {
            // TODO BUG: Known issue. In the case of strings that begin with a number but aren't *entirely* a number,
            //  The test below will return the wrong thing
            var ret = parseInt(s);
            if (isNaN(ret)) ret=s;
            return ret;
        } else {
            return 0;
        }
    }

    return objND;
})();
