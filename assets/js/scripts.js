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
            // See note in string2IntIfInt.  The result may be a floating point value,
            //  which is a mismatch with this function's name.
            var n = Number(s);
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
            // When used as a conversion function, Number() will convert the string only if
            // the string is a number literal (+ surrounding whitespace).  The result  may be a floating point value.
            var ret = Number(s); 
            if (isNaN(ret)) ret=s;
            return ret;
        } else {
            return 0;
        }
    }

    objND.createEpochTime = function(){
        var epochTime = Math.floor(new Date() / 1000);
        return epochTime;
    }

    return objND;
})();
