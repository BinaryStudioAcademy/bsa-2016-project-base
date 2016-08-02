/**
 * Created by razor on 02.08.16.
 */

module.exports = function(app) {
    app.get('/api/subfeatures/',function (req,res,next) {
        res.json({
            'features':'subfeatures'
        });
    });
    app.get('/api/subfeatures/:id',function (req,res,next) {
        res.json({
            'subfeatures':req.params.id
        });
    });
    /*
     Добавление елементов
     */
    app.post('/api/subfeatures/',function (req,res,next) {

    });
    /*
     Изменение елемента
     */
    app.post('/api/subfeatures/:id',function (req,res,next) {

    });

};