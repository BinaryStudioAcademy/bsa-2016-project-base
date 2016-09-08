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


	it ("search by Owners", function(){
		browser.get("http://localhost:6500/");
		browser.ignoreSynchronization = true;
		element(by.buttonText('Show Extended Search')).click();
		console.log("go to extended search");
		element(by.partialButtonText('More')).click();
		element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[1]/button[4]')).click();
		//fill in search field
		var searchText = "m";
		element(by.id('deferred-input-11')).sendKeys(searchText);

		var owner = element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[3]/div[4]/div/div/div[1]/div[2]/div/div[3]/span'));//element(by.buttonText('News-Events'));		
		
		
		var EC = protractor.ExpectedConditions;

		// Waits for the element with id 'abc' to be clickable.
		browser.wait(EC.elementToBeClickable(owner), 10000);
		
		owner.click();
		
		element(by.buttonText('Go Search!')).click();
		
		
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log("Owner");
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('not');
		//browser.sleep(5000);
	});
 
});
