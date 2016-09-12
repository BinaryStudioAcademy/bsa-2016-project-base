function random(max){
    return Math.round(Math.random()*max);
}
var letters = "qwertyuiopasdfghjklzxcvbnm";
function name(max){
    var result = "";
    var length = random(max)+4;
    for (var i=0; i < length; i+=1){
        result += letters.substr(random(letters.length),1);
    }
    return result;
}
describe("admin should be able create new project", function(){
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
		browser.ignoreSynchronization = true;
		//browser.sleep(5000);
		
	})


	it ("Create Project", function(){
		browser.get("http://localhost:6500/");
		
		//go to create project page
		element(by.css('a[href="/add-project"]')).click();
		browser.ignoreSynchronization = true;
		var EC = protractor.ExpectedConditions;
		// Waits for the URL to contain 'add-project'.
		browser.wait(EC.urlContains('add-project'), 5000);
		
		//fill in projects name
		var projectName = element(by.xpath("//input[starts-with(@id, 'undefined-Projectname-undefined')]"));
		projectName.sendKeys(name(40));
		
		//fill in link to project
		element(by.xpath("//input[starts-with(@id, 'undefined-Linktoproject-undefined')]")).sendKeys(name(20));
		//browser.sleep(5000);
		
		//select date of start
		var startDate = element(by.xpath("//input[starts-with(@id, 'undefined-StartDate-undefined')]"));
		startDate.click();
		var btnOk = element(by.buttonText('OK'));
		element(by.buttonText('10')).click();
		//browser.wait(EC.invisibilityOf(by.buttonText('1')), 5000);
		element(by.buttonText('OK')).click();
		browser.wait(EC.invisibilityOf(btnOk), 5000);
		//browser.sleep(5000);
		
		//select date of end
		var endDate = element(by.xpath("//input[starts-with(@id, 'undefined-EndDate-undefined')]"));
		browser.wait(EC.elementToBeClickable(endDate), 5000);
		endDate.click();
		element(by.buttonText('20')).click();
		//browser.wait(EC.invisibilityOf(by.buttonText('1')), 5000);
		element(by.buttonText('OK')).click();
		browser.wait(EC.invisibilityOf(btnOk), 5000);
		
		//select condition
		//browser.wait(EC.elementToBeClickable(element(by.css('#Condition'))), 5000);
		element(by.css('#Condition')).click();
		element(by.css('option[value="InProgress"]')).click();
		
		//fill in description text
		element(by.xpath('//*[@id="react-tinymce-0_ifr"]')).sendKeys(name(100));
		
		//select Techs
		var tech = element(by.css("#techs-list")).$(".section-list1").$(".techItem").$(".btnIcon");
		for (i = 0; i<5; i++){
			tech.click();
		};
		//add tags
		element(by.xpath('//*[@id="add-project-wrapper"]/div[3]/div[1]/button[4]')).click();
		var tag = element(by.css("#tags-list")).$(".section-list1").$(".tag").$(".btnIcon");
		for (i = 0; i<10; i++){
			tag.click();
		};
		//add new tag
		console.log('new tag');
		browser.sleep(1500);
		element(by.css('input[placeholder="Add new tag"]')).sendKeys(name(14));
		//element(by.buttonText("Add")).click();
		element(by.xpath('//*[@id="tags-list"]/div/div[1]/div[2]/div[2]/div/div')).click();
		
	
		
		//add users
		element(by.xpath('//*[@id="add-project-wrapper"]/div[3]/div[1]/button[2]')).click();
		var user = element(by.css("#user-list")).$(".section-list1").$(".listItem").$(".btnIcon");
		for (i = 0; i<10; i++){
			user.click();
		};
		
		//add owners
		var owner = element(by.css('input[value="on"]'));
		//for (i = 0; i<5; i++){
			owner.click();
		//}; 
		
		
		//add sections
		element(by.xpath('//*[@id="add-project-wrapper"]/div[3]/div[1]/button[3]')).click();
		var section = element(by.css('input[placeholder="Section Name"]'));
		
		section.sendKeys(name(5));
		element(by.xpath('//*[@id="features-list"]/div/div[1]/div/div[2]/div/div')).click();
		//add features
		element(by.xpath('//*[@id="features-list"]/div/div[1]/ul/div')).click();
		for (i = 0; i<3; i++){
			element(by.css('input[placeholder="Feature Name"]')).sendKeys(name(12));
			element(by.xpath('//*[@id="features-list"]/div/div[2]/div/div/div/div[2]/div/div')).click();
			//browser.sleep(1500);
			element(by.xpath('//iframe[starts-with(@id, "react-tinymce")]')).sendKeys(name(20));
			//browser.sleep(1500);
			element(by.buttonText("Save")).click();
		};
		
		
		
		//click Create button
		element(by.css(".btnCreate")).click();
		//browser.sleep(5000);
		
	}); 
})