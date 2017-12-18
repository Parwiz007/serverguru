var logger = require("./logger");
var AWS = require("aws-sdk");
AWS.config.update(require('../config/config.json')["aws"]);

var ec2 = new AWS.EC2({
    apiVersion: '2016-11-15'
});
var params = {
    DryRun: false
};

module.exports = (callback) => {
    ec2.describeInstances(params, function (err, data) {
        var result = [];
        if (err) {
            logger("aws-api","Error", err.stack);
        } else {
            x = data.Reservations;
            count = 0;
            x.map((reservations) => {
                reservations.Instances.map((instance) => {
                    count++;
                    var Tags = {}; //Need to iterate in line 5 through all
                    //and create an object like {name: servername, etc...}
                    instance.Tags.map((tags) => {
                        Tags[tags.Key] = tags.Value
                    });
                    result.push({
                        id: instance.InstanceId,
                        name: Tags.Name,
                        type: instance.InstanceType,
                        value: instance.PublicIpAddress,
                        tags: JSON.stringify(Tags)
                    });
                });
            });
            // returns an array
            logger("aws-api","ec2.describeInstances","Received count =>" + result.length);
            callback(result);
        }
    });
}