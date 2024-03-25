const express = require('express')
const app = express()
const port = 3000

// 몽고DB 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sanga:asdf1234@boilerplate.stex0uy.mongodb.net/test?retryWrites=true&w=majority', {
    userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
  .then(() => console.log('MogoDB가 연결되었다...!'))
  .catch((err) => console.log('err'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

