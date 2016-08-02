/**
 * Created by razor on 02.08.16.
 */

module.exports = function(app) {
    app.get('/api/projects/',function (req,res,next) {
        res.json({
            'projects':'projects'
        });
    });
    app.get('/api/projects/:id',function (req,res,next) {
        res.json({
            'projects':req.params.id
        });
    });
    /*
    Добавление елементов
     */
    app.post('/api/projects/',function (req,res,next) {

    });
    /*
     Изменение елемента
     */
    app.post('/api/projects/:id',function (req,res,next) {

    });
};