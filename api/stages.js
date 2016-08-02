/**
 * Created by razor on 02.08.16.
 */

module.exports = function(app) {
    app.get('/api/stages/',function (req,res,next) {
        res.json({
            'stages':'stages'
        });
    });
    app.get('/api/stages/:id',function (req,res,next) {
        res.json({
            'stages':req.params.id
        });
    });
    /*
     Добавление елементов
     */
    app.post('/api/stages/',function (req,res,next) {

    });
    /*
     Изменение елемента
     */
    app.post('/api/stages/:id',function (req,res,next) {

    });
};