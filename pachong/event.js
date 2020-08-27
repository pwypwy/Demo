const events = require('events'); 
const child_process = require('child_process');
const emitter = new events.EventEmitter(); 

emitter.on('a', function(arg1) { 
    console.log('a: '+arg1); 
    emitter.emit('b', arg1)
})

emitter.on('b', function(arg1) { 
    console.log('b: '+arg1); 
    emitter.emit('c', arg1)
    emitter.emit('d', arg1)
})

emitter.on('c', function(arg1) { 

	let promise = new Promise(function(resolve, reject) {

		//console.log('Promise');
		resolve();
	});

	promise.then(function() {
		for (var i = 2000000000; i >= 0; i--) {
			let b = 10000/i
		}
		console.log('okkkkkk.');
	});

    console.log('ccccc: '+arg1); 
    //emitter.emit('d', arg1+1)

})

emitter.on('d', function(arg1) { 
    console.log('d: '+arg1); 
    emitter.emit('e', arg1)

})

emitter.on('e', function(arg1) { 

    console.log('e: '+arg1); 
    emitter.emit('f', arg1)

})

emitter.on('e', function(arg1) { 

    console.log('e2: '+arg1); 
    emitter.emit('f', arg1)

})

emitter.on('e', function(arg1) { 

    console.log('e3: '+arg1); 
    emitter.emit('f', arg1)

})

for (var i = 10- 1; i >= 0; i--) {
	emitter.emit('a', i); 
}
