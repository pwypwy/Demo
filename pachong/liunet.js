const redis = require("redis")
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require("fs")
const request = require("request")




var plugin = {}
plugin.axios = axios
plugin.cheerio = cheerio
plugin.fs = fs
plugin.redis = redis
plugin.request = request


const publisher = redis.createClient(6379, '127.0.0.1', {connect_timeout: 11})
var net = {
	publisher,
	to(channel,data){
		this.publisher.publish(channel, data)
	}
}

function createNode(name,channel,fun) {
	try{
		var f = new Function("data","plugin","net",fun)
		var suber = redis.createClient(6379, '127.0.0.1', {connect_timeout: 11})
		suber.subscribe(channel,function(e){
	        //console.log('starting subscribe channel:'+f)
	    })

	    suber.on('error', function(error) {
		    console.log(error)
		    //sub()
		})

		//订阅处理函数
		suber.on('message',function(err,response){
		    //console.log(response)
		    // let a = 1
		    // for (var i = 100000000 - 1; i >= 0; i--) {
		    // 	a = (a+i)/a
		    // }
		   	try{
		   		f(response,plugin,net)	
		   	}catch(e){
		   		console.log(e)
		   	}
		})
		console.log(`createNode: ${name}  ok`)
	}catch(e){
		console.log(`createNode: ${name}  error: ${e}`)
	}
}

let funStr = 
`
plugin.axios.get(data)
  .then(response => {
  	//console.log("response.data");
    getA(response.data)

  })
  .catch(error => {
    console.log(error)
  });

function getA(html) {
	const dom = plugin.cheerio.load(html)
	dom("[href]").each(function(i, elem) {
	  	let res = dom(this).attr('href')
	  	if(res.startsWith("https")){
			//console.log(res)
			//net.to('a',res)
		}	  	
	})	
	dom("[src]").each(function(i, elem) {
	  	let res = dom(this).attr('src')
	  	if(res.startsWith("https")){
			
			if(res.includes('.png')){
				console.log(res)
			    let filename = res.split('-')[2];//+'test.png';
				let path = "./image/bb/"
				 if(!plugin.fs.existsSync(path)) {
				 	plugin.fs.mkdirSync(path);
				 }
			    plugin.request(res).pipe(plugin.fs.createWriteStream(path + filename));
			}
		}	  	
	})
}

`



function test() {
	createNode("ta","a",funStr)
	//createNode("tb","b","console.log('b: '+data);net.to('c',data);")
	// createNode("tc","c","console.log('c1: '+data);net.to('e',data);")
	// createNode("tcd","c","console.log('c2: '+data);net.to('d',data);")
	// createNode("td","d","console.log('d: '+data);net.to('e',data);")
	// createNode("te","e","console.log('e: '+data);net.to('a',data);")

	function myFunc(arg) {
	  for (var i = 3 - 1; i >= 0; i--) {
	  	publisher.publish("a", 'https://www.cnblogs.com/muou2125/p/11652193.html')
	  }
	  console.log("发完了!!!!!!")
	}

	setTimeout(myFunc, 1500, 'funky');
}


function createStart(name,fun,data) {
	var f = new Function("data","plugin","net",fun)
	f(data,plugin,net)
}

test() 
//setTimeout(myFunc, 4500, 'funky');

