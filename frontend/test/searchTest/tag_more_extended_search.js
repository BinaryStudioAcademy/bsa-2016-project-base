describe("users should be able to login", function(){
	/*it ("to fill in user information and login", function(){
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
		
	})*/


	it ("search by Tags", function(){
		browser.get("http://localhost:6500/");
		browser.ignoreSynchronization = true;
		element(by.buttonText('Show Extended Search')).click();
		console.log("go to extended search");
		element(by.partialButtonText('More')).click();
		//element(by.partialButtonText('Tags')).click();
		//fill in search field
		var searchText = "new";
		element(by.id('deferred-input-8')).sendKeys(searchText);

		var tag = element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[3]/div[1]/div/div/div[1]/div[2]/div/div[1]/span'));//element(by.buttonText('News-Events'));		
		//expect(element(by.partialButtonText('New'))).toContain('New')
		//browser.driver.isElementPresent(by.partialButtonText('New')).toBeTruthy();
		//browser.wait(10000);
		//browser.sleep(10000);
		
		var EC = protractor.ExpectedConditions;

		// Waits for the element with id 'abc' to be clickable.
		browser.wait(EC.elementToBeClickable(tag), 10000);
		//browser.wait(EC.presenceOf(tag), 5000);
		//browser.wait(EC.visibilityOf(tag), 5000);
		//browser.sleep(10000);

		tag.click();
		
		element(by.buttonText('Go Search!')).click();
		
		
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log("Tags");
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('1');
		//browser.sleep(5000);
	});
 
});