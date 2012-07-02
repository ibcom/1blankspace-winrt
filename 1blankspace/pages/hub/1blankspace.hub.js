(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
   
    ui.Pages.define("/pages/hub/alt-enter.hub.html", {

        initializeLayout: function (listView, viewState)
        {
            if (viewState === appViewState.snapped) {
                listView.itemDataSource = altenter.hub.groups.dataSource;
                listView.groupDataSource = null;
                listView.layout = new ui.ListLayout();
            } else {
                listView.itemDataSource = altenter.hub.items.dataSource;
                listView.groupDataSource = altenter.hub.groups.dataSource;
                listView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
            }
        },

        itemInvoked: function (args) {
            if (appView.value === appViewState.snapped) {
                // If the page is snapped, the user invoked a group.
                var group = altenter.hub.groups.getAt(args.detail.itemIndex);
                nav.navigate("/pages/detail/alt-enter.detail.html", { item: altenter.hub.getItemReference(item) });
            } else {
                // If the page is not snapped, the user invoked an item.
                var item = altenter.hub.items.getAt(args.detail.itemIndex);
                nav.navigate("/pages/detail/alt-enter.detail.html", { item: altenter.hub.getItemReference(item) });
            }
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options)
        {
            var listView = element.querySelector(".groupeditemslist").winControl;

            listView.groupHeaderTemplate = element.querySelector(".headerTemplate");
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = this.itemInvoked.bind(this);

            this.initializeLayout(listView, appView.value);
            listView.element.focus();
        },

        updateLayout: function (element, viewState, lastViewState)
        {
            var listView = element.querySelector(".groupeditemslist").winControl;

            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    this.initializeLayout(listView, viewState);
                }
            }
        }
    });
})();