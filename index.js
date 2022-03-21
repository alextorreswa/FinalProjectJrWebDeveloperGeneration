//Get value forms
const newTaskNameInput = document.getElementById('taskname1');
const newTaskDesInput = document.getElementById('taskdescription1');
const newAssignedToInput = document.getElementById('assignedto1');
const newDueDateInput = document.getElementById('duedate1');

//Validate function
const validFormFieldInput = (data) => {
  if(data.length!==0) {
    return true;
  } else {
    return false;
  }
}

function isValidDate(data) {
  var today = new Date();
  //today.setHours(0,0,0,0);
  var dateTask = new Date(data);
  //dateTask.setHours(0,0,0,0);
  console.log(dateTask,today);
  if(data.length!==0 && !isNaN(dateTask) && dateTask.getDate>=today.getDate) {
    return true;
  } else {
    return false;
  }
};

function validatedate(inputText)
  {
  var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  // Match the date format through regular expression
  if(inputText.value.match(dateformat))
  {
  document.form1.text1.focus();
  //Test which seperator is used '/' or '-'
  var opera1 = inputText.value.split('/');
  var opera2 = inputText.value.split('-');
  lopera1 = opera1.length;
  lopera2 = opera2.length;
  // Extract the string into month, date and year
  if (lopera1>1)
  {
  var pdate = inputText.value.split('/');
  }
  else if (lopera2>1)
  {
  var pdate = inputText.value.split('-');
  }
  var dd = parseInt(pdate[0]);
  var mm  = parseInt(pdate[1]);
  var yy = parseInt(pdate[2]);
  // Create list of days of a month [assume there is no leap year by default]
  var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (mm==1 || mm>2)
  {
  if (dd>ListofDays[mm-1])
  {
  alert('Invalid date format!');
  return false;
  }
  }
  if (mm==2)
  {
  var lyear = false;
  if ( (!(yy % 4) && yy % 100) || !(yy % 400)) 
  {
  lyear = true;
  }
  if ((lyear==false) && (dd>=29))
  {
  alert('Invalid date format!');
  return false;
  }
  if ((lyear==true) && (dd>29))
  {
  alert('Invalid date format!');
  return false;
  }
  }
  }
  else
  {
  alert("Invalid date format!");
  document.form1.text1.focus();
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
  
  if(validFormFieldInput(nameTask) && validFormFieldInput(nameDes) && validFormFieldInput(nameAssig) && isValidDate(nameDueDate)) {
    console.log('Valid data')
    isError(false);
  } else {
    isError(true);
    console.log(isValidDate(nameDueDate));
  }

}

//Event handled 
document.getElementById("bttSubmit").onclick = AddTask;
