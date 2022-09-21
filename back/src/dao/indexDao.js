// 데이터베이스에 접근

const {pool} = require('../../database');
exports.getUserRows = async function() {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            const selectUserQuery = "select * from Users;";
            const [row] = await connection.query(selectUserQuery);
            connection.release();
            return row

        } catch (err) {
            console.error(`### getUserRows DB 쿼리 error`);
            connection.release();
            return false
        }
    } catch (err){
        console.error(`###getUserRows DB error###`);
        return false
    }
};

//todo 작성
exports.insertTodo = async function(user_id, contents, type){
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            const insertTodoQuery = "insert into Todos (user_idx, contents, type) values(?, ?, ?);";
            const insertTodoParams = [user_id, contents, type];
            const [row] = await connection.query(insertTodoQuery, insertTodoParams);
            connection.release();
            return row

        } catch (err) {
            console.error(`### insertTodo DB쿼리 error \n ${err}`);
            connection.release();
            return false
        }
    } catch (err){
        console.error(`### insertTodo DB연결 error### \n ${err}`);
        return false
    }
}

exports.seletTodoByType = async function(user_id, type){
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            const selectTodoByTypeQuery = "select todo_idx, contents, status from Todos where user_idx = ? and type = ? and not (status='D');";
            const selectTodoByTypeParams = [user_id, type];
            const [row] = await connection.query(selectTodoByTypeQuery, selectTodoByTypeParams);
            connection.release();
            return row

        } catch (err) {
            console.error(`### Todo DB 쿼리 error`);
            connection.release();
            return false
        }
    } catch (err){
        console.error(`### Todo DB error###`);
        return false
    }
}

exports.seletValidTodo = async function(user_id, todo_id){
    try {
        //db연결검사
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            //쿼리
            const seletValidTodoQuery = "select * from Todos where user_idx = ? and todo_idx = ? and not (status='D');";
            const seletValidTodoParams = [user_id, todo_id];
            const [row] = await connection.query(seletValidTodoQuery, seletValidTodoParams);
            connection.release();
            return row

        } catch (err) {
            console.error(`### Todo DB 쿼리 error`);
            connection.release();
            return false
        }
    } catch (err){
        console.error(`### Todo DB error###`);
        return false
    }
}

exports.updateTodo = async function(user_id, todo_id, contents, status){
    try {
        //db연결검사
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            //쿼리
            const updateTodoQuery = "update Todos set contents = ifnull(?, contents), status = ifnull(?, status) where user_idx = ? and todo_idx = ?;";
            // const updateTodoParams = [user_id, todo_id, contents, status];
            const updateTodoParams = [contents, status, user_id, todo_id];
            const [row] = await connection.query(updateTodoQuery, updateTodoParams);
            connection.release();
            return row

        } catch (err) {
            console.error(`### Todo DB 쿼리 error`);
            connection.release();
            return false
        }
    } catch (err){
        console.error(`### Todo DB error###`);
        return false
    }
}

exports.deleteTodo = async function(user_id, todo_id){
    try {
        //db연결검사
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            //쿼리
            const deleteTodoQuery = "update Todos set status = 'D' where user_idx = ? and todo_idx = ?;";
            const deleteTodoParams = [user_id, todo_id];
            const [row] = await connection.query(deleteTodoQuery, deleteTodoParams);
            connection.release();
            return row

        } catch (err) {
            console.error(`### Todo DB 쿼리 error`);
            connection.release();
            return false
        }
    } catch (err){
        console.error(`### Todo DB error###`);
        return false
    }
}