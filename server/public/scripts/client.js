$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getTask();
    $(`#addTaskButton`).on('click', addTask);
    $(`#addTaskOutput`).on('click', '.deleteB', deleteTask);
    $(`#addTaskOutput`).on('click', '.completedB', updateTask);
}
//creates new date so we can keep track of when tasks were added to database
let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

function addTask() {
    // log function hit
    console.log('in addTask');

    //if input fields are blank send alert and end function
    if ($(`#nameInput`).val() === '' || $(`#taskInput`).val() === '') {
        alert('please enter all fields');
        return;
    };

    //create object to send using input data/send using ajax call
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
        // empty html div
        let el = $(`#addTaskOutput`);
        el.empty();
        // oop through to update dom
        for (let i = 0; i < response.length; i++) {
            if (response[i].completed == true) {
                // for if the task has been marked as completed
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
            // for if task has not yet been completed
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
    // log function hit
    console.log('in deleteTask', $(this).data('id'));
    // get click data
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
    // log function hit
    console.log('in updateTask', $(this).data('id'));
    // get click data for ajax call
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