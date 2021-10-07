$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    $(`#addTaskButton`).on('click', addTask);
}

function addTask() {
    console.log('in addTask');
}