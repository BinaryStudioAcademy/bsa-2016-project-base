/**
 * Created by user on 24.08.2016.
 */
var parser = require("./parser")
/*
 const symbols = {
 '#': 'tags',
 '@': 'users',
 '!': 'techs',
 '~': 'owners',
 '^': 'name'
 };
 */
var s1 = parser("#tag !tec ^sdf!dfs");
var s2 = parser("@user");
var s3 = parser("!tec");
console.log(s1);
console.log(s2);
console.log(s3);