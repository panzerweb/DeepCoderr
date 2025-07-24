import { playTimer, pauseTimer, resetTimer, reduceTime, plusTime, restoreTimer, updateTimer } from "./resources/js/sdc_pomodoro.js";
import { formValidation, acceptData, renderData, deleteTask, editTask, confirmEdit, checkTask } from "./resources/js/todo.js";
import { previewAvatar, saveAvatar } from "./resources/js/image.js";

//Pomodoro Timer
window.playTimer = playTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.reduceTime = reduceTime;
window.plusTime = plusTime;
window.updateTimer = updateTimer;
window.addEventListener("load", () => {
    restoreTimer();
})

// Previewing avatar
const fileInput = document.getElementById("choose-avatar");
const saveBtn = document.getElementById("save-avatar-btn");
fileInput.addEventListener("change", () => {
    previewAvatar();
})
saveBtn.addEventListener("click", () => {
    saveAvatar();
})

//** Todo-List
window.formValidation = formValidation;
window.acceptData = acceptData;
window.renderData = renderData;
window.deleteTask = deleteTask;
window.editTask = editTask;
window.confirmEdit = confirmEdit;
window.checkTask = checkTask;

// Redirect to homepage
let returnHome = document.getElementById("returnHome");

returnHome.addEventListener('click', () => {
    Swal.fire({
        title: "Your progress will be paused!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continue",
        width: '20em'
    }).then((result) => {
    if (result.isConfirmed) {
        window.location.href = '../../index.html';
    }
    else{
        return;
    }
    });
    
})
