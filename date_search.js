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
		browser.get("http://localhost:6500/");
		 element(by.buttonText('Show Extended Search')).click();
	})

  describe('extended search', function() {
	it (" All by AND", function(){
		element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/header/div/div[2]/div[2]/input')).click();
	});
    beforeEach(function() {
    // browser.get("http://localhost:6500/");
	// element(by.buttonText('Show Extended Search')).click();
	 
	  
    });
	it ("search by Dates", function(){
		
		element(by.partialButtonText('Dates')).click();
		var EC = protractor.ExpectedConditions;
		var dates = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[5]/div/div/div[2]/div/div[1]'));
		// Waits for the element to be clickable.
		browser.wait(EC.elementToBeClickable(dates), 5000);
				
		//fill in search field
		//start date
		
		var start = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[5]/div/div/div[1]/div[1]/div[1]'));
		start.click();
		var startDate = element(by.xpath('/html/body/div[3]/div/div[1]/div/div/div/div/div[2]/div[1]/div[3]/div/div/div[1]/button[1]'));
		startDate.click();
		browser.wait(EC.invisibilityOf(startDate), 5000);
		
		//End date
		var end = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[5]/div/div/div[1]/div[2]/div[1]'));
		end.click();
		var endDate =element(by.xpath('/html/body/div[4]/div/div[1]/div/div/div/div/div[2]/div[1]/div[3]/div/div/div[5]/button[5]'));
		endDate.click();
		browser.wait(EC.invisibilityOf(endDate), 5000);
		
		//Add interval
		element(by.buttonText('Add Interval')).click();
		
		
		//console.log("search");
		element(by.buttonText('Extended Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('1');
		
		//browser.sleep(5000);
		
	})
});
});

