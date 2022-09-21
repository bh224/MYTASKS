const {pool} = require('../../database');

exports.insertUser = async function(email, password, nickname){
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            const insertUserQuery = "insert into Users (email, password, nickname) values (?,?,?);";
            const insertUserParams = [email, password, nickname];
            const [row] = await connection.query(insertUserQuery, insertUserParams);
            connection.release();
            return row

        } catch (err) {
            console.error(`### Users DB 쿼리 error`);
            connection.release();
            return false
        }
    } catch (err){
        console.error(`### Users DB error###`);
        return false
    }
}

exports.selectUserByEmail = async function(email){
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            const selectUserByEmailQuery = "select * from Users where email = ?;";
            const selectUserByEmailParams = [email];
            const [row] = await connection.query(selectUserByEmailQuery, selectUserByEmailParams);
            connection.release();
            return row

        } catch (err) {
            console.error(`### Users DB 쿼리 error`);
            connection.release();
            return false
        }
    } catch (err){
        console.error(`### Users DB error###`);
        return false
    }
}

exports.selectUser = async function(email, password){
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            const selectUserQuery = "select * from Users where email = ? and password = ?;";
            const selectUserParams = [email, password];
            const [row] = await connection.query(selectUserQuery, selectUserParams);
            connection.release();
            return row

        } catch (err) {
            console.error(`### Users DB 쿼리 error`);
            connection.release();
            return false
        }
    } catch (err){
        console.error(`### Users DB error###`);
        return false
    }
}

exports.getNickname = async function(user_id){
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            const getNicknameQuery = "select * from Users where user_idx=?";
            const getNicknameParams = [user_id];
            const [row] = await connection.query(getNicknameQuery, getNicknameParams);
            connection.release();
            return row

        } catch (err) {
            console.error(`### Users DB 쿼리 error`);
            connection.release();
            return false
        }
    } catch (err){
        console.error(`### Users DB error###`);
        return false
    }
}