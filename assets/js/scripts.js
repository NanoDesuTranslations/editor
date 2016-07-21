// $nd object for app-specific debug utilities
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

    return NDebug;
})();
