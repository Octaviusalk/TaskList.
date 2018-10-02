const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadeventlisteners();

//functions
function loadeventlisteners  (){
    //Load DOM
    document.addEventListener('DOMContentLoaded',loadTasks);
    //submit
    form.addEventListener('submit',addTask);

    //Remove task
    taskList.addEventListener('click',removeTask);

    //Remove TAsks
    clearBtn.addEventListener('click',removeTasks);

    //filter tasks
    filter.addEventListener('keyup',filterTasks);
}

function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks')===null) {
        tasks=[];
    }
    else{
       tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
       // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
                                } 
                            )
}

function addTask(e){
    if(taskInput.value===''){
        alert('Enter a value please!');
    }

  // Create li element
  if(taskInput.value!==''){
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    //store Task in LS
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value='';
  }

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks')===null) {
        tasks=[];
    }
    else{
       tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')) {
       if (confirm('Are you Sure?')) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
       }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks')===null) {
        tasks=[];
    }
    else{
       tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent===task) {
            tasks.splice(index,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        localStorage.clear();
    }
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text)!=-1) {
            task.style.display='block';
        }else{
            task.style.display='none';
        }
    })
}