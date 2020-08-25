const redis = require("redis")

const subscriber = redis.createClient()
const publisher = redis.createClient()

let messageCount = 0

// redis 发布功能
publisher.publish("a channel", "111111111111111111")
publisher.publish("a channel", "2222222222222222")

//publisher.quit()

for (var i = 10 ; i >= 0; i--) {
    publisher.publish("a channel", "a"+i)
}

var myFunction = new Function("publisher", "publisher.publish('a channel', '3333333333333333')");
myFunction(publisher)
console.log(myFunction.toString())
// subscriber.on("subscribe", function(channel, count) {
  
// });

// subscriber.on("message", function(channel, message) {
//   messageCount += 1;

//   console.log("Subscriber received message in channel '" + channel + "': " + message);

//   if (messageCount === 2) {
//     subscriber.unsubscribe();
//     subscriber.quit();
//     publisher.quit();
//   }
// });

// subscriber.subscribe("a channel");