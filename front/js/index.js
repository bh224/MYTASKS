setHeader();

async function setHeader(){
    //토큰여부 검사
    const token = localStorage.getItem("x-access-token");
    // console.log('token',token);
    // console.log(Boolean(token))
    //토큰있으면 로그인/회원가입 숨기기
    if (!token){
        const signed = document.querySelector('.signed');
        signed.classList.add('hidden');
        return
    }
    //토큰 있을 때 닉네임 표시
    const unsigned = document.querySelector('.unsigned');
    unsigned.classList.add('hidden');

    const config = {
        method: "get",
        url: url+"/jwt",
        headers: {
            "x-access-token": token
        },

    }
    const res = await axios(config);
    // console.log(res)

    if (res.data.status !== 200){
        console.log("잘못된 토큰")
        return
    }

    const nickname = res.data.result.nickname;
    const spanNinkname = document.querySelector('span#nickname');
    spanNinkname.innerHTML = nickname;
}

// 로그아웃

const btnSignout = document.getElementById('sign-out');
btnSignout.addEventListener("click", signout);

function signout(even){
    localStorage.removeItem("x-access-token");
    location.reload();
}
