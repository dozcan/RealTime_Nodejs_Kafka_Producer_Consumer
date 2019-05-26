var https = require('http');
var kafka = require('kafka-node');

var Consumer = kafka.Consumer;
client = new kafka.Client('34.208.151.182:2181');
consumer = new Consumer(
        client,
        [
           { topic: 'IotMissionCriticDevice',partition:0}
        ],
        {
            autoCommit: false	
        },
        {
        	fromOffset:'latest'
        }

    );

consumer.on('message', function (message) {
   
	var arrObject = new Array();
	var arrTempObject = new Array();
	console.log(message);


});


var jsonObject = JSON.stringify(
{
    "deviceId":"device1",	
	"temperatureToday":[2,20,54,4,5],
	"temperaturePrevious":[2,2,5,4,35],
	"humudityToday":[10,20,54,4,5],
	"humudityPrevious":[1,2,5,4,35]
}
);

var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};

var optionspost = {
    host : '127.0.0.1',//'52.33.132.222',
    port :  4000,            
    path : '/messages',
    method : 'POST',
    headers : postheaders
};

var reqPost = https.request(optionspost, function(res) {

    res.on('data', function(d) {
        process.stdout.write(d);

    });
});

reqPost.write(jsonObject);
reqPost.end();

  