sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "project1/modelHelper/PackProductsHelper",
    "project1/modelHelper/ODOModelHelper",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "../utils/Util",
    "../three/Three",
    "../three/math/ConvexHull",
    "../three/geometries/ConvexGeometry",
    "../three/controls/OrbitControls",
    "../three/utils/BufferGeometryUtils",
    "../libs/scandit-sdk/build/browser/index", // include the WebSDK as dependency,
    //"../libs/scandit-sdk/build", // include the WebSDK as dependencyhttps://cdn.jsdelivr.net/npm/handtrackjs@latest/dist/handtrack.min.js
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, PackProductsHelper, ODOModelHelper, Filter, FilterOperator, Util) {
        "use strict";
        return Controller.extend("project1.controller.Initial", {
            bcalculate: true,
            scene: new THREE.Scene(),
            prod: new THREE.Object3D(),
            group: new THREE.Group(),
            font: undefined,
            ratio: 20,
            _scanListModel: new JSONModel([]),
            _odoProdModel: new JSONModel([]),
            _scannedProd: [],
            _OldScannedProd: [],
            _nrOfProducts: 4, // TODO: this shall be read from the ODO number
            _reScanFlag: false, // flag to indicator if this scan is purely on UI part
            onInit: function () {
                this._odoInput = this.getView().byId("odoRefNrInput");
                var that = this;
                jQuery.sap.delayedCall(1000, this, function() {
                    that._odoInput.focus();
                });

                this._initScan();
                this._audioBtn = this.getView().byId("voice");
                this._audioWave = this.getView().byId("voice_wave");

                //this._initProdList();
                this.getView().setModel(this._odoProdModel, "odoProd");
            },
            onAfterRendering: function () {
                //this.initThreejsModel2();
                this.initThreejsModel3();
            },
           
            addrenderer: function () {
                const can = this.getView().byId("myCanvas2");
                const canDom = can.getId();
                const canElm = document.getElementById(canDom);

                // camera
    
                this.camera = new THREE.PerspectiveCamera( 40, canElm.width / canElm.height, 1, 1000 );
                this.camera.position.set( 60, 80, 120 );
                //this.scene.add( this.camera );
                // renderer
                this.renderer = new THREE.WebGLRenderer({ canvas: canElm, antialias: true  });
                // renderer.setPixelRatio( window.devicePixelRatio );
                this.renderer.setSize( canElm.width, canElm.height );
                // resize
                window.addEventListener( 'resize', onWindowResize.bind(this) );
                function onWindowResize() {
    
                    canElm.width = 0.4 * window.innerWidth;
                    canElm.height = 0.4 * window.innerHeight;

                    this.camera.aspect = canElm.width / canElm.height;
                    this.camera.updateProjectionMatrix();
    
                    this.renderer.setSize( canElm.width, canElm.height );
    
                }
            },

            addrenderer2: function () {
                const can = this.getView().byId("myCanvas2");
                const canDom = can.getId();
                const canElm = document.getElementById(canDom);
                const GRID_SPACING = 10;

                // render
                this.renderer = new THREE.WebGLRenderer({ canvas: canElm, antialias: true  });
                this.renderer.setClearColor("#263238");
                this.renderer.setSize( canElm.width, canElm.height );

                // camera
                //this.camera = new THREE.PerspectiveCamera( 40, canElm.width / canElm.height, 1, 1000 );
                //this.camera.position.set( 60, 80, 120 );
                this.camera = new THREE.PerspectiveCamera( 80, canElm.width / canElm.height, 0.1, 100000 );
                this.camera.position.z = -50;
                this.camera.position.y = 50;
                this.camera.position.x = -50;
                this.camera.lookAt(new THREE.Vector3(0, 0, 0));

                //------Add ORBIT CONTROLS--------
                this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
                this.controls.enableDamping = true;
                this.controls.dampingFactor = 0.25;
                this.controls.enableZoom = true;
                this.controls.autoRotate = false;
                this.controls.keys = {
                    LEFT: 37, //left arrow
                    UP: 38, // up arrow
                    RIGHT: 39, // right arrow
                    BOTTOM: 40 // down arrow
                };

                this.controls.addEventListener("change", () => {
                    if (this.renderer) this.renderer.render(this.scene, this.camera);
                });

                //raycaster = new THREE.Raycaster();

                var ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
                var directionalLight1 = new THREE.DirectionalLight(0xFFFFFF, 0.6);
                var directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.8);
                var directionalLight3 = new THREE.DirectionalLight(0xFFFFFF, 0.9);

                // set directionalLights to random places
                directionalLight1.position.set(3, 4, 5);
                directionalLight2.position.set(-3, 4, -5);
                directionalLight3.position.set(2, 5, 4);

                // (0, 0, 0) to target directionalLights at
                var origin = new THREE.Object3D();

                // target directionalLights to origin
                directionalLight1.target = origin;
                directionalLight2.target = origin;
                directionalLight3.target = origin;

                this.scene.add(ambientLight);
                this.scene.add(directionalLight1);
                this.scene.add(directionalLight2);
                this.scene.add(directionalLight3);

                // Add Grid
                let gridXZ = new THREE.GridHelper(
                    GRID_SPACING * 10,
                    10,
                    0x18ffff, //center line color
                    0x42a5f5 //grid color,
                );
                this.scene.add(gridXZ);
                gridXZ.position.y = 0;

                // resize
                window.addEventListener( 'resize', onWindowResize.bind(this) );
                function onWindowResize() {
    
                    canElm.width = 0.4 * window.innerWidth;
                    canElm.height = 0.4 * window.innerHeight;

                    this.camera.aspect = canElm.width / canElm.height;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize( canElm.width, canElm.height );
    
                }
            },
            initThreejsModel3: function () {
                // renderer
                this.addrenderer2();

                this.scene.add( this.group );
                
                // object loader
                this.readprod();

                // pack
                this.pack();

                this.animate();

            },
            initThreejsModel2: function () {
                
                this.scene.background = new THREE.Color( 0x949494 );
                // camera
    
                // this.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
                // this.camera.position.set( 60, 80, 120 );
                // this.scene.add( this.camera );
    
                // renderer
                this.addrenderer();
                // controls
    
                this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
                this.controls.minDistance = 20;
                this.controls.maxDistance = 50;
                this.controls.maxPolarAngle = Math.PI / 2;
                this.controls.update();
    
                // ambient light
    
                this.scene.add( new THREE.AmbientLight( 0x222222 ) );
    
                // point light
    
                const light = new THREE.PointLight( 0xffffff, 1 );
                this.camera.add( light );
    
                // helper
    
                this.scene.add( new THREE.AxesHelper( 20 ) );
    
                // textures
    
                const loader = new THREE.TextureLoader();
                const texture = loader.load( 'textures/sprites/disc.png' );
    
                this.scene.add( this.group );
                
                // object loader
                this.readprod();

                // pack
                this.pack();

                this.animate();
            },
            animate: function () {
                requestAnimationFrame( this.animate.bind(this) );

                this.group.rotation.y += 0.01;

                this.renderer.render( this.scene, this.camera );
            },
            animate2: function (){
                const ANGULAR_VELOCITY = 0.01;
                 //update Orbit Of Camera
                this.controls.update();
                var orbit;
                var delta = 0;

                //Animate rotation of light
                if (orbit) orbit.rotation.z += ANGULAR_VELOCITY;

                // Update Uniform of shader
                delta += 0.01;
                //Direct manipulation
                //shaderMaterial.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.0005;
                //shaderMesh.material.uniforms.u_time.value = delta;

                this.handleIntersection();
                this.handleStepNumber();

                //Redraw scene
                this.renderScene();
                this.frameId = window.requestAnimationFrame(this.animate);
            },
            handleIntersection: function () {
                var raycaster;
                var visibleContainers;
                raycaster = new THREE.Raycaster();
                raycaster.setFromCamera( pointer, camera );
                
                var target = null;
                for(var i = 0; i < visibleContainers.length; i++) {
                  for(var k = 0; k < visibleContainers[i].children.length; k++) {
                    var intersects = raycaster.intersectObjects(visibleContainers[i].children[k].children );
                    if ( intersects.length > 0 ) {
                      target = intersects[ 0 ].object;
                    }
                  }
                }
            
                if(target) {
                  if ( INTERSECTED != target) {
                    if ( INTERSECTED ) {
                      INTERSECTED.material.emissive = new Color("#000000");
            
                    }
                    INTERSECTED = target
                    INTERSECTED.myColor = INTERSECTED.material.color;
                    INTERSECTED.material.emissive = new Color("#FF0000") 
                  }
                } else {
                  if ( INTERSECTED ) {
                    INTERSECTED.material.emissive = new Color("#000000") ;
                    INTERSECTED = null;
                  }
                }
              },
            
              handleStepNumber: function()  {
                if(stepNumber != renderedStepNumber) {
                  console.log("Show step number " + stepNumber);
                  for(var i = 0; i < visibleContainers.length; i++) {
                    var visibleContainer = visibleContainers[i];
                    var visibleContainerUserData = visibleContainer.userData;
                    visibleContainer.visible = visibleContainerUserData.step < stepNumber;
                    
                    for(var k = 0; k < visibleContainers[i].children.length; k++) {
            
                      var container = visibleContainers[i].children[k];
                      var containerUserData = container.userData;
                      
                      container.visible = containerUserData.step < stepNumber;
                      
                      var stackables = container.children;
                      for(var j = 0; j < stackables.length; j++) {
                        var userData = stackables[j].userData;
                        stackables[j].visible = userData.step < stepNumber;
                      }
                    }          
                  }
                  renderedStepNumber = stepNumber;
                }
              },
            readprod: async function () {
                this.Prodloader = new THREE.ObjectLoader();
                this.prod = await this.Prodloader.loadAsync(
                    // resource URL
                    "../model/model.three.json",
                
                    // onLoad callback
                    // Here the loaded data is assumed to be an object
                    function ( obj ) {
                        // Add the loaded object to the scene
                        obj.name = "prod1";
                    }
                    );
                this.group = this.prod;
                this.scene.add(this.prod);
            },
            pack: function () {
                // let products = PackProductsHelper.getModel().getData();
                // let ind = products.ProductMovedInd;

                let currentIndex = 0;
                var onKeyDown = (event) => {
                    
                    // hide obj
                    if (event.keyCode == 72) { // when 'h' is pressed
                        // Alternatively, to parse a previously loaded JSON structure
                        // var object = this.scene.getObjectByName( "prod1", true );
                        this.prod.traverse ( function (child) {
                            if (child instanceof THREE.Mesh) {
                                child.visible = false;
                                child.material.color.set( 0xffffff );
                                child.userData.ProductMovedInd = false;
                                child.userData.ProductToBeMovedInd = false;
                            }
                        });
                        currentIndex = 0;
                    };
                    // show obj
                    if (event.keyCode == 83) { // when 's' is pressed
                        // Alternatively, to parse a previously loaded JSON structure
                        // var object = this.scene.getObjectByName( "prod1", true );
                        this.prod.traverse ( function (child) {
                            if (child instanceof THREE.Mesh) {
                                child.visible = true;
                            }
                        });
                    };
                    // show pack hu
                    if (event.keyCode == 80) { // when 's' is pressed
                        // Alternatively, to parse a previously loaded JSON structure
                        var object = this.scene.getObjectByName( "Box", true)
                        object.traverse ( function (child) {
                            if (child instanceof THREE.Mesh) {
                                child.visible = true;
                            }
                        });
                    };

                    // highlight with condition from userdata
                    if (event.keyCode == 78) { // when 'n' is pressed
                        // Alternatively, to parse a previously loaded JSON structure
                        // var object = this.scene.getObjectByName( "prod1", true);
                        //highlight object with indicator "ProductMovedInd = true" to red,
                        //highlight object with indicator "ProductToBeMovedInd = ture" to pink,
                        //set all other objects to grey

                        //function read currect index

                        //function set indicator according to index
                        this.prod.traverse( function (child) {
                            if (child instanceof THREE.Mesh) {
                                if (child.userData.PackSequence == currentIndex ) {
                                    child.userData.ProductMovedInd = true;
                                } else if (child.userData.PackSequence == ( currentIndex + 1 ) ) {
                                    child.userData.ProductToBeMovedInd = true;
                                } else {
                                    
                                }
                            }
                        });
                        currentIndex = currentIndex + 1;
                        //function set color according to indicator
                        const white = new THREE.Color( 0xffffff );
                        const black = new THREE.Color( 0x000000 );
                        const red = new THREE.Color( 0xff0000 );
                        const green = new THREE.Color( 0x00ff00 );
                        const blue = new THREE.Color( 0x0000ff );
                        let MovedColor = green;
                        let ToMoveColor = red;
                        let OtherColor = white;
                        this.prod.traverse( function (child) {
                            if (child instanceof THREE.Mesh) {
                                if (child.userData.ProductMovedInd == true ) {
                                    child.material.color.set(MovedColor);
                                } else if (child.userData.ProductToBeMovedInd == true ) {
                                    child.material.color.set(ToMoveColor);
                                } else {
                                    child.material.color.set(OtherColor);
                                }
                            }
                        });
                    };
                };
                document.addEventListener('keydown', onKeyDown, false);
            },
            _detectSpeek: function () {
                this._audioWave.setVisible(true);
                this._audioBtn.setVisible(false);
                if (!('webkitSpeechRecognition' in window)) {
                    upgrade();
                } else {
                    console.log("fine for voice control")
                    var recognition = new webkitSpeechRecognition();
                    recognition.continuous = true;
                    recognition.interimResults = true;
                    recognition.continuous = true;
                    recognition.interimResults = true;
                    recognition.lang = 'en-IN';
                    recognition.start();
                    console.log("Audio on")
                    jQuery.sap.delayedCall(25000, this, function () { // this has to be implemented so as the control comes back after 5 seconds
                        recognition.stop();
                        console.log("Audio off delay")
                    });
                    var finalTranscripts = '';
                    var oEvent = oEvent;
                    var that = this;
                    recognition.onresult = function (event) {
                        var interimTranscripts = '';
                        for (var i = event.resultIndex; i < event.results.length; i++) {
                            var transcript = event.results[i][0].transcript;
                            transcript.replace("\n", "<br>");
                            if (event.results[i].isFinal) {
                                finalTranscripts += transcript;
                                console.log(finalTranscripts)
                                console.log("Audio off")
                                MessageToast.show(finalTranscripts)
                            } else {
                                interimTranscripts += transcript;
                                if (interimTranscripts.toUpperCase().includes("NEXT")) {
                                    recognition.stop();
                                    that._audioWave.setVisible(false);
                                    that._audioBtn.setVisible(true);
                                    console.log("Audio off")
                                    console.log(finalTranscripts)
                                    MessageToast.show(finalTranscripts)

                                    //trigger scanning again 
                                    that.onNextProduct();
                                }
                            }
                        }
                    };
                    console.log(finalTranscripts)

                }
            },
            _initScan: async function () {
                this.getView().setModel(this._scanListModel, "scan");

                //https://ssl.scandit.com/dashboard/sdk/projects: for creating a license key
                //var licenseKey = "AelhPGK0Q/QqARqoEztBkSsu6zcXPYf4cHWg1ysy9Q+kZ7oFpSMvK8NfRsWQJV/FYXLjnBcOZEdyHdejuXmAcgF1GcAGJYRq+ldYsHFrGCk9XP5mnG0wVy9b1c0ReclZdDR0iq8Y7xQHJ7cKwAWdGotEhAG+T0EsV3u81M/zRXWNfd41QLz2hYu0Ie/Bl+SkFPd1rA4wI3hOaT3ob9ZWuul0J+KBb++BMV2+kPmyUOK0yahOQeR6rBage01m0FTcDyQSa5GRBoO0aOdb8IN4nikGTvS1in/8RwNlq1e4AiV6MvN/xsT38lNT5jnr83iWPz4Yt8u0WiDrUC5umOl74vW5Nbd4s0x7MINfN15oslgOO7kDfI2EH76xltFIGYYmjFeVquQ+cXa6tcw9JuyAZav3m1hMdICBFOwJheGDlBNNdzyiuBAWc6rzOmzWb4MAJT1fLdRZ5ImWleUFgx3KVA0xD+kCT5Sy/Pl6TpS5vpIJvjJXtA8xgMHHv1Xno/yyPsqNINKOABzyVgTwgqP4lo6eIyJA6Al61tjWIWUgpDp5f1viAGJU8WYX/ub7F5W16JDIhlIX07+C0P+AFNkgyYjzG7QyWXEuQjbLTwUV4iAnWkS2wuhplWb8G0zAREOwGmNzpxTYnaK/blwHlsG30WzfbbvxcuOmLMvAzHoYJj+utoaG1AiQ7d2j/QUATTidJadOD4QIswIIYNZG9i6O5JIC99kPwwXrNKtXvLMm9VAeSDbjMNrB3R5DW0vdUVRMbVm1v3GDZwHhSSyrkhamcbF8vcV81XZgLg62+os7QMtiPUT9dKkCbSlwBKGMivrgiM1ncTao8WW4S2Xc";
                var licenseKey = "AT7yuDbGFMGEA8TRzjw8LJ057dQ1G0VzUEAgasBpXusPQyET/h3kCipln7u0KkMsditlIQJwJCvRfofhZm+uoFx+oWmEFCbDIX6jd9pPA6ijZ/CChEiI2YIZOAscX3S6+yALzC8zn/gKOboQGzMoCyVCdlkaWtPKtkuQVA8icdvVUpo+KwU/SRwyRUB/SGj/1X/USw9kmRcRO5s1cQlB7GBmbSPYf+D+lnHEjv0D9hqaCIxullN0CEN5AekWbc6yKFDR8tEmnVuHQ08qsWjE++hRRh1IW8h2J3yk1QtdnVHMQ++OKUr5ElsxZZKtXCO0fxCeQ+l67tkXTHw2szbmj1Nay+vWXHglSwy2+utW14mmHXh++nPlaIFn31ZOJYHPWkLaqMF5N6VIYS3yUW71fE9CK9MTXVsJcX3RvmZmAM8Sa35PpW+ola1pfPCWDbA6IX4n7IhUY65MZuSZnUNtAIBLREdicv0pzmh5loJsls3IdFtEM3pssls5PIcjPlNnzi3nUECvTd7a/V/7GinYUSyrFBMwb3GtQ0GPcmzGBHBXo143/cJ0ph2V57Z0u8rGSADaI3F1PSyUXTiYAyY1lG95hZKBbeg6Nhf6KcM624Y9cMZREDc9hjlFF+uKRxHfZoRy/CavTXlvVJqxIrToO7W+YKUOiyIkTMDCWGwdFrjEin8FQAqIhuNKhLlDAXd6p0z5h9jiRlsSzAi2YRp4HTLn21cuRzAQGhm8o/MGj+d0q3Ca6v2bcyW1iJF4wdGvza8Ny86bBOQApeYPaXc8VZ0G8MHjZGxpXSC6FCaVGwRPyhgBC26Cl5nRPLGwwkBZzUN32f8ienBrY+1IzM87oc5lwxq4i9ixhcQcwOIP9JqzA3YFPXiksqZkubOEc5k9xtecFemC7IaKx+YkXQOWaevuTrjTZwaM7SNxM+peVvVTrShlJL54xsC142LNVusXsIUq8/VebsF4VDNjecrjvRH6tI2CaSqBsZsgyBoya34rLvwsPEhYfhCaZVc/3VcJ069p/MV7wMBamNKHwVGRwLNC6zUaJU95GIR6d3NuhbSBd2+RCRQ/+A8tXU8PmGGwspCfjgm8hr/RtyX6Q4A2cpTEQ5tuSKmQKlc0tcoaW/cNSFaxeSrlCqle61BnlhSybfT6UR1YnTZUQxLG7A==";
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
                        codeDuplicateFilter: 4000, // Minimum delay between duplicate results
                        maxNumberOfCodesPerFrame: 6,
                        recognitionMode: 'code',
                        gpuAcceleration: true
                    }),
                    playSoundOnScan: true,
                    vibrateOnScan: true,
                    scanningPaused: true,
                    visible: true, // hide the BarcodePicker initially (hidden initialization saves startup time when its used later on)
                });

                //test scanning: 
                this._beginTime = performance.now()

                // set the callback function for scan results of the BarcodePicker
                this.barcodePicker.on("scan", (scanResult) => {
                    //setTimeout(this._scan(scanResult), 5000);
                    this._scan(scanResult); //tjos scan results may contain multiple results at once
                    //TODO: how to control the camera? 
                    // Option 1: set a timeout -> not working, since this is asychronized, this call back function is triggered once the barcodePicker is resumed or started 
                    // Option 2: predefine number of products? -> this could be retrieved from the Outbound Delivery Orders and make it decreased every time 

                });
            },

            _initProdList: function () {
                this.getView().setModel(this._odoProdModel, "odoProd");
                var aProdList = [{
                    "Product": 'PROD-S01',
                    "ProductDesc": "Fast Moving",
                    "ProductQuantity": "1",
                    "ProductUoM": "EA",
                    "ProductBatch": "Batch01"
                }, {
                    "Product": 'PROD-S02',
                    "ProductDesc": "Fast Moving",
                    "ProductQuantity": "1",
                    "ProductUoM": "EA",
                    "ProductBatch": "Batch02"
                }, {
                    "Product": 'PROD-M01',
                    "ProductDesc": "Medium Moving",
                    "ProductQuantity": "1",
                    "ProductUoM": "EA",
                    "ProductBatch": "Batch01"
                }];
                this._odoProdModel.setData(aProdList);
            },

            _scan: function (scanResult) {
                //this happens when Camera initialization or Resume scanning 
                for (var i = 0; i < scanResult.barcodes.length; i++) {
                    var scanRes = scanResult.barcodes[i].data;

                    var scanResultLoc = scanResult.barcodes[i].location;
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
                        var vPackSequence = 0;
                        if (this._reScanFlag) {
                            // for scan resume, pack_sequence shall be not changed for each product, since no oData call happens here, we can get it from buffer: _OldScannedProd
                            var ind = this._OldScannedProd.findIndex(v => v.prod == scanRes);
                            vPackSequence = this._OldScannedProd[ind].pack_sequence;
                        }
                        this._scannedProd.push({
                            "prod": scanRes,
                            //"product_sequence": this._scannedProd.length + 1,
                            product_sequence: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                                var r = Math.random() * 16 | 0,
                                    v = c === "x" ? r : (r & 0x3 | 0x8);
                                return v.toString(16);
                            }),
                            "x": scanResultLoc.topLeft.x * 512 / 1280,
                            "y": scanResultLoc.topLeft.y * 288 / 720,
                            "len": tmpLen,
                            "hei": tmpHei,
                            "pack_sequence": vPackSequence,
                            "movedIndicator": false, //means that this product is already moved and in UI it will be mark as green 
                            "toBePackedInd": false, // means that this product shall be highlighted and packer shall pick this one to the HU
                            "scannedDateTime": new Date().getTime()
                        })
                    }
                }

                if (this._scannedProd.length == this._nrOfProducts) {
                    console.log(this._scannedProd.length);
                    //save the picture in local model. 

                    // pause scanning
                    this.barcodePicker.pauseScanning();
                    this.barcodePicker.setVisible(false);
                    //set camera invisible and canvas visible 
                    this._canvas.setVisible(true);

                    var endTime = performance.now()

                    MessageToast.show("Scanning used: " + ((endTime - this._beginTime) / 1000) + " seconds");

                    //start to call backend oData service for calculation: ZEWM_PBO_SRV
                    // this is to be done by using local JSON Model: _scannedProd
                    if (!this._reScanFlag) {
                        this._callPBO();
                    } else {
                        //after initial call PBO, then we shall rely on voice detection to trigger redraw and we expect for each scan, the total number of products shall be decreased by 1. 
                        this._redrawAfterScanResume(this._OldScannedProd);
                        //this._detectSpeek();
                    }
                } else if (this._scannedProd.length > this._nrOfProducts) {
                    this._scannedProd = []; //clear buffer once the scanned product doesn't match to the expected 
                }
            },

            _callPBO: function () {
                var oModel = this.getView().getModel("ZEWM_PBO_SRV");
                oModel.setDeferredGroups(["myGroupId"]);
                oModel.setChangeGroups({
                    "*": {
                        groupId: "myGroupId"
                    }
                });
                var oPayload;

                this._scannedProd.forEach(function (item) {
                    oPayload = {
                        "ProductSequence": item.product_sequence,
                        "Product": item.prod,
                        "ProductQuantity": "1",
                        "ProductUoM": "EA"
                    };
                    oModel.create("/EWM3DPackSet", oPayload);
                });

                var that = this;

                oModel.submitChanges({
                    groupId: "myGroupId", success: function (res) {
                        console.log("Success")
                        //read entity set: 
                        oModel.read("/EWM3DPackSet", {
                            success: function (res) {
                                console.log("read result success")

                                for (var i = 0; i < res.results.length; i++) {
                                   // find the array index by matching the product number via pack_sequence & prod
                                    var ind = that._scannedProd.findIndex(v => v.prod == res.results[i].Product);
                                    if (ind > -1) {
                                        that._scannedProd[ind].pack_sequence = res.results[i].PackSequence;
                                    }

                                    //initialize two JSON model property ProductMovedInd & ProductToBeMovedInd
                                    if (res.results[i].PackSequence == 1) {
                                        res.results[i].ProductToBeMovedInd = true;
                                        if (ind > -1) {
                                            that._scannedProd[ind].toBePackedInd = true;
                                        }

                                    } else {
                                        res.results[i].ProductToBeMovedInd = false;
                                    }
                                    res.results[i].ProductMovedInd = false;

                                }
                                PackProductsHelper.setModel(res.results);

                                // draw the packing instruction on UI with results returned from oData
                                that._drawPackSequence();
                                that._detectSpeek();


                            },
                            error: function () {
                                console.log("read result failure")
                            }
                        });

                    }, error: function (err) {
                        console.log("Error")
                    }
                });
            },

            onNextProduct: function (oEvent) {
                //decrease the target number of products once we receive the 'Next' voice command
                this._nrOfProducts--;

                //mark next product as highlight and mark the previous one as... 
                //modify the _scannedProduct model to update the product status by trigger another camera shot. 
                this._OldScannedProd = Object.assign([], this._scannedProd);

                //clear buffer -> make sure the new data comes from the new scan 
                this._scannedProd = [];

                /* ********* Scanning re-trigger *******************************************/
                this._reScanFlag = true;
                this._canvas.setVisible(false);
                this.barcodePicker.resumeScanning();
                this.barcodePicker.setVisible(true);

                //logic for camera resume shall happen asyn. 

                this._beginTime = performance.now();


            },

            _redrawAfterScanResume: function () {
                if (this._scannedProd.length == this._OldScannedProd.length) {
                    return; // scanning triggered, while there no product moved -> no change on UI side 
                }
                var that = this;
                //find the missing product by comparing aOldScannedProd with this._scannedProd;
                var aMissingProd = this._OldScannedProd.filter(prod => {
                    return that._scannedProd.findIndex(item => item.prod == prod.prod) < 0;
                });
                //for missing product we shall mark moveIndicator as true; and insert it to the refreshed _scannedProd
                aMissingProd.every(a => {
                    a.movedIndicator = true;
                    a.toBePackedInd = false;
                    //TODO: update PackProducts JSON Model
                    //PackProductsHelper.updateToBeMovedIndicator(a.prod, false);
                });
                //PackProductsHelper.updateMovedIndicator('PROD-3D-PACKING-1', true);
                //also we shall update the PackProducts model for ProductMovedInd as well as ProductToBeMovedInd
                //then find the next product which shall mark as red for packing 
                this._scannedProd = this._scannedProd.sort((a, b) => a.pack_sequence - b.pack_sequence);
                this._scannedProd[0].toBePackedInd = true;
                //PackProductsHelper.updateToBeMovedIndicator(this._scannedProd[0].prod, true);
                this._scannedProd = this._scannedProd.concat(aMissingProd)
                this._drawPackSequence(); // trigger redraw again. 
                this._detectSpeek();
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
                //set camera invisible and canvas visible 
                this._canvas.setVisible(true);
                //this is called when API return results from oData
                //image modifications
                var vid = document.getElementsByTagName("video")[0];
                var canvas = document.getElementById("application-project1-display-component---Initial--myCanvas1");
                var ctx = canvas.getContext("2d");


                ctx.drawImage(vid, 0, 0, 512, 288);
                ctx.strokeStyle = "green";


                //TODO: need to consider the case that barcode is not placed in horizontal or vertical -> /\/\
                //add Packing instructions for each scanned product & draw each scanned product in canvas video
                var _drawedProd = [];
                for (let index = this._scannedProd.length - 1; index > -1; index--) {
                    if (_drawedProd.indexOf(this._scannedProd[index].prod) == -1) {
                        ctx.strokeRect(this._scannedProd[index].x, this._scannedProd[index].y, this._scannedProd[index].len, this._scannedProd[index].hei); // draw barcode highlight with green rect
                        if (this._scannedProd[index].movedIndicator) {
                            ctx.fillStyle = "green";
                        } else if (this._scannedProd[index].toBePackedInd) {
                            ctx.fillStyle = "red";
                        } else {
                            ctx.fillStyle = "yellow";
                        }

                       ctx.fillRect(this._scannedProd[index].x + this._scannedProd[index].len / 2 - 40, this._scannedProd[index].y + this._scannedProd[index].hei + 20 * 288 / 720, 80, 26)
                        if (this._scannedProd[index].movedIndicator) {
                            ctx.fillStyle = "white";
                        } else if (this._scannedProd[index].toBePackedInd) {
                            ctx.fillStyle = "white";
                        } else {
                            ctx.fillStyle = "black";
                        }
                        ctx.font = "20px Georgia";
                        ctx.fillText(this._scannedProd[index].pack_sequence, this._scannedProd[index].x + this._scannedProd[index].len / 2 - 10 * 288 / 720, this._scannedProd[index].y + 20 * 288 / 720 + this._scannedProd[index].hei + 13 + 10 * 288 / 720); //draw yellow rect below with the packing sequence 
                    }
                    _drawedProd.push(this._scannedProd[index].prod)

                }
            },

            onScanInputButton: function () {
                /**********   Pack process start **********/
                /*   
                1, Open camera and hide canvas
                2, Turn on camera for scanning 
                3, reset local JSON model, and reset the target to be scanned products from ODO 
                */
                this._canvas = this.getView().byId("canvasContainer");
                this._canvas.setVisible(false);

                this.barcodePicker.resumeScanning();
                this.barcodePicker.setVisible(true);
                this._beginTime = performance.now();

                //reset model 
                this._scannedProd = [];
                this._scanListModel.setData([]);
                this._nrOfProducts = 4;
                this._reScanFlag = false;
            },

            //retrieve ODO Items 
            onODOInput: function (oEvent) {
                //for test: 310001688392
                var vODONumber = oEvent.getSource().getValue();
                var oFilters = [];
                if(!vODONumber) {
                    return;
                }
                var oResultTable = this.getView().byId("scanResultVBox");
                oResultTable.setBusy(true);
                oFilters.push(new Filter(
                    "OutboundDelivery",
                    FilterOperator.EQ,
					vODONumber
                ));
                var that = this;
                var oModel = this.getView().getModel();
                oModel.read("/DLVItemSet", {
                    filters: oFilters,
                    /*parameters: {
                        select: "Batch,Product,OutboundDelivery,OutboundDeliveryItem,Entitled,ItemDeliveryQuantity,ItemDeliveryQuantityUnit"
                    },*/ //still not working with the select parameters 
                    success: function (odata) {
                        //odata.results
                        ODOModelHelper.setModel(odata.results);
                        that._odoProdModel.setData(ODOModelHelper.getModel().getData());
                        oResultTable.setBusy(false);
                    }, 
                    error: function (err) {
                        oResultTable.setBusy(false);
                    }
                } )
            },

            /********** End of Left side Screen for Scanning Logic *********************/
/* -------------------------------------------------Kimi--------------------------------------------------------------*/

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
                }
            },
        });
    });
