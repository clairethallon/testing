$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getTask();
    $(`#addTaskButton`).on('click', addTask);
    $(`#addTaskOutput`).on('click', '.deleteButton', deleteTask);
    $(`#addTaskOutput`).on('click', '.completedButton', updateTask);
}
let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

function addTask() {
    console.log('in addTask');
    if ($(`#nameInput`).val() === '' || $(`#taskInput`).val() === '') {
        alert('please enter all fields');
        return;
    };
    let objectToSend = {
        person_assigned: $(`#nameInput`).val(),
        task_assigned: $(`#taskInput`).val(),
        date_assigned: date,
        completed: false
    }
    console.log(objectToSend);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then(function (response) {
        getTask()
    }).catch(function (err) {
        alert('could not add task');
        console.log(err);
    })
}

function getTask() {
    console.log('in getTask');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        let el = $(`#addTaskOutput`);
        el.empty();
        for (let i = 0; i < response.length; i++) {
            if (response[i].completed == true) {
                let completed = 'done';
                el.append(`<tr class= "green">
                <td><input type="image" src="icons/checkedBox.png" class="completedButton" data-id="${response[i].id}"></input></td>
                <td><strong>${response[i].task_assigned}</strong></td>
                <td>${response[i].person_assigned}</td>
                
                <td>${response[i].date_assigned}</td>
                <td>${completed}</td>
                
                <td><input type="image" src="icons/trash.png"class="deleteButton" data-id="${response[i].id}"></input></td>
            </tr>`)
            }
            else {
                let completed = 'to do!';
                el.append(`<tr>
                <td><input type="image" src="icons/box.png" class="completedButton" data-id="${response[i].id}"></input></td>
                <td><strong>${response[i].task_assigned}</strong></td>
                <td>${response[i].person_assigned}</td>
                <td>${response[i].date_assigned}</td>
                <td>${completed}</td>
                <td><input type="image" src="icons/trash.png"class="deleteButton" data-id="${response[i].id}"></input></td>
            </tr>`)
            }
        }
    }).catch(function (err) {
        alert('could not add task');
        console.log(err);
    })

}

function deleteTask() {
    console.log('in deleteTask', $(this).data('id'));
    if (confirm('Would you like to delete?') == true) {
        let taskId = $(this).data('id')
        $.ajax({
            method: 'DELETE',
            url: '/tasks?id=' + taskId
        }).then(function (response) {
            getTask();
        }).catch(function (err) {
            console.log(err);
            alert('error deleting task');
        })
    }
    else {
        return
    }
}

function updateTask() {
    console.log('in updateTask', $(this).data('id'));
    let taskId = $(this).data('id')
    $.ajax({
        method: 'PUT',
        url: '/tasks?id=' + taskId
    }).then(function (response) {
        getTask();
    }).catch(function (err) {
        console.log(err);
        alert('error updating task');
    })
}