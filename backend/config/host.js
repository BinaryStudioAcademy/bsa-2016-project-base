
var isProduction = process.env.NODE_ENV === "production"
if (isProduction){
    module.exports = {
        autHost: 'http://team.binary-studio.com/auth/#/',
        projectHost: 'http://team.binary-studio.com/projects',
        basePath:'projects/'
    };
}else {
    module.exports = {
        autHost: 'http://localhost:2020',
        projectHost: 'http://localhost:6500',
        basePath:''
    };
}
