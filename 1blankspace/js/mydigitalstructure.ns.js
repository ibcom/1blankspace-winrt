/// <reference path="//Microsoft.WinJS.1.0.RC/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0.RC/js/ui.js" />

(function () {
    "use strict";

    var sDomainUrl = "https://au.mydigitalstructure.com";

    function executeAdvancedSearch(aParam) {

        var sBaseMethod;
        var bParameterError = false;
        var sParameterError = "";
        var oSearchParameters;
        var fFunctionSuccess = "";
        var sXHTMLElementIdError = "";
        var sXHTMLElementIdInProgress = "";

        if (aParam) {
            if (aParam.baseMethod) { sBaseMethod = aParam.baseMethod } else {sParameterError += "No baseMethod parameter passed. "; }
            if (aParam.searchParameters) { oSearchParameters = aParam.searchParameters} else { sParameterError += "No searchParameters parameter passed. "; }
            if (aParam.functionSuccess) { fFunctionSuccess = aParam.functionSuccess } else { sParameterError += "No functionSuccess parameter passed. "; }
            if (aParam.xhmltElementIdError) { sXHTMLElementIdError = aParam.xhmltElementIdError } else { sParameterError += "No xhmltElementIdError parameter passed. "; }
            if (aParam.xhmltElementIdInProgress) { sXHTMLElementIdInProgress = aParam.xhmltElementIdInProgress } else { sParameterError += "No xhmltElementIdInProgress parameter passed. "; }

        }

        var sEndPoint = sBaseMethod.substr(0, sBaseMethod.indexOf("_")).toLowerCase();
        var sSearchUrl = "/ondemand/" + sEndPoint + "/" + sEndPoint + ".aspx?" +
                            "method=" + sBaseMethod + "_SEARCH" +
                            "&advanced=1&rf=JSON";
        var sSearchParameters = JSON.stringify(oSearchParameters);

        var xhr = new WinJS.xhr({
            type: "POST",
            url: sDomainUrl + sSearchUrl,
            data: sSearchParameters
        }).then(
            fFunctionSuccess
        , function () {
            // execute this when there's an error
            document.querySelector("#" + sXHTMLElementIdError).innerHTML = "There was an error.";
        }, function () {
            // execute this when in progress
            document.querySelector("#" + sXHTMLElementIdInProgress).className = "box show";
        });
    }
    
    WinJS.Namespace.define("mydigitalstructure", {
       search: executeAdvancedSearch
    });

})();