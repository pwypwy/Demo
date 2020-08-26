var S = require('string')

let a = S('https://www.w3school.com.cn/ui2019/logo-16-red.png').between('/', '.png').s
//console.log(a)

var str = 'https://www.w3school.com.cn/ui2019/logo-16-red.png'
//str.match(/.png/)
function between(s,left, right) {
   	
	var endPos = s.indexOf(right)
	var startPos = s.substr(0,endPos).lastIndexOf(left)
	return s.slice(startPos+1,endPos)

}

console.log(between(str,'/','.png'))