/**
 * Created by razor on 02.08.16.
 */

module.exports = function(app) {
    app.get('/api/features/',function (req,res,next) {
        res.json({
            'features':'features'
        });
    });
    app.get('/api/features/:id',function (req,res,next) {
        res.json({
            'features':req.params.id
        });
    });
    /*
     Добавление елементов
     */
    app.post('/api/features/',function (req,res,next) {

    });
    /*
     Изменение елемента
     */
    app.post('/api/features/:id',function (req,res,next) {

    });

};