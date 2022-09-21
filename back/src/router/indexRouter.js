// 라우터

const indexController = require("../controller/indexController");
const {jwtMiddleware} = require('../../jwtMiddleware');


exports.indexRouter = function (app) {
    // 일정 CRUD API
    app.post("/todo", jwtMiddleware, indexController.createTodo); //컨트롤러 함수로 넘어가기 전에 jwt미들웨어 검증을 거친다
    app.get("/todos", jwtMiddleware,indexController.readTodo); 
    app.patch("/todo", jwtMiddleware, indexController.updateTodo);
    app.delete("/todo/:todo_id", jwtMiddleware, indexController.deleteTodo);
    
};
    
