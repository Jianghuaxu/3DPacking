sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "project1/modelHelper/PackProductsHelper",
    "sap/ui/vk/ContentResource",
    "sap/ui/vk/ContentConnector",
    "sap/ui/vk/thirdparty/three",
    "sap/ui/vk/Camera",
    "../utils/Util",
    "../libs/scandit-sdk/build/browser/index", // include the WebSDK as dependency,
    //"../libs/scandit-sdk/build", // include the WebSDK as dependency
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, PackProductsHelper, ContentResource, ContentConnector, threejs, Camera, Util) {
        "use strict";

        return Controller.extend("project1.controller.Initial", {
            bcalculate: true,
            root: new THREE.Group(),
            font: undefined,
            ratio: 20,
            _scanListModel: new JSONModel([]),
            _scannedProd: [],
            onInit: function () {
                this.initThreejsModel();
                this.fontLoader();
                this.initScan();
            },
            initScan: async function () {
                this.getView().setModel(this._scanListModel, "scan");

                //https://ssl.scandit.com/dashboard/sdk/projects: for creating a license key
                //var licenseKey = "AelhPGK0Q/QqARqoEztBkSsu6zcXPYf4cHWg1ysy9Q+kZ7oFpSMvK8NfRsWQJV/FYXLjnBcOZEdyHdejuXmAcgF1GcAGJYRq+ldYsHFrGCk9XP5mnG0wVy9b1c0ReclZdDR0iq8Y7xQHJ7cKwAWdGotEhAG+T0EsV3u81M/zRXWNfd41QLz2hYu0Ie/Bl+SkFPd1rA4wI3hOaT3ob9ZWuul0J+KBb++BMV2+kPmyUOK0yahOQeR6rBage01m0FTcDyQSa5GRBoO0aOdb8IN4nikGTvS1in/8RwNlq1e4AiV6MvN/xsT38lNT5jnr83iWPz4Yt8u0WiDrUC5umOl74vW5Nbd4s0x7MINfN15oslgOO7kDfI2EH76xltFIGYYmjFeVquQ+cXa6tcw9JuyAZav3m1hMdICBFOwJheGDlBNNdzyiuBAWc6rzOmzWb4MAJT1fLdRZ5ImWleUFgx3KVA0xD+kCT5Sy/Pl6TpS5vpIJvjJXtA8xgMHHv1Xno/yyPsqNINKOABzyVgTwgqP4lo6eIyJA6Al61tjWIWUgpDp5f1viAGJU8WYX/ub7F5W16JDIhlIX07+C0P+AFNkgyYjzG7QyWXEuQjbLTwUV4iAnWkS2wuhplWb8G0zAREOwGmNzpxTYnaK/blwHlsG30WzfbbvxcuOmLMvAzHoYJj+utoaG1AiQ7d2j/QUATTidJadOD4QIswIIYNZG9i6O5JIC99kPwwXrNKtXvLMm9VAeSDbjMNrB3R5DW0vdUVRMbVm1v3GDZwHhSSyrkhamcbF8vcV81XZgLg62+os7QMtiPUT9dKkCbSlwBKGMivrgiM1ncTao8WW4S2Xc";
                var licenseKey = "ATNBkDMUEa4GAlYNWibImqkDOXm/Oo+yJ1uIV05DLARbVdEoVkf5KmJW+VMtWgEgMVcMekBX7Mv1biyzMmduI3Fwxb9bKVkYs1fhZbh2gcKWY4UJbS3xbgJ86Ib0d1z5gEMQNoREhInZDxkgxSX4catOFImXUyhHZVoeaKqFPzeTalXdRyHOL6Z1NyyGgUE6n6tGPbEDkotoremBX+1RiZiAvi4mpEa8pTa0AfETKefICP6y7ldF+WmfhlcVMu2nPle9WL9WrW84FS8gFf+lb7ZlryIxGLp9hV5WprcQFsemefWJejUctutU9D+ML5HgjtEp4macvDUU6T9b3tqkB18bSmOPWQ82psKV7DcU+psKX6cxqxijPEfKzb1WW00MZiptQ0vRUfr3X5/cHorA0cYZ0T0fXC8LA58eHHkkOJTb8dCtHSRF18lArnXUR3XURdLKtOGvSCJxcg2F6Q7EGBffQXikOLBpasaXrgrB8MILfXPRxDLpPx6jxQ/wtszVDEtePn/g6urZwtXJoQAOD1EmCJtwMkvI6+TuC0it/FHtU4fDLZ2kbzAs3EKPh3lccFRNFOiWQ5vmsf3Qi3BANigPwhJfRtinZv9/vpxQeonCQA8dr9okn/xJjzcnwgNRne66aKB5nuDR730mAyNth6ozakl8lBxsOxV+PPwaeJa5/vE37NRHbeJkDN6n5fx7Wxfq9jaG/GO2RGLJU4V6GfiEV/G2zu4OaNOTXmhe9BarpYy5MIhxZ3/TvYwHk7F2v0MdbjRq5MMwbJhMYPCs2/4k3285BQhM6S4NOMNw2kr/ZeQAcO1K0eIknoZDpETHN+hjN7iESfOleY1P";
                //var licenseKey = "AVZx5Tu0GhkhLUEh8A7SdiIJ0uLtD41dZ0R3fNtvNbAESdrUaATie5l1DED0KWsxJ0p6Tr9KTF7EVb02tnbtFDtkL93lM+ed6lS1tFtpVOB0WF8DCUnsKWh9qWU0SElsCF7H8flkAjLERbF5GnmrR00KpP++C/7GNkaW6Kc2hzlFMiJiuGMhKJh7bsWzITocORec3uCyPhV/9NYApXlg/Y8zy1dla6IDtX8s/35szIm0UKRS0rXhyn1scHFS35NeHCni1ULmhJGkYfHYPRRGtqJY+n2ei3ZW8mStkFhuQHULZxsm7MXoOojoF5C/H7PQNOuVVPfdm21wEhqgW7uecELDjEH/xLjp2BPoFINaF/ayjQEbd2SUAnCDZ6Qr8ojlqH/vLEyK6fONkXbTTXMwaHEIAocaU9r4ramWB8t2eUerkyPH8Y06Vb8yhDJBRShK/pCML9wUqVYf60wUFTJ7LeGAvYhjXiI9DhRBFOf2e0ZCcJ+oiIAg8CCy81pslnNIjUA7arDqUw4WwVbn64ZP8q7mDdwP5T8BET63pKkC3YSFWwI0r+6w5S51UhAjqraRvEG0XklOUVxT+8WnJQ9mz0Qx1ZW0ds0RIekjQzRpn1gROTtcmwb1DyQ3MCkNjKv6RqC8Cb59jeBKwgdj2+8hZWsmzAeCj2hVxQ3/r3vZq9zaappFd4qed91dmxG1vp/TjkTbLvel9tm8kZZasljj1b6ciC/FH259SmjNiVAvydVea4XkoeBxTwZBdKrbGJDTPRt8qF5AAtCHeNbYFHc76ZxDjLu48OweW0SQsyvlgW14W36ekKpY9Xf+LD3i4D+i+uYhKw0Pvhd2T3VjEml7eRSeCbdwRily1oiotKqA";
                await ScanditSDK.configure(licenseKey,
                    {
                        engineLocation: "./libs/scandit-sdk/build/", // path to scan engine
                        //engineLocation: "./node_modules/scandit-sdk/build/"
                    });

                // create the BarcodePicker element for code128 barcodes
                this.barcodePicker = await ScanditSDK.BarcodePicker.create(
                    //document.getElementById("container-project1---Initial--scandit-barcode-picker"), { // version for debugging in SAP Business Application Studio (index.html does not exist)
                    document.getElementById("application-project1-display-component---Initial--scandit-barcode-picker"), {
                    scanSettings: new ScanditSDK.ScanSettings({
                        enabledSymbologies: ["code128", "ean8", "ean13", "upca", "upce"],
                        codeDuplicateFilter: 3000, // Minimum delay between duplicate results
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
                    var aScanResultList = this._scanListModel.getData();

                    var tmp = {
                        "Result": scanRes,
                        "product_sequence": aScanResultList.length + 1,
                        "bl": "X: " + scanResultLoc.bottomLeft.x + ", Y: " + scanResultLoc.bottomLeft.y,
                        "br": "X: " + scanResultLoc.bottomRight.x + ", Y: " + scanResultLoc.bottomRight.y,
                        "tl": "X: " + scanResultLoc.topLeft.x + ", Y: " + scanResultLoc.topLeft.y,
                        "tr": "X: " + scanResultLoc.topRight.x + ", Y: " + scanResultLoc.topRight.y
                    };

                    aScanResultList.push(tmp);
                    // insert scanned value into searchField
                    this._scanListModel.setData(aScanResultList);

                    var tmpLen = (scanResultLoc.topRight.x - scanResultLoc.topLeft.x) * 512 / 1280;
                    var tmpHei = (scanResultLoc.bottomLeft.y - scanResultLoc.topLeft.y) * 288 / 720;

                    //in _scannedProd, we use x and y to represent the topleft point, from this we will draw a highlight around the barcode, and by calculating the bottom left point, we shall draw a yellow rect with the packing sequence
                    // check if the new scanned product is to be added into the list: we shall compare if the "new product" is the previous scanned one
                    var isNewProduct = this._checkNewScannedProduct(scanRes, scanResultLoc.topLeft.x * 512 / 1280, scanResultLoc.topLeft.y * 288 / 720, tmpLen, tmpHei);
                    if (isNewProduct) {
                        this._scannedProd.push({
                            "prod": scanRes,
                            "product_sequence": this._scannedProd.length + 1,
                            "x": scanResultLoc.topLeft.x * 512 / 1280,
                            "y": scanResultLoc.topLeft.y * 288 / 720,
                            "len": tmpLen,
                            "hei": tmpHei,
                            "pack_sequence": 0,
                            "scannedDateTime": new Date().getTime()
                        })
                    }



                    if (this._scannedProd.length > 2) {
                        console.log(this._scannedProd.length);
                        //save the picture in local model. 

                        // pause scanning
                        this.barcodePicker.pauseScanning();
                        this.barcodePicker.setVisible(false);

                        //start to call backend oData service for calculation: ZEWM_PBO_SRV
                        // this is to be done by using local JSON Model: _scannedProd
                        this._calculatePMAT();
                    }

                    /*
                    ctx.strokeRect(scanResultLoc.topLeft.x*512/1280, scanResultLoc.topLeft.y*288/720, tmpLen, tmpHei);

                    //add Packing instructions for each scanned product
                    ctx.font = "20px Verdana";
                    var gradient = ctx.createLinearGradient(0, 0, can.width, 0);
                    gradient.addColorStop("0", "magenta");
                    gradient.addColorStop("0.5", "blue");
                    gradient.addColorStop("1.0", "red");
                    // Fill with gradient
                    ctx.fillStyle = gradient;
                    
                    ctx.fillText("Pack Sequence 1", (scanResultLoc.bottomLeft.x)*512/1280, (scanResultLoc.bottomLeft.y+20)*288/720);
                    */


                });

                /* this.barcodePicker.processVideoFrame(function (frame) {
                     console.log(frame)
                 }) */
            },

            _calculatePMAT: function () {
                var oModel = this.getView().getModel();
                var oPayLoad1 = {
                    // "CalculatePack_ac": "",
                    "ProductSequence": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0,
                            v = c === "x" ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    }),
                    "Product": "PROD-S02G",
                    "PackSequence": 1,
                    "ProductLength": "440",
                    "ProductWidth": "240",
                    "ProductHeight": "10",
                    "ProductMeasurementUnit": "MM",
                    "ProductQuantity": "1",
                    "ProductUoM": "EA"
                    // "Orientation": "",
                    //"XPosition": "-4",
                    //"YPosition": "-4",
                    //"ZPosition": "-7.25",
                    //"PackProductLength": "",
                    //"PackProductWidth": "",
                    //"PackProductHeight": "",
                    // "PackProductMeasurementUnit": ""
                };
                var oPayLoad2 = {
                    // "CalculatePack_ac": "",
                    "ProductSequence": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0,
                            v = c === "x" ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    }),
                    "Product": "PROD-S02G",
                    "PackSequence": 2,
                    "ProductLength": "16",
                    "ProductWidth": "6",
                    "ProductHeight": "14.4",
                    "ProductMeasurementUnit": "MM",
                    "ProductQuantity": "1",
                    "ProductUoM": "EA"
                    // "Orientation": "",
                    //"XPosition": "-7",
                    //"YPosition": "-7",
                    //"ZPosition": "4.05",
                    //"PackProductLength": "",
                    //"PackProductWidth": "",
                    //"PackProductHeight": "",
                    // "PackProductMeasurementUnit": ""
                };
                var oPayLoad3 = {
                    // "CalculatePack_ac": "",
                    "ProductSequence": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0,
                            v = c === "x" ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    }),
                    "Product": "PROD-S02G",
                    "PackSequence": 3,
                    "ProductLength": "440",
                    "ProductWidth": "240",
                    "ProductHeight": "12",
                    "ProductMeasurementUnit": "MM",
                    "ProductQuantity": "1", 
                    "ProductUoM": "EA"
                    // "Orientation": "",
                    //"XPosition": "-7",
                    //"YPosition": "-7",
                    //"ZPosition": "4.05",
                    //"PackProductLength": "",
                    //"PackProductWidth": "",
                    //"PackProductHeight": "",
                    // "PackProductMeasurementUnit": ""
                };
                oModel.create("/EWM3DPackSet", oPayLoad1, {
                    success: function () {

                    },
                    error: function () {

                    }
                });
                oModel.create("/EWM3DPackSet", oPayLoad2, {
                    success: function () {

                    },
                    error: function () {

                    }
                });

                oModel.create("/EWM3DPackSet", oPayLoad3, {
                    success: function () {

                    },
                    error: function () {

                    }
                });
            },

            _checkNewScannedProduct: function (scannedProduct, pos_x, pos_y, len, hei) {
                //this is to be compared with the this._scannedProd;
                //Check 1: product name
                var vIndex = this._scannedProd.findIndex(function (item) {
                    return item.prod == scannedProduct;
                });
                var vIsNewProduct = true;
                if (vIndex > -1) {
                    //check 2: pos_x and pos_y -> no overlap
                    this._scannedProd.forEach(function (item) {
                        if (item.prod == scannedProduct) {
                            if (Math.abs(item.x - pos_x) < len && Math.abs(item.y - pos_y) < hei) {
                                vIsNewProduct = false;
                            }
                        }
                    });

                }
                return vIsNewProduct;

            },

            _drawPackSequence: function () {
                //this is called when API return results from oData
                //image modifications
                var vid = document.getElementsByTagName("video")[0];
                var can = document.getElementById("application-project1-display-component---Initial--myCanvas1");
                //var canBtp = document.getElementById("container-project1---Initial--myCanvas1");
                var ctx = can.getContext("2d");



                ctx.drawImage(vid, 0, 0, 512, 288);
                ctx.strokeStyle = "green";


                //TODO: need to consider the case that barcode is not placed in horizontal or vertical -> /\/\
                //add Packing instructions for each scanned product


                //draw each scanned product in canvas video

                var _drawedProd = [];
                var pack_seq = 1; // TODO: to be removed
                for (let index = this._scannedProd.length - 1; index > -1; index--) {
                    if (_drawedProd.indexOf(this._scannedProd[index].prod) == -1) {
                        //assume that the pack sequence is retrieved from backend
                        this._scannedProd[index].pack_sequence = pack_seq; //TODO: to be removed
                        ctx.strokeRect(this._scannedProd[index].x, this._scannedProd[index].y, this._scannedProd[index].len, this._scannedProd[index].hei); // draw barcode highlight with green rect
                        ctx.fillStyle = "yellow";
                        ctx.fillRect(this._scannedProd[index].x, this._scannedProd[index].y + this._scannedProd[index].hei + 20 * 288 / 720, this._scannedProd[index].len * 2, this._scannedProd[index].hei * 1.5)
                        ctx.fillStyle = "black";
                        ctx.font = "30px Georgia";
                        ctx.fillText(pack_seq, this._scannedProd[index].x + this._scannedProd[index].len, this._scannedProd[index].y + 20 * 288 / 720 + this._scannedProd[index].hei * 1.75); //draw yellow rect below with the packing sequence 
                        pack_seq++;
                    }
                    _drawedProd.push(this._scannedProd[index].prod)

                }
            },

            onScanInputButton: function () {
                this.barcodePicker.setVisible(true);
                this.barcodePicker.resumeScanning();

                //reset model 
                this._scannedProd = [];
                this._scanListModel.setData([]);
            },

            onSelect: function () {
                this._drawPackSequence();
                this._calculatePMAT();
            },

            onCalculate: function (bcalculate) {
                var vPackProductList;
                if (bcalculate) {
                    var aScanResultList = this._scanListModel.getData();
                    for (var i = 1; i < aScanResultList.length; i++) {
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
                            success: function (data) {
                                // result
                                var vPackResult = data.PackResult;

                                // Assign the result to model
                                // PackProductsHelper.setProductSequence(vPackResult)

                                // Input to 3D visualization
                            },
                            error: function (err) {
                                var oJsonError = JSON.parse(err.responseText);
                                var oMessage = {
                                    message: oJsonError.error.message.value,
                                    severity: "error"
                                };
                                that.getMessageHandler().displayMessageBox(oMessage, that.getResourceBundle());
                                return;
                            }
                        };

                        oEvent.getSource().getModel().callFunction("/TriggerCalculate", oPara);

                    }

                    var vPackResult = [{
                        // "CalculatePack_ac": "",
                        "ProductSequence": "1",
                        "Product": "PROD-S01",
                        "PackSequence": "1",
                        "ProductLength": "22",
                        "ProductWidth": "12",
                        "ProductHeight": "8",
                        // "ProductMeasurementUnit": "",
                        // "Orientation": "",
                        "XPosition": "-4",
                        "YPosition": "-4",
                        "ZPosition": "-7.25",
                        "PackProductLength": "30",
                        "PackProductWidth": "20",
                        "PackProductHeight": "22.5",
                        // "PackProductMeasurementUnit": ""
                    }, {
                        // "CalculatePack_ac": "",
                        "ProductSequence": "2",
                        "Product": "PROD-S02",
                        "PackSequence": "2",
                        "ProductLength": "16",
                        "ProductWidth": "6",
                        "ProductHeight": "14.4",
                        // "ProductMeasurementUnit": "",
                        // "Orientation": "",
                        "XPosition": "-7",
                        "YPosition": "-7",
                        "ZPosition": "4.05",
                        "PackProductLength": "30",
                        "PackProductWidth": "20",
                        "PackProductHeight": "22.5",
                        // "PackProductMeasurementUnit": ""
                    }, {
                        // "CalculatePack_ac": "",
                        "ProductSequence": "3",
                        "Product": "PROD-S03",
                        "PackSequence": "3",
                        "ProductLength": "6.5",
                        "ProductWidth": "10",
                        "ProductHeight": "13.8",
                        // "ProductMeasurementUnit": "",
                        // "Orientation": "",
                        "XPosition": "4.35",
                        "YPosition": "-5",
                        "ZPosition": "3.75",
                        "PackProductLength": "30",
                        "PackProductWidth": "20",
                        "PackProductHeight": "22.5",
                        // "PackProductMeasurementUnit": ""
                    }, {
                        // "CalculatePack_ac": "",
                        "ProductSequence": "4",
                        "Product": "PROD-S04",
                        "PackSequence": "4",
                        "ProductLength": "7.3",
                        "ProductWidth": "8",
                        "ProductHeight": "15",
                        // "ProductMeasurementUnit": "",
                        // "Orientation": "",
                        "XPosition": "11.35",
                        "YPosition": "-6",
                        "ZPosition": "-3.75",
                        "PackProductLength": "30",
                        "PackProductWidth": "20",
                        "PackProductHeight": "22.5",
                        // "PackProductMeasurementUnit": ""
                    }]

                    PackProductsHelper.setPackProductsModelData(vPackResult)
                    var oTempProduct = vPackResult[0];
                    this.addHU(oTempProduct.PackProductLength, oTempProduct.PackProductWidth, oTempProduct.PackProductHeight);
                    this.addProduct(oTempProduct);
                    return;

                }
            },
            fontLoader: function () {
                new THREE.FontLoader().load('./Fonts/helvetiker_bold.typeface.json', function (text) {
                    this.font = text;
                }.bind(this));
            },
            initPosition: function (obj, name, posX, posY, posZ, id) {
                obj.name = name;
                obj.position.set(posX, posY, posZ);
                obj.userData.treeNode = {
                    sid: id
                };
            },
            initThreejsModel: function () {
                ContentConnector.addContentManagerResolver(this.threejsContentManagerResolver.bind(this));
                this.initPosition(this.root, "Root", 0, 0, 0, "0");

                var camera = new THREE.PerspectiveCamera(45, 604 / 496, 1, 1000);
                // this.initPosition(camera, "camera", 0, 0, 0, "7");
                // this.root.add(camera);

                // this.root.add(new THREE.AmbientLight(0x222222));
                // var light = new THREE.PointLight(0xffffff, 1);
                // camera.add(light);
                this.root.rotateY(-0.2);
                this.root.rotateX(0.1);
                // this.root.rotateZ(-0.2);

                var axes = new THREE.AxesHelper(35);
                this.initPosition(axes, "axe", -15, -12, -12, "1");
                this.root.add(axes);
                this.axes = this.root.children[0];

                this.getView().byId("viewer").addContentResource(
                    new ContentResource({
                        source: this.root,
                        sourceType: "THREE.Object3D",
                        name: "Object3D"
                    })
                );
            },
            threejsContentManagerResolver: function (contentResource) {
                var that = this;
                if (contentResource.getSource() instanceof THREE.Object3D) {
                    return Promise.resolve({
                        dimension: 3,
                        contentManagerClassName: "sap.ui.vk.threejs.ContentManager",
                        settings: {
                            loader: that.threejsObjectLoader
                        }
                    });
                } else {
                    return Promise.reject();
                }
            },
            threejsObjectLoader: function (parentNode, contentResource) {
                parentNode.add(contentResource.getSource());
                return Promise.resolve({
                    node: parentNode,
                    contentResource: contentResource
                });
            },
            onDisplay: function (oEvent) {
                this.axes.children = [];
                var sDimension = this.byId("dimension").getValue();
                var oDimensionModel = Util.isEmpty(sDimension) ? {} : JSON.parse(sDimension);
                var aDimension = Util.isEmpty(oDimensionModel.d) ? oDimensionModel : oDimensionModel.d.results;

                var sPosition = this.byId("position").getValue();
                var oPositionModel = Util.isEmpty(sPosition) ? {} : JSON.parse(sPosition);
                var aPosition = Util.isEmpty(oPositionModel.d) ? [] : oPositionModel.d.results;

                // display HU
                var sInputLength = this.byId("length").getValue();
                var sHULength = Util.isEmpty(sInputLength) ? aDimension[0].laeng_pack : parseFloat(sInputLength);
                var sInputWidth = this.byId("width").getValue();
                var sHUWidth = Util.isEmpty(sInputWidth) ? aDimension[0].breit_pack : parseFloat(sInputWidth);
                var sInputHeight = this.byId("height").getValue();
                var sHUHeight = Util.isEmpty(sInputHeight) ? aDimension[0].hoehe_pack : parseFloat(sInputHeight);
                this.addHU(sHULength, sHUHeight, sHUWidth);

                //display product
                var aProduct = [];
                if (Util.isEmpty(sPosition)) {
                    aProduct = aDimension;
                } else {
                    for (var i = 0; i < aDimension.length; i++) {
                        aProduct.push(Object.assign(aDimension[i], aPosition[i]));
                    }
                }
                this.addProducts(aProduct);
            },
            // onCalculate: function () {
            //     var sDimension = this.byId("dimension").getValue();
            //     var oDimensionModel = Util.isEmpty(sDimension) ? {} : JSON.parse(sDimension);
            //     $.ajax({
            //         url: "https://ldai7er9.wdf.sap.corp:44300/z3dpacking?sap-client=003",
            //         type: "POST",
            //         data: sDimension,
            //         contentType: "application/json;charset=utf-8",
            //         dataType: "json",
            //         crossDomain: true,
            //         success: function (data) {
            //             alert(data); // Object 
            //         },
            //         error: function (XMLHttpRequest, textStatus, errorThrown) {
            //             alert(XMLHttpRequest.status);
            //             alert(XMLHttpRequest.readyState);
            //             alert(textStatus);
            //         },
            //         complete: function (XMLHttpRequest, textStatus) {}
            //     });
            // },
            findMaxLength: function (iLength, iWidth, iHeight) {
                if (iLength > iWidth) {
                    if (iLength > iHeight) {
                        return iLength;
                    } else {
                        return iHeight;
                    }
                } else {
                    if (iWidth > iHeight) {
                        return iWidth;
                    } else {
                        return iHeight;
                    }
                }
            },
            addHU: function (length, width, height) {
                var iLength, iWidth, iHeight;
                if (Util.isEmpty(length) || Util.isEmpty(width) || Util.isEmpty(height)) {
                    iLength = 30;
                    iWidth = 30;
                    iHeight = 30;
                    this.ratio = 600 / 30;
                } else {
                    iLength = parseFloat(length);
                    iWidth = parseFloat(width);
                    iHeight = parseFloat(height);
                    var iMax = this.findMaxLength(iLength, iWidth, iHeight);
                    this.ratio = iMax !== 0 ? iMax / 30 : 600 / 30;
                    iLength = iLength / this.ratio;
                    iWidth = iWidth / this.ratio;
                    iHeight = iHeight / this.ratio;
                }
                var geometry = new THREE.BoxGeometry(iLength, iHeight, iWidth);
                var material = new THREE.MeshBasicMaterial({
                    color: 0xFFFFFF,
                    opacity: 0.3,
                    transparent: true,
                    depthWrite: false
                });
                var cube = new THREE.Mesh(geometry, material);
                this.initPosition(cube, "hu", iLength / 2, iHeight / 2, iWidth / 2, "2");

                this.axes.add(cube);

                this.getView().byId("viewer").addContentResource(
                    new ContentResource({
                        source: this.root,
                        sourceType: "THREE.Object3D",
                        name: "Object3D"
                    })
                );
            },
            addProducts: function (aProduct) {
                aProduct.forEach(function (oProduct) {
                    this.addProduct(oProduct);
                }.bind(this));

                this.addSequence(aProduct);
            },
            addProduct: function (oProduct) {
                this.adjustOrienation(oProduct);
                var length = oProduct.ProductLength / this.ratio;
                var width = oProduct.ProductWidth / this.ratio;
                var height = oProduct.ProductHeight / this.ratio;

                //var geometry = new THREE.BoxGeometry(length, width, height);
                var geometry = new THREE.BoxGeometry(length, height, width);
                var material = new THREE.MeshBasicMaterial({
                    color: 0x3EABFF,
                    opacity: 0.35,
                    transparent: true,
                    side: THREE.DoubleSide
                });
                var cube = new THREE.Mesh(geometry, material);

                this.initPosition(cube, "product", oProduct.XPosition / this.ratio + length / 2, oProduct.ZPosition / this.ratio + height / 2, oProduct.YPosition /
                    this.ratio + width / 2, "S" + oProduct.PackSequence);
                this.axes.add(cube);

                this.getView().byId("viewer").addContentResource(
                    new ContentResource({
                        source: this.root,
                        sourceType: "THREE.Object3D",
                        name: "Object3D"
                    })
                );
            },
            adjustOrienation: function (oProduct) {
                var temp;
                switch (oProduct.Orientation) {
                    case 2:
                        temp = oProduct.ProductLength;
                        oProduct.ProductLength = oProduct.ProductWidth;
                        oProduct.ProductWidth = temp;
                        return oProduct;
                    case 3:
                        temp = oProduct.ProductWidth;
                        oProduct.ProductWidth = oProduct.ProductHeight;
                        oProduct.ProductHeight = temp;
                        return oProduct;
                    case 4:
                        temp = oProduct.ProductLength;
                        oProduct.ProductLength = oProduct.ProductHeight;
                        oProduct.ProductHeight = oProduct.ProductWidth;
                        oProduct.ProductWidth = temp;
                        return oProduct;
                    case 5:
                        temp = oProduct.ProductLength;
                        oProduct.ProductLength = oProduct.ProductHeight;
                        oProduct.ProductHeight = temp;
                        return oProduct;
                    case 6:
                        temp = oProduct.ProductLength;
                        oProduct.ProductLength = oProduct.ProductWidth;
                        oProduct.ProductWidth = oProduct.ProductHeight;
                        oProduct.ProductHeight = temp;
                        return oProduct;
                    default:
                        return oProduct;
                }
            },
            addSequence: function (aProduct) {
                var length;
                var width;
                var height;
                var gem;
                var mat;
                var textObj;

                aProduct.forEach(function (oProduct) {
                    length = oProduct.ProductLength / this.ratio;
                    width = oProduct.ProductWidth / this.ratio;
                    height = oProduct.ProductHeight / this.ratio;
                    gem = new THREE.TextGeometry(oProduct.pac_sequence.toString(), {
                        size: 2.2,
                        height: 0.2, //字的厚度
                        weight: 'normal', //or 'bold'
                        font: this.font,
                        style: 'normal', //or 'italics'，是否斜体
                        bevelThickness: 1, //倒角厚度
                        bevelSize: 1, //倒角宽度
                        curveSegments: 60, //弧线分段数，使得文字的曲线更加光滑
                        bevelEnabled: false, //是否使用倒角，意为在边缘处斜切
                    });
                    //	gem.center();
                    mat = new THREE.MeshPhongMaterial({
                        color: 0xff0000,
                        specular: 0x009900,
                        shininess: 30,
                        shading: THREE.FlatShading
                    });
                    textObj = new THREE.Mesh(gem, mat);
                    //	textObj.castShadow = true;

                    this.initPosition(textObj, "sequence", oProduct.XPosition / this.ratio + length / 2, oProduct.ZPosition / this.ratio + height / 2,
                        oProduct.YPosition / this.ratio + width / 2, "Se" + oProduct.PackSequence);

                    this.axes.add(textObj);
                }.bind(this));

                this.getView().byId("viewer").addContentResource(
                    new ContentResource({
                        source: this.root,
                        sourceType: "THREE.Object3D",
                        name: "Object3D"
                    })
                );
            },
            onDisplayDefaultView: function () {
                this.getView().byId("viewer").addContentResource(
                    new ContentResource({
                        source: this.root,
                        sourceType: "THREE.Object3D",
                        name: "Object3D"
                    })
                );
            },
            onDisplayBackView: function () {
                this.root.rotateY(2);
                this.getView().byId("viewer").addContentResource(
                    new ContentResource({
                        source: this.root,
                        sourceType: "THREE.Object3D",
                        name: "Object3D"
                    })
                );
            },
            onDisplayTopView: function () {
                this.root.rotateX(90);
                this.getView().byId("viewer").addContentResource(
                    new ContentResource({
                        source: this.root,
                        sourceType: "THREE.Object3D",
                        name: "Object3D"
                    })
                );
            },

        });
    });
