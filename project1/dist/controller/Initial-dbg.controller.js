sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../libs/scandit-sdk/build/browser/index", // include the WebSDK as dependency
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.Initial", {
            onInit: async function () {
                    //https://ssl.scandit.com/dashboard/sdk/projects: for creating a license key
                var licenseKey = "AelhPGK0Q/QqARqoEztBkSsu6zcXPYf4cHWg1ysy9Q+kZ7oFpSMvK8NfRsWQJV/FYXLjnBcOZEdyHdejuXmAcgF1GcAGJYRq+ldYsHFrGCk9XP5mnG0wVy9b1c0ReclZdDR0iq8Y7xQHJ7cKwAWdGotEhAG+T0EsV3u81M/zRXWNfd41QLz2hYu0Ie/Bl+SkFPd1rA4wI3hOaT3ob9ZWuul0J+KBb++BMV2+kPmyUOK0yahOQeR6rBage01m0FTcDyQSa5GRBoO0aOdb8IN4nikGTvS1in/8RwNlq1e4AiV6MvN/xsT38lNT5jnr83iWPz4Yt8u0WiDrUC5umOl74vW5Nbd4s0x7MINfN15oslgOO7kDfI2EH76xltFIGYYmjFeVquQ+cXa6tcw9JuyAZav3m1hMdICBFOwJheGDlBNNdzyiuBAWc6rzOmzWb4MAJT1fLdRZ5ImWleUFgx3KVA0xD+kCT5Sy/Pl6TpS5vpIJvjJXtA8xgMHHv1Xno/yyPsqNINKOABzyVgTwgqP4lo6eIyJA6Al61tjWIWUgpDp5f1viAGJU8WYX/ub7F5W16JDIhlIX07+C0P+AFNkgyYjzG7QyWXEuQjbLTwUV4iAnWkS2wuhplWb8G0zAREOwGmNzpxTYnaK/blwHlsG30WzfbbvxcuOmLMvAzHoYJj+utoaG1AiQ7d2j/QUATTidJadOD4QIswIIYNZG9i6O5JIC99kPwwXrNKtXvLMm9VAeSDbjMNrB3R5DW0vdUVRMbVm1v3GDZwHhSSyrkhamcbF8vcV81XZgLg62+os7QMtiPUT9dKkCbSlwBKGMivrgiM1ncTao8WW4S2Xc";
                await ScanditSDK.configure(licenseKey,
                    {
                        engineLocation: "./libs/scandit-sdk/build/", // path to scan engine
                    });

                // create the BarcodePicker element for code128 barcodes
                this.barcodePicker = await ScanditSDK.BarcodePicker.create(
                    document.getElementById("application-project1-display-component---Initial--scandit-barcode-picker"), { // version for debugging in SAP Business Application Studio (index.html does not exist)
                    scanSettings: new ScanditSDK.ScanSettings({
                        enabledSymbologies: ["code128"]
                    }),
                    playSoundOnScan: true,
                    vibrateOnScan: true,
                    scanningPaused: true,
                    visible: false, // hide the BarcodePicker initially (hidden initialization saves startup time when its used later on)
                });

                // set the callback function for scan results of the BarcodePicker
                this.barcodePicker.on("scan", (scanResult) => {
                    var toSearch = scanResult.barcodes[0].data;
                    // sap.m.MessageBox.show(toSearch);

                    // insert scanned value into searchField
                    var searchField = this.byId("searchField");
                    searchField.setValue(toSearch);
                    var searchParam = {};
                    searchParam.query = toSearch;
                    searchField.fireSearch(searchParam);

                    // pause scanning
                    this.barcodePicker.pauseScanning();
                    this.barcodePicker.setVisible(false);
                });

            },

            onScanInputButton: function () {
                this.barcodePicker.setVisible(true);
                this.barcodePicker.resumeScanning();
            },
        });
    });
