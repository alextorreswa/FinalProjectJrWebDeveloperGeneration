//Get value forms
const newTaskNameInput = document.getElementById('taskname1');
const newTaskDesInput = document.getElementById('taskdescription1');
const newAssignedToInput = document.getElementById('assignedto1');
const newDueDateInput = document.getElementById('duedate1');

//Validate functions

//Validate empty fields
const validFormFieldInput = (data) => {
  if(data.length!==0) {
    return true;
  } else {
    return false;
  }
}

//Validate dates
function isValidDate(data) {
  var today = new Date();
  var dateTask = new Date(data+' '+'23:59:59');
  //console.log(data,dateTask,today);
  if(data.length!==0 && !isNaN(dateTask) && dateTask>=today ) {
    return true;
  } else {
    return false;
  }
};

//Hide or show error message
function isError(vis) {
  if (vis) {
    document.getElementById('AlertMsg').hidden=false;    
  } else {
    document.getElementById('AlertMsg').hidden=true;        
  }
}

//function clear fields
function clear(){
  document.getElementById('taskname1').value = '';
  document.getElementById('taskdescription1').value = '';
  document.getElementById('assignedto1').value = '';
  document.getElementById('duedate1').value = '';
}

//Add a task function when push the button
function AddTask(e) {
  e.preventDefault();
  const nameTask = newTaskNameInput.value;
  const nameDes = newTaskDesInput.value;
  const nameAssig = newAssignedToInput.value;
  const nameDueDate = newDueDateInput.value;
  console.log(nameTask,nameDes,nameAssig,nameDueDate);
  
  if(validFormFieldInput(nameTask) && validFormFieldInput(nameDes) && validFormFieldInput(nameAssig) && isValidDate(nameDueDate)) {
    console.log('Valid data')
    isError(false);
    taskclass.addTask(nameTask,nameDes,nameAssig,nameDueDate);
    taskclass.save();
    //console.log(taskclass.tasks);
    taskclass.render();
    clear();
  } else {
    console.log('Invalid data')    
    isError(true);
  }

}

//Event handled 
document.getElementById("bttSubmit").onclick = AddTask;

const taskList = document.getElementById("taskList");

taskList.addEventListener('click',(event) => {
  console.log('click on tasklist')  
  if(event.target.classList.contains('done-button')){
    console.log('Clicked on done button');
    const parentTask = event.target.parentElement.parentElement.parentElement;
    const task = taskclass.getTaskById(getLastDigits(parentTask.id));
    task[5] = 'DONE';
    taskclass.save();
    taskclass.render();
    //console.log(task);   
    //event.target.parentElement.hidden = true;       
  }
  if(event.target.classList.contains('delete-button')){
    console.log('Clicked on delete button');
    const parentTask = event.target.parentElement.parentElement.parentElement;
    taskclass.deleteTask(getLastDigits(parentTask.id));
    taskclass.save();
    taskclass.render();
  }

});

function getLastDigits(s) {
  return parseInt(s.match(/\d+$/)[0]);
}




//Create class TaskManager
const taskclass = new TaskManager();
taskclass.addTask('Take out the trash','Take out the trash to the front of the house','Alex','2022-04-04');
taskclass.addTask('Cook Dinner','Prepare a healthy serving of pancakes for the family tonight','Saul','2022-03-30');
taskclass.addTask('Pick up groceries','Go to Amazon Fresh','Saul','2022-05-01');
taskclass.save();
console.log(taskclass.tasks);
//console.log(taskclass.getTaskById(2));

//const htmltest = createTaskHtml('Cook Dinner','Prepare a healthy serving of pancakes for the family tonight','Nick','2020-09-20','TODO');
//console.log(htmltest);

taskclass.load();
taskclass.render();