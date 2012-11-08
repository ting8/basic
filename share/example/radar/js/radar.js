topSelect();
topSearch();


function topSelect() {
	if (!$('search_items')){return false;}
	var top_select = Select2DivClass();
		top_select.target = $('search_items');
		top_select.widthDiff = -6;
		top_select.toggle = function(){
			var wrapper = top_select.dom.wrapper;
			if(wrapper.className.indexOf(top_select.wrapperOpenClassName)>-1){
				wrapper.className = wrapper.className.replace(top_select.wrapperOpenClassName,"");
			}else{
				wrapper.className += ' ' + top_select.wrapperOpenClassName;
			}	
		};
		top_select.clickHandler = function(eventTarget){
			top_select.dom.selectedNode = eventTarget;
			top_select.feedback(); 
			top_select.toggle();
	
			if (top_select.getSelectedData().text=="¸èÃÔ"){ 
				window.open(top_select.getSelectedData().value);
				return false;
			}
		};
		top_select.init();
}
function topSearch(){
	var search_btn = document.getElementById("wb_submit");
	if (!search_btn){return false}
	search_btn.onclick = function(){
		var url = "http://cso.myspace.cn/search/";
		var obj = document.getElementById("wb_kw");
		var sel = document.getElementById("search_items");
		var range;
		if(sel.value.length==0 || (sel.value.indexOf("http://")>-1)){
			range = "searchall.php?";	
		}else {
			range = sel.value;	
		}
		var kwword = encodeURIComponent(obj.value);
		window.open([url,range,'kw=',kwword].join(""));
		return false;
	}
}