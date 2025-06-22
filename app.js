import { playTimer, pauseTimer, resetTimer, reduceTime, plusTime } from "./resources/js/sdc_pomodoro.js";
import { formValidation, acceptData, renderData, deleteTask, editTask, confirmEdit, checkTask } from "./resources/js/todo.js";

//Pomodoro Timer
window.playTimer = playTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.reduceTime = reduceTime;
window.plusTime = plusTime;

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
    window.location.href = '../../index.html';
})
