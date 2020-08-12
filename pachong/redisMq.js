var redis = require("redis")
var client = redis.createClient(6379, '127.0.0.1', {connect_timeout: 11})
var client2 = redis.createClient(6379, '127.0.0.1', {connect_timeout: 11})

//订阅一个频道
var sub = function(c,f) {
    var c = c || 'roban:test:channel'
    client.subscribe(c,function(e){
        console.log('starting subscribe channel:'+f)
    })
    client2.subscribe(c,function(e){
        console.log('c2:'+f)
    })
}
//订阅一个频道
sub('roban:test:channel','f1');

//处理错误,如果出现错误,或者服务器断开了链接,等待恢复时,继续订阅这个频道
client.on('error', function(error) {
    console.log(error)
    sub()
});


//订阅处理函数
client.on('message',function(err,response){
    console.log(response)
});


//处理错误,如果出现错误,或者服务器断开了链接,等待恢复时,继续订阅这个频道
client2.on('error', function(error) {
    console.log(error)
    sub()
});


//订阅处理函数
client2.on('message',function(err,response){
    console.log('c2   '+response)
});