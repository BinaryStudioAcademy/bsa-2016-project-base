/**
 * Created by razor on 02.08.16.
 */
module.exports = function(app) {
    app.get('/api/technologies/',function (req,res,next) {
        res.json({
            'technologies':'technologies'
        });
    });
    app.get('/api/technologies/:id',function (req,res,next) {
        res.json({
            'technologies':req.params.id
        });
    });
    /*
     Добавление елементов
     */
    app.post('/api/technologies/',function (req,res,next) {

    });
    /*
    Изменение елемента
    */
    app.post('/api/technologies/:id',function (req,res,next) {

    });
};