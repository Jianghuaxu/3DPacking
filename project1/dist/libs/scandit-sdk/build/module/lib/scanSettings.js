import{textRecognition}from"..";import{Barcode}from"./barcode";import{Logger}from"./logger";import{SymbologySettings}from"./symbologySettings";import{TextRecognitionSettings}from"./textRecognitionSettings";export class ScanSettings{symbologySettings;properties;textRecognitionSettings;recognitionMode;codeDuplicateFilter;maxNumberOfCodesPerFrame;baseSearchArea;searchArea;gpuAcceleration;blurryRecognition;codeDirectionHint;deviceName;constructor({textRecognitionSettings:e=new TextRecognitionSettings,recognitionMode:t=ScanSettings.RecognitionMode.CODE,enabledSymbologies:i=[],codeDuplicateFilter:o=0,maxNumberOfCodesPerFrame:r=1,searchArea:n={x:0,y:0,width:1,height:1},gpuAcceleration:s=true,blurryRecognition:a=true,codeDirectionHint:g=ScanSettings.CodeDirection.LEFT_TO_RIGHT,deviceName:c}={}){this.symbologySettings=new Map;this.textRecognitionSettings=e;this.setRecognitionMode(t);this.enableSymbologies(i);this.codeDuplicateFilter=o;this.maxNumberOfCodesPerFrame=r;this.baseSearchArea={x:0,y:0,width:1,height:1};this.searchArea=n;this.gpuAcceleration=s;this.blurryRecognition=a;this.codeDirectionHint=g;this.deviceName=c;this.properties=new Map([["advanced_localization",0]])}toJSONString(){const e={};this.symbologySettings.forEach((t,i)=>{e[Barcode.Symbology.toJSONName(i)]=t});const t={};this.properties.forEach((e,i)=>{t[i]=e});const i={x:Math.max(0,Math.min(1,this.baseSearchArea.x+this.searchArea.x*this.baseSearchArea.width)),y:Math.max(0,Math.min(1,this.baseSearchArea.y+this.searchArea.y*this.baseSearchArea.height)),width:Math.max(0,Math.min(1,this.baseSearchArea.width*this.searchArea.width)),height:Math.max(0,Math.min(1,this.baseSearchArea.height*this.searchArea.height))};const o=Math.round(i.x*100)===0&&Math.round(i.y*100)===0&&Math.round(i.width*100)===100&&Math.round(i.height*100)===100;return JSON.stringify({textRecognitionSettings:this.textRecognitionSettings.toJSONString(),recognitionMode:this.recognitionMode,symbologies:e,codeDuplicateFilter:this.codeDuplicateFilter,maxNumberOfCodesPerFrame:this.maxNumberOfCodesPerFrame,searchArea:i,codeLocation1d:o?undefined:{area:{x:i.x,y:i.y+i.height*.75/2,width:i.width,height:i.height*.25}},codeLocation2d:o?undefined:{area:i},gpuAcceleration:this.gpuAcceleration,blurryRecognition:this.blurryRecognition,codeDirectionHint:this.codeDirectionHint,properties:t})}getTextRecognitionSettings(){return this.textRecognitionSettings}setTextRecognitionSettings(e){this.textRecognitionSettings=e;return this}getRecognitionMode(){return this.recognitionMode}setRecognitionMode(e){this.recognitionMode=e;if(e.includes("text")&&!textRecognition){Logger.log(Logger.Level.WARN,"The library has not been configured to load text recognition (ScanditSDK.configure() - loadTextRecognition option): ScanSettings' recognition mode for text will be ignored")}return this}getSymbologySettings(e){if(this.symbologySettings.has(e)){return this.symbologySettings.get(e)}else{if(e in Barcode.Symbology||Object.values(Barcode.Symbology).includes(e)){this.symbologySettings.set(e,new SymbologySettings(e));return this.symbologySettings.get(e)}else{throw new TypeError(`Invalid symbology "${e}"`)}}}isSymbologyEnabled(e){return this.symbologySettings.has(e)&&this.symbologySettings.get(e).isEnabled()}enableSymbologies(e){return this.setSymbologiesEnabled(e,true)}disableSymbologies(e){return this.setSymbologiesEnabled(e,false)}getCodeDuplicateFilter(){return this.codeDuplicateFilter}setCodeDuplicateFilter(e){this.codeDuplicateFilter=e;return this}getMaxNumberOfCodesPerFrame(){return this.maxNumberOfCodesPerFrame}setMaxNumberOfCodesPerFrame(e){this.maxNumberOfCodesPerFrame=e;return this}getSearchArea(){return this.searchArea}setSearchArea(e){this.searchArea=e;return this}getBaseSearchArea(){return this.baseSearchArea}setBaseSearchArea(e){this.baseSearchArea=e;return this}isGpuAccelerationEnabled(){return this.gpuAcceleration}setGpuAccelerationEnabled(e){this.gpuAcceleration=e;return this}isBlurryRecognitionEnabled(){return this.blurryRecognition}setBlurryRecognitionEnabled(e){this.blurryRecognition=e;return this}getCodeDirectionHint(){return this.codeDirectionHint}setCodeDirectionHint(e){this.codeDirectionHint=e;return this}getDeviceName(){return this.deviceName}setDeviceName(e){this.deviceName=e;return this}getProperty(e){if(this.properties.has(e)){return this.properties.get(e)}return-1}setProperty(e,t){this.properties.set(e,t);return this}setSingleSymbologyEnabled(e,t){if(e in Barcode.Symbology||Object.values(Barcode.Symbology).includes(e)){if(this.symbologySettings.has(e)){this.symbologySettings.get(e).setEnabled(t)}else{this.symbologySettings.set(e,new SymbologySettings(e,t))}}else{throw new TypeError(`Invalid symbology "${e}"`)}}setMultipleSymbologiesEnabled(e,t){for(const t of e){if(!(t in Barcode.Symbology||Object.values(Barcode.Symbology).includes(t))){throw new TypeError(`Invalid symbology "${t}"`)}}for(const i of e){if(this.symbologySettings.has(i)){this.symbologySettings.get(i).setEnabled(t)}else{this.symbologySettings.set(i,new SymbologySettings(i,t))}}}setSymbologiesEnabled(e,t){if(typeof e==="object"){this.setMultipleSymbologiesEnabled(e,t)}else{this.setSingleSymbologyEnabled(e,t)}return this}}(function(e){let t;(function(e){e["CODE"]="code";e["TEXT"]="text";e["CODE_AND_TEXT"]="code-and-text"})(t=e.RecognitionMode||(e.RecognitionMode={}));let i;(function(e){e["LEFT_TO_RIGHT"]="left-to-right";e["RIGHT_TO_LEFT"]="right-to-left";e["BOTTOM_TO_TOP"]="bottom-to-top";e["TOP_TO_BOTTOM"]="top-to-bottom";e["HORIZONTAL"]="horizontal";e["VERTICAL"]="vertical";e["NONE"]="none"})(i=e.CodeDirection||(e.CodeDirection={}))})(ScanSettings||(ScanSettings={}));