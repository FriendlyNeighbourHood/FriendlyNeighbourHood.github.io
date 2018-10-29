let tasksAreAlreadyStored = (localStorage.getItem('tasks'))?true:false;

let taskInput = document.querySelector('#tasker');


if(tasksAreAlreadyStored != true){
    // initial logic ...
    let arrayOfTasks = [];
    taskInput.addEventListener('keyup',function(e){
        if(e.target.value !== ""){
            e.target.classList.add('stay')
        }
        else{
            e.target.classList.remove('stay')
        }
        if(e.key === "Enter"){
            if(e.target.value !== ""){
                arrayOfTasks.push(e.target.value);
                e.target.value ="";
                localStorage.setItem('tasks',JSON.stringify(arrayOfTasks));
                dynamicallyUpdateArray();
            }            
        }
        
    })
    
}
else {
    let arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
    dynamicallyUpdateArray();
    taskInput.addEventListener('keyup',function(e){
        if(e.target.value !== ""){
            e.target.classList.add('stay')
        }
        else{
            e.target.classList.remove('stay')
        }
        if(e.key === "Enter"){
            if(e.target.value !== ""){
                arrayOfTasks.push(e.target.value);
                e.target.value ="";
                localStorage.setItem('tasks',JSON.stringify(arrayOfTasks));
                dynamicallyUpdateArray();
            }            
        }
        
    })
}

function dynamicallyUpdateArray(){
    let list = document.querySelector('main ul');
    list.innerHTML = "";
    let taskArray = JSON.parse(localStorage.getItem('tasks'));
    for(let i=0; i<taskArray.length; i++){
        if(taskArray[i]!==""){
            let listItem = document.createElement('li');
            //listItem.innerHTML = taskArray[i];
            let enclosingDiv = document.createElement('div');
            enclosingDiv.classList.add('shrink-div')
            enclosingDiv.innerHTML = taskArray[i];
            listItem.appendChild(enclosingDiv);
            let closeButton = document.createElement('div');
            closeButton.innerHTML = "&times;"
            closeButton.classList.add('close');
            list.appendChild(listItem);
            listItem.appendChild(closeButton);
            closeButton.addEventListener('click',function(e){
                return cancelTaskAndUpdateArray(e)
            });
        }
        
    }
}
function cancelTaskAndUpdateArray(event){
    let taskValue = event.target.parentElement.children[0].innerText;
    console.log(taskValue);
    let taskArray = JSON.parse(localStorage.getItem('tasks'));
    console.log(taskArray)
    let indexOfTaskInArray = taskArray.indexOf(taskValue);
    console.log(indexOfTaskInArray);
    taskArray.splice(indexOfTaskInArray,1);
    console.log(taskArray);
    localStorage.setItem('tasks',JSON.stringify(taskArray));
    dynamicallyUpdateArray();
    location.reload();
}
function removeAllTasks(){
    localStorage.removeItem('tasks');
    location.reload();
}