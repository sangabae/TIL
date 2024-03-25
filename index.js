const express = require('express')
const app = express()
const port = 3000

const bodyParser = require("body-parser");

const config = require('./config/key');
// User를 가져오기위함 
const {User} = require("./models/User");

// bodyParser가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해줌 
// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 해줌 
app.use(bodyParser.urlencoded({extended: true}));

// application/json 타입으로 된 것을 분석해서 가져올 수 있게 해줌 
app.use(bodyParser.json());

// 몽고DB 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
  .then(() => console.log('MogoDB가 연결되었다...!'))
  .catch((err) => console.log('err'))

app.get('/', (req, res) => {
    res.send('안녕하세요!! 테스트입니다.')
})
  
app.post('/register', (req, res) => {
    // req.body에 들어있다는 것은 즉 아래 형태와 같다. 
    /*
        {
            id: "hello",
            password" "123"
        }
    */

    //회원가입할 때 필요한 정보들을 client에서 가져오면 
    // 그것들을 데이터 베이스에 넣어준다. 
    const user = new User(req.body)

    // save해주면 정보들이 user 모델에 전달이 됐고 
    user.save((err, userInfo) => {
        // 만약 에러가 있으면 json 형식으로 성공하지 못했고 에러 메시지도 함께 전달해준다. 
        if(err) return res.json({success: false, err})
        // 만약에 성공했으면 status(200)(성공했다라는 의미)을 json 형식으로 정보를 전달해준다.
        return res.status(200).json({
            success: true
        })
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

