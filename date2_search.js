describe("users should be able to login and use Extended Search", function(){
	it ("to fill in user information and login", function(){
		//"to fill in user information and login",
		browser.get("http://localhost:2020/#/");
		//fill in login
		element(by.model("authLoginCtrl.user.email")).sendKeys("admin@default.com");
		//fill in password
		element(by.model("authLoginCtrl.user.password")).sendKeys("123");
		//press Login button
		var loginButton = element(by.cssContainingText(".btn", "Log in"));
		loginButton.click()
		//console.log("Hello");
		
	})

	it ("search by Dates", function(){
		browser.get("http://localhost:6500/");
		element(by.buttonText('Show Extended Search')).click();
		var EC = protractor.ExpectedConditions;
		var dates = element(by.partialButtonText('Dates'));
		browser.wait(EC.elementToBeClickable(dates), 10000);
		
		dates.click();
		
		var dates = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[5]/div/div/div[2]/div/div[1]'));
		// Waits for the element to be clickable.
		browser.wait(EC.visibilityOf(dates), 8000);
				
		//fill in search field
		//start date
		
		var start = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[5]/div/div/div[1]/div[1]/div[1]'));
		start.click();
		browser.wait(EC.elementToBeClickable(element(by.css('div[style="cursor: pointer;"]'))), 1500);
		
		//select year
		element(by.css('div[style="cursor: pointer;"]')).click();
		browser.wait(EC.elementToBeClickable(element(by.buttonText('2015'))), 1500);
		element(by.buttonText('2015')).click();
		
		browser.wait(EC.elementToBeClickable(element(by.css('div[style="cursor: pointer; width: 100%; display: block;"]'))), 3000);
		element(by.css('div[style="cursor: pointer; width: 100%; display: block;"]')).click();
		//browser.sleep(3000);
		// go to previous month
		//element(by.css('path[d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"]')).click();
		//browser.sleep(3000);
		
		
		var startDate = element(by.buttonText('1'));
		
		browser.wait(EC.elementToBeClickable(startDate), 8000);
		//var buttonCancel = element(by.buttonText('Cancel'));
		startDate.click();
		//browser.wait(EC.invisibilityOf(buttonCancel), 8000);
		browser.sleep(3000);
		
		//select End date
		var end = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[5]/div/div/div[1]/div[2]/div[1]'));
		browser.wait(EC.elementToBeClickable(end), 5000);
		end.click();
		//browser.sleep(1500);
		//go to next month
		//browser.actions().mouseMove(element(by.css('path[d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"]'))).perform();
		//element(by.css('path[d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"]')).click();
		//element(by.xpath('/html/body/div[4]/div/div[1]/div/div/div/div/div[2]/div[1]/div[1]/button[2]/div/svg/path')).click();
		//browser.sleep(5000);
		var endDate =element(by.buttonText('24'));
		
		browser.wait(EC.elementToBeClickable(endDate), 8000);
		
		endDate.click();
		//browser.wait(EC.invisibilityOf(element(by.buttonText('Cancel'))), 8000);
		browser.sleep(3000);
		browser.wait(EC.elementToBeClickable(element(by.buttonText('Add Interval'))), 8000);
		//Add interval
		element(by.buttonText('Add Interval')).click();
		
		
		//console.log("search");
		element(by.buttonText('Extended Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('4');
		
		//browser.sleep(5000);
		
	})

});
