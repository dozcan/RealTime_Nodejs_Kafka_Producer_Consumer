var https = require('http');
var kafka = require('kafka-node');
var querystring = require('querystring');

exports.handler = function(event, context) {
  
    var deviceId = event.deviceId;
    var temperatureToday = event.temperatureToday;
    var temperaturePrevious = event.temperatureToday;
    var humudityToday = event.humudityToday;
    var humudityPrevious = event.humudityPrevious;
    

    var HighLevelProducer = kafka.HighLevelProducer;
    client = new kafka.Client('34.208.151.182:2181');
    producer = new HighLevelProducer(client);

     payloads = [
        { topic: 'IotMissionCriticDevice', messages: [deviceId,temperatureToday,temperaturePrevious,humudityToday,humudityPrevious]}
    ];
      

    producer.on('ready', function () {
       producer.send(payloads, function (err, data) {
        console.log(data);
      });
    });
}
