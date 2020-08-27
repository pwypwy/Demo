var redis = require('redis');

var client = redis.createClient(6379,'localhost');

client.set('hello','This is a value');

client.get('hello',function (err,v) {
    console.log(`redis get hello v: ${v}`);
})

client.del('r3');
for (var i = 10000- 1; i >= 0; i--) {
	client.send_command('PFADD',['r3','https://www.runoob.com/jsref/jsref-substr.html'+i],function(argument) {
		//console.log('PFADD  ')
	})
}



client.send_command('PFCOUNT',['r3'],function(a,data) {
	console.log('PFCOUNT:  '+data)
	//console.log(arguments)
})
// client.get('r3',function (err,v) {
//     console.log(`redis get hello v: ${v}`);
// });