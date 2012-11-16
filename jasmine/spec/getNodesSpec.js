describe("$", function() { 
	var scripts;
	var lis;
	var node;

	beforeEach(function() {
		scripts = getObj("script");
		lis = getObj(".a");
		node = getObj("#jasmine");
	});
	//afterEach

	describe("get nodes by id", function() {
	    it("node type should be text/javascript", function() {
	        expect(node.type).toEqual("text/javascript");
	    });
	});

	describe("get nodes by tags", function() {
	    it("should be 6 scripts", function() {
	        expect(scripts.length).toEqual(9);
	        expect(scripts.length).not.toEqual(7);
	    });
	    it("scripts should be a array", function() {
	    	expect(scripts).toEqual(jasmine.any(Array));
	        expect(NE.type(scripts)).toEqual("array");
	    }); 
	});

	describe("get nodes by class", function() {
	    it("should be 3 nodes has class 'a'", function() {
	        expect(lis.length).toEqual(3);
	    });
	    it("lis should be a array", function() {
	        expect(NE.type(lis)).toEqual("array");
	    }); 
	});
});