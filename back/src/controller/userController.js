const userDao = require('../dao/userDao');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../secret')

exports.signup = async function(req, res){
    const {email, password, nickname} = req.body;
    if (!email || !password || !nickname){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "회원가입 입력값 확인"
        });
    };
    //이메일검증
    const isValidEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if(!isValidEmail.test(email)){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "이메일 형식 확인"
        })
    }
    //비밀번호검증
    const isValidPassword =  /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/;
    if(!isValidPassword.test(password)){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "비밀번호 영문,숫자 8~10자"
        })
    }

    //닉네임검증
    if (nickname.length < 2 || nickname.length >10){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "닉네임 2자이상 10자이하"
        })
    }
    //회원가입 중복방지
    const isDuplicatedEmail = await userDao.selectUserByEmail(email);
    // console.log(isDuplicatedEmail)
    if(isDuplicatedEmail.length>0){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "이미가입된 회원입니다"
        })
    }

    //db저장
    const insertUserRow = await userDao.insertUser(email, password, nickname);
    if(!insertUserRow){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "회원가입실패"
        })
    }

    return res.send({
            isSuccess: true,
            code: 200,
            message: "Success"
        })
};

exports.signin = async function(req, res){
    const {email, password} = req.body;
    if(!email || !password){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "회원정보 입력해주세요"
        })
    }
    // 회원여부 검사
    const isValidUser = await userDao.selectUser(email, password);
    if(!isValidUser){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "db에러 관리자에게 문의"
        })
    }
    if(isValidUser.length < 1){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "존재하지 않는 회원입니다"
        })
    }

    //jwt 토큰 발급
    const [userInfo] = isValidUser; //user_id
    const user_id = userInfo.user_idx;
    const token = jwt.sign(
        {user_id: user_id}, //payload
        jwtSecret //시크릿키
        )
    return res.send({
            result: {token: token},
            isSuccess: true,
            code: 200,
            message: "로그인 성공"
        })
   
}
//토큰으로 유저정보 가져오기
exports.getInfoByToken = async function(req, res){
    const {user_id} = req.verifiedToken;
    const [userInfo] = await userDao.getNickname(user_id);
    return res.send({
        result: {nickname: userInfo.nickname},
        isSuccess: true,
        status: 200,
        message: "토큰 검증됨"
    })
}