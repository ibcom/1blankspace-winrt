(function ()
{
    "use strict";

    var app = WinJS.Application;
    var animate = WinJS.UI.Animation;
    var activation = Windows.ApplicationModel.Activation;
    var binding = WinJS.Binding;
    var nav = WinJS.Navigation;
    var utils = WinJS.Utilities;
    var ui = WinJS.UI;
    //var currentPageControl;

    ui.Pages.define("/pages/detail/alt-enter.detail.html", {

        // Which business Object are we viewing in the model?
        item: null,

        // This function is called whenever a user navigates to this page. 
        // Depending on the parameters passed, it either presents the "Most Likely" list or 
        // displays / refreshes the in-context record
        ready: function (element, options) {

            // Store information about what's been selected (if any)
            this.item = options && options.item ? altenter.hub.resolveItemReference(options.item) : altenter.hub.items.getAt(0);
            altenter.itemObjectContext = (options && "objectContext" in options) ? options.objectContext : -1;
            altenter.paneSelectedIndex = (options && "selectedIndex" in options) ? options.selectedIndex : -1;

            var contextObjectModel = altenter.getObjectModel(this.item.object);

            altenter.setCurrentObjectModel(this.item.object);
            altenter.currentObject = this.item.object;
            //currentPageControl = this;

            // Bind the header details / buttons
            element.querySelector("#spanObjectPageTitle").innerHTML = contextObjectModel.objectLabel; // ;

            element.querySelector('#buttonObjectSave').addEventListener("click", contextObjectModel.controller.save, false);
            element.querySelector('#buttonObjectNew').addEventListener("click", contextObjectModel.controller.new , false);
            element.querySelector('#buttonObjectSearch').addEventListener("click", contextObjectModel.controller.search, false);

            // Now, work out whether we're inContext or noContext and display accordingly
            if (altenter.itemObjectContext == -1 && altenter.paneSelectedIndex == -1) {
                altenter.setObjectHome();
            }
            else if (altenter.itemObjectContext && altenter.itemObjectContext != -1) {
                    // Populate values in the viewGroups list
                if (altenter.paneSelectedIndex == -1) {

                    if (altenter.getViewGroups().length > 0) {
                        altenter.clearViewGroups();
                    }
                    altenter.createViewGroupsList(contextObjectModel.viewGroups);
                }

                altenter.setObjectContext();
            }

        },


        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            var listView = element.querySelector(".itemlist").winControl;
            var firstVisible = listView.indexOfFirstVisible;
            altenter.paneUpdateVisibility();

            var handler = function (e) {
                listView.removeEventListener("contentanimating", handler, false);
                e.preventDefault();
            }

            if (altenter.pageIsSingleColumn()) {
                listView.selection.clear();
                if (altenter.paneSelectedIndex >= 0) {
                    // If the app has snapped into a single-column detail view,
                    // add the single-column list view to the backstack.
                    WinJS.Navigationhistory.current.state = {
                        objectContext: this.itemObjectContext,
                        selectedIndex: altenter.paneSelectedIndex
                    };
                    WinJS.Navigationhistory.backStack.push({
                        location: "/pages/detail/alt-enter.detail.html",
                        state: { objectContext: this.itemObjectContext }
                    });
                    element.querySelector(".articlesection").focus();
                } else {
                    listView.addEventListener("contentanimating", handler, false);
                    listView.indexOfFirstVisible = firstVisible;
                    listView.forceLayout();
                }
            } else {
                // If the app has unsnapped into the two-column view, remove any
                // splitPage instances that got added to the backstack.
                if (WinJS.NavigationcanGoBack && WinJS.Navigationhistory.backStack[WinJS.Navigationhistory.backStack.length - 1].location === "/pages/detail/alt-enter.detail.html") {
                    WinJS.Navigationhistory.backStack.pop();
                }
                if (viewState !== lastViewState) {
                    listView.addEventListener("contentanimating", handler, false);
                    listView.indexOfFirstVisible = firstVisible;
                    listView.forceLayout();
                }

                listView.selection.set(altenter.paneSelectedIndex >= 0 ? altenter.paneSelectedIndex : Math.max(firstVisible, 0));
            }
        },
    });

})();


