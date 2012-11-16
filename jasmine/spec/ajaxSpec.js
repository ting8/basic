

describe("Asynchronous specs", function() {
  var value;

  it("should support async", function() {
    runs(function() {
	    loadJsonP("get.php?a=4",function(data){
			value = data;
		});
    });

    waitsFor(function() {
    	return value;
    });

    runs(function() {
    	expect(value).toEqual("4");
    });

  });
});