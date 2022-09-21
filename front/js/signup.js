//token검사
const token = localStorage.getItem('x-access-token');
if(token){
    alert('로그아웃 후 이용해 주세요');
    location.href="index.html";
};


//입력값의 유효성검사
// console.log('url',url)

const inputEmail = document.getElementById("email");
const emailMsg = document.querySelector('div.email-message');
inputEmail.addEventListener("input", isValidEmail);

const inputPassword = document.getElementById("password");
const passwordMsg = document.querySelector('div.password-message');
inputPassword.addEventListener("input", isValidPassword);
const inputPasswordConfirm = document.getElementById("password-confirm");
const passwordConfirmMsg = document.querySelector('div.password-confirm-message');
inputPasswordConfirm.addEventListener("input", isValidPasswordConfirm);

const inputName = document.getElementById("nickname");
const nameMsg = document.querySelector('div.nickname-message');
inputName.addEventListener("input", isValidName);

//이메일검증
function isValidEmail(event){
    const currentEmail = inputEmail.value;
    // console.log(currentEmail)
    const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
   
    if(!emailReg.test(currentEmail)){
        emailMsg.style.visibility = "visible";
        return false;
    }
    emailMsg.style.visibility = "hidden";
    return true;
}

//비밀번호 검증
function isValidPassword(even){
    const currentPassword = inputPassword.value;
    const passwordReg = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/;

    if(!passwordReg.test(currentPassword)){
        passwordMsg.style.visibility = "visible";
        return false;
    }
    passwordMsg.style.visibility = "hidden";
    return true;
}

//비밀번호 확인
function isValidPasswordConfirm(event){
    const currentPassword = inputPassword.value;
    const confirmPassword = inputPasswordConfirm.value;
    if (currentPassword !== confirmPassword){
        passwordConfirmMsg.style.visibility = "visible";
        return false;
    }
    passwordConfirmMsg.style.visibility = "hidden";
    return true
    
}

//닉네임 검증
function isValidName(event){
    const currentName = inputName.value;
    // console.log(currentName)
    if(currentName.length < 2 || currentName.length > 10){
        nameMsg.style.visibility = "visible";
        return false
    }
    nameMsg.style.visibility = "hidden";
    return true
} 

//회원가입 api 요청

const btnSignup = document.getElementById('signup');
btnSignup.addEventListener("click", signup);

async function signup(event){
    const isValidReq = isValidEmail() && isValidPassword() && isValidPasswordConfirm() && isValidName();
    // console.log(isValidReq)

    if(!isValidReq){
        alert('회원정보를 확인해주세요')
        return false
    }

    const currentEmail = inputEmail.value;
    const currentPassword = inputPassword.value;
    const currentName = inputName.value;

    const config = {
        method: "POST",
        url: url+"/user",
        data:{
            email: currentEmail,
            password: currentPassword,
            nickname: currentName
        },
    };

    try{
        const res = await axios(config);
        if (res.data.code === 400){
            alert(res.data.message);
            location.reload(); //새로고침
            return false
        }
        if (res.data.code === 200){
            alert(res.data.message);
            location.href="signin.html";
            return true
        }
    } catch(err){
        console.error(err)
    }
}