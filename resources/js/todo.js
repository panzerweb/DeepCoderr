let form = document.getElementById("form-element");
let textInput = document.getElementById("task-input");
let taskDiv = document.getElementById("task-div");

let data = [];

form.addEventListener("submit", (element) =>{
    element.preventDefault();
    formValidation();
})

export let formValidation = () => {
    if (textInput.value == '') {
        console.log("No Task Inserted!");
    } else {
        console.log("Task Inserted Successfully");
        acceptData();
        renderData();
        resetForm();
    }
}

// Accepts JSON format data for tasks, sets the task
export let acceptData = () => {
    const date = new Date();

    data.push({
        task_name: textInput.value,
        completed: false,
        checkState: false,
        created_at: date.toDateString(),
    })
    localStorage.setItem('data', JSON.stringify(data));
    console.log(data);
}

function resetForm(){
    textInput.value = '';
}
// Renders task and all its data
export let renderData = () => {
    taskDiv.innerHTML = "";
    if (data.length === 0) {
        taskDiv.innerHTML = 
            `
                <div class="no-task-placeholder text-center my-4">
                    <img src="path/to/your/lofi-icon.png" alt="No Task Icon" width="60" class="mb-2" />
                    <p class="text-muted mb-0 fw-light" style="font-size: 1.1rem;">You're all caught up 🎉</p>
                    <small class="text-light">Take a break or add something new.</small>
                </div>
            `;
        return;
    }
    else{
        data.map((task, id) =>{
            return (taskDiv.innerHTML += 
            `
                <div id="${id}" class="border rounded mb-2 bg-light shadow">
                    <div class='d-flex justify-content-between align-items-center px-2 py-1 pb-2'>
                        <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                            <input type="checkbox" class="btn-check" id="btncheck${id}" onchange='checkTask(${id})' autocomplete="off">
                            <label class="btn btn-outline-warning rounded-circle" for="btncheck${id}"></label>

                            <h5 class="mb-0 mx-2 text-truncate" contenteditable='false' id='task_name_${id}'>${task.task_name}</h5>

                        </div>

                        <div>
                            <button class="btn edit-button p-0 px-1" onclick="editTask(${id})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square text-secondary" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </button>
                            <button class="btn check-button p-0 px-1 d-none" onclick="confirmEdit(${id})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2 text-success" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                </svg>
                            </button>
                            <button class="btn delete-button p-0 px-1" onclick="deleteTask(${id})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill text-secondary" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="details" id="task_details">
                        <details>
                            <summary class='bg-warning w-100 px-3'>...</summary>
                            <small class='px-3 text-secondary'>
                                Created At: ${task.created_at}
                            </small>
                        </details>
                    </div>
                </div>
            `)
        })

        data.forEach((task, id) => {
            let textValue = document.getElementById(`task_name_${id}`);
            let checkBox = document.getElementById(`btncheck${id}`);

            if (textValue) {
                checkBox.checked = task.checkState;
                textValue.style.textDecoration = task.completed ? 'line-through' : 'none';
            }
        });
    }

}

export function checkTask(taskId){
    let checkBox = document.getElementById(`btncheck${taskId}`);
    let textValue = document.getElementById(`task_name_${taskId}`);

    
    if (checkBox.checked) {
        textValue.style.textDecoration = "line-through";
        data[taskId].checkState = checkBox.checked,
        data[taskId].completed = true;

        localStorage.setItem("data", JSON.stringify(data));
        console.log(checkBox.checked);
        
    } else {
        textValue.style.textDecoration = "none";
        data[taskId].checkState = checkBox.checked,
        data[taskId].completed = false;

        localStorage.setItem("data", JSON.stringify(data));
        console.log(checkBox.checked);
    }
}

// Delete a task!
export function deleteTask(taskId) {
    data.splice(taskId, 1);
    localStorage.setItem("data", JSON.stringify(data));
    renderData();

    console.log(data);
}

// Opens and sets contenteditable to true
export function editTask(taskId){
    document.querySelectorAll('[contenteditable="true"').forEach(element => {
        element.contentEditable = 'false';
    });
    document.querySelectorAll('.edit-button').forEach(button => {
        button.classList.remove('d-none');
    })
    document.querySelectorAll('.check-button').forEach(button => {
        button.classList.add('d-none');
    })

    const taskText = document.getElementById(`task_name_${taskId}`);
    const taskContainer = document.getElementById(taskId);
    const editButton = taskContainer.querySelector('.edit-button');
    const checkButton = taskContainer.querySelector('.check-button');

    taskText.contentEditable = 'true';
    taskText.focus();
    editButton.classList.add('d-none');
    checkButton.classList.remove('d-none');

    console.log(taskText);
}

//Confirms the edited task
export function confirmEdit(taskId){
    const editedText = document.getElementById(`task_name_${taskId}`);
    const newText = editedText.innerText.trim();

    if (newText === '') {
        alert("Task name cannot be empty!");
        return;
    }

    // Finally update the previous task to a new task
    data[taskId].task_name = newText;
    localStorage.setItem("data", JSON.stringify(data));   

    editedText.contentEditable = 'false';
    const taskContainer = document.getElementById(taskId);
    const editButton = taskContainer.querySelector('.edit-button');
    const checkButton = taskContainer.querySelector('.check-button');

    editButton.classList.remove('d-none');
    checkButton.classList.add('d-none');

    console.log(data);
}

// Fetches all data
document.addEventListener("DOMContentLoaded", () => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    renderData();
});