/**
 * Created by user on 12.08.2016.
 */
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dckmeyruw',
    api_key: '231739829115868',
    api_secret: 'FPthr-SaRvtsUmTdWsX0pi8d1SU'
});
module.exports = function(app){
    app.post('/_image_upload_', function(req, res){
        debugger
        console.log(req.body);
        cloudinary.uploader.upload(req.body.data,
            function(result) {
                debugger
                console.log(result)
                res.json({location:result.url})
            },
            {resource_type: "auto" });
    })
}