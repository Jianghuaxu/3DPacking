export class TextRecognitionSettings{properties;recognizer;regex;characterWhitelist;textDuplicateFilter;constructor({recognizer:t="mrzFullScreen",regex:e,characterWhitelist:r,textDuplicateFilter:i=0}={}){this.recognizer=t;this.regex=e instanceof RegExp?e.source:e;this.characterWhitelist=r;this.textDuplicateFilter=i;this.properties=new Map}toJSONString(){const t={};this.properties.forEach((e,r)=>{t[r]=e});return JSON.stringify({recognizer:this.recognizer,regex:this.regex,characterWhitelist:this.characterWhitelist,duplicateFilter:this.textDuplicateFilter,properties:t})}getRegex(){return this.regex}setRegex(t){this.regex=t instanceof RegExp?t.source:t;return this}getCharacterWhitelist(){return this.characterWhitelist}setCharacterWhitelist(t){this.characterWhitelist=t;return this}getTextDuplicateFilter(){return this.textDuplicateFilter}setTextDuplicateFilter(t){this.textDuplicateFilter=t;return this}getProperty(t){if(this.properties.has(t)){return this.properties.get(t)}return-1}setProperty(t,e){this.properties.set(t,e);return this}}