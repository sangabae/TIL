// process.env.env.NODE_ENV는 환경변수 
if(process.env.env.NODE_ENV === 'production'){
    module.exports = require('./prod');     // prod파일에서 가져옴 
} else {
    module.exports = require('./dev');  
}