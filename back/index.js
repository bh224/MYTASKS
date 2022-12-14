const compression = require('compression');
const cors = require("cors")
const express = require('express')
const app = express()
const port = 3000
const {indexRouter} = require('./src/router/indexRouter')
const {userRouter} = require('./src/router/userRouter')

/* express 미들웨어설정 */

// 정적파일제공
app.use(express.static('./front'));

//cors 설정
app.use(cors());

//json 파싱
app.use(express.json());

//http요청압축
app.use(compression())


//라우터분리
indexRouter(app);
userRouter(app);

app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`)
})