var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

var taskIdCounter = 0;

var taskFormHandler = function(event) {
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value.trim();
  var taskTypeInput = document.querySelector("select[name='task-type']").value.trim();

  // check if input items are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to supply both a name and a type for the task.");
    return false;
  }

  formEl.reset();

  // package up the data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  }

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task-id as a custom data attribute
  listItemEl.setAttribute('data-task-id', taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // give it a class name
  taskInfoEl.className = "task-info";
  // add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  // add it to the list item
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  taskIdCounter++;
}

var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement('div');
  actionContainerEl.className = 'task-actions';

  // create edit button
  var editButtonEl = document.createElement('button');
  editButtonEl.textContent = 'Edit';
  editButtonEl.className = 'btn edit-btn';
  editButtonEl.setAttribute('data-task-id', taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement('button');
  deleteButtonEl.textContent = 'Delete';
  deleteButtonEl.className = 'btn delete-btn';
  deleteButtonEl.setAttribute('data-task-id', taskId);

  actionContainerEl.appendChild(deleteButtonEl);
  
  var statusSelectEl = document.createElement('select');
  statusSelectEl.className = 'select-status';
  statusSelectEl.setAttribute('name', 'status-change');
  statusSelectEl.setAttribute('data-task-id', taskId);

  var statusChoices = ['To Do', 'In Progress', 'Completed'];
  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement('option');
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute('value', statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;
}

var taskButtonHandler = function(event) {
  // delete button was clicked
  if (event.target.matches('.edit-btn')) {
    var taskId = event.target.getAttribute('data-task-id');
    editTask(taskId);
  }
  // delete button was clicked
  else if (event.target.matches('.delete-btn')) {
    var taskId = event.target.getAttribute('data-task-id');
    deleteTask(taskId);
  }
}

var editTask = function(taskId) {
  console.log('Editing task # ' + taskId);

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
  // get content from the task name
  var taskName = taskSelected.querySelector('h3.task-name').textContent;
  document.querySelector("input[name='task-name']").value = taskName;

  // get content from the task type
  var taskType = taskSelected.querySelector('span.task-type').textContent;
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector('#save-task').textContent = 'Save Task';

  formEl.setAttribute('data-task-id', taskId);
}

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
