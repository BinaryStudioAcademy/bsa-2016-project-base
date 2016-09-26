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
		//browser.get("http://localhost:6500/");
		//element(by.buttonText('Show Extended Search')).click();
		//console.log("go to extended search");
	});*/
	
	it("open", function(){
		browser.get("http://localhost:6500/");
		browser.ignoreSynchronization = true;
		element(by.buttonText('Show Extended Search')).click();
	})

  describe('more extended search', function() {
	
	beforeEach(function() {
		//browser.ignoreSynchronization = true;
		//var EC = protractor.ExpectedConditions;
		//browser.wait(EC.elementToBeClickable(element(by.partialButtonText('More'))),5000);	
		element(by.partialButtonText('More')).click();
	

	});
	
	it ("search by Tags", function(){
		var EC = protractor.ExpectedConditions;
		//element(by.partialButtonText('More')).click();
		//element(by.partialButtonText('Tags')).click();
		//fill in search field
		var searchText = "i";
		element(by.id('deferred-input-8')).sendKeys(searchText);

		var tag = element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[3]/div[1]/div/div/div[1]/div[2]/div/div[1]/span'));//element(by.buttonText('News-Events'));		
	
		// Waits for the element with id 'abc' to be clickable.
		browser.wait(EC.elementToBeClickable(tag), 10000);

		tag.click();
		element(by.css('#deferred-input-7')).sendKeys('tag0');
		element(by.buttonText('Go Search!')).click();
		
		
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log("Tags");
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('5');
		browser.sleep(1500);
	});
	
	it ("search by Techs", function(){
		
		var EC = protractor.ExpectedConditions;
		
		element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[1]/button[2]')).click();
		
		//fill in search field
		var searchText = "h";
		element(by.id('deferred-input-14')).sendKeys(searchText);

		var tech = element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[3]/div[2]/div/div/div[1]/div[2]/div/div/span'));//element(by.buttonText('News-Events'));		
	
		// Waits for the element with id 'abc' to be clickable.
		browser.wait(EC.elementToBeClickable(tech), 10000);

		tech.click();
		element(by.css('#deferred-input-12')).sendKeys('&tech0');
		
		element(by.buttonText('Go Search!')).click();
		
		
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log("Techs");
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('5');
		browser.sleep(1500);
	});
	
	it ("search by Users", function(){
		
		
		element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[1]/button[3]')).click();
		//fill in search field
		var searchText = "h";
		element(by.id('deferred-input-20')).sendKeys(searchText);

		var user = element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[3]/div[3]/div/div/div[1]/div[2]/div/div[1]/span'));//element(by.buttonText('News-Events'));		
		
		
		var EC = protractor.ExpectedConditions;

		// Waits for the element with id 'abc' to be clickable.
		browser.wait(EC.elementToBeClickable(user), 10000);
	

		user.click();
		element(by.css('#deferred-input-17')).sendKeys('&user0');
		element(by.buttonText('Go Search!')).click();
		
		
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log("Users");
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('2');
		browser.sleep(1500);
	});
	
	it ("search by Dates", function(){
		
		browser.ignoreSynchronization = true;
		var EC = protractor.ExpectedConditions;
		element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[1]/button[5]')).click();
		//fill in search field
		//var searchText = "h";
		//element(by.id('deferred-input-20')).sendKeys(searchText);
		var start = element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[3]/div[5]/div/div/div[1]/div[1]/div[1]'));
		start.click();
		//browser.sleep(3000);
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
		browser.sleep(1500);
		
		//select End date
		var end = element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[3]/div[5]/div/div/div[1]/div[2]/div[1]'));
		browser.wait(EC.elementToBeClickable(end), 5000);
		end.click();
				
		var endDate =element(by.buttonText('24'));
		
		browser.wait(EC.elementToBeClickable(endDate), 8000);
		
		endDate.click();
		//browser.wait(EC.invisibilityOf(element(by.buttonText('Cancel'))), 8000);
		
		browser.sleep(1500);
		browser.wait(EC.elementToBeClickable(element(by.buttonText('Add Interval'))), 8000);
		//Add interval
		element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[3]/div[5]/div/div/div[1]/div[3]')).click();
		
		element(by.css('#deferred-input-22')).sendKeys('&date0');
		//console.log("search");
		element(by.buttonText('Go Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log("Date");
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('1');
			
			browser.sleep(1500);
	});
	
	it ("search by Owners", function(){
		
		
		element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[1]/button[4]')).click();
		//fill in search field
		var searchText = "g";
		element(by.id('deferred-input-31')).sendKeys(searchText);

		var owner = element(by.xpath('/html/body/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div/div[3]/div[4]/div/div/div[1]/div[2]/div/div[1]/span'));//element(by.buttonText('News-Events'));		
		
		
		var EC = protractor.ExpectedConditions;

		// Waits for the element with id 'abc' to be clickable.
		browser.wait(EC.elementToBeClickable(owner), 10000);
		

		owner.click();
		element(by.css('#deferred-input-27')).sendKeys('&owner0');
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
});