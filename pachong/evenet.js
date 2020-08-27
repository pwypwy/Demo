const events = require('events'); 
const child_process = require('child_process');
const emitter = new events.EventEmitter(); 


emitter.on('a', function(arg1) { 
    console.log('a: '+arg1); 
    emitter.emit('b', arg1)
})

//初始化事件  cahceUrl -> allowUrl -> page/img/
emitter.on('cahceUrl', function(url) { 
    console.log('cahceUrl: '+arg1); 
    if(url.startsWith("http")&&url.indludes("/")){
    	if(url.indludes("")){

    	}else if(url.indludes("")){

    	}else if(url.indludes("")){
    		
    	}

    }
    emitter.emit('b', arg1)
})


//page -> category/theme/content
//content -> html -> dom -> img/url
//类型判断 分流器 过滤器
//url过滤


//页面类型
//目录页面处理(多级目录)
//主题页面处理
//内容页面处理
//资源抓取

//图片类型
//获取主题,资源保存