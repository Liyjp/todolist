var store = window.localStorage;

window.onload = function () {
    var add = document.getElementById("addTask");

    // 回车实现添加事项
    function enter(e) {
        if (e.keyCode === 13){
            addTodo()
        }
    }
    add.addEventListener("focus", ()=>{
        add.addEventListener("keydown", enter);
    });

    // 添加按钮，实现添加事项
    document.getElementById("btn").addEventListener("click",addTodo);
    // 显示所有的事项
    document.getElementById("all").addEventListener("click", ()=>{
        document.getElementById("todo").style.display = "block";
        document.getElementById("done").style.display = "block";
    });
    // 显示待办事项
    document.getElementById("active").addEventListener("click", ()=>{
        $('#todo').style.display = "block";
        $('#done').style.display = "none";
    });
    // 显示已完成事项
    document.getElementById('completed').addEventListener('click', ()=>{
        document.getElementById("todo").style.display = 'none';
        document.getElementById("done").style.display = 'block';
    });
    // 清除所有事项
    document.getElementById("clear").addEventListener("click", ()=>{
        store.setItem("done", JSON.stringify([]));
        showDone();
    });

    // 初始化localStorage
    initStorage();
};

function initStorage() {
    if (store.getItem("todo") === null){
        store.setItem("todo",JSON.stringify([]));
    }
    if (store.getItem("done") === null){
        store.setItem("done",JSON.stringify([]));
    }
    showTodo();
    showDone();
    update();
}

// 完成某一事项
function doneTodo(node) {
    delTodo(node);

    var t = node.firstChild.innerHTML;
    var dones = JSON.parse(store.getItem("done"));
    dones.push(t);
    store.setItem("done",JSON.stringify(dones));
    showDone();
}

// 删除某一事项
function delTodo(node) {
    document.getElementById("todo").removeChild(node);

    var t = node.firstChild.innerHTML;
    var todos = JSON.parse(store.getItem("todo"));
    for (let i in todos){
        if (todos[i] === t){
            todos.splice(i,1);
            break;
        }
    }
    store.setItem("todo",JSON.stringify(todos));
    update();
}

// 展示待办事项
function showTodo() {
    var todos = JSON.parse(store.getItem("todo"));
    document.getElementById("todo").innerHTML ="";
    for (let i of todos){
        var li = document.createElement("li");
        li.innerHTML = i;
        li.addEventListener("click", (e)=>{
            doneTodo(e.target.parentNode);
        });

        var delBtn = document.createElement("button");
        delBtn.innerHTML = "X";
        delBtn.style.display = "none";
        delBtn.addEventListener("click", (e)=>{
            delTodo(e.target.parentNode);
        });

        var div = document.createElement("div");
        div.appendChild(li);
        div.appendChild(delBtn);
        div.addEventListener("mouseover", ()=>{
            delBtn.style.display = "inline-block";
        });
        div.addEventListener("mouseleave", ()=>{
            delBtn.style.display = "none";
        });
        div.addEventListener("click", (e)=>{
            doneTodo(e.target)
        });
        document.getElementById("todo").appendChild(div);
    }
    update();
}

// 添加事项
function addTodo() {
    var task = document.getElementById("addTask").value;

    document.getElementById("addTask").value = "";

    if (task === ""){
        return;
    }
    var tasks = JSON.parse(store.getItem("todo"));
    tasks.push(task);
    store.setItem("todo",JSON.stringify(tasks));
    showTodo();
}
// 展示已完成事项
function showDone() {
    var dones = JSON.parse(store.getItem("done"));
    document.getElementById("done").innerHTML = "";
    for (let i of dones){
        var li = document.createElement("li");
        li.innerHTML = i;
        document.getElementById("done").appendChild(li);
    }
    update();
}

// 更新
function update() {
    var todos = JSON.parse(store.getItem("todo"));
    var clear = document.getElementById("clear");
    document.getElementById("count").innerHTML = todos.length;
    if (JSON.parse(store.getItem("done")).length < 1){
        clear.style.display = "none";
    } else {
        clear.style.display = "inline-block";
    }
}