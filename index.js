//Get value forms
const newTaskNameInput = document.getElementById('taskname1');
const newTaskDesInput = document.getElementById('taskdescription1');
const newAssignedToInput = document.getElementById('assignedto1');
const newDueDateInput = document.getElementById('duedate1');

//Validate function
const validFormFieldInput = (data) => {
  if(typeof data !== 'string' || data!==null) {
    return true;
  } else {
    isError();
    return false;
  }
}



function isError(vis) {
  if (vis) {
    document.getElementById('AlertMsg').hidden=false;    
  } else {
    document.getElementById('AlertMsg').hidden=true;        
  }

}

function AddTask(e) {
  e.preventDefault();
  const nameTask = newTaskNameInput.value;
  const nameDes = newTaskDesInput.value;
  const nameAssig = newAssignedToInput.value;
  const nameDueDate = newDueDateInput.value;
  console.log(nameTask,nameDes,nameAssig,nameDueDate);
  isError(true);
}

//Event handled 
document.getElementById("bttSubmit").onclick = AddTask;
