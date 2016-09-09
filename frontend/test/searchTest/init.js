describe("users should be able to login", function() {
    it("to fill in user information and login", function () {
         //"to fill in user information and login",
         browser.get("http://localhost:2020/#/");
         //fill in login
         element(by.model("authLoginCtrl.user.email")).sendKeys("admin@default.com");
         //fill in password
         element(by.model("authLoginCtrl.user.password")).sendKeys("123");
         //press Login button
         var loginButton = element(by.cssContainingText(".btn", "Log in"));
         loginButton.click()
        
        //browser.get("http://localhost:6500/");
    })
})
