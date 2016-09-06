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

		
		it ("search by Users", function(){
		
		//element(by.css('input[value="All by "AND""]')).click();
		
		element(by.partialButtonText('Users')).click();
		//fill in search field
		var searchText = "ma";
		
		element(by.id("deferred-input-5")).sendKeys(searchText);
		
		var EC = protractor.ExpectedConditions;
		var user = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[3]/div/div/div[1]/div[2]/div/div[1]/span'));
		// Waits for the element tag to be clickable.
		browser.wait(EC.elementToBeClickable(user), 5000);
		
		user.click();
		//console.log("search");
		element(by.buttonText('Extended Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('4');
		//console.log("we have texts ");
		//browser.sleep(10000);
		
	})
	
		it ("search by Techs", function(){
		
		//element(by.css('input[value="All by "AND""]')).click();
		
		element(by.partialButtonText('Technologies')).click();
		//fill in search field
		var searchText = "node";
		
		element(by.id("deferred-input-4")).sendKeys(searchText);
		
		var EC = protractor.ExpectedConditions;
		var tech = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[2]/div/div/div[1]/div[2]/div/div/span'));
		// Waits for the element tag to be clickable.
		browser.wait(EC.elementToBeClickable(tech), 5000);
		
		tech.click();
		//console.log("search");
		element(by.buttonText('Extended Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('1');
		//console.log("we have texts ");
		//browser.sleep(10000);
		
	})
	
	it ("search by Tags", function(){
		
		element(by.partialButtonText('Tags')).click();
		//fill in search field
		var searchText = "social";
		
		element(by.id("deferred-input-3")).sendKeys(searchText);
		
		var EC = protractor.ExpectedConditions;
		var tag = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[1]/div/div/div[1]/div[2]/div/div[1]/span'));
		// Waits for the element tag to be clickable.
		browser.wait(EC.elementToBeClickable(tag), 5000);
		
		tag.click();
		//console.log("search");
		element(by.buttonText('Extended Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('1');
		//console.log("we have texts ");
		
	})
	
	it ("search by Owners", function(){
		
		//element(by.css('input[value="All by "AND""]')).click();
		
		element(by.partialButtonText('Owners')).click();
		//fill in search field
		var searchText = "ni";
		
		element(by.id("deferred-input-6")).sendKeys(searchText);
		
		var EC = protractor.ExpectedConditions;
		var owner = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[4]/div/div/div[1]/div[2]/div/div[2]/span'));
		// Waits for the element tag to be clickable.
		browser.wait(EC.elementToBeClickable(owner), 5000);
		
		owner.click();
		//console.log("search");
		element(by.buttonText('Extended Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('1');
		//console.log("we have texts ");
		//browser.sleep(10000);
		
	})


	it ("search by Dates", function(){
		
		//element(by.css('input[value="All by "AND""]')).click();
		
		element(by.partialButtonText('Dates')).click();
		var EC = protractor.ExpectedConditions;
		var dates = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[5]/div/div/div[2]/div/div[1]'));
		// Waits for the element with id 'abc' to be clickable.
		browser.wait(EC.elementToBeClickable(dates), 5000);
		//browser.sleep(3000);
		
		//fill in search field
		//start date
		
		var start = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[5]/div/div/div[1]/div[1]/div[1]'));
		start.click();
		//browser.sleep(1500);
		//element(by.xpath('/html/body/div[3]/div/div[1]/div/div/div/div/div[2]/div[1]/div[1]/button[1]')).click();
		element(by.xpath('/html/body/div[3]/div/div[1]/div/div/div/div/div[2]/div[1]/div[3]/div/div/div[1]/button[1]')).click();
		//browser.wait(EC.elementToBeClickable(start), 10000);
		//browser.wait(EC.elementToBeClickable(element(by.buttonText('Add Interval'))),5000);
		browser.sleep(1500);
		
		//End date
		var end = element(by.xpath('//*[@id="home-root"]/div[1]/div[3]/div[1]/div[3]/div[5]/div/div/div[1]/div[2]/div[1]'));
		
		end.click();
		element(by.xpath('/html/body/div[4]/div/div[1]/div/div/div/div/div[2]/div[1]/div[3]/div/div/div[5]/button[5]')).click();
		browser.sleep(1500);
		//Add interval
		
		element(by.buttonText('Add Interval')).click();
		
		
		//console.log("search");
		element(by.buttonText('Extended Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('not');
		//console.log("we have texts ");
		//browser.sleep(10000);
		
	})
});
});