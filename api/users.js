/**
 * Created by razor on 02.08.16.
 */
module.exports = function(app) {
    app.get('/api/users/',function (req,res,next) {
        res.json({
            'users':'users'
        });
    });
    app.get('/api/users/:id',function (req,res,next) {
        res.json({
            'user':req.params.id
        });
    });
};