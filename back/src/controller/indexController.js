const indexDao = require('../dao/indexDao')

//todo작성하기
exports.createTodo = async function(req, res){
    const { user_id } = req.verifiedToken;
    const {contents, type} = req.body;
    
    if (!user_id || !contents || !type) {
        return res.send({
            isSuccess : false,
            code: 400,
            message: "필수정보 누락"
        });
    }
    //contents 검증
    if (contents.length > 20){
        return res.send({
            isSuccess : false,
            code: 400,
            message: "내용 20글자 초과"
        });
    }
    //type검증 : do, decide, delete, delegate
    const validTypes = ["do", "decide", "delete", "delegate"]
    if (!validTypes.includes(type)){
        return res.send({
            isSuccess : false,
            code: 400,
            message: "유효하지 않은 타입"
        });
    }
    const insertTodoRow = await indexDao.insertTodo(user_id, contents, type);
    if (!insertTodoRow){
        return res.send({
            isSuccess : false,
            code: 400,
            message: "요청실패"
        });
    }
    
    return res.send({
        isSuccess : true,
        code: 200,
        message: "Success"
    })
};

//todo목록 가져오기
exports.readTodo = async function(req, res){
    const {user_id} = req.verifiedToken;
    const todos = {};
    const types = ["do", "decide", "delete", "delegate"];
    //타입마다 쿼리 실행(4번 반복)
    for (let type of types){
        let seletTodoByTypeRows = await indexDao.seletTodoByType(user_id, type);
        if(!seletTodoByTypeRows){
            return res.send({
            isSuccess : false,
            code: 400,
            message: "일정조회실패"
    })
        }
        todos[type] = seletTodoByTypeRows
    }

    return res.send({
        result: todos,
        isSuccess : true,
        code: 200,
        message: "Success"
    })
}



//todo수정

exports.updateTodo = async function(req, res){
    const {user_id} = req.verifiedToken;
    let {todo_id, contents, status} = req.body;
    if (!user_id || !todo_id){
        return res.send({
        isSuccess: false,
        code: 400,
        message: "필수정보누락"
    });
    }
    if (!contents){
        constants = null;
    }
    if (!status){
        status = null;
    }
    
    const isValidTodoRow = await indexDao.seletValidTodo(user_id, todo_id);
    if (isValidTodoRow.length < 1){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효하지 않은 값"
        });
    }
    
    const updateTodoRow = await indexDao.updateTodo(user_id, todo_id, contents, status);

    if(!updateTodoRow){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "수정실패"
        });
    }
        
    return res.send({
        isSuccess: true,
        code: 200,
        message: "updated"
    });
}

//todo 삭제
exports.deleteTodo = async function(req, res){
    const {user_id} = req.verifiedToken;
    const {todo_id} = req.params;
    if (!user_id || !todo_id){
        return res.send({
        isSuccess: false,
        code: 400,
        message: "필수정보 누락"
    });
    }
    
    //게시글 유효성 검사
    const isValidTodoRow = await indexDao.seletValidTodo(user_id, todo_id);
    if (isValidTodoRow.length < 1){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효하지 않은 값"
        });
    }
    
    const deleteTodoRow = await indexDao.deleteTodo(user_id, todo_id);
    if (!deleteTodoRow){
        return res.send({
        isSuccess: false,
        code: 400,
        message: "삭제 실패"
    });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "삭제성공"
    });
}

// exports.getUsers = async function(req, res){
//     //회원정보 가져오는 로직
//     // const userRows = await indexDao.getUserRows(); //비교구조할당이라 젤 위에 하나만 가져온다
//     //쿼리파라미터값 파싱
//     // const {age} = req.query;
//     // console.log(age);
//     //경로변수파싱(path값)
//     // const {id} = req.params;
//     // console.log(id)
//     const token = req.headers['x-access-token'];
//     console.log(token)
//     return res.send({
//         result: "",
//         isSuccess: true,
//         code: 200,
//         message: "유저 목록 조회 성공"
//     })
    
//     // const userRows = await indexDao.getUserRows();
//     // return res.send(userRows);
// }