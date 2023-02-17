sap.ui.define([
    "project1/model/ODOModel"
], function (Model) {
    "use strict";
    return {
        setModel: function (odata) {
            var aRes = [];
            var oRes = {};
            for (var i = 0; i < odata.length; i++) {
                oRes.Product = odata[i].Product;
                oRes.ProductDesc = odata[i].ProductName;
                oRes.ProductQuantity = odata[i].ItemDeliveryQuantity;
                oRes.ProductUoM = odata[i].ItemDeliveryQuantityUnit;
                oRes.ProductBatch = odata[i].Batch;
                aRes.push(oRes);
            }
            Model.setData(aRes);
            return this;
        },
        getProperty: function (propertyName) {
            return Model.getProperty(propertyName);
        },
        resetProperty: function (propertyName) {
            Model.setProperty(propertyName, "");
        },
        setProperty: function (propertyName, value) {
            Model.setProperty(propertyName, value);
        },
        getModel: function () {
            return Model;
        }
    }
});