var userRepository = require("./../repositories/userRepository");
//var request = require("request");
var Cookie = require("cookies");
var url = "http://team.binary-studio.com/profile/api/users/filter";
var date = null;
var request = require("request")
var interval = 1000 * 60 * 60;
module.exports = function(req, res, next){
    try {
        userSync(req, res)
    }catch (e){
        console.log("***CATCH ERROR WHILE USER SYNC", e)
    }
    next()

};

function userSync(req, res){
    //check if needed to update local users
    if (!date){
        date = new Date();
        _userSync(req, res)
    }else {
        var _date = new Date();
        if (_date.getTime() - date.getTime() > interval){
            _userSync(req, res)
        }
    }
}
function _userSync(req, res){
    console.log("***USER SYNC")
    var j = request.jar();
    var cookie = new Cookie(req, res);
    j.setCookie(request.cookie(`userRole=${cookie.get("userRole")}`), url);//is this needed?
    j.setCookie(request.cookie(`x-access-token=${cookie.get("x-access-token")}`), url);//this is required
    request({url: url, jar: j}, function (error, res, body) {
        if (error){
            return console.log("***ERROR SYNC USERS")
        }
        JSON.parse(body).forEach(function(user){
            var [name, surname] = user.name.split(" ");
            var toAdd = {
                _id: user.id,
                userName: name,
                userSurname: surname,
                userRole: user.role || "user",
                avatar: "http://team.binary-studio.com"+user.avatar,
                position: user.department
            };
            userRepository.add( toAdd, function(err, res){
                if (err){
                    console.log(`ERROR AFTER ADD USER. EXPECTED ERROR OF TYPE 'DUPLICATED PRIMARY KEY'. MESSAGE: ${err.message}`)
                    console.log(`TRY TO UPDATE INFO`);
                    userRepository.update(toAdd._id, toAdd, function(err, res){
                        if (err){
                            console.log("ERROR WHILE UPDATE", err)
                        }
                        console.log("UPDATE SUCCESSFUL")
                    })
                }

            })
        })
    })
}