//일정불러오기
readTodo();

async function readTodo(){
    //토큰 확인
    const token = localStorage.getItem('x-access-token');
    console.log(token);
    if(!token){
        return;
    }
    //토큰 있으면 일정불러오기 api 호출
    const config = {
        method: "get",
        url: url+"/todos",
        headers: {
            "x-access-token": token,
        }
    }
    try{
        const res = await axios(config);
        console.log(res)
        if (res.data.code !== 200){
            alert(res.data.message);
            return false;
        }
        const todoDataSet = res.data.result;
        // console.log(todoDataSet);
        
        for (let section in todoDataSet){
            const sectionUl = document.querySelector(`#${section} ul`);
            const arrayEachSection = todoDataSet[section];
            let result = "";
            for (let todo of arrayEachSection){
                let element = `
                <li class="list-item" id=${todo.todo_idx}>
                    <div class="done-text-container">
                        <input type="checkbox" class="todo-done" ${todo.status==="C"?"checked":""}>
                        <p class="todo-text">${todo.contents}</p>
                    </div>
                    <div class="update-delete-container">
                        <i class="todo-update fa-solid fa-pencil"></i>
                        <i class="todo-delete fa-solid fa-trash"></i>
                    </div>
                </li>
                `
            result += element;
            }
            sectionUl.innerHTML = result;
        }

    } catch(err){
        console.error(err)
    }
}

//일정등록하기

const matrixContainer = document.querySelector('.matrix-container');
matrixContainer.addEventListener("keypress", cudController);
matrixContainer.addEventListener("click", cudController);

function cudController(event){
    //토큰 확인
    const token = localStorage.getItem('x-access-token');
    // console.log(token);
    if(!token){
        return;
    }
    const target = event.target;
    const targetTagName = target.tagName;
    const eventType= event.type;
    const key = event.key;
    // console.log(target, targetTagName, eventType, key)

    // ##### 일정등록 CREATE
    if(targetTagName === "INPUT" && key === "Enter"){
        createTodo(event, token);
        return
    }
    // ##### 일정수정 UPDATE
    // 체크박스 체크/해제
    if(target.className == "todo-done" && eventType == "click"){
        updateTodoDone(event, token);
        return
    }
    // 일정내용 업데이트
    const firstClassName = target.className.split(" ")[0];
    if (firstClassName === "todo-update" && eventType == "click"){
        updateTodoContents(event, token);
        return
    }

    // ##### 일정삭제 DELETE

    if (firstClassName === "todo-delete" && eventType == "click"){
        deleteTodo(event, token);
        return
    }
}

// ##### 일정등록
async function createTodo(event, token){
    const contents = event.target.value;
    const type = event.target.closest(".matrix-item").id;
    if(!contents){
        alert('내용을 입력해 주세요');
        return false
    }
    const config = {
        method: "post",
        url: url+"/todo",
        headers: {
            "x-access-token": token,
        },
        data: {
            contents: contents,
            type: type
        }
    }

    try{
        const res = await axios(config);
        if (res.data.code !== 200){
            alert(res.data.message);
            return false
        }
        //dom 업데이트
        readTodo();
        event.target.value = "";
        return true
    } catch(err) {
        console.log(err)
    }
}

// ##### 일정수정(체크박스)
async function updateTodoDone(event, token){
    const status = event.target.checked ? "C" : "A";
    const todo_id = event.target.closest('.list-item').id;
    const config = {
        method: "patch",
        url: url+"/todo",
        headers: {
            "x-access-token": token,
        },
        data: {
            todo_id: todo_id,
            status: status
        }
    }

    try{
        const res = await axios(config);
        if (res.data.code !== 200){
            alert(res.data.message);
            return false
        }
        //dom 업데이트
        readTodo();
    
    } catch(err){
        console.log(err)
    }
}

// ##### 일정수정(내용수정)
async function updateTodoContents(event, token){
    const contents = prompt('내용을 입력해 주세요');
    const todo_id = event.target.closest('.list-item').id;
    const config = {
        method: "patch",
        url: url+"/todo",
        headers: {
            "x-access-token": token,
        },
        data: {
            todo_id: todo_id,
            contents: contents
        }
    }

    try{
        const res = await axios(config);
        if (res.data.code !== 200){
            alert(res.data.message);
            return false
        }
        //dom 업데이트
        readTodo();
    
    } catch(err){
        console.log(err)
    }
}

// ##### 일정삭제
async function deleteTodo(event, token){
    const isValidReq = confirm('정말로 삭제 하시겠습니까?');
    if (!isValidReq){
        return false;
    }
    const todo_id = event.target.closest('.list-item').id;
    const config = {
        method: "delete",
        url: url+"/todo/"+todo_id,
        headers: {
            "x-access-token": token,
        },
    }
    
    try{
        const res = await axios(config);
        if (res.data.code !== 200){
            alert(res.data.message);
            return false
        }
        //dom 업데이트
        readTodo();
    
    } catch(err){
        console.log(err)
    }
}