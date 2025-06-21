import { playTimer, pauseTimer, resetTimer, reduceTime, plusTime } from "./resources/js/sdc_pomodoro.js";
import { formValidation, acceptData, renderData, deleteTask, editTask, confirmEdit } from "./resources/js/todo.js";

window.playTimer = playTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.reduceTime = reduceTime;
window.plusTime = plusTime;

window.formValidation = formValidation;
window.acceptData = acceptData;
window.renderData = renderData;
window.deleteTask = deleteTask;
window.editTask = editTask;
window.confirmEdit = confirmEdit;

let returnHome = document.getElementById("returnHome");

returnHome.addEventListener('click', () => {
    window.location.href = '../../index.html';
})
