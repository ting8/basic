/**
 http://act.fantong.com/act/web2/jqb0401/test1/zhou.html
 */
//MyDrag extends Drag.Move
var MyDrag=Drag.Move.extend({
		options:{dragbase:null,basecount:0,origin:{},onBeforeStart:function(A){
			if(this.options.dragbase){
				A.injectBefore(this.options.dragbase);
				this.options.dragbase.remove();
				A.setStyle('position','');
				this.options.dragbase=null;}
			
			this.options.basecount=0;
			if(this.position.element==''){
				var C=A.getCoordinates();
				A.setStyles({top:C.top,left:C.left,position:'absolute'});
				A.setStyle('width',C.width+'px');
				this.options.origin.width=C.width;
				A.setOpacity(0.2);
				var _C=(C.height-8)+'px';
			}
			this.options.dragbase=new Element('div',{'styles':{'background-color':'#f00','height':_C},'class':'empty'});
			this.options.dragbase.injectBefore(A);
		},initialize:function(){
			this.position.element='';
			this.element.setStyle('position','');
		},onComplete:function(A){
			   A.setOpacity(1);
		}},
		checkAgainst:function(B){
			B=B.getCoordinates(this.options.overflown);
			var A=this.element.getCoordinates(this.options.overflown)
			if(A.width>B.width)
			return ((A.left>B.left)&&(A.left+B.width/2<B.right)&&(A.top>B.top)&&(A.top<B.bottom));
			else
			return(((A.left+A.width/2>B.left)&&(A.right-A.width/2<B.right))&&((A.top+A.height/2>B.top)&&(A.bottom-A.height/2<B.bottom)));}
		});
	
