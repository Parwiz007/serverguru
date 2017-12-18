var expect = require("chai").expect;
var db = require("../models/");


describe("Database Test", function () {
  it("should return an array of records from instance table", function (done) {
    db.aws.findAll({
        raw: true
      })
      .then((data) => {
        expect(data).to.be.a("array");
        done();
      });
  });

  it("should return an object", function(done) {
    db.aws.findAll({})
    .then((data)=>{
        expect(data[0]).to.be.a("object");
        done();
    });
  });

  it("should return the key name", function(done){
    db.aws.findAll({})
    .then(function (data){
        expect("name" in data[0]).to.be.true;
        done();
    });
  });

});