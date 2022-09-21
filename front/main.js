// axios({
// 		method: "",
//     url: "",
//     headers: {},
//     data: {},
// })
// .then((res)=>{})
// .catch((err)=>{});


async function dummy(){
	try{
		const res = await axios({
			method: "post",
            url: "http://127.0.0.1:3000/signin",
            headers: {},
            data: {
                email:"user2@user.com",
                password:"test12345"
            }});
        console.log(res);
	} catch(err){
		console.error(err);	
}};

dummy()