$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getTask();
    $(`#addTaskButton`).on('click', addTask);
    $(`#addTaskOutput`).on('click', '.deleteB', deleteTask);
    $(`#addTaskOutput`).on('click', '.completedB', updateTask);
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
                <td><button class="btn btn-outline-success btn-sm completedB" data-id="${response[i].id}">✓</button></td>
                <td><strong>${response[i].task_assigned}</strong></td>
                <td>${response[i].person_assigned}</td>
                
                <td>${response[i].date_assigned}</td>
                <td>${completed}</td>
                
                <td><button type="button" class="btn btn-outline-danger btn-sm deleteB" data-id="${response[i].id}">delete</button></td>
            </tr>`)
            }
            else {
                let completed = 'to do!';
                el.append(`<tr>
                <td><button class="btn btn-outline-primary btn-sm completedB" data-id="${response[i].id}">☐</button></td>
                <td><strong>${response[i].task_assigned}</strong></td>
                <td>${response[i].person_assigned}</td>
                <td>${response[i].date_assigned}</td>
                <td>${completed}</td>
                <td><button type="button" class="btn btn-outline-danger btn-sm deleteB" data-id="${response[i].id}">delete</button></td>
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