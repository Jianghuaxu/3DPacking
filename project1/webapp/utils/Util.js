sap.ui.define([
		"sap/ui/core/format/NumberFormat"
], function ( NumberFormat) {
	"use strict";
	return {
		isEmpty: function (sValue) {
			var bEmpty = false;
			if (sValue === undefined || sValue === null || sValue === "") {
				bEmpty = true;
			}
			return bEmpty;
		},
		trim: function (sValue) {
			return $.trim(sValue);
		},
		removeLeadingZero: function (sValue) {
			var reg = /\b(0+)/gi;
			sValue = this.trim(sValue);
			return sValue.replace(reg, "");
		},
		isString: function (obj) {
			return (typeof obj) === "string";
		},
		getUserId: function () {
			return sap.ushell.Container.getUser().getId();
		},
		formatText: function (sTextTemplate, aParameter) {
			return jQuery.sap.formatMessage(sTextTemplate, aParameter);
		},
		startWith: function (sString, sPrefix) {
			var reg = new RegExp("^" + sPrefix);
			return reg.test(sString);
		},
		containString: function (sTestString, sContainString) {
			var reg = new RegExp(sContainString);
			return reg.test(sTestString);
		},
		getResolvePromise: function (data) {
			return this._getPromise(true, data);
		},
		getRejectPromise: function (data) {
			return this._getPromise(false, data);
		},
		_getPromise: function (bFullFill, data) {
			var oPromise;
			if (bFullFill) {
				oPromise = new Promise(function (resolve) {
					resolve(data);
				});
			} else {
				oPromise = new Promise(function (resolve, reject) {
					reject(data);
				});
			}
			return oPromise;
		},
		findIndex: function (aItems, fnCallbck) {
			var inx = 0;
			var iCount = aItems.length;
			var iRet = -1;

			for (; inx < iCount; inx++) {
				if (fnCallbck(aItems[inx], inx, aItems)) {
					iRet = inx;
					break;
				}
			}
			return iRet;
		},
		formatNumber: function (sValue, iDigitsLength, iMinDigits) {
			var oFloatFormat;
			var oLocale = this.getLocale();
			if (this.isEmpty(iDigitsLength)) {
				oFloatFormat = NumberFormat.getFloatInstance(oLocale);
			} else {
				var oFormatOptions = {
					minFractionDigits: iMinDigits === undefined ? 0 : iMinDigits,
					maxFractionDigits: iDigitsLength
				};
				oFloatFormat = NumberFormat.getFloatInstance(oFormatOptions, oLocale);
			}
			return oFloatFormat.format(sValue);
		},
		parseNumber: function (sValue, bRoundup) {
			var oLocale = this.getLocale();
			var oFloatFormat = NumberFormat.getFloatInstance(oLocale);
			return oFloatFormat.parse(sValue);
		},
		getLocale: function () {
			var sLanguage = sap.ui.getCore().getConfiguration().getLanguage();
			return new sap.ui.core.Locale(sLanguage);
		},
		/**
		 * returns the value of the first element in the array that satisfies the provided testing function. 
		 * Otherwise undefined is returned. please refer Array.prototype.find
		 * 
		 * @param {array} aItems The array 
		 * @param {function} fnCallback Function to execute on each value in the array, taking three arguments.
		 * @return {object} oRet The array item 
		 */
		find: function (aItems, fnCallback) {
			var oRet;
			var iCount = aItems.length;
			for (var inx = 0; inx < iCount; inx++) {
				if (fnCallback(aItems[inx], inx, aItems)) {
					oRet = aItems[inx];
					break;
				}
			}
			return oRet;
		},

		getStringCharCode: function (sStr) {
			var sCharCode = "";
			for (var i = 0; i < sStr.length; i++) {
				sCharCode += sStr.charCodeAt(i);
			}
			return sCharCode;
		},
		isInteger: (function () {
			if (Number.isInteger) {
				return Number.isInteger;
			} else {
				return function (iValue) {
					return typeof iValue === "number" &&
						isFinite(iValue) && Math.floor(iValue) === iValue;
				};
			}
		})(),
		isQuantityOverflow: function (iQuantity) {
			if (this.isInteger(iQuantity)) {
				return false;
			} else {
				return iQuantity.toString().split(".")[1].length > 3;
			}
		},
		formatSerialNumber: function (aSerialNumber) {
			return aSerialNumber.join(" ");
		},
		flushPendings: (function () {
			var _fnFlushPending;
			return {
				get: function () {
					return _fnFlushPending;
				},
				set: function (fnFlushPending) {
					_fnFlushPending = fnFlushPending;
				}
			};
		})(),
		getFilters: function (aKeys, aValues) {
			var aFilters = [];
			aFilters = aKeys.map(function (oKey, i) {
				var sValue = aValues[i];
				if (sValue.endsWith("*") && sValue.startsWith("*")) {
					sValue = sValue.substring(1, sValue.length - 1);
					return new sap.ui.model.Filter(oKey, sap.ui.model.FilterOperator.Contains, sValue);
				} else if (sValue.endsWith("*")) {
					sValue = sValue.substring(0, sValue.length - 1);
					return new sap.ui.model.Filter(oKey, sap.ui.model.FilterOperator.StartsWith, sValue);
				} else if (sValue.startsWith("*")) {
					sValue = sValue.substring(1);
					return new sap.ui.model.Filter(oKey, sap.ui.model.FilterOperator.EndsWith, sValue);
				} else {
					return new sap.ui.model.Filter(oKey, sap.ui.model.FilterOperator.Contains, sValue);
				}
			});
			return aFilters;
		},
	};
});