sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "project1/modelHelper/PackProductsHelper",
    "../libs/scandit-sdk/build/browser/index", // include the WebSDK as dependency
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, PackProductsHelper) {
        "use strict";

        return Controller.extend("project1.controller.Initial", {
            bcalculate: true,

            _scanListModel: new JSONModel([{
                "Result": 1234,
                "bl": "X: 24, Y: 78",
                "br": "X: 82, Y: 91",
                "tl": "X:98, Y:101",
                "tr": "X: 10, Y: 81" 
            }]),
            onInit: async function () {

                this.getView().setModel(this._scanListModel, "scan");

                // Initialize pack product model
                this.getView().setModel(PackProductsHelper.getModel(), "PackProducts");

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
                        enabledSymbologies: ["code128"],
                        codeDuplicateFilter: 10000, // Minimum delay between duplicate results
                    }),
                    playSoundOnScan: true,
                    vibrateOnScan: true,
                    scanningPaused: true,
                    visible: false, // hide the BarcodePicker initially (hidden initialization saves startup time when its used later on)
                });

                // set the callback function for scan results of the BarcodePicker
                this.barcodePicker.on("scan", (scanResult) => {
                    var scanRes = scanResult.barcodes[0].data;

                    var scanResultLoc = scanResult.barcodes[0].location;
                    // sap.m.MessageBox.show(toSearch);

                    var tmp = {
                        "Result": scanRes,
                        "bl": "X: " + scanResultLoc.bottomLeft.x + ", Y: " + scanResultLoc.bottomLeft.y,
                        "br": "X: " + scanResultLoc.bottomRight.x + ", Y: " + scanResultLoc.bottomRight.y,
                        "tl": "X: " + scanResultLoc.topLeft.x + ", Y: " + scanResultLoc.topLeft.y,
                        "tr": "X: " + scanResultLoc.topRight.x + ", Y: " + scanResultLoc.topRight.y
                    };
                    var aScanResultList = this._scanListModel.getData();
                    aScanResultList.push(tmp);
                    // insert scanned value into searchField
                    this._scanListModel.setData(aScanResultList); 

                    // pause scanning
                    this.barcodePicker.pauseScanning();
                    this.barcodePicker.setVisible(false);
                });



            },

            onScanInputButton: function () {
                this.barcodePicker.setVisible(true);
                this.barcodePicker.resumeScanning();
            },

            onSelect: function () {
                console.log();
            },

            onCalculate: function (bcalculate) {
                var vPackProductList;
                if (bcalculate){
                    var aScanResultList = this._scanListModel.getData();
                    for (var i=1 ; i<aScanResultList.length; i++){
                        // Item position not the same - different products

                        vPackProductList = vPackProductList.append(aScanResultList[i]["Result"]);

                        // Sequence

                        var oParam = {
                            Productsequence: i,
                            Product: aScanResultList[i]["Result"],                          
                        };
                        
                        // call calculation action
                        // But how can send list of product as para , and call action only for once??

                        var oPara = {
                            method: "POST",
                            urlParameters: oParam,
                            success: function(data) {
                                // result
                                var vPackResult = data.PackResult;

                                // Assogn the result to model
                                //PackProductsHelper.setProductSequence(vPackResult.)

                                // Input to 3D visualization
                                
                                //var origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? (":" + window.location.port) :
                                //    "");
                                //var sUrl = origin + "/sap/opu/odata/SAP/CA_OC_OUTPUT_REQUEST_SRV/" + "Roots(ApplObjectType='" + 'EWM_PHYSICAL_INVENTORY' +
                                //    "',ApplObjectId='" + vAppObjId + "')/" + "Preview/$value";
                                //sap.m.URLHelper.redirect(sUrl, true);
                            },
                            error: function(err) {
                                var oJsonError = JSON.parse(err.responseText);
                                var oMessage = {
                                    message: oJsonError.error.message.value,
                                    severity:"error"
                                };
                                that.getMessageHandler().displayMessageBox(oMessage, that.getResourceBundle());
                                return;
                            }
                        };
    
                        oEvent.getSource().getModel().callFunction("/TriggerCalculate", oPara);

                    }
                              
                }
            }

        });
    });
