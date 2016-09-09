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


	it ("search by Users", function(){
		browser.get("http://localhost:6500/");
		browser.ignoreSynchronization = true;
		element(by.buttonText('Show Extended Search')).click();
		//console.log("go to more extended search");
		element(by.partialButtonText('More')).click();
		element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[1]/button[3]')).click();
		//fill in search field
		var searchText = "a";
		element(by.id('deferred-input-10')).sendKeys(searchText);

		var user = element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[3]/div[3]/div/div/div[1]/div[2]/div/div[1]/span'));//element(by.buttonText('News-Events'));		
	
		var EC = protractor.ExpectedConditions;

		// Waits for the element with id 'abc' to be clickable.
		browser.wait(EC.elementToBeClickable(user), 10000);
		
		user.click();
		
		element(by.buttonText('Go Search!')).click();
		
		
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log("Users");
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('2');
		//browser.sleep(5000);
	});
 
});
