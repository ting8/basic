var heFuncs = {
	$ : function(id){
			return document.getElementById(id);
		},
	classAdd : function(obj,_class){
			if (obj.className.indexOf(_class)<0){
				obj.className += " " + _class;
			}
		},
	classRemove : function(obj,_class){
			obj.className = obj.className.replace(_class,"");
		},
	trim : {
		left : function(str){
			return str.replace( /^\s*/, '');
		},
		right : function(str){
			return str.replace(/(\s*$)/g, "");
		},
		both : function(str){
			return str.replace(/^\s+|\s+$/g,"");
		},
		alls : function(str){
			return str.replace(/\s+/g,"");
		}
	},	
	check : { 
		isExsit : function(str){
			return ((str + ' ').length > 1);
		},
		isNumber : function(str){
			var type = /^\d+$/;
			return type.test(str);	   
		},
		isUrl : function(str){
			 var type = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
			 return type.test(str);
		}
	},
	substitute : function(template, data, regexp){
		if(!(Object.prototype.toString.call(data) === "[object Array]")){
			data = [data]
		}
		var ret = [];
		for(var i=0,j=data.length;i<j;i++){
			ret.push(replaceAction(data[i]));
		}
		return ret.join("");
		
		function replaceAction(object){
			return template.replace(regexp || (/\\?\{([^}]+)\}/g), function(match, name){
			if (match.charAt(0) == '\\') return match.slice(1);
			return (object[name] != undefined) ? object[name] : '';
			});
		}
	}	
}

function run(){
	eval(heFuncs.$("jsCode").value)
}
function runcss(){
	var obj = heFuncs.$("cssMod");
		obj.innerHTML = heFuncs.$("jsCode").value;
}
function runstyle(){
	var obj = heFuncs.$("cssMod");
		obj.innerHTML = heFuncs.$("cssCode").value;
}
function runhtml(){
	var obj = heFuncs.$("content");
		obj.innerHTML = heFuncs.$("jsCode").value;		
}
window.onload = function(){
	var newA = document.createElement("a");
		newA.href = "/index.html";
		newA.innerHTML = "Back to Menu";
		newA.style.cssText = "position:fixed;right:20px;top:20px;font-family:verdana;font-size:20px;";
	document.getElementsByTagName("body")[0].appendChild(newA);	
}