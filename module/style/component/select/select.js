//select转化方法
function Select2DivClass(){
	var obj = {};
	obj = {
			target : null,
			dom : {
				wrapper : null, 
				label : null,
				selectedNode : null
				},
			widthDiff : 3,
			wrapperOpenClassName : 'selectDivOpen',
			wrapperClassName : 'selectDiv',
			view : {
				header : '<div class="selectDivArr"><strong>{text}</strong><span></span></div><ul>',
				repeater : '<li lang="{value}">{text}</li>',
				footer : '</ul>'
				},
			init : function(){
				this.buildView();
				this.attach();
				},
			attach : function(){
				var that = this;
				this.dom.wrapper.onclick = function(event){
					event = event || window.event;
					var target = event.target || event.srcElement;
					if(target.tagName.toLowerCase() != 'li'){
						that.toggle();
						return; 
					}	
					that.clickHandler.call(that, target);
				}
				$(this.dom.wrapper).getElements('li').addEvents({
					'mouseenter' : function(event){
						this.addClass('hover');
						},
					'mouseleave' : function(event){
						this.removeClass('hover');
						}
				});
				$(this.dom.wrapper).addEvents({
					'mouseleave' : function(event){
						this.removeClass('selectDivOpen');
						}
				});
				this.dom.wrapper.onmouseleave = function(){
					that.dom.wrapper.className = that.dom.wrapper.className.replace(that.wrapperOpenClassName,"");
				};
				},
			setTarget : function(target){
				this.target = target;
				},
			buildView : function(){
				var selectNode = this.target;
				//if (!selectNode){return false}
				var options = selectNode.options;
				var optionData = [];
				for(var i=0, l=options.length; i < l; i++){
					optionData.push({value:options[i].value, text:options[i].text});
				}    
				var html_template = [
					substitute(this.view.header, {text:optionData[0].text}),
					substitute(this.view.repeater, optionData),
					this.view.footer
					].join(''); 
				this.insertWrapper(html_template);
				this.target.style.display =  "none"
				},
			insertWrapper : function(nodeHTML){
				var target = this.target;
				var selectDiv = document.createElement("div");
				selectDiv.className = this.wrapperClassName; 
				selectDiv.style.width = parseInt(this.target.clientWidth) + this.widthDiff + "px";
				selectDiv.innerHTML = nodeHTML;
				target.parentNode.insertBefore(selectDiv, target);
				this.dom.wrapper = selectDiv;
				this.dom.label = selectDiv.getElementsByTagName('strong')[0];
				},
			toggle : function(){
				var wrapper = this.dom.wrapper;
				if(wrapper.className.indexOf(this.wrapperOpenClassName)>-1){
					wrapper.className = wrapper.className.replace(this.wrapperOpenClassName,"");
				}else{
					wrapper.className += ' ' + this.wrapperOpenClassName;
				}
				},
			clickHandler : function(eventTarget){
				this.dom.selectedNode = eventTarget;
				this.feedback(); 
				this.toggle();
				},
			getSelectedData : function(){
				return {
					value : this.dom.selectedNode.getAttribute('lang'),
					text : this.dom.selectedNode.innerHTML
				};
				},
			feedback : function(){
				this.target.value = this.getSelectedData().value;
				this.dom.label.lang = this.getSelectedData().value;  
				this.dom.label.innerHTML = this.getSelectedData().text;
				}	
		}
		return obj;
}