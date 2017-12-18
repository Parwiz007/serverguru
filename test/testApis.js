var expect = require("chai").expect;
var aws = require("../controller/aws-api");


describe("AWS API", function() {
    
  it("should return an array", function(done) {
    aws(function (data){
        expect(data).to.be.a("array");
        done();
    });
  });

  it("should return an object", function(done) {
    aws(function (data){
        expect(data[0]).to.be.a("object");
        done();
    });
  });

  it("should return the key name", function(done){
    aws(function (data){
        expect("name" in data[0]).to.be.true;
        done();
    });
  });

});
