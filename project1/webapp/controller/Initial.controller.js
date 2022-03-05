sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "project1/modelHelper/PackProductsHelper",    
	"sap/ui/vk/ContentResource",
	"sap/ui/vk/ContentConnector",
	"sap/ui/vk/thirdparty/three",
	"sap/ui/vk/Camera",
    "../utils/Util",
    "../libs/scandit-sdk/build/browser/index", // include the WebSDK as dependency
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
            _scanListModel: new JSONModel([{
                "Result": 1234,
                "bl": "X: 24, Y: 78",
                "br": "X: 82, Y: 91",
                "tl": "X:98, Y:101",
                "tr": "X: 10, Y: 81" 
            }]),
            onInit: function () {
                this.initThreejsModel();
                this.fontLoader();
                this.initScan();
            },
            initScan: async function () {                
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
                //test github        
            },

            onScanInputButton: function () {
                this.barcodePicker.setVisible(true);
                this.barcodePicker.resumeScanning();
            },

            onSelect: function () {
                console.log();
            },

            onCalculatePack: function (bcalculate) {
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

                                // Define URL
                                // According to: https://ldai7er9.wdf.sap.corp:44300/sap/opu/odata4/sap/api_whse_physinvtryitem_2/srvd_a2x/sap/whsephysicalinventorydoc/0001/$batch

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
    
                        oEvent.getSource().getModel().callFunction("/Calculate", oPara);

                    }
                              
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
                //var geometry = new THREE.BoxGeometry(length, width, height);
                var geometry = new THREE.BoxGeometry(iLength, iHeight, iWidth);
                var material = new THREE.MeshBasicMaterial({
                    color: 0xFFFFFF,
                    opacity: 0.3,
                    transparent: true,
                    depthWrite:false
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
                var length = oProduct.laeng / this.ratio;
                var width = oProduct.breit / this.ratio;
                var height = oProduct.hoehe / this.ratio;
    
                //var geometry = new THREE.BoxGeometry(length, width, height);
                var geometry = new THREE.BoxGeometry(length, height, width);
                var material = new THREE.MeshBasicMaterial({
                    color: 0x3EABFF,
                    opacity: 0.35,
                    transparent: true,
                    side: THREE.DoubleSide
                });
                var cube = new THREE.Mesh(geometry, material);
    
                // this.initPosition(cube, "product", oProduct.xpos + length / 2, oProduct.Ypos + width / 2, oProduct.zpos + height / 2, "S" +
                // 	oProduct.PacSequence);
                this.initPosition(cube, "product", oProduct.xpos / this.ratio + length / 2, oProduct.zpos / this.ratio + height / 2, oProduct.ypos /
                    this.ratio + width / 2, "S" +
                    oProduct.PacSequence);
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
                switch (oProduct.orientation) {
                case 2:
                    temp = oProduct.laeng;
                    oProduct.laeng = oProduct.breit;
                    oProduct.breit = temp;
                    return oProduct;
                case 3:
                    temp = oProduct.breit;
                    oProduct.breit = oProduct.hoehe;
                    oProduct.hoehe = temp;
                    return oProduct;
                case 4:
                    temp = oProduct.laeng;
                    oProduct.laeng = oProduct.hoehe;
                    oProduct.hoehe = oProduct.breit;
                    oProduct.breit = temp;
                    return oProduct;
                case 5:
                    temp = oProduct.laeng;
                    oProduct.laeng = oProduct.hoehe;
                    oProduct.hoehe = temp;
                    return oProduct;
                case 6:
                    temp = oProduct.laeng;
                    oProduct.laeng = oProduct.breit;
                    oProduct.breit = oProduct.hoehe;
                    oProduct.hoehe = temp;
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
                    length = oProduct.laeng / this.ratio;
                    width = oProduct.breit / this.ratio;
                    height = oProduct.hoehe / this.ratio;
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
    
                    // this.initPosition(textObj, "sequence", oProduct.xpos + length / 2, oProduct.ypos + width / 2, oProduct.zpos + height / 2,
                    // 	"Se" +
                    // 	oProduct.PacSequence);
                    this.initPosition(textObj, "sequence", oProduct.xpos / this.ratio + length / 2, oProduct.zpos / this.ratio + height / 2,
                        oProduct.ypos / this.ratio + width / 2, "Se" + oProduct.pac_sequence);
                    this.axes.add(textObj);
                }.bind(this));
    
                this.getView().byId("viewer").addContentResource(
                    new ContentResource({
                        source: this.root,
                        sourceType: "THREE.Object3D",
                        name: "Object3D"
                    })
                );
            }
        });
    });
