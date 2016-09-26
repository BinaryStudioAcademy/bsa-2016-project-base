/**
 * Created by user on 23.08.2016.
 */

var async = require("async")
var path = "./repositories/",
    tag = require(path+"tagRepository"),
    tech = require(path+"technologyRepository"),
    user = require(path+"userRepository"),
    Project = require("./schemas/projectSchema");
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
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
function values(array){
    shuffle(array);
    var count = array.length/(3+random(5));
    var result = [];
    var r = 0;
    while (true){
        r+=random(count);
        if (r >= array.length) {
            return result.map(function(value){return value._id});
        }
        result.push(array[r++])
    }
}
function generate(count){
    async.parallel({
        tags:function(callback){
            tag.getAll(callback)
        },
        techs:function(callback){
            tech.getAll(callback)
        },
        users:function(callback){
            user.getAll(callback)
        }
    }, function(err,res){
        const {users,tags,techs} = res;
        for (var i = 0; i < count; i++) {
            var project = new Project({
                projectName: name(10),
                description: {descrText: name(20)},
                users: values(users),
                owners: values(users),
                tags: values(tags),
                technologies: values(techs),
                timeBegin: new Date(new Date().getTime() - random(100000) - 10000),
                status:["Completed", "Estimation", "InProgress"][random(2)],
                location: {
                    Latitude: ""+Math.random()*90-45,
                    Longitude: ""+Math.random()*90-45
                },
            });
            project.save(function (err) {
                if (err) throw err;
            });
        }
    });
}
//call for generate/////////////////////
generate(100);
///////////////////////////////////////
module.exports = generate;
