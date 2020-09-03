var evenet = require('./evenet');
var redis = require('redis');

var client = redis.createClient()


let e = evenet.init("test",client)

e.on("t1",function(data){
	console.log("okkkkkk: "+data)
	return false
})

// e.clean()

// for (var i = 111- 1; i >= 0; i--) {
// 	e.emit("t1","uuuu"+i)
// }
e.retry("t1")