describe("users should be able to login", function(){
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
		//browser.sleep(5000);
		browser.get("http://localhost:6500/");
		element(by.buttonText('Show Extended Search')).click();
		console.log("go to extended search");
	})

  describe('more extended search', function() {
	
	beforeEach(function() {
		browser.ignoreSynchronization = true;
		//browser.get("http://localhost:6500/");
	    
	    console.log("go to more extended search");
		//browser.sleep(10000);
		

	});
	

	
	it ("search by Techs", function(){
		//browser.get("http://localhost:6500/");
		element(by.partialButtonText('More')).click();
		var EC = protractor.ExpectedConditions;
		//expect(EC.visibilityOf(by.partialButtonText('Tech')), 5000);
		//element(by.buttonText('Show Extended Search')).click();
	    //console.log("go to extended search");
		//browser.sleep(5000);
		//expect(EC.presenceOf(element(by.partialButtonText('Tech'))), 8000);
		//element(by.partialButtonText('Tech')).click();
		element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[1]/button[2]')).click();
		
		//fill in search field
		var searchText = "n";
		element(by.id('deferred-input-9')).sendKeys(searchText);

		var tech = element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[3]/div[2]/div/div/div[1]/div[2]/div/div/span'));//element(by.buttonText('News-Events'));		
		//expect(element(by.partialButtonText('New'))).toContain('New')
		//browser.driver.isElementPresent(by.partialButtonText('New')).toBeTruthy();
		//browser.wait(10000);
		//browser.sleep(10000);
		

		// Waits for the element with id 'abc' to be clickable.
		browser.wait(EC.elementToBeClickable(tech), 10000);
		//browser.wait(EC.presenceOf(tag), 5000);
		//browser.wait(EC.visibilityOf(tag), 5000);
		//browser.sleep(10000);

		tech.click();
		
		element(by.buttonText('Go Search!')).click();
		
		
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log("Techs");
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('2');
		//browser.sleep(5000);
	});
	
	
  });
});