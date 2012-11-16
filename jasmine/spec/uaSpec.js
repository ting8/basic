describe("ua", function() {
	var getType = isBroswer;
	it("should be chrome", function() {
        expect(getType("chrome")).toEqual(true);
    });
    it("should be webkit", function() {
        expect(getType("webkit")).toEqual(true);
    }); 
});