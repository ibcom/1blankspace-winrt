/// <reference path="//Microsoft.WinJS.1.0.RC/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0.RC/js/ui.js" />

(function () {
    "use strict";

    var viewGroupsList = new WinJS.Binding.List();

    var aObjectModel = [
	{
	    object: 12,
	    objectName: 'Contact Business',
	    objectCode: 'ContactBusiness',
	    objectLabel: 'Businesses',
	    showHome: true,
	    modelMethods:
		{
		    base: 'CONTACT_BUSINESS'
		},
	    viewShowActions: true,
	    viewShowAttachments: true,
	    viewDefault: 'Summary',
	    viewHome:
		{
		    fields:
			[
				{ name: 'tradename' }
			]
		},
	    controller:
		{
		    save: "interfaceContactBusinessSave()",
		    new: "interfaceContactBusinessNew()",
		    search: "interfaceContactBusinessSearch()"
		},
	    viewSummary:
		{
            maxColumns: 2,
		    fields:
			[
				{
					label: 'Phone',
					name: 'phonenumber',
                    viewColumn: 1
				}
			],
			actions:
			[
				{
					caption: "Tasks",
					function: "",
                    viewColumn: 2
				}
			]
		},
	    viewSearch:
		{
		    name: 'tradename'
		},
	    viewContext:
		{
		    name: 'tradename'
		},
	    viewGroups:
		[
			{
			    id: 1,
			    name: 'Summary',
			    primary: true
			},
			{
			    id: 2,
			    name: 'Details',
			    primary: true
			},
			{
			    id: 3,
			    name: 'Address',
			    primary: true
			},
			{
			    id: 4,
			    name: 'Groups'
			},
			{
			    id: 5,
			    name: 'People'
			}
		],
	    viewModelGroups:
		[
			{
			    viewGroup: 4,
			    model:
				{
				    search:
					{
					    method: 'CONTACT_BUSINESS_GROUP_SEARCH',
					    name: 'grouptext'
					},
				    add:
					{
					    method: 'SETUP_CONTACT_BUSINESS_GROUP_SEARCH',
					    name: 'title'
					}
				}
			}

		],
	    viewModel:
		[
			{
			    name: 'reference',
			    caption: 'Reference',
			    viewGroup: 2,
			    modelDataType: 'Text',
			    modelDataLength: 50
			},
			{
			    name: 'tradename',
			    caption: 'Tradename',
			    viewGroup: 2,
			    modelDataType: 'Text'
			},
			{
			    name: 'legalname',
			    caption: 'Legal Name',
			    viewGroup: 2,
			    modelDataType: 'Text'
			},
			{
			    name: 'phonenumber',
			    caption: 'Phone',
			    viewGroup: 2,
			    modelDataType: 'Text'
			},
			{
			    name: 'faxnumber',
			    caption: 'Fax',
			    viewGroup: 2,
			    modelDataType: 'Text'
			},
			{
			    name: 'industry',
			    caption: 'Industry',
			    viewGroup: 2,
			    modelDataType: 'Select',
			    modelMethod: 'SETUP_CONTACT_INDUSTRY_SEARCH'
			},
			{
			    name: 'abn',
			    caption: 'ABN',
			    viewGroup: 2,
			    modelDataType: 'Text'
			},
			{
			    name: 'customerstatus',
			    caption: 'Industry',
			    viewGroup: 2,
			    modelDataType: 'Select',
			    modelMethod: 'SETUP_CONTACT_INDUSTRY_SEARCH'
			},
			{
			    name: 'webaddress',
			    caption: 'Web Address',
			    viewGroup: 2,
			    modelDataType: 'Text'
			},
			{
			    name: 'areatext',
			    caption: 'Area',
			    viewGroup: 2,
			    modelDataType: 'Select',
			    modelMethod: 'SETUP_AREA_SEARCH'
			},
			{
			    name: 'webaddress',
			    caption: 'Web Address',
			    viewGroup: 2,
			    modelDataType: 'Text'
			},
			{
			    name: 'streetaddress1',
			    caption: 'Street Address 1',
			    viewGroup: 3,
			    modelDataType: 'Text'
			},
			{
			    name: 'streetaddress2',
			    caption: 'Street Address 2',
			    viewGroup: 3,
			    modelDataType: 'Text'
			},
			{
			    name: 'streetsuburb',
			    caption: 'Street Suburb',
			    viewGroup: 3,
			    modelDataType: 'Text'
			},
			{
			    name: 'streetpostcode',
			    caption: 'Street Post Code',
			    viewGroup: 3,
			    modelDataType: 'Text'
			},
			{
			    name: 'streetstate',
			    caption: 'Street State',
			    viewGroup: 3,
			    modelDataType: 'Text'
			},
			{
			    name: 'streetcountry',
			    caption: 'Street Country',
			    viewGroup: 3,
			    modelDataType: 'Text'
			},
			{
			    name: 'mailingaddress1',
			    caption: 'Mailing Address 1',
			    viewGroup: 3,
			    modelDataType: 'Text',
			    viewColumn: 2
			},
			{
			    name: 'mailingaddress2',
			    caption: 'Mailing Address 2',
			    viewGroup: 3,
			    modelDataType: 'Text',
			    viewColumn: 2
			},
			{
			    name: 'mailingsuburb',
			    caption: 'Mailing Suburb',
			    viewGroup: 3,
			    modelDataType: 'Text',
			    viewColumn: 2
			},
			{
			    name: 'mailingpostcode',
			    caption: 'Mailing Post Code',
			    viewGroup: 3,
			    modelDataType: 'Text',
			    viewColumn: 2
			},
			{
			    name: 'mailingstate',
			    caption: 'Mailing State',
			    viewGroup: 3,
			    modelDataType: 'Text',
			    viewColumn: 2
			},
			{
			    name: 'mailingcountry',
			    caption: 'Mailing Country',
			    viewGroup: 3,
			    modelDataType: 'Text',
			    viewColumn: 2
			},
			{
			    name: 'notes',
			    caption: 'Notes',
			    viewGroup: 2,
			    modelDataType: 'Text',
			    viewColumn: 2
			}
		]
	}
    ]

    function getObjectModel(object)
    {
        var oObjectModel;

        aObjectModel.forEach(function (item) {
            if (item.object == object) {
                oObjectModel = item;
                return true;
            }
        });
        return oObjectModel;
    }

    function getViewGroups()
    {
        return viewGroupsList;
    }

    function clearViewGroups()
    {
        while (viewGroupsList.length > 0) {
            viewGroupsList.pop(); }
    }

    function createViewGroupsList(currentViewGroups) {
        currentViewGroups.forEach(function (v, i) {
            1blankspace.addViewGroups(v.id, v.name, v.primary);
        });
    }

    function addViewGroups(newId, newName, newPrimary)
    {
        viewGroupsList.push({
            id: newId, 
            name: newName, 
            primary: newPrimary,
            divId: "",
            rendered: false,
            bindingDivs: [],
            xhtml: ""
        });
    }
    
    function getObjectViewModel(object) {
        var objectViewModel;
        aObjectModel.forEach(function (item) {
            if (item.object == object) {
                objectViewModel = item.viewModel;
                return true;
            }
        });
        return objectViewModel;
    }

    function getObjectViewModelGroups(object)
    {
        var objectViewModelGroups;
        aObjectModel.forEach(function (item)
        {
            if (item.object == object)
            {
                objectViewModelGroups = item.viewModel;
                return true;
            }
        });
        return objectViewModelGroups;
    }

    function getObjectViewSummary(object)
    {
        var objectViewSummary;
        aObjectModel.forEach(function (item)
        {
            if (item.object == object)
            {
                objectViewSummary = item.viewSummary;
                return true;
            }
        });
        return objectViewSummary;
    }

    function setCurrentObject(object)
    {
        1blankspace.currentObject = object;
    }

    function getCurrentObjectModel(object)
    {
        var aFields = [];
        var oObjectViewSummary = getObjectViewSummary(object);
        var oObjectViewModel = getObjectViewModel(object);

        oObjectViewSummary.fields.forEach(function (field, fieldIndex) {
            // Add the field to the list of search fields if it's not already there
            if (aFields.indexOf(field.name) == -1) {
                aFields.push(field.name); 
            }
        });

        oObjectViewModel.forEach(function (field, fieldIndex) {
            // Add the field to the list of search fields if it's not already there
            if (aFields.indexOf(field.name) == -1) {
                aFields.push(field.name); 
            }
        });
        
        return aFields;
    }

    function setCurrentObjectModel(object) {
        var aFields = getCurrentObjectModel(object);
        var oFields;
        if (aFields.length > 0) {
            oFields = eval("({" + aFields.join(': "", ') + ': ""})');
        }
        1blankspace.objectModelDefinition = WinJS.Binding.define(oFields);
     }

    function interfaceControllerViewHome() {
        // Get the list for the 'Home' view for the current object
        var oModel = 1blankspace.getObjectModel(1blankspace.currentObject);
        var sElementID = "divObjectContentNoContextDetail";
        var sErrorText;

        // Make noContext div visible
        WinJS.UI.Animation.fadeOut(document.querySelector("#divObjectContentInContext"));
        WinJS.UI.Animation.fadeIn(document.querySelector("#divObjectContentNoContext"));

        if (!oModel.showHome) {     // we don't do the search if Home not required.
            return false;
        }

        // Construct search parameters and execute Advanced Search
        var oSearchData =
        {
            "fields": [],
            "filters": [],
            "sorts": [{
                "name": "modifieddate",
                "direction": "desc"
            }],
            "options":
            {
                "rf": "JSON",
                "rows": "10",
                "async": "false"
            }
        };

        oModel.viewHome.fields.forEach(function (value, index) {
            oSearchData.fields.push({ "name": value.name });
        });

        mydigitalstructure.search({
            baseMethod: oModel.modelMethods.base,
            searchParameters: oSearchData,
            functionSuccess: interfaceControllerViewHomeSearch,
            xhtmlElementIdError: sElementID,
            xhtmlElementIdInProgresss: sElementID
        })

    }

    function interfaceControllerViewHomeSearch(response) {

        var oJSON = JSON.parse(response.responseText);
        var oModel = 1blankspace.getObjectModel(1blankspace.currentObject);

        if (oJSON.status == "OK") {

            var aHTML = [];
            var iRowCount = 0;
            aHTML.push('<table class="interfaceItemList" id="interfaceItemHomeList"><tbody>');
            oJSON.data.rows.forEach(function (row, rowIndex) {

                iRowCount = iRowCount + 1;
                var iColumnCount = 0;
                aHTML.push('<tr>');

                oModel.viewHome.fields.forEach(function (field, fieldIndex) {
                    var sValue = eval('row["' + field.name + '"]');

                    iColumnCount = iColumnCount + 1;
                    aHTML.push('<td class="interfaceItemList" id="interfaceHomeItemList' + iColumnCount + '_' + row.id + '">');
                    aHTML.push(sValue + "</td>");
                });

                aHTML.push("</tr>");

            });
            aHTML.push("</tbody></table>");
        }
        else {
            aHTML.push("<p>" + oJSON.error + "</p>")
        }

        var sSafeHTML = window.toStaticHTML(aHTML.join(""));
        document.querySelector("#divObjectContentNoContextDetail").innerHTML = sSafeHTML;

        if (iRowCount > 0) {
            var oListElements = document.querySelectorAll("td.interfaceItemList");
            for (var i = 0; i < oListElements.length; i++) {
                oListElements[i].addEventListener("click",
                        function (event) {
                            var aElement = event.target.id.split("_");
                            WinJS.Navigation.navigate("/pages/detail/1blankspace.detail.html",
                                { selectedIndex: -1, objectContext: aElement[1] });

                        },
                        false);
            }
        }
    }

    function interfaceControllerSearchDetail() {
        // This function searches for the record inContext (ie: by id so that it returns a specific record)
        // This function is called when the user either:
        //  - clicks on a record in the search results
        //  - clicks on a record in the Home View
        //  - activates a deep link into the application
        var oModel = 1blankspace.getObjectModel(1blankspace.currentObject);

        // Search for the record and create the binding object
        var oSearchData =
        {
            "fields": [],
            "filters": [{
                name: "id",
                comparison: "EQUAL_TO",
                value1: 1blankspace.itemObjectContext
            }],
            "options":
            {
                "rf": "JSON",
                "async": "false"
            }
        };

        var aSearchFields = 1blankspace.getCurrentObjectModel(1blankspace.currentObject);
        for (var i = 0; i < aSearchFields.length; i++) {
            oSearchData.fields.push({ "name": aSearchFields[i] });
        }

        mydigitalstructure.search({
            baseMethod: oModel.modelMethods.base,
            searchParameters: oSearchData,
            functionSuccess: interfaceControllerViewDetail,
            xhtmlElementIdError: "divObjectContentNoContextDetail",
            xhtmlElementIdInProgresss: "divObjectContentNoContextDetail"
        });

    }

    function interfaceControllerViewDetail(response) {
        // This function is called when the user either:
        //  - clicks on a record in the search results
        //  - clicks on a record in the Home View
        //  - activates a deep link into the application via Search charm, etc

        var oModel = 1blankspace.getObjectModel(1blankspace.currentObject);
        var listViewModel = 1blankspace.getViewGroups();

        var oJSON = JSON.parse(response.responseText);
        if (oJSON.status == "OK") {

            oJSON.data.rows.forEach(function (row, rowIndex) {
                //1blankspace.objectContextData = new 1blankspace.objectModelDefinition(row);
                1blankspace.objectContextData = row;
            });
        }

        WinJS.UI.Animation.fadeOut(document.querySelector("#divObjectContentNoContextDetail"));
        WinJS.UI.Animation.fadeOut(document.querySelector("#divObjectContentNoContext"));
        WinJS.UI.Animation.fadeIn(document.querySelector("#divObjectContentInContext"));

        // Construct the html for the object's viewGroups Detail tabs 
        var aGroupHTML = [];
        var aSearchFields = [];
        listViewModel.forEach(function (viewGroup, viewGroupIndex) {

            var aDivHTML = [];
            var oBindingDivs = [];

            aGroupHTML.push('<div class="objectDetail" id="divDetailMain' + viewGroup.name + '"></div>');

            // Summary tab is special - process this separately
            if (viewGroup.name == "Summary") {  // Add Summary div 

                var objectViewSummary = 1blankspace.getObjectViewSummary(oModel.object);

                if (objectViewSummary != undefined) {
                    // Generate the html

                    for (var iColumn = 0; iColumn < objectViewSummary.maxColumns; iColumn++) {

                        var sClass = (objectViewSummary.maxColumns > 1) ? "objectDetailMultiColumn" : "objectDetailSingleColumn";
                        aDivHTML.push('<div class="' + sClass + '" ' +
                                   'id="divObjectDetail' + viewGroup.name + 'Column' + (iColumn) + '">');

                        // List any fields 
                        aDivHTML.push('<table><tbody>');
                        if (objectViewSummary.fields.length > 0) {

                            for (var i = 0; i < objectViewSummary.fields.length; i++) {

                                var field = objectViewSummary.fields[i];
                                if (field.viewColumn == iColumn + 1) {
                                    // Add this div to the oBindingDivs object to be added to the viewGroups list
                                    oBindingDivs.push({ bindingDivId: 'divObjectDetail' + viewGroup.name + 'Column' + (iColumn) });

                                    aDivHTML.push('<tr id="trObjectDetail' + viewGroup.name + field.name + '" ' +
                                                'class="objectDetailLabel">');
                                    aDivHTML.push('<td id="tdObjectDetail' + viewGroup.name + field.name + '" ' +
                                                'class="objectDetailLabel">' + field.label + '</td></tr>');
                                    aDivHTML.push('<tr id="trObjectDetail' + viewGroup.name + field.name + 'Value" ' +
                                                'class="objectDetailValueViewOnly">');
                                    aDivHTML.push('<td id="tdObjectDetail' + viewGroup.name + field.name + 'Value" ' +
                                                'class="objectDetailValueViewOnly" data-win-bind="innerText: ' + field.name + '"></td></tr>');
                                }
                            }
                        }

                        if (objectViewSummary.actions.length > 0) {
                            objectViewSummary.actions.forEach(function (action, actionIndex) {

                                // Add this div to the oBindingDivs object to be added to the viewGroups list
                                // ToDo: Need to check if div has already been added to the bindingDivs list
                                //oBindingDivs.push({ bindingDivId: 'divObjectDetail' + viewGroup.name + 'Column' + (iColumn) });

                                if (action.viewColumn == iColumn + 1) {
                                    aDivHTML.push('<tr id="trObjectDetail' + viewGroup.name + action.caption.replace(/ /g, "") + '" ' +
                                                'class="objectDetailLabel">');
                                    aDivHTML.push('<td id="tdObjectDetail' + viewGroup.name + action.caption.replace(/ /g, "") + 'Action" ' +
                                                'class="objectDetailLabel">' + action.caption);
                                    aDivHTML.push('</td></tr>');
                                    //ToDo: Need to bind function to action
                                }
                            });
                        }

                        aDivHTML.push('</tbody></table>');
                        aDivHTML.push('</div>');
                    }

                }
            }
            else {

                // Check if any viewModel fields and add to DOM
                var objectViewModel = 1blankspace.getObjectViewModel(oModel.object);
                if (objectViewModel != undefined) {

                    // Work out how many columns are being used
                    var iMaxColumns = 1;
                    objectViewModel.forEach(function (field) {
                        if (field.viewGroup == (viewGroupIndex + 1) && field.viewColumn != undefined) {
                            iMaxColumns = Math.max(iMaxColumns, parseInt(field.viewColumn));
                        }
                    });


                    for (var iColumn = 1; iColumn <= iMaxColumns; iColumn++) {

                        // Add the div
                        var sClass = (iMaxColumns > 1) ? "objectDetailMultiColumn" : "objectDetailSingleColumn";
                        aDivHTML.push('<div class="' + sClass + '" ' +
                                   'id="divObjectDetail' + viewGroup.name + 'Column' + (iColumn) + '">');
                        // Add this div to the oBindingDivs object to be added to the viewGroups list
                        oBindingDivs.push({ bindingDivId: 'divObjectDetail' + viewGroup.name + 'Column' + (iColumn) });

                        aDivHTML.push('<table><tbody>');
                        objectViewModel.forEach(function (field) {

                            var iViewColumn = (field.viewColumn) ? field.viewColumn : 1;

                            if (field.viewGroup == (viewGroupIndex + 1) && iViewColumn == iColumn) {

                                aDivHTML.push('<tr id="trObjectDetail' + viewGroup.name + field.name + '" ' +
                                            'class="objectDetailLabel">');
                                aDivHTML.push('<td id="tdObjectDetail' + viewGroup.name + field.name + '" ' +
                                            'class="objectDetailLabel">' + field.caption + '</td></tr>');
                                aDivHTML.push('<tr id="trObjectDetail' + viewGroup.name + field.name + 'Value" ' +
                                            'class="objectDetailValueViewOnly">');
                                aDivHTML.push('<td id="tdObjectDetail' + viewGroup.name + field.name + 'Value" ' +
                                            'class="objectDetailValueViewOnly" data-win-bind="innerText: ' + field.name + '"></td></tr>');
                            }
                        });
                        aDivHTML.push('</tbody></table>');
                        aDivHTML.push("</div>");
                    }
                }

                // Check if any viewModelGroups and add template to DOM
                var objectViewModelGroups = 1blankspace.getObjectViewModelGroups(oModel.object);
                if (objectViewModelGroups.length > 0) {
                    // Add the template

                    aDivHTML.push('<table><tbody>');
                    objectViewModelGroups.forEach(function (field) {
                    });
                    aDivHTML.push('</tbody></table>');
                }
            }

            aDivHTML.push('</div>');   // Close the div for this tab

            viewGroup.bindingDivs = oBindingDivs;
            viewGroup.xhtml = aDivHTML.join("");
            viewGroup.divId = 'divDetailMain' + viewGroup.name;
            listViewModel.setAt(viewGroupIndex, viewGroup);

        });      // End: loop thru viewGroups

        // Add the detail divs to the DOM
        document.querySelector(".articlesection").innerHTML = aGroupHTML.join("");

        // Set up the ListView to display and navigate the tabs
        //var currentPageControl = WinJS.UI.Pages.get("/pages/detail/1blankspace.detail.html").prototype;
        var listView = document.querySelector(".itemlist").winControl;
        listView.itemDataSource = 1blankspace.getViewGroups().dataSource;
        listView.itemTemplate = document.querySelector(".itemtemplate");
        listView.onselectionchanged = 1blankspace.paneSelectionChanged.bind();
        listView.layout = new WinJS.UI.ListLayout();

        1blankspace.paneUpdateVisibility();
        if (1blankspace.pageIsSingleColumn()) {
            if (1blankspace.paneSelectedIndex >= 0) {
                // For single-column detail view, load the article.
                //binding.processAll(document.querySelector(".articlesection"), currentPageControl.items.getAt(this.paneSelectedIndex));
            }
        } else {
            if (WinJS.Navigation.canGoBack && WinJS.Navigation.history.backStack[WinJS.Navigation.history.backStack.length - 1].location === "/pages/detail/1blankspace.view.controller.html") {
                // Clean up the backstack to handle a user snapping, navigating
                // away, unsnapping, and then returning to this page.
                //WinJS.Navigation.history.backStack.pop();
            }
            // If this page has a selectionIndex, make that selection appear in the listview
            // First, determine the default paneSelectedIndex if not already set
            if (1blankspace.paneSelectedIndex == -1) {
                oModel.viewGroups.forEach(function (v, i) {
                    if (v.name == oModel.viewDefault) {
                        1blankspace.paneSelectedIndex = i;
                        return false;
                    }
                });
            }
            listView.selection.set(Math.max(1blankspace.paneSelectedIndex, 0));
        }

    }

    // This function checks if the list and details columns should be displayed
    // on separate pages instead of side-by-side.
    function isSingleColumn() {
        var viewState = Windows.UI.ViewManagement.ApplicationView.value;
        return (viewState === Windows.UI.ViewManagement.ApplicationViewState.snapped || viewState === Windows.UI.ViewManagement.ApplicationViewState.fullScreenPortrait);
    }

    function selectionChanged(args) {
        var listView = document.body.querySelector(".itemlist").winControl;
        var details;
        var that = this;
        var viewGroups = 1blankspace.getViewGroups();

        // We only process this if we're inContext and have clicked a Tab
        if (1blankspace.paneSelectedIndex != -1) {
            // By default, the selection is restriced to a single item.
            listView.selection.getItems().done(function updateDetails(items)
            {
                if (items.length > 0)
                {
                    1blankspace.paneSelectedIndex = items[0].index;

                    if (1blankspace.pageIsSingleColumn()) {
                        // If snapped or portrait, navigate to a new page containing the
                        // selected item's details.
                        WinJS.Navigationnavigate("/pages/detail/alt-enter.detail.html", { selectedIndex: 1blankspace.paneSelectedIndex });
                    } else {
                        // If fullscreen or filled, update the details column with new data.
                        // Hide any details divs not active
                        viewGroups.forEach(function (group, groupIndex) {
                            if (items[0].index != groupIndex) {
                                WinJS.Utilities.addClass(document.querySelector("#" + group.divId), "hideDiv")
                                WinJS.UI.Animation.fadeOut(document.querySelector("#" + group.divId));
                            } else {
                                WinJS.UI.Animation.fadeIn(document.querySelector("#" + group.divId));
                                WinJS.Utilities.removeClass(document.querySelector("#" + group.divId), "hideDiv")
                            }
                        })

                        if (1==1 || !items[0].data.rendered)
                        {
                            document.querySelector("#" + items[0].data.divId).innerHTML = items[0].data.xhtml;
                            items[0].data.rendered = true;
                  
                        }
                        items[0].data.bindingDivs.forEach(function (divId, divIdIndex) {
                            details = document.querySelector("#" + divId.bindingDivId);
                            WinJS.Binding.processAll(details, 1blankspace.objectContextData);
                            details.scrollTop = 0;
                        });
                    }
                }
            });
        }
    }

    function updateVisibility() {
        var oldPrimary = document.querySelector(".primarycolumn");
        if (oldPrimary) {
            WinJS.Utilities.removeClass(oldPrimary, "primarycolumn");
        }
        if (1blankspace.pageIsSingleColumn()) {
            if (1blankspace.paneSelectedIndex >= 0) {
                WinJS.Utilities.addClass(document.querySelector(".articlesection"), "primarycolumn");
                document.querySelector(".articlesection").focus();
            } else {
                WinJS.Utilities.addClass(document.querySelector(".itemlistsection"), "primarycolumn");
                document.querySelector(".itemlist").focus();
            }
        } else {
            document.querySelector(".itemlist").focus();
        }
    }

   
    WinJS.Namespace.define("1blankspace", {
        currentObject: null,
        objectContextData: null,
        itemObjectContext: null,
        objectModelDefinition: null,
        paneSelectedIndex: -1,
        getViewGroups: getViewGroups,
        addViewGroups: addViewGroups,
        clearViewGroups: clearViewGroups,
        createViewGroupsList: createViewGroupsList,
        setCurrentObjectModel: setCurrentObjectModel,
        getCurrentObjectModel: getCurrentObjectModel,
        getObjectModel: getObjectModel,
        getObjectViewModel: getObjectViewModel,
        getObjectViewModelGroups: getObjectViewModelGroups,
        getObjectViewSummary: getObjectViewSummary,
        setObjectHome: interfaceControllerViewHome,
        setObjectContext: interfaceControllerSearchDetail,
        paneSelectionChanged: selectionChanged,
        paneUpdateVisibility: updateVisibility,
        pageIsSingleColumn: isSingleColumn
    });
})();