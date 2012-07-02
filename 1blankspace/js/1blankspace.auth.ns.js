(function () {
    "use strict";

    function setCookie(name, value, exp_y, exp_m, exp_d, path, secure)
    {
        var cookie_string = name + "=" + escape(value); if (exp_y) { var expires = new Date(exp_y, exp_m, exp_d); cookie_string += "; expires=" + expires.toGMTString(); } if (path) { cookie_string += "; path=" + escape(path); } if (secure) { cookie_string += "; secure"; } document.cookie = cookie_string;
    }

    function getCookie(cookie_name) {
        var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
        if (results) { return (unescape(results[2])); } else { return false; }
    }
    function deleteCookie(cookie_name) {
        var cookie_date = new Date(); cookie_date.setTime(cookie_date.getTime() - 1); document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
    }

    WinJS.Namespace.defineWithParent(altenter, "auth", {
        setUser: setCookie,
        getUser: getCookie,
        deleteUser: deleteCookie
    });
})();
