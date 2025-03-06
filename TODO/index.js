const textarea = document.querySelector('textarea')
const addBtn = document.getElementById('addBtn')
const todoContainer = document.querySelector('.todoContainer')

let todoList = []
let userId

function generateUserId(){
    return `user_${Math.random()}.toString(36).substr(2,9)}`;
}
function initialLoad(){
    if(!sessionStorage.getItem('userId')){
        userId = generateUserId()
        sessionStorage.setItem('userId',userId)
        localStorage.removeItem('todos') //clear todos for new user
    }else{
        userId = sessionStorage.getItem('userId')
    }
    if(localStorage.getItem('todos')){
       todoList = JSON.parse(localStorage.getItem('todos')).todoList 
    }
    
    updateUI()
}

initialLoad()

function addTodo(){
    const todo = textarea.value.trim()
    if(!todo){
        return
    }
    console.log('Add todo: ', todo)
    todoList.push(todo)
    textarea.value = '' //reset to empty
    updateUI()
}

function editTodo(index){
    textarea.value = todoList[index]
    todoList.splice(index,1)
    updateUI()
}

function deleteTodo(index){
    todoList.splice(index,1)
    updateUI()
}

function updateUI(){
    let newInnerHTML = ''
    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML +=  `
        <div class="todo">
        <p>${todoElement}</p>
        <div class="btnContainer">
            <button class="iconBtn" onclick ="editTodo(${todoIndex})">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="iconBtn" onclick ="deleteTodo(${todoIndex})">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        </div>
        `
    })
    todoContainer.innerHTML = newInnerHTML
    //to save to local storage
    localStorage.setItem('todos', JSON.stringify({todoList}))
}

addBtn.addEventListener('click',addTodo)