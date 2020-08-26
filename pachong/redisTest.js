var redis = require('redis');

var client = redis.createClient(6379,'localhost');

client.set('hello','This is a value');

client.get('hello',function (err,v) {
    console.log(`redis get hello v: ${v}`);
})

function test(argument) {
	console.log("ooooooooo")
}

console.log(test.toString())

var f = new Function(test.toString())
f(1)