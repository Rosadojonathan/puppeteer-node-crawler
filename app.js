
const puppeteer = require('puppeteer');
const fs = require('fs');


async function RocketCheck(url) {
	// urls de test ==>
	// url = 'https://rocket-ticket.com/fr/france-nouvelle-zelande-a-paris-841.html'
	//url = 'https://rocket-ticket.com/fr/tickets-de-concert/kendrick-lamar-a-paris-851.html#/categorie-categorie_1/date-lundi_26_fevrier_2018'
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
    await page.setUserAgent('Stock Checker Adwords/1.0 (Script; Stock Checker) Stock Checker');
	await page.goto(url, {waitUntil: 'load'});
	try {
		const availabilityStatut = await page.evaluate(() =>

		document.querySelector('#availability_statut').getAttribute('style'));
		console.log(availabilityStatut);
		let bodyHTML = await page.evaluate(()=> document.body.innerHTML);
		// fs.writeFile('contentpage.html', bodyHTML, function(err){
		// 	if(err){ return console.log(err)};
		// 	console.log('just wrote contentpage.html');
		// })



		if (availabilityStatut == 'display: none;'){
			console.log('Display is none');
			response = 'Display is none, all is good';

		}
		else {
			console.log('No categories left');
			response = 'Need to check this url ' + url

		}
	}
catch(error){
	console.error(error);
}


	console.log("Closing");
	console.log(response);
	await browser.close();
	return bodyHTML;



};
RocketCheck('https://rocket-ticket.com/fr/tickets-de-sport/tournoi-des-6-nations-franceirlande-866.html');
