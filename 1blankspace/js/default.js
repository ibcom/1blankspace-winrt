
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    WinJS.strictProcessing();

    app.addEventListener("activated", function (args)
    {
        if (args.detail.kind === activation.ActivationKind.launch)
        {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated)
            {
               
            }
            else
            {

            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }

            if (!altenter.auth.getUser("usersid"))
            {
                nav.navigate("/pages/auth/alt-enter.auth.html");
            }
           
            args.setPromise(WinJS.UI.processAll().then(function ()
            {
                if (nav.location)
                {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                }
                else
                {
                    return nav.navigate("/pages/hub/alt-enter.hub.html");
                }
            }));
        }
    });

    app.oncheckpoint = function (args)
    {  
        app.sessionState.history = nav.history;
    };

    app.start();
})();



