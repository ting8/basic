addEventListener("message",function(e){
	setInterval(function(){
		postMessage(new Date().getTime() + "  workers say: John is away.");
	},1000)
},true);