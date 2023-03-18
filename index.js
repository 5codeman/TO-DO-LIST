var todoList = []
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button")
var todoInput = document.getElementById("todo-input")
var deleteAllButton = document.getElementById("delete-all")
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected")


//event listners for add and delete
addButton.addEventListener("click", add)
deleteAllButton.addEventListener("click", deleteAll)
deleteSButton.addEventListener("click", deleteS)


//event listeners for filtersk
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e)
    }
    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }

})
//event listner for enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});


//updates the all the remaining, completed and main list
function update() {
    comdoList = todoList.filter((ele) => {
        return ele.complete

    })
    remList = todoList.filter((ele) => {
        return !ele.complete
    })
    document.getElementById("r-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();

}

//adds the task in main list

function add() {
    var value = todoInput.value;
    if (value === '') {
        alert("😮 Task cannot be empty")
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });

    todoInput.value = "";
    update();
    addinmain(todoList);
}


//renders the main list and views on the main content

function addinmain(todoList) {
    allTodos.innerHTML = ""
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`
        allTodos.innerHTML += x
    });
}


//deletes and indiviual task and update all the list
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => {
        return ele.id != deleted
    })

    update();
    addinmain(todoList);

}

//completes indiviaula task and updates all the list
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true
                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false

                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }
        }
    })

    update();
    addinmain(todoList);
}


//deletes all the tasks
function deleteAll(todo) {

    todoList = []

    update();
    addinmain(todoList);

}

//deletes only completed task
function deleteS(todo) {

    todoList = todoList.filter((ele) => {
        return !ele.complete;
    })


    update();
    addinmain(todoList);

}


// functions for filters
function viewCompleted() {
    addinmain(comdoList);
}

function viewRemaining() {

    addinmain(remList);
}
function viewAll() {
    addinmain(todoList);
}