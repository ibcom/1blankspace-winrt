(function () {
    "use strict";

    var hubGroups = [
        { key: "group1", title: "Contact", subtitle: "Your contacts"},
        { key: "group2", title: "Messaging", subtitle: "Messaging"},
        { key: "group3", title: "Billing", subtitle: "The work"},
        { key: "group4", title: "Financials", subtitle: "The reward, minus expenses!"}
    ];

    var hubItems = [
        { group: hubGroups[0], title: "Contacts", subtitle: "Contacts", object: 12 },
        { group: hubGroups[0], title: "Actions", subtitle: "Actions", object: 12 },
        { group: hubGroups[0], title: "Projects", subtitle: "Contacts", object: 12 },
        { group: hubGroups[1], title: "Email", subtitle: "IMAP", object: 12 },
        { group: hubGroups[1], title: "News", subtitle: "Bulk enews with tracking" },
        { group: hubGroups[1], title: "Conversations", subtitle: "Posts & comments" },
        { group: hubGroups[2], title: "Products", subtitle: "The widgets and services" },
        { group: hubGroups[2], title: "Orders", subtitle: "Selling the widget" },
        { group: hubGroups[2], title: "Time", subtitle: "Selling the activity" },
        { group: hubGroups[3], title: "Big picture", subtitle: "Where's the money!" },
        { group: hubGroups[3], title: "Invoice", subtitle: "The making of the money" },
        { group: hubGroups[3], title: "Expense", subtitle: "The spending of the money" }
    ];

    function getItemReference(item) {
        return [item.group.key, item.title, item.object];
    }

    function resolveGroupReference(key) {
        for (var i = 0; i < groupedItems.groups.length; i++) {
            if (groupedItems.groups.getAt(i).key === key) {
                return groupedItems.groups.getAt(i);
            }
        }
    }

    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }

    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    var list = new WinJS.Binding.List();

    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; }
    );

  
    hubItems.forEach(function (item) {
        list.push(item);
    });

    WinJS.Namespace.defineWithParent(altenter, "hub", {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemsFromGroup: getItemsFromGroup,
        getItemReference: getItemReference,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference
    });
})();
