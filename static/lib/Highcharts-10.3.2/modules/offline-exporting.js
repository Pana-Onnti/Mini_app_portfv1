/*
 Highcharts JS v10.3.2 (2022-11-28)

 Client side exporting module

 (c) 2015-2021 Torstein Honsi / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/offline-exporting",["highcharts","highcharts/modules/exporting"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,k,b,e){a.hasOwnProperty(k)||(a[k]=e.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:k,
module:a[k]}})))}a=a?a._modules:{};e(a,"Extensions/DownloadURL.js",[a["Core/Globals.js"]],function(a){var k=a.isSafari,b=a.win,e=b.document,m=b.URL||b.webkitURL||b,q=a.dataURLtoBlob=function(a){if((a=a.replace(/filename=.*;/,"").match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/))&&3<a.length&&b.atob&&b.ArrayBuffer&&b.Uint8Array&&b.Blob&&m.createObjectURL){var u=b.atob(a[3]),f=new b.ArrayBuffer(u.length);f=new b.Uint8Array(f);for(var n=0;n<f.length;++n)f[n]=u.charCodeAt(n);a=new b.Blob([f],{type:a[1]});
return m.createObjectURL(a)}};a=a.downloadURL=function(a,m){var f=b.navigator,n=e.createElement("a");if("string"===typeof a||a instanceof String||!f.msSaveOrOpenBlob){a="".concat(a);f=/Edge\/\d+/.test(f.userAgent);if(k&&"string"===typeof a&&0===a.indexOf("data:application/pdf")||f||2E6<a.length)if(a=q(a)||"",!a)throw Error("Failed to convert to blob");if("undefined"!==typeof n.download)n.href=a,n.download=m,e.body.appendChild(n),n.click(),e.body.removeChild(n);else try{var z=b.open(a,"chart");if("undefined"===
typeof z||null===z)throw Error("Failed to open window");}catch(h){b.location.href=a}}else f.msSaveOrOpenBlob(a,m)};return{dataURLtoBlob:q,downloadURL:a}});e(a,"Extensions/OfflineExporting/OfflineExportingDefaults.js",[],function(){return{libURL:"https://code.highcharts.com/10.3.2/lib/",menuItemDefinitions:{downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChartLocal()}},downloadJPEG:{textKey:"downloadJPEG",onclick:function(){this.exportChartLocal({type:"image/jpeg"})}},downloadSVG:{textKey:"downloadSVG",
onclick:function(){this.exportChartLocal({type:"image/svg+xml"})}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChartLocal({type:"application/pdf"})}}}}});e(a,"Extensions/OfflineExporting/OfflineExporting.js",[a["Core/Renderer/HTML/AST.js"],a["Core/Chart/Chart.js"],a["Core/Defaults.js"],a["Extensions/DownloadURL.js"],a["Extensions/Exporting/Exporting.js"],a["Core/Globals.js"],a["Core/HttpUtilities.js"],a["Extensions/OfflineExporting/OfflineExportingDefaults.js"],a["Core/Utilities.js"]],
function(a,e,b,G,C,q,u,H,f){var n=b.defaultOptions,k=G.downloadURL,h=q.win,m=q.doc,I=u.ajax,J=f.addEvent,A=f.error,K=f.extend,L=f.fireEvent,B=f.merge;a.allowedAttributes.push("data-z-index","fill-opacity","rx","ry","stroke-dasharray","stroke-linejoin","text-anchor","transform","version","viewBox","visibility","xmlns","xmlns:xlink");a.allowedTags.push("desc","clippath","g");var F=[],x;(function(b){function f(a,g){var c=this,d=B(c.options.exporting,a),t=function(a){!1===d.fallbackToExportServer?d.error?
d.error(d,a):A(28,!0):c.exportChart(d)};a=function(){return[].some.call(c.container.getElementsByTagName("image"),function(a){a=a.getAttribute("href");return""!==a&&"string"===typeof a&&0!==a.indexOf("data:")})};q.isMS&&c.styledMode&&!C.inlineAllowlist.length&&C.inlineAllowlist.push(/^blockSize/,/^border/,/^caretColor/,/^color/,/^columnRule/,/^columnRuleColor/,/^cssFloat/,/^cursor/,/^fill$/,/^fillOpacity/,/^font/,/^inlineSize/,/^length/,/^lineHeight/,/^opacity/,/^outline/,/^parentRule/,/^rx$/,/^ry$/,
/^stroke/,/^textAlign/,/^textAnchor/,/^textDecoration/,/^transform/,/^vectorEffect/,/^visibility/,/^x$/,/^y$/);q.isMS&&("application/pdf"===d.type||c.container.getElementsByTagName("image").length&&"image/svg+xml"!==d.type)||"application/pdf"===d.type&&a()?t(Error("Image type not supported for this chart/browser.")):c.getSVGForLocalExport(d,g||{},t,function(a){-1<a.indexOf("<foreignObject")&&"image/svg+xml"!==d.type&&(q.isMS||"application/pdf"===d.type)?t(Error("Image type not supported for charts with embedded HTML")):
b.downloadSVGLocal(a,K({filename:c.getFilename()},d),t,function(){return L(c,"exportChartLocalSuccess")})})}function e(a,g){var c=m.getElementsByTagName("head")[0],d=m.createElement("script");d.type="text/javascript";d.src=a;d.onload=g;d.onerror=function(){A("Error loading script "+a)};c.appendChild(d)}function u(a,g,r,d){var c=this,e=function(){p&&k===m&&d(c.sanitizeSVG(h.innerHTML,l))},f=function(a,c,d){++k;d.imageElement.setAttributeNS("http://www.w3.org/1999/xlink","href",a);e()},h,l,y=null,p,
m=0,k=0;c.unbindGetSVG=J(c,"getSVG",function(a){l=a.chartCopy.options;p=(h=a.chartCopy.container.cloneNode(!0))&&h.getElementsByTagName("image")||[];m=p.length});c.getSVGForExport(a,g);try{if(!p||!p.length){d(c.sanitizeSVG(h.innerHTML,l));return}for(g=0;g<p.length;g++){var w=p[g];(y=w.getAttributeNS("http://www.w3.org/1999/xlink","href"))?b.imageToDataUrl(y,"image/png",{imageElement:w},a.scale,f,r,r,r):(k++,w.parentNode.removeChild(w),g--,e())}}catch(v){r(v)}c.unbindGetSVG()}function x(a,g,e,d,f,
k,n,M,l){var c=new h.Image,p=function(){setTimeout(function(){var b=m.createElement("canvas"),h=b.getContext&&b.getContext("2d");try{if(h){b.height=c.height*d;b.width=c.width*d;h.drawImage(c,0,0,b.width,b.height);try{var k=b.toDataURL(g);f(k,g,e,d)}catch(D){t(a,g,e,d)}}else n(a,g,e,d)}finally{l&&l(a,g,e,d)}},b.loadEventDeferDelay)},r=function(){M(a,g,e,d);l&&l(a,g,e,d)};var t=function(){c=new h.Image;t=k;c.crossOrigin="Anonymous";c.onload=p;c.onerror=r;c.src=a};c.onload=p;c.onerror=r;c.src=a}function E(a){var c=
h.navigator.userAgent;c=-1<c.indexOf("WebKit")&&0>c.indexOf("Chrome");try{if(!c&&-1===a.indexOf("<foreignObject"))return b.domurl.createObjectURL(new h.Blob([a],{type:"image/svg+xml;charset-utf-16"}))}catch(r){}return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(a)}function z(a,b,e){var c=Number(a.getAttribute("width"))+2*b;b=Number(a.getAttribute("height"))+2*b;var g=new h.jspdf.jsPDF(b>c?"p":"l","pt",[c,b]);[].forEach.call(a.querySelectorAll('*[visibility="hidden"]'),function(a){a.parentNode.removeChild(a)});
for(var f=a.querySelectorAll("linearGradient"),k=0;k<f.length;k++)for(var m=f[k].querySelectorAll("stop"),l=0;l<m.length&&"0"===m[l].getAttribute("offset")&&"0"===m[l+1].getAttribute("offset");)m[l].remove(),l++;[].forEach.call(a.querySelectorAll("tspan"),function(a){"\u200b"===a.textContent&&(a.textContent=" ",a.setAttribute("dx",-5))});g.svg(a,{x:0,y:0,width:c,height:b,removeInvalid:!0}).then(function(){return e(g.output("datauristring"))})}b.CanVGRenderer={};b.domurl=h.URL||h.webkitURL||h;b.loadEventDeferDelay=
q.isMS?150:0;b.compose=function(a){if(-1===F.indexOf(a)){F.push(a);var b=a.prototype;b.getSVGForLocalExport=u;b.exportChartLocal=f;B(!0,n.exporting,H)}return a};b.downloadSVGLocal=function(c,g,f,d){var t=m.createElement("div"),q=g.type||"image/png",r=(g.filename||"chart")+"."+("image/svg+xml"===q?"svg":q.split("/")[1]),u=g.scale||1,l=g.libURL||n.exporting.libURL,y=!0,p=g.pdfFont;l="/"!==l.slice(-1)?l+"/":l;var C=function(a,b){var c=function(a,b){h.jspdf.jsPDF.API.events.push(["initialized",function(){this.addFileToVFS(a,
b);this.addFont(a,"HighchartsFont",a);this.getFontList().HighchartsFont||this.setFont("HighchartsFont")}])};p&&!/[^\u0000-\u007F\u200B]+/.test(a.textContent||"")&&(p=void 0);var d=["normal","italic","bold","bolditalic"],f,e=function(){var a=d.shift();if(!a)return b();var g=p&&p[a];g?I({url:g,responseType:"blob",success:function(b,d){b=new FileReader;b.onloadend=function(){if("string"===typeof this.result){var b=this.result.split(",")[1];c(a,b);"normal"===a&&(f=b)}e()};b.readAsDataURL(d.response)},
error:e}):(f&&c(a,f),e())};e()},A=function(){a.setElementHTML(t,c);var b=t.getElementsByTagName("text"),e;[].forEach.call(b,function(a){["font-family","font-size"].forEach(function(b){for(var c=a;c&&c!==t;){if(c.style[b]){a.style[b]=c.style[b];break}c=c.parentNode}});a.style.fontFamily=p&&p.normal?"HighchartsFont":String(a.style.fontFamily&&a.style.fontFamily.split(" ").splice(-1));e=a.getElementsByTagName("title");[].forEach.call(e,function(b){a.removeChild(b)})});var g=t.querySelector("svg");g&&
C(g,function(){z(g,0,function(a){try{k(a,r),d&&d()}catch(O){f(O)}})})};if("image/svg+xml"===q)try{if("undefined"!==typeof h.navigator.msSaveOrOpenBlob){var w=new MSBlobBuilder;w.append(c);var v=w.getBlob("image/svg+xml")}else v=E(c);k(v,r);d&&d()}catch(D){f(D)}else if("application/pdf"===q)h.jspdf&&h.jspdf.jsPDF?A():(y=!0,e(l+"jspdf.js",function(){e(l+"svg2pdf.js",A)}));else{v=E(c);var B=function(){try{b.domurl.revokeObjectURL(v)}catch(D){}};x(v,q,{},u,function(a){try{k(a,r),d&&d()}catch(N){f(N)}},
function(){var a=m.createElement("canvas"),b=a.getContext("2d"),g=c.match(/^<svg[^>]*width\s*=\s*"?(\d+)"?[^>]*>/)[1]*u,p=c.match(/^<svg[^>]*height\s*=\s*"?(\d+)"?[^>]*>/)[1]*u,n=function(){h.canvg.Canvg.fromString(b,c).start();try{k(h.navigator.msSaveOrOpenBlob?a.msToBlob():a.toDataURL(q),r),d&&d()}catch(P){f(P)}finally{B()}};a.width=g;a.height=p;h.canvg?n():(y=!0,e(l+"canvg.js",function(){n()}))},f,f,function(){y&&B()})}};b.getScript=e;b.imageToDataUrl=x;b.svgToDataUrl=E;b.svgToPdf=z})(x||(x={}));
return x});e(a,"masters/modules/offline-exporting.src.js",[a["Core/Globals.js"],a["Extensions/OfflineExporting/OfflineExporting.js"]],function(a,e){a.downloadSVGLocal=e.downloadSVGLocal;e.compose(a.Chart)})});
//# sourceMappingURL=offline-exporting.js.map