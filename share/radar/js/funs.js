function substitute(template, data, regexp){
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
function insertAfter(newElement,targetElement) {   
	var parent = targetElement.parentNode;   
	if (parent.lastChild == targetElement) {   
		parent.appendChild(newElement);   
	} else {   
		parent.insertBefore(newElement,targetElement.nextSibling);   
	}
}