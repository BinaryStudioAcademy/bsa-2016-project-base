/**
 * Created by razor on 02.08.16.
 */

module.exports = function(app) {
    app.get('/api/conditions/',function (req,res,next) {
        res.json({
            'conditions':'conditions'
        });
    });
    app.get('/api/conditions/:id',function (req,res,next) {
        res.json({
            'conditions':req.params.id
        });
    });
    /*
     Добавление елементов
     */
    app.post('/api/conditions/',function (req,res,next) {

    });
    /*
     Изменение елемента
     */
    app.post('/api/conditions/:id',function (req,res,next) {

    });

};