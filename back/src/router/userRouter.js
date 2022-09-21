// 라우터

const userController = require("../controller/userController");
const {jwtMiddleware} = require('../../jwtMiddleware');

exports.userRouter = function(app){
    //회원가입
    app.post("/user", userController.signup);
    //로그인
    app.post("/signin", userController.signin);
    //jwt검증
    app.get("/jwt", jwtMiddleware, userController.getInfoByToken);
}