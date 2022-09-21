//token검사
const token = localStorage.getItem('x-access-token');
if(token){
    alert('현재 로그인 상태입니다');
    location.href="index.html";
};


const btnSignin = document.getElementById("signin");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

btnSignin.addEventListener("click", signin);

async function signin(event){
    const currentEmail = inputEmail.value;
    const currentPassword = inputPassword.value;
    if (!currentEmail || !currentPassword){
        return false
    }
    // 로그인api 요청
    const config = {
        method: "post",
        url: url+"/signin",
        data: {
            email: currentEmail,
            password: currentPassword
        }
    };
    try{
        const res = await axios(config);
        console.log(res)
        //로그인성공하면 res.data.token에 token값 받아옴
        if (res.data.code !== 200){
            alert(res.data.message);
            return false;
        }
        console.log('token', res.data.result.token)
        localStorage.setItem("x-access-token", res.data.result.token);
        alert(res.data.message);
        location.href = "index.html";
    } catch(err) {
        console.error(err)
    }

}
