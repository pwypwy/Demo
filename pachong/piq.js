const axios = require('axios');

axios.get('https://blog.csdn.net/q282176713/article/details/80580886')
  .then(response => {
  	console.log("response.data");
    //console.log(response.data);
    getA(response.data)
    //console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });

function getA(html) {
	var regExp = /href=\"(.*)\"/
	var res = html.match(regExp) //regExp.match(html);
	//var res = html.split(regExp)
	console.log(res)
	// for (let char of html) {
	// 	if(char == 'a'){
	// 		console.log(char);
	// 	}
	// }
	// body...
}