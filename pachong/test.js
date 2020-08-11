const puppeteer = require('puppeteer');


let i = 1

const a ={}

if(i>0){
	a.puppeteer = require('puppeteer');
	(async () => {
	  const browser = await a.puppeteer.launch();
	  const page = await browser.newPage();
	  await page.goto('http://www.shxwcb.com/460137.html');
	  await page.waitFor(200)
	  await page.screenshot({path: 'example2.png'});

	  await browser.close();
	})();
	console.log(11111)
}else{
	console.log(2222)
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.shxwcb.com/460137.html');
  await page.waitFor(200)
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();