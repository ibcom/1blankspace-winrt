(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    
    ui.Pages.define("/pages/auth/alt-enter.auth.html", {

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var sURL = 'https://au.mydigitalstructure.com/ondemand/logon/';
            var divLogon = document.querySelector("#LoginBox");
            var btnSubmit = document.querySelector("#btnSubmit");
            var divResult = document.querySelector("#divResult");

            divLogon.className = 'box show';
            divResult.className = 'box';

            btnSubmit.addEventListener("click", function ()
            {
                var sLogonName = document.getElementById("inputLogonName").value;
                var sPassword = document.getElementById("inputPassword").value;
                var sData = '?logon=' + sLogonName + '&password=' + sPassword;

                divResult.className = 'box show';

                WinJS.xhr({ url: sURL + sData, type: "GET", data: sData }).then(

                function (r) {
                    var result = r.responseText;
                    var obj = JSON.parse(result)
                    if (obj.status == "OK" && obj.passwordStatus == "OK") {
                        altenter.auth.setUser("usersid", obj.sid);
                        nav.navigate("/pages/hub/alt-enter.hub.html");
                    } else {
                        divResult.innerHTML = '<span class="error">Login Name or Password is incorrect</span>';
                    }
                });
            });
        }
    });

   

})();
