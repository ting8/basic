if(typeof deconcept=="undefined"){var deconcept={}}
if(typeof deconcept.util=="undefined"){deconcept.util={}}
if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil={}}
deconcept.SWFObject=function(l,o,x,Z,C,z,v,O,i,I,c){var w=this;if(!document.getElementById){return}
w.DETECT_KEY=c?c:"detectflash";w.skipDetect=deconcept.util.getRequestParameter(w.DETECT_KEY);w.params={};w.variables={};w.attributes=[];if(l){w.setAttribute("swf",l)}
if(o){w.setAttribute("id",o)}
if(x){w.setAttribute("width",x)}
if(Z){w.setAttribute("height",Z)}
if(C){w.setAttribute("version",new deconcept.PlayerVersion(C.toString().split(".")))}
w.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(z){w.addParam("bgcolor",z)}
var X=O?O:"high";w.addParam("quality",X);w.setAttribute("useExpressInstall",v);w.setAttribute("doExpressInstall",false);var V=(i)?i:window.location;w.setAttribute("xiRedirectUrl",V);w.setAttribute("redirectUrl","");if(I){w.setAttribute("redirectUrl",I)}};deconcept.SWFObject.prototype={setAttribute:function(i,I){this.attributes[i]=I},getAttribute:function(i){return this.attributes[i]},addParam:function(i,I){this.params[i]=I},getParams:function(){return this.params},addVariable:function(i,I){this.variables[i]=I},getVariable:function(i){return this.variables[i]},getVariables:function(){return this.variables},getVariablePairs:function(){var I=[];var i,l=this.getVariables();for(i in l){I.push(i+"="+l[i])}
return I},getSWFHTML:function(){var C=this,i="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(C.getAttribute("doExpressInstall")){C.addVariable("MMplayerType","PlugIn")}
i="<embed type=\"application/x-shockwave-flash\" src=\""+C.getAttribute("swf")+"\" width=\""+C.getAttribute("width")+"\" height=\""+C.getAttribute("height")+"\"";i+=" id=\""+C.getAttribute("id")+"\" name=\""+C.getAttribute("id")+"\" ";var o=C.getParams();for(var I in o){i+=[I]+"=\""+o[I]+"\" "}
var l=C.getVariablePairs().join("&");if(l.length>0){i+="flashvars=\""+l+"\""}i+="/>"}else{if(C.getAttribute("doExpressInstall")){C.addVariable("MMplayerType","ActiveX")}
i="<object id=\""+C.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+C.getAttribute("width")+"\" height=\""+C.getAttribute("height")+"\">";i+="<param name=\"movie\" value=\""+C.getAttribute("swf")+"\" />";var O=C.getParams();for(var I in O){i+="<param name=\""+I+"\" value=\""+O[I]+"\" />"}
var c=C.getVariablePairs().join("&");if(c.length>0){i+="<param name=\"flashvars\" value=\""+c+"\" />"}i+="</object>"}
return i},write:function(i){var o=this;if(o.getAttribute("useExpressInstall")){var I=new deconcept.PlayerVersion([6,0,65]);if(o.installedVer.versionIsValid(I)&&!o.installedVer.versionIsValid(o.getAttribute("version"))){o.setAttribute("doExpressInstall",true);o.addVariable("MMredirectURL",escape(o.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";o.addVariable("MMdoctitle",document.title)}}
if(o.skipDetect||o.getAttribute("doExpressInstall")||o.installedVer.versionIsValid(o.getAttribute("version"))){var l=(typeof i=="string")?document.getElementById(i):i;l.innerHTML=o.getSWFHTML();return true}else{if(o.getAttribute("redirectUrl")!=""){document.location.replace(o.getAttribute("redirectUrl"))}}
return false}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var i=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var l=navigator.plugins["Shockwave Flash"];if(l&&l.description){i=new deconcept.PlayerVersion(l.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."))}}else{try{var I=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}
catch(e){try{var I=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");i=new deconcept.PlayerVersion([6,0,21]);I.AllowScriptAccess="always"}
catch(e){if(i.major==6){return i}}try{I=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}
catch(e){}}if(I!=null){i=new deconcept.PlayerVersion(I.GetVariable("$version").split(" ")[1].split(","))}}
return i};deconcept.PlayerVersion=function(i){var I=this;I.major=i[0]!=null?parseInt(i[0]):0;I.minor=i[1]!=null?parseInt(i[1]):0;I.rev=i[2]!=null?parseInt(i[2]):0};deconcept.PlayerVersion.prototype.versionIsValid=function(i){var I=this;if(I.major<i.major){return false}
if(I.major>i.major){return true}
if(I.minor<i.minor){return false}
if(I.minor>i.minor){return true}
if(I.rev<i.rev){return false}return true};deconcept.util={getRequestParameter:function(I){var o=document.location.search||document.location.hash;if(o){var i=o.substring(1).split("&");for(var l=0;l<i.length;l++){if(i[l].substring(0,i[l].indexOf("="))==I){return i[l].substring((i[l].indexOf("=")+1))}}}
return ""}};deconcept.SWFObjectUtil.cleanupSWFs=function(){if(window.opera||!document.all){return}
var i=document.getElementsByTagName("OBJECT");for(var I=0;I<i.length;I++){i[I].style.display="none";for(var l in i[I]){if(typeof i[I][l]=="function"){i[I][l]=function(){}}}}};deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};if(typeof window.onunload=="function"){var i=window.onunload;window.onunload=function(){deconcept.SWFObjectUtil.cleanupSWFs();i()}}else{window.onunload=deconcept.SWFObjectUtil.cleanupSWFs}};if(typeof window.onbeforeunload=="function"){var oldBeforeUnload=window.onbeforeunload;window.onbeforeunload=function(){deconcept.SWFObjectUtil.prepUnload();oldBeforeUnload()}}else{window.onbeforeunload=deconcept.SWFObjectUtil.prepUnload}
if(Array.prototype.push==null){Array.prototype.push=function(i){var I=this;I[I.length]=i;return I.length}}
var getQueryParamValue=deconcept.util.getRequestParameter,FlashObject=deconcept.SWFObject,SWFObject=deconcept.SWFObject;