sap.ui.define([
	"project1/model/PackProducts"
], function(oModel) {
	"use strict";    
	return {
		getModel: function() {
			return oModel;
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

	
		}

	};

});