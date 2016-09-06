describe("users should be able to login and use simple Search", function(){
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
	})

  describe('simple search', function() {
  

    beforeEach(function() {

		element(by.id("deferred-input-2")).clear();

	});
	
	it ("search by Techs", function(){
		
		//fill in search field
		
		var searchText = "!action";
		element(by.id("deferred-input-2")).sendKeys(searchText);
		console.log("search");
		element(by.buttonText('Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log('Techs');
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('1');
		//console.log("we have texts ");
		//browser.sleep(5000);
		
		
	})

	it ("search by Tags", function(){
		//browser.get("http://localhost:6500/");
		//fill in search field
		
		var searchText = "#apple";
		element(by.id("deferred-input-2")).sendKeys(searchText);
		console.log("search");
		element(by.buttonText('Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log('Tags');
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('1');
		//console.log("we have texts ");
		//browser.sleep(5000);
		
	})
	
	it ("search by Users surname", function(){
		//browser.get("http://localhost:6500/");
		//fill in search field
		var searchText = "@lewis";
		element(by.id("deferred-input-2")).sendKeys(searchText);
		console.log("search");
		element(by.buttonText('Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log('Users surname');
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('2');
		//console.log("we have texts ");
		//browser.sleep(5000);
		
	})
	
	it ("search by Users name", function(){
		//browser.get("http://localhost:6500/");
		//fill in search field
		var searchText = "@andrew";
		element(by.id("deferred-input-2")).sendKeys(searchText);
		console.log("search");
		element(by.buttonText('Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log('Users name');
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('5');
		//console.log("we have texts ");
		//browser.sleep(5000);
		
	})
	
	it ("search by Owners name", function(){
		//browser.get("http://localhost:6500/");
		//fill in search field
		var searchText = "~ann";
		element(by.id("deferred-input-2")).sendKeys(searchText);
		console.log("search");
		element(by.buttonText('Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log('Owners name');
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('1');
		//console.log("we have texts ");
		//browser.sleep(5000);
		
	});
	
	it ("search by Owners surname", function(){
		//browser.get("http://localhost:6500/");
		//fill in search field
		var searchText = "~mendoza";
		element(by.id("deferred-input-2")).sendKeys(searchText);
		console.log("search");
		element(by.buttonText('Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log('Owners surname');
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('1');
		//console.log("we have texts ");
		//browser.sleep(5000);
		
	});
	
	it ("search by Description", function(){
		
		//fill in search field
		var searchText = "$amer";
		element(by.id("deferred-input-2")).sendKeys(searchText);
		console.log("search");
		element(by.buttonText('Search!')).click();
		
		//verify search results
		var numberOfResults = element(by.css('.count'));
		numberOfResults.getText().then(function(text){
			console.log('Description');
			console.log(text)
		});
		expect(numberOfResults.getText()).toContain('1');
		//console.log("we have texts ");
		//browser.sleep(5000);
		
	})
  });
});
