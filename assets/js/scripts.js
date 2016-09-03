﻿// $nd object for app-specific debug utilities
var $nd = (function () {
    var NDebug = {};
    NDebug.assert = function (fTest, message) {
        if (fTest) return;
        if (window.console && console.assert) {
            window.console.assert(fTest, message);
        }
        debugger; // TODO: do we need a switch to enable this?
    }

    NDebug.warn = function (s) {
        if (window.console && console.error) {
            window.console.error(s);
        } else if (window.console && console.log) {
            window.console.log(s);
        }
        // Enhancement? log to a debug DIV inside the page.
    }

    NDebug.string2Int0 = function(s) {
        if (typeof s == "number") return s;
        if (typeof s == "string") {
            var n = parseInt(s);
            if (isNaN(n)) n=0;
            return n;
        } else {
            return 0;
        }
    }

    return NDebug;
})();
