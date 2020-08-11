const axios = require('axios');

async function execut(argument) {
	console.log("start")
	await axios.get('https://xxgk.eic.sh.cn/jsp/view/list_shhj.jsp')
	    .then(((result) => {
	      console.log(result.data);
	    }))
	    .catch((err) => {
	      console.log(err);
	    });

	console.log("end")

}

execut()