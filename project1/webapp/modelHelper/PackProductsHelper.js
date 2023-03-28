sap.ui.define([
	"project1/model/PackProducts"
], function(oModel) {
	"use strict";    
	return {
		getModel: function() {
			return oModel;
		},

        setModel: function(odata) {
			oModel.setData(odata);
			return this;
		},

		setProductSequence: function(sProductSequence) {
			oModel.setProperty("/sProductSequence", sProductSequence);
			return this;
		},

		getProductSequence: function() {
			return oModel.getProperty("/iProductSequence");
		},

		setProduct: function(sProduct) {
			oModel.setProperty("/sProduct", sProduct);
			return this;
		},

		getProduct: function() {
			return oModel.getProperty("/sProduct");
		},

		setPackSequence: function(sPackSequence) {
			oModel.setProperty("/sPackSequence", sPackSequence);
			return this;
		},

		getPackSequence: function() {
			return oModel.getProperty("/sPackSequence");
		},

		setProductLength: function(sProductLength) {
			oModel.setProperty("/sProductLength", sProductLength);
			return this;
		},

		getProductLength: function() {
			return oModel.getProperty("/sProductLength");
		},

		setProductWidth: function(sProductWidth) {
			oModel.setProperty("/sProductWidth", sProductWidth);
			return this;
		},		

		getProductWidth: function() {
			return oModel.getProperty("/sProductWidth");
		},

		setProductHeight: function(sProductHeight) {
			oModel.setProperty("/sProductHeight", sProductHeight);
			return this;
		},
		
		getProductHeight: function() {
			return oModel.getProperty("/sProductHeight");
		},
		
		setOrientation: function(sOrientation) {
			oModel.setProperty("/sOrientation", sOrientation);
			return this;
		},

		getOrientation: function() {
			return oModel.getProperty("/sOrientation");
		},

		setXPosition: function(sXPosition) {
			oModel.setProperty("/sXPosition", sXPosition);
			return this;
		},

		getXPosition: function() {
			return oModel.getProperty("/sXPosition");
		},

		setYPosition: function(sYPosition) {
			oModel.setProperty("/sYPosition", sYPosition);
			return this;
		},		

		getYPosition: function() {
			return oModel.getProperty("/sYPosition");
		},

		setZPosition: function(sZPosition) {
			oModel.setProperty("/sZPosition", sZPosition);
			return this;
		},

		getZPosition: function() {
			return oModel.getProperty("/sZPosition");
		},

		setPackProductsModelData: function(oProduct) {
			this.setProductSequence(oProduct.ProductSequence);
			this.setProduct(oProduct.Product);
			
			this.setProductLength(oProduct.ProductLength);
			this.setProductWidth(oProduct.ProductWidth);
            this.setProductHeight(oProduct.ProductHeight);

            this.setOrientation(oProduct.Orientation);
            this.setXPosition(oProduct.XPosition);
            this.setYPosition(oProduct.YPosition);
            this.setZPosition(oProduct.ZPosition);

            this.setPackSequence(oProduct.PackProduct);
            this.setPackSequence(oProduct.PackSequence);
            this.setPackSequence(oProduct.PackProductLength);
            this.setPackSequence(oProduct.PackProductWidth);
            this.setPackSequence(oProduct.PackProductHeight);
            
		},

		setPackProductsModelDataMock: function () {
			var aRes = [
				{
					"__metadata": {
						"id": "/ZEWM_PBO_SRV/EWM3DPackSet(ProductSequence=guid'42010aef-4c9f-1edd-87da-996a691b3460',Product='PROD-S02G')",
						"uri": "/ZEWM_PBO_SRV/EWM3DPackSet(ProductSequence=guid'42010aef-4c9f-1edd-87da-996a691b3460',Product='PROD-S02G')",
						"type": "ZEWM_PBO_SRV.EWM3DPack"
					},
					"Matselectedflag": "",
					"ProductSequence": "42010aef-4c9f-1edd-87da-996a691b3460",
					"ProductMeasurementUnit": "MM",
					"ProductUrl": "",
					"Product": "PROD-S01G",
					"ProductLength": "100.000",
					"ProductWidth": "100.000",
					"ProductHeight": "50.000",
					"Orientation": 1,
					"XPosition": 75,
					"YPosition": 75,
					"ZPosition": 0,
					"PackSequence": 3,
					"PackProduct": "CARTON_M",
					"PackProductLength": "450.000",
					"PackProductWidth": "250.000",
					"PackProductHeight": "400.000",
					"ProductQuantity": "0.000",
					"ProductUoM": ""
				},
				{
					"__metadata": {
						"id": "/ZEWM_PBO_SRV/EWM3DPackSet(ProductSequence=guid'42010aef-4c9f-1edd-87da-996a691b1460',Product='PROD-S02G')",
						"uri": "/ZEWM_PBO_SRV/EWM3DPackSet(ProductSequence=guid'42010aef-4c9f-1edd-87da-996a691b1460',Product='PROD-S02G')",
						"type": "ZEWM_PBO_SRV.EWM3DPack"
					},
					"Matselectedflag": "",
					"ProductSequence": "42010aef-4c9f-1edd-87da-996a691b1460",
					"ProductMeasurementUnit": "MM",
					"ProductUrl": "",
					"Product": "PROD-S02G",
					"ProductLength": "100.000",
					"ProductWidth": "100.000",
					"ProductHeight": "50.000",
					"Orientation": 1,
					"XPosition": 175,
					"YPosition": 75,
					"ZPosition": 0,
					"PackSequence": 2,
					"PackProduct": "CARTON_M",
					"PackProductLength": "450.000",
					"PackProductWidth": "250.000",
					"PackProductHeight": "400.000",
					"ProductQuantity": "0.000",
					"ProductUoM": ""
				},
				{
					"__metadata": {
						"id": "/ZEWM_PBO_SRV/EWM3DPackSet(ProductSequence=guid'42010aef-4c9f-1edd-87da-996a691af460',Product='PROD-S02G')",
						"uri": "/ZEWM_PBO_SRV/EWM3DPackSet(ProductSequence=guid'42010aef-4c9f-1edd-87da-996a691af460',Product='PROD-S02G')",
						"type": "ZEWM_PBO_SRV.EWM3DPack"
					},
					"Matselectedflag": "",
					"ProductSequence": "42010aef-4c9f-1edd-87da-996a691af460",
					"ProductMeasurementUnit": "MM",
					"ProductUrl": "",
					"Product": "PROD-S03G",
					"ProductLength": "100.000",
					"ProductWidth": "100.000",
					"ProductHeight": "50.000",
					"Orientation": 1,
					"XPosition": 275,
					"YPosition": 75,
					"ZPosition": 0,
					"PackSequence": 1,
					"PackProduct": "CARTON_M",
					"PackProductLength": "450.000",
					"PackProductWidth": "250.000",
					"PackProductHeight": "400.000",
					"ProductQuantity": "0.000",
					"ProductUoM": ""
				}
			]
			this.setModel(aRes);
		},

		clearSelectedData: function() {
			this.setProductSequence("");
			this.setProduct("");
			this.setPackSequence("");
			this.setProductLength("");
			this.setProductWidth("");
			this.setProductHeight("");
			this.setOrientation("");
			this.setOrientation("");
			this.setXPosition("");
			this.setYPosition("");
			this.setZPosition("");

	
		},

        updateMovedIndicator: function(prod, movedIndicator) {
            var oData = Object.assign( this.getModel().getData(), []);
            var ind = oData.findIndex( v => v.Product == prod);
            if (ind > -1) {
                oData[ind].ProductMovedInd = movedIndicator;
            }
			this.setModel(oData);
           
        },

        updateToBeMovedIndicator: function (prod, toBePackedInd) {
            var oData = Object.assign( this.getModel().getData(), []);
            var ind = oData.findIndex( v => v.Product == prod);
            if (ind > -1) {
                oData[ind].ProductToBeMovedInd = toBePackedInd;
            }
			this.setModel(oData);
        },

	};

});