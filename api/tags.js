/**
 * Created by razor on 02.08.16.
 */

module.exports = function(app) {
    app.get('/api/tags/',function (req,res,next) {
        res.json({
            'tags':'tags'
        });
    });
    app.get('/api/tags/:id',function (req,res,next) {
        res.json({
            'tags':req.params.id
        });
    });
    /*
     Добавление елементов
     */
    app.post('/api/tags/',function (req,res,next) {

    });
    /*
     Изменение елемента
     */
    app.post('/api/tags/:id',function (req,res,next) {

    });
};