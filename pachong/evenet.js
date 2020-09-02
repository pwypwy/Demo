const events = require('events'); 
const child_process = require('child_process');
var redis = require('redis');
const emitter = new events.EventEmitter(); 


emitter.on('a', function(arg1) { 
    console.log('a: '+arg1); 
    emitter.emit('b', arg1)
})


var evenet = {
	init(domain,client){
		return {
			domain,
			client,
			nodes:[],
			on(key,fun){
				var nf = function(data){
					try{
						fun(data)
					}catch(e){
						//记录错误信息
					}
				}
				emitter.on(key,nf)
				client.sadd(domain+"-")
			},
			emit(key,data){
				emitter.emit(key, data)
				//数据备份
			},
			restart(key,num){
				if(num&&num>0){

				}else{
					//查询数据 遍历重试
					for (let data of datas) {
						emitter.emit(key,data)
					}			
				}
			}
		}
	}
}