    /**
 * Created by razorka on 10.08.16.
 */
    var mongoose = require('mongoose');
    mongoose.set('debug',true);
    var Schema = mongoose.Schema;
    var async = require('async');
    var technologieRepository = require('./backend/repositories/technologyRepository');
    mongoose.connect('mongodb://localhost/projects-base',{
        server: {
            auto_reconnect: true,
                poolSize: 40
        },
        user: 'root'
    });

    var users =
        {
            techName : "Вася",
            techDescription : "supervasya",
            techVersion:"1"
        };

    var i = 1000;
    while (i != 0) {
        console.log(i);
        technologieRepository.add(users, function (err, data) {
            console.log(err);
        });
        i--;
    }