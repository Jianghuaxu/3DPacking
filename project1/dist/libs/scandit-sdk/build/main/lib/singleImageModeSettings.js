"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.SingleImageModeSettings=void 0;var base64assets_1=require("./assets/base64assets");var SingleImageModeSettings;(function(e){function t(e,t){return{informationElement:document.createRange().createContextualFragment(e).firstElementChild,buttonElement:document.createRange().createContextualFragment(atob(t)).firstElementChild,containerStyle:{backgroundColor:"#333333"},informationStyle:{color:"#FFFFFF"},buttonStyle:{borderColor:"#FFFFFF",color:"#FFFFFF",fill:"#FFFFFF"}}}var a;(function(e){e["NEVER"]="never";e["FALLBACK"]="fallback";e["ALWAYS"]="always"})(a=e.UsageStrategy||(e.UsageStrategy={}));e.defaultDesktop=t("<p>To scan:<br>1. Click on the folder icon<br>2. Select the picture to scan</p>",base64assets_1.folderImage);e.defaultMobile=t("<p>To scan:<br>1. Tap the camera icon<br>2. Take a picture of the code(s)</p>",base64assets_1.cameraImage)})(SingleImageModeSettings=exports.SingleImageModeSettings||(exports.SingleImageModeSettings={}));