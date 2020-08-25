const axios = require('axios')
const cheerio = require('cheerio')

axios.get('https://blog.csdn.net/q282176713/article/details/80580886')
  .then(response => {
  	console.log("response.data");
    //console.log(response.data);
    getA(response.data)
    //console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error)
  });

function getA(html) {
	const dom = cheerio.load(html)
	dom("[href]").each(function(i, elem) {
	  	let res = dom(this).attr('href')
	  	console.log(res)
	  	
	})	
}
