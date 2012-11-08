function PopOutCommon(html,options){
	if (!options) {options = {};}
	this.width = options.width || '500px';
	this.height = options.height || 'auto';
	this.mask = options.mask || false;
	this.diff = options.diff || '200px';
	this.position = options.position || 'abs';
	this.relObj = options.relObj || document.getElementsByTagName("body")[0];
	this.id = options.id || '';
	this.PopId = this.id + 'PopOutDiv';
	this.PopMaskDiv = this.id + 'CommonPopMaskDiv';
	this.PopMaskIframe = this.id + 'CommonPopMaskIframe';
	this.PopContent = this.id + 'cmn_pop_out_content';
	this.befClose = options.befClose || '';
	this.temp = ['<table class="cmn_pop_out">',
				'<tr><td class="cmn_pop_out_lt"></td><td class="cmn_pop_out_bg"></td><td class="cmn_pop_out_rt"></td></tr>',
				'<tr><td class="cmn_pop_out_bg"></td>',
				'<td class="cmn_pop_out_content"><div id="',this.PopContent,'">',
					html,
				'</div></td>',
				'<td class="cmn_pop_out_bg"></td></tr>',
				'<tr><td class="cmn_pop_out_lb"></td><td class="cmn_pop_out_bg"></td><td class="cmn_pop_out_rb"></td></tr>',
				'</table>'].join("");
}
PopOutCommon.prototype.init = function(){
	this.DivClose();
	div = document.createElement("div");
	div.id = this.PopId;
	document.getElementsByTagName("body")[0].appendChild(div);
	div.innerHTML = this.temp;
	this.HeightFix();
	var obj = document.getElementById(this.PopId);
	obj.style.cssText = "display:block;position:absolute;z-index:225";
	
	var leftP,topP;
	if (this.position == "relative"){
		topP = getPositon(this.relObj).y + 'px';
		leftP = getPositon(this.relObj).x + 'px';
	}else{
		topP = (document.documentElement.scrollTop+document.body.scrollTop+document.documentElement.clientHeight/2-obj.offsetHeight/2)+ 'px';
		leftP = (document.documentElement.clientWidth/2-obj.offsetWidth/2) + 'px';
	}
	obj.style.top = topP;
	obj.style.left = leftP;
	
	if (this.mask){
		this.PopMask();
	}
}
PopOutCommon.prototype.PopMask = function(){
	var h = Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight) + 'px';
	var w = document.documentElement.scrollWidth + 'px';
	
	pop_Box = document.createElement("div");
	pop_Box.id = this.PopMaskDiv;
	document.getElementsByTagName("body")[0].appendChild(pop_Box);

	pop_Iframe = document.createElement("iframe");
	pop_Iframe.id = this.PopMaskIframe;
	document.getElementsByTagName("body")[0].appendChild(pop_Iframe);
		
	var pop_Box = document.getElementById(this.PopMaskDiv);
	pop_Box.className = "dialog-mask";
	pop_Box.style.zIndex = "220";
	pop_Box.style.height = h;
	pop_Box.style.width = w;
	
	var pop_Iframe = document.getElementById(this.PopMaskIframe);
	pop_Iframe.className = "dialog-mask";
	pop_Iframe.style.zIndex = "219";
	pop_Iframe.style.height = h;
	pop_Iframe.style.width = w;
}
PopOutCommon.prototype.HeightFix = function(){
	var PopContentObj =  document.getElementById(this.PopContent);
	if (this.height == 'auto') {
		var h1 = PopContentObj.scrollHeight;
		var h2 = document.documentElement.clientHeight - parseInt(this.diff);
		var h = Math.min(h1,h2) + 'px';
		PopContentObj.style.height = h;
	}else{
		PopContentObj.style.height = this.height;
	}
	PopContentObj.style.width = this.width;
	PopContentObj.style.overflow = 'hidden';
}
PopOutCommon.prototype.PopClose = function(){
	if (this.befClose){this.befClose()};
	this.DivClose();	
}
PopOutCommon.prototype.DivClose = function(){
	removeObjById(this.id + "PopOutDiv");
	removeObjById(this.id + "CommonPopMaskDiv");
	removeObjById(this.id + "CommonPopMaskIframe");	
}


function removeObjById(ID){
	var obj = document.getElementById(ID);
	if (!obj){return false}
	obj.parentNode.removeChild(obj);
}
function getPositon(obj){  //返回横坐标
	if (!obj){return false}
	var Pos = {};
	var L1 = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);   //页面往左滚动的宽度
	var L2 = obj.getBoundingClientRect().left;    //元素在可视区域距离显示器左边的宽度
	var L3 = obj.clientWidth                  //元素本身的宽度
	var L  = parseInt(L1) + parseInt(L2) + parseInt(L3)
	Pos.x = L;

	var T1 = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	var T2 = obj.getBoundingClientRect().top;
	var T3 = obj.clientHeight
	var T  = parseInt(T1) + parseInt(T2) + parseInt(T3)
	Pos.y = T;
	return Pos;
}