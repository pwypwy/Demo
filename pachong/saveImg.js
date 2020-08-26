const request = require("request");
const fs = require("fs");

for(let i = 1; i < 3; i++) {
    let imgUrl = 'http://s0.hao123img.com/res/img/logo/logonew.png';
    let filename = `test${i}.png`;
    request(imgUrl).pipe(fs.createWriteStream("./image/" + filename));
}