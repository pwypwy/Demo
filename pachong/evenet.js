const events = require('events'); 
const child_process = require('child_process');
var redis = require('redis');
const emitter = new events.EventEmitter(); 

var evenet = {
	init(domain,client){
		return {
			domain,
			client,
			nodes:[],
			on(key,fun){
				var nf = function(data){

					try{
						let flag = fun(data)
						if(flag==false){												
							setTimeout(function(){
								client.sadd(domain+"-"+key+"-fail",data)
							}, 500)														
						}else{
							client.srem(domain+"-"+key+"-fail",data)
						}
					}catch(err){
						//记录错误信息
						client.sadd(domain+"-"+key+"-err",{data,err})
						
						//记作消费失败
						client.sadd(domain+"-"+key+"-fail",data)
						//setTimeout(del, 200)
					}
				}
				emitter.on(domain+"-"+key,nf)
				client.sadd(domain+"-nodes",domain+"-"+key)
				client.sadd(domain+"-nodes",domain+"-"+key+"-fail")
				client.sadd(domain+"-nodes",domain+"-"+key+"-err")
			},
			emit(key,data){			
				//数据过滤并备份 
				client.sismember(domain+"-"+key,data,function(err,t){
					//console.log(t)
					if(t==1){
						return
					}else{
						emitter.emit(key, data)
						client.sadd(domain+"-"+key,data)
					}
				})
				
				
			},
			restart(key,num){
				var f = function(err, datas){				
						for (let data of datas) {
							emitter.emit(key,data)
						}
					}
				if(num&&num>0){
					client.srandmember(domain+"-"+key,num,f)
				}else{
					//查询数据 遍历重试
					client.smembers(domain+"-"+key,f)
			
				}
			},
			//重试消费失败的数据
			retry(key,num){
				var f = function(err, datas){
						for (let data of datas) {						
							emitter.emit(domain+"-"+key,data)
						}
					}
				if(num&&num>0){
					client.srandmember(domain+"-"+key+"-fail",num,f)
				}else{
					//查询数据 遍历重试
					client.smembers(domain+"-"+key+"-fail",f)
			
				}
			},
			getNodes(fun){
			     client.smembers(domain+"-nodes",fun)
			},
			//通过主题获取数据
			get(key,fun){
				client.smembers(domain+"-"+key,fun)
			},
			//获取消费失败的数据
			getFail(key,fun){
				client.smembers(domain+"-"+key+"-fail",fun)
			},
			//获取消费异常的数据
			getErr(key,fun){
				client.smembers(domain+"-"+key+"-err",fun)
			},
			clean(key){
				if(key){
					client.del(domain+"-"+key)
				}else{
					client.smembers(domain+"-nodes",function(err,list){
						for(let k of list){
							client.del(k)
						}
						client.del(domain+"-nodes")
					})
				}
			}
		}
	}
}

module.exports = evenet
