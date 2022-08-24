sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function(JSONModel) {
	"use strict";
	return new JSONModel({
        "ProductSequence": "", // this is optional, since each Product is different.
		"Product": "",

        //Product dimensions 
        "ProductLength": "",
        "ProductWidth": "",
        "ProductHeight": "",
        "Orientation": "",
        "XPosition": "",
        "YPosition": "",
        "ZPosition": "",

        //packaging information 
        "PackSequence": "",
        "PackProduct": "",
        "PackProductLength": "",
        "PackProductWidth": "",
        "PackProductHeight": "",

        //runtime information 
        "ProductMovedInd": false,
        "ProductToBeMovedInd": false
	});
});