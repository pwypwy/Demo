const axios = require('axios')
const cheerio = require('cheerio')

let url = 'https://18comic1.biz/albums?o=mv'

axios.get(url)
  .then(response => {
  	console.log("response.data");
    //console.log(response);
    getA(response.data,url)
    //console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error)
  });


//后去标签
function getA(html,url) {
	const dom = cheerio.load(html)
  console.log(dom.domain)
	dom("[href]").each(function(i, elem) {


	  	let res = dom(this).attr('href')
      if(res.indexOf("album/") != -1){
      //if(res.startsWith("http")){
        //console.log(res)
        let href = hrefFill(url,res)
        console.log(href)
      }	  	 	
	})	
}

//url地址补全
function hrefFill(url,href) {
  let r = url.split("/").pop()
  let newHref = url.replace("/"+r,href)
  return newHref
}
