test("$", function() {
	var nodes = getObj("script");
	ok(nodes.length == 6, "6 script");
	ok(nodes.length == 6, "6 script");
	ok(NE.type(nodes) == "array", "type is array");
});