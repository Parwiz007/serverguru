var db = require("../models/");

module.exports= (fileName, functionName, detail)=>{
    console.log("logger=>",fileName,functionName, detail);
    db.logs.create({fileName: fileName, functionName: functionName, detail: detail});
};
