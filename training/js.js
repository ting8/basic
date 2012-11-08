function BHide(id){var Div = document.getElementById(id);if(Div){Div.style.display="none"}}
function BShow(id){var Div = document.getElementById(id);if(Div){Div.style.display="block"}}
function BGet(id){if(document.getElementById(id)){return document.getElementById(id)}}
function BtTabRemove(index,head,divs) {
	var tab_heads = document.getElementById(head);
	if (tab_heads) {
	var as = tab_heads.getElementsByTagName("a");
	for(var i=0;i<as.length;i++){as[i].className = "";BHide(divs+"_"+i);if (i==index) {as[i].className = "current";}}
	setTimeout(function(){BShow(divs+"_"+index)},100)
	}
}

function BtTabOn(head,divs){
	var tab_heads=document.getElementById(head);
	if (tab_heads) {
	BtTabRemove(0,head,divs);
	var alis=tab_heads.getElementsByTagName("a");
	for(var i=0;i<alis.length;i++) {
		alis[i].num=i;
		alis[i].onclick = function(){BtTabRemove(this.num,head,divs);return false;}
		alis[i].onfocus = function(){BtTabRemove(this.num,head,divs)}}}
}

BtTabOn("guidemap","s");