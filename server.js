const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

async function URLChecker(urlToCheck) {

	const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    browser.userAgent('Stock Checker Adwords');

	const page = await browser.newPage();
    await page.setUserAgent('Stock Checker Adwords');


	await page.goto(urlToCheck, {waitUntil: 'load'});

		let bodyHTML = await page.evaluate(() => document.body.innerHTML);
		// fs.writeFile('contentpage.html', bodyHTML, function(err){
		// 	if(err){ return console.log(err)};
		// 	console.log('just wrote contentpage.html');
		// })
	console.log("Closing");

	await browser.close();
	return bodyHTML;
};

app.get('/api/:url', async function (req, res) {
	const urlToCheck = req.params.url;
	console.log(urlToCheck);
	const result = await URLChecker(urlToCheck);
	res.send(result);




})

app.listen(port, ()=>{
	console.log('listening on port ' + port);

})
